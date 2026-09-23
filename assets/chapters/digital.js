/* ---------- Mini Program Showcase (mp- prefix) ---------- */

/* Chapter Title */
function MPChapterTitle() {
  return React.createElement('section', { id: 'section-02', className: 'mp-chapter snap-slide' },
    React.createElement('div', { className: 'mp-chapter-bg' }),
    React.createElement(Reveal, { y: 30, duration: 1.2, className: 'text-center' },
      React.createElement('p', { className: 'mp-chapter-num' }, '02'),
      React.createElement('h2', { className: 'mp-chapter-en' }, 'MINI PROGRAM UI DESIGN'),
      React.createElement('p', { className: 'mp-chapter-cn' }, '小程序页面设计'),
      React.createElement('p', { className: 'mp-chapter-sub' }, 'UI CASE STUDY · 13 SCREENS')
    )
  );
}

/* Showcase — 4 images, staggered then aligned on scroll */
var mpEnterDirs = [
  { y: -200 },
  { y: 200 },
  { y: -200 },
  { y: 200 }
];
var mpDelays = [0, 0.15, 0.3, 0.45];

function MPShowcase(props) {
  var result = useInView({ threshold: 0.15 });
  var ref = result[0]; var inView = result[1];
  var pages = props.pages;
  return React.createElement('div', { ref: ref, className: 'mp-showcase snap-slide' },
    React.createElement('div', { className: 'mp-intro' },
      React.createElement('p', { className: 'mp-intro-label' }, 'VISUAL PORTFOLIO PLATFORM'),
      React.createElement('p', { className: 'mp-intro-title' }, '视觉作品交流平台'),
      React.createElement('p', { className: 'mp-intro-desc' }, '通过作品发现、创作展示与设计交流，'),
      React.createElement('p', { className: 'mp-intro-desc' }, '建立设计师之间的连接。')
    ),
    React.createElement('div', { className: 'mp-phones-row' },
      pages.map(function(page, i) {
      var dir = mpEnterDirs[i % 4];
      var delay = mpDelays[i % 4];
      var style = {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(' + dir.y + 'px)',
        transition: 'opacity 1.4s cubic-bezier(0.22,1,0.36,1) ' + delay + 's, transform 1.4s cubic-bezier(0.22,1,0.36,1) ' + delay + 's'
      };
      return React.createElement('div', { key: i, className: 'mp-showcase-item', style: style },
        React.createElement('span', { className: 'mp-showcase-badge' }, 'SCREEN ' + page.id),
        React.createElement(PortfolioImage, { src: page.image, alt: page.title, loading: 'lazy' })
      );
    })
    )
  );
}

/* Filmstrip — infinite scroll, click to select */
function MPFilmstrip(props) {
  var pages = props.pages;
  var activeStart = props.activeStart;
  var onSelect = props.onSelect;
  var filmstripPages = pages.concat(pages);
  function isActive(idx) {
    var total = pages.length;
    for (var j = 0; j < 4; j++) {
      if ((activeStart + j) % total === idx) return true;
    }
    return false;
  }
  return React.createElement('div', { className: 'mp-filmstrip-section' },
    React.createElement(Reveal, { y: 20, duration: 0.6, className: 'mp-filmstrip-label' },
      '// All Screens — Click to Explore'
    ),
    React.createElement('div', { className: 'mp-filmstrip-wrap' },
      React.createElement('div', { className: 'mp-filmstrip' },
        filmstripPages.map(function(page, i) {
          var realIdx = i % pages.length;
          var isDuplicate = i >= pages.length;
          var active = isActive(realIdx);
          return React.createElement('button', {
            key: i,
            type: 'button',
            tabIndex: isDuplicate ? -1 : 0,
            'aria-hidden': isDuplicate ? 'true' : undefined,
            className: 'mp-thumb' + (active ? ' active' : ''),
            onClick: function() { onSelect(realIdx); },
            'aria-label': isDuplicate ? undefined : 'Show screen ' + page.id + ': ' + page.title,
            'aria-pressed': isDuplicate ? undefined : active
          },
            React.createElement(DeferredPortfolioImage, { src: page.image, alt: page.title, loading: 'lazy' }),
            React.createElement('span', { className: 'mp-thumb-num' }, page.id)
          );
        })
      )
    )
  );
}

/* Main MiniProgramShowcase — assembles all sections */
function MiniProgramShowcase() {
  var startState = useState(4);
  var showcaseStart = startState[0]; var setShowcaseStart = startState[1];
  var total = miniProgramPages.length;
  var showcasePages = [];
  for (var i = 0; i < 4; i++) {
    showcasePages.push(miniProgramPages[(showcaseStart + i) % total]);
  }
  return React.createElement('div', { className: 'mp-section' },
    React.createElement(MPShowcase, { key: 'mp-showcase', pages: showcasePages }),
    React.createElement(MPFilmstrip, { key: 'mp-film', pages: miniProgramPages, activeStart: showcaseStart, onSelect: setShowcaseStart }),
    React.createElement('p', { className: 'mp-hint' }, 'Click thumbnails to update showcase above')
  );
}

