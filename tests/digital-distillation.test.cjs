const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('../assets/vendor/react.production.min.js');

const root = path.resolve(__dirname, '..');

function loadDigital() {
  const state = new Map();
  let component;
  let cursor;
  const react = {
    ...React,
    useEffect() {},
    useRef: value => ({ current: value }),
    useState(initial) {
      const slots = state.get(component) || [];
      state.set(component, slots);
      const index = cursor++;
      if (!(index in slots)) slots[index] = initial;
      return [slots[index], value => { slots[index] = value; }];
    }
  };
  const context = {
    React: react,
    ReactDOM: { createRoot: () => ({ render() {} }) },
    document: { getElementById: () => ({}) },
    window: { PortfolioChapters: {} },
    console
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/shell.js'), 'utf8'), context);
  // Scroll observation is a browser side effect; preserve the real component output.
  context.useInView = () => [{ current: null }, true];
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/chapters/digital.js'), 'utf8'), context);
  return {
    context,
    render(type, props = {}) {
      component = type;
      cursor = 0;
      return type(props);
    }
  };
}

function collect(node, predicate, result = []) {
  if (!React.isValidElement(node)) return result;
  if (predicate(node)) result.push(node);
  React.Children.forEach(node.props.children, child => collect(child, predicate, result));
  return result;
}

test('digital chapter consolidates the supporting narrative into four modules', () => {
  const { context } = loadDigital();
  const modules = Array.from(context.window.PortfolioChapters.digital());
  assert.equal(modules.length, 4);
  assert.equal(modules[0].type, context.MiniProgramShowcase);
  assert.equal(modules.filter(node => node.type === context.InformationArchitecture).length, 1);
});

test('all thirteen filmstrip choices still select four consecutive real screens, including wraparound', () => {
  const { context, render } = loadDigital();
  for (let selected = 0; selected < 13; selected++) {
    const gallery = render(context.MiniProgramShowcase);
    const filmstrip = collect(gallery, node => node.type === context.MPFilmstrip)[0];
    const buttons = collect(render(filmstrip.type, filmstrip.props), node => node.type === 'button');
    assert.equal(buttons.length, 26, 'one selectable strip plus its visual loop copy');
    assert.equal(buttons.filter(node => node.props.tabIndex === 0).length, 13);
    assert.ok(buttons.slice(13).every(node => node.props.tabIndex === -1 && node.props['aria-hidden'] === 'true'));
    buttons[selected].props.onClick();
    const updated = render(context.MiniProgramShowcase);
    const showcase = collect(updated, node => node.type === context.MPShowcase)[0];
    const images = collect(render(showcase.type, showcase.props), node => node.type === context.PortfolioImage);
    assert.equal(images.length, 4);
    assert.equal(images[0].props.src, `slides/mp-${String(selected + 1).padStart(2, '0')}.png`);
    assert.ok(images.every(node => node.props.loading === 'lazy'));
    if (selected === 12) {
      assert.deepEqual(images.map(node => node.props.src), [
        'slides/mp-13.png', 'slides/mp-01.png', 'slides/mp-02.png', 'slides/mp-03.png'
      ]);
    }
    const thumbnails = collect(render(filmstrip.type, filmstrip.props), node => node.type === context.DeferredPortfolioImage);
    assert.equal(thumbnails.length, 26, 'keep deferred media wrappers on both filmstrip copies');
    assert.ok(thumbnails.every(node => node.props.loading === 'lazy' && fs.existsSync(path.join(root, node.props.src))));
  }
});

test('filmstrip accessible names describe the actual exported screen rather than an unrelated page', () => {
  const { context, render } = loadDigital();
  const filmstrip = render(context.MPFilmstrip, {
    pages: context.miniProgramPages, activeStart: 0, onSelect() {}
  });
  const buttons = collect(filmstrip, node => node.type === 'button').slice(0, 13);
  const names = ['启动页', '访问方式', '账号登录', '兴趣与方向选择', '推荐首页', '分类入口与获奖作品',
    '作品详情', '动态广场', '个人中心', '分类筛选', '编辑资料', '搜索', '最近留言'];
  buttons.forEach((button, index) => {
    assert.ok(button.props['aria-label'].endsWith(': ' + names[index]), 'screen ' + (index + 1));
    const image = collect(button, node => node.type === context.DeferredPortfolioImage)[0];
    assert.equal(image.props.alt, names[index]);
  });
});

test('the old result deep link resolves to the merged architecture flow', () => {
  const { context, render } = loadDigital();
  const architecture = render(context.InformationArchitecture);
  const targets = collect(architecture, node => node.props.id === 'mini-result');
  assert.equal(targets.length, 1);
  assert.equal(targets[0].type, 'section', 'deep links enter the observed section at its navigation-safe top');
  assert.ok(targets[0].props.className.includes('mp-distilled'));
  assert.equal(collect(targets[0], node => (node.props.className || '').split(' ').includes('ia-step')).length, 4);
});

test('interface detail explanations include two existing full screenshots with reserved ratios and lazy loading', () => {
  const { context, render } = loadDigital();
  const details = render(context.DesignSystem);
  const images = collect(details, node => node.type === context.PortfolioImage);
  assert.deepEqual(images.map(node => node.props.src), ['slides/mp-04.png', 'slides/mp-13.png']);
  assert.deepEqual(images.map(node => [node.props.width, node.props.height]), [[1501, 2906], [1500, 3000]]);
  assert.ok(images.every(node => node.props.loading === 'lazy' && fs.existsSync(path.join(root, node.props.src))));
});
