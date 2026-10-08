const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');
const root = path.resolve(__dirname, '..');
const origin = 'https://portfolio.example/';

function loaderContext(version) {
  const scripts = [];
  const context = {
    React: { ...React, useEffect() {}, useState: value => [value, () => {}], useRef: value => ({ current: value }) },
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