function MiniProgramResult() {
  var resultPages = [miniProgramPages[0], miniProgramPages[4], miniProgramPages[6]];
  return React.createElement('section', { id: 'mini-result', className: 'mp-result-section', 'aria-labelledby': 'mp-result-title' },
    React.createElement('div', { className: 'mp-result-copy' },
      React.createElement('p', { className: 'mp-result-kicker' }, 'APPLIED RESULT'),
      React.createElement('h2', { id: 'mp-result-title', className: 'mp-result-title' }, 'From System to Experience'),
      React.createElement('p', { className: 'mp-result-title-cn' }, '从设计规范走向完整体验'),
      React.createElement('p', { className: 'mp-result-desc' },
        '围绕发现、展示与连接三个核心场景，将视觉语言、信息架构和组件规范落实到连续的小程序体验中。'
      ),
      React.createElement('div', { className: 'mp-result-flow', 'aria-label': 'Primary user journey' },
        ['Discover', 'Showcase', 'Connect'].map(function(label, i) {
          return React.createElement(React.Fragment, { key: label },
            React.createElement('span', { className: 'mp-result-flow-step' }, label),
            i < 2 ? React.createElement('span', { className: 'mp-result-flow-arrow', 'aria-hidden': 'true' }, '→') : null
          );
        })
      )
    ),
    React.createElement('div', { className: 'mp-result-screens' },
      resultPages.map(function(page, i) {
        return React.createElement('figure', { key: page.id, className: 'mp-result-screen mp-result-screen-' + (i + 1) },
          React.createElement(PortfolioImage, { src: page.image, alt: page.title, loading: 'lazy' }),
          React.createElement('figcaption', null, page.id + ' / ' + page.title)
        );
      })
    )
  );
}


/* ---------- Design Direction (dd- prefix) ---------- */
var designDirectionPrinciples = [
  { num: '01', label: 'BRAND TONE', keyword: '森系绿色', desc: '贴合展览调性，强化文艺清新气质' },
  { num: '02', label: 'LAYOUT SYSTEM', keyword: '留白 + 卡片式', desc: '弱化界面压迫感，让作品成为主体' },
  { num: '03', label: 'VISUAL LANGUAGE', keyword: '统一风格', desc: '统一图标、按钮、字体，打造干净视觉语言' },
  { num: '04', label: 'INFORMATION', keyword: '层级优化', desc: '突出作品、作者、获奖等核心内容' },
  { num: '05', label: 'EMOTIONAL UX', keyword: '情感化交互', desc: '已读未读、在线标识、点赞评论，增强参与感' }
];

var designDirectionKeywords = [
  { num: '01', en: 'NATURE', cn: '自然', subtitle: 'Organic Visual Language', desc: '森系绿色为主色调，通过自然色彩和柔和形态降低数字平台距离感。' },
  { num: '02', en: 'CULTURE', cn: '文艺', subtitle: 'Creative Community', desc: '关注设计作品背后的创作者，强化作品交流和社区属性。' },
  { num: '03', en: 'LIGHTNESS', cn: '轻量化', subtitle: 'Minimal Interaction', desc: '减少界面视觉负担，让作品内容成为主要视觉焦点。' }
];

