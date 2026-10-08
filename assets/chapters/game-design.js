/* ---------- Case Study Overview (cs- prefix) ---------- */
function CaseStudyOverview() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  var infoItems = [
    { num: '01', label: 'PROJECT TYPE', value: 'Interactive Game Design' },
    { num: '02', label: 'CORE CONCEPT', value: 'Light Shadow Reveal Truth' },
    { num: '03', label: 'GAMEPLAY', value: 'Exploration / Puzzle / Combat' },
    { num: '04', label: 'MEDIUM', value: 'H5 Interactive Experience' }
  ];

  var infoElements = [];
  infoItems.forEach(function(item, i) {
    if (i > 0) {
      infoElements.push(React.createElement('div', { key: 'div-' + i, className: 'cs-info-divider' }));
    }
    infoElements.push(React.createElement('div', { key: item.num, className: 'cs-info-item cs-anim cs-anim-5' },
      React.createElement('div', { className: 'cs-info-num' }, item.num),
      React.createElement('div', { className: 'cs-info-label' }, item.label),
      React.createElement('div', { className: 'cs-info-value' }, item.value)
    ));
  });

  return React.createElement('section', {
    ref: ref,
    className: 'cs-overview snap-slide' + viewClass
  },
    /* Background decoration */
    React.createElement('div', { className: 'cs-bg-deco' }),

    /* Chapter navigation */
    React.createElement('div', { className: 'case-nav cs-anim cs-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '01'),
      React.createElement('div', { className: 'case-nav-en' }, 'PROJECT OVERVIEW'),
      React.createElement('div', { className: 'case-nav-cn' }, '\u9879\u76ee\u6982\u89c8')
    ),

    /* Main content - left/right split */
    React.createElement('div', { className: 'cs-main' },
      /* Left side 45% */
      React.createElement('div', { className: 'cs-left' },
        React.createElement('div', { className: 'cs-project-title cs-anim cs-anim-2' },
          React.createElement('span', null, 'TAISHAN'),
          React.createElement('span', null, 'SHADOW PUPPET')
        ),
        React.createElement('div', { className: 'cs-project-cn cs-anim cs-anim-2' }, '\u6cf0\u5c71\u76ae\u5f71\u9547\u5996\u8bb0'),

        React.createElement('div', { className: 'cs-intro cs-anim cs-anim-3' },
          React.createElement('div', { className: 'cs-intro-label' }, 'PROJECT INTRODUCTION'),
          React.createElement('p', { className: 'cs-intro-text' },
            '\u300a\u6cf0\u5c71\u76ae\u5f71\u9547\u5996\u8bb0\u300b\u662f\u4e00\u6b3e\u878d\u5408',
            React.createElement('span', { className: 'cs-accent' }, '\u975e\u9057\u6587\u5316'),
            '\u4e0e',
            React.createElement('span', { className: 'cs-accent' }, '\u4e92\u52a8\u6e38\u620f\u4f53\u9a8c'),
            '\u7684\u5192\u9669\u6e38\u620f\u8bbe\u8ba1\u9879\u76ee\u3002\u4ee5\u7ecf\u5178IP\u300a\u753b\u76ae\u300b\u7684\u201c\u8fa8\u4f2a\u5b58\u771f\u201d\u4e3a\u6545\u4e8b\u5185\u6838\uff0c\u5c06\u6cf0\u5c71\u76ae\u5f71\u201c\u9a71\u90aa\u7eb3\u798f\u201d\u7684\u6c11\u4fd7\u5c5e\u6027\u8f6c\u5316\u4e3a\u6e38\u620f\u673a\u5236\u3002\u73a9\u5bb6\u901a\u8fc7',
            React.createElement('span', { className: 'cs-accent' }, '\u201c\u5149\u5f71\u8fa8\u5996\u201d'),
            '\u6838\u5fc3\u73a9\u6cd5\uff0c\u64cd\u63a7\u76ae\u5f71\u89d2\u8272\u5b8c\u6210\u63a2\u7d22\u3001\u89e3\u8c1c\u4e0e\u6218\u6597\uff0c\u5728\u4e92\u52a8\u4f53\u9a8c\u4e2d\u611f\u53d7\u4f20\u7edf\u6587\u5316\u9b45\u529b\u3002'
          )
        )
      ),

      /* Right side 55% */
      React.createElement('div', { className: 'cs-right' },
        /* Gameplay preview label */
        React.createElement('div', { className: 'cs-preview-label cs-anim cs-anim-4' }, 'GAMEPLAY PREVIEW'),

        /* Hero video */
        React.createElement(DeferredVideo, {
          className: 'cs-hero-video cs-anim cs-anim-4',
          src: 'taishan-hero.mp4',
          resumeOnReturn: true,
          controls: true,
          'aria-label': '泰山皮影镇妖记开场预览',
          poster: 'taishan-hero-poster.jpg',
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          preload: 'none',
          'webkit-playsinline': 'true'
        }),

        /* Playable Demo card */
        React.createElement('div', { className: 'cs-demo-card cs-anim cs-anim-6' },
          /* QR code */
          React.createElement('div', { className: 'cs-demo-qr' },
            React.createElement(PortfolioImage, { src: 'assets/game-demo/qr-yf8s.png', width: 410, height: 410, alt: '泰山皮影镇妖记 H5 小游戏二维码' })
          ),
          /* Divider */
          React.createElement('div', { className: 'cs-demo-divider' }),
          /* Text content */
          React.createElement('div', { className: 'cs-demo-text' },
            React.createElement('div', { className: 'cs-demo-en-label' }, 'PLAYABLE DEMO'),
            React.createElement('div', { className: 'cs-demo-en-sub' }, 'SCAN TO EXPERIENCE'),
            React.createElement('div', { className: 'cs-demo-en-type' }, 'H5 Interactive Game'),
            React.createElement('div', { className: 'cs-demo-cn' }, '\u626b\u7801\u4f53\u9a8c\u6e38\u620f'),
            React.createElement('div', { className: 'cs-demo-cn-sub' }, '\u8bd5\u73a9\u5b8c\u6574\u4e92\u52a8\u6d41\u7a0b'),
            React.createElement('a', { className: 'game-demo-launch', href: 'https://c.u.h5mc.com/c/bxqd/yf8s/index.html', target: '_blank', rel: 'noopener noreferrer', 'aria-label': '直接试玩泰山皮影镇妖记（新窗口）' }, '直接试玩'),
            React.createElement('small', { className: 'game-demo-hint' }, '新窗口打开 · 也可手机扫码')
          )
        ),

        /* Keyword tags */
        React.createElement('div', { className: 'cs-tags cs-anim cs-anim-7' },
          React.createElement('span', { className: 'cs-tag' }, 'NON-HERITAGE'),
          React.createElement('span', { className: 'cs-tag' }, 'GAME DESIGN'),
          React.createElement('span', { className: 'cs-tag' }, 'INTERACTIVE EXPERIENCE')
        )
      )
    ),

    /* Bottom info bar */
    React.createElement('div', { className: 'cs-info-bar' }, infoElements)
  );
}


