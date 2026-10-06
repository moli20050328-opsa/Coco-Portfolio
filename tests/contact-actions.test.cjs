const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');

const source = fs.readFileSync(path.join(__dirname, '../assets/js/shell.js'), 'utf8');
function load(navigator = {}) {
  // Only browser mounting, effects and hook storage are replaced. The actual
  // component event handler must await the browser clipboard result.
  const state = [];
  let cursor = 0;
  const context = {
    React: { ...React, useEffect() {}, useRef: current => ({ current }),
      useState(initial) {
        const index = cursor++;
        if (!(index in state)) state[index] = initial;
        return [state[index], value => { state[index] = value; }];
      }
    },
    ReactDOM: { createRoot: () => ({ render() {} }) },
    document: { getElementById: () => ({}) },
    window: { PortfolioChapters: {} }, navigator, console
  };
  vm.createContext(context);
  vm.runInContext(source, context);
  return { context, render(component, props) { cursor = 0; return component(props); } };
}
function collect(node, predicate, result = []) {
  if (!React.isValidElement(node)) return result;
  if (predicate(node)) result.push(node);
  React.Children.forEach(node.props.children, child => collect(child, predicate, result));
  return result;
}
function actionFixture(navigator, label = '邮箱', value = '1617721560@qq.com') {
  const app = load(navigator);
  assert.equal(typeof app.context.ContactCopyAction, 'function', 'contact visitors need a copy action');
  function view() {
    const tree = app.render(app.context.ContactCopyAction, { label, value });
    return {
      button: collect(tree, node => node.type === 'button')[0],
      status: collect(tree, node => node.props.role === 'status')[0]
    };
  }
  return view;
}

test('contact keeps mail and telephone links and offers separate email/wechat copy actions', () => {
  const { context } = load();
  const tree = context.Contact();
  const links = collect(tree, node => node.type === 'a');
  assert.ok(links.some(node => node.props.href === 'mailto:1617721560@qq.com'));
  assert.ok(links.some(node => node.props.href === 'tel:18768328359'));
  const copies = collect(tree, node => node.type === context.ContactCopyAction);
  assert.equal(copies.length, 2);
  assert.deepEqual(copies.map(node => [node.props.label, node.props.value]), [
    ['邮箱', '1617721560@qq.com'], ['微信', 'treasure0328x']
  ]);
  for (const link of links) {
    assert.equal(collect(link, node => node.type === context.ContactCopyAction || node.type === 'button').length, 0);
  }
});

test('contact offers both resume directions without replacing the existing contact methods', () => {
  const { context } = load();
  const resume = collect(context.Contact(), node => node.type === context.ResumeDocumentLinks);
  assert.equal(resume.length, 1);
  const links = collect(context.ResumeDocumentLinks(resume[0].props), node => node.type === 'a');
  assert.equal(links.length, 4);
  assert.deepEqual([...new Set(links.map(node => node.props.href))], [
    'assets/resumes/wang-yuxuan-game-gui.pdf', 'assets/resumes/wang-yuxuan-visual-design.pdf'
  ]);
});

test('copy waits for clipboard success before announcing it, preserving the exact contact value', async () => {
  let written;
  let complete;
  const view = actionFixture({ clipboard: { writeText(value) {
    written = value;
    return new Promise(resolve => { complete = resolve; });
  } } });
  assert.equal(view().status.props['aria-live'], 'polite');
  const pending = view().button.props.onClick();
  assert.equal(written, '1617721560@qq.com');
  assert.equal(view().button.props.disabled, true);
  assert.doesNotMatch(view().status.props.children, /已复制/);
  complete();
  await pending;
  assert.equal(view().button.props.disabled, false);
  assert.match(view().status.props.children, /邮箱.*已复制/);
});

test('denied clipboard access shows a manual recovery and allows a successful retry', async () => {
  let reject = true;
  let written;
  const view = actionFixture({ clipboard: { async writeText(value) {
    written = value;
    if (reject) throw new Error('Permission denied');
  } } }, '微信', 'treasure0328x');
  await view().button.props.onClick();
  assert.match(view().status.props.children, /手动复制/);
  assert.doesNotMatch(view().status.props.children, /已复制/);
  assert.equal(view().button.props.disabled, false);
  reject = false;
  await view().button.props.onClick();
  assert.equal(written, 'treasure0328x');
  assert.match(view().status.props.children, /微信.*已复制/);
});

test('browsers without a Clipboard API keep a usable manual-copy fallback', async () => {
  const view = actionFixture({});
  await view().button.props.onClick();
  assert.match(view().status.props.children, /手动复制/);
  assert.equal(view().button.props.disabled, false);
});
