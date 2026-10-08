const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');
const root = path.resolve(__dirname, '..');

function siteContext() {
  const context = {
    React: { ...React, useEffect() {}, useState: value => [value, () => {}], useRef: value => ({ current: value }) },
    ReactDOM: { createRoot: () => ({ render() {} }) },
    document: { getElementById: () => ({}) }, window: { PortfolioChapters: {} }, console
  };
  vm.createContext(context);
  for (const file of ['assets/js/shell.js', 'assets/chapters/game-design.js', 'assets/chapters/game-ui.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  return context;
}
function collect(node, predicate, result = []) {
  if (!React.isValidElement(node)) return result;
  if (predicate(node)) result.push(node);
  React.Children.forEach(node.props.children, child => collect(child, predicate, result));
  return result;
}

test('GUI divider provides direct, native links to every existing case without waiting for chapter content', () => {
  const context = siteContext();
  const divider = context.ChapterDivider({ chapter: context.ccChapters.gameUI, sectionId: 'section-game-ui' });
  const hrefs = collect(divider, node => node.type === 'a').map(node => node.props.href);
  for (const target of ['game-ui-rain-cover', 'game-ui-case-cover', 'game-ui-shuaitu-cover', 'game-ui-warehouse', 'game-ui-duoyi', 'game-ui-giant']) {
    assert.equal(hrefs.filter(href => href === '#' + target).length, 1, target + ' is directly reachable once');
    assert.equal(context.hashTargetsChapter('gameUI', target), true, 'native hash also wakes the lazy chapter');
  }
  assert.equal(collect(divider, node => node.type === context.PortfolioImage || node.type === 'img').length, 0, 'index does not eagerly fetch case artwork');
});

test('project index links resolve to rendered case IDs and do not alter other chapter dividers', () => {
  const context = siteContext();
  const pages = context.window.PortfolioChapters.gameUI().map(page => page.type(page.props));
  const ids = pages.flatMap(page => collect(page, node => !!node.props.id).map(node => node.props.id));
  const divider = context.ChapterDivider({ chapter: context.ccChapters.gameUI, sectionId: 'section-game-ui' });
  const links = collect(divider, node => node.type === 'a' && (node.props.href || '').startsWith('#game-ui-'));
  assert.equal(links.length, 6);
  links.forEach(link => assert.ok(ids.includes(link.props.href.slice(1)), link.props.href + ' resolves'));
  for (const key of ['game', 'digital', 'visualPackaging', 'visualPoster']) {
    const other = context.ChapterDivider({ chapter: context.ccChapters[key], sectionId: 'other' });
    assert.equal(collect(other, node => node.type === 'a' && (node.props.href || '').startsWith('#game-ui-')).length, 0);
  }
});

test('both QR experience placements link to the user-confirmed H5 without eagerly embedding it', () => {
  const context = siteContext();
  for (const page of [context.CaseStudyOverview(), context.CaseStudyPlayable()]) {
    const links = collect(page, node => node.type === 'a' && node.props.href === 'https://c.u.h5mc.com/c/bxqd/yf8s/index.html');
    assert.equal(links.length, 1, 'direct play accompanies the existing QR code');
    assert.equal(links[0].props.target, '_blank');
    assert.match(links[0].props.rel, /noopener/);
    const codes = collect(page, node => node.props.src === 'assets/game-demo/qr-yf8s.png');
    assert.equal(codes.length, 1, 'QR accompanies the current direct link');
    assert.equal(codes[0].props.width, codes[0].props.height, 'QR reserves a square before loading');
    assert.ok(codes[0].props.width > 0);
    assert.equal(collect(page, node => node.type === 'iframe').length, 0, 'third-party game is not loaded before a click');
  }
  assert.ok(fs.existsSync(path.join(root, 'qr-demo.png')), 'original QR asset is preserved');
  assert.ok(fs.existsSync(path.join(root, 'assets/game-demo/qr-yf8s.png')), 'current QR is bundled');
});