/* ---------- Case Study Design Concept (dcp- prefix) ---------- */
function CaseStudyConcept() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  return React.createElement('section', {
    ref: ref,
    id: 'game-design-concept',
    className: 'dcp-section snap-slide' + viewClass
  },
    React.createElement('span', { id: 'game-design-background', className: 'chapter-anchor-alias', 'aria-hidden': true }),
    React.createElement('span', { id: 'cs-background', className: 'chapter-anchor-alias', 'aria-hidden': true }),
    /* Background layers */
    React.createElement('div', { className: 'dcp-bg-deco' }),
    React.createElement('div', { className: 'dcp-grid' }),

    /* Top title */
    React.createElement('div', { className: 'case-nav dcp-anim dcp-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '02'),
      React.createElement('div', { className: 'case-nav-en' }, 'DESIGN CONCEPT'),
      React.createElement('div', { className: 'case-nav-cn' }, '设计概念')
    ),
    /* Hero */
    React.createElement('div', { className: 'dcp-hero' },
      React.createElement('h2', { className: 'dcp-hero-title dcp-anim dcp-anim-2' }, '光影破虚妄'),
      React.createElement('div', { className: 'dcp-hero-subtitle dcp-anim dcp-anim-2' }, 'LIGHT REVEALS TRUTH'),
      React.createElement('p', { className: 'dcp-hero-desc dcp-anim dcp-anim-3' },
        '以《画皮》的“辨伪存真”为故事内核，借泰山皮影的光影特性表现伪装与真实。'
      )
    ),

    /* Cultural sources retained from the former background screen. */
    React.createElement('div', { className: 'dcp-cultural dcp-anim dcp-anim-3' },
      React.createElement('div', { className: 'dcp-cultural-copy' },
        React.createElement('h3', { className: 'dcp-cultural-title' }, '从皮影到游戏'),
        React.createElement('p', { className: 'dcp-cultural-text' },
          '取泰山皮影的造型与驱邪寓意，将观看表演转为亲手探索。'
        )
      ),
      React.createElement('div', { className: 'dcp-cultural-images' },
        React.createElement('figure', { className: 'dcp-cultural-figure' },
          React.createElement(PortfolioImage, { className: 'dcp-cultural-image', src: 'taishan-puppet.jpg', alt: '泰山皮影造型参考' })
        ),
        React.createElement('figure', { className: 'dcp-cultural-figure' },
          React.createElement(PortfolioImage, { className: 'dcp-cultural-image', src: 'taishan-puppet2.jpg', alt: '泰山皮影细节参考' })
        )
      )
    ),

    /* CORE INTERACTION annotation */
    React.createElement('div', { className: 'dcp-core-label dcp-anim dcp-anim-3' },
      React.createElement('div', { className: 'dcp-core-label-line' }),
      React.createElement('span', { className: 'dcp-core-label-en' }, 'CORE INTERACTION'),
      React.createElement('span', { className: 'dcp-core-label-cn' }, '镜面辨妖'),
      React.createElement('div', { className: 'dcp-core-label-line' })
    ),

    /* Visual comparison — BEFORE / mirror / AFTER */
    React.createElement('div', { className: 'dcp-visual' },
      /* Left: BEFORE */
      React.createElement('div', { className: 'dcp-visual-item dcp-anim dcp-anim-4' },
        React.createElement('div', { className: 'dcp-visual-tag' },
          React.createElement('span', { className: 'dcp-visual-tag-en' }, 'BEFORE'),
          React.createElement('span', { className: 'dcp-visual-tag-cn' }, '伪装状态'),
          React.createElement('span', { className: 'dcp-visual-tag-sub' }, 'Hidden Form')
        ),
        React.createElement(PortfolioImage, {
          className: 'dcp-visual-image',
          src: 'taishan-concept1.jpg',
          alt: 'Mirror scene - before reveal'
        })
      ),

      /* Middle: mirror circle with light diffusion */
      React.createElement('div', { className: 'dcp-visual-mid dcp-anim dcp-anim-4' },
        React.createElement('div', { className: 'dcp-mirror' },
          React.createElement('div', { className: 'dcp-mirror-dot' })
        ),
        React.createElement('div', { className: 'dcp-visual-mid-en' }, 'LIGHT INTERACTION'),
        React.createElement('div', { className: 'dcp-visual-mid-cn' }, '光影触发'),
        React.createElement('div', { className: 'dcp-visual-mid-arrow' }, '\u2193'),
        React.createElement('div', { className: 'dcp-visual-mid-reveal' }, 'REVEAL TRUTH')
      ),

      /* Right: AFTER */
      React.createElement('div', { className: 'dcp-visual-item dcp-anim dcp-anim-4' },
        React.createElement('div', { className: 'dcp-visual-tag' },
          React.createElement('span', { className: 'dcp-visual-tag-en' }, 'AFTER'),
          React.createElement('span', { className: 'dcp-visual-tag-cn' }, '真实显现'),
          React.createElement('span', { className: 'dcp-visual-tag-sub' }, 'True Form')
        ),
        React.createElement(PortfolioImage, {
          className: 'dcp-visual-image',
          src: 'taishan-concept2.jpg',
          alt: 'Mirror scene - after reveal'
        })
      )
    )
  );
}

