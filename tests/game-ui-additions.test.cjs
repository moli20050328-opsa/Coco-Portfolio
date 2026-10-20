const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/chapters/game-ui.js'), 'utf8');
const PortfolioImage = function PortfolioImage() {};
const React = {
  createElement(type, props, ...children) {
    return { type, props: props || {}, children: children.flat() };
  }
};
const context = {
  React,
  PortfolioImage,
  window: { PortfolioChapters: {} }
};
vm.runInNewContext(source, context, { filename: 'game-ui.js' });

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  (node.children || []).forEach(child => walk(child, visit));
}

function findAll(node, predicate) {
  const matches = [];
  walk(node, child => {
    if (predicate(child)) matches.push(child);
  });
  return matches;
}

function textContent(node) {
  if (typeof node === 'string') return node;
  return (node && node.children || []).map(textContent).join('');
}

test('the rain project keeps both pages and their original deep-link anchors', () => {
  const pages = Array.from(context.window.PortfolioChapters.gameUI())
    .filter(page => page.type.name === 'RainArchiveCase');
  assert.equal(pages.length, 2);
  assert.deepEqual(pages.map(page => page.props.key), ['game-ui-rain-cover', 'game-ui-rain-collection']);
  assert.deepEqual(pages.map(page => page.type(page.props).props.id), ['game-ui-rain-cover', 'game-ui-rain-collection']);
});

test('the rain collection page keeps its complete hero and copy without the lower crop module', () => {
  const page = context.window.PortfolioChapters.gameUI()
    .find(item => item.type.name === 'RainArchiveCase' && item.props.collection === true);
  assert.ok(page, 'the collection page remains present');
  const rendered = page.type(page.props);
  assert.equal(rendered.props['aria-labelledby'], 'game-ui-rain-collection-title');
  const heroes = findAll(rendered, node => node.props.className === 'rain-case__hero');
  assert.equal(heroes.length, 1);
  const images = findAll(rendered, node => node.type === PortfolioImage);
  assert.equal(images.length, 1, 'only the complete collection artwork is rendered');
  assert.ok(findAll(heroes[0], node => node === images[0]).length === 1, 'the artwork stays in the hero');
  assert.equal(images[0].props.src, 'assets/rain/rain-collection.webp');
  assert.equal(images[0].props.width, 2592);
  assert.equal(images[0].props.height, 1080);
  assert.equal(images[0].props.alt, '雨前归纳者情报解谜册完整弹窗状态，保留压暗的主界面背景');
  assert.equal(findAll(rendered, node => node.props.className === 'rain-case__module').length, 0);
  assert.equal(findAll(rendered, node => node.type.name === 'RainCrop').length, 0);
  assert.ok(!textContent(rendered).includes('从入口到档案'));
  assert.ok(textContent(rendered).includes('PAGE 02 / 02'));
  assert.ok(textContent(rendered).includes('情报收集与解谜档案'));
  assert.equal(textContent(findAll(rendered, node => node.props.className === 'rain-case__intro')[0]),
    '将情报收集作为主界面的独立功能入口，以档案册形式承载资料索引与内容查看，并通过已收集、待收集、当前查看及完成状态建立清晰反馈。');
  const caption = findAll(rendered, node => node.props.className === 'rain-case__caption')[0];
  assert.ok(caption, 'the original hero caption remains');
  assert.deepEqual(caption.children.map(textContent), [
    '01COLLECTION / 收集入口', '→ARCHIVE / 情报解谜册', '→DETAIL / 资料查看'
  ]);
});

test('the rain cover still presents all four original level crops and progress states', () => {
  const page = context.window.PortfolioChapters.gameUI()
    .find(item => item.type.name === 'RainArchiveCase' && item.props.collection !== true);
  const rendered = page.type(page.props);
  assert.equal(findAll(rendered, node => node.props.className === 'rain-case__module').length, 1);
  assert.ok(textContent(rendered).includes('PAGE 01 / 02'));
  assert.ok(textContent(rendered).includes('关卡类型与进度状态'));
  const crops = findAll(rendered, node => node.type.name === 'RainCrop');
  assert.equal(crops.length, 4);
  assert.deepEqual(crops.map(node => ({
    image: node.props.image,
    bounds: Array.from(node.props.bounds),
    alt: node.props.alt
  })), [
    { image: 'rain-main', bounds: [387, 800, 363, 190], alt: '01 剧情关卡：已通关' },
    { image: 'rain-main', bounds: [772, 800, 363, 190], alt: '02 剧情关卡：新解锁' },
    { image: 'rain-main', bounds: [1164, 799, 605, 206], alt: '03 战斗关卡：当前关卡' },
    { image: 'rain-main', bounds: [1813, 803, 397, 202], alt: '04 战斗关卡：尚未解锁' }
  ]);
  const levels = findAll(rendered, node => node.props.className === 'rain-case__levels')[0];
  assert.ok(levels, 'the four-state level row remains');
  assert.deepEqual(findAll(levels, node => node.type === 'p').map(textContent), [
    '已通关', '新解锁', '当前关卡', '尚未解锁'
  ]);
});

test('GUI pages keep each project together with all dark cases before the light cases', () => {
  const names = Array.from(context.window.PortfolioChapters.gameUI(), page => page.type.name);
  assert.equal(names.length, 10, 'reordering does not add or remove chapter pages');
  assert.deepEqual(names, [
    'RainArchiveCase', 'RainArchiveCase',
    'GameUICaseCover', 'GameUISystemAnalysis', 'GameUIMotionPreview',
    'GiantGUICase',
    'ShuaituCaseCover', 'ShuaituStructureComponents',
    'SignInRewardsCase', 'DuoyiGUICase'
  ]);
  assert.equal(names.includes('WarehouseGUICase'), false, 'the previous case is no longer rendered');
});

