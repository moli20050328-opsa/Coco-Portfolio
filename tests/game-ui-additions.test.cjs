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

test('the two horizontal GUI cases follow the existing warehouse case', () => {
  const names = Array.from(context.window.PortfolioChapters.gameUI(), page => page.type.name);
  assert.deepEqual(names.slice(-3), ['WarehouseGUICase', 'DuoyiGUICase', 'GiantGUICase']);
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
