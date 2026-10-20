const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');
const root = path.resolve(__dirname, '..');
const origin = 'https://portfolio.example/';

function loaderContext(version, hooks = {}) {
  const scripts = [];
  const context = {
    React: { ...React, useEffect() {}, useState: value => [value, () => {}], useRef: value => ({ current: value }), ...hooks },
    ReactDOM: { createRoot: () => ({ render() {} }) }, URL, console,
    document: {
      currentScript: version === null ? null : { src: origin + 'assets/js/shell.js?v=' + encodeURIComponent(version) },
      getElementById: () => ({}), createElement: () => ({ remove() {} }),
      head: { appendChild(script) { scripts.push(script); } }
    },
    window: { PortfolioChapters: {}, location: { href: origin + '?v=visitor-query' } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/shell.js'), 'utf8'), context);
  return { context, scripts };
}

test('entry requests deployable CSS and JS with one shared release identity', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const urls = [...html.matchAll(/(?:href|src)="(assets\/[^"?]+\.(?:css|js)(?:\?[^"]*)?)"/g)].map(match => new URL(match[1], origin));
  assert.equal(urls.length, 5);
  const versions = urls.map(url => url.searchParams.get('v'));
  assert.ok(versions.every(Boolean), 'unversioned entry resources may reuse old cache entries');
  assert.equal(new Set(versions).size, 1);
  urls.forEach(url => assert.ok(fs.existsSync(path.join(root, url.pathname.slice(1))), url.pathname));
});

test('all lazy chapter requests inherit the loaded shell release, not the page query', async () => {
  const { context, scripts } = loaderContext('release test/2');
  assert.equal(scripts.length, 0, 'chapter files remain deferred');
  for (const [name, file] of [['gameDesign', 'game-design.js'], ['gameUI', 'game-ui.js'], ['digital', 'digital.js'], ['packaging', 'packaging.js'], ['poster', 'poster.js']]) {
    const loading = context.loadPortfolioChapter(name);
    const script = scripts.at(-1);
    const url = new URL(script.src, origin);
    assert.equal(url.pathname, '/assets/chapters/' + file);
    assert.equal(url.searchParams.get('v'), 'release test/2');
    context.window.PortfolioChapters[name] = () => [];
    script.onload();
    await loading;
  }
});

test('versioned chapter loading still deduplicates in-flight requests and retries a network failure', async () => {
  const { context, scripts } = loaderContext('release-2');
  const first = context.loadPortfolioChapter('gameUI');
  assert.equal(context.loadPortfolioChapter('gameUI'), first);
  assert.equal(scripts.length, 1);
  const failed = assert.rejects(first, /failed to load/);
  scripts[0].onerror();
  await failed;
  const retry = context.loadPortfolioChapter('gameUI');
  assert.equal(scripts.length, 2);
  assert.equal(new URL(scripts[1].src, origin).searchParams.get('v'), 'release-2');
  context.window.PortfolioChapters.gameUI = () => [];
  scripts[1].onload();
  await retry;
  await context.loadPortfolioChapter('gameUI');
  assert.equal(scripts.length, 2, 'loaded chapter is reused');
});

test('an unversioned legacy shell still loads chapters without adding an invalid version', async () => {
  const { context, scripts } = loaderContext(null);
  const loading = context.loadPortfolioChapter('gameUI');
  assert.equal(scripts[0].src, 'assets/chapters/game-ui.js');
  context.window.PortfolioChapters.gameUI = () => [];
  scripts[0].onload();
  await loading;
});

test('cold sign-in and legacy warehouse deep links load the GUI chapter and scroll to their actual rendered target', async () => {
  for (const hash of ['game-ui-signin', 'game-ui-warehouse']) {
    const effects = [];
    const state = [];
    const scrolls = [];
    const targets = new Map();
    let cursor = 0;
    const { context, scripts } = loaderContext('signin-release', {
      useEffect: effect => effects.push(effect),
      useState(initial) {
        const index = cursor++;
        if (!(index in state)) state[index] = initial;
        return [state[index], value => { state[index] = value; }];
      }
    });
    const events = new EventTarget();
    for (const method of ['addEventListener', 'removeEventListener', 'dispatchEvent']) {
      context.window[method] = events[method].bind(events);
    }
    context.Event = Event;
    context.window.location.hash = '#' + hash;
    context.document.getElementById = id => targets.get(id) || null;
    const props = { name: 'gameUI', chapter: context.ccChapters.gameUI, sectionId: 'section-game-ui', reserve: '1500svh' };
    context.LazyChapter(props);
    const cleanup = effects[0]();
    effects[1]();
    assert.equal(scripts.length, 1, hash + ' loads only one deferred chapter script');
    assert.equal(new URL(scripts[0].src, origin).pathname, '/assets/chapters/game-ui.js');
    assert.equal(new URL(scripts[0].src, origin).searchParams.get('v'), 'signin-release');
    assert.equal(scrolls.length, 0, 'scrolling waits until the chapter target exists');
    const loading = context.loadPortfolioChapter('gameUI');
    vm.runInContext(fs.readFileSync(path.join(root, 'assets/chapters/game-ui.js'), 'utf8'), context);
    const page = context.window.PortfolioChapters.gameUI().find(item => item.type.name === 'SignInRewardsCase');
    assert.ok(page, 'the replacement case exists after the chapter script runs');
    function registerTargets(node) {
      if (!React.isValidElement(node)) return;
      if (node.props.id) {
        const id = node.props.id;
        targets.set(id, { scrollIntoView: options => scrolls.push({ id, options }) });
      }
      React.Children.forEach(node.props.children, registerTargets);
    }
    registerTargets(page.type(page.props));
    scripts[0].onload();
    await loading;
    effects.length = 0;
    cursor = 0;
    context.LazyChapter(props);
    effects[1]();
    assert.equal(scripts.length, 1, 'ready content reuses the already loaded script');
    assert.equal(scrolls.length, 1, hash + ' scrolls only after mount');
    assert.equal(scrolls[0].id, hash);
    assert.equal(scrolls[0].options.block, 'start');
    assert.equal(scrolls[0].options.behavior, 'instant');
    cleanup();
  }
});
