
const { useRef, useEffect, useLayoutEffect, useState } = React;
window.PortfolioChapters = window.PortfolioChapters || {};

/* ---------- Media loading primitives ---------- */
const PORTFOLIO_IMAGE_DIMENSIONS = {"about-portrait.jpg":[600,600],"game-ui-erosion-hero.jpg":[1334,750],"game-ui-erosion-reset-confirm.png":[1280,720],"game-ui-shuaitu-character-detail.png":[2340,1080],"gameplay-combat.jpg":[1920,1080],"gameplay-drag.jpg":[1920,1080],"gameplay-mirror-after.jpg":[1920,1080],"gameplay-mirror-before.jpg":[1920,1080],"portfolio-hero-poster.jpg":[1756,1176],"qr-demo.png":[200,200],"story-combat-2.jpg":[1920,1080],"story-elder.jpg":[1920,1080],"story-forest.jpg":[1920,1080],"story-mirror-after.jpg":[1920,1080],"story-mirror-before.jpg":[1920,1080],"story-puzzle.jpg":[1920,1080],"story-scholar.png":[1920,1080],"story-temple.jpg":[1920,1080],"taishan-concept1.jpg":[1920,1080],"taishan-concept2.jpg":[1920,1080],"taishan-hero-poster.jpg":[1920,1080],"taishan-puppet.jpg":[735,412],"taishan-puppet2.jpg":[1200,754],"packaging-assets/psd-extract/board-02-asset-01-pixel-1379-721-531x356.png":[531,356],"packaging-assets/psd-extract/board-02-asset-02-pixel-1000-721-356x356.png":[356,356],"packaging-assets/psd-extract/board-02-asset-03-pixel-1236-309-289x405.png":[289,405],"packaging-assets/psd-extract/board-02-asset-04-pixel-1525-230-390x320.png":[390,320],"packaging-assets/psd-extract/board-02-asset-05-pixel-1532-550-383x164.png":[383,164],"packaging-assets/psd-extract/board-02-asset-06-pixel-862-478-367x226.png":[367,226],"packaging-assets/psd-extract/board-03-asset-01-pixel-3546-691-382x382.png":[382,382],"packaging-assets/psd-extract/board-03-asset-02-pixel-3123-678-402x402.png":[402,402],"packaging-assets/psd-extract/board-03-asset-03-pixel-3251-263-284x411.png":[284,411],"packaging-assets/psd-extract/board-03-asset-04-pixel-2980-259-261x417.png":[261,417],"packaging-assets/psd-extract/board-03-asset-05-pixel-3544-497-384x179.png":[384,179],"packaging-assets/psd-extract/board-03-asset-06-pixel-3537-183-399x333.png":[399,333],"packaging-assets/psd-extract/board-04-asset-01-smartobject-3492-1303-353x363.png":[353,363],"packaging-assets/psd-extract/board-04-asset-02-smartobject-3070-1747-353x347.png":[353,347],"packaging-assets/psd-extract/board-04-asset-03-smartobject-3048-1319-391x337.png":[391,337],"packaging-assets/psd-extract/board-04-asset-04-smartobject-3511-1737-349x359.png":[349,359],"packaging-assets/psd-extract/board-04-asset-05-pixel-2021-1264-747x552.png":[747,552],"packaging-assets/psd-extract/board-05-asset-01-pixel-786-1817-110x47.png":[110,47],"packaging-assets/psd-extract/board-05-asset-02-pixel-159-1744-152x152.png":[152,152],"packaging-assets/psd-extract/board-05-asset-03-pixel-158-1943-154x156.png":[154,156],"packaging-assets/psd-extract/board-05-asset-04-pixel-596-1745-176x176.png":[176,176],"packaging-assets/psd-extract/board-05-asset-05-pixel-355-1745-180x300.png":[180,300],"packaging-assets/psd-extract/board-05-asset-06-pixel-607-1945-154x150.png":[154,150],"packaging-assets/psd-extract/board-05-asset-07-smartobject-1281-1746-527x333.png":[527,333],"packaging-assets/psd-extract/board-05-asset-08-smartobject-913-1756-330x322.png":[330,322],"packaging-assets/psd-extract/board-06-asset-01-pixel--9-2360-928x1239.png":[928,1239],"packaging-assets/psd-extract/board-06-asset-02-pixel-922-2324-1004x1226.png":[1004,1226],"packaging-assets/psd-extract/board-07-asset-01-pixel-2020-2341-940x1253.png":[940,1253],"packaging-assets/psd-extract/board-07-asset-02-pixel-2960-2343-980x1306.png":[980,1306],"poster-assets/�ּ���ɽ_���� 1 ���� 2_���� 1 ���� 2.png":[2481,3508],"poster-assets/�ּ���ɽ_���� 1 ����.png":[2482,3508],"poster-assets/�ּ���ɽ_���� 1.png":[2481,3508],"slides/mp-01.png":[1500,3000],"slides/mp-02.png":[1500,3000],"slides/mp-03.png":[1500,3000],"slides/mp-04.png":[1501,2906],"slides/mp-05.png":[1620,3000],"slides/mp-06.png":[1500,3000],"slides/mp-07.png":[1500,3000],"slides/mp-08.png":[1500,3000],"slides/mp-09.png":[1500,3000],"slides/mp-10.png":[1500,3000],"slides/mp-11.png":[1500,3000],"slides/mp-12.png":[1500,3000],"slides/mp-13.png":[1500,3000],"slides/slide-game-cover.png":[929,521],"slides/slide-mp-landing.png":[382,776],"slides/slide-pkg-scene1.png":[928,1239]};

