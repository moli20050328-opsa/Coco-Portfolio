const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');

const root = path.resolve(__dirname, '..');
// Keep the real element output; browser effects and root mounting are covered in UI checks.
const context = {
  React: { ...React, useEffect() {}, useState: initial => [initial, () => {}], useRef: value => ({ current: value }) },
  ReactDOM: { createRoot: () => ({ render() {} }) },
  document: { getElementById: () => ({}) }, window: { PortfolioChapters: {} }, console
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/shell.js'), 'utf8'), context);

function collect(node, predicate, result = []) {
  if (!React.isValidElement(node)) return result;
  if (predicate(node)) result.push(node);
  React.Children.forEach(node.props.children, child => collect(child, predicate, result));
  return result;
}

function projectEntries() {
  return collect(context.AboutRightPanel(), node => (node.props.className || '').split(' ').includes('about-proj-item'));
}

test('About project entries are native links to the matching existing cases', () => {
  const entries = projectEntries();
  assert.equal(entries.length, 4);
  assert.ok(entries.every(node => node.type === 'a'), 'project hover affordances must lead to keyboard-accessible links');
  assert.deepEqual(entries.map(node => node.props.href), [
    '#section-01', '#section-02', '#packaging-project-visual', '#game-ui-rain-cover'
  ]);
});

test('every About project link includes a real lightweight local thumbnail with reserved dimensions', () => {
  const entries = projectEntries();
  let totalBytes = 0;
  for (const entry of entries) {
    const images = collect(entry, node => node.type === context.PortfolioImage || node.type === 'img');
    assert.equal(images.length, 1, 'each project needs one recognizable work thumbnail');
    const props = images[0].props;
    assert.match(props.src, /^assets\/about-thumbnails\/[a-z-]+\.webp$/);
    assert.ok(props.width > 0 && props.height > 0, 'reserve the original aspect ratio');
    assert.equal(props.loading, 'lazy');
    totalBytes += fs.statSync(path.join(root, props.src)).size;
  }
  assert.ok(totalBytes < 150_000, 'small project thumbnails must not fetch full-resolution case art');
});
