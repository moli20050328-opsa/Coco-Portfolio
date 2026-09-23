/* ---------- Visual Design · Packaging editorial case ---------- */
function usePackagingMotion(rootRef) {
  useEffect(function() {
    var root = rootRef.current;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || reduceMotion || !('IntersectionObserver' in window)) return;

    root.classList.add('pkg-motion-ready');
    var revealNodes = Array.prototype.slice.call(root.querySelectorAll('.pkg-reveal, .pkg-scroll-reveal'));
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealNodes.forEach(function(node) { revealObserver.observe(node); });

    var breatheNodes = Array.prototype.slice.call(root.querySelectorAll('.pkg-breathe-frame'));
    var breatheObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        entry.target.dataset.pkgVisible = entry.isIntersecting ? 'true' : 'false';
        entry.target.classList.toggle('is-live', entry.isIntersecting && !document.hidden);
      });
    }, { threshold: 0.32, rootMargin: '-8% 0px -8% 0px' });
    breatheNodes.forEach(function(node) { breatheObserver.observe(node); });

    var sectionVisible = false;
    var sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        sectionVisible = entry.isIntersecting;
        root.classList.toggle('pkg-active', sectionVisible && !document.hidden);
      });
    }, { threshold: 0.04 });
    sectionObserver.observe(root);

    function syncVisibility() {
      root.classList.toggle('pkg-active', sectionVisible && !document.hidden);
      breatheNodes.forEach(function(node) {
        node.classList.toggle('is-live', node.dataset.pkgVisible === 'true' && !document.hidden);
      });
    }
    document.addEventListener('visibilitychange', syncVisibility);

    return function() {
      revealObserver.disconnect();
      breatheObserver.disconnect();
      sectionObserver.disconnect();
      document.removeEventListener('visibilitychange', syncVisibility);
      root.classList.remove('pkg-motion-ready', 'pkg-active');
      breatheNodes.forEach(function(node) {
        node.classList.remove('is-live');
        delete node.dataset.pkgVisible;
      });
    };
  }, []);
}

function usePackagingFlavor(rootRef, intervalMs) {
  var flavorState = useState(0);
  var flavor = flavorState[0];
  var setFlavor = flavorState[1];

  useEffect(function() {
    var root = rootRef.current;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || reduceMotion || !('IntersectionObserver' in window)) return;

    var timer = null;
    var visible = false;
    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }
    function sync() {
      stop();
      if (!visible || document.hidden) return;
      timer = window.setInterval(function() {
        setFlavor(function(current) { return current === 0 ? 1 : 0; });
      }, intervalMs);
    }
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        visible = entry.isIntersecting;
        sync();
      });
    }, { threshold: 0, rootMargin: '-18% 0px -18% 0px' });
    observer.observe(root);
    document.addEventListener('visibilitychange', sync);

    return function() {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [intervalMs]);

  return flavor;
}