function signInCase() {
  const page = context.window.PortfolioChapters.gameUI().find(item => item.type.name === 'SignInRewardsCase');
  assert.ok(page, 'the sign-in rewards case is registered');
  assert.equal(page.props.key, 'game-ui-signin');
  return page.type(page.props);
}

function hasClass(node, className) {
  return (node.props.className || '').split(/\s+/).includes(className);
}

test('sign-in rewards has a canonical section and preserves the warehouse deep link as an empty alias', () => {
  const rendered = signInCase();
  assert.equal(rendered.type, 'section');
  assert.equal(rendered.props.id, 'game-ui-signin');
  const heading = findAll(rendered, node => node.type === 'h2')[0];
  assert.ok(heading, 'the case has a main heading');
  assert.equal(textContent(heading), '签到豪礼');
  assert.equal(rendered.props['aria-labelledby'], heading.props.id);
  assert.ok(heading.props.id, 'the accessible name points to a real heading ID');
  const aliases = findAll(rendered, node => node.props.id === 'game-ui-warehouse');
  assert.equal(aliases.length, 1, 'old deep links resolve exactly once inside the new case');
  assert.equal(aliases[0].type, 'span');
  assert.equal(String(aliases[0].props['aria-hidden']), 'true');
  assert.equal(textContent(aliases[0]), '', 'the compatibility anchor does not duplicate the old case');
  assert.ok(!textContent(rendered).includes('仓库里的不速之客'));
});

test('sign-in rewards presents the complete original portrait and square entry artwork at their native ratios', () => {
  const rendered = signInCase();
  for (const [className, asset, width, height] of [
    ['signin-case__hero', 'assets/signin/signin-rewards.jpg', 640, 1136],
    ['signin-case__entry', 'assets/signin/entry.png', 256, 256]
  ]) {
    const regions = findAll(rendered, node => hasClass(node, className));
    assert.equal(regions.length, 1, className + ' appears once');
    const images = findAll(regions[0], node => node.type === PortfolioImage);
    assert.equal(images.length, 1, className + ' contains one original image');
    assert.equal(images[0].props.src, asset);
    assert.equal(images[0].props.width, width);
    assert.equal(images[0].props.height, height);
    assert.ok(images[0].props.alt, 'artwork has an accessible description');
    assert.ok(fs.existsSync(path.join(root, asset)), asset + ' is bundled with the site');
  }
});

test('the three sign-in states are crops of the supplied artwork, not additional or reconstructed GUI screens', () => {
  const rendered = signInCase();
  const regions = findAll(rendered, node => hasClass(node, 'signin-case__states'));
  assert.equal(regions.length, 1);
  const states = regions[0];
  for (const label of ['已签到', '可签到', '未解锁']) {
    assert.ok(textContent(states).includes(label), label + ' remains explained');
  }
  const crops = findAll(states, node => hasClass(node, 'signin-case__state-crop'));
  assert.equal(crops.length, 3, 'exactly three state details are shown');
  const cropStyles = [];
  crops.forEach(crop => {
    const images = findAll(crop, node => node.type === PortfolioImage);
    assert.equal(images.length, 1);
    assert.equal(images[0].props.src, 'assets/signin/signin-rewards.jpg');
    assert.equal(images[0].props.width, 640);
    assert.equal(images[0].props.height, 1136);
    assert.ok(images[0].props.alt, 'each original state detail has an accessible description');
    cropStyles.push(images[0].props.style);
  });
  assert.equal(new Set(cropStyles.map(style => style.width)).size, 1, 'state details use the same crop scale');
  assert.equal(new Set(cropStyles.map(style => style.top)).size, 1, 'state details crop the same source row');
  assert.equal(new Set(cropStyles.map(style => style.left)).size, 3, 'each detail reveals a distinct state');
  assert.ok(cropStyles.every(style => /%$/.test(style.width) && parseFloat(style.width) > 100), 'crops remain resolution-independent enlargements of the original');
  const sources = new Set(findAll(rendered, node => node.type === PortfolioImage).map(node => node.props.src));
  assert.deepEqual([...sources].sort(), ['assets/signin/entry.png', 'assets/signin/signin-rewards.jpg']);
});

test('replacing the warehouse display leaves all of its original bundled assets intact', () => {
  for (const file of ['level.webp', 'coin.jpg', 'gem.jpg', 'warrior.jpg']) {
    const asset = path.join(root, 'assets/warehouse', file);
    assert.ok(fs.existsSync(asset), file + ' remains available as original material');
    assert.ok(fs.statSync(asset).size > 0, file + ' is not an empty placeholder');
  }
});

test('each new case presents its complete original GUI image from a deployable local asset', () => {
  const cases = [
    ['DuoyiGUICase', 'assets/duoyi/character-detail.png'],
    ['GiantGUICase', 'assets/giant/gala-reward.jpg']
  ];
  const pages = context.window.PortfolioChapters.gameUI();
  cases.forEach(([name, asset]) => {
    const page = pages.find(item => item.type.name === name);
    assert.ok(page, `${name} is present`);
    const images = [];
    walk(page.type(), node => {
      if (node.type === PortfolioImage) images.push(node.props);
    });
    assert.ok(images.some(image => image.src === asset && image.width === 1334 && image.height === 750), `${name} preserves the main image ratio`);
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} is bundled with the site`);
  });
});
