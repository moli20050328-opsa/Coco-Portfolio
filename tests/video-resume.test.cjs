const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');
const shell = fs.readFileSync(path.join(__dirname, '../assets/js/shell.js'), 'utf8');
const settle = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

function mountVideo(overrides = {}, reducedMotion = false) {
  const effects = [];
  const observers = [];
  const document = Object.assign(new EventTarget(), { hidden: false, getElementById: () => ({}) });
  const window = Object.assign(new EventTarget(), {
    PortfolioChapters: {}, innerHeight: 900, innerWidth: 1440,
    matchMedia: () => ({ matches: reducedMotion })
  });
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(target) { this.target = target; }
    disconnect() { this.disconnected = true; }
    emit(visible) { if (!this.disconnected) this.callback([{ target: this.target, isIntersecting: visible }]); }
  }
  window.IntersectionObserver = Observer;
  const video = Object.assign(new EventTarget(), {
    paused: true, ended: false, currentTime: 12, src: '', loadCalls: 0, playCalls: 0,
    top: 1200, rejectPlay: false, pendingPlay: null,
    getAttribute(name) { return this[name] || null; },
    getBoundingClientRect() { return { top: this.top, bottom: this.top + 300, left: 0, right: 560 }; },
    load() { this.loadCalls++; },
    play() {
      this.playCalls++;
      if (this.rejectPlay) return Promise.reject(new Error('Autoplay blocked'));
      this.paused = false;
      queueMicrotask(() => this.dispatchEvent(new Event('play')));
      return this.pendingPlay || Promise.resolve();
    },
    pause() {
      if (this.paused) return;
      this.paused = true;
      queueMicrotask(() => this.dispatchEvent(new Event('pause')));
    }
  });
  const context = { React: { ...React, useRef: () => ({ current: null }), useEffect: fn => effects.push(fn) },
    ReactDOM: { createRoot: () => ({ render() {} }) }, document, window, IntersectionObserver: Observer, console };
  vm.createContext(context);
  vm.runInContext(shell, context);
  const element = context.DeferredVideo({ src: 'interaction-mirror.mp4', poster: 'poster.jpg',
    autoPlay: true, muted: true, controls: true, resumeOnReturn: true, ...overrides });
  element.ref.current = video;
  const cleanups = effects.map(effect => effect());
  return {
    video, element, document, window,
    warm() { observers.filter(o => o.options?.rootMargin === '600px 0px').forEach(o => o.emit(true)); },
    view(visible) {
      video.top = visible ? 100 : 1200;
      observers.filter(o => o.options?.rootMargin !== '600px 0px').forEach(o => o.emit(visible));
    },
    hidden(value) { document.hidden = value; document.dispatchEvent(new Event('visibilitychange')); },
    reattach(autoPlay = true) { return context.observeReturnPlayback(video, autoPlay); },
    dispose() { cleanups.forEach(cleanup => cleanup?.()); }, observers
  };
}

test('GAME DESIGN warms once without playing off-screen, then resumes at the same timestamp on tab return', async () => {
  const h = mountVideo();
  assert.equal(h.video.src, '', 'not requested at mount');
  h.warm(); await settle();
  assert.equal(h.video.loadCalls, 1);
  assert.equal(h.video.paused, true, '600px preload margin is not the playback viewport');
  h.view(true); await settle();
  assert.equal(h.video.paused, false);
  h.hidden(true); await settle();
  assert.equal(h.video.paused, true);
  h.hidden(false); await settle();
  assert.equal(h.video.paused, false);
  assert.equal(h.video.currentTime, 12);
  assert.equal(h.video.loadCalls, 1, 'resume must not reload or reset the media');
  assert.equal(h.element.props.resumeOnReturn, undefined, 'internal option must not leak onto video DOM');
  h.dispose();
});

test('manual pause survives viewport and tab returns until the visitor manually plays', async () => {
  const h = mountVideo(); h.view(true); h.warm(); await settle();
  h.video.pause(); await settle();
  h.view(false); h.hidden(true); await settle();
  h.hidden(false); h.view(true); await settle();
  assert.equal(h.video.paused, true);
  await h.video.play(); await settle();
  h.view(false); await settle();
  assert.equal(h.video.paused, true);
  h.view(true); await settle();
  assert.equal(h.video.paused, false);
  h.dispose();
});