function PackagingProjectVisual() {
  var result = useInView({ threshold: 0.08 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  usePackagingMotion(ref);
  var flavor = usePackagingFlavor(ref, 3400);
  var flavorClass = flavor === 1 ? ' pkg-flavor-pink' : ' pkg-flavor-green';

  return React.createElement('section', {
    ref: ref,
    id: 'packaging-project-visual',
    className: 'pkg-case pkg-case--visual snap-slide' + viewClass + flavorClass,
    'aria-labelledby': 'packaging-project-title'
  },
    React.createElement('div', { className: 'pkg-case__inner' },
      React.createElement('div', { className: 'pkg-case__topline pkg-anim' },
        React.createElement('span', null, '04 VISUAL DESIGN'),
        React.createElement('span', null, '01 PACKAGING DESIGN')
      ),
      React.createElement('div', { className: 'pkg-case__hero-head' },
        React.createElement('h2', { id: 'packaging-project-title', className: 'pkg-case__title pkg-anim pkg-anim-2' },
          '西湖龙井 × 霸王茶姬',
          React.createElement('span', { className: 'pkg-case__title-sub' }, '联名茶礼包装设计'),
          React.createElement('span', { className: 'pkg-case__title-en' }, 'PACKAGING DESIGN')
        ),
        React.createElement('div', null,
          React.createElement('p', { className: 'pkg-case__intro pkg-anim pkg-anim-3' },
            '以霸王茶姬标志性 C 形结构连接西湖龙井与九曲红梅，通过双口味色彩、东方纹样和包装延展建立统一的联名视觉。'
          ),
          React.createElement('ul', { className: 'pkg-case__keywords pkg-anim pkg-anim-4' },
            ['东方茶饮','双味系统','包装视觉'].map(function(item) {
              return React.createElement('li', { key: item }, item);
            })
          )
        )
      ),
      React.createElement('figure', { className: 'pkg-case__hero-grid pkg-case__figure pkg-reveal' },
        React.createElement('div', { className: 'pkg-case__matchcut' + (flavor === 1 ? ' is-pink' : '') },
          React.createElement('div', { className: 'pkg-case__matchcut-frame' + (flavor === 0 ? ' is-active' : ''), 'aria-hidden': flavor !== 0 },
            React.createElement(PortfolioImage, {
              src: 'packaging-assets/pkg-viz-green-bag.png',
              alt: '绿色龙井乌龙包装数字效果图',
              className: 'pkg-reveal-image', width: 861, height: 861,
              loading: 'eager', fetchpriority: 'high', decoding: 'async'
            })
          ),
          React.createElement('div', { className: 'pkg-case__matchcut-frame' + (flavor === 1 ? ' is-active' : ''), 'aria-hidden': flavor !== 1 },
            React.createElement(PortfolioImage, {
              src: 'packaging-assets/pkg-viz-pink-bag.png',
              alt: '粉色九曲红梅包装数字效果图',
              className: 'pkg-reveal-image', width: 861, height: 861,
              loading: 'eager', decoding: 'async'
            })
          )
        ),
        React.createElement('figcaption', { className: 'pkg-case__caption pkg-case__matchcut-caption' },
          React.createElement('span', null, flavor === 0 ? '龙井乌龙' : '九曲红梅'),
          React.createElement('span', null, 'DIGITAL PACKAGING VISUALIZATION')
        )
      )
    )
  );
}

function PackagingVisualSystem() {
  var result = useInView({ threshold: 0.06 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  usePackagingMotion(ref);
  var flavor = usePackagingFlavor(ref, 3800);
  var flavorClass = flavor === 1 ? ' pkg-flavor-pink' : ' pkg-flavor-green';

  return React.createElement('section', {
    ref: ref,
    id: 'packaging-visual-system',
    className: 'pkg-case pkg-case--system snap-slide' + viewClass + flavorClass,
    'aria-labelledby': 'packaging-system-title'
  },
    React.createElement('div', { className: 'pkg-case__inner' },
      React.createElement('header', { className: 'pkg-case__section-head' },
        React.createElement('h2', { id: 'packaging-system-title', className: 'pkg-case__section-title pkg-anim' }, '双味视觉系统'),
        React.createElement('span', { className: 'pkg-case__section-en pkg-anim pkg-anim-2' }, 'VISUAL SYSTEM'),
        React.createElement('p', { className: 'pkg-case__section-note pkg-anim pkg-anim-3' },
          '从同一 C 形结构出发，以茶叶与红梅建立两种口味的视觉差异，并通过字形、纹样与色彩保持系列统一。'
        )
      ),
      React.createElement('div', { className: 'pkg-case__system-grid' },
        React.createElement('div', { className: 'pkg-case__c-stage pkg-reveal pkg-reveal--vertical' + (flavor === 1 ? ' is-pink' : '') },
          React.createElement('div', { className: 'pkg-case__c-item pkg-case__c-item--green' + (flavor === 0 ? ' is-active' : ''), 'aria-hidden': flavor !== 0 },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-c-green.png', alt: '绿色茶叶花卉 C 形主视觉', className: 'pkg-reveal-image', width: 639, height: 657, loading: 'lazy', decoding: 'async' }),
            React.createElement('div', { className: 'pkg-case__asset-label' },
              React.createElement('span', null, '龙井乌龙'),
              React.createElement('span', null, 'TEA LEAF')
            )
          ),
          React.createElement('div', { className: 'pkg-case__c-item pkg-case__c-item--pink' + (flavor === 1 ? ' is-active' : ''), 'aria-hidden': flavor !== 1 },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-c-pink.png', alt: '粉色花卉 C 形主视觉', className: 'pkg-reveal-image', width: 415, height: 426, loading: 'lazy', decoding: 'async' }),
            React.createElement('div', { className: 'pkg-case__asset-label' },
              React.createElement('span', null, '九曲红梅'),
              React.createElement('span', null, 'RED PLUM')
            )
          )
        ),
        React.createElement('div', { className: 'pkg-case__system-side' },
          React.createElement('figure', { className: 'pkg-case__figure pkg-case__wordmark pkg-reveal', style: { '--pkg-delay': '80ms' } },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-wordmark.png', alt: '龙井闻茶中文定制字标', className: 'pkg-reveal-image', width: 490, height: 172, loading: 'lazy', decoding: 'async' }),
            React.createElement('figcaption', { className: 'pkg-case__caption' },
              React.createElement('span', null, '龙井闻茶'),
              React.createElement('span', null, 'CUSTOM WORDMARK')
            )
          ),
          React.createElement('div', { className: 'pkg-case__illustrations' },
            React.createElement('figure', { className: 'pkg-case__figure pkg-reveal', style: { '--pkg-delay': '120ms' } },
              React.createElement('div', { className: 'pkg-case__image' },
                React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-illustration-green.png', alt: '龙井茶叶水彩图形', className: 'pkg-reveal-image', width: 854, height: 736, loading: 'lazy', decoding: 'async' })
              ),
              React.createElement('figcaption', { className: 'pkg-case__caption' }, React.createElement('span', null, '茶叶水彩'))
            ),
            React.createElement('figure', { className: 'pkg-case__figure pkg-reveal', style: { '--pkg-delay': '220ms' } },
              React.createElement('div', { className: 'pkg-case__image pkg-case__image--plum' },
                React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-illustration-pink.png', alt: '九曲红梅水彩图形', className: 'pkg-reveal-image', width: 718, height: 706, loading: 'lazy', decoding: 'async' })
              ),
              React.createElement('figcaption', { className: 'pkg-case__caption' }, React.createElement('span', null, '红梅水彩'))
            )
          ),
          React.createElement('div', { className: 'pkg-case__patterns' },
            React.createElement('figure', { className: 'pkg-case__pattern pkg-reveal', style: { '--pkg-delay': '80ms' } },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-pattern-green.png', alt: '绿色龙井纹样边框', className: 'pkg-reveal-image', width: 784, height: 495, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figure', { className: 'pkg-case__pattern pkg-case__pattern--secondary pkg-reveal', style: { '--pkg-delay': '180ms' } },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-pattern-pink.png', alt: '粉色红梅纹样边框', className: 'pkg-reveal-image', width: 784, height: 495, loading: 'lazy', decoding: 'async' })
            )
          )
        )
      )
    )
  );
}

function PackagingApplicationLegacy() {
  var result = useInView({ threshold: 0.04 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  usePackagingMotion(ref);

  var dielineSizes = {
    'packaging-assets/pkg-dieline-green.png': [1384,1690],
    'packaging-assets/pkg-dieline-pink.jpg': [729,936],
    'packaging-assets/pkg-sides-green.png': [1588,2172],
    'packaging-assets/pkg-sides-pink.png': [1588,2172]
  };

  function dielineFigure(src, alt, cn, en, delay) {
    var size = dielineSizes[src];
    return React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--center', style: { '--pkg-delay': delay || '0ms' } },
      React.createElement('div', { className: 'pkg-case__dieline' },
        React.createElement(PortfolioImage, { src: src, alt: alt, className: 'pkg-reveal-image', width: size[0], height: size[1], loading: 'lazy', decoding: 'async' })
      ),
      React.createElement('figcaption', { className: 'pkg-case__caption' },
        React.createElement('span', null, cn),
        React.createElement('span', null, en)
      )
    );
  }

  return React.createElement('section', {
    ref: ref,
    id: 'packaging-application',
    className: 'pkg-case pkg-case--application snap-slide' + viewClass,
    'aria-labelledby': 'packaging-application-title'
  },
    React.createElement('div', { className: 'pkg-case__inner' },
      React.createElement('header', { className: 'pkg-case__section-head' },
        React.createElement('h2', { id: 'packaging-application-title', className: 'pkg-case__section-title pkg-anim' }, '包装视觉展开'),
        React.createElement('span', { className: 'pkg-case__section-en pkg-anim pkg-anim-2' }, 'PACKAGING APPLICATION'),
        React.createElement('p', { className: 'pkg-case__section-note pkg-anim pkg-anim-3' },
          '将核心视觉延展至茶盒、手提袋与杯装包装，并通过包装展开图和数字效果验证不同载体上的统一性。'
        )
      ),
      React.createElement('div', { className: 'pkg-case__sequence pkg-anim pkg-anim-2' },
        React.createElement('span', null, React.createElement('small', null, '01'), '核心视觉'),
        React.createElement('span', null, React.createElement('small', null, '02'), '包装展开'),
        React.createElement('span', null, React.createElement('small', null, '03'), '数字效果展示')
      ),
      React.createElement('div', { className: 'pkg-case__application-lead' },
        React.createElement('div', { className: 'pkg-case__application-copy pkg-scroll-reveal' },
          React.createElement('h3', null, '核心视觉与包装展开'),
          React.createElement('span', null, 'CORE VISUAL & DIELINE'),
          React.createElement('p', null,
            '以正面信息区为核心，将 C 形图形、口味插画、字标和连续纹样延展到包装不同面。展开图为数字设计展示，不代表已生产实物。'
          )
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'pkg-case__core-spread' },
            React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--center' },
              React.createElement('div', { className: 'pkg-case__core-front' },
                React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-core-front-green.png', alt: '龙井闻茶绿色包装正面核心视觉', className: 'pkg-reveal-image', width: 604, height: 801, loading: 'lazy', decoding: 'async' })
              ),
              React.createElement('figcaption', { className: 'pkg-case__caption' },
                React.createElement('span', null, '包装正面核心视觉'),
                React.createElement('span', null, 'FRONT VISUAL')
              )
            ),
            React.createElement('div', { className: 'pkg-case__dielines' },
              dielineFigure('packaging-assets/pkg-dieline-green.png', '绿色包装盒与手提袋展开图', '龙井乌龙包装展开', 'GREEN VARIANT', '100ms'),
              dielineFigure('packaging-assets/pkg-dieline-pink.jpg', '粉色包装盒与手提袋展开图', '九曲红梅包装展开', 'PINK VARIANT', '200ms')
            )
          ),
          React.createElement('div', { className: 'pkg-case__detail-strip' },
            dielineFigure('packaging-assets/pkg-sides-green.png', '绿色包装不同面平面设计', '绿色包装不同面', 'PANEL DETAILS', '0ms'),
            dielineFigure('packaging-assets/pkg-sides-pink.png', '粉色包装不同面平面设计', '粉色包装不同面', 'PANEL DETAILS', '120ms')
          )
        )
      ),
      React.createElement('div', { className: 'pkg-case__viz-block' },
        React.createElement('div', { className: 'pkg-case__viz-head pkg-scroll-reveal' },
          React.createElement('h3', null, '数字包装效果'),
          React.createElement('span', null, 'PACKAGING VISUALIZATION'),
          React.createElement('p', null, '以数字 Mockup 检查包装图形在茶盒、杯装与手提袋上的整体视觉关系。')
        ),
        React.createElement('div', { className: 'pkg-case__viz-grid' },
          React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--vertical' },
            React.createElement('div', { className: 'pkg-case__viz pkg-case__viz--pink pkg-breathe-frame' },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-pink-scene.png', alt: '九曲红梅茶盒数字包装效果图', className: 'pkg-reveal-image pkg-breathe', width: 646, height: 861, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figcaption', { className: 'pkg-case__caption' },
              React.createElement('span', null, '九曲红梅茶盒'),
              React.createElement('span', null, 'DIGITAL MOCKUP')
            )
          ),
          React.createElement('div', { className: 'pkg-case__viz-stack' },
            React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--vertical', style: { '--pkg-delay': '110ms' } },
              React.createElement('div', { className: 'pkg-case__viz pkg-case__viz--green' },
                React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-green-cup.png', alt: '龙井乌龙杯装数字包装效果图', className: 'pkg-reveal-image', width: 646, height: 861, loading: 'lazy', decoding: 'async' })
              ),
              React.createElement('figcaption', { className: 'pkg-case__caption' },
                React.createElement('span', null, '龙井乌龙杯装'),
                React.createElement('span', null, 'DIGITAL MOCKUP')
              )
            ),
            React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--vertical', style: { '--pkg-delay': '210ms' } },
              React.createElement('div', { className: 'pkg-case__viz pkg-case__viz--green' },
                React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-green-box.png', alt: '龙井乌龙茶盒数字包装效果图', className: 'pkg-reveal-image', width: 646, height: 789, loading: 'lazy', decoding: 'async' })
              ),
              React.createElement('figcaption', { className: 'pkg-case__caption' },
                React.createElement('span', null, '龙井乌龙茶盒'),
                React.createElement('span', null, 'DIGITAL MOCKUP')
              )
            )
          )
        )
      ),
      React.createElement('div', { className: 'pkg-case__final-stage' },
        React.createElement('div', { className: 'pkg-case__final-inner' },
          React.createElement('header', { className: 'pkg-case__final-head pkg-scroll-reveal' },
            React.createElement('span', { className: 'pkg-case__final-eyebrow' }, 'FINAL VISUALS'),
            React.createElement('h3', null, '双味包装视觉'),
            React.createElement('p', { className: 'pkg-case__final-lede' }, '以两组数字包装组合视觉完成项目收束，并衔接后续 Visual Design 章节。')
          ),
          React.createElement('div', { className: 'pkg-case__final-duo' },
            React.createElement('figure', { className: 'pkg-reveal pkg-reveal--vertical' },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-hero-green.png', alt: '龙井乌龙茶盒手提袋与杯装数字包装组合', className: 'pkg-reveal-image', width: 862, height: 575, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figure', { className: 'pkg-reveal pkg-reveal--vertical', style: { '--pkg-delay': '130ms' } },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-hero-pink.png', alt: '九曲红梅茶盒手提袋与杯装数字包装组合', className: 'pkg-reveal-image', width: 426, height: 426, loading: 'lazy', decoding: 'async' })
            )
          ),
          React.createElement('div', { className: 'pkg-case__closing' },
            React.createElement('span', null, '西湖龙井 × 霸王茶姬'),
            React.createElement('span', null, 'DIGITAL PACKAGING VISUALIZATION')
          )
        )
      )
    )
  );
}

