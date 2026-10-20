const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');

const root = path.resolve(__dirname, '..');
const shell = fs.readFileSync(path.join(root, 'assets/js/shell.js'), 'utf8');

function mountWarmup(initialSelectors = []) {
  const effects = [];
  const observers = [];
  const links = [];
  const targets = new Map(initialSelectors.map(selector => [selector, { selector }]));
  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.observed = new Set();
      observers.push(this);
    }
    observe(target) { this.observed.add(target); }
    unobserve(target) { this.observed.delete(target); }
    disconnect() { this.disconnected = true; this.observed.clear(); }
    emit(target, isIntersecting) { this.callback([{ target, isIntersecting }]); }
  }
  const window = Object.assign(new EventTarget(), { PortfolioChapters: {}, IntersectionObserver: Observer });
  const context = {
    React: { ...React, useEffect: effect => effects.push(effect) },
    ReactDOM: { createRoot: () => ({ render() {} }) },
    document: {
      getElementById: () => ({}),
      querySelector: selector => targets.get(selector) || null,
      createElement: tagName => ({ tagName }),
      head: { appendChild: link => links.push(link) }
    },
    window, IntersectionObserver: Observer, console
  };
  vm.createContext(context);
  vm.runInContext(shell, context);
  const responsiveImages = vm.runInContext('PORTFOLIO_RESPONSIVE_IMAGES', context);
  context.ProjectAssetWarmup();
  const cleanups = effects.map(effect => effect());
  return {
    links, targets, observer: observers[0],
    requestFor(asset) {
      return responsiveImages[asset] ? context.responsiveCandidateUrl(responsiveImages[asset]).url : asset;
    },
    addTarget(selector) { const target = { selector }; targets.set(selector, target); return target; },
    chapterReady() { window.dispatchEvent(new Event('portfolio:chapter-ready')); },
    dispose() { cleanups.forEach(cleanup => cleanup?.()); }
  };
}

test('approaching the preceding GUI case warms the sign-in artwork without fetching obsolete warehouse artwork', () => {
  const h = mountWarmup(['#game-ui-shuaitu-visual', '#game-ui-signin', '#game-ui-warehouse']);
  assert.deepEqual(h.links, [], 'mounting the observer does not eagerly download the chapter artwork');
  const preceding = h.targets.get('#game-ui-shuaitu-visual');
  assert.ok(h.observer.observed.has(preceding));
  h.observer.emit(preceding, false);
  assert.equal(h.links.length, 0, 'distant cases do not preload');
  h.observer.emit(preceding, true);
  assert.deepEqual(h.links.map(link => link.href), ['assets/signin/signin-rewards.jpg', 'assets/signin/entry.png']);
  h.links.forEach(link => {
    assert.equal(link.rel, 'preload');
    assert.equal(link.as, 'image');
    assert.equal(link.fetchPriority, 'low');
    assert.ok(fs.existsSync(path.join(root, link.href)), link.href + ' is deployable');
  });
  assert.equal(h.observer.observed.has(preceding), false, 'completed warmup is unobserved');
  assert.equal(h.observer.observed.has(h.targets.get('#game-ui-warehouse')), false, 'the compatibility alias is not a second warmup trigger');
  h.dispose();
});

test('the lazily discovered sign-in section warms Duoyi once without a backwards preload from the last case', () => {
  const h = mountWarmup();
  const signin = h.addTarget('#game-ui-signin');
  const duoyi = h.addTarget('#game-ui-duoyi');
  assert.equal(h.observer.observed.size, 0, 'late chapter nodes wait for the chapter-ready signal');
  h.chapterReady();
  assert.ok(h.observer.observed.has(signin));
  assert.equal(h.observer.observed.has(duoyi), false, 'the last light case no longer warms the earlier dark Giant case');
  assert.equal(h.links.length, 0, 'discovering late nodes does not itself fetch their artwork');
  h.observer.emit(signin, true);
  h.observer.emit(signin, true);
  h.chapterReady();
  assert.deepEqual(h.links.map(link => link.href), ['assets/duoyi/character-detail.png']);
  assert.equal(h.observer.observed.has(signin), false, 'chapter-ready does not reattach a completed target');
  assert.ok(h.links.every(link => fs.existsSync(path.join(root, link.href))), 'every warmed image is deployable');
  h.dispose();
  const later = h.addTarget('#section-02');
  h.chapterReady();
  assert.equal(h.observer.disconnected, true);
  assert.equal(h.observer.observed.has(later), false, 'unmount removes the chapter-ready subscription');
});

test('GUI warmup follows each new dark-to-light adjacency without duplicate or premature image requests', () => {
  const steps = [
    ['#section-game-ui', ['assets/rain/rain-main.webp', 'assets/rain/rain-collection.webp']],
    ['#game-ui-rain-collection', ['game-ui-erosion-hero.jpg']],
    ['#game-ui-motion-preview', ['assets/giant/gala-reward.jpg']],
    ['#game-ui-giant', ['game-ui-shuaitu-character-detail.png']],
    ['#game-ui-shuaitu-visual', ['assets/signin/signin-rewards.jpg', 'assets/signin/entry.png']],
    ['#game-ui-signin', ['assets/duoyi/character-detail.png']]
  ];
  const h = mountWarmup([...steps.map(([selector]) => selector), '#game-ui-duoyi']);
  assert.equal(h.links.length, 0, 'mounting the chapter does not preload the whole GUI gallery');
  assert.deepEqual([...h.observer.observed].map(target => target.selector).sort(), steps.map(([selector]) => selector).sort());
  const requested = [];
  for (const [selector, assets] of steps) {
    const target = h.targets.get(selector);
    h.observer.emit(target, false);
    assert.deepEqual(h.links.map(link => link.href), requested, selector + ' waits until it is nearby');
    h.observer.emit(target, true);
    requested.push(...assets.map(asset => h.requestFor(asset)));
    assert.deepEqual(h.links.map(link => link.href), requested, selector + ' warms only the next project artwork');
    h.observer.emit(target, true);
    h.chapterReady();
    assert.deepEqual(h.links.map(link => link.href), requested, 'repeated intersection and chapter-ready events do not duplicate requests');
    assert.equal(h.observer.observed.has(target), false, selector + ' is not re-observed once complete');
  }
  assert.equal(new Set(requested).size, requested.length);
  h.links.forEach(link => {
    assert.equal(link.rel, 'preload');
    assert.equal(link.as, 'image');
    assert.equal(link.fetchPriority, 'low');
    assert.ok(fs.existsSync(path.join(root, decodeURI(link.href))), link.href + ' is deployable');
  });
  assert.equal(h.observer.observed.has(h.targets.get('#game-ui-duoyi')), false);
  h.dispose();
});
