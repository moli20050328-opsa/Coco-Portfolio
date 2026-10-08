const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/chapters/game-design.js'), 'utf8');
const PortfolioImage = function PortfolioImage() {};
const DeferredVideo = function DeferredVideo() {};

function renderChapter(reducedMotion = false) {
  const context = {
    React: { createElement(type, props, ...children) {
      return { type, props: props || {}, children: children.flat(Infinity) };
    } },
    PortfolioImage,
    DeferredVideo,
    useInView: () => [{ current: null }, true],
    window: { PortfolioChapters: {}, matchMedia: () => ({ matches: reducedMotion }) }
  };
  vm.runInNewContext(source, context, { filename: 'game-design.js' });
  return Array.from(context.window.PortfolioChapters.gameDesign(), page => page.type());
}

function nodesIn(node) {
  if (!node || typeof node !== 'object') return [];
  return [node, ...(node.children || []).flatMap(nodesIn)];
}

function pageWithClass(pages, className) {
  return pages.find(page => page.props.className.split(' ').includes(className));
}

test('the chapter presents five reading stages without standalone background or mechanics screens', () => {
  const pages = renderChapter();
  assert.equal(pages.length, 5);
  assert.deepEqual(pages.map(page => page.props.className.split(' ')[0]), [
    'cs-overview', 'dcp-section', 'dss-section', 'iev-section', 'pe-section'
  ]);
});

test('merged sections retain concept and background/mechanics hash destinations', () => {
  const pages = renderChapter();
  const conceptIds = nodesIn(pageWithClass(pages, 'dcp-section')).map(node => node.props.id);
  const interactionIds = nodesIn(pageWithClass(pages, 'iev-section')).map(node => node.props.id);
  for (const id of ['game-design-concept', 'game-design-background', 'cs-background']) {
    assert.ok(conceptIds.includes(id), `${id} resolves to the merged concept section`);
  }
  for (const id of ['game-design-gameplay', 'cs-gameplay']) {
    assert.ok(interactionIds.includes(id), `${id} resolves to the interaction evidence`);
  }
});

test('all chapter artwork and videos stay accessible alongside the current game QR', () => {
  const nodes = renderChapter().flatMap(nodesIn);
  const assets = new Set(nodes.flatMap(node => [node.props.src, node.props.poster]).filter(Boolean));
  const required = [
    'taishan-hero.mp4', 'taishan-hero-poster.jpg', 'assets/game-demo/qr-yf8s.png',
    'taishan-puppet.jpg', 'taishan-puppet2.jpg', 'taishan-concept1.jpg', 'taishan-concept2.jpg',
    'story-scholar.png', 'story-forest.jpg', 'story-elder.jpg', 'story-puzzle.jpg',
    'story-mirror-before.jpg', 'story-mirror-after.jpg', 'story-temple.jpg', 'story-combat-2.jpg',
    'gameplay-drag.jpg', 'gameplay-mirror-before.jpg', 'gameplay-mirror-after.jpg', 'gameplay-combat.jpg',
    'interaction-drag.mp4', 'interaction-mirror.mp4', 'interaction-combat.mp4', 'gameplay-demo.mp4'
  ];
  for (const asset of required) {
    assert.ok(assets.has(asset), `${asset} remains accessible`);
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} is a bundled local asset`);
  }
});

test('each interaction video retains its matching full static evidence in an accessible disclosure', () => {
  const pages = renderChapter();
  const modules = nodesIn(pageWithClass(pages, 'iev-section')).filter(node =>
    (node.props.className || '').split(' ').includes('iev-video-module'));
  const pairs = [
    ['interaction-drag.mp4', ['gameplay-drag.jpg']],
    ['interaction-mirror.mp4', ['gameplay-mirror-before.jpg', 'gameplay-mirror-after.jpg']],
    ['interaction-combat.mp4', ['gameplay-combat.jpg']]
  ];
  for (const [video, images] of pairs) {
    const module = modules.find(item => nodesIn(item).some(node => node.type === DeferredVideo && node.props.src === video));
    assert.ok(module, `${video} is rendered`);
    const disclosure = nodesIn(module).find(node => node.type === 'details');
    assert.ok(disclosure, `${video} exposes its static evidence without another screen`);
    assert.ok(disclosure.children.some(node => node.type === 'summary'), 'native disclosure has a visible label');
    const stills = nodesIn(disclosure).filter(node => node.type === PortfolioImage).map(node => node.props.src);
    assert.deepEqual(stills, images);
  }
});

test('the three interaction videos keep controls and respect reduced motion', () => {
  const interaction = pageWithClass(renderChapter(true), 'iev-section');
  const videos = nodesIn(interaction).filter(node => node.type === DeferredVideo);
  assert.equal(videos.length, 3);
  videos.forEach(video => {
    assert.equal(video.props.controls, true);
    assert.equal(video.props.autoPlay, false);
    assert.equal(video.props.loop, false);
    assert.equal(video.props.playsInline, true);
  });
});

test('all five GAME DESIGN videos offer manual controls and opt into return playback', () => {
  const videos = renderChapter().flatMap(nodesIn).filter(node => node.type === DeferredVideo);
  assert.equal(videos.length, 5);
  videos.forEach(video => {
    assert.equal(video.props.controls, true, `${video.props.src} has a manual play fallback`);
    assert.equal(video.props.resumeOnReturn, true);
    assert.ok(video.props['aria-label'], 'each native player has an accessible name');
  });
});