function PackagingApplication() {
  var result = useInView({ threshold: 0.04 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  usePackagingMotion(ref);
  var flavor = usePackagingFlavor(ref, 4200);
  var flavorClass = flavor === 1 ? ' is-pink' : ' is-green';

  function dielinePair(index, label, ratio, width, height, delay) {
    return React.createElement('figure', {
      className: 'pkg-case__dieline-pair pkg-case__dieline-pair--' + index + flavorClass + ' pkg-scroll-reveal',
      style: { '--pair-ratio': ratio, '--pkg-delay': delay }
    },
      React.createElement('div', { className: 'pkg-case__dieline-pair-stage' },
        React.createElement('div', { className: 'pkg-case__dieline-pair-layer' + (flavor === 0 ? ' is-active' : ''), 'aria-hidden': flavor !== 0 },
          React.createElement(PortfolioImage, {
            src: 'packaging-assets/pkg-dieline-' + index + '-green.png',
            alt: flavor === 0 ? '龙井乌龙绿色包装刀版 ' + index : '',
            width: width,
            height: height,
            loading: 'lazy',
            decoding: 'async'
          })
        ),
        React.createElement('div', { className: 'pkg-case__dieline-pair-layer' + (flavor === 1 ? ' is-active' : ''), 'aria-hidden': flavor !== 1 },
          React.createElement(PortfolioImage, {
            src: 'packaging-assets/pkg-dieline-' + index + '-pink.png',
            alt: flavor === 1 ? '九曲红梅粉色包装刀版 ' + index : '',
            width: width,
            height: height,
            loading: 'lazy',
            decoding: 'async'
          })
        )
      ),
      React.createElement('figcaption', { className: 'pkg-case__dieline-pair-caption' },
        React.createElement('b', null, index),
        React.createElement('span', null, label),
        React.createElement('span', { 'aria-live': 'polite' }, flavor === 0 ? 'LONGJING / GREEN' : 'JIUQU HONGMEI / PINK')
      )
    );
  }

  return React.createElement('section', {
    ref: ref,
    id: 'packaging-application',
    className: 'pkg-case pkg-case--application snap-slide' + viewClass,
    'aria-labelledby': 'packaging-application-title'
  },
    React.createElement('div', { className: 'pkg-case__inner' },
      React.createElement('header', { className: 'pkg-case__section-head' },
        React.createElement('h2', { id: 'packaging-application-title', className: 'pkg-case__section-title pkg-anim' }, '包装视觉设计'),
        React.createElement('span', { className: 'pkg-case__section-en pkg-anim pkg-anim-2' }, 'PACKAGING DESIGN'),
        React.createElement('p', { className: 'pkg-case__section-note pkg-anim pkg-anim-3' },
          '将 C 形主视觉、植物纹样与字标组织进包装正面和展开结构，形成统一的双口味包装系统。'
        )
      ),
      React.createElement('div', { className: 'pkg-case__section-block' },
        React.createElement('div', { className: 'pkg-case__subhead pkg-scroll-reveal' },
          React.createElement('h3', null, '双味完整包装'),
          React.createElement('span', null, 'PACKAGING FAMILY'),
          React.createElement('p', null, '以龙井绿与红梅粉区分口味，同时保持包装信息、字标和主视觉结构一致。')
        ),
        React.createElement('div', { className: 'pkg-case__package-family' },
          React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--vertical' },
            React.createElement('div', { className: 'pkg-case__package-visual pkg-case__package-visual--primary' },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-green-box.png', alt: '龙井乌龙绿色茶盒完整数字包装效果', className: 'pkg-reveal-image', width: 646, height: 789, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figcaption', { className: 'pkg-case__caption' },
              React.createElement('span', null, '龙井乌龙'),
              React.createElement('span', null, 'DIGITAL MOCKUP')
            )
          ),
          React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--vertical', style: { '--pkg-delay': '120ms' } },
            React.createElement('div', { className: 'pkg-case__package-visual pkg-case__package-visual--secondary' },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-pink-box.png', alt: '九曲红梅粉色茶盒完整数字包装效果', className: 'pkg-reveal-image', width: 861, height: 861, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figcaption', { className: 'pkg-case__caption' },
              React.createElement('span', null, '九曲红梅'),
              React.createElement('span', null, 'DIGITAL MOCKUP')
            )
          )
        )
      ),

      React.createElement('div', { className: 'pkg-case__section-block' },
        React.createElement('div', { className: 'pkg-case__subhead pkg-scroll-reveal' },
          React.createElement('h3', null, '双口味包装展开'),
          React.createElement('span', null, 'DIELINE MATCH CUT'),
          React.createElement('p', null, '四组对应刀版使用同一展示框与视觉中心；结构保持固定，仅通过颜色与图形内容的交叉淡化呈现双口味切换。')
        ),
        React.createElement('div', { className: 'pkg-case__dieline-matchcut' },
          React.createElement('div', { className: 'pkg-case__dieline-sequence pkg-scroll-reveal', 'aria-label': '龙井绿四组刀版匹配切换至红梅粉四组刀版' },
            React.createElement('div', { className: 'pkg-case__dieline-sequence-group' },
              React.createElement('span', null, React.createElement('b', null, 'GREEN 01'), React.createElement('small', null, 'LONGJING')),
              React.createElement('span', null, React.createElement('b', null, 'GREEN 02'), React.createElement('small', null, 'LONGJING')),
              React.createElement('span', null, React.createElement('b', null, 'GREEN 03'), React.createElement('small', null, 'LONGJING')),
              React.createElement('span', null, React.createElement('b', null, 'GREEN 04'), React.createElement('small', null, 'LONGJING'))
            ),
            React.createElement('em', null, 'MATCH CUT'),
            React.createElement('div', { className: 'pkg-case__dieline-sequence-group is-pink' },
              React.createElement('span', null, React.createElement('b', null, 'PINK 01'), React.createElement('small', null, 'JIUQU HONGMEI')),
              React.createElement('span', null, React.createElement('b', null, 'PINK 02'), React.createElement('small', null, 'JIUQU HONGMEI')),
              React.createElement('span', null, React.createElement('b', null, 'PINK 03'), React.createElement('small', null, 'JIUQU HONGMEI')),
              React.createElement('span', null, React.createElement('b', null, 'PINK 04'), React.createElement('small', null, 'JIUQU HONGMEI'))
            )
          ),
          React.createElement('div', { className: 'pkg-case__dieline-pairs' },
            dielinePair('01', '折叠盒展开', '1360 / 1120', 1360, 1120, '0ms'),
            dielinePair('02', '长幅包装展开', '1360 / 620', 1360, 620, '90ms'),
            dielinePair('03', '双面包装展开', '960 / 1440', 960, 1440, '180ms'),
            dielinePair('04', '正面核心展开', '1480 / 980', 1480, 980, '270ms')
          )
        )
      )
    )
  );
}

