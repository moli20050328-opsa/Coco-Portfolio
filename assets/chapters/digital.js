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

/* ---------- Design objective (dd- prefix) ---------- */
var designDirectionPrinciples = [
  { label: 'VISUAL TONE', keyword: '绿色建立识别', desc: '用深绿导航与浅绿底色串联页面，延续启动页的自然意象。' },
  { label: 'CONTENT FIRST', keyword: '作品优先呈现', desc: '首页先展示作品图，再补充作者、校友与活动信息。' },
  { label: 'CLEAR FEEDBACK', keyword: '状态明确可见', desc: '以选中标签、导航高亮和已读标记区分当前操作与消息状态。' }
];

function DesignDirection() {
  var result = useInView({ threshold: 0.2 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  var pResult = useInView({ threshold: 0.12 });
  var pRef = pResult[0]; var pInView = pResult[1];

  useEffect(function() {
    if (inView) {
      document.body.classList.add('dd-active');
    } else {
      document.body.classList.remove('dd-active');
    }
  }, [inView]);

  var principles = designDirectionPrinciples.map(function(p, i) {
    return React.createElement('div', { key: p.label, className: 'dd-principle dd-p-anim dd-p-anim-' + (i + 1) },
      React.createElement('div', { className: 'dd-principle-left' },
        React.createElement('span', { className: 'dd-principle-label' }, p.label)
      ),
      React.createElement('div', { className: 'dd-principle-right' },
        React.createElement('span', { className: 'dd-principle-keyword' }, p.keyword),
        React.createElement('span', { className: 'dd-principle-desc' }, p.desc)
      )
    );
  });

  return React.createElement('section', { ref: ref, className: 'dd-section mp-distilled snap-slide' + viewClass },
    React.createElement('div', { className: 'dd-title-block dd-anim dd-anim-1' },
      React.createElement('h2', { className: 'dd-title-en' }, 'Design Direction'),
      React.createElement('p', { className: 'dd-title-cn' }, '设计目标与取舍')
    ),
    React.createElement('div', { className: 'dd-divider dd-anim dd-anim-2' }),
    React.createElement('p', { className: 'mp-design-objective dd-anim dd-anim-3' },
      '我希望把作品浏览、个人展示与交流放进一个轻量的小程序：让作品成为视觉中心，同时保留清晰的分类入口和互动反馈。'
    ),
    React.createElement('div', { ref: pRef, className: 'dd-principles' + (pInView ? ' in-view' : '') }, principles)
  );
}


/* ---------- Information Architecture (ia- prefix) ---------- */
var iaModules = [
  { num:'01', en:'HOME', cn:'首页', pos:'top-left', items:['推荐作品','优秀校友','热门活动','获奖作品'] },
  { num:'02', en:'CATEGORIES', cn:'分类', pos:'top-right', items:['设计类别','最热 / 最新 / 获奖筛选','作品列表'] },
  { num:'03', en:'FEED', cn:'动态', pos:'bottom-left', items:['动态内容','评论与点赞','关注推荐'] },
  { num:'04', en:'PROFILE', cn:'我的', pos:'bottom-right', items:['个人资料','获奖记录与作品','关注与粉丝','最近留言'] }
];

var iaLineCoords = [
  { x2:28, y2:20 },   /* TL */
  { x2:132, y2:20 },  /* TR */
  { x2:28, y2:80 },   /* BL */
  { x2:132, y2:80 }   /* BR */
];

var iaJourneySteps = [
  { num:'01', en:'BROWSE', cn:'首页 / 分类浏览' },
  { num:'02', en:'DETAILS', cn:'查看作品与作者' },
  { num:'03', en:'INTERACT', cn:'评论 / 点赞 / 收藏' },
  { num:'04', en:'PROFILE', cn:'个人主页与留言' }
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

  return React.createElement('section', { id: 'mini-result', ref: ref, className: 'ia-section mp-distilled snap-slide' + viewClass },
    /* Title block */
    React.createElement('div', { className: 'ia-title-block ia-anim ia-anim-2' },
      React.createElement('h2', { className: 'ia-title-en' }, 'Information Architecture'),
      React.createElement('p', { className: 'ia-title-cn' }, '四个入口与浏览路径')
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
      React.createElement('p', { className: 'ia-journey-label' }, '页面路径示意'),
      React.createElement('div', { className: 'ia-journey-flow' }, journeyNodes)
    )
  );
}

/* ---------- Interface details, grounded in the exported screens ---------- */
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

  return React.createElement('section', { id: 'mini-result', ref: ref, className: 'ds-section snap-slide' + viewClass },
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

var detailPalette = [
  { hex: '#45622A', name: '深绿', use: '底部导航与主要操作' },
  { hex: '#91A56F', name: '辅助绿', use: '输入与辅助区域' },
  { hex: '#CFE3B6', name: '浅绿', use: '兴趣标签与内容底色' },
  { hex: '#FFFFFF', name: '白色', use: '搜索框与选中导航' }
];

var dsInterfaceExamples = [
  {
    image: 'slides/mp-04.png', width: 1501, height: 2906,
    title: '兴趣与方向选择',
    detail: '深浅色块与勾选符号共同区分选中项，确认按钮集中在页面底部。'
  },
  {
    image: 'slides/mp-13.png', width: 1500, height: 3000,
    title: '最近留言',
    detail: '头像旁的状态点、已读 / 未读文字与消息摘要，组成可快速扫读的列表。'
  }
];

function InterfaceDetails() {
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

  var colorRows = detailPalette.map(function(c) {
    return React.createElement('div', { key: c.name, className: 'ds-color-row' },
      React.createElement('div', { className: 'ds-color-swatch', style: { background: c.hex }, 'aria-hidden': 'true' }),
      React.createElement('div', { className: 'ds-color-info' },
        React.createElement('span', { className: 'ds-color-name' }, c.name)
      ),
      React.createElement('div', { className: 'ds-color-uses' },
        React.createElement('span', { className: 'ds-color-use' }, c.use)
      )
    );
  });

  var examples = dsInterfaceExamples.map(function(example) {
    return React.createElement('figure', { key: example.image, className: 'ds-interface-example' },
      React.createElement(PortfolioImage, {
        src: example.image, alt: example.title,
        width: example.width, height: example.height, loading: 'lazy'
      }),
      React.createElement('figcaption', null,
        React.createElement('h3', { className: 'ds-interface-title' }, example.title),
        React.createElement('p', { className: 'ds-interface-caption' }, example.detail)
      )
    );
  });

  return React.createElement('section', { id: 'mini-interface-details', ref: ref, className: 'ds-section mp-distilled snap-slide' + viewClass },
    React.createElement('div', { className: 'ds-title-block ds-anim ds-anim-1' },
      React.createElement('h2', { className: 'ds-title-en' }, 'Interface Details'),
      React.createElement('p', { className: 'ds-title-cn' }, '色彩与界面细节')
    ),
    React.createElement('div', { className: 'ds-divider ds-anim ds-anim-2' }),
    React.createElement('div', { className: 'ds-main' },
      React.createElement('div', { className: 'ds-left ds-anim ds-anim-3' },
        React.createElement('p', { className: 'mp-design-objective' },
          '深绿负责导航与操作，浅绿承托内容；选中态与消息状态则同时使用色彩、符号或文字提示。'
        ),
        React.createElement('div', { className: 'ds-colors' }, colorRows),
        React.createElement('p', { className: 'ds-interface-note' },
          '以下为现有页面中的实际应用。'
        )
      ),
      React.createElement('div', { className: 'ds-interface-examples ds-anim ds-anim-4' }, examples)
    )
  );
}

window.PortfolioChapters.digital = function() {
  return [
    React.createElement(MiniProgramShowcase, { key: 'mp-showcase' }),
    React.createElement(DesignSystem, { key: 'design-system' }),
    React.createElement(InterfaceDetails, { key: 'interface-details' })
  ];
};
