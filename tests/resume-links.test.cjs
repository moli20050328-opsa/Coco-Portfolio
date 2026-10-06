const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');

const root = path.resolve(__dirname, '..');
// Effects and mounting belong to the browser check. Use real React elements
// here to verify the links and chapter routing the site supplies to visitors.
const context = {
  React: { ...React, useEffect() {}, useState: initial => [initial, () => {}], useRef: value => ({ current: value }) },
  ReactDOM: { createRoot: () => ({ render() {} }) },
  document: { getElementById: () => ({}) },
  window: { PortfolioChapters: {} },
  console
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/shell.js'), 'utf8'), context);

function collect(node, predicate, result = []) {
  if (!React.isValidElement(node)) return result;
  if (predicate(node)) result.push(node);
  React.Children.forEach(node.props.children, child => collect(child, predicate, result));
  return result;
}

test('the resume selector offers separate preview and download links for both directions', () => {
  assert.equal(typeof context.ResumeDocumentLinks, 'function', 'the visitor needs working resume choices');
  const links = collect(context.ResumeDocumentLinks({}), node => node.type === 'a');
  assert.equal(links.length, 4);
  for (const asset of ['assets/resumes/wang-yuxuan-game-gui.pdf', 'assets/resumes/wang-yuxuan-visual-design.pdf']) {
    const pair = links.filter(link => link.props.href === asset);
    assert.equal(pair.length, 2, `${asset} has a preview and a download`);
    const preview = pair.find(link => !link.props.download);
    assert.equal(preview.props.target, '_blank');
    assert.match(preview.props.rel, /noopener/);
    assert.match(pair.find(link => link.props.download).props.download, /王玉璇.*\.pdf$/);
  }
});

test('direction-specific resume links never send the visitor to the other version', () => {
  assert.equal(typeof context.ResumeDocumentLinks, 'function');
  for (const [direction, filename] of [['gui', 'wang-yuxuan-game-gui.pdf'], ['visual', 'wang-yuxuan-visual-design.pdf']]) {
    const links = collect(context.ResumeDocumentLinks({ direction }), node => node.type === 'a');
    assert.equal(links.length, 2);
    assert.ok(links.every(link => link.props.href === `assets/resumes/${filename}`));
  }
  assert.equal(context.ResumeDocumentLinks({ direction: 'unknown' }), null);
});

test('all advertised resume documents are bundled PDFs, not local-machine paths', () => {
  assert.equal(typeof context.ResumeDocumentLinks, 'function');
  const links = collect(context.ResumeDocumentLinks({}), node => node.type === 'a');
  for (const href of new Set(links.map(link => link.props.href))) {
    assert.match(href, /^assets\/resumes\/[a-z-]+\.pdf$/);
    const document = fs.readFileSync(path.join(root, href));
    assert.equal(document.subarray(0, 5).toString(), '%PDF-');
  }
});

test('only relevant chapters receive the matching resume shortcut', () => {
  const chapters = collect(context.App(), node => node.type === context.LazyChapter);
  const directions = Object.fromEntries(chapters.map(chapter => [chapter.props.name, chapter.props.resumeDirection || null]));
  assert.deepEqual(directions, { gameDesign: null, gameUI: 'gui', digital: null, packaging: 'visual', poster: 'visual' });
});

test('chapter shortcuts appear only once chapter content is available', () => {
  assert.equal(typeof context.ResumeChapterLink, 'function');
  const props = { name: 'gameUI', resumeDirection: 'gui', chapter: {}, reserve: '100px' };
  const pending = collect(context.LazyChapter(props), node => node.type === context.ResumeChapterLink);
  assert.equal(pending.length, 0);
  context.window.PortfolioChapters.gameUI = () => [];
  try {
    const loaded = collect(context.LazyChapter(props), node => node.type === context.ResumeChapterLink);
    assert.equal(loaded.length, 1);
    assert.equal(loaded[0].props.direction, 'gui');
  } finally {
    delete context.window.PortfolioChapters.gameUI;
  }
});