/* ---------- Case Study Story & Scene (dss- prefix) ---------- */
function CaseStudyStory() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  /* Timeline nodes — Scene 03 slightly emphasized */
  var timelineNodes = [
    { num: '01', en: 'FOREST', cn: '林间偶遇', major: false },
    { num: '02', en: 'TAISHAN STREET', cn: '泰山古街', major: false },
    { num: '03', en: 'MIRROR REVEAL', cn: '镜面辨妖', major: true },
    { num: '04', en: 'DONGYUE TEMPLE', cn: '东岳庙镇妖', major: false }
  ];

  var timelineElements = [];
  timelineNodes.forEach(function(node, i) {
    if (i > 0) {
      timelineElements.push(React.createElement('div', { key: 'tc-' + i, className: 'dss-timeline-connector' },
        React.createElement('div', { className: 'dss-timeline-line' }),
        React.createElement('span', { className: 'dss-timeline-arrow' }, '\u2192'),
        React.createElement('div', { className: 'dss-timeline-line' })
      ));
    }
    timelineElements.push(React.createElement('div', { key: 'tn-' + i, className: 'dss-timeline-node' + (node.major ? ' major' : '') },
      React.createElement('div', { className: 'dss-timeline-num' }, node.num),
      React.createElement('div', { className: 'dss-timeline-en' }, node.en),
      React.createElement('div', { className: 'dss-timeline-cn' }, node.cn),
      React.createElement('div', { className: 'dss-timeline-dot' })
    ));
  });

  return React.createElement('section', {
    ref: ref,
    className: 'dss-section snap-slide' + viewClass
  },
    /* Background layers */
    React.createElement('div', { className: 'dss-bg-deco' }),
    React.createElement('div', { className: 'dss-grid' }),

    /* Top title */
    React.createElement('div', { className: 'case-nav dss-anim dss-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '03'),
      React.createElement('div', { className: 'case-nav-en' }, 'STORY & SCENE DESIGN'),
      React.createElement('div', { className: 'case-nav-cn' }, '故事与场景设计')
    ),
    /* Hero intro */
    React.createElement('div', { className: 'dss-hero' },
      React.createElement('h2', { className: 'dss-hero-title dss-anim dss-anim-2' }, '故事旅程'),
      React.createElement('div', { className: 'dss-hero-subtitle dss-anim dss-anim-2' }, 'NARRATIVE JOURNEY'),
      React.createElement('p', { className: 'dss-hero-desc dss-anim dss-anim-3' },
        '林间、古街、镜前与东岳庙，四组场景承接故事的起点、探索、转折与高潮。'
      )
    ),

    /* Narrative timeline */
    React.createElement('div', { className: 'dss-timeline dss-anim dss-anim-3' },
      React.createElement('div', { className: 'dss-timeline-label' }, 'NARRATIVE TIMELINE'),
      React.createElement('div', { className: 'dss-timeline-flow' }, timelineElements)
    ),

    /* Scene modules */
    React.createElement('div', { className: 'dss-scenes' },

      /* Scene 01 — FOREST */
      React.createElement('div', { className: 'dss-scene dss-anim dss-anim-4' },
        React.createElement('div', { className: 'dss-scene-left' },
          React.createElement('div', { className: 'dss-scene-num' }, '01'),
          React.createElement('div', { className: 'dss-scene-en' }, 'FOREST'),
          React.createElement('div', { className: 'dss-scene-cn' }, '林间偶遇'),
          React.createElement('div', { className: 'dss-scene-role' }, '故事起点 · 命运转折'),
          React.createElement('div', { className: 'dss-scene-tags' },
            React.createElement('div', { className: 'dss-scene-tag' },
              React.createElement('div', { className: 'dss-scene-tag-en' }, 'NARRATIVE'),
              React.createElement('div', { className: 'dss-scene-tag-cn' }, '故事引入')
            )
          )
        ),
        React.createElement('div', { className: 'dss-scene-right' },
          React.createElement('div', { className: 'dss-scene-images' },
            React.createElement(PortfolioImage, { className: 'dss-scene-img dss-scene-img-tall', src: 'story-scholar.png', alt: 'Scholar reading' }),
            React.createElement(PortfolioImage, { className: 'dss-scene-img', src: 'story-forest.jpg', alt: 'Forest encounter' })
          ),
          React.createElement('p', { className: 'dss-scene-text' },
            '王生读书疲倦后出门散心，于深山林间偶遇神秘女子，故事由此展开。'
          )
        )
      ),

      /* Scene 02 — TAISHAN STREET */
      React.createElement('div', { className: 'dss-scene dss-anim dss-anim-4' },
        React.createElement('div', { className: 'dss-scene-left' },
          React.createElement('div', { className: 'dss-scene-num' }, '02'),
          React.createElement('div', { className: 'dss-scene-en' }, 'TAISHAN STREET'),
          React.createElement('div', { className: 'dss-scene-cn' }, '泰山古街探索'),
          React.createElement('div', { className: 'dss-scene-role' }, '探索阶段 · 秘术觉醒'),
          React.createElement('div', { className: 'dss-scene-tags' },
            React.createElement('div', { className: 'dss-scene-tag' },
              React.createElement('div', { className: 'dss-scene-tag-en' }, 'EXPLORATION'),
              React.createElement('div', { className: 'dss-scene-tag-cn' }, '探索')
            ),
            React.createElement('div', { className: 'dss-scene-tag' },
              React.createElement('div', { className: 'dss-scene-tag-en' }, 'PUZZLE'),
              React.createElement('div', { className: 'dss-scene-tag-cn' }, '拼影解谜')
            )
          )
        ),
        React.createElement('div', { className: 'dss-scene-right' },
          React.createElement('div', { className: 'dss-scene-images' },
            React.createElement(PortfolioImage, { className: 'dss-scene-img', src: 'story-elder.jpg', alt: 'Elder gives puppet' }),
            React.createElement(PortfolioImage, { className: 'dss-scene-img', src: 'story-puzzle.jpg', alt: 'Puzzle interaction' })
          ),
          React.createElement('p', { className: 'dss-scene-text' },
            '古街与赠偶老者将故事引向泰山，也引出后续的皮影线索。'
          )
        )
      ),

      /* Scene 03 — MIRROR REVEAL (slightly emphasized) */
      React.createElement('div', { className: 'dss-scene dss-scene-major dss-anim dss-anim-5' },
        React.createElement('div', { className: 'dss-scene-left' },
          React.createElement('div', { className: 'dss-scene-num' }, '03'),
          React.createElement('div', { className: 'dss-scene-en' }, 'MIRROR REVEAL'),
          React.createElement('div', { className: 'dss-scene-cn' }, '镜面辨妖'),
          React.createElement('div', { className: 'dss-scene-role' }, '核心交互 · 视觉重点'),
          React.createElement('div', { className: 'dss-scene-tags' },
            React.createElement('div', { className: 'dss-scene-tag' },
              React.createElement('div', { className: 'dss-scene-tag-en' }, 'CORE MECHANISM'),
              React.createElement('div', { className: 'dss-scene-tag-cn' }, '核心玩法')
            )
          )
        ),
        React.createElement('div', { className: 'dss-scene-right' },
          React.createElement('div', { className: 'dss-mirror-scene' },
            React.createElement('div', { className: 'dss-mirror-comparison' },
              /* BEFORE */
              React.createElement('div', { className: 'dss-mirror-item' },
                React.createElement('div', { className: 'dss-mirror-tag' },
                  React.createElement('span', { className: 'dss-mirror-tag-en' }, 'BEFORE'),
                  React.createElement('span', { className: 'dss-mirror-tag-cn' }, '伪装状态'),
                  React.createElement('span', { className: 'dss-mirror-tag-sub' }, 'Hidden Form')
                ),
                React.createElement(PortfolioImage, { className: 'dss-mirror-img', src: 'story-mirror-before.jpg', alt: 'Mirror before reveal' })
              ),
              /* Mirror center */
              React.createElement('div', { className: 'dss-mirror-mid' },
                React.createElement('div', { className: 'dss-mirror-circle' },
                  React.createElement('div', { className: 'dss-mirror-dot' })
                ),
                React.createElement('div', { className: 'dss-mirror-mid-en' }, 'LIGHT INTERACTION'),
                React.createElement('div', { className: 'dss-mirror-mid-cn' }, '光影触发'),
                React.createElement('div', { className: 'dss-mirror-mid-arrow' }, '\u2193'),
                React.createElement('div', { className: 'dss-mirror-mid-reveal' }, 'REVEAL TRUTH')
              ),
              /* AFTER */
              React.createElement('div', { className: 'dss-mirror-item' },
                React.createElement('div', { className: 'dss-mirror-tag' },
                  React.createElement('span', { className: 'dss-mirror-tag-en' }, 'AFTER'),
                  React.createElement('span', { className: 'dss-mirror-tag-cn' }, '真实显现'),
                  React.createElement('span', { className: 'dss-mirror-tag-sub' }, 'True Form')
                ),
                React.createElement(PortfolioImage, { className: 'dss-mirror-img', src: 'story-mirror-after.jpg', alt: 'Mirror after reveal' })
              )
            ),
            React.createElement('p', { className: 'dss-mirror-text' },
              '镜前的女子由人形转为妖形，是故事由怀疑走向揭示的转折。'
            )
          )
        )
      ),

      /* Scene 04 — DONGYUE TEMPLE */
      React.createElement('div', { className: 'dss-scene dss-anim dss-anim-6' },
        React.createElement('div', { className: 'dss-scene-left' },
          React.createElement('div', { className: 'dss-scene-num' }, '04'),
          React.createElement('div', { className: 'dss-scene-en' }, 'DONGYUE TEMPLE'),
          React.createElement('div', { className: 'dss-scene-cn' }, '东岳庙镇妖'),
          React.createElement('div', { className: 'dss-scene-role' }, '最终挑战 · 节奏战斗'),
          React.createElement('div', { className: 'dss-scene-tags' },
            React.createElement('div', { className: 'dss-scene-tag' },
              React.createElement('div', { className: 'dss-scene-tag-en' }, 'COMBAT'),
              React.createElement('div', { className: 'dss-scene-tag-cn' }, '节奏战斗')
            )
          )
        ),
        React.createElement('div', { className: 'dss-scene-right' },
          React.createElement('div', { className: 'dss-scene-images' },
            React.createElement(PortfolioImage, { className: 'dss-scene-img', src: 'story-temple.jpg', alt: 'Temple battle scene' }),
            React.createElement(PortfolioImage, { className: 'dss-scene-img', src: 'story-combat-2.jpg', alt: 'Monster form reveal' })
          ),
          React.createElement('p', { className: 'dss-scene-text' },
            '东岳庙的镇妖场景收束冲突，以妖形与庙宇的对照形成最终高潮。'
          )
        )
      )
    )
  );
}