function DesignDirection() {
  var result = useInView({ threshold: 0.2 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  /* Separate inView for principles — triggers when user scrolls to the list */
  var pResult = useInView({ threshold: 0.12 });
  var pRef = pResult[0]; var pInView = pResult[1];
  var pViewClass = pInView ? ' in-view' : '';

  /* Toggle body class for nav color adaptation */
  useEffect(function() {
    if (inView) {
      document.body.classList.add('dd-active');
    } else {
      document.body.classList.remove('dd-active');
    }
  }, [inView]);

  var kwClasses = ['kw-nature', 'kw-culture', 'kw-lightness'];
  var keywords = designDirectionKeywords.map(function(kw, i) {
    return React.createElement('div', { key: i, className: 'dd-keyword ' + kwClasses[i] + ' dd-anim dd-anim-' + (5 + i) },
      React.createElement('span', { className: 'dd-keyword-num' }, kw.num),
      React.createElement('span', { className: 'dd-keyword-en' }, kw.en),
      React.createElement('span', { className: 'dd-keyword-cn' }, kw.cn),
      React.createElement('span', { className: 'dd-keyword-subtitle' }, kw.subtitle),
      React.createElement('span', { className: 'dd-keyword-desc' }, kw.desc)
    );
  });

  var principles = designDirectionPrinciples.map(function(p, i) {
    return React.createElement('div', { key: i, className: 'dd-principle dd-p-anim dd-p-anim-' + (i + 1) },
      React.createElement('div', { className: 'dd-principle-left' },
        React.createElement('span', { className: 'dd-principle-num' }, p.num),
        React.createElement('span', { className: 'dd-principle-label' }, p.label)
      ),
      React.createElement('div', { className: 'dd-principle-right' },
        React.createElement('span', { className: 'dd-principle-keyword' }, p.keyword),
        React.createElement('span', { className: 'dd-principle-desc' }, p.desc)
      )
    );
  });

  return React.createElement('section', { ref: ref, className: 'dd-section snap-slide' + viewClass },
    /* Meta row */
    React.createElement('div', { className: 'dd-meta-row dd-anim dd-anim-1' },
      React.createElement('span', { className: 'dd-meta-num' }, '01'),
      React.createElement('span', { className: 'dd-meta-label' }, 'DESIGN DIRECTION — CHAPTER ONE')
    ),
    /* Title block */
    React.createElement('div', { className: 'dd-title-block dd-anim dd-anim-2' },
      React.createElement('h2', { className: 'dd-title-en' }, 'Design Direction'),
      React.createElement('p', { className: 'dd-title-cn' }, '探索视觉设计')
    ),
    /* Divider */
    React.createElement('div', { className: 'dd-divider dd-anim dd-anim-3' }),
    /* Manifesto — multi-line with vertical bars, right-side grid visual */
    React.createElement('div', { className: 'dd-manifesto-wrap dd-anim dd-anim-4' },
      React.createElement('p', { className: 'dd-manifesto' },
        React.createElement('span', { className: 'dd-m-line' }, '以',
          React.createElement('span', { className: 'dd-m-keyword' }, '「自然」')
        ),
        React.createElement('span', { className: 'dd-m-line' },
          React.createElement('span', { className: 'dd-m-keyword' }, '「文艺」')
        ),
        React.createElement('span', { className: 'dd-m-line' },
          React.createElement('span', { className: 'dd-m-keyword' }, '「轻量化」')
        ),
        React.createElement('span', { className: 'dd-m-final' }, '为核心原则进行设计。')
      ),
      React.createElement('div', { className: 'dd-manifesto-visual' })
    ),
    /* Keyword modules: NATURE / CULTURE / LIGHTNESS */
    React.createElement('div', { className: 'dd-keywords' }, keywords),
    /* 5 principles — own inView trigger for staggered appear */
    React.createElement('div', { ref: pRef, className: 'dd-principles' + pViewClass }, principles),
    /* Footer mark */
    React.createElement('div', { className: 'dd-footer dd-anim dd-anim-13' },
      React.createElement('span', { className: 'dd-footer-word' }, 'Keep'),
      React.createElement('span', { className: 'dd-footer-word' }, 'Exploring')
    )
  );
}


/* ---------- Design Context (dc- prefix) ---------- */
var designContextKeywords = [
  { num: '01', en: 'DISCOVER', cn: '发现', subtitle: '发现优秀设计作品', desc: '通过分类浏览与精选推荐，帮助用户探索不同领域设计作品。' },
  { num: '02', en: 'SHOWCASE', cn: '展示', subtitle: '展示创作价值', desc: '提供作品展示空间，强化设计理念和个人表达。' },
  { num: '03', en: 'CONNECT', cn: '连接', subtitle: '建立设计连接', desc: '通过互动反馈和社区交流，促进设计师之间关系建立。' }
];

function DesignContext() {
  var result = useInView({ threshold: 0.2 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  /* Toggle body class for nav color adaptation */
  useEffect(function() {
    if (inView) {
      document.body.classList.add('dc-active');
    } else {
      document.body.classList.remove('dc-active');
    }
  }, [inView]);

  var keywords = designContextKeywords.map(function(kw, i) {
    return React.createElement('div', { key: i, className: 'dc-keyword dc-anim dc-anim-' + (5 + i) },
      React.createElement('span', { className: 'dc-keyword-num' }, kw.num),
      React.createElement('span', { className: 'dc-keyword-en' }, kw.en),
      React.createElement('span', { className: 'dc-keyword-cn' }, kw.cn),
      React.createElement('span', { className: 'dc-keyword-subtitle' }, kw.subtitle),
      React.createElement('span', { className: 'dc-keyword-desc' }, kw.desc)
    );
  });

  return React.createElement('section', { ref: ref, className: 'dc-section snap-slide' + viewClass },
    /* Meta row */
    React.createElement('div', { className: 'dc-meta-row dc-anim dc-anim-1' },
      React.createElement('span', { className: 'dc-meta-num' }, '02'),
      React.createElement('span', { className: 'dc-meta-label' }, 'DESIGN CONTEXT — CHAPTER TWO')
    ),
    /* Title block */
    React.createElement('div', { className: 'dc-title-block dc-anim dc-anim-2' },
      React.createElement('h2', { className: 'dc-title-en' }, 'Design Context'),
      React.createElement('p', { className: 'dc-title-cn' }, '设计背景')
    ),
    /* Divider */
    React.createElement('div', { className: 'dc-divider dc-anim dc-anim-3' }),
    /* Project Background — problem → goal, left-aligned with right-side grid */
    React.createElement('div', { className: 'dc-body dc-anim dc-anim-4' },
      React.createElement('p', { className: 'dc-body-label' }, 'Project Background'),
      React.createElement('p', { className: 'dc-body-text' },
        React.createElement('span', { className: 'dc-body-problem' }, '现有设计作品展示平台更多关注作品浏览，但缺少具有艺术氛围的作品交流体验。'),
        React.createElement('span', { className: 'dc-body-goal' }, '因此，希望构建一个轻量化设计社区，让用户能够发现作品、展示创作，并建立设计师之间的交流连接。')
      ),
      React.createElement('div', { className: 'dc-body-visual' })
    ),
    /* Keyword modules: DISCOVER / SHOWCASE / CONNECT */
    React.createElement('div', { className: 'dc-keywords' }, keywords),
    /* Footer mark */
    React.createElement('div', { className: 'dc-footer dc-anim dc-anim-8' },
      React.createElement('span', { className: 'dc-footer-word' }, 'Keep'),
      React.createElement('span', { className: 'dc-footer-word' }, 'Exploring')
    )
  );
}


/* ---------- Information Architecture (ia- prefix) ---------- */
var iaModules = [
  { num:'01', en:'EXPLORE', cn:'探索', pos:'top-left', items:['推荐作品','优秀设计师','热门活动','获奖作品'] },
  { num:'02', en:'DISCOVER', cn:'发现', pos:'top-right', items:['作品分类','设计趋势','关键词搜索','设计师发现'] },
  { num:'03', en:'COMMUNITY', cn:'社区', pos:'bottom-left', items:['消息通知','评论互动','关注设计师','用户反馈'] },
  { num:'04', en:'PROFILE', cn:'我的', pos:'bottom-right', items:['个人资料','关注粉丝','作品管理','用户设置'] }
];

var iaLineCoords = [
  { x2:28, y2:20 },   /* TL */
  { x2:132, y2:20 },  /* TR */
  { x2:28, y2:80 },   /* BL */
  { x2:132, y2:80 }   /* BR */
];

var iaJourneySteps = [
  { num:'01', en:'ENTRY', cn:'进入网站' },
  { num:'02', en:'LOGIN', cn:'登录账号' },
  { num:'03', en:'HOME', cn:'首页浏览' },
  { num:'04', en:'EXPLORE', cn:'浏览作品' },
  { num:'05', en:'DETAILS', cn:'查看详情' },
  { num:'06', en:'INTERACTION', cn:'收藏 / 评论 / 交流' },
  { num:'07', en:'PROFILE', cn:'个人管理' }
];

function InformationArchitecture() {
  var result = useInView({ threshold: 0.15 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  var hoverState = React.useState(-1);
  var hovered = hoverState[0];
  var setHovered = hoverState[1];

  useEffect(function() {
    if (inView) {
      document.body.classList.add('ia-active');
    } else {
      document.body.classList.remove('ia-active');
    }
  }, [inView]);

  var modules = iaModules.map(function(mod, i) {
    var isActive = hovered === i ? ' is-active' : '';
    var items = mod.items.map(function(item, j) {
      return React.createElement('li', { key: j, className: 'ia-module-item' }, item);
    });
    return React.createElement('div', {
      key: i,
      className: 'ia-module ia-module-' + mod.pos + isActive,
      onMouseEnter: function() { setHovered(i); },
      onMouseLeave: function() { setHovered(-1); }
    },
      React.createElement('div', { className: 'ia-module-header' },
        React.createElement('span', { className: 'ia-module-num' }, mod.num),
        React.createElement('span', { className: 'ia-module-en' }, mod.en)
      ),
      React.createElement('div', { className: 'ia-module-cn' }, mod.cn),
      React.createElement('ul', { className: 'ia-module-items' }, items)
    );
  });

  var lines = iaLineCoords.map(function(coord, i) {
    var isActive = hovered === i ? ' active' : '';
    return React.createElement('line', {
      key: i,
      className: 'ia-line' + isActive,
      x1:80, y1:50,
      x2:coord.x2, y2:coord.y2
    });
  });

  var lineDots = iaLineCoords.map(function(coord, i) {
    var isActive = hovered === i ? ' active' : '';
    return React.createElement('circle', {
      key: i,
      className: 'ia-line-dot' + isActive,
      cx:coord.x2, cy:coord.y2, r:1.5
    });
  });

  var journeyNodes = [];
  iaJourneySteps.forEach(function(step, i) {
    journeyNodes.push(
      React.createElement('div', { key: 'step-' + i, className: 'ia-step' },
        React.createElement('div', { className: 'ia-step-circle' }, step.num),
        React.createElement('span', { className: 'ia-step-en' }, step.en),
        React.createElement('span', { className: 'ia-step-label' }, step.cn)
      )
    );
    if (i < iaJourneySteps.length - 1) {
      journeyNodes.push(
        React.createElement('span', { key: 'arrow-' + i, className: 'ia-arrow' }, '\u2192')
      );
    }
  });

  return React.createElement('section', { ref: ref, className: 'ia-section snap-slide' + viewClass },
    /* Meta row */
    React.createElement('div', { className: 'ia-meta-row ia-anim ia-anim-1' },
      React.createElement('span', { className: 'ia-meta-num' }, '03'),
      React.createElement('span', { className: 'ia-meta-label' }, 'INFORMATION ARCHITECTURE — CHAPTER THREE')
    ),
    /* Title block */
    React.createElement('div', { className: 'ia-title-block ia-anim ia-anim-2' },
      React.createElement('h2', { className: 'ia-title-en' }, 'Information Architecture'),
      React.createElement('p', { className: 'ia-title-cn' }, '信息架构')
    ),
    /* Divider */
    React.createElement('div', { className: 'ia-divider ia-anim ia-anim-3' }),
    /* Radial diagram */
    React.createElement('div', { className: 'ia-diagram ia-anim ia-anim-4' },
      React.createElement('div', { className: 'ia-diagram-grid' },
        /* SVG connection lines */
        React.createElement('svg', { className: 'ia-lines', viewBox: '0 0 160 100', preserveAspectRatio: 'none' },
          lines,
          lineDots
        ),
        /* Central node */
        React.createElement('div', { className: 'ia-center' },
          React.createElement('span', { className: 'ia-center-en' }, 'DESIGN COMMUNITY'),
          React.createElement('span', { className: 'ia-center-cn' }, '视觉设计交流平台'),
          React.createElement('span', { className: 'ia-center-dot' })
        ),
        /* 4 module cards */
        modules
      )
    ),
    /* User journey flow */
    React.createElement('div', { className: 'ia-journey ia-anim ia-anim-6' },
      React.createElement('p', { className: 'ia-journey-label' }, 'User Journey Map'),
      React.createElement('div', { className: 'ia-journey-flow' }, journeyNodes)
    )
  );
}

/* ---------- Design System (ds- prefix) ---------- */
var dsPrinciples = [
  { title:'Minimal', desc:'减少视觉干扰，突出作品内容' },
  { title:'Professional', desc:'建立统一视觉语言，提高信息可信度' },
  { title:'Explorative', desc:'鼓励作品探索与设计交流' }
];

var dsColors = [
  { hex:'#45622A', name:'Primary Green', color:'primary', uses:['Brand Core','核心交互','主按钮','品牌识别'] },
  { hex:'#91A56F', name:'Secondary Green', color:'secondary', uses:['Supporting Element','标签','边框','Hover状态'] },
  { hex:'#CFE3B6', name:'Light Green', color:'light', uses:['Background Decoration','卡片背景','辅助区域'] },
  { hex:'#FFFFFF', name:'White', color:'white', uses:['Content Area','页面背景','信息承载'] }
];

var dsColorRatio = [
  { hex:'#45622A', pct:50, label:'Primary' },
  { hex:'#91A56F', pct:25, label:'Secondary' },
  { hex:'#CFE3B6', pct:15, label:'Light' },
  { hex:'#FFFFFF', pct:10, label:'White' }
];

var dsSpacing = [
  { px:'4', h:4, use:'Icon spacing' },
  { px:'8', h:8, use:'Component spacing', base:true },
  { px:'16', h:16, use:'Card padding' },
  { px:'24', h:24, use:'Section spacing' },
  { px:'32', h:32, use:'Content spacing' },
  { px:'48', h:48, use:'Layout spacing' }
];

var dsFonts = [
  { name:'Montserrat', cn:'英文字体', uses:['English','Navigation','Numbers','Labels'], sample:'Visual Portfolio Platform', sampleCls:'ds-font-sample' },
  { name:'Source Han Sans CN', cn:'思源黑体', uses:['中文标题','正文描述','内容信息'], sample:'视觉作品集平台', sampleCls:'ds-font-zh' }
];

var dsScale = [
  { label:'H1', px:'48px', cls:'ds-scale-h1', text:'Visual Portfolio', use:'标题' },
  { label:'H2', px:'32px', cls:'ds-scale-h2', text:'设计作品集', use:'导航' },
  { label:'Body', px:'16px', cls:'ds-scale-body', text:'探索优秀设计作品', use:'正文' },
  { label:'Caption', px:'12px', cls:'ds-scale-cap', text:'KEEP EXPLORING', use:'辅助信息' }
];

var dsGridInfo = [
  { label:'Desktop Grid', value:'12 Columns' },
  { label:'Max Width', value:'1440px' },
  { label:'Spacing Unit', value:'8px' }
];

function DesignSystem() {
  var result = useInView({ threshold: 0.15 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  useEffect(function() {
    if (inView) {
      document.body.classList.add('ds-active');
    } else {
      document.body.classList.remove('ds-active');
    }
  }, [inView]);

  /* Design Principles */
  var principles = dsPrinciples.map(function(p, i) {
    return React.createElement('div', { key: i, className: 'ds-principle' },
      React.createElement('span', { className: 'ds-principle-title' }, p.title),
      React.createElement('span', { className: 'ds-principle-desc' }, p.desc)
    );
  });

  /* Color Palette */
  var colorRows = dsColors.map(function(c, i) {
    var useItems = c.uses.map(function(u, j) {
      return React.createElement('span', { key: j, className: 'ds-color-use' }, u);
    });
    return React.createElement('div', { key: i, className: 'ds-color-row' },
      React.createElement('div', { className: 'ds-color-swatch', style: { background: c.hex } }),
      React.createElement('div', { className: 'ds-color-info' },
        React.createElement('span', { className: 'ds-color-name' }, c.name),
        React.createElement('span', { className: 'ds-color-hex' }, c.hex)
      ),
      React.createElement('div', { className: 'ds-color-uses' }, useItems)
    );
  });

  /* Color ratio bar */
  var ratioSegs = dsColorRatio.map(function(r, i) {
    return React.createElement('div', { key: i, className: 'ds-color-ratio-seg', style: { width: r.pct + '%', background: r.hex } });
  });
  var ratioLabels = dsColorRatio.map(function(r, i) {
    return React.createElement('span', { key: i }, r.label + ' ' + r.pct + '%');
  });

  /* Spacing */
  var spacingItems = dsSpacing.map(function(sp, i) {
    return React.createElement('div', { key: i, className: 'ds-sp-item' },
      React.createElement('div', { className: 'ds-sp-bar' + (sp.base ? ' is-base' : ''), style: { height: sp.h + 'px' } }),
      React.createElement('span', { className: 'ds-sp-px' }, sp.px + 'px'),
      React.createElement('span', { className: 'ds-sp-use' }, sp.use)
    );
  });

  /* Typography */
  var fontCards = dsFonts.map(function(f, i) {
    var useItems = f.uses.map(function(u, j) {
      return React.createElement('span', { key: j, className: 'ds-font-use' }, u);
    });
    return React.createElement('div', { key: i, className: 'ds-font' },
      React.createElement('span', { className: 'ds-font-name' }, f.name),
      React.createElement('span', { className: 'ds-font-cn' }, f.cn),
      React.createElement('div', { className: 'ds-font-uses' }, useItems),
      React.createElement('p', { className: f.sampleCls }, f.sample)
    );
  });

  var scaleRows = dsScale.map(function(s, i) {
    return React.createElement('div', { key: i, className: 'ds-scale-row' },
      React.createElement('span', { className: 'ds-scale-label' }, s.label),
      React.createElement('span', { className: 'ds-scale-px' }, s.px),
      React.createElement('span', { className: 'ds-scale-text ' + s.cls }, s.text),
      React.createElement('span', { className: 'ds-scale-use' }, s.use)
    );
  });

  /* Grid System */
  var gridItems = dsGridInfo.map(function(g, i) {
    return React.createElement('div', { key: i, className: 'ds-grid-item' },
      React.createElement('span', { className: 'ds-grid-label' }, g.label),
      React.createElement('span', { className: 'ds-grid-value' }, g.value)
    );
  });

  return React.createElement('section', { ref: ref, className: 'ds-section snap-slide' + viewClass },
    /* Meta row */
    React.createElement('div', { className: 'ds-meta-row ds-anim ds-anim-1' },
      React.createElement('span', { className: 'ds-meta-num' }, '04'),
      React.createElement('span', { className: 'ds-meta-label' }, 'DESIGN SYSTEM — CHAPTER FOUR')
    ),
    /* Title block */
    React.createElement('div', { className: 'ds-title-block ds-anim ds-anim-2' },
      React.createElement('h2', { className: 'ds-title-en' }, 'Design System'),
      React.createElement('p', { className: 'ds-title-cn' }, '设计系统')
    ),
    /* Divider */
    React.createElement('div', { className: 'ds-divider ds-anim ds-anim-3' }),
    /* Design Principles */
    React.createElement('div', { className: 'ds-principles ds-anim ds-anim-4' }, principles),
    /* Two-column main */
    React.createElement('div', { className: 'ds-main' },
      /* Left column: Color + Spacing + Typography + Grid */
      React.createElement('div', { className: 'ds-left' },
        /* Color System */
        React.createElement('div', { className: 'ds-anim ds-anim-5' },
          React.createElement('p', { className: 'ds-sub-label' }, '01  Color System'),
          React.createElement('div', { className: 'ds-colors' }, colorRows),
          React.createElement('div', { className: 'ds-color-ratio' },
            React.createElement('div', { className: 'ds-color-ratio-bar' }, ratioSegs),
            React.createElement('div', { className: 'ds-color-ratio-pct' }, ratioLabels)
          )
        ),
        /* Spacing System */
        React.createElement('div', { className: 'ds-anim ds-anim-6' },
          React.createElement('p', { className: 'ds-sub-label' }, '02  Spacing System'),
          React.createElement('div', { className: 'ds-spacing' }, spacingItems),
          React.createElement('p', { className: 'ds-sp-grid-note' }, 'Based on 8px Grid System')
        ),
        /* Typography */
        React.createElement('div', { className: 'ds-anim ds-anim-7' },
          React.createElement('p', { className: 'ds-sub-label' }, '03  Typography'),
          React.createElement('div', { className: 'ds-typo-fonts' }, fontCards),
          React.createElement('div', { className: 'ds-typo-scale' }, scaleRows)
        ),
        /* Grid System */
        React.createElement('div', { className: 'ds-anim ds-anim-7' },
          React.createElement('p', { className: 'ds-sub-label' }, '04  Grid System'),
          React.createElement('div', { className: 'ds-grid-info' }, gridItems)
        )
      ),
      /* Right column: UI Components + Interaction States */
      React.createElement('div', { className: 'ds-right' },
        /* UI Components */
        React.createElement('div', { className: 'ds-anim ds-anim-5' },
          React.createElement('p', { className: 'ds-sub-label' }, '05  UI Components'),
          React.createElement('div', { className: 'ds-components' },
            /* Navigation */
            React.createElement('div', { className: 'ds-comp-row' },
              React.createElement('span', { className: 'ds-comp-label' }, 'Navigation'),
              React.createElement('div', { className: 'ds-comp-demo' },
                React.createElement('div', { className: 'ds-demo-nav' },
                  React.createElement('span', { className: 'ds-demo-nav-item active' }, 'Home'),
                  React.createElement('span', { className: 'ds-demo-nav-item' }, 'Explore'),
                  React.createElement('span', { className: 'ds-demo-nav-item' }, 'Community'),
                  React.createElement('span', { className: 'ds-demo-nav-item' }, 'Profile')
                )
              )
            ),
            /* Button */
            React.createElement('div', { className: 'ds-comp-row' },
              React.createElement('span', { className: 'ds-comp-label' }, 'Button'),
              React.createElement('div', { className: 'ds-comp-demo' },
                React.createElement('span', { className: 'ds-demo-btn ds-demo-btn-primary' }, 'Primary'),
                React.createElement('span', { className: 'ds-demo-btn ds-demo-btn-secondary' }, 'Secondary'),
                React.createElement('span', { className: 'ds-demo-btn ds-demo-btn-hover' }, 'Hover')
              )
            ),
            /* Card */
            React.createElement('div', { className: 'ds-comp-row' },
              React.createElement('span', { className: 'ds-comp-label' }, 'Card'),
              React.createElement('div', { className: 'ds-comp-demo' },
                React.createElement('div', { className: 'ds-demo-card' },
                  React.createElement('div', { className: 'ds-demo-card-img' }),
                  React.createElement('div', { className: 'ds-demo-card-body' },
                    React.createElement('div', { className: 'ds-demo-card-title' }, 'Brand Design'),
                    React.createElement('div', { className: 'ds-demo-card-designer' }, '王玉璇'),
                    React.createElement('span', { className: 'ds-demo-card-tag' }, 'Design')
                  )
                )
              )
            ),
            /* Portfolio Card */
            React.createElement('div', { className: 'ds-comp-row' },
              React.createElement('span', { className: 'ds-comp-label' }, 'Portfolio'),
              React.createElement('div', { className: 'ds-comp-demo' },
                React.createElement('div', { className: 'ds-demo-pf' },
                  React.createElement('div', { className: 'ds-demo-pf-img' }),
                  React.createElement('div', { className: 'ds-demo-pf-body' },
                    React.createElement('div', { className: 'ds-demo-pf-title' }, 'Portfolio Case'),
                    React.createElement('div', { className: 'ds-demo-pf-designer' }, '王玉璇'),
                    React.createElement('span', { className: 'ds-demo-pf-tag' }, 'Design'),
                    React.createElement('div', { className: 'ds-demo-pf-btn' }, 'View Case')
                  )
                )
              )
            ),
            /* Tag */
            React.createElement('div', { className: 'ds-comp-row' },
              React.createElement('span', { className: 'ds-comp-label' }, 'Tag'),
              React.createElement('div', { className: 'ds-comp-demo' },
                React.createElement('span', { className: 'ds-demo-tag ds-demo-tag-green' }, 'Design'),
                React.createElement('span', { className: 'ds-demo-tag ds-demo-tag-outline' }, 'UI/UX'),
                React.createElement('span', { className: 'ds-demo-tag ds-demo-tag-outline' }, 'Brand')
              )
            ),
            /* Input / Search */
            React.createElement('div', { className: 'ds-comp-row' },
              React.createElement('span', { className: 'ds-comp-label' }, 'Input'),
              React.createElement('div', { className: 'ds-comp-demo' },
                React.createElement('div', { className: 'ds-demo-input' },
                  React.createElement('span', { className: 'ds-demo-input-icon' }, '\u2315'),
                  React.createElement('span', { className: 'ds-demo-input-text' }, 'Search works...')
                )
              )
            ),
            /* Modal / Detail */
            React.createElement('div', { className: 'ds-comp-row' },
              React.createElement('span', { className: 'ds-comp-label' }, 'Modal'),
              React.createElement('div', { className: 'ds-comp-demo' },
                React.createElement('div', { className: 'ds-demo-modal' },
                  React.createElement('div', { className: 'ds-demo-modal-header' }, 'Detail'),
                  React.createElement('div', { className: 'ds-demo-modal-body' }, '作品详情'),
                  React.createElement('div', { className: 'ds-demo-modal-footer' },
                    React.createElement('span', { className: 'ds-demo-modal-btn' }, 'View')
                  )
                )
              )
            )
          )
        ),
        /* Interaction States */
        React.createElement('div', { className: 'ds-anim ds-anim-7' },
          React.createElement('p', { className: 'ds-sub-label' }, '06  Interaction States'),
          React.createElement('div', { className: 'ds-states' },
            React.createElement('div', { className: 'ds-state-item' },
              React.createElement('span', { className: 'ds-state-btn ds-state-default' }, 'Button'),
              React.createElement('span', { className: 'ds-state-label' }, 'Default'),
              React.createElement('span', { className: 'ds-state-desc' }, '基础展示状态')
            ),
            React.createElement('div', { className: 'ds-state-item' },
              React.createElement('span', { className: 'ds-state-btn ds-state-hover' }, 'Button'),
              React.createElement('span', { className: 'ds-state-label' }, 'Hover'),
              React.createElement('span', { className: 'ds-state-desc' }, '鼠标悬停反馈')
            ),
            React.createElement('div', { className: 'ds-state-item' },
              React.createElement('span', { className: 'ds-state-btn ds-state-active' }, 'Button'),
              React.createElement('span', { className: 'ds-state-label' }, 'Active'),
              React.createElement('span', { className: 'ds-state-desc' }, '当前选中状态')
            ),
            React.createElement('div', { className: 'ds-state-item' },
              React.createElement('span', { className: 'ds-state-btn ds-state-disabled' }, 'Button'),
              React.createElement('span', { className: 'ds-state-label' }, 'Disabled'),
              React.createElement('span', { className: 'ds-state-desc' }, '不可用状态')
            )
          ),
          React.createElement('div', { className: 'ds-states-note' },
            React.createElement('span', null, 'Applied to:'),
            React.createElement('br'),
            React.createElement('span', null, 'Buttons / Navigation / Portfolio Cards')
          )
        ),
        /* Icon System */
        React.createElement('div', { className: 'ds-anim ds-anim-8' },
          React.createElement('p', { className: 'ds-sub-label' }, '07  Icon System'),
          React.createElement('div', { className: 'ds-icon-system' },
            React.createElement('div', { className: 'ds-icon-left' },
              React.createElement('span', { className: 'ds-icon-left-label' }, 'Icon Style')
            ),
            React.createElement('div', { className: 'ds-icon-right' },
              React.createElement('span', { className: 'ds-icon-style' }, 'Rounded Line Icon'),
              React.createElement('div', { className: 'ds-icon-spec' },
                React.createElement('span', { className: 'ds-icon-spec-item' },
                  React.createElement('span', { className: 'ds-icon-spec-label' }, 'Stroke:'), ' 1.5px'
                ),
                React.createElement('span', { className: 'ds-icon-spec-item' },
                  React.createElement('span', { className: 'ds-icon-spec-label' }, 'Size:'), ' 16px / 20px / 24px'
                )
              ),
              React.createElement('p', { className: 'ds-icon-note' }, '统一导航、分类、标签图标语言。')
            )
          )
        )
      )
    ),
    /* Footer */
    React.createElement('div', { className: 'ds-footer ds-anim ds-anim-9' },
      React.createElement('span', { className: 'ds-footer-word' }, 'Keep'),
      React.createElement('span', { className: 'ds-footer-word' }, 'Exploring')
    )
  );
}

window.PortfolioChapters.digital = function() {
  return [
    React.createElement(MiniProgramShowcase, { key: 'mp-showcase' }),
    React.createElement(DesignDirection, { key: 'design-direction' }),
    React.createElement(DesignContext, { key: 'design-context' }),
    React.createElement(InformationArchitecture, { key: 'info-architecture' }),
    React.createElement(DesignSystem, { key: 'design-system' }),
    React.createElement(MiniProgramResult, { key: 'mini-program-result' })
  ];
};