function PackagingFinalVisuals() {
  var result = useInView({ threshold: 0.04 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  usePackagingMotion(ref);

  return React.createElement('section', {
    ref: ref,
    id: 'packaging-final-visuals',
    className: 'pkg-case pkg-case--final snap-slide' + viewClass,
    'aria-labelledby': 'packaging-final-title'
  },
    React.createElement('div', { className: 'pkg-case__inner' },
      React.createElement('header', { className: 'pkg-case__section-head' },
        React.createElement('h2', { id: 'packaging-final-title', className: 'pkg-case__section-title pkg-anim' }, '最终视觉展示'),
        React.createElement('span', { className: 'pkg-case__section-en pkg-anim pkg-anim-2' }, 'FINAL VISUALS'),
        React.createElement('p', { className: 'pkg-case__section-note pkg-anim pkg-anim-3' },
          '以数字 Mockup 呈现茶盒、杯装与手提袋之间的系列关系，集中展示最终视觉完成度。'
        )
      ),
      React.createElement('div', { className: 'pkg-case__final-gallery' },
        React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--vertical' },
          React.createElement('div', { className: 'pkg-case__final-visual pkg-case__final-visual--primary pkg-breathe-frame' },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-pink-scene.png', alt: '九曲红梅茶盒场景数字包装效果', className: 'pkg-reveal-image pkg-breathe', width: 646, height: 861, loading: 'lazy', decoding: 'async' })
          ),
          React.createElement('figcaption', { className: 'pkg-case__caption' },
            React.createElement('span', null, '九曲红梅茶盒'),
            React.createElement('span', null, 'DIGITAL MOCKUP')
          )
        ),
        React.createElement('figure', { className: 'pkg-case__figure pkg-reveal pkg-reveal--vertical', style: { '--pkg-delay': '120ms' } },
          React.createElement('div', { className: 'pkg-case__final-visual pkg-case__final-visual--secondary' },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-green-cup.png', alt: '龙井乌龙杯装数字包装效果', className: 'pkg-reveal-image', width: 646, height: 861, loading: 'lazy', decoding: 'async' })
          ),
          React.createElement('figcaption', { className: 'pkg-case__caption' },
            React.createElement('span', null, '龙井乌龙杯装'),
            React.createElement('span', null, 'DIGITAL MOCKUP')
          )
        )
      ),
      React.createElement('div', { className: 'pkg-case__final-stage' },
        React.createElement('div', { className: 'pkg-case__final-inner' },
          React.createElement('header', { className: 'pkg-case__final-head pkg-scroll-reveal' },
            React.createElement('span', { className: 'pkg-case__final-eyebrow' }, 'FINAL VISUALS'),
            React.createElement('h3', null, '双味包装视觉'),
            React.createElement('p', { className: 'pkg-case__final-lede' }, '以绿色与粉色两组数字包装组合完成项目收束。')
          ),
          React.createElement('div', { className: 'pkg-case__final-duo' },
            React.createElement('figure', { className: 'pkg-reveal pkg-reveal--vertical' },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-hero-green.png', alt: '龙井乌龙茶盒手提袋与杯装数字包装组合', className: 'pkg-reveal-image', width: 862, height: 575, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figure', { className: 'pkg-reveal pkg-reveal--vertical', style: { '--pkg-delay': '120ms' } },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-hero-pink.png', alt: '九曲红梅茶盒手提袋与杯装数字包装组合', className: 'pkg-reveal-image', width: 426, height: 426, loading: 'lazy', decoding: 'async' })
            )
          ),
          React.createElement('div', { className: 'pkg-case__closing' },
            React.createElement('span', null, '西湖龙井 × 霸王茶姬'),
            React.createElement('span', null, 'DIGITAL PACKAGING VISUALIZATION')
          )
        )
      )
    )
  );
}

/* ---------- Visual Design · Packaging v2 · Editorial Motion ---------- */
function usePackagingV2Motion(rootRef) {
  useLayoutEffect(function() {
    var root = rootRef.current;
    if (!root) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('pkg2-motion-ready');
    var nodes = Array.prototype.slice.call(root.querySelectorAll('.pkg2-reveal'));
    var maskNodes = Array.prototype.slice.call(root.querySelectorAll('.pkg2-mask-left, .pkg2-mask-right, .pkg2-mask-down'));
    var motionNodes = nodes.concat(maskNodes);
    if (reduced || !('IntersectionObserver' in window)) {
      motionNodes.forEach(function(node) { node.classList.add('is-visible'); });
      return function() { root.classList.remove('pkg2-motion-ready'); };
    }
    var maskGroups = new Map();
    maskNodes.forEach(function(node) {
      var sentinel = node.parentElement || node;
      var group = maskGroups.get(sentinel) || [];
      group.push(node);
      maskGroups.set(sentinel, group);
    });
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.01) return;
        var groupedMasks = maskGroups.get(entry.target);
        if (groupedMasks) {
          groupedMasks.forEach(function(node) { node.classList.add('is-visible'); });
        } else {
          entry.target.classList.add('is-visible');
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach(function(node) { observer.observe(node); });
    maskGroups.forEach(function(group, sentinel) { observer.observe(sentinel); });

    var breathe = root.querySelector('.pkg2-hero-breathe');
    var breatheObserver = null;
    if (breathe) {
      breatheObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          breathe.classList.toggle('is-live', entry.isIntersecting && !document.hidden);
        });
      }, { threshold: 0.38 });
      breatheObserver.observe(breathe);
    }
    return function() {
      observer.disconnect();
      if (breatheObserver) breatheObserver.disconnect();
      root.classList.remove('pkg2-motion-ready');
      if (breathe) breathe.classList.remove('is-live');
    };
  }, []);
}