/* ---------- Case Study Interaction Experience (iev- prefix) ---------- */
function CaseStudyInteraction() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var modules = [
    {
      num: '01',
      titleEn: 'DRAG PUZZLE',
      titleCn: '\u62fc\u5f71\u89e3\u8c1c',
      video: 'interaction-drag.mp4',
      poster: 'gameplay-drag.jpg',
      stills: [{ src: 'gameplay-drag.jpg', alt: '拼影解谜完整操作画面', caption: '拼接皮影组件' }],
      isCore: false,
      info: [
        { label: 'INPUT', text: '\u62d6\u62fd\u62fc\u63a5\u76ae\u5f71\u7ec4\u4ef6' },
        { label: 'FEEDBACK', text: '还原皮影结构，理解组件关系' }
      ]
    },
    {
      num: '02',
      titleEn: 'MIRROR REVEAL',
      titleCn: '\u955c\u9762\u8fa8\u5996',
      video: 'interaction-mirror.mp4',
      poster: 'gameplay-mirror-after.jpg',
      stills: [
        { src: 'gameplay-mirror-before.jpg', alt: '镜面辨妖触发前的完整画面', caption: '触发前 · 伪装状态' },
        { src: 'gameplay-mirror-after.jpg', alt: '镜面辨妖触发后的完整画面', caption: '触发后 · 妖形显现' }
      ],
      isCore: true,
      info: [
        { label: 'INPUT', text: '\u79fb\u52a8\u955c\u9762\u89c2\u5bdf' },
        { label: 'FEEDBACK', text: '光影变化揭示隐藏妖形' }
      ]
    },
    {
      num: '03',
      titleEn: 'RHYTHM COMBAT',
      titleCn: '\u8282\u594f\u6218\u6597',
      video: 'interaction-combat.mp4',
      poster: 'gameplay-combat.jpg',
      stills: [{ src: 'gameplay-combat.jpg', alt: '东岳庙节奏战斗完整画面', caption: '节奏点击与战斗反馈' }],
      isCore: false,
      info: [
        { label: 'INPUT', text: '\u8282\u594f\u70b9\u51fb\u63a7\u5236' },
        { label: 'FEEDBACK', text: '锣鼓节奏对应战斗动作' }
      ]
    }
  ];

  function renderModule(mod, i) {
    var animClass = 'iev-anim iev-anim-' + (i + 3);
    var infoElements = [];
    mod.info.forEach(function(item, j) {
      if (j > 0) {
        infoElements.push(React.createElement('div', { key: 'div-' + j, className: 'iev-info-div' }));
      }
      infoElements.push(React.createElement('div', { key: item.label, className: 'iev-info-item' },
        React.createElement('div', { className: 'iev-info-label' }, item.label),
        React.createElement('div', { className: 'iev-info-text' }, item.text)
      ));
    });

    return React.createElement('div', {
      key: mod.num,
      className: 'iev-video-module ' + (mod.isCore ? 'iev-video-module-core' : '') + ' ' + animClass
    },
      React.createElement('div', { className: 'iev-mod-header' },
        React.createElement('span', { className: 'iev-mod-num' }, mod.num),
        React.createElement('div', null,
          React.createElement('div', { className: 'iev-mod-title' },
            mod.titleEn,
            mod.isCore ? React.createElement('span', { className: 'iev-core-badge' }, 'CORE INTERACTION') : null
          ),
          React.createElement('div', { className: 'iev-mod-cn' }, mod.titleCn)
        )
      ),
      React.createElement('div', { className: 'iev-video-wrap' },
        React.createElement(DeferredVideo, {
          src: mod.video,
          resumeOnReturn: true,
          'aria-label': mod.titleCn + '操作演示',
          autoPlay: !reduceMotion,
          muted: true,
          loop: !reduceMotion,
          controls: true,
          poster: mod.poster,
          playsInline: true,
          preload: 'metadata',
          'webkit-playsinline': 'true'
        })
      ),
      React.createElement('div', { className: 'iev-mod-info' }, infoElements),
      React.createElement('details', { className: 'iev-stills' },
        React.createElement('summary', null, '查看静态关键帧'),
        mod.stills.map(function(still) {
          return React.createElement('figure', { key: still.src, className: 'iev-still-figure' },
            React.createElement(PortfolioImage, { className: 'iev-still-image', src: still.src, alt: still.alt }),
            React.createElement('figcaption', { className: 'iev-still-caption' }, still.caption)
          );
        })
      )
    );
  }

  return React.createElement('section', {
    ref: ref,
    className: 'iev-section snap-slide' + viewClass
  },
    React.createElement('span', { id: 'game-design-gameplay', className: 'chapter-anchor-alias', 'aria-hidden': true }),
    React.createElement('span', { id: 'cs-gameplay', className: 'chapter-anchor-alias', 'aria-hidden': true }),
    /* Background grid */
    React.createElement('div', { className: 'iev-bg-grid' }),

    /* Chapter navigation */
    React.createElement('div', { className: 'case-nav iev-anim iev-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '04'),
      React.createElement('div', { className: 'case-nav-en' }, 'INTERACTION EXPERIENCE DESIGN'),
      React.createElement('div', { className: 'case-nav-cn' }, '\u4ea4\u4e92\u4f53\u9a8c\u8bbe\u8ba1')
    ),

    /* Header */
    React.createElement('div', { className: 'iev-header' },
      React.createElement('div', { className: 'iev-main-title iev-anim iev-anim-2' }, 'LIGHT & SHADOW INTERACTION'),
      React.createElement('div', { className: 'iev-main-cn iev-anim iev-anim-2' }, '\u5149\u5f71\u4ea4\u4e92\u4f53\u9a8c'),
      React.createElement('p', { className: 'iev-desc iev-anim iev-anim-3' },
        '拖拽、镜面与节奏点击的实际操作记录；每段视频下方可展开查看静态关键帧。'
      )
    ),

    /* Video modules */
    React.createElement('div', { className: 'iev-modules' },
      React.createElement('div', { className: 'iev-top-row' },
        modules.map(function(mod, i) { return renderModule(mod, i); })
      )
    )
  );
}

