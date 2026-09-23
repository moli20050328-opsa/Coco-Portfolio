/* ---------- Visual Design / Poster exhibition ---------- */
var posterAssetRoot = 'poster-assets/';

function usePosterSectionMotion(sectionRef) {
  useLayoutEffect(function() {
    var root = sectionRef.current;
    if (!root) return;
    var items = Array.from(root.querySelectorAll('.poster-case__reveal'));
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function(item) { item.classList.add('is-visible'); });
      return;
    }

    root.classList.add('poster-motion-ready');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });

    items.forEach(function(item) { observer.observe(item); });
    return function() { observer.disconnect(); };
  }, []);
}

function usePosterVideoPlayback(sectionRef) {
  useEffect(function() {
    var root = sectionRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    var videos = Array.from(root.querySelectorAll('video'));
    if (!videos.length) return;

    function playVideo(video) {
      video.muted = true;
      var playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(function() {});
      }
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var video = entry.target;
        video.dataset.posterNear = entry.isIntersecting ? 'true' : 'false';
        if (entry.isIntersecting && !document.hidden) playVideo(video);
        else video.pause();
      });
    }, { threshold: 0.01, rootMargin: '280px 0px 280px 0px' });

    videos.forEach(function(video) {
      video.muted = true;
      observer.observe(video);
    });

    function handleVisibility() {
      videos.forEach(function(video) {
        if (document.hidden || video.dataset.posterNear !== 'true') video.pause();
        else playVideo(video);
      });
    }

    document.addEventListener('visibilitychange', handleVisibility);
    return function() {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      videos.forEach(function(video) { video.pause(); });
    };
  }, []);
}

function PosterProject(props) {
  var ref = useRef(null);
  usePosterSectionMotion(ref);
  usePosterVideoPlayback(ref);
  var headingId = props.id + '-title';
  var layoutClass = props.align === 'right' ? ' poster-case--offset' : '';
  if (props.closing) layoutClass += ' poster-case--closing';

  return React.createElement('section', {
    ref: ref,
    id: props.id,
    className: 'poster-case' + layoutClass,
    'aria-labelledby': headingId,
    'data-poster-project': props.number
  },
    React.createElement('div', { className: 'poster-case__inner' },
      React.createElement('header', {
        className: 'poster-case__copy poster-case__reveal',
        style: { '--poster-delay': '0ms' }
      },
        React.createElement('p', { className: 'poster-case__meta' }, props.number + ' / ' + props.category),
        React.createElement('h2', { id: headingId, className: 'poster-case__title' }, props.title),
        React.createElement('p', { className: 'poster-case__description' }, props.description)
      ),
      React.createElement('div', { className: 'poster-case__triptych', 'aria-label': props.title + '系列海报' },
        props.works.map(function(work, index) {
          var mediaProps = {
            src: posterAssetRoot + work.src,
            'aria-label': work.alt
          };
          var media;
          if (work.type === 'video') {
            media = React.createElement(DeferredVideo, Object.assign({}, mediaProps, {
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              preload: 'metadata',
              controls: false,
              'webkit-playsinline': 'true'
            }));
          } else {
            media = React.createElement(PortfolioImage, Object.assign({}, mediaProps, {
              alt: work.alt,
              width: work.width,
              height: work.height,
              loading: 'lazy',
              decoding: 'async'
            }));
          }
          return React.createElement('figure', {
            key: work.src,
            className: 'poster-case__work poster-case__reveal',
            style: { '--poster-delay': (index * 110) + 'ms' }
          }, media);
        })
      )
    )
  );
}

var posterProjects = [
  {
    id: 'poster-pomelo',
    number: '01',
    category: 'COMMERCIAL POSTER',
    title: '柚见常山',
    description: '以常山胡柚的果实、切面与枝叶为核心视觉元素，通过明快的黄绿配色与尺度变化建立系列化构图，在统一视觉语言中呈现胡柚自然、清新的地域产品特征。',
    align: 'left',
    works: [
      { type: 'image', src: '柚见常山_画板 1.png', alt: '柚见常山商业海报一', width: 2481, height: 3508 },
      { type: 'image', src: '柚见常山_画板 1 副本.png', alt: '柚见常山商业海报二', width: 2482, height: 3508 },
      { type: 'image', src: '柚见常山_画板 1 副本 2_画板 1 副本 2.png', alt: '柚见常山商业海报三', width: 2481, height: 3508 }
    ]
  },
  {
    id: 'poster-lotus',
    number: '02',
    category: 'MUSIC VISUALIZATION',
    title: '莲纹映月',
    description: '以传统宝相花纹样为视觉母体，将音乐节奏、频率与音符强弱映射为图形动态变化，使传统纹样随声音产生形态演变，探索音乐信息与东方装饰语言之间的可视化表达。',
    align: 'right',
    works: [
      { type: 'video', src: '1.mp4', alt: '莲纹映月音乐可视化海报一' },
      { type: 'video', src: '2.mp4', alt: '莲纹映月音乐可视化海报二' },
      { type: 'video', src: '3.mp4', alt: '莲纹映月音乐可视化海报三' }
    ]
  },
  {
    id: 'poster-tibetan',
    number: '03',
    category: 'CULTURAL POSTER',
    title: '八宝藏吉',
    description: '提取藏八宝中的吉祥符号，通过几何化重构、对称构图与藏式传统配色建立系列视觉语言，在保留文化识别性的同时，以当代图形方式呈现吉祥圆满的文化寓意。',
    align: 'left',
    closing: true,
    works: [
      { type: 'video', src: '宝瓶纹.mp4', alt: '八宝藏吉宝瓶纹动态海报' },
      { type: 'video', src: '吉祥纹.mp4', alt: '八宝藏吉吉祥纹动态海报' },
      { type: 'video', src: '胜利幢.mp4', alt: '八宝藏吉胜利幢动态海报' }
    ]
  }
];

window.PortfolioChapters.poster = function() {
  return posterProjects.map(function(project) {
    return React.createElement(PosterProject, Object.assign({ key: project.id }, project));
  });
};