function usePackagingSingleSwitch(rootRef, delay) {
  var state = useState(false);
  var isPink = state[0];
  var setIsPink = state[1];
  useEffect(function() {
    var root = rootRef.current;
    if (!root) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;
    if (reduced || !('IntersectionObserver' in window)) {
      setIsPink(true);
      return;
    }
    var observer = new IntersectionObserver(function(entries) {
      if (!entries[0].isIntersecting) return;
      timer = window.setTimeout(function() { setIsPink(true); }, delay || 700);
      observer.disconnect();
    }, { threshold: 0.38, rootMargin: '0px 0px -8% 0px' });
    observer.observe(root);
    return function() {
      if (timer) window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay]);
  return isPink;
}

function PackagingProjectVisualV2() {
  var result = useInView({ threshold: 0.05 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-project-visual',
    className: 'pkg2-section pkg2-hero',
    'aria-labelledby': 'pkg2-project-title'
  },
    React.createElement('div', { className: 'pkg2-inner' },
      React.createElement('div', { className: 'pkg2-hero-topline pkg2-reveal' },
        React.createElement('span', { className: 'pkg2-meta' }, '04 VISUAL DESIGN'),
        React.createElement('span', { className: 'pkg2-meta' }, '01 PACKAGING DESIGN')
      ),
      React.createElement('div', { className: 'pkg2-hero-grid' },
        React.createElement('div', { className: 'pkg2-hero-copy' },
          React.createElement('span', { className: 'pkg2-kicker pkg2-reveal' }, 'PROJECT VISUAL'),
          React.createElement('h2', { id: 'pkg2-project-title', className: 'pkg2-heading pkg2-reveal', style: { '--pkg2-delay': '70ms' } },
            '西湖龙井 ×', React.createElement('br'), '霸王茶姬',
            React.createElement('span', { className: 'pkg2-hero-subtitle' }, '联名茶礼包装设计')
          ),
          React.createElement('p', { className: 'pkg2-copy pkg2-reveal', style: { '--pkg2-delay': '140ms' } },
            '以霸王茶姬 C 形结构连接西湖龙井与九曲红梅，将植物意象、字标与纹样延展为统一的双口味包装视觉。'
          ),
          React.createElement('ul', { className: 'pkg2-keywords pkg2-reveal', style: { '--pkg2-delay': '210ms' } },
            ['东方茶饮', '双味系统', '包装视觉'].map(function(item) {
              return React.createElement('li', { key: item }, item);
            })
          )
        ),
        React.createElement('div', { className: 'pkg2-hero-art pkg2-hero-breathe' },
          React.createElement('figure', { className: 'pkg2-figure pkg2-hero-green pkg2-mask-left' },
            React.createElement(PortfolioImage, {
              src: 'packaging-assets/pkg-hero-green.png',
              alt: '龙井乌龙茶盒、手提袋与杯装数字包装组合视觉',
              width: 862, height: 575, loading: 'eager', fetchpriority: 'high', decoding: 'async'
            }),
            React.createElement('figcaption', { className: 'pkg2-caption' },
              React.createElement('span', null, '龙井乌龙'), React.createElement('span', null, 'DIGITAL PACKAGING VISUALIZATION')
            )
          ),
          React.createElement('figure', { className: 'pkg2-figure pkg2-hero-pink pkg2-mask-down', style: { '--pkg2-delay': '130ms' } },
            React.createElement(PortfolioImage, {
              src: 'packaging-assets/pkg-hero-pink.png',
              alt: '九曲红梅茶盒、手提袋与杯装数字包装组合视觉',
              width: 426, height: 426, loading: 'eager', decoding: 'async'
            })
          )
        )
      )
    )
  );
}

function PackagingVisualLanguageV2() {
  var result = useInView({ threshold: 0.04 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var isPink = usePackagingSingleSwitch(ref, 850);
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-visual-system',
    className: 'pkg2-section pkg2-language' + (isPink ? ' is-pink' : ''),
    'aria-labelledby': 'pkg2-language-title'
  },
    React.createElement('div', { className: 'pkg2-inner' },
      React.createElement('header', { className: 'pkg2-section-head pkg2-reveal' },
        React.createElement('div', null,
          React.createElement('span', { className: 'pkg2-kicker' }, '02 / DUAL VISUAL LANGUAGE'),
          React.createElement('h2', { id: 'pkg2-language-title', className: 'pkg2-heading' }, '双味视觉系统')
        ),
        React.createElement('p', { className: 'pkg2-copy' }, '同一 C 形轮廓承载两种植物意象；绿色龙井与粉色红梅负责口味识别，结构与东方视觉语言保持统一。')
      ),
      React.createElement('div', { className: 'pkg2-language-grid' },
        React.createElement('div', { className: 'pkg2-source-stack' },
          React.createElement('figure', { className: 'pkg2-figure pkg2-mask-down' },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-illustration-green.png', alt: '龙井茶叶水彩植物视觉', width: 854, height: 736, loading: 'lazy', decoding: 'async' }),
            React.createElement('figcaption', { className: 'pkg2-caption' }, React.createElement('span', null, '茶叶 / TEA LEAF'))
          ),
          React.createElement('figure', { className: 'pkg2-figure pkg2-mask-down', style: { '--pkg2-delay': '120ms' } },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-illustration-pink.png', alt: '九曲红梅水彩植物视觉', width: 718, height: 706, loading: 'lazy', decoding: 'async' }),
            React.createElement('figcaption', { className: 'pkg2-caption' }, React.createElement('span', null, '红梅 / RED PLUM'))
          )
        ),
        React.createElement('div', { className: 'pkg2-c-stage' + (isPink ? ' is-pink' : '') },
          React.createElement('figure', { className: 'pkg2-c-layer pkg2-c-layer--green' + (!isPink ? ' is-active' : ''), 'aria-hidden': isPink },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-c-green.png', alt: isPink ? '' : '绿色茶叶花卉 C 形包装主视觉', width: 639, height: 657, loading: 'lazy', decoding: 'async' })
          ),
          React.createElement('figure', { className: 'pkg2-c-layer pkg2-c-layer--pink' + (isPink ? ' is-active' : ''), 'aria-hidden': !isPink },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-c-pink.png', alt: isPink ? '粉色红梅 C 形包装主视觉' : '', width: 415, height: 426, loading: 'lazy', decoding: 'async' })
          ),
          React.createElement('div', { className: 'pkg2-c-label' },
            React.createElement('span', null, isPink ? '九曲红梅' : '龙井乌龙'),
            React.createElement('span', null, 'SAME FORM / DISTINCT FLAVOUR')
          )
        )
      )
    )
  );
}

function PackagingWordmarkPattern() {
  var result = useInView({ threshold: 0.04 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-wordmark-pattern',
    className: 'pkg2-section pkg2-wordpattern',
    'aria-labelledby': 'pkg2-wordpattern-title'
  },
    React.createElement('div', { className: 'pkg2-inner' },
      React.createElement('header', { className: 'pkg2-section-head pkg2-reveal' },
        React.createElement('div', null,
          React.createElement('span', { className: 'pkg2-kicker' }, '03 / WORDMARK & PATTERN'),
          React.createElement('h2', { id: 'pkg2-wordpattern-title', className: 'pkg2-heading' }, '字标与纹样')
        ),
        React.createElement('p', { className: 'pkg2-copy' }, '植物形态被抽象为连续纹样，中文定制字标承担主信息识别，共同构成包装正面与侧面的视觉节奏。')
      ),
      React.createElement('div', { className: 'pkg2-wordpattern-grid' },
        React.createElement('figure', { className: 'pkg2-figure pkg2-wordmark-visual pkg2-mask-left' },
          React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-wordmark.png', alt: '龙井闻茶中文定制字标', width: 490, height: 172, loading: 'lazy', decoding: 'async' }),
          React.createElement('figcaption', { className: 'pkg2-caption' }, React.createElement('span', null, '龙井闻茶'), React.createElement('span', null, 'CUSTOM WORDMARK'))
        ),
        React.createElement('div', { className: 'pkg2-pattern-stack' },
          React.createElement('figure', { className: 'pkg2-figure pkg2-mask-down', style: { '--pkg2-delay': '100ms' } },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-pattern-green.png', alt: '绿色龙井连续纹样', width: 784, height: 495, loading: 'lazy', decoding: 'async' })
          ),
          React.createElement('figure', { className: 'pkg2-figure pkg2-mask-down', style: { '--pkg2-delay': '220ms' } },
            React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-pattern-pink.png', alt: '粉色红梅连续纹样', width: 784, height: 495, loading: 'lazy', decoding: 'async' })
          )
        )
      )
    )
  );
}

function PackagingGreenDieline() {
  var result = useInView({ threshold: 0.03 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var items = [
    { id: '01', src: 'packaging-assets/pkg-dieline-green.png', width: 1384, height: 1690, alt: '绿色龙井乌龙包装盒与手提袋完整刀版展开', label: '包装盒与手提袋展开' },
    { id: '02', src: 'packaging-assets/pkg-dieline-03-green.png', width: 960, height: 1440, alt: '绿色龙井乌龙双面包装刀版展开', label: '双面包装展开' },
    { id: '03', src: 'packaging-assets/pkg-dieline-04-green.png', width: 1480, height: 980, alt: '绿色龙井乌龙横向正面刀版展开', label: '正面核心展开' }
  ];
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-green-dieline',
    className: 'pkg2-section pkg2-green-dieline',
    'aria-labelledby': 'pkg2-green-dieline-title'
  },
    React.createElement('div', { className: 'pkg2-inner' },
      React.createElement('header', { className: 'pkg2-section-head pkg2-reveal' },
        React.createElement('div', null,
          React.createElement('span', { className: 'pkg2-kicker' }, '04 / GREEN DIELINE'),
          React.createElement('h2', { id: 'pkg2-green-dieline-title', className: 'pkg2-heading' }, '绿色刀版展开')
        ),
        React.createElement('p', { className: 'pkg2-copy' }, '先完整呈现龙井乌龙包装结构。三种刀版按真实比例进入页面，不以源文件分辨率决定视觉大小。')
      ),
      React.createElement('div', { className: 'pkg2-dieline-grid' },
        items.map(function(item, index) {
          return React.createElement('figure', { key: item.id, className: 'pkg2-figure pkg2-dieline-item pkg2-dieline-item--' + item.id + ' pkg2-mask-down', style: { '--pkg2-delay': (index * 110) + 'ms' } },
            React.createElement(PortfolioImage, { src: item.src, alt: item.alt, width: item.width, height: item.height, loading: 'lazy', decoding: 'async' }),
            React.createElement('figcaption', { className: 'pkg2-dieline-label pkg2-caption' },
              React.createElement('span', null, item.id + ' / ' + item.label), React.createElement('span', null, 'LONGJING / GREEN')
            )
          );
        })
      )
    )
  );
}

function PackagingMatchStage(props) {
  var ref = useRef(null);
  var isPink = usePackagingSingleSwitch(ref, props.delay || 720);
  return React.createElement('article', { className: 'pkg2-match-row', 'data-match-source': props.sourceMap },
    React.createElement('div', { className: 'pkg2-match-copy' },
      React.createElement('span', { className: 'pkg2-index' }, props.index),
      React.createElement('h3', null, props.title),
      React.createElement('span', { className: 'pkg2-meta' }, props.meta)
    ),
    React.createElement('div', {
      ref: ref,
      className: 'pkg2-match-stage pkg2-match-stage--' + props.index + (isPink ? ' is-pink' : ''),
      'aria-label': props.title + '双口味固定舞台切换'
    },
      React.createElement('div', { className: 'pkg2-match-layer pkg2-match-layer--green', 'aria-hidden': isPink },
        React.createElement(PortfolioImage, { src: props.green.src, alt: isPink ? '' : props.green.alt, width: props.green.width, height: props.green.height, loading: 'lazy', decoding: 'async' })
      ),
      React.createElement('div', { className: 'pkg2-match-layer pkg2-match-layer--pink', 'aria-hidden': !isPink },
        React.createElement(PortfolioImage, { src: props.pink.src, alt: isPink ? props.pink.alt : '', width: props.pink.width, height: props.pink.height, loading: 'lazy', decoding: 'async' })
      )
    ),
    React.createElement('div', { className: 'pkg2-match-state pkg2-caption' },
      React.createElement('span', null, '龙井乌龙 / GREEN'), React.createElement('span', null, '九曲红梅 / PINK')
    )
  );
}

function PackagingDielineMatchCut() {
  var result = useInView({ threshold: 0.02 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var pairs = [
    {
      index: '01', title: '包装盒与手提袋展开', meta: 'LOCKED FORM / CROSSFADE', delay: 760,
      sourceMap: 'GREEN 01 ↔ PINK 01',
      green: { src: 'packaging-assets/pkg-dieline-green.png', alt: '龙井乌龙绿色包装盒与手提袋刀版', width: 1384, height: 1690 },
      pink: { src: 'packaging-assets/pkg-dieline-pink.jpg', alt: '九曲红梅粉色包装盒与手提袋刀版', width: 729, height: 936 }
    },
    {
      index: '02', title: '双面包装展开', meta: 'LOCKED FORM / CROSSFADE', delay: 780,
      sourceMap: 'GREEN 02 ↔ PINK 03',
      green: { src: 'packaging-assets/pkg-dieline-03-green.png', alt: '龙井乌龙绿色双面包装刀版', width: 960, height: 1440 },
      pink: { src: 'packaging-assets/pkg-dieline-03-pink.png', alt: '九曲红梅粉色双面包装刀版', width: 960, height: 1440 }
    },
    {
      index: '03', title: '正面核心展开', meta: '90° NORMALIZED / CROSSFADE', delay: 800,
      sourceMap: 'GREEN 03 ↔ PINK 02',
      green: { src: 'packaging-assets/pkg-dieline-04-green.png', alt: '龙井乌龙绿色横向正面刀版', width: 1480, height: 980 },
      pink: { src: 'packaging-assets/pkg-dieline-04-pink.png', alt: '九曲红梅粉色正面刀版，已旋转九十度归一化', width: 1480, height: 980 }
    }
  ];
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-application',
    className: 'pkg2-section pkg2-matchcut',
    'aria-labelledby': 'pkg2-matchcut-title'
  },
    React.createElement('div', { className: 'pkg2-inner' },
      React.createElement('header', { className: 'pkg2-section-head pkg2-match-intro pkg2-reveal' },
        React.createElement('div', null,
          React.createElement('span', { className: 'pkg2-kicker' }, '05 / GREEN ↔ PINK MATCH CUT'),
          React.createElement('h2', { id: 'pkg2-matchcut-title', className: 'pkg2-heading' }, '双口味刀版切换')
        ),
        React.createElement('p', { className: 'pkg2-copy' }, '每组刀版共享固定舞台与视觉中心。包装结构保持不动，仅让色彩与图形内容完成交叉淡化。')
      ),
      React.createElement('div', { className: 'pkg2-match-list' },
        pairs.map(function(pair) { return React.createElement(PackagingMatchStage, Object.assign({ key: pair.index }, pair)); })
      )
    )
  );
}

function PackagingFinalVisualsV2() {
  var result = useInView({ threshold: 0.02 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var isPink = usePackagingSingleSwitch(ref, 2100);
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-final-visuals',
    className: 'pkg2-section pkg2-final' + (isPink ? ' is-pink' : ''),
    'aria-labelledby': 'pkg2-final-title'
  },
    React.createElement('div', { className: 'pkg2-inner' },
      React.createElement('header', { className: 'pkg2-section-head pkg2-reveal' },
        React.createElement('div', null,
          React.createElement('span', { className: 'pkg2-kicker' }, '06 / FINAL VISUALS'),
          React.createElement('h2', { id: 'pkg2-final-title', className: 'pkg2-heading' }, '最终包装视觉')
        ),
        React.createElement('p', { className: 'pkg2-copy' }, '以茶盒、杯装与组合场景的数字效果图完成项目收束。所有图像均为 Packaging Visualization，不代表实际生产实物。')
      ),
      React.createElement('div', { className: 'pkg2-diptych-list' },
        React.createElement('div', { className: 'pkg2-final-diptych pkg2-final-diptych--green' },
          React.createElement('div', { className: 'pkg2-diptych-head' },
            React.createElement('h3', null, '龙井乌龙'), React.createElement('span', { className: 'pkg2-meta' }, 'GREEN / DIGITAL MOCKUP')
          ),
          React.createElement('div', { className: 'pkg2-diptych pkg2-diptych--green' },
            React.createElement('figure', { className: 'pkg2-figure pkg2-mask-left' },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-green-box.png', alt: '龙井乌龙绿色茶盒数字包装效果', width: 646, height: 789, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figure', { className: 'pkg2-figure pkg2-mask-right', style: { '--pkg2-delay': '140ms' } },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-green-cup.png', alt: '龙井乌龙绿色杯装数字包装效果', width: 646, height: 861, loading: 'lazy', decoding: 'async' })
            )
          )
        ),
        React.createElement('div', { className: 'pkg2-final-diptych pkg2-final-diptych--pink' },
          React.createElement('div', { className: 'pkg2-diptych-head' },
            React.createElement('h3', null, '九曲红梅'), React.createElement('span', { className: 'pkg2-meta' }, 'PINK / DIGITAL MOCKUP')
          ),
          React.createElement('div', { className: 'pkg2-diptych pkg2-diptych--pink' },
            React.createElement('figure', { className: 'pkg2-figure pkg2-mask-left' },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-viz-pink-box.png', alt: '九曲红梅粉色茶盒数字包装效果', width: 861, height: 861, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figure', { className: 'pkg2-figure pkg2-mask-right', style: { '--pkg2-delay': '140ms' } },
              React.createElement(PortfolioImage, { src: 'packaging-assets/pkg-hero-pink.png', alt: '九曲红梅茶盒、杯装与手提袋组合数字包装视觉', width: 426, height: 426, loading: 'lazy', decoding: 'async' })
            )
          )
        )
      ),
      React.createElement('div', { className: 'pkg2-final-close pkg2-caption' },
        React.createElement('span', null, '西湖龙井 × 霸王茶姬'), React.createElement('span', null, 'EDITORIAL MOTION PORTFOLIO')
      )
    )
  );
}

/* ---------- App ---------- */
/* ---------- Visual Design · Packaging · 《作品集4》定稿构图 ---------- */
var pkg4ProjectCn = '本包装串联霸王茶姬的东方美学基因与西湖龙井的千年底蕴，兼顾品牌辨识度与文化质感，手提袋包装提取霸王茶姬标志性“C”形花纹和龙井茶叶纹纹结合，龙井九曲红梅口味的主色取红梅的淡粉色，呼应春茶鲜润与东方雅致。';
var pkg4ProjectEn = "This packaging combines the Eastern aesthetic genes of Bawang Tea Princess with the millennia-old heritage of West Lake Dragon Well tea, balancing brand recognition and cultural texture. The tote bag packaging incorporates the iconic 'C'-shaped pattern of Bawang Tea Princess with the texture of Dragon Well tea leaves. The main color of the Longjing Nine-Turn Red Plum flavor is the light pink of red plums, echoing the freshness of spring tea and Eastern elegance.";
var pkg4Extract = 'packaging-assets/psd-extract/';

function PackagingWork4Overview(props) {
  var result = useInView({ threshold: 0.02 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var isPink = props.flavour === 'pink';
  var assets = isPink ? [
    { src: 'board-03-asset-01-pixel-3546-691-382x382.png', w: 382, h: 382, alt: '九曲红梅手提袋数字包装效果' },
    { src: 'board-03-asset-02-pixel-3123-678-402x402.png', w: 402, h: 402, alt: '九曲红梅双杯、手提袋与茶盒组合数字效果' },
    { src: 'board-03-asset-03-pixel-3251-263-284x411.png', w: 284, h: 411, alt: '九曲红梅手提袋包装展开图' },
    { src: 'board-03-asset-04-pixel-2980-259-261x417.png', w: 261, h: 417, alt: '九曲红梅正面包装展开图' },
    { src: 'board-03-asset-05-pixel-3544-497-384x179.png', w: 384, h: 179, alt: '九曲红梅茶盒包装展开图' },
    { src: 'board-03-asset-06-pixel-3537-183-399x333.png', w: 399, h: 333, alt: '九曲红梅折叠盒刀版图' }
  ] : [
    { src: 'board-02-asset-01-pixel-1379-721-531x356.png', w: 531, h: 356, alt: '龙井乌龙杯装、手提袋与茶盒组合数字效果' },
    { src: 'board-02-asset-02-pixel-1000-721-356x356.png', w: 356, h: 356, alt: '龙井乌龙手提袋数字包装效果' },
    { src: 'board-02-asset-03-pixel-1236-309-289x405.png', w: 289, h: 405, alt: '龙井乌龙手提袋包装展开图' },
    { src: 'board-02-asset-04-pixel-1525-230-390x320.png', w: 390, h: 320, alt: '龙井乌龙折叠盒刀版图' },
    { src: 'board-02-asset-05-pixel-1532-550-383x164.png', w: 383, h: 164, alt: '龙井乌龙茶盒包装展开图' },
    { src: 'board-02-asset-06-pixel-862-478-367x226.png', w: 367, h: 226, alt: '龙井乌龙正面包装展开图' }
  ];
  var titleId = isPink ? 'pkg4-pink-title' : 'pkg4-green-title';
  var collageOrder = isPink ? [4, 5, 1, 2, 3, 0] : [5, 2, 3, 4, 1, 0];
  return React.createElement('section', {
    ref: ref,
    id: isPink ? 'packaging-pink-visual' : 'packaging-project-visual',
    className: 'pkg4-section pkg4-board pkg4-overview ' + (isPink ? 'pkg4-pink' : 'pkg4-green'),
    'aria-labelledby': titleId
  },
    React.createElement('div', { className: 'pkg4-overview-copy' },
      React.createElement('h2', { id: titleId, className: 'pkg2-reveal' }, '西湖龙井 × 霸王茶姬'),
      React.createElement('p', { className: 'pkg4-overview-cn pkg2-reveal', style: { '--pkg2-delay': '80ms' } }, pkg4ProjectCn),
      React.createElement('p', { className: 'pkg4-overview-en pkg2-reveal', lang: 'en', style: { '--pkg2-delay': '160ms' } }, pkg4ProjectEn)
    ),
    assets.map(function(asset, index) {
      var order = collageOrder.indexOf(index);
      return React.createElement('figure', {
        key: asset.src,
        className: 'pkg4-collage-item pkg4-collage-0' + (index + 1) + ' pkg2-mask-down' + (isPink ? ' pkg4-flavour-crossfade' : ''),
        style: { '--pkg2-delay': (220 + order * 95) + 'ms' }
      }, React.createElement(PortfolioImage, {
        src: pkg4Extract + asset.src,
        alt: asset.alt,
        width: asset.w,
        height: asset.h,
        loading: 'lazy',
        decoding: 'async'
      }));
    })
  );
}

function PackagingWork4System() {
  var result = useInView({ threshold: 0.02 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var swatches = [
    ['#CCE4BD', '#CCE4BD', '#263a2d'], ['#9DB888', '#9DB888', '#263a2d'], ['#7DA63D', '#7DA63D', '#fff'], ['#173F00', '#173F00', '#fff'],
    ['#FCECEF', '#FCECEF', '#4e3a3f'], ['#FADADF', '#FADADF', '#4e3a3f'], ['#F2BFC6', '#F2BFC6', '#fff'], ['#CA988B', '#CA988B', '#fff']
  ];
  var visuals = [
    { cls: 'tea', src: 'board-04-asset-03-smartobject-3048-1319-391x337.png', w: 391, h: 337, alt: '龙井茶叶植物视觉' },
    { cls: 'pink-c', src: 'board-04-asset-01-smartobject-3492-1303-353x363.png', w: 353, h: 363, alt: '九曲红梅粉色 C 形包装主视觉' },
    { cls: 'plum', src: 'board-04-asset-02-smartobject-3070-1747-353x347.png', w: 353, h: 347, alt: '九曲红梅水彩植物视觉' },
    { cls: 'green-c', src: 'board-04-asset-04-smartobject-3511-1737-349x359.png', w: 349, h: 359, alt: '龙井乌龙绿色 C 形包装主视觉' }
  ];
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-visual-system',
    className: 'pkg4-section pkg4-board pkg4-system',
    'aria-label': '字标、双味色彩与 C 形视觉系统'
  },
    React.createElement('figure', { className: 'pkg4-system-wordmark pkg2-mask-left' },
      React.createElement(PortfolioImage, { src: pkg4Extract + 'board-04-asset-05-pixel-2021-1264-747x552.png', alt: '龙井闻茶拆解字标', width: 747, height: 552, loading: 'lazy', decoding: 'async' })
    ),
    visuals.map(function(item, index) {
      return React.createElement('figure', {
        key: item.cls,
        className: 'pkg4-system-visual pkg4-system-visual--' + item.cls + ' pkg2-mask-down',
        style: { '--pkg2-delay': (index * 100) + 'ms' }
      }, React.createElement(PortfolioImage, { src: pkg4Extract + item.src, alt: item.alt, width: item.w, height: item.h, loading: 'lazy', decoding: 'async' }));
    }),
    React.createElement('div', { className: 'pkg4-palette', 'aria-label': '绿色与粉色包装色板' },
      swatches.map(function(item, index) {
        return React.createElement('div', { key: item[0] + index, className: 'pkg4-swatch pkg4-palette-reveal pkg2-reveal', style: { background: item[1], color: item[2], '--pkg2-delay': (160 + index * 55) + 'ms' } }, item[0]);
      })
    ),
    React.createElement('div', { className: 'pkg4-chip-row pkg4-chip-row--top', 'aria-hidden': true },
      ['#FCECEF', '#FADADF', '#F2BFC6', '#CA988B'].map(function(color) { return React.createElement('span', { key: color, className: 'pkg4-chip', style: { background: color } }); })
    ),
    React.createElement('div', { className: 'pkg4-chip-row pkg4-chip-row--bottom', 'aria-hidden': true },
      ['#CCE4BD', '#9DB888', '#7DA63D', '#173F00'].map(function(color) { return React.createElement('span', { key: color, className: 'pkg4-chip', style: { background: color } }); })
    )
  );
}

window.PortfolioChapters.packaging = function() {
  return [
    React.createElement(PackagingWork4Overview, { key: 'packaging-project-visual', flavour: 'green' }),
    React.createElement(PackagingWork4Overview, { key: 'packaging-pink-visual', flavour: 'pink' }),
    React.createElement(PackagingWork4System, { key: 'packaging-visual-system' }),
    React.createElement(PackagingWork4Pattern, { key: 'packaging-application' }),
    React.createElement(PackagingWork4Final, { key: 'packaging-final-visuals', flavour: 'green' }),
    React.createElement(PackagingWork4Final, { key: 'packaging-final-pink', flavour: 'pink' })
  ];
};

function PackagingWork4Pattern() {
  var result = useInView({ threshold: 0.02 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var cn = '乌龙龙井口味包装的纹样设计，我借鉴了纹样库的龙井茶叶纹，整体为流畅的线条，呼应霸王茶姬包装一贯的线条繁复风格。纹样周围提取了茶叶纹弯曲的叶子形状作为四周的一个点缀。中间是对第二个花纹的一个自主变形，在一个花状的花瓣里面增加茶叶的纹样抽象提取';
  var en = 'For the design of the Oolong Longjing flavor packaging pattern, I drew inspiration from the Longjing tea leaf patterns in the pattern library. The overall design consists of smooth lines, echoing the intricate line style consistently used in Bawang Chaji packaging. Around the pattern, I extracted the curved leaf shapes from the tea leaf patterns as a surrounding embellishment. In the center, there is an independently transformed version of the second floral pattern, with the tea leaf patterns abstractly integrated inside a petal-shaped floral design.';
  var assets = [
    { cls: 'source-a', src: 'board-05-asset-02-pixel-159-1744-152x152.png', w: 152, h: 152, alt: '龙井茶叶纹样来源一' },
    { cls: 'source-b', src: 'board-05-asset-03-pixel-158-1943-154x156.png', w: 154, h: 156, alt: '龙井茶叶纹样来源二' },
    { cls: 'red', src: 'board-05-asset-05-pixel-355-1745-180x300.png', w: 180, h: 300, alt: '花瓣结构提取与拆分' },
    { cls: 'green', src: 'board-05-asset-04-pixel-596-1745-176x176.png', w: 176, h: 176, alt: '绿色花叶结构变形' },
    { cls: 'circle', src: 'board-05-asset-06-pixel-607-1945-154x150.png', w: 154, h: 150, alt: '圆形茶叶纹样提取' },
    { cls: 'arrow', src: 'board-05-asset-01-pixel-786-1817-110x47.png', w: 110, h: 47, alt: '' },
    { cls: 'final-green', src: 'board-05-asset-08-smartobject-913-1756-330x322.png', w: 330, h: 322, alt: '绿色龙井包装纹样' },
    { cls: 'final-pink', src: 'board-05-asset-07-smartobject-1281-1746-527x333.png', w: 527, h: 333, alt: '粉色红梅包装边框纹样' }
  ];
  return React.createElement('section', {
    ref: ref,
    id: 'packaging-application',
    className: 'pkg4-section pkg4-board pkg4-pattern',
    'aria-labelledby': 'pkg4-pattern-title'
  },
    React.createElement('h2', { id: 'pkg4-pattern-title', className: 'pkg4-pattern-title pkg2-reveal' },
      React.createElement('span', null, 'THE PACKAGING'), React.createElement('span', null, '纹样设计')
    ),
    React.createElement('p', { className: 'pkg4-pattern-copy pkg4-pattern-copy--cn pkg2-reveal', style: { '--pkg2-delay': '80ms' } }, cn),
    React.createElement('p', { className: 'pkg4-pattern-copy pkg4-pattern-copy--en pkg2-reveal', lang: 'en', style: { '--pkg2-delay': '140ms' } }, en),
    React.createElement('div', { className: 'pkg4-pattern-process' },
      assets.map(function(item, index) {
        var phase = index < 2 ? 'source' : (index < 6 ? 'transform' : 'result');
        var delays = [180, 250, 330, 410, 490, 570, 680, 790];
        return React.createElement('figure', {
          key: item.cls,
          className: 'pkg4-pattern-asset pkg4-pattern-asset--' + item.cls + ' pkg4-process-' + phase + ' pkg2-mask-down',
          style: { '--pkg2-delay': delays[index] + 'ms' },
          'aria-hidden': item.alt ? undefined : true
        }, React.createElement(PortfolioImage, { src: pkg4Extract + item.src, alt: item.alt, width: item.w, height: item.h, loading: 'lazy', decoding: 'async' }));
      })
    ),
    React.createElement('p', { className: 'pkg4-keep-exploring pkg2-reveal', style: { '--pkg2-delay': '240ms' } }, 'KEEP', React.createElement('br'), 'EXPLORING')
  );
}

function PackagingWork4Final(props) {
  var result = useInView({ threshold: 0.02 });
  var ref = result[0];
  usePackagingV2Motion(ref);
  var isPink = props.flavour === 'pink';
  var images = isPink ? [
    { src: 'board-07-asset-01-pixel-2020-2341-940x1253.png', w: 940, h: 1253, alt: '九曲红梅茶盒最终数字包装视觉' },
    { src: 'board-07-asset-02-pixel-2960-2343-980x1306.png', w: 980, h: 1306, alt: '九曲红梅杯装最终数字包装视觉' }
  ] : [
    { src: 'board-06-asset-01-pixel--9-2360-928x1239.png', w: 928, h: 1239, alt: '龙井乌龙杯装最终数字包装视觉' },
    { src: 'board-06-asset-02-pixel-922-2324-1004x1226.png', w: 1004, h: 1226, alt: '龙井乌龙茶盒最终数字包装视觉' }
  ];
  return React.createElement('section', {
    ref: ref,
    id: isPink ? 'packaging-final-pink' : 'packaging-final-visuals',
    className: 'pkg4-section pkg4-final-board' + (isPink ? ' pkg4-final-board--pink' : ''),
    'aria-label': isPink ? '九曲红梅最终包装视觉' : '龙井乌龙最终包装视觉'
  },
    images.map(function(item, index) {
      return React.createElement('figure', {
        key: item.src,
        className: 'pkg4-final-panel ' + (index === 0 ? 'pkg2-mask-left' : 'pkg2-mask-right'),
        style: { '--pkg2-delay': (index * 140) + 'ms' }
      }, React.createElement(PortfolioImage, { src: pkg4Extract + item.src, alt: item.alt, width: item.w, height: item.h, loading: 'lazy', decoding: 'async' }));
    })
  );
}
