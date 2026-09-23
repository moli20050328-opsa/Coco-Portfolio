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
            React.createElement(PortfolioImage, { src: 'qr-demo.png', alt: 'Playable Demo QR Code' })
          ),
          /* Divider */
          React.createElement('div', { className: 'cs-demo-divider' }),
          /* Text content */
          React.createElement('div', { className: 'cs-demo-text' },
            React.createElement('div', { className: 'cs-demo-en-label' }, 'PLAYABLE DEMO'),
            React.createElement('div', { className: 'cs-demo-en-sub' }, 'SCAN TO EXPERIENCE'),
            React.createElement('div', { className: 'cs-demo-en-type' }, 'H5 Interactive Game'),
            React.createElement('div', { className: 'cs-demo-cn' }, '\u626b\u7801\u4f53\u9a8c\u6e38\u620f'),
            React.createElement('div', { className: 'cs-demo-cn-sub' }, '\u8bd5\u73a9\u5b8c\u6574\u4e92\u52a8\u6d41\u7a0b')
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


/* ---------- Case Study Design Background (dbg- prefix) ---------- */
function CaseStudyBackground() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  var flowSteps = ['\u4f20\u7edf\u5c55\u793a\u65b9\u5f0f', '\u53c2\u4e0e\u5ea6\u964d\u4f4e', '\u9700\u8981\u65b0\u7684\u4f20\u64ad\u65b9\u5f0f'];

  var flowElements = [];
  flowSteps.forEach(function(step, i) {
    if (i > 0) {
      flowElements.push(React.createElement('span', { key: 'arrow-' + i, className: 'dbg-flow-arrow' }, '\u2193'));
    }
    flowElements.push(React.createElement('span', { key: 'step-' + i, className: 'dbg-flow-step' }, step));
  });

  return React.createElement('section', {
    ref: ref,
    className: 'dbg-section snap-slide' + viewClass
  },
    /* Background decoration */
    React.createElement('div', { className: 'dbg-bg-deco' }),

    /* Top title */
    React.createElement('div', { className: 'case-nav dbg-anim dbg-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '02'),
      React.createElement('div', { className: 'case-nav-en' }, 'PROJECT BACKGROUND'),
      React.createElement('div', { className: 'case-nav-cn' }, '项目背景')
    ),
    /* Main content */
    React.createElement('div', { className: 'dbg-main' },
      /* Left side — cultural visual */
      React.createElement('div', { className: 'dbg-left dbg-anim dbg-anim-2' },
        React.createElement(PortfolioImage, {
          className: 'dbg-image',
          src: 'taishan-puppet.jpg',
          alt: 'Taishan Shadow Puppet'
        }),
        React.createElement(PortfolioImage, {
          className: 'dbg-image',
          src: 'taishan-puppet2.jpg',
          alt: 'Taishan Shadow Puppet Detail'
        }),
        React.createElement('div', { className: 'dbg-image-label' },
          React.createElement('div', { className: 'dbg-image-label-en' }, 'TAISHAN SHADOW PUPPET'),
          React.createElement('div', { className: 'dbg-image-label-sub' }, 'Chinese Intangible Cultural Heritage')
        )
      ),

      /* Right side — three modules */
      React.createElement('div', { className: 'dbg-right' },
        /* Module 01 */
        React.createElement('div', { className: 'dbg-module dbg-anim dbg-anim-3' },
          React.createElement('div', { className: 'dbg-module-num' }, '01'),
          React.createElement('div', { className: 'dbg-module-title' },
            React.createElement('span', { className: 'dbg-module-title-en' }, 'CULTURAL VALUE'),
            React.createElement('span', { className: 'dbg-module-title-cn' }, '\u6587\u5316\u4ef7\u503c')
          ),
          React.createElement('p', { className: 'dbg-module-text' },
            '\u6cf0\u5c71\u76ae\u5f71\u62e5\u6709\u5343\u5e74\u5386\u53f2\uff0c\u662f\u4e2d\u56fd\u4f20\u7edf\u76ae\u5f71\u827a\u672f\u7684\u91cd\u8981\u7ec4\u6210\u90e8\u5206\u3002'
          )
        ),

        React.createElement('div', { className: 'dbg-divider' }),

        /* Module 02 */
        React.createElement('div', { className: 'dbg-module dbg-anim dbg-anim-4' },
          React.createElement('div', { className: 'dbg-module-num' }, '02'),
          React.createElement('div', { className: 'dbg-module-title' },
            React.createElement('span', { className: 'dbg-module-title-en' }, 'CURRENT CHALLENGE'),
            React.createElement('span', { className: 'dbg-module-title-cn' }, '\u4f20\u64ad\u56f0\u5883')
          ),
          React.createElement('p', { className: 'dbg-module-text' },
            '\u73b0\u4ee3\u5a31\u4e50\u65b9\u5f0f\u53d8\u5316\u5bfc\u81f4\u4f20\u7edf\u6587\u5316\u4f20\u64ad\u65b9\u5f0f\u5355\u4e00\uff0c\u5e74\u8f7b\u7528\u6237\u53c2\u4e0e\u4e0d\u8db3\u3002'
          ),
          React.createElement('div', { className: 'dbg-flow' }, flowElements)
        ),

        React.createElement('div', { className: 'dbg-divider' }),

        /* Module 03 */
        React.createElement('div', { className: 'dbg-module dbg-anim dbg-anim-5' },
          React.createElement('div', { className: 'dbg-module-num' }, '03'),
          React.createElement('div', { className: 'dbg-module-title' },
            React.createElement('span', { className: 'dbg-module-title-en' }, 'DESIGN OPPORTUNITY'),
            React.createElement('span', { className: 'dbg-module-title-cn' }, '\u8bbe\u8ba1\u673a\u4f1a')
          ),
          React.createElement('p', { className: 'dbg-module-text' },
            '\u901a\u8fc7\u4e92\u52a8\u6e38\u620f\uff0c\u5c06\u4f20\u7edf\u76ae\u5f71\u6587\u5316\u8f6c\u5316\u4e3a\u53ef\u53c2\u4e0e\u7684\u6570\u5b57\u4f53\u9a8c\u3002'
          ),
          React.createElement('div', { className: 'dbg-keywords' },
            React.createElement('span', { className: 'dbg-keyword' }, 'TRADITION'),
            React.createElement('span', { className: 'dbg-keyword' }, 'INTERACTION'),
            React.createElement('span', { className: 'dbg-keyword' }, 'DIGITAL EXPERIENCE')
          )
        )
      )
    ),

    /* Bottom summary */
    React.createElement('div', { className: 'dbg-summary dbg-anim dbg-anim-5' },
      React.createElement('div', { className: 'dbg-summary-line' }),
      React.createElement('div', { className: 'dbg-summary-text' },
        '\u8ba9\u4f20\u7edf\u6280\u827a\u6210\u4e3a\u53ef\u4f53\u9a8c\u3001\u53ef\u63a2\u7d22\u7684\u6570\u5b57\u6587\u5316\u3002'
      )
    )
  );
}

/* ---------- Case Study Design Concept (dcp- prefix) ---------- */
function CaseStudyConcept() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  /* DESIGN LOGIC flow nodes */
  var logicNodes = [
    { num: '01', en: 'CULTURAL ORIGIN', cn: '泰山皮影', kw: '光影辨形' },
    { num: '02', en: 'GAME MECHANISM', cn: '镜面探索', kw: '妖形揭示' },
    { num: '03', en: 'PLAYER EXPERIENCE', cn: '观察推理', kw: '发现真相' }
  ];

  var logicElements = [];
  logicNodes.forEach(function(node, i) {
    if (i > 0) {
      logicElements.push(React.createElement('div', { key: 'conn-' + i, className: 'dcp-logic-connector' },
        React.createElement('div', { className: 'dcp-logic-line' }),
        React.createElement('span', { className: 'dcp-logic-arrow' }, '\u2192'),
        React.createElement('div', { className: 'dcp-logic-line' })
      ));
    }
    logicElements.push(React.createElement('div', { key: 'node-' + i, className: 'dcp-logic-node' },
      React.createElement('div', { className: 'dcp-logic-num' }, node.num),
      React.createElement('div', { className: 'dcp-logic-en' }, node.en),
      React.createElement('div', { className: 'dcp-logic-cn' }, node.cn),
      React.createElement('div', { className: 'dcp-logic-keyword' }, node.kw),
      React.createElement('div', { className: 'dcp-logic-dot' })
    ));
  });

  return React.createElement('section', {
    ref: ref,
    id: 'game-design-concept',
    className: 'dcp-section snap-slide' + viewClass
  },
    /* Background layers */
    React.createElement('div', { className: 'dcp-bg-deco' }),
    React.createElement('div', { className: 'dcp-grid' }),

    /* Top title */
    React.createElement('div', { className: 'case-nav dcp-anim dcp-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '03'),
      React.createElement('div', { className: 'case-nav-en' }, 'DESIGN CONCEPT'),
      React.createElement('div', { className: 'case-nav-cn' }, '设计概念')
    ),
    /* Hero */
    React.createElement('div', { className: 'dcp-hero' },
      React.createElement('h2', { className: 'dcp-hero-title dcp-anim dcp-anim-2' }, '光影破虚妄'),
      React.createElement('div', { className: 'dcp-hero-subtitle dcp-anim dcp-anim-2' }, 'LIGHT REVEALS TRUTH'),
      React.createElement('p', { className: 'dcp-hero-desc dcp-anim dcp-anim-3' },
        '以泰山皮影光影技艺为核心，将\u201C辨伪\u201D转化为玩家可操作的镜面探索机制。'
      )
    ),

    /* DESIGN LOGIC — compact flow chart */
    React.createElement('div', { className: 'dcp-logic dcp-anim dcp-anim-3' },
      React.createElement('div', { className: 'dcp-logic-label' }, 'DESIGN LOGIC'),
      React.createElement('div', { className: 'dcp-logic-flow' }, logicElements)
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
    ),

    /* Bottom design summary cards */
    React.createElement('div', { className: 'dcp-modules' },
      React.createElement('div', { className: 'dcp-module dcp-anim dcp-anim-5' },
        React.createElement('div', { className: 'dcp-module-num' }, '01'),
        React.createElement('div', { className: 'dcp-module-en' }, 'CULTURAL TRANSLATION'),
        React.createElement('div', { className: 'dcp-module-cn' }, '文化转译'),
        React.createElement('div', { className: 'dcp-module-keyword' }, '以泰山皮影的光影辨形与驱邪寓意，建立玩法的文化来源。')
      ),

      React.createElement('div', { className: 'dcp-module dcp-anim dcp-anim-6' },
        React.createElement('div', { className: 'dcp-module-num' }, '02'),
        React.createElement('div', { className: 'dcp-module-en' }, 'INTERACTION RESULT'),
        React.createElement('div', { className: 'dcp-module-cn' }, '机制转换'),
        React.createElement('div', { className: 'dcp-module-keyword' }, '将镜面反射转化为揭示妖形的核心操作，连接观察与探索。')
      ),

      React.createElement('div', { className: 'dcp-module dcp-anim dcp-anim-6' },
        React.createElement('div', { className: 'dcp-module-num' }, '03'),
        React.createElement('div', { className: 'dcp-module-en' }, 'EXPERIENCE VALUE'),
        React.createElement('div', { className: 'dcp-module-cn' }, '认知闭环'),
        React.createElement('div', { className: 'dcp-module-keyword' }, '让玩家通过观察线索完成从怀疑、验证到发现真相的体验闭环。')
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

  /* Experience flow nodes with emotion hints */
  var expNodes = [
    { en: 'BEGINNING', cn: '平静', emotion: '' },
    { en: 'EXPLORATION', cn: '探索', emotion: '好奇' },
    { en: 'DISCOVERY', cn: '发现真相', emotion: '紧张' },
    { en: 'CLIMAX', cn: '最终高潮', emotion: '爆发' }
  ];

  var expElements = [];
  expNodes.forEach(function(node, i) {
    if (i > 0) {
      expElements.push(React.createElement('div', { key: 'ec-' + i, className: 'dss-experience-connector' },
        React.createElement('div', { className: 'dss-experience-line' }),
        React.createElement('span', { className: 'dss-experience-arrow' }, '\u2192'),
        React.createElement('div', { className: 'dss-experience-line' })
      ));
    }
    expElements.push(React.createElement('div', { key: 'en-' + i, className: 'dss-experience-node' },
      React.createElement('div', { className: 'dss-experience-en' }, node.en),
      React.createElement('div', { className: 'dss-experience-cn' }, node.cn),
      node.emotion ? React.createElement('div', { className: 'dss-experience-emotion' }, node.emotion) : null,
      React.createElement('div', { className: 'dss-experience-dot' })
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
      React.createElement('div', { className: 'case-nav-num' }, '04'),
      React.createElement('div', { className: 'case-nav-en' }, 'STORY & SCENE DESIGN'),
      React.createElement('div', { className: 'case-nav-cn' }, '故事与场景设计')
    ),
    /* Hero intro */
    React.createElement('div', { className: 'dss-hero' },
      React.createElement('h2', { className: 'dss-hero-title dss-anim dss-anim-2' }, '故事旅程'),
      React.createElement('div', { className: 'dss-hero-subtitle dss-anim dss-anim-2' }, 'NARRATIVE JOURNEY'),
      React.createElement('p', { className: 'dss-hero-desc dss-anim dss-anim-3' },
        '通过四个核心场景推进剧情，将泰山皮影文化转化为探索、解谜与战斗体验。'
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
            '玩家进入泰山古街，通过寻找皮影线索完成探索与解谜。'
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
              '利用泰山皮影光影特性，通过镜面反射揭示隐藏真相。'
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
            '玩家操控皮影完成最终战斗，实现传统技艺与游戏机制融合。'
          )
        )
      )
    ),

    /* Player experience flow — emotion curve */
    React.createElement('div', { className: 'dss-experience dss-anim dss-anim-7' },
      React.createElement('div', { className: 'dss-experience-label' }, 'PLAYER EXPERIENCE FLOW'),
      React.createElement('div', { className: 'dss-experience-flow' }, expElements)
    )
  );
}


function CaseStudyGameplay() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  var modules = [
    {
      num: '01',
      title: 'DRAG PUZZLE',
      subtitle: '\u62fc\u5f71\u89e3\u8c1c',
      img: 'gameplay-drag.jpg',
      imgAlt: '\u62fc\u5f71\u89e3\u8c1c\u4ea4\u4e92',
      imgCompact: true,
      action: '\u62d6\u52a8 / \u62fc\u63a5',
      experience: '\u7406\u89e3\u76ae\u5f71\u7ed3\u6784',
      tags: [
        { text: 'DRAG', accent: false },
        { text: 'ASSEMBLE', accent: true },
        { text: 'PUZZLE', accent: false }
      ],
      isMirror: false
    },
    {
      num: '02',
      title: 'MIRROR REVEAL',
      subtitle: '\u955c\u9762\u8fa8\u5996',
      beforeImg: 'gameplay-mirror-before.jpg',
      afterImg: 'gameplay-mirror-after.jpg',
      action: '\u89c2\u5bdf\u955c\u9762\u53d8\u5316',
      experience: '\u4ece\u89c6\u89c9\u9519\u89c9\u4e2d\u53d1\u73b0\u771f\u5b9e\u8eab\u4efd',
      tags: [
        { text: 'LIGHT', accent: false },
        { text: 'REFLECTION', accent: true },
        { text: 'DISCOVERY', accent: false }
      ],
      isMirror: true,
      isCore: true,
      flow: [
        { en: 'OBSERVE', cn: '\u89c2\u5bdf\u955c\u9762' },
        { en: 'REFLECT', cn: '\u5149\u5f71\u53d8\u5316' },
        { en: 'REVEAL', cn: '\u53d1\u73b0\u5996\u5f62' }
      ]
    },
    {
      num: '03',
      title: 'RHYTHM COMBAT',
      subtitle: '\u8282\u594f\u6218\u6597',
      img: 'gameplay-combat.jpg',
      imgAlt: '\u4e1c\u5cb3\u5e99\u9547\u5996\u6218\u6597',
      action: '\u8282\u594f\u63a7\u5236',
      experience: '\u4f20\u7edf\u6280\u827a\u4e0e\u6218\u6597\u7ed3\u5408',
      tags: [
        { text: 'RHYTHM', accent: false },
        { text: 'CONTROL', accent: true },
        { text: 'COMBAT', accent: false }
      ],
      isMirror: false
    }
  ];

  var loopNodes = [
    { en: 'OBSERVE', cn: '\u89c2\u5bdf\u5f02\u5e38' },
    { en: 'EXPLORE', cn: '\u5bfb\u627e\u7ebf\u7d22' },
    { en: 'SOLVE', cn: '\u76ae\u5f71\u89e3\u8c1c' },
    { en: 'REVEAL', cn: '\u955c\u9762\u63ed\u793a' },
    { en: 'COMBAT', cn: '\u6700\u7ec8\u6218\u6597' }
  ];

  var moduleElements = modules.map(function(m, i) {
    var imgElement;
    if (m.isMirror) {
      var flowSteps = [];
      m.flow.forEach(function(f, j) {
        flowSteps.push(
          React.createElement('div', { key: 'fr-' + j, className: 'dpi-mirror-flow-row' },
            React.createElement('span', { className: 'dpi-mirror-flow-step' }, f.en),
            React.createElement('span', { className: 'dpi-mirror-flow-cn' }, f.cn)
          )
        );
        if (j < m.flow.length - 1) {
          flowSteps.push(React.createElement('div', { key: 'fa-' + j, className: 'dpi-mirror-flow-arrow' }, '\u2193'));
        }
      });

      imgElement = React.createElement('div', { className: 'dpi-mirror-stack' },
        React.createElement('div', { className: 'dpi-mirror-item' },
          React.createElement('div', { className: 'dpi-mirror-label' }, 'BEFORE'),
          React.createElement('div', { className: 'dpi-mirror-img' },
            React.createElement(PortfolioImage, { src: m.beforeImg, alt: '\u955c\u9762\u672a\u89e6\u53d1' })
          )
        ),
        React.createElement('div', { className: 'dpi-mirror-flow' }, flowSteps),
        React.createElement('div', { className: 'dpi-mirror-item' },
          React.createElement('div', { className: 'dpi-mirror-label' }, 'AFTER'),
          React.createElement('div', { className: 'dpi-mirror-img' },
            React.createElement(PortfolioImage, { src: m.afterImg, alt: '\u5996\u602a\u663e\u5f62' })
          )
        )
      );
    } else {
      var imgClass = 'dpi-mod-img' + (m.imgCompact ? ' dpi-mod-img-compact' : '');
      imgElement = React.createElement('div', { className: imgClass },
        React.createElement(PortfolioImage, { src: m.img, alt: m.imgAlt })
      );
    }

    var coreLabel = m.isCore
      ? React.createElement('div', { className: 'dpi-mod-core' }, 'CORE MECHANIC')
      : null;

    return React.createElement('div', {
      key: 'mod-' + i,
      className: 'dpi-mod dpi-anim dpi-anim-' + (i + 3)
    },
      coreLabel,
      React.createElement('div', { className: 'dpi-mod-num' }, m.num),
      React.createElement('div', { className: 'dpi-mod-title' }, m.title),
      React.createElement('div', { className: 'dpi-mod-subtitle' }, m.subtitle),
      imgElement,
      React.createElement('div', { className: 'dpi-mod-info' },
        React.createElement('div', { className: 'dpi-mod-info-row' },
          React.createElement('span', { className: 'dpi-mod-info-label' }, 'PLAYER ACTION'),
          React.createElement('span', { className: 'dpi-mod-info-value' }, m.action)
        ),
        React.createElement('div', { className: 'dpi-mod-info-row' },
          React.createElement('span', { className: 'dpi-mod-info-label' }, 'CORE EXPERIENCE'),
          React.createElement('span', { className: 'dpi-mod-info-value' }, m.experience)
        )
      ),
      React.createElement('div', { className: 'dpi-mod-tags' },
        m.tags.map(function(t, j) {
          return React.createElement('span', {
            key: 'tag-' + j,
            className: 'dpi-mod-tag' + (t.accent ? ' dpi-mod-tag-accent' : '')
          }, t.text);
        })
      )
    );
  });

  var loopElements = [];
  loopNodes.forEach(function(n, i) {
    loopElements.push(React.createElement('div', {
      key: 'loop-' + i,
      className: 'dpi-loop-node dpi-anim dpi-anim-' + (i + 6)
    },
      React.createElement('div', { className: 'dpi-loop-dot' }),
      React.createElement('div', { className: 'dpi-loop-label' }, n.en),
      React.createElement('div', { className: 'dpi-loop-cn' }, n.cn)
    ));
    if (i < loopNodes.length - 1) {
      loopElements.push(React.createElement('div', {
        key: 'loop-line-' + i,
        className: 'dpi-loop-line'
      }));
    }
  });

  return React.createElement('section', {
    ref: ref,
    className: 'dpi-section snap-slide' + viewClass
  },
    React.createElement('div', { className: 'dpi-bg-deco' }),

    /* Header */
    React.createElement('div', { className: 'case-nav dpi-anim dpi-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '05'),
      React.createElement('div', { className: 'case-nav-en' }, 'GAME MECHANISM DESIGN'),
      React.createElement('div', { className: 'case-nav-cn' }, '游戏机制设计')
    ),

    /* Header */
    React.createElement('div', { className: 'dpi-header dpi-anim dpi-anim-2' },
      React.createElement('div', { className: 'dpi-header-title' }, '光影探秘'),
      React.createElement('div', { className: 'dpi-header-subtitle' }, 'LIGHT & SHADOW DETECTION'),
      React.createElement('div', { className: 'dpi-header-desc' }, '通过传统皮影技艺转化为玩家可操作的探索、解谜与战斗机制。')
    ),

    /* Divider */
    React.createElement('div', { className: 'dpi-divider dpi-anim dpi-anim-2' }),

    /* Three modules */
    React.createElement('div', { className: 'dpi-modules' },
      moduleElements
    ),

    /* PLAYER EXPERIENCE LOOP */
    React.createElement('div', { className: 'dpi-loop dpi-anim dpi-anim-5' },
      React.createElement('div', { className: 'dpi-loop-title' }, 'PLAYER EXPERIENCE LOOP'),
      React.createElement('div', { className: 'dpi-loop-summary' }, '\u73a9\u5bb6\u901a\u8fc7\u89c2\u5bdf\u3001\u63a2\u7d22\u4e0e\u4e92\u52a8\u9010\u6b65\u53d1\u73b0\u9690\u85cf\u771f\u76f8\u3002'),
      React.createElement('div', { className: 'dpi-loop-nodes' },
        loopElements
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
      titleCn: '\u62fc\u5f71\u89e3\u8c2c',
      video: 'interaction-drag.mp4',
      poster: 'gameplay-drag.jpg',
      isCore: false,
      info: [
        { label: 'INPUT', text: '\u62d6\u62fd\u62fc\u63a5\u76ae\u5f71\u7ec4\u4ef6' },
        { label: 'RESPONSE', text: '\u8fd8\u539f\u76ae\u5f71\u7ed3\u6784' },
        { label: 'EXPERIENCE', text: '\u901a\u8fc7\u64cd\u4f5c\u611f\u53d7\u4f20\u7edf\u5de5\u827a' }
      ]
    },
    {
      num: '02',
      titleEn: 'MIRROR REVEAL',
      titleCn: '\u955c\u9762\u8fa8\u5996',
      video: 'interaction-mirror.mp4',
      poster: 'gameplay-mirror-after.jpg',
      isCore: true,
      info: [
        { label: 'INPUT', text: '\u79fb\u52a8\u955c\u9762\u89c2\u5bdf' },
        { label: 'RESPONSE', text: '\u5149\u5f71\u63ed\u793a\u9690\u85cf\u8eab\u4efd' },
        { label: 'EXPERIENCE', text: '\u4f53\u9a8c\u771f\u5047\u8f6c\u6362\u7684\u89c6\u89c9\u51b2\u51fb' }
      ]
    },
    {
      num: '03',
      titleEn: 'RHYTHM COMBAT',
      titleCn: '\u8282\u594f\u6218\u6597',
      video: 'interaction-combat.mp4',
      poster: 'gameplay-combat.jpg',
      isCore: false,
      info: [
        { label: 'INPUT', text: '\u8282\u594f\u70b9\u51fb\u63a7\u5236' },
        { label: 'RESPONSE', text: '\u6218\u6597\u52a8\u4f5c\u53cd\u9988' },
        { label: 'EXPERIENCE', text: '\u5c06\u4f20\u7edf\u9523\u9f13\u8282\u594f\u8f6c\u5316\u4e3a\u6e38\u620f\u73a9\u6cd5' }
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
      React.createElement('div', { className: 'iev-mod-info' }, infoElements)
    );
  }

  return React.createElement('section', {
    ref: ref,
    className: 'iev-section snap-slide' + viewClass
  },
    /* Background grid */
    React.createElement('div', { className: 'iev-bg-grid' }),

    /* Chapter navigation */
    React.createElement('div', { className: 'case-nav iev-anim iev-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '06'),
      React.createElement('div', { className: 'case-nav-en' }, 'INTERACTION EXPERIENCE DESIGN'),
      React.createElement('div', { className: 'case-nav-cn' }, '\u4ea4\u4e92\u4f53\u9a8c\u8bbe\u8ba1')
    ),

    /* Header */
    React.createElement('div', { className: 'iev-header' },
      React.createElement('div', { className: 'iev-main-title iev-anim iev-anim-2' }, 'LIGHT & SHADOW INTERACTION'),
      React.createElement('div', { className: 'iev-main-cn iev-anim iev-anim-2' }, '\u5149\u5f71\u4ea4\u4e92\u4f53\u9a8c'),
      React.createElement('p', { className: 'iev-desc iev-anim iev-anim-3' },
        '\u5c06\u6cf0\u5c71\u76ae\u5f71\u7684\u5149\u5f71\u6280\u827a\u8f6c\u5316\u4e3a\u53ef\u64cd\u4f5c\u7684\u6e38\u620f\u4f53\u9a8c\u3002'
      )
    ),

    /* Video modules */
    React.createElement('div', { className: 'iev-modules' },
      React.createElement('div', { className: 'iev-top-row' },
        modules.map(function(mod, i) { return renderModule(mod, i); })
      )
    ),

    /* Bottom summary */
    React.createElement('div', { className: 'iev-summary iev-anim iev-anim-6' },
      React.createElement('div', { className: 'iev-flow' },
        React.createElement('span', { className: 'iev-flow-step' }, 'TRADITIONAL CRAFT'),
        React.createElement('span', { className: 'iev-flow-arrow' }, '\u2193'),
        React.createElement('span', { className: 'iev-flow-step accent' }, 'INTERACTIVE MECHANISM'),
        React.createElement('span', { className: 'iev-flow-arrow' }, '\u2193'),
        React.createElement('span', { className: 'iev-flow-step' }, 'PLAYER EXPERIENCE')
      ),
      React.createElement('p', { className: 'iev-flow-cn' },
        '\u4f20\u7edf\u76ae\u5f71\u6280\u827a\u901a\u8fc7\u6570\u5b57\u4ea4\u4e92\u8f6c\u5316\u4e3a\u73b0\u4ee3\u6e38\u620f\u4f53\u9a8c\u3002'
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

  var highlights = [
    {
      num: '01',
      titleEn: 'CULTURAL TRANSLATION',
      titleCn: '\u975e\u9057\u6587\u5316\u6570\u5b57\u5316\u8f6c\u8bd1',
      desc: '\u5c06\u6cf0\u5c71\u76ae\u5f71\u4f20\u7edf\u6280\u827a\u8f6c\u5316\u4e3a\u73b0\u4ee3\u4e92\u52a8\u4f53\u9a8c\u3002'
    },
    {
      num: '02',
      titleEn: 'INTERACTIVE MECHANISM',
      titleCn: '\u5149\u5f71\u4ea4\u4e92\u673a\u5236\u8bbe\u8ba1',
      desc: '\u901a\u8fc7\u76ae\u5f71\u3001\u955c\u9762\u3001\u8282\u594f\u73a9\u6cd5\u5efa\u7acb\u6e38\u620f\u4f53\u9a8c\u3002'
    },
    {
      num: '03',
      titleEn: 'PLAYABLE PROTOTYPE',
      titleCn: '\u5b8c\u6574\u53ef\u8fd0\u884c Demo',
      desc: '\u5b9e\u73b0\u4ece\u6982\u5ff5\u8bbe\u8ba1\u5230\u5b9e\u9645\u6e38\u620f\u4f53\u9a8c\u7684\u5b8c\u6574\u843d\u5730\u3002'
    }
  ];

  return React.createElement('section', {
    ref: ref,
    className: 'pe-section snap-slide' + viewClass
  },
    /* Background grid */
    React.createElement('div', { className: 'pe-bg-grid' }),

    /* Chapter navigation */
    React.createElement('div', { className: 'case-nav pe-anim pe-anim-1' },
      React.createElement('div', { className: 'case-nav-num' }, '07'),
      React.createElement('div', { className: 'case-nav-en' }, 'PLAYABLE EXPERIENCE'),
      React.createElement('div', { className: 'case-nav-cn' }, '\u8bd5\u73a9\u4f53\u9a8c')
    ),

    /* Header */
    React.createElement('div', { className: 'pe-header' },
      React.createElement('div', { className: 'pe-main-title pe-anim pe-anim-2' }, 'INTERACTIVE DEMO'),
      React.createElement('div', { className: 'pe-main-cn pe-anim pe-anim-2' }, '\u5b8c\u6574\u6e38\u620f\u4f53\u9a8c'),
      React.createElement('p', { className: 'pe-subtitle pe-anim pe-anim-3' },
        'Experience the complete journey of'
      ),
      React.createElement('p', { className: 'pe-subtitle pe-anim pe-anim-3' },
        'Shadow Puppet Demon Hunting'
      ),
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
            React.createElement(PortfolioImage, { src: 'qr-demo.png', alt: 'QR Code' })
          ),
          React.createElement('div', { className: 'pe-demo-type' }, 'H5 Interactive Game'),
          React.createElement('div', { className: 'pe-demo-cn' }, '\u626b\u7801\u4f53\u9a8c\u5b8c\u6574\u6e38\u620f')
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
    ),

    /* Bottom highlights */
    React.createElement('div', { className: 'pe-highlights pe-anim pe-anim-6' },
      React.createElement('div', { className: 'pe-highlights-title' }, 'DESIGN HIGHLIGHTS'),
      React.createElement('div', { className: 'pe-highlights-grid' },
        highlights.map(function(h, i) {
          return React.createElement('div', { key: h.num, className: 'pe-highlight-card' },
            React.createElement('div', { className: 'pe-hl-num' }, h.num),
            React.createElement('div', { className: 'pe-hl-title' }, h.titleEn),
            React.createElement('div', { className: 'pe-hl-cn' }, h.titleCn),
            React.createElement('p', { className: 'pe-hl-desc' }, h.desc)
          );
        })
      )
    )
  );
}

window.PortfolioChapters.gameDesign = function() {
  return [
    React.createElement(CaseStudyOverview, { key: 'cs-overview' }),
    React.createElement(CaseStudyBackground, { key: 'cs-background' }),
    React.createElement(CaseStudyConcept, { key: 'cs-concept' }),
    React.createElement(CaseStudyStory, { key: 'cs-story' }),
    React.createElement(CaseStudyGameplay, { key: 'cs-gameplay' }),
    React.createElement(CaseStudyInteraction, { key: 'cs-interaction' }),
    React.createElement(CaseStudyPlayable, { key: 'cs-playable' })
  ];
};