const PORTFOLIO_RESPONSIVE_IMAGES = {"slides/slide-pkg-scene1.png":{"srcSet":"assets/optimized/slide-pkg-scene1.38ae2a878e.webp 928w","sizes":"(max-width: 760px) 82vw, 400px"},"slides/slide-game-cover.png":{"srcSet":"assets/optimized/slide-game-cover.ad7ad2dca0.webp 929w","sizes":"(max-width: 760px) 82vw, 400px"},"story-scholar.png":{"srcSet":"assets/optimized/story-scholar.5f9cabf41b.webp 1920w","sizes":"(max-width: 760px) 92vw, 42vw"},"slides/mp-01.png":{"srcSet":"assets/optimized/mp-01.c8fa1b1cec.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-02.png":{"srcSet":"assets/optimized/mp-02.a210951974.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-03.png":{"srcSet":"assets/optimized/mp-03.f68be3a725.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-04.png":{"srcSet":"assets/optimized/mp-04.d1cf69e738.webp 1501w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-05.png":{"srcSet":"assets/optimized/mp-05.622cf80526.webp 1620w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-06.png":{"srcSet":"assets/optimized/mp-06.30b86bffcd.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-07.png":{"srcSet":"assets/optimized/mp-07.de2a3c3276.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-08.png":{"srcSet":"assets/optimized/mp-08.5c39f2eaa5.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-09.png":{"srcSet":"assets/optimized/mp-09.0221a2a397.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-10.png":{"srcSet":"assets/optimized/mp-10.17f4628306.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-11.png":{"srcSet":"assets/optimized/mp-11.76fb5938bd.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-12.png":{"srcSet":"assets/optimized/mp-12.2318047008.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"slides/mp-13.png":{"srcSet":"assets/optimized/mp-13.dd63e20432.webp 1500w","sizes":"(max-width: 760px) 78vw, 350px"},"poster-assets/\u67da\u89c1\u5e38\u5c71_\u753b\u677f 1 \u526f\u672c 2_\u753b\u677f 1 \u526f\u672c 2.png":{"srcSet":"assets/optimized/\u67da\u89c1\u5e38\u5c71_\u753b\u677f 1 \u526f\u672c 2_\u753b\u677f 1 \u526f\u672c 2.94d097e505.webp 2481w","sizes":"(max-width: 760px) 92vw, 35vw"},"poster-assets/\u67da\u89c1\u5e38\u5c71_\u753b\u677f 1 \u526f\u672c.png":{"srcSet":"assets/optimized/\u67da\u89c1\u5e38\u5c71_\u753b\u677f 1 \u526f\u672c.644759d525.webp 2482w","sizes":"(max-width: 760px) 92vw, 35vw"},"poster-assets/\u67da\u89c1\u5e38\u5c71_\u753b\u677f 1.png":{"srcSet":"assets/optimized/\u67da\u89c1\u5e38\u5c71_\u753b\u677f 1.ba5faa6740.webp 2481w","sizes":"(max-width: 760px) 92vw, 35vw"}};

function normalizeAssetPath(src) {
  if (!src || typeof src !== 'string') return '';
  try {
    return decodeURIComponent(new URL(src, window.location.href).pathname.replace(/^\//, ''));
  } catch (error) {
    return src.split('?')[0].replace(/^\.\//, '');
  }
}

function responsiveCandidateUrl(responsive) {
  var value = responsive && responsive.srcSet ? responsive.srcSet : '';
  var splitAt = value.lastIndexOf(' ');
  var assetUrl = splitAt > 0 ? value.slice(0, splitAt) : value;
  var descriptor = splitAt > 0 ? value.slice(splitAt + 1) : '';
  return {
    url: encodeURI(assetUrl),
    srcSet: encodeURI(assetUrl) + (descriptor ? ' ' + descriptor : '')
  };
}

var PortfolioImage = React.forwardRef(function PortfolioImage(props, ref) {
  var nextProps = Object.assign({}, props);
  nextProps.ref = ref;
  var assetPath = normalizeAssetPath(nextProps.src);
  var dimensions = PORTFOLIO_IMAGE_DIMENSIONS[assetPath];
  var responsive = PORTFOLIO_RESPONSIVE_IMAGES[assetPath];
  if (dimensions) {
    if (!nextProps.width) nextProps.width = dimensions[0];
    if (!nextProps.height) nextProps.height = dimensions[1];
  }
  if (!nextProps.loading || nextProps.loading === 'auto') nextProps.loading = 'lazy';
  if (!nextProps.decoding) nextProps.decoding = 'async';
  if (responsive) {
    nextProps.srcSet = responsiveCandidateUrl(responsive).srcSet;
    nextProps.sizes = responsive.sizes;
  }
  return React.createElement('img', nextProps);
});

function DeferredPortfolioImage(props) {
  var ref = useRef(null);
  var loadState = useState(false);
  var shouldLoad = loadState[0];
  var setShouldLoad = loadState[1];
  useEffect(function() {
    var image = ref.current;
    if (!image) return;
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px 600px', threshold: 0 });
    observer.observe(image);
    return function() { observer.disconnect(); };
  }, []);

  var assetPath = normalizeAssetPath(props.src);
  var dimensions = PORTFOLIO_IMAGE_DIMENSIONS[assetPath];
  var imageProps = Object.assign({}, props, {
    ref: ref,
    src: shouldLoad ? props.src : undefined,
    width: props.width || (dimensions && dimensions[0]),
    height: props.height || (dimensions && dimensions[1]),
    'data-deferred-src': shouldLoad ? undefined : props.src
  });
  return React.createElement(PortfolioImage, imageProps);
}

function DeferredVideo(props) {
  var ref = useRef(null);
  var source = props.src;
  var poster = props.poster;
  useEffect(function() {
    var video = ref.current;
    if (!video || !source) return;
    var loaded = false;
    function hydrateVideo() {
      if (loaded) return;
      loaded = true;
      if (poster) video.poster = poster;
      video.src = source;
      video.preload = 'auto';
      video.load();
      if (props.autoPlay !== false) {
        var playback = video.play();
        if (playback && typeof playback.catch === 'function') playback.catch(function() {});
      }
    }
    if (!('IntersectionObserver' in window)) {
      hydrateVideo();
      return;
    }
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        hydrateVideo();
        observer.disconnect();
      }
    }, { rootMargin: '600px 0px', threshold: 0 });
    observer.observe(video);
    return function() { observer.disconnect(); };
  }, [source, poster]);

  var videoProps = Object.assign({}, props, {
    ref: ref,
    src: undefined,
    poster: undefined,
    autoPlay: false,
    preload: 'none',
    'data-deferred-src': source,
    'data-deferred-poster': poster || undefined
  });
  delete videoProps.children;
  return React.createElement('video', videoProps);
}

function ProjectAssetWarmup() {
  useEffect(function() {
    if (!('IntersectionObserver' in window)) return;
    var groups = [
      { selector: '#section-01', assets: ['taishan-hero-poster.jpg', 'taishan-puppet.jpg'] },
      { selector: '#game-ui-rain-collection', assets: ['game-ui-erosion-hero.jpg', 'game-ui-shuaitu-character-detail.png'] },
      { selector: '#section-game-ui', assets: ['assets/rain/rain-main.webp', 'assets/rain/rain-collection.webp'] },
      { selector: '#game-ui-shuaitu-visual', assets: ['assets/warehouse/level.webp'] },
      { selector: '#game-ui-warehouse', assets: ['assets/duoyi/character-detail.png'] },
      { selector: '#game-ui-duoyi', assets: ['assets/giant/gala-reward.jpg'] },
      { selector: '#section-02', assets: ['slides/mp-01.png', 'slides/mp-02.png'] },
      { selector: '#section-03', assets: [
        'packaging-assets/psd-extract/board-02-asset-01-pixel-1379-721-531x356.png',
        'packaging-assets/psd-extract/board-02-asset-02-pixel-1000-721-356x356.png'
      ] }
    ];
    var warmed = new Set();
    function warmAssets(assets) {
      assets.forEach(function(asset) {
        var responsive = PORTFOLIO_RESPONSIVE_IMAGES[asset];
        var requestAsset = responsive ? responsiveCandidateUrl(responsive).url : asset;
        if (warmed.has(requestAsset)) return;
        warmed.add(requestAsset);
        var link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = requestAsset;
        link.fetchPriority = 'low';
        document.head.appendChild(link);
      });
    }
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var assets = entry.target.__portfolioWarmAssets || [];
        warmAssets(assets);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '1600px 0px', threshold: 0 });
    var observed = new Set();
    function observeAvailableTargets() {
      groups.forEach(function(group) {
        var target = document.querySelector(group.selector);
        if (!target || observed.has(target)) return;
        observed.add(target);
        target.__portfolioWarmAssets = group.assets;
        observer.observe(target);
      });
    }
    observeAvailableTargets();
    window.addEventListener('portfolio:chapter-ready', observeAvailableTargets);
    return function() {
      observer.disconnect();
      window.removeEventListener('portfolio:chapter-ready', observeAvailableTargets);
    };
  }, []);
  return null;
}

/* ---------- useInView hook ---------- */
function useInView(options) {
  var ref = useRef(null);
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = useState(reducedMotion);
  var inView = state[0];
  var setInView = state[1];
  var opts = options || {};
  useEffect(function() {
    var el = ref.current;
    if (!el || reducedMotion) return;
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: opts.threshold || 0.15, rootMargin: opts.rootMargin || '-50px' });
    observer.observe(el);
    return function() { observer.disconnect(); };
  }, []);
  return [ref, inView];
}

function animStyle(delay, duration) {
  return { opacity: 0, animation: 'fadeInUp ' + (duration || 0.6) + 's ease-out ' + delay + 's forwards' };
}

/* ---------- StaggeredFade ---------- */
function StaggeredFade(props) {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var chars = Array.from(props.text);
  var charDelay = props.charDelay || 0.07;
  var duration = props.duration || 0.7;
  return React.createElement('p', { ref: ref, className: props.className, style: { display: 'flex', flexWrap: 'wrap', margin: 0 } },
    chars.map(function(c, i) {
      return React.createElement('span', { key: i, style: {
        display: 'inline-block', opacity: inView ? 1 : 0,
        filter: inView ? 'blur(0px)' : 'blur(10px)',
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity ' + duration + 's ease-out ' + (i * charDelay) + 's, filter ' + duration + 's ease-out ' + (i * charDelay) + 's, transform ' + duration + 's ease-out ' + (i * charDelay) + 's',
      }}, c === ' ' ? '\u00A0' : c);
    })
  );
}

/* ---------- Reveal ---------- */
function Reveal(props) {
  var result = useInView();
  var ref = result[0]; var inView = result[1];
  var delay = props.delay || 0; var y = props.y !== undefined ? props.y : 30;
  var x = props.x || 0; var dur = props.duration || 0.6;
  return React.createElement('div', { ref: ref, className: props.className,
    style: Object.assign({}, props.style, {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translate(0,0)' : 'translate(' + x + 'px,' + y + 'px)',
      transition: 'opacity ' + dur + 's cubic-bezier(0.16,1,0.3,1) ' + delay + 's, transform ' + dur + 's cubic-bezier(0.16,1,0.3,1) ' + delay + 's',
    })
  }, props.children);
}

/* ---------- ScrollProgress ---------- */
function ScrollProgress() {
  var state = useState(0); var width = state[0]; var setWidth = state[1];
  useEffect(function() {
    var onScroll = function() {
      var sh = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(sh > 0 ? (window.scrollY / sh) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll); onScroll();
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);
  return React.createElement('div', { className: 'fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none' },
    React.createElement('div', { className: 'h-full bg-white/20', style: { width: width + '%', transition: 'width 0.1s' } })
  );
}

/* ---------- BackToTop ---------- */
function BackToTop() {
  var state = useState(false); var visible = state[0]; var setVisible = state[1];
  useEffect(function() {
    var onScroll = function() { setVisible(window.scrollY > 600); };
    window.addEventListener('scroll', onScroll);
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);
  if (!visible) return null;
  return React.createElement('button', {
    onClick: function() { window.scrollTo({ top: 0, behavior: 'smooth' }); },
    className: 'fixed bottom-6 right-6 z-50 liquid-glass rounded-full w-12 h-12 flex items-center justify-center',
    style: { animation: 'fadeIn 0.3s ease-out forwards' }, 'aria-label': 'Back to top'
  }, React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M18 15l-6-6-6 6' })));
}

/* ---------- Portfolio category registry ---------- */
var portfolioCategories = [
  { id:'game-design', num:'01', navLabel:'GAME DESIGN', title:'交互游戏设计', subtitle:'Interactive Game Design', description:'完整游戏项目、剧情、场景、机制与交互体验设计。', href:'#section-01', image:'slides/slide-game-cover.png', sectionIds:['01'] },
  { id:'game-ui', num:'02', navLabel:'GAME UI', title:'游戏UI设计', subtitle:'Game UI Design', description:'游戏界面、HUD、信息层级、视觉规范与游戏体验。', href:'#section-game-ui', image:'game-ui-erosion-hero.jpg', sectionIds:['game-ui'] },
  { id:'digital-design', num:'03', navLabel:'DIGITAL DESIGN', title:'数字界面设计', subtitle:'Digital Interface Design', description:'数字产品界面、信息架构、视觉系统与交互体验。', href:'#section-02', image:'slides/slide-mp-landing.png', sectionIds:['02'] },
  { id:'visual-design', num:'04', navLabel:'VISUAL DESIGN', title:'视觉设计', subtitle:'Visual Design', description:'由包装与海报项目构成的综合视觉基础能力。', href:'#section-03', image:'slides/slide-pkg-scene1.png', sectionIds:['03','04'] }
];

/* ---------- Navbar ---------- */
function Navbar() {
  var menuState = useState(false); var menuOpen = menuState[0]; var setMenuOpen = menuState[1];
  var timeState = useState(''); var time = timeState[0]; var setTime = timeState[1];
  useEffect(function() {
    var updateTime = function() {
      var fmt = new Intl.DateTimeFormat('en-GB', {hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false});
      setTime(fmt.format(new Date()));
    };
    updateTime(); var id = setInterval(updateTime, 1000);
    return function() { clearInterval(id); };
  }, []);
  var auxiliaryBefore = [{ id:'about', label:'个人简介', href:'#about' }];
  var auxiliaryAfter = [{ id:'contact', label:'联系方式', href:'#contact' }];
  var projectNav = portfolioCategories.map(function(item) {
    return { id:item.id, num:item.num, label:item.navLabel, cn:item.title, href:item.href };
  });
  var navItems = auxiliaryBefore.concat(projectNav).concat(auxiliaryAfter);
  return React.createElement('header', { className: 'fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 py-4' },
    React.createElement('nav', { className: 'liquid-glass rounded-full max-w-5xl mx-auto px-5 py-3 flex items-center justify-between' },
      React.createElement('div', { className: 'flex items-center gap-6 md:gap-8' },
        React.createElement('a', { href: '#hero', className: 'font-serif italic text-white text-base sm:text-lg tracking-tight' }, '王玉璇'),
        React.createElement('div', { className: 'hidden md:flex items-center gap-5' },
          navItems.map(function(item) {
            return React.createElement('a', { key: item.id, href: item.href, title: item.cn || item.label, className: 'nav-link-underline group flex items-baseline gap-1.5', style: { textDecoration: 'none' } },
              item.num ? React.createElement('span', { className: 'text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-white/40' }, item.num) : null,
              React.createElement('span', { className: 'text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white/70 group-hover:text-white transition-colors' }, item.label)
            );
          })
        )
      ),
      React.createElement('div', { className: 'flex items-center gap-4' },
        React.createElement('span', { className: 'hidden sm:block text-[10px] text-white/40 font-mono tracking-wider' }, 'CST ' + time),
        React.createElement('button', { className: 'mobile-menu-btn md:hidden text-white text-sm font-medium', onClick: function() { setMenuOpen(!menuOpen); }, 'aria-label': 'Toggle menu', 'aria-expanded': menuOpen }, menuOpen ? 'Close' : 'Menu')
      )
    ),
    React.createElement('div', { className: 'md:hidden overflow-hidden', style: { maxHeight: menuOpen ? '400px' : '0', opacity: menuOpen ? 1 : 0, transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1)' } },
      React.createElement('div', { className: 'liquid-glass rounded-2xl mt-2 p-6 flex flex-col gap-4' },
        navItems.map(function(item) {
          return React.createElement('a', { key: item.id, href: item.href, onClick: function() { setMenuOpen(false); }, className: 'flex items-baseline gap-2', style: { textDecoration: 'none' } },
            item.num ? React.createElement('span', { className: 'text-[10px] text-white/40' }, item.num) : null,
            React.createElement('span', { className: 'flex flex-col' },
              React.createElement('span', { className: 'text-2xl text-white font-serif' }, item.cn || item.label),
              item.cn ? React.createElement('span', { className: 'text-[9px] text-white/40 tracking-[0.16em] mt-1' }, item.label) : null
            )
          );
        })
      )
    )
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return React.createElement('section', { id: 'hero', className: 'snap-slide relative min-h-screen flex flex-col justify-end overflow-hidden bg-black' },
    React.createElement('video', {
      className: 'absolute inset-0 w-full h-full object-cover', style: { objectPosition: 'center 15%' },
      poster: 'portfolio-hero-poster.jpg',
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: 'auto',
      'webkit-playsinline': 'true'
    },
      React.createElement('source', { src: 'portfolio-hero.mp4', type: 'video/mp4' })
    ),
    React.createElement('div', { className: 'absolute inset-0 bg-black/30' }),
    React.createElement('div', { className: 'absolute inset-0 pointer-events-none', style: { background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.05) 0%, transparent 65%)' } }),
    React.createElement('div', { className: 'absolute inset-0 pointer-events-none', style: { background: 'radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)' } }),
    React.createElement('div', { className: 'absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/20 to-transparent' }),
    React.createElement('div', { className: 'relative z-10 max-w-7xl mx-auto w-full px-6 pb-16 sm:pb-20 pt-32' },
      React.createElement('div', { className: 'flex items-center gap-2.5 mb-8', style: animStyle(0.3) },
        React.createElement('span', { className: 'relative inline-block w-[7px] h-[7px] rounded-full bg-white dot-pulse' }),
        React.createElement('span', { className: 'text-[10px] sm:text-xs text-white/70 font-medium tracking-wide uppercase' }, 'Visual Design')
      ),
      React.createElement(StaggeredFade, { text: '视觉传达设计', className: 'font-serif italic text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight' }),
      React.createElement('div', { className: 'mt-4 sm:mt-5', style: animStyle(0.9) },
        React.createElement('div', { className: 'flex flex-col gap-1' },
          React.createElement('p', { className: 'text-lg sm:text-xl text-white/90 font-sans font-medium tracking-wide' }, '\u738b\u7389\u7487'),
          React.createElement('p', { className: 'text-sm sm:text-base text-white/50 font-sans tracking-wider' }, 'Visual Designer / Game UI Designer')
        )
      ),
      React.createElement('div', { className: 'mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-5', style: animStyle(1.1) },
        React.createElement('p', { className: 'text-sm text-white/60 max-w-md leading-relaxed' }, '探索传统文化与数字媒介的融合，通过视觉设计创造具有体验感的叙事作品。'),
        React.createElement('a', { href: '#toc', className: 'liquid-glass rounded-full px-6 py-3 text-sm text-white font-medium hover:bg-white/10 transition-colors whitespace-nowrap' }, '开始探索 →')
      )
    )
  );
}

/* ---------- Table of Contents (3D card carousel) ---------- */
function TableOfContents() {
  var activeState = useState(0);
  var active = activeState[0]; var setActive = activeState[1];
  var autoRef = useRef(null);
  var pausedRef = useRef(false);
  var playingRef = useRef(true);
  var playingState = useState(true);
  var playing = playingState[0]; var setPlaying = playingState[1];

  var items = portfolioCategories;
  var n = items.length;

  var tick = function() {
    if (pausedRef.current || !playingRef.current) return;
    setActive(function(prev) { return (prev + 1) % n; });
  };

  var restartAuto = function() {
    if (autoRef.current) clearInterval(autoRef.current);
    if (playingRef.current) autoRef.current = setInterval(tick, 4000);
  };

  useEffect(function() {
    restartAuto();
    return function() { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  var goTo = function(idx) {
    idx = ((idx % n) + n) % n;
    if (idx !== active) setActive(idx);
    restartAuto();
  };

  var togglePlay = function() {
    playingRef.current = !playingRef.current;
    setPlaying(playingRef.current);
    if (playingRef.current) restartAuto();
    else { if (autoRef.current) clearInterval(autoRef.current); }
  };

  var toggleFullscreen = function() {
    var el = document.documentElement;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    }
  };

  var getOffset = function(i, active) {
    var offset = i - active;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    return offset;
  };

  /* Cover Flow: center enlarged + upright, sides tilted inward + progressively smaller + depth blur */
  var getCardStyle = function(offset) {
    var abs = Math.abs(offset);
    if (abs > 2) return { transform: 'translate(-50%, -50%) scale(0.15)', opacity: 0, pointerEvents: 'none', zIndex: 0, filter: 'blur(10px)' };
    var tx = abs === 1 ? offset * 48 : offset * 60;
    var ty = abs * 10;
    var tz = abs === 0 ? 80 : abs === 1 ? 0 : -50;
    var scale = abs === 0 ? 1 : abs === 1 ? 0.72 : 0.50;
    var rotY = abs === 0 ? 0 : (offset > 0 ? (abs === 1 ? -14 : -26) : (abs === 1 ? 14 : 26));
    var rotZ = abs === 0 ? 0 : (offset > 0 ? (abs === 1 ? -2 : -4) : (abs === 1 ? 2 : 4));
    var opacity = abs === 0 ? 1 : abs === 1 ? 1 : 0.9;
    var blurPx = abs === 0 ? 0 : abs === 1 ? 2 : 6;
    return {
      transform: 'translate(-50%, -50%) translateX(' + tx + '%) translateY(' + ty + 'px) translateZ(' + tz + 'px) scale(' + scale + ') rotateY(' + rotY + 'deg) rotateZ(' + rotZ + 'deg)',
      opacity: opacity, zIndex: 20 - abs,
      pointerEvents: abs === 0 ? 'auto' : 'none',
      filter: 'blur(' + blurPx + 'px)'
    };
  };

  var cardW = 'min(360px, 44vw)';
  var fbg = 'rgba(255,255,255,0.08)';
  var fblur = 'blur(20px)';

  /* Gray gradient blurred background */
  var secBg = 'radial-gradient(ellipse at 50% 38%, rgba(85,85,95,0.12) 0%, rgba(30,30,35,0.4) 42%, #08080a 76%)';
  /* Frosted glass card — gray tint, 88% opaque */
  var cardBg = 'rgba(48,48,52,0.88)';
  /* Warm-dark semi-transparent info bar */
  var infoBg = 'rgba(12,12,15,0.5)';

  /* Icons */
  var iPrev = React.createElement('svg', {width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'white',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M19 20L9 12l10-8'}),React.createElement('path',{d:'M5 19V5'}));
  var iNext = React.createElement('svg', {width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'white',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M5 4l10 8-10 8'}),React.createElement('path',{d:'M19 5v14'}));
  var iPlay = React.createElement('svg', {width:14,height:14,viewBox:'0 0 24 24',fill:'white'},React.createElement('path',{d:'M8 5l11 7-11 7z'}));
  var iPause = React.createElement('svg', {width:14,height:14,viewBox:'0 0 24 24',fill:'white'},React.createElement('rect',{x:6,y:5,width:4,height:14,rx:1}),React.createElement('rect',{x:14,y:5,width:4,height:14,rx:1}));
  var iFS = React.createElement('svg', {width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'white',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5'}));
  var iRf = React.createElement('svg', {width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'white',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M21 12a9 9 0 11-3-6.7L21 8'}),React.createElement('path',{d:'M21 3v5h-5'}));
  var iMore = React.createElement('svg', {width:16,height:16,viewBox:'0 0 24 24',fill:'white'},React.createElement('circle',{cx:5,cy:12,r:1.5}),React.createElement('circle',{cx:12,cy:12,r:1.5}),React.createElement('circle',{cx:19,cy:12,r:1.5}));
  var iComment = React.createElement('svg', {width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'white',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'}));
  var iList = React.createElement('svg', {width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'white',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01'}));
  var iVolume = React.createElement('svg', {width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'white',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M11 5L6 9H2v6h4l5 4V5z'}),React.createElement('path',{d:'M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07'}));

  var gBtn = function(icon, onClick, label) {
    return React.createElement('button', {onClick:onClick,'aria-label':label,className:'w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0',style:{background:fbg,backdropFilter:fblur,WebkitBackdropFilter:fblur,boxShadow:'inset 0 1px 1px rgba(255,255,255,0.12)',border:'none'}},icon);
  };
  var gBtnLg = function(icon, onClick, label) {
    return React.createElement('button', {onClick:onClick,'aria-label':label,className:'w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0',style:{background:fbg,backdropFilter:fblur,WebkitBackdropFilter:fblur,boxShadow:'inset 0 1px 1px rgba(255,255,255,0.12)',border:'none'}},icon);
  };

  return React.createElement('section', { id: 'toc', className: 'snap-slide relative min-h-screen overflow-hidden flex flex-col', style: { background: secBg } },
    /* Stage — card carousel area */
    React.createElement('div', { className: 'relative flex-1 flex items-center justify-center', onMouseEnter: function() { pausedRef.current = true; }, onMouseLeave: function() { pausedRef.current = false; } },
      /* 3D card carousel — Cover Flow ring */
      React.createElement('div', { className: 'toc-stage', style: { width: '100%', height: 'min(500px, 62vh)' } },
        items.map(function(item, i) {
          var offset = getOffset(i, active);
          var isActive = offset === 0;
          var cs = getCardStyle(offset);
          return React.createElement('a', { key: i, href: isActive ? item.href : '#', onClick: function(e) { if (!isActive) { e.preventDefault(); goTo(i); } }, className: 'toc-abs-card', style: Object.assign({ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }, cs) },
            /* Card — large rounded rect, frosted glass, no border, edge highlights + 3D thickness */
            React.createElement('div', { className: 'relative rounded-[20px] overflow-hidden flex flex-col', style: {
              width: cardW, border: 'none',
              background: cardBg, backdropFilter: fblur, WebkitBackdropFilter: fblur,
              boxShadow: isActive
                ? '0 2px 0 rgba(255,255,255,0.05), 0 6px 0 rgba(0,0,0,0.06), 0 8px 25px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -1px 1px rgba(0,0,0,0.1)'
                : '0 2px 0 rgba(255,255,255,0.03), 0 4px 0 rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 1px rgba(0,0,0,0.08)'
            }},
              /* Top: square image area */
              React.createElement('div', { style: { position: 'relative', width: '100%', height: 0, paddingBottom: '100%', overflow: 'hidden' } },
                item.image ? React.createElement(PortfolioImage, { src: item.image, alt: item.title, loading: 'lazy', className: 'absolute inset-0 w-full h-full object-contain p-4' })
                  : React.createElement('div', { className: 'absolute inset-0 flex items-center justify-center px-8 text-center' }, React.createElement('span', { className: 'font-serif italic', style: { fontSize: 'clamp(2rem,5vw,4rem)', lineHeight: 1, color: '#666' } }, item.placeholderLabel || item.num)),
                React.createElement('div', { className: 'absolute top-4 left-5 z-10' }, React.createElement('span', { className: 'text-white/60 text-xs font-mono tracking-wider' }, item.num)),
                isActive ? React.createElement('div', { className: 'absolute top-4 right-5 z-10 flex items-center gap-1.5' }, React.createElement('span', { className: 'w-1.5 h-1.5 rounded-full bg-white dot-pulse' }), React.createElement('span', { className: 'text-white/60 text-[10px] tracking-wider uppercase' }, 'View')) : null
              ),
              /* Bottom: semi-transparent info bar */
              React.createElement('div', { className: 'px-5 py-3 text-center', style: { background: infoBg } },
                React.createElement('h3', { className: 'font-serif italic text-white text-sm sm:text-base tracking-tight' }, item.subtitle),
                React.createElement('p', { className: 'text-white/50 text-[9px] tracking-[0.16em] mt-1' }, item.title),
                React.createElement('p', { className: 'toc-card-desc text-[9px] leading-relaxed mt-2 mx-auto max-w-[28em]', style: { color: 'rgba(255,255,255,0.48)' } }, item.description)
              )
            )
          );
        })
      ),

      /* Right side floating buttons (vertical, independent) */
      React.createElement('div', { className: 'absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40' },
        gBtnLg(iFS, toggleFullscreen, 'Fullscreen'),
        gBtnLg(iRf, function() { goTo(0); }, 'Restart')
      )
    ),

    /* Bottom control bar — player-style, full width frosted glass */
    React.createElement('div', { className: 'px-4 sm:px-6 pb-5 z-30' },
      React.createElement('div', { className: 'rounded-2xl flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 max-w-4xl mx-auto', style: { background: fbg, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12), 0 8px 30px rgba(0,0,0,0.4)', border: 'none' } },
        /* Left: prev / play-pause / next */
        React.createElement('div', { className: 'flex items-center gap-1.5 sm:gap-2 flex-shrink-0' },
          gBtn(iPrev, function() { goTo(active - 1); }, 'Previous'),
          React.createElement('button', { onClick: togglePlay, 'aria-label': playing ? 'Pause' : 'Play', className: 'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0', style: { background: 'rgba(255,255,255,0.1)', backdropFilter: fblur, WebkitBackdropFilter: fblur, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)', border: 'none' } }, playing ? iPause : iPlay),
          gBtn(iNext, function() { goTo(active + 1); }, 'Next')
        ),
        /* Mini cover thumbnail */
        items[active].image ? React.createElement(PortfolioImage, { src: items[active].image, alt: '', className: 'w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0' }) : React.createElement('div', { className: 'w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0', style: { background: 'rgba(255,255,255,0.05)' } }, React.createElement('span', { className: 'font-serif italic text-white/30 text-sm' }, items[active].num)),
        /* Title + subtitle */
        React.createElement('div', { className: 'text-left flex-shrink-0 min-w-0' },
          React.createElement('p', { className: 'text-white text-xs sm:text-sm font-serif italic truncate' }, items[active].title),
          React.createElement('p', { className: 'text-white/40 text-[8px] sm:text-[9px] tracking-widest uppercase' }, items[active].subtitle)
        ),
        /* Progress bar (animated, resets on card change) */
        React.createElement('div', { className: 'flex-1 h-1 rounded-full overflow-hidden min-w-[40px]', style: { background: 'rgba(255,255,255,0.08)' } },
          React.createElement('div', {
            key: 'prog-' + active,
            className: 'h-full rounded-full',
            style: {
              width: '100%',
              background: 'rgba(255,255,255,0.4)',
              transformOrigin: 'left center',
              animation: playing ? 'tocLineGrow 4s linear' : 'none',
              animationPlayState: playing ? 'running' : 'paused'
            }
          })
        ),
        /* Right: more, comment, list, volume */
        React.createElement('div', { className: 'flex items-center gap-1.5 sm:gap-2 flex-shrink-0' },
          gBtn(iMore, function() {}, 'More'),
          gBtn(iComment, function() { window.location.hash = 'contact'; }, 'Contact'),
          gBtn(iList, function() { goTo(0); }, 'List'),
          gBtn(iVolume, function() {}, 'Volume')
        )
      )
    )
  );
}

/* ---------- Slide (full-screen single element) ---------- */
function Slide(props) {
  var idx = props.idx || 0;
  var total = props.total || 1;
  var sectionNum = props.sectionNum || '';
  return React.createElement('section', { className: 'snap-slide relative min-h-screen flex items-center justify-center overflow-hidden bg-black' },
    React.createElement('div', { className: 'absolute inset-0 pointer-events-none', style: { background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 60%)' } }),
    React.createElement(Reveal, { y: 40, duration: 0.7, className: 'relative z-10' },
      React.createElement(PortfolioImage, {
        src: props.image, alt: props.title, loading: 'lazy',
        className: 'max-w-[90vw] max-h-[78vh] object-contain',
        style: { filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.5))' }
      })
    ),
    React.createElement('div', { className: 'absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/70 to-transparent z-20' },
      React.createElement('div', { className: 'max-w-7xl mx-auto flex items-end justify-between gap-4' },
        React.createElement('div', null,
          React.createElement('h3', { className: 'font-serif italic text-white text-lg sm:text-2xl tracking-tight' }, props.title),
          props.desc ? React.createElement('p', { className: 'text-xs sm:text-sm text-white/50 mt-2 max-w-lg leading-relaxed' }, props.desc) : null
        ),
        React.createElement('div', { className: 'flex items-baseline gap-2 flex-shrink-0' },
          React.createElement('span', { className: 'text-[10px] text-white/30 font-mono' }, sectionNum),
          React.createElement('span', { className: 'text-xs text-white/40 font-mono' }, String(idx + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0'))
        )
      )
    )
  );
}

/* ---------- Section Header (dark divider) ---------- */
function SectionHeader(props) {
  return React.createElement('section', { id: 'section-' + props.num, className: 'snap-slide relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black' },
    React.createElement('div', { className: 'absolute inset-0 pointer-events-none', style: { background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)' } }),
    React.createElement('div', { className: 'absolute top-6 left-6 sm:left-8 z-10' },
      React.createElement('p', { className: 'text-[10px] text-white/40 uppercase tracking-widest font-mono' }, 'PERSONAL PORTFOLIO')
    ),
    React.createElement('div', { className: 'absolute top-6 right-6 sm:right-8 z-10' },
      React.createElement('p', { className: 'text-[10px] text-white/40 uppercase tracking-widest font-mono' }, 'KEEP EXPLORING')
    ),
    React.createElement(Reveal, { y: 30, duration: 0.8, className: 'relative z-10 text-center' },
      React.createElement('div', null,
        React.createElement('h2', { className: 'font-serif italic text-white text-4xl sm:text-6xl md:text-7xl tracking-tight' }, props.num + ' ' + props.title),
        React.createElement('p', { className: 'text-sm text-white/40 uppercase tracking-widest mt-3' }, props.subtitle)
      )
    )
  );
}

/* ---------- Project Data ---------- */
var projectSections = [
  {
    num: '01', title: '交互游戏设计', subtitle: 'INTERACTIVE GAME DESIGN',
    slides: [
      { image: 'slides/slide-game-cover.png', title: '泰山皮影·镇妖记', desc: '以经典IP《画皮》为故事内核，深度融合泰山皮影民俗文化，打造沉浸式交互游戏体验。' },
      { image: 'slides/slide-game-shigandang.png', title: '石敢当', desc: '泰山皮影五分侧脸技法，重彩饱和度高，锋利眉线，泰山神将冠顶红珠。' },
      { image: 'slides/slide-game-couple.png', title: '王生和女子（妖怪化形）', desc: '书生竹纹白衣与妖女红金华服对比，正色辟邪与妖异感交织。' },
      { image: 'slides/slide-game-elder.png', title: '老者', desc: '褚黄、玄黑、朱红配色，还原皮影自然质感，增强立体感。' },
      { image: 'slides/slide-game-monster.png', title: '妖怪原型', desc: '鹰嘴、单角、花翎组合设计，尖锐夸张，独角镇煞。' }
    ]
  },
  {
    num: '02', title: '小程序界面设计', subtitle: 'MINI PROGRAM UI DESIGN',
    slides: [
      { image: 'slides/slide-mp-landing.png', title: '启动页', desc: '森系绿渐变背景，几何马形图形，"开始"按钮引导进入。' },
      { image: 'slides/slide-mp-home.png', title: '首页', desc: '推荐作品、优秀校友、热门活动三大模块，卡片式布局突出内容。' },
      { image: 'slides/slide-mp-categories.png', title: '分类', desc: '8类设计分类采用玻璃拟态图标，强化品牌识别性。' },
      { image: 'slides/slide-mp-detail.png', title: '作品详情', desc: '大图预览配左右箭头切换，清晰划分信息区与评论区。' },
      { image: 'slides/slide-mp-comments.png', title: '评论', desc: '星级评分与互动反馈，统一图标风格降低互动门槛。' },
      { image: 'slides/slide-mp-social.png', title: '动态广场', desc: '动态内容与用户推荐模块化布局，强化社区属性。' },
      { image: 'slides/slide-mp-search.png', title: '搜索', desc: '' },
      { image: 'slides/slide-mp-profile.png', title: '个人中心', desc: '' }
    ]
  },
  {
    num: '03', title: '包装设计', subtitle: 'PACKAGING DESIGN',
    slides: [
      { image: 'slides/slide-pkg-scene1.png', title: '产品场景', desc: '龙井绿配色纸杯置于苍劲树枝上，中式美学意境。' },
      { image: 'slides/slide-pkg-scene2.png', title: '产品场景', desc: '' },
      { image: 'slides/slide-pkg-scene3.png', title: '产品场景', desc: '' },
      { image: 'slides/slide-pkg-scene4.png', title: '产品场景', desc: '' },
      { image: 'slides/slide-pkg-elem1.png', title: '纹样设计', desc: 'C形叶片标志，龙井茶叶形态抽象为装饰纹样。' },
      { image: 'slides/slide-pkg-elem2.png', title: '包装元素', desc: '' },
      { image: 'slides/slide-pkg-elem3.png', title: '包装元素', desc: '' },
      { image: 'slides/slide-pkg-elem4.png', title: '包装元素', desc: '' }
    ]
  },
  {
    num: '04', title: '海报设计', subtitle: 'POSTER DESIGN',
    slides: [
      { image: 'slides/slide-poster-pomelo1.png', title: '柚见常山', desc: '商业海报，柑橘产业为核心，北纬28°雨露滋养，绿色本味。' },
      { image: 'slides/slide-poster-pomelo2.png', title: '柚见常山', desc: '' },
      { image: 'slides/slide-poster-pomelo3.png', title: '柚见常山', desc: '' },
      { image: 'slides/slide-poster-dege1.png', title: '印象德格·八宝藏吉', desc: '藏八宝吉祥结为视觉主体，唐卡传统配色与对称构图。' },
      { image: 'slides/slide-poster-dege2.png', title: '印象德格', desc: '' },
      { image: 'slides/slide-poster-dege3.png', title: '印象德格', desc: '' },
      { image: 'slides/slide-poster-dege4.png', title: '印象德格', desc: '' },
      { image: 'slides/slide-poster-music1.png', title: '宝相花音乐可视化', desc: '纹样随音乐节奏动态变化，唐宋美学为底，AI与Processing技术融合。' },
      { image: 'slides/slide-poster-music2.png', title: '宝相花音乐可视化', desc: '' }
    ]
  }
];

/* ---------- Mini Program Data ---------- */
var miniProgramPages = [
  { id: '01', title: '启动页', image: 'slides/mp-01.png', description: '森系绿渐变背景，几何马形图形，引导进入作品集世界。' },
  { id: '02', title: '首页', image: 'slides/mp-02.png', description: '推荐作品、优秀校友、热门活动三大模块，卡片式布局。' },
  { id: '03', title: '分类', image: 'slides/mp-03.png', description: '8类设计分类采用玻璃拟态图标，强化品牌识别性。' },
  { id: '04', title: '作品详情', image: 'slides/mp-04.png', description: '大图预览配箭头切换，信息区与评论区清晰划分。' },
  { id: '05', title: '推荐首页', image: 'slides/mp-05.png', description: 'Banner轮播 + 推荐作品 + 优秀校友 + 热门活动。' },
  { id: '06', title: '动态广场', image: 'slides/mp-06.png', description: '动态内容与用户推荐模块化布局，强化社区属性。' },
  { id: '07', title: '搜索页', image: 'slides/mp-07.png', description: '智能推荐与历史记录，简洁输入交互。' },
  { id: '08', title: '个人中心', image: 'slides/mp-08.png', description: '个人主页，作品展示与数据统计，身份认证标识。' },
  { id: '09', title: '页面 09', image: 'slides/mp-09.png', description: 'UI 页面设计 09' },
  { id: '10', title: '页面 10', image: 'slides/mp-10.png', description: 'UI 页面设计 10' },
  { id: '11', title: '页面 11', image: 'slides/mp-11.png', description: 'UI 页面设计 11' },
  { id: '12', title: '搜索结果', image: 'slides/mp-12.png', description: '搜索结果页，筛选与排序，卡片式展示。' },
  { id: '13', title: '消息中心', image: 'slides/mp-13.png', description: '消息通知与互动，分类标签管理。' }
];


/* ---------- About 3D Digital Pass ---------- */
function AboutStarField() {
  var stars = [];
  for (var i = 0; i < 80; i++) {
    stars.push({ x: Math.random()*100, y: Math.random()*100, size: Math.random()*2+0.5, delay: Math.random()*4, duration: 3+Math.random()*3 });
  }
  return React.createElement('div', { style:{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' } },
    stars.map(function(s, i) {
      return React.createElement('div', { key:i, className:'about-star', style:{ left:s.x+'%', top:s.y+'%', width:s.size+'px', height:s.size+'px', animationDelay:s.delay+'s', animationDuration:s.duration+'s' } });
    })
  );
}

function AboutBackgroundGlow() {
  return React.createElement('div', { style:{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, background:'radial-gradient(ellipse 700px 550px at 50% 42%, rgba(59,130,246,0.2) 0%, rgba(99,102,241,0.1) 35%, transparent 65%)', animation:'about-glowPulse 6s ease-in-out infinite' } });
}

function AboutLeftPanel() {
  var timeState = useState('--:--');
  var time = timeState[0]; var setTime = timeState[1];
  useEffect(function() {
    var update = function() {
      var now = new Date();
      var t = now.toLocaleTimeString('en-GB', { timeZone:'Asia/Shanghai', hour:'2-digit', minute:'2-digit', hour12:false });
      setTime(t);
    };
    update();
    var id = setInterval(update, 1000);
    return function() { clearInterval(id); };
  }, []);
  var tags = ['UI/UX', '包装设计', '海报设计', '动效设计', 'C4D', '品牌设计', 'AI漫剧', '代码辅助设计'];
  return React.createElement('div', { className:'about-anim-left about-order-left', style:{ animationDelay:'0.15s' } },
    React.createElement('div', { style:{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:'20px', padding:'32px', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', boxShadow:'0 8px 40px rgba(0,0,0,0.3), 0 0 30px rgba(59,130,246,0.05)' } },
      React.createElement('p', { style:{ fontFamily:"'JetBrains Mono',monospace", fontSize:'13px', color:'rgba(255,255,255,0.3)', marginBottom:'20px' } }, '@yuxuan.design'),
      React.createElement('h1', { style:{ fontFamily:"'Noto Sans SC','Sora',sans-serif", fontWeight:700, fontSize:'32px', lineHeight:1.2, marginBottom:'16px' } }, '你好！我是王玉璇'),
      React.createElement('p', { style:{ fontSize:'14px', lineHeight:1.75, color:'rgba(255,255,255,0.55)', marginBottom:'24px', maxWidth:'320px' } }, '视觉传达设计师，浙江传媒学院在读。聚焦视觉设计、UI/UX界面设计、品牌视觉系统搭建与动态视觉创作，擅长以产品思维拆解需求，探索传统美学与现代视觉的融合表达。熟练运用设计软件与AI代码工具，主持省级大创项目，兼具设计创作与项目落地能力。'),
      React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'28px' } },
        tags.map(function(t, i) { return React.createElement('span', { key:i, className:'about-tag about-anim-up', style:{ animationDelay:(0.4+i*0.08)+'s' } }, t); })
      ),
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' } },
        React.createElement('svg', { width:14, height:14, viewBox:'0 0 24 24', fill:'none', stroke:'#3b82f6', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round' },
          React.createElement('path', { d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' }),
          React.createElement('circle', { cx:12, cy:10, r:3 })
        ),
        React.createElement('span', { style:{ fontSize:'13px', color:'rgba(255,255,255,0.55)' } }, '杭州, 中国')
      ),
      React.createElement('p', { style:{ fontSize:'12px', color:'rgba(255,255,255,0.3)', marginBottom:'28px', paddingLeft:'22px', fontFamily:"'JetBrains Mono',monospace" } }, time + ' GMT+8 \u00b7 本地时间'),
      React.createElement('div', { style:{ display:'flex', gap:'12px' } },
        React.createElement('a', { href:'#contact', className:'about-btn-outline', style:{textDecoration:'none'} }, '联系我'),
        React.createElement('button', { className:'about-btn-solid' }, '简历')
      )
    )
  );
}

function AboutCenterBadge() {
  var badgeRef = useRef(null);
  var targetRef = useRef({ x:0, y:0 });
  var currentRef = useRef({ x:0, y:0 });
  useEffect(function() {
    var badge = badgeRef.current;
    if (!badge) return;
    var onMove = function(ev) {
      var nx = (ev.clientX / window.innerWidth) * 2 - 1;
      var ny = (ev.clientY / window.innerHeight) * 2 - 1;
      targetRef.current.y = nx * 45;
      targetRef.current.x = -ny * 45;
    };
    window.addEventListener('mousemove', onMove);
    var onTouch = function(ev) {
      if (ev.touches.length > 0) {
        var nx = (ev.touches[0].clientX / window.innerWidth) * 2 - 1;
        var ny = (ev.touches[0].clientY / window.innerHeight) * 2 - 1;
        targetRef.current.y = nx * 45;
        targetRef.current.x = -ny * 45;
      }
    };
    window.addEventListener('touchmove', onTouch, { passive:true });
    var raf;
    var loop = function() {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;
      badge.style.transform = 'rotateX(' + currentRef.current.x.toFixed(2) + 'deg) rotateY(' + currentRef.current.y.toFixed(2) + 'deg)';
      raf = requestAnimationFrame(loop);
    };
    loop();
    return function() { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return React.createElement('div', { className:'about-badge-perspective about-anim-scale about-order-badge', style:{ animationDelay:'0.3s', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' } },
    React.createElement('div', { ref:badgeRef, className:'about-badge-3d', style:{ width:'280px', height:'380px', position:'relative' } },
      React.createElement('div', { style:{ position:'absolute', top:'50%', left:'50%', width:'360px', height:'460px', borderRadius:'28px', transform:'translate(-50%,-50%) translateZ(-30px)', background:'radial-gradient(ellipse at 50% 45%, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.2) 25%, rgba(99,102,241,0.1) 45%, transparent 65%)', animation:'about-badgeGlow 4s ease-in-out infinite', pointerEvents:'none' } }),
      React.createElement('div', { style:{ position:'absolute', top:'-70px', left:'50%', transform:'translateX(-50%) translateZ(5px)', width:'2px', height:'60px', background:'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))' } }),
      React.createElement('div', { style:{ position:'absolute', top:'-16px', left:'50%', transform:'translateX(-50%) translateZ(8px)', width:'54px', height:'18px', background:'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))', borderRadius:'4px 4px 10px 10px', border:'1px solid rgba(255,255,255,0.12)', boxShadow:'0 2px 6px rgba(0,0,0,0.3), 0 0 15px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' } }),
      React.createElement('div', { style:{ position:'absolute', inset:0, borderRadius:'18px', border:'1px solid rgba(59,130,246,0.25)', background:'linear-gradient(145deg, rgba(22,22,26,0.96), rgba(12,12,15,0.99))', boxShadow:'0 25px 70px rgba(0,0,0,0.55), 0 0 50px rgba(59,130,246,0.35), 0 0 100px rgba(59,130,246,0.15), inset 0 0 30px rgba(59,130,246,0.05), inset 0 1px 0 rgba(255,255,255,0.06)', overflow:'hidden', transform:'translateZ(0px)' } },
        React.createElement('div', { style:{ position:'absolute', top:'20px', left:'20px', right:'20px', height:'220px', borderRadius:'12px', overflow:'hidden', transform:'translateZ(5px)' } },
          React.createElement(PortfolioImage, { src:'about-portrait.jpg', alt:'王玉璇', style:{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' } })
        ),
        React.createElement('div', { style:{ position:'absolute', bottom:'82px', left:0, right:0, textAlign:'center', transform:'translateZ(20px)' } },
          React.createElement('p', { style:{ fontFamily:"'Noto Sans SC','Sora',sans-serif", fontWeight:600, fontSize:'24px', color:'white', letterSpacing:'0.05em' } }, '王玉璇')
        ),
        React.createElement('div', { style:{ position:'absolute', bottom:'68px', left:'40px', right:'40px', height:'1px', background:'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', transform:'translateZ(8px)' } }),
        React.createElement('div', { style:{ position:'absolute', bottom:'22px', left:0, right:0, textAlign:'center', transform:'translateZ(10px)' } },
          React.createElement('p', { style:{ fontSize:'11px', color:'rgba(255,255,255,0.45)', fontFamily:"'Sora',sans-serif", fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' } }, 'Digital Pass'),
          React.createElement('p', { style:{ fontSize:'9px', color:'rgba(255,255,255,0.2)', marginTop:'4px', fontFamily:"'JetBrains Mono',monospace" } }, 'Made in Spline')
        ),
        React.createElement('div', { style:{ position:'absolute', inset:0, borderRadius:'18px', pointerEvents:'none', background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 100%)', transform:'translateZ(2px)' } }),
        React.createElement('div', { style:{ position:'absolute', top:0, left:'20%', right:'20%', height:'2px', background:'linear-gradient(to right, transparent, rgba(59,130,246,0.8), transparent)', transform:'translateZ(5px)' } })
      )
    )
  );
}

function AboutRightPanel() {
  var socials = [
    { name:'Photoshop', icon:React.createElement('span',{style:{fontWeight:700,fontSize:'16px',color:'#31A8FF',fontFamily:"'Sora',sans-serif",letterSpacing:'-0.02em'}},'Ps') },
    { name:'Illustrator', icon:React.createElement('span',{style:{fontWeight:700,fontSize:'16px',color:'#FF9A00',fontFamily:"'Sora',sans-serif",letterSpacing:'-0.02em'}},'Ai') },
    { name:'Figma', icon:React.createElement('span',{style:{fontWeight:700,fontSize:'15px',color:'#F24E1E',fontFamily:"'Sora',sans-serif",letterSpacing:'-0.02em'}},'Fg') },
    { name:'After Effects', icon:React.createElement('span',{style:{fontWeight:700,fontSize:'16px',color:'#D291FF',fontFamily:"'Sora',sans-serif",letterSpacing:'-0.02em'}},'Ae') },
    { name:'C4D', icon:React.createElement('span',{style:{fontWeight:700,fontSize:'14px',color:'#4FC0FF',fontFamily:"'Sora',sans-serif",letterSpacing:'-0.02em'}},'C4D') },
    { name:'Claude Code', icon:React.createElement('span',{style:{fontWeight:700,fontSize:'16px',color:'#D97757',fontFamily:"'Sora',sans-serif",letterSpacing:'-0.02em'}},'CC') }
  ];
  var projects = [
    { name:'泰山皮影镇妖记', desc:'交互游戏视觉设计', color:'linear-gradient(135deg, rgba(234,88,12,0.4), rgba(124,45,18,0.3))' },
    { name:'视传作品集小程序', desc:'UI界面设计', color:'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(30,58,138,0.3))' },
    { name:'西湖龙井×霸王茶姬', desc:'联名包装设计', color:'linear-gradient(135deg, rgba(34,197,94,0.4), rgba(20,83,45,0.3))' },
    { name:'GUI页面设计', desc:'动态视觉设计', color:'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(88,28,135,0.3))' }
  ];
  return React.createElement('div', { className:'about-anim-right about-order-right', style:{ animationDelay:'0.25s' } },
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginBottom:'32px', maxWidth:'200px' } },
      socials.map(function(s, i) {
        return React.createElement('a', { key:i, href:'#', 'aria-label':s.name, className:'about-hex about-hex-bg', style:{ width:'52px', height:'52px', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none' } }, s.icon);
      })
    ),
    React.createElement('p', { style:{ fontSize:'13px', color:'rgba(255,255,255,0.3)', marginBottom:'16px', fontFamily:"'Sora',sans-serif", fontWeight:600, letterSpacing:'0.05em', textTransform:'uppercase' } }, '最新作品'),
    React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:'10px' } },
      projects.map(function(p, i) {
        return React.createElement('div', { key:i, className:'about-proj-item about-anim-up', style:{ animationDelay:(0.5+i*0.1)+'s' } },
          React.createElement('div', { style:{ width:'44px', height:'44px', borderRadius:'8px', background:p.color, flexShrink:0, border:'1px solid rgba(255,255,255,0.05)' } }),
          React.createElement('div', { style:{ minWidth:0, flex:1 } },
            React.createElement('p', { style:{ fontSize:'13px', fontWeight:600, color:'white', fontFamily:"'Noto Sans SC',sans-serif", whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, p.name),
            React.createElement('p', { style:{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'2px', fontFamily:"'Noto Sans SC',sans-serif", whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, p.desc)
          )
        );
      })
    )
  );
}

function About() {
  return React.createElement('section', { id:'about', className:'snap-slide relative min-h-screen py-8 px-6 overflow-hidden flex items-center', style:{ background:'#0c0c0c' } },
    React.createElement(AboutStarField),
    React.createElement(AboutBackgroundGlow),
    React.createElement('div', { className:'about-grid', style:{ position:'relative', zIndex:2, width:'100%', maxWidth:'72rem', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:'48px', alignItems:'center' } },
      React.createElement(AboutLeftPanel),
      React.createElement(AboutCenterBadge),
      React.createElement(AboutRightPanel)
    )
  );
}


/* ---------- About Sub-Section: Core Capabilities & Tools (v2) ---------- */
function AboutCapabilities() {
  var caps = [
    { title:'UI/UX界面设计', desc:'精通Figma完成全链路界面设计，独立搭建视觉规范与组件库，输出高保真可落地方案。' },
    { title:'品牌视觉与平面设计', desc:'主导联名包装、文旅海报、商业插画项目，输出完整统一的品牌视觉体系。' },
    { title:'动态视觉与AI影像创作', desc:'AE制作交互动效，天工画境完成AI漫剧生成，独立完成剪辑调色与成片输出。' },
    { title:'AI代码辅助设计落地', desc:'熟练运用Code X、Claude Code、Vibe Coding，基于设计规范快速生成前端页面与交互组件。' },
    { title:'项目统筹与落地执行', desc:'主持国家级大创省级立项项目，全流程覆盖申报、审批、落地；产品部实习经验，兼顾创意与可行性。' }
  ];
  var toolCats = [
    { label:'视觉设计', tools:['Photoshop', 'Illustrator', 'Figma'] },
    { label:'动态影像', tools:['After Effects', 'Processing', '专业剪辑软件'] },
    { label:'AI创作', tools:['天工画境'] },
    { label:'代码辅助', tools:['Code X', 'Claude Code', 'Vibe Coding'] },
    { label:'三维基础', tools:['Cinema 4D'] }
  ];
  return React.createElement('section', { className:'about-sub' },
    React.createElement(AboutStarField),
    React.createElement(AboutBackgroundGlow),
    React.createElement('div', { className:'about-sub-inner about-sub-reveal', style:{animationDelay:'0.1s'} },
      React.createElement('div', { className:'about-sub-head' },
        React.createElement('div', null,
          React.createElement('p', { className:'about-sub-eyebrow' }, '// 01 — Capabilities & Tools'),
          React.createElement('h2', { className:'about-sub-title', style:{marginBottom:'0'} }, '核心能力与工具栈')
        ),
        React.createElement('span', { className:'about-sub-bignum' }, '01')
      ),
      React.createElement('div', { className:'about-cap-split' },
        /* Left: Capabilities as numbered editorial list */
        React.createElement('div', { className:'about-cap-list' },
          caps.map(function(c, i) {
            return React.createElement('div', { key:i, className:'about-cap-row about-sub-reveal', style:{animationDelay:(0.15+i*0.08)+'s'} },
              React.createElement('span', { className:'about-cap-rownum' }, String(i+1).padStart(2,'0')),
              React.createElement('div', { className:'about-cap-rowbody' },
                React.createElement('h3', { className:'about-cap-rowtitle' }, c.title),
                React.createElement('p', { className:'about-cap-rowdesc' }, c.desc)
              )
            );
          })
        ),
        /* Right: Tool stack panel */
        React.createElement('div', { className:'about-tool-panel' },
          React.createElement('p', { className:'about-tool-panel-head' }, 'Tool Stack'),
          toolCats.map(function(cat, i) {
            return React.createElement('div', { key:i, className:'about-tool-sec' },
              React.createElement('p', { className:'about-tool-sec-label' }, cat.label),
              React.createElement('div', { className:'about-tool-sec-tags' },
                cat.tools.map(function(t, j) {
                  return React.createElement('span', { key:j, className:'about-tool-tag' }, t);
                })
              )
            );
          })
        )
      )
    )
  );
}

/* ---------- About Sub-Section: Software Tool Stack ---------- */
function AboutToolStack() {
  var categories = [
    { label:'视觉设计', tools:['Photoshop', 'Illustrator', 'Figma'] },
    { label:'动态影像', tools:['After Effects', 'Processing', '专业剪辑软件'] },
    { label:'AI创作', tools:['天工画境（AI漫剧生成）'] },
    { label:'代码辅助', tools:['Code X', 'Claude Code', 'Vibe Coding'] },
    { label:'三维基础', tools:['Cinema 4D'] }
  ];
  return React.createElement('section', { className:'about-sub' },
    React.createElement(AboutStarField),
    React.createElement(AboutBackgroundGlow),
    React.createElement('div', { className:'about-sub-inner about-sub-reveal', style:{animationDelay:'0.1s'} },
      React.createElement('p', { className:'about-sub-eyebrow' }, '// Tool Stack'),
      React.createElement('h2', { className:'about-sub-title' }, '软件工具栈'),
      React.createElement('div', { className:'about-sub-card', style:{padding:'32px'} },
        React.createElement('div', { className:'about-tool-row' },
          categories.map(function(cat, i) {
            return React.createElement('div', { key:i, className:'about-tool-cat' },
              React.createElement('span', { className:'about-tool-label' }, cat.label),
              React.createElement('div', { className:'about-tool-tags' },
                cat.tools.map(function(t, j) {
                  return React.createElement('span', { key:j, className:'about-tool-tag' }, t);
                })
              )
            );
          })
        )
      )
    )
  );
}

/* ---------- About Sub-Section: Featured Projects ---------- */
function AboutFeaturedProjects() {
  var projects = [
    { name:'《泰山皮影镇妖记》交互游戏视觉设计', role:'主视觉设计师', desc:'非遗皮影IP全套角色、纹样、游戏UI规范设计，适配前端交互开发标准。', image:'slides/slide-game-cover.png' },
    { name:'视传作品集小程序界面设计', role:'独立设计师', desc:'轻量化文艺界面，搭建完整页面组件、交互逻辑与全局视觉规范。', image:'slides/slide-mp-landing.png' },
    { name:'西湖龙井 × 霸王茶姬 联名包装设计', role:'独立设计师', desc:'融合东方茶文化与品牌基因，完成全套包装纹样、色彩体系与物料设计。', image:'slides/slide-pkg-scene1.png' },
    { name:'AI漫剧动态影像项目', role:'主创', desc:'依托天工画境完成漫剧分镜与AI画面生成，搭配剪辑动效输出完整成片。', image:'slides/slide-poster-dege1.png' }
  ];
  return React.createElement('section', { className:'about-sub' },
    React.createElement(AboutStarField),
    React.createElement(AboutBackgroundGlow),
    React.createElement('div', { className:'about-sub-inner about-sub-reveal', style:{animationDelay:'0.1s'} },
      React.createElement('p', { className:'about-sub-eyebrow' }, '// Featured Projects'),
      React.createElement('h2', { className:'about-sub-title' }, '精选代表项目'),
      React.createElement('div', { className:'about-proj-grid' },
        projects.map(function(p, i) {
          return React.createElement('div', { key:i, className:'about-proj-card about-sub-reveal', style:{animationDelay:(0.2+i*0.12)+'s'} },
            React.createElement('div', { className:'about-proj-cover' },
              p.image ? React.createElement(PortfolioImage, { src:p.image, alt:p.name, loading:'lazy' })
                : React.createElement('div', { className:'about-proj-cover-placeholder' },
                    React.createElement('span', { style:{fontFamily:"'EB Garamond',serif", fontStyle:'italic', fontSize:'2rem', color:'rgba(255,255,255,0.15)'} }, String(i+1).padStart(2,'0'))
                  )
            ),
            React.createElement('div', { className:'about-proj-body' },
              React.createElement('h3', { className:'about-proj-name' }, p.name),
              React.createElement('p', { className:'about-proj-role' }, p.role),
              React.createElement('p', { className:'about-proj-desc' }, p.desc)
            )
          );
        })
      )
    )
  );
}

/* ---------- About Sub-Section: Honors & Experience (v2) ---------- */
function AboutHonorsExperience() {
  var honors = [
    { name:'国家大学生创新创业训练计划 省级立项', meta:'项目负责人' },
    { name:'国家励志奖学金、校级奖学金', meta:'学业荣誉' },
    { name:'"印象德格"设计大赛 三等奖', meta:'设计竞赛' },
    { name:'桐乡茅盾大讲堂 Logo 设计项目 中标', meta:'设计中标' }
  ];
  var experiences = [
    { company:'天工画境', role:'AI漫剧生成与剪辑师', desc:'把控漫剧视觉风格，负责AI画面调试、分镜落地与后期剪辑成片，统一项目视觉调性。' },
    { company:'赵汝飞练字总部', role:'产品部助理', desc:'负责产品动效制作、视觉物料输出，参与需求梳理与项目跟进。' }
  ];
  return React.createElement('section', { className:'about-sub' },
    React.createElement(AboutStarField),
    React.createElement(AboutBackgroundGlow),
    React.createElement('div', { className:'about-sub-inner about-sub-reveal', style:{animationDelay:'0.1s'} },
      React.createElement('div', { className:'about-sub-head' },
        React.createElement('div', null,
          React.createElement('p', { className:'about-sub-eyebrow' }, '// 02 — Honors & Experience'),
          React.createElement('h2', { className:'about-sub-title', style:{marginBottom:'0'} }, '荣誉与履历')
        ),
        React.createElement('span', { className:'about-sub-bignum' }, '02')
      ),
      React.createElement('div', { className:'about-hon-split' },
        /* Left: Awards as numbered list */
        React.createElement('div', null,
          React.createElement('p', { className:'about-section-label' }, 'Awards'),
          React.createElement('div', { className:'about-award-list' },
            honors.map(function(h, i) {
              return React.createElement('div', { key:i, className:'about-award-row about-sub-reveal', style:{animationDelay:(0.15+i*0.08)+'s'} },
                React.createElement('span', { className:'about-award-rownum' }, String(i+1).padStart(2,'0')),
                React.createElement('div', { className:'about-award-rowbody' },
                  React.createElement('p', { className:'about-award-rowname' }, h.name),
                  React.createElement('p', { className:'about-award-rowmeta' }, h.meta)
                )
              );
            })
          )
        ),
        /* Right: Experience as cards */
        React.createElement('div', null,
          React.createElement('p', { className:'about-section-label' }, 'Experience'),
          React.createElement('div', { className:'about-exp-list' },
            experiences.map(function(exp, i) {
              return React.createElement('div', { key:i, className:'about-exp-card2 about-sub-reveal', style:{animationDelay:(0.2+i*0.1)+'s'} },
                React.createElement('div', { className:'about-exp-card2-head' },
                  React.createElement('span', { className:'about-exp-card2-co' }, exp.company),
                  React.createElement('span', { className:'about-exp-card2-role' }, exp.role)
                ),
                React.createElement('p', { className:'about-exp-card2-desc' }, exp.desc)
              );
            })
          )
        )
      )
    )
  );
}

/* ---------- Contact Section ---------- */
function Contact() {
  var contacts = [
    { label:'邮箱', value:'1617721560@qq.com', href:'mailto:1617721560@qq.com' },
    { label:'电话', value:'18768328359', href:'tel:18768328359' },
    { label:'微信', value:'treasure0328x', href:null }
  ];
  return React.createElement('section', { id: 'contact', className: 'snap-slide relative bg-black min-h-screen py-20 md:py-32 px-6 overflow-hidden flex items-center' },
    React.createElement('div', { className: 'max-w-4xl mx-auto text-center w-full' },
      React.createElement(Reveal, { y: 20, duration: 0.6 },
        React.createElement('p', { className: 'text-white/40 text-sm tracking-widest uppercase mb-6 font-mono' }, '// Contact')
      ),
      React.createElement(StaggeredFade, { text: '联系我', className: 'font-serif italic text-white text-4xl md:text-6xl lg:text-7xl tracking-tight mb-8' }),
      React.createElement(Reveal, { delay: 0.3, y: 20, duration: 0.6 },
        React.createElement('p', { className: 'text-white/50 text-sm sm:text-base max-w-md mx-auto mb-12 leading-relaxed' }, '欢迎交流合作，期待与您共同创造有价值的视觉体验。')
      ),
      React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-4' },
        contacts.map(function(c, i) {
          var inner = React.createElement('div', { className: 'liquid-glass rounded-2xl p-6 text-left transition-colors hover:bg-white/5 h-full' },
            React.createElement('p', { className: 'text-white/40 text-xs uppercase tracking-widest mb-2' }, c.label),
            React.createElement('p', { className: 'text-white text-sm font-medium break-all' }, c.value)
          );
          return React.createElement(Reveal, { key: c.label, delay: i * 0.1, y: 30, duration: 0.5 },
            c.href ? React.createElement('a', { href: c.href, className: 'block h-full' }, inner) : inner);
        })
      )
    )
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return React.createElement('footer', { className: 'bg-black py-8 px-6 border-t border-white/5' },
    React.createElement('div', { className: 'max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3' },
      React.createElement('p', { className: 'text-white/30 text-xs' }, '© 2026 王玉璇 · 视觉传达设计'),
      React.createElement('p', { className: 'text-white/30 text-xs font-serif italic' }, 'Designed with intention.')
    )
  );
}

/* ---------- Chapter Divider (cc- prefix) ---------- */
var ccChapters = {
  game: {
    categoryId: 'game-design', num: '01',
    en: 'INTERACTIVE\nGAME DESIGN', cn: '交互游戏设计',
    desc: 'GAME EXPERIENCE  ·  INTERACTION SYSTEM', accent: '#7864C8'
  },
  gameUI: {
    categoryId: 'game-ui', num: '02',
    en: 'GAME UI\nDESIGN', cn: '游戏UI设计',
    desc: 'GAME INTERFACE  ·  HUD  ·  VISUAL SYSTEM', accent: '#A8BF67'
  },
  digital: {
    categoryId: 'digital-design', num: '03',
    en: 'DIGITAL INTERFACE\nDESIGN', cn: '数字界面设计',
    desc: 'DIGITAL PRODUCT  ·  INTERFACE EXPERIENCE', accent: '#6B8A5A'
  },
  visualPackaging: {
    categoryId: 'visual-design', num: '04',
    en: 'VISUAL DESIGN\nPACKAGING', cn: '视觉设计 · 包装设计',
    desc: '01 / PACKAGING DESIGN', accent: '#B49664'
  },
  visualPoster: {
    categoryId: 'visual-design', num: '04',
    en: 'VISUAL DESIGN\nPOSTER', cn: '视觉设计 · 海报设计',
    desc: '02 / POSTER DESIGN', accent: '#C83C3C'
  }
};

function ChapterDivider(props) {
  var chapter = props.chapter;
  var result = useInView({ threshold: 0.15 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  /* Build category navigation from the shared registry. */
  var navItems = portfolioCategories.map(function(item, i) {
    var isActive = (item.id === chapter.categoryId) ? ' is-active' : '';
    return React.createElement(React.Fragment, { key: item.id },
      React.createElement('a', {
        className: 'cc-nav-item' + isActive,
        href: item.href
      },
        React.createElement('span', { className: 'cc-nav-num' }, item.num),
        React.createElement('span', null, item.navLabel)
      ),
      i < portfolioCategories.length - 1 ? React.createElement('span', { key: 'sep-' + i, className: 'cc-nav-sep' }) : null
    );
  });

  /* Split English title into lines */
  var enLines = chapter.en.split('\n');

  return React.createElement('section', {
    ref: ref,
    id: props.sectionId,
    className: 'cc-section snap-slide' + viewClass,
    'data-chapter': chapter.num
  },
    /* Top labels */
    React.createElement('div', { className: 'cc-top cc-anim cc-anim-1' },
      React.createElement('div', { className: 'cc-top-left' },
        'PERSONAL',
        React.createElement('br'),
        'PORTFOLIO'
      ),
      React.createElement('div', { className: 'cc-top-right' },
        'KEEP',
        React.createElement('br'),
        'EXPLORING'
      )
    ),
    /* Center content */
    React.createElement('div', { className: 'cc-center' },
      /* Huge background number */
      React.createElement('span', { className: 'cc-number' }, chapter.num),
      /* Title block */
      React.createElement('div', { className: 'cc-title-block' },
        enLines.map(function(line, i) {
          return React.createElement('span', { key: i, className: 'cc-title-en cc-anim cc-anim-' + (2 + i) }, line);
        }),
        React.createElement('span', { className: 'cc-title-cn cc-anim cc-anim-4' }, chapter.cn),
        React.createElement('div', { className: 'cc-divider-line cc-anim cc-anim-4' }),
        React.createElement('span', { className: 'cc-desc cc-anim cc-anim-5' }, chapter.desc)
      )
    ),
    /* Bottom navigation bar */
    React.createElement('div', { className: 'cc-nav cc-anim cc-anim-5' }, navItems)
  );
}

/* Each chapter loads shortly before it is read; the dividers stay available to navigation. */
var chapterFiles = {
  gameDesign: 'game-design.js',
  gameUI: 'game-ui.js',
  digital: 'digital.js',
  packaging: 'packaging.js',
  poster: 'poster.js'
};
var chapterLoads = {};
function loadPortfolioChapter(name) {
  if (window.PortfolioChapters[name]) return Promise.resolve();
  if (chapterLoads[name]) return chapterLoads[name];
  chapterLoads[name] = new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.src = 'assets/chapters/' + chapterFiles[name];
    script.async = true;
    script.onload = function() {
      if (window.PortfolioChapters[name]) resolve();
      else reject(new Error('Chapter renderer is missing: ' + name));
    };
    script.onerror = function() {
      script.remove();
      reject(new Error('Chapter failed to load: ' + name));
    };
    document.head.appendChild(script);
  }).catch(function(error) {
    delete chapterLoads[name];
    throw error;
  });
  return chapterLoads[name];
}

function hashTargetsChapter(name, hash) {
  if (!hash) return false;
  var prefixes = {
    gameDesign: ['game-design-', 'cs-', 'section-01'],
    gameUI: ['game-ui-', 'section-game-ui'],
    digital: ['mp-', 'mini-', 'section-02'],
    packaging: ['packaging-', 'pkg2-', 'pkg4-', 'section-03'],
    poster: ['poster-', 'section-04']
  };
  return prefixes[name].some(function(prefix) { return hash.indexOf(prefix) === 0; });
}

function LazyChapter(props) {
  var sentinel = useRef(null);
  var loadedState = useState(!!window.PortfolioChapters[props.name]);
  var loaded = loadedState[0];
  var setLoaded = loadedState[1];
  var errorState = useState(false);
  var failed = errorState[0];
  var setFailed = errorState[1];
  function startLoading() {
    setFailed(false);
    loadPortfolioChapter(props.name).then(function() { setLoaded(true); }, function(error) {
      console.error(error);
      setFailed(true);
    });
  }
  useEffect(function() {
    function onHashChange() {
      if (hashTargetsChapter(props.name, window.location.hash.slice(1))) startLoading();
    }
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    var observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          startLoading();
          observer.disconnect();
        }
      }, { rootMargin: '2200px 0px', threshold: 0 });
      observer.observe(sentinel.current);
    } else {
      startLoading();
    }
    return function() {
      window.removeEventListener('hashchange', onHashChange);
      if (observer) observer.disconnect();
    };
  }, [props.name]);
  useEffect(function() {
    if (!loaded) return;
    window.dispatchEvent(new Event('portfolio:chapter-ready'));
    var hash = window.location.hash.slice(1);
    if (!hashTargetsChapter(props.name, hash)) return;
    var target = document.getElementById(hash);
    if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [loaded, props.name]);
  return React.createElement(React.Fragment, null,
    React.createElement('span', { ref: sentinel, className: 'chapter-load-sentinel', 'aria-hidden': 'true' }),
    React.createElement(ChapterDivider, { chapter: props.chapter, sectionId: props.sectionId }),
    loaded ? window.PortfolioChapters[props.name]() :
      React.createElement('div', {
        className: 'chapter-await',
        style: { minHeight: props.reserve },
        'aria-busy': !failed
      }, failed ? React.createElement('button', { type: 'button', onClick: startLoading }, '重新加载本章') : null)
  );
}

function App() {
  useEffect(function() {
    function scrollToCurrentHash() {
      var id = window.location.hash ? window.location.hash.slice(1) : '';
      if (!id) return;
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    var frame = window.requestAnimationFrame(scrollToCurrentHash);
    var settleTimer = window.setTimeout(scrollToCurrentHash, 900);
    window.addEventListener('hashchange', scrollToCurrentHash);
    window.addEventListener('load', scrollToCurrentHash);
    return function() {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener('hashchange', scrollToCurrentHash);
      window.removeEventListener('load', scrollToCurrentHash);
    };
  }, []);

  return React.createElement(React.Fragment, null,
    React.createElement(ProjectAssetWarmup),
    React.createElement(ScrollProgress),
    React.createElement(Navbar),
    React.createElement(Hero),
    React.createElement(TableOfContents),
    React.createElement(About),
    React.createElement(AboutCapabilities),
    React.createElement(AboutHonorsExperience),
    React.createElement(LazyChapter, { key: 'chapter-game', name: 'gameDesign', chapter: ccChapters.game, sectionId: 'section-01', reserve: '900svh' }),
    React.createElement(LazyChapter, { key: 'chapter-game-ui', name: 'gameUI', chapter: ccChapters.gameUI, sectionId: 'section-game-ui', reserve: '1500svh' }),
    React.createElement(LazyChapter, { key: 'chapter-digital', name: 'digital', chapter: ccChapters.digital, sectionId: 'section-02', reserve: '930svh' }),
    React.createElement(LazyChapter, { key: 'chapter-packaging', name: 'packaging', chapter: ccChapters.visualPackaging, sectionId: 'section-03', reserve: '620svh' }),
    React.createElement(LazyChapter, { key: 'chapter-poster', name: 'poster', chapter: ccChapters.visualPoster, sectionId: 'section-04', reserve: '350svh' }),
    React.createElement(Contact),
    React.createElement(Footer),
    React.createElement(BackToTop)
  );
}

/* ---------- Render ---------- */
try {
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
} catch(e) {
  console.error(e);
  document.getElementById('root').innerHTML = '<div style="padding:40px;color:#fff;background:#000;min-height:100vh;font-family:monospace;">Error: ' + (e.message || 'Unknown') + '</div>';
}