test('rapid visibility return does not mistake the queued lifecycle pause for a user pause', async () => {
  const h = mountVideo(); h.view(true); h.warm(); await settle();
  h.hidden(true); h.hidden(false); await settle();
  h.hidden(true); await settle(); h.hidden(false); await settle();
  assert.equal(h.video.paused, false);
  h.video.pause(); await settle(); h.hidden(true); h.hidden(false); await settle();
  assert.equal(h.video.paused, true, 'a later genuine user pause still wins');
  h.dispose();
});

test('a return during pending playback resumes once the interrupted attempt settles', async () => {
  const h = mountVideo(); let reject;
  h.video.pendingPlay = new Promise((resolve, fail) => { reject = fail; });
  try {
    h.view(true); h.warm(); await settle();
    h.hidden(true); h.hidden(false);
    assert.equal(h.video.playCalls, 1, 'the pending attempt must not overlap another play call');
    h.video.pendingPlay = null;
    reject(new Error('Playback interrupted by lifecycle pause'));
    await settle();
    assert.equal(h.video.paused, false, 'the return request survives the interrupted play attempt');
    assert.equal(h.video.playCalls, 2, 'the return causes exactly one replacement attempt');
    await settle();
    assert.equal(h.video.playCalls, 2, 'settling playback must not create a retry loop');
  } finally { h.dispose(); }
});

test('manual pause survives when its event arrives after the tab becomes hidden', async () => {
  const h = mountVideo();
  try {
    h.view(true); h.warm(); await settle();
    h.video.pause(); h.hidden(true); await settle();
    h.hidden(false); await settle();
    assert.equal(h.video.paused, true, 'late pause delivery must preserve the visitor choice');
    assert.equal(h.video.playCalls, 1, 'returning must not restart a manually paused video');
  } finally { h.dispose(); }
});

test('blocked autoplay stays manually playable and retries only on a return', async () => {
  const h = mountVideo(); h.video.rejectPlay = true;
  h.view(true); h.warm(); await settle();
  assert.equal(h.video.playCalls, 1);
  assert.equal(h.element.props.controls, true);
  h.video.rejectPlay = false;
  h.hidden(true); h.hidden(false); await settle();
  assert.equal(h.video.paused, false);
  assert.equal(h.video.playCalls, 2);
  h.dispose();
});

test('manual-only and reduced-motion videos never autoplay on returns', async () => {
  for (const h of [mountVideo({ autoPlay: false }), mountVideo({}, true)]) {
    h.view(true); h.warm(); h.hidden(true); h.hidden(false); await settle();
    assert.equal(h.video.playCalls, 0);
    await h.video.play(); await settle();
    h.hidden(true); await settle(); h.hidden(false); await settle();
    assert.equal(h.video.playCalls, 1, 'reduced-motion does not resume without another user action');
    h.dispose();
  }
});

test('a pending play cannot revive a hidden or unmounted video', async () => {
  const h = mountVideo(); let resolve;
  h.video.pendingPlay = new Promise(done => { resolve = done; });
  h.view(true); h.warm(); await settle(); h.hidden(true); await settle();
  h.dispose(); resolve(); await settle();
  assert.equal(h.video.paused, true);
  const calls = h.video.playCalls;
  h.hidden(false); h.view(true); h.window.dispatchEvent(new Event('pageshow')); await settle();
  assert.equal(h.video.playCalls, calls);
  assert.ok(h.observers.every(o => o.disconnected));
});

test('a disposed playback owner cannot pause its replacement when an old attempt settles', async () => {
  const h = mountVideo(); let resolve;
  h.video.pendingPlay = new Promise(done => { resolve = done; });
  h.view(true); h.warm(); await settle();
  h.dispose(); await settle();
  h.video.pendingPlay = null;
  const replacement = h.reattach();
  try {
    replacement.sync(); await settle();
    assert.equal(h.video.paused, false, 'the replacement owner has started playback');
    resolve(); await settle();
    assert.equal(h.video.paused, false, 'the disposed owner must not mutate replacement playback');
    assert.equal(h.video.playCalls, 2, 'each owner initiated only its own playback attempt');
  } finally { replacement.dispose(); }
});

test('non-opt-in videos retain the existing lazy playback behavior', async () => {
  const h = mountVideo({ resumeOnReturn: undefined }); h.warm(); await settle();
  assert.equal(h.video.paused, false);
  h.hidden(true); await settle();
  assert.equal(h.video.paused, false, 'other chapter playback is not managed by the new opt-in');
  h.dispose();
});