/* ---------- Case Study Playable Experience (pe- prefix) ---------- */
function CaseStudyPlayable() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return React.createElement('section', {
    ref: ref,
    className: 'pe-section snap-slide' + viewClass
  },
    /* Background grid */
    React.createElement('div', { className: 'pe-bg-grid' }),

    /* Chapter navigation */
    React.createElement('div', { className: 'case-nav pe-anim pe-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '05'),
      React.createElement('div', { className: 'case-nav-en' }, 'PLAYABLE EXPERIENCE'),
      React.createElement('div', { className: 'case-nav-cn' }, '\u8bd5\u73a9\u4f53\u9a8c')
    ),

    /* Header */
    React.createElement('div', { className: 'pe-header' },
      React.createElement('div', { className: 'pe-main-title pe-anim pe-anim-2' }, 'INTERACTIVE DEMO'),
      React.createElement('div', { className: 'pe-main-cn pe-anim pe-anim-2' }, '\u5b8c\u6574\u6e38\u620f\u4f53\u9a8c'),
      React.createElement('p', { className: 'pe-subtitle-cn pe-anim pe-anim-3' },
        '\u4f53\u9a8c\u5b8c\u6574\u4e92\u52a8\u6e38\u620f\u6d41\u7a0b\u3002'
      )
    ),

    /* Main content - left/right split */
    React.createElement('div', { className: 'pe-main' },
      /* Left side - video demo */
      React.createElement('div', { className: 'pe-left pe-anim pe-anim-4' },
        React.createElement('div', { className: 'pe-video-label' },
          React.createElement('span', { className: 'pe-video-label-en' }, 'GAMEPLAY PREVIEW'),
          React.createElement('span', { className: 'pe-video-label-cn' }, '\u6e38\u620f\u8fd0\u884c\u5c55\u793a')
        ),
        React.createElement('div', { className: 'pe-video-wrap' },
          React.createElement(DeferredVideo, {
            src: 'gameplay-demo.mp4',
            resumeOnReturn: true,
            'aria-label': '泰山皮影镇妖记完整游戏演示',
            autoPlay: !reduceMotion,
            muted: true,
            loop: !reduceMotion,
            controls: true,
            poster: 'taishan-hero-poster.jpg',
            playsInline: true,
            preload: 'metadata',
            'webkit-playsinline': 'true'
          })
        )
      ),

      /* Right side - demo card + info */
      React.createElement('div', { className: 'pe-right' },
        /* Demo card */
        React.createElement('div', { className: 'pe-demo-card pe-anim pe-anim-5' },
          React.createElement('div', { className: 'pe-demo-en-label' }, 'PLAYABLE DEMO'),
          React.createElement('div', { className: 'pe-demo-en-sub' }, 'SCAN TO PLAY'),
          React.createElement('div', { className: 'pe-demo-qr' },
            React.createElement(PortfolioImage, { src: 'assets/game-demo/qr-yf8s.png', width: 410, height: 410, alt: '泰山皮影镇妖记 H5 小游戏二维码' })
          ),
          React.createElement('div', { className: 'pe-demo-type' }, 'H5 Interactive Game'),
          React.createElement('div', { className: 'pe-demo-cn' }, '\u626b\u7801\u4f53\u9a8c\u5b8c\u6574\u6e38\u620f'),
          React.createElement('a', { className: 'game-demo-launch', href: 'https://c.u.h5mc.com/c/bxqd/yf8s/index.html', target: '_blank', rel: 'noopener noreferrer', 'aria-label': '直接试玩泰山皮影镇妖记（新窗口）' }, '直接试玩'),
          React.createElement('small', { className: 'game-demo-hint' }, '新窗口打开 · 也可手机扫码')
        ),

        /* Info list */
        React.createElement('div', { className: 'pe-info-list pe-anim pe-anim-6' },
          React.createElement('div', { className: 'pe-info-row' },
            React.createElement('span', { className: 'pe-info-label' }, 'PLATFORM'),
            React.createElement('span', { className: 'pe-info-value' }, 'Web / Mobile')
          ),
          React.createElement('div', { className: 'pe-info-row' },
            React.createElement('span', { className: 'pe-info-label' }, 'DURATION'),
            React.createElement('span', { className: 'pe-info-value' }, '3-5 min')
          ),
          React.createElement('div', { className: 'pe-info-row' },
            React.createElement('span', { className: 'pe-info-label' }, 'GAMEPLAY'),
            React.createElement('span', { className: 'pe-info-value' }, 'Explore / Puzzle / Combat')
          )
        )
      )
    )
  );
}

window.PortfolioChapters.gameDesign = function() {
  return [
    React.createElement(CaseStudyOverview, { key: 'cs-overview' }),
    React.createElement(CaseStudyConcept, { key: 'cs-concept' }),
    React.createElement(CaseStudyStory, { key: 'cs-story' }),
    React.createElement(CaseStudyInteraction, { key: 'cs-interaction' }),
    React.createElement(CaseStudyPlayable, { key: 'cs-playable' })
  ];
};
