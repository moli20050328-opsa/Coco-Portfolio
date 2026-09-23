/* ---------- Game UI case study (extracted from the real prototype) ---------- */
function GameUICaseCover() {
  var result = useInView({ threshold: 0.12 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';

  return React.createElement('section', {
    ref: ref,
    id: 'game-ui-case-cover',
    className: 'gui-case gui-case--cover snap-slide' + viewClass,
    'aria-labelledby': 'game-ui-case-title'
  },
    React.createElement('div', { className: 'gui-case__inner' },
      React.createElement('div', { className: 'gui-case__eyebrow gui-anim' },
        React.createElement('span', null, '02 / GAME UI DESIGN'),
        React.createElement('span', null, 'CASE STUDY 01 / 03')
      ),
      React.createElement('div', { className: 'gui-case__head gui-anim gui-anim-2' },
        React.createElement('div', null,
          React.createElement('h2', { id: 'game-ui-case-title', className: 'gui-case__title' },
            'GAME UI DESIGN',
            React.createElement('span', { className: 'gui-case__title-cn' }, '游戏界面设计')
          )
        ),
        React.createElement('div', null,
          React.createElement('h3', { className: 'gui-case__project-name' },
            '侵蚀序章',
            React.createElement('span', null, 'TALENT SYSTEM DESIGN')
          ),
          React.createElement('p', { className: 'gui-case__intro' }, '以角色成长与侵蚀机制为核心的游戏天赋系统界面设计。围绕中心节点、四向成长路径与状态反馈，完成从系统架构、视觉设计到 HTML 交互原型的完整设计。'),
          React.createElement('ul', { className: 'gui-case__tags', 'aria-label': '设计重点' },
            ['系统架构','成长路径','交互反馈'].map(function(item) {
              return React.createElement('li', { key: item }, item);
            })
          )
        )
      ),
      React.createElement('figure', { className: 'gui-case__hero gui-anim gui-anim-3' },
        React.createElement(PortfolioImage, {
          src: 'game-ui-erosion-hero.jpg',
          alt: '侵蚀序章天赋系统最终界面效果图',
          loading: 'lazy',
          decoding: 'async'
        }),
        React.createElement('figcaption', { className: 'gui-case__hero-label' }, 'FINAL INTERFACE / TALENT NETWORK')
      )
    )
  );
}

function GameUISystemAnalysis() {
  var result = useInView({ threshold: 0.12 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  var modules = [
    { num: '01', cn: '信息架构', en: 'INFORMATION STRUCTURE', text: '以“宿主核心”为视觉与功能中心，四条成长路径向外延展，让玩家能够快速理解当前成长方向与节点关系。' },
    { num: '02', cn: '交互反馈', en: 'INTERACTION FEEDBACK', text: '通过节点激活、路径高亮与状态变化建立操作反馈，强化“选择、确认、成长”的操作过程。' },
    { num: '03', cn: '视觉语言', en: 'VISUAL SYSTEM', text: '使用深色界面、低饱和环境色与高亮状态色区分信息层级，在废土 / 生化氛围下保持系统信息的可读性。' }
  ];

  return React.createElement('section', {
    ref: ref,
    id: 'game-ui-system-analysis',
    className: 'gui-case gui-case--analysis snap-slide' + viewClass,
    'aria-labelledby': 'game-ui-analysis-title'
  },
    React.createElement('div', { className: 'gui-case__inner' },
      React.createElement('div', { className: 'gui-case__eyebrow gui-anim' },
        React.createElement('span', null, 'SYSTEM STRUCTURE'),
        React.createElement('span', null, 'CASE STUDY 02 / 03')
      ),
      React.createElement('div', { className: 'gui-case__section-head gui-anim gui-anim-2' },
        React.createElement('h2', { id: 'game-ui-analysis-title' },
          '天赋系统结构分析',
          React.createElement('span', null, 'TALENT SYSTEM')
        ),
        React.createElement('span', { className: 'gui-case__section-index' }, 'INFORMATION / FEEDBACK / VISUAL')
      ),
      React.createElement('div', { className: 'gui-case__analysis-grid gui-anim gui-anim-3' },
        React.createElement('figure', { className: 'gui-case__analysis-visual' },
          React.createElement(PortfolioImage, {
            src: 'game-ui-erosion-hero.jpg',
            alt: '侵蚀序章天赋网络界面结构',
            loading: 'lazy',
            decoding: 'async'
          })
        ),
        React.createElement('ol', { className: 'gui-case__modules' },
          modules.map(function(item) {
            return React.createElement('li', { key: item.num, className: 'gui-case__module' },
              React.createElement('span', { className: 'gui-case__module-num' }, item.num),
              React.createElement('div', null,
                React.createElement('h3', null,
                  item.cn,
                  React.createElement('span', null, item.en)
                ),
                React.createElement('p', null, item.text)
              )
            );
          })
        )
      )
    )
  );
}

function GameUIMotionPreview() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  var steps = ['节点查看','路径选择','状态反馈','重置确认'];
  var flowNodes = [];
  steps.forEach(function(step, index) {
    if (index > 0) {
      flowNodes.push(React.createElement('span', { key: 'arrow-' + index, className: 'gui-case__flow-arrow', 'aria-hidden': 'true' }, '→'));
    }
    flowNodes.push(React.createElement('span', { key: step, className: 'gui-case__flow-step' }, step));
  });

  return React.createElement('section', {
    ref: ref,
    id: 'game-ui-motion-preview',
    className: 'gui-case gui-case--motion snap-slide' + viewClass,
    'aria-labelledby': 'game-ui-motion-title'
  },
    React.createElement('div', { className: 'gui-case__inner' },
      React.createElement('div', { className: 'gui-case__eyebrow gui-anim' },
        React.createElement('span', null, 'HTML INTERACTION IMPLEMENTATION'),
        React.createElement('span', null, 'CASE STUDY 03 / 03')
      ),
      React.createElement('div', { className: 'gui-case__section-head gui-anim gui-anim-2' },
        React.createElement('h2', { id: 'game-ui-motion-title' },
          '动态交互展示',
          React.createElement('span', null, 'MOTION PREVIEW')
        ),
        React.createElement('div', { className: 'gui-case__motion-note' },
          React.createElement('strong', null, 'INTERACTIVE HTML PROTOTYPE'),
          React.createElement('span', null, '通过 HTML 原型验证节点选择、路径反馈与重置确认。')
        )
      ),
      React.createElement('div', { className: 'gui-case__video-frame gui-anim gui-anim-3' },
        React.createElement(DeferredVideo, {
          className: 'gui-case__video',
          src: 'game-ui-erosion-motion.mp4',
          poster: 'game-ui-erosion-hero.jpg',
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          preload: 'metadata',
          disablePictureInPicture: true,
          'aria-label': '侵蚀序章天赋系统动态交互演示'
        })
      ),
      React.createElement('div', { className: 'gui-case__flow gui-anim gui-anim-3', 'aria-label': '天赋系统交互流程' }, flowNodes),
      React.createElement('div', { className: 'gui-case__reset-evidence gui-anim gui-anim-3' },
        React.createElement('div', { className: 'gui-case__reset-head' },
          React.createElement('div', null,
            React.createElement('span', { className: 'gui-case__reset-label' }, 'RESET CONFIRMATION'),
            React.createElement('h3', null, '重置确认')
          ),
          React.createElement('p', null, '在回收已激活天赋前，通过二次确认明确操作后果，并提供取消与确认重置两种选择。')
        ),
        React.createElement('figure', { className: 'gui-case__reset-visual' },
          React.createElement('span', { className: 'gui-case__reset-visual-picture' },
            React.createElement(PortfolioImage, {
              src: 'game-ui-erosion-reset-confirm.png',
              alt: '侵蚀序章确认重置天赋界面，包含取消与确认重置操作',
              loading: 'lazy',
              decoding: 'async'
            })
          ),
          React.createElement('figcaption', null,
            React.createElement('span', null, 'RESET / CONFIRMATION STATE'),
            React.createElement('span', null, '现有 HTML 原型运行界面')
          )
        )
      )
    )
  );
}

function ShuaituCaseCover() {
  var result = useInView({ threshold: 0.1 });
  var ref = result[0]; var inView = result[1];
  var viewClass = inView ? ' in-view' : '';
  var keywords = [
    { cn: '角色表现', en: 'CHARACTER' },
    { cn: '信息层级', en: 'HIERARCHY' },
    { cn: '策略氛围', en: 'STRATEGY' }
  ];

  return React.createElement('section', {
    ref: ref,
    id: 'game-ui-shuaitu-cover',
    className: 'stu-case stu-case--cover snap-slide' + viewClass,
    'aria-labelledby': 'game-ui-shuaitu-title'
  },
    React.createElement('div', { className: 'stu-case__inner' },
      React.createElement('div', { className: 'stu-case__topline stu-anim' },
        React.createElement('span', null, 'GAME UI DESIGN'),
        React.createElement('span', null, 'PAGE 01 / 02')
      ),
      React.createElement('div', { className: 'stu-case__cover-head stu-anim stu-anim-2' },
        React.createElement('h2', { id: 'game-ui-shuaitu-title', className: 'stu-case__title' },
          '率土之滨',
          React.createElement('span', { className: 'stu-case__subtitle' }, '武将详情界面设计'),
          React.createElement('span', { className: 'stu-case__en-label' }, 'CHARACTER DETAIL UI')
        ),
        React.createElement('div', null,
          React.createElement('p', { className: 'stu-case__intro' }, '围绕策略游戏中的武将信息查看场景，对角色展示、属性信息、技能内容与功能操作进行整合，在强化武将视觉表现的同时，建立清晰、高效的信息阅读层级。'),
          React.createElement('ul', { className: 'stu-case__keywords', 'aria-label': '设计重点' },
            keywords.map(function(item) {
              return React.createElement('li', { key: item.en },
                item.cn,
                React.createElement('small', null, item.en)
              );
            })
          )
        )
      ),
      React.createElement('figure', { className: 'stu-case__hero stu-anim stu-anim-3' },
        React.createElement(PortfolioImage, {
          src: 'game-ui-shuaitu-character-detail.png',
          alt: '率土之滨司马懿武将详情完整界面',
          loading: 'lazy',
          decoding: 'async',
          width: 2340,
          height: 1080
        })
      )
    )
  );
}

function ShuaituStructureComponents() {
  var result = useInView({ threshold: 0.08 });
  var details = [
    { title: '属性信息', text: '属性名称、数值与成长反馈形成稳定的横向阅读关系。', bounds: [1350,135,800,400] },
    { title: '技能与品质', text: '三张技能卡统一信息顺序，以品质色、类型和等级建立差异。', bounds: [1350,555,800,405] }
  ];
  var colors = [
    { name: '墨黑', hex: '#0B0D0E' }, { name: '深灰', hex: '#111416' },
    { name: '青铜金', hex: '#98713B' }, { name: '鎏金', hex: '#D6A84A' },
    { name: '朱砂红', hex: '#A52B22' }
  ];
  return React.createElement('section', {
    ref: result[0], id: 'game-ui-shuaitu-structure',
    className: 'stu-case stu-case--compact snap-slide' + (result[1] ? ' in-view' : ''),
    'aria-labelledby': 'game-ui-shuaitu-structure-title'
  },
    React.createElement('div', { className: 'stu-case__inner' },
      React.createElement('div', { className: 'stu-case__topline stu-anim' },
        React.createElement('span', null, 'UI DETAILS'),
        React.createElement('span', null, 'PAGE 02 / 02')
      ),
      React.createElement('header', { className: 'stu-case__compact-head stu-anim stu-anim-2' },
        React.createElement('h2', { id: 'game-ui-shuaitu-structure-title' }, '信息层级与关键细节'),
        React.createElement('p', null, '角色展示建立视觉主次；右侧集中属性与技能，外围保留页签及功能入口。')
      ),
      React.createElement('div', { className: 'stu-case__compact-details stu-anim stu-anim-3', id: 'game-ui-shuaitu-details-title' },
        details.map(function(item) {
          var b = item.bounds;
          return React.createElement('figure', { key: item.title },
            React.createElement('div', { className: 'stu-case__detail-crop', style: { aspectRatio: b[2] + ' / ' + b[3] } },
              React.createElement(PortfolioImage, {
                src: 'game-ui-shuaitu-character-detail.png', width: 2340, height: 1080,
                alt: '率土之滨原界面局部：' + item.title,
                style: { width: (2340 / b[2] * 100) + '%', left: (-b[0] / b[2] * 100) + '%', top: (-b[1] / b[3] * 100) + '%' }
              })
            ),
            React.createElement('figcaption', null,
              React.createElement('h3', null, item.title),
              React.createElement('p', null, item.text)
            )
          );
        })
      ),
      React.createElement('div', { className: 'stu-case__compact-colors stu-anim', id: 'game-ui-shuaitu-visual' },
        React.createElement('div', null,
          React.createElement('h3', null, '视觉基调'),
          React.createElement('p', null, '深色承载信息，金色建立重点，红色提示状态。')
        ),
        React.createElement('ul', { 'aria-label': '界面主要色彩' }, colors.map(function(color) {
          return React.createElement('li', { key: color.hex },
            React.createElement('span', { className: 'stu-case__compact-swatch', style: { backgroundColor: color.hex } }),
            React.createElement('span', null, color.name),
            React.createElement('small', null, color.hex)
          );
        }))
      )
    )
  );
}

function RainReveal(props) {
  var visibility = useInView({ threshold: 0.05, rootMargin: '0px' });
  return React.createElement(props.as || 'div', {
    ref: visibility[0], className: (props.className || '') + ' rain-reveal' + (visibility[1] ? ' in-view' : ''),
    style: { '--rain-delay': (props.delay || 0) + 'ms' }
  }, props.children);
}

function RainCrop(props) {
  // Coordinates refer to the final artwork; no GUI elements are redrawn.
  var b = props.bounds;
  return React.createElement('div', { className: 'rain-case__crop', style: { aspectRatio: b[2] + ' / ' + b[3] } },
    React.createElement(PortfolioImage, {
      src: 'assets/rain/' + props.image + '.webp', alt: props.alt, width: 2592, height: 1080,
      style: { width: (2592 / b[2] * 100) + '%', left: (-b[0] / b[2] * 100) + '%', top: (-b[1] / b[3] * 100) + '%' }
    })
  );
}

function RainArchiveCase(props) {
  var collection = props.collection === true;
  var id = collection ? 'game-ui-rain-collection' : 'game-ui-rain-cover';
  var levels = [
    { title: '01 剧情关卡', state: '已通关', bounds: [387,800,363,190] },
    { title: '02 剧情关卡', state: '新解锁', bounds: [772,800,363,190] },
    { title: '03 战斗关卡', state: '当前关卡', bounds: [1164,799,605,206] },
    { title: '04 战斗关卡', state: '尚未解锁', bounds: [1813,803,397,202] }
  ];
  var details = [
    { title: '收集入口', en: '01 COLLECTION ENTRY', image: 'rain-main', bounds: [2000,38,240,110], text: '册页与观测环组成入口图标，连接主界面与情报档案。' },
    { title: '资料索引', en: '02 ARCHIVE INDEX', image: 'rain-collection', bounds: [560,174,645,720], text: '编号组织资料顺序，照片、勾选与待收集占位区分收集进度和当前查看。' },
    { title: '情报详情', en: '03 INFORMATION DETAIL', image: 'rain-collection', bounds: [1338,190,670,704], text: '标题、正文与 Completed 归档签记共同构成内容阅读层级。' }
  ];
  return React.createElement('section', { id: id, className: 'rain-case snap-slide' + (collection ? ' rain-case--collection' : ''), 'aria-labelledby': id + '-title' },
    React.createElement('div', { className: 'rain-case__inner' },
      React.createElement(RainReveal, { className: 'rain-case__topline' },
        React.createElement('span', null, '雨前归纳者 / GAME GUI DESIGN'),
        React.createElement('span', null, 'PAGE ' + (collection ? '02' : '01') + ' / 02')
      ),
      React.createElement(RainReveal, { as: 'header', className: 'rain-case__head', delay: 80 },
        React.createElement('div', null,
          React.createElement('h2', { id: id + '-title' }, collection ? '情报收集与解谜档案' : '雨前归纳者'),
          React.createElement('span', { className: 'rain-case__label' }, collection ? 'COLLECTION SYSTEM' : 'GAME GUI DESIGN'),
          !collection && React.createElement('p', { className: 'rain-case__subtitle' }, '游戏关卡入口界面设计')
        ),
        React.createElement('div', null,
          React.createElement('p', { className: 'rain-case__intro' }, collection
            ? '将情报收集作为主界面的独立功能入口，以档案册形式承载资料索引与内容查看，并通过已收集、待收集、当前查看及完成状态建立清晰反馈。'
            : '围绕科研档案与复古未来主义视觉语言完成游戏关卡入口 GUI 设计，在统一界面体系下建立剧情关卡与战斗关卡的类型差异，并通过结构、明度与状态反馈区分不同关卡进度。'),
          !collection && React.createElement('small', { className: 'rain-case__metadata' }, 'PERSONAL DESIGN TEST · 2026', React.createElement('br'), 'UI VISUAL / GUI COMPONENT / INTERACTION STATE')
        )
      ),
      React.createElement(RainReveal, { as: 'figure', className: 'rain-case__hero', delay: 120 },
        React.createElement(PortfolioImage, { src: 'assets/rain/' + (collection ? 'rain-collection' : 'rain-main') + '.webp', width: 2592, height: 1080,
          alt: collection ? '雨前归纳者情报解谜册完整弹窗状态，保留压暗的主界面背景' : '雨前归纳者完整主界面，包含世界观标题、收集入口与四种关卡状态' }),
        React.createElement('figcaption', { className: 'rain-case__caption' },
          (collection ? ['COLLECTION / 收集入口', 'ARCHIVE / 情报解谜册', 'DETAIL / 资料查看'] : ['WORLD / 世界观标题信息', 'COLLECTION / 情报入口', 'LEVEL INDEX / 关卡索引', 'CURRENT STATE / 当前关卡']).map(function(label, i) {
            return React.createElement('span', { key: label }, React.createElement('b', null, collection ? (i === 0 ? '01' : '→') : '0' + (i + 1)), label);
          })
        )
      ),
      React.createElement('div', { className: 'rain-case__module' },
        React.createElement(RainReveal, { className: 'rain-case__module-head' },
          React.createElement('div', null,
            React.createElement('h3', null, collection ? '从入口到档案' : '关卡类型与进度状态'),
            React.createElement('span', { className: 'rain-case__label' }, collection ? 'COLLECTION / INDEX / DETAIL' : 'LEVEL TYPE & LEVEL STATE')
          ),
          !collection && React.createElement('p', null, '类型通过基础轮廓与图形结构区分，状态通过明度、符号与局部暖金色反馈建立差异，在保持统一视觉语言的同时提升关卡识别效率。')
        ),
        React.createElement('div', { className: collection ? 'rain-case__details' : 'rain-case__levels' },
          (collection ? details : levels).map(function(item, i) {
            return React.createElement(RainReveal, { as: 'figure', className: 'rain-case__detail', delay: i * 90, key: item.title },
              React.createElement(RainCrop, { image: item.image || 'rain-main', bounds: item.bounds, alt: item.title + '：' + (item.state || item.text) }),
              React.createElement('figcaption', null,
                React.createElement('strong', null, item.title),
                collection ? React.createElement('small', null, item.en) : React.createElement('p', null, item.state),
                collection && React.createElement('p', null, item.text)
              )
            );
          })
        ),
        !collection && React.createElement('div', { className: 'rain-case__types' },
          React.createElement('span', null, React.createElement('b', null, 'LEVEL TYPE'), '剧情关卡 / 战斗关卡'),
          React.createElement('span', null, React.createElement('b', null, 'LEVEL STATE'), '已通关 / 新解锁 / 当前关卡 / 尚未解锁')
        )
      )
    )
  );
}

function WarehouseGUICase() {
  return React.createElement('section', { id: 'game-ui-warehouse', className: 'warehouse-case snap-slide', 'aria-labelledby': 'game-ui-warehouse-title' },
    React.createElement('div', { className: 'warehouse-case__inner' },
      React.createElement(RainReveal, { className: 'warehouse-case__topline' },
        React.createElement('span', null, 'GAME GUI DESIGN'),
        React.createElement('span', null, 'LEVEL INTERFACE / ICON DESIGN')
      ),
      React.createElement('div', { className: 'warehouse-case__layout' },
        React.createElement(RainReveal, { as: 'figure', className: 'warehouse-case__hero', delay: 90 },
          React.createElement(PortfolioImage, { src: 'assets/warehouse/level.webp', width: 720, height: 1560, alt: '仓库里的不速之客完整竖版关卡界面，含第8级标题、鸭子与宝箱怪、难度、奖励和挑战按钮' })
        ),
        React.createElement(RainReveal, { className: 'warehouse-case__details', delay: 180 },
          React.createElement('div', { className: 'warehouse-case__copy' },
            React.createElement('h2', { id: 'game-ui-warehouse-title' }, '仓库里的不速之客'),
            React.createElement('p', { className: 'warehouse-case__subtitle' }, '关卡界面与图标设计'),
            React.createElement('p', { className: 'warehouse-case__intro' }, '围绕菜鸟战士误闯仓库的故事，以漫画式角色冲突建立视觉焦点，串联关卡等级、难度、奖励与挑战操作，形成清晰的竖屏阅读顺序。'),
            React.createElement('p', { className: 'warehouse-case__metadata' }, 'PERSONAL DESIGN TEST · 2026 / GUI & ICON')
          ),
          React.createElement('div', { className: 'warehouse-case__reward-row' },
            React.createElement('figure', { className: 'warehouse-case__reward' },
              React.createElement(PortfolioImage, { src: 'assets/warehouse/level.webp', width: 720, height: 1560, alt: '原设计局部：关卡难度、通关奖励、关卡掉落与挑战按钮' })
            ),
            React.createElement('div', null,
              React.createElement('h3', null, '奖励与操作'),
              React.createElement('p', null, '主奖励、掉落信息与挑战按钮分层组织，明黄强调主要操作。')
            )
          ),
          React.createElement('div', { className: 'warehouse-case__icons' },
            React.createElement('h3', null, '道具与职业图标'),
            React.createElement('div', { className: 'warehouse-case__icon-row' },
              [{ src: 'coin.jpg', name: '金币', size: 100 }, { src: 'gem.jpg', name: '宝石', size: 100 }, { src: 'warrior.jpg', name: '战士徽章', size: 256 }].map(function(item) {
                return React.createElement('figure', { key: item.src },
                  React.createElement(PortfolioImage, { src: 'assets/warehouse/' + item.src, width: item.size, height: item.size, alt: item.name + '最终图标设计' }),
                  React.createElement('figcaption', null, item.name)
                );
              })
            )
          )
        )
      )
    )
  );
}

function SunlightLobbyCaseCover() {
  var result = useInView({ threshold: 0.08 });
  return React.createElement('section', {
    ref: result[0], id: 'game-ui-sunlight-cover',
    className: 'sun-case sun-case--compact snap-slide' + (result[1] ? ' in-view' : ''),
    'aria-labelledby': 'game-ui-sunlight-title'
  },
    React.createElement('div', { className: 'sun-case__inner' },
      React.createElement('div', { className: 'sun-case__topline sun-anim' },
        React.createElement('span', null, 'GAME UI DESIGN'),
        React.createElement('span', null, 'LOBBY UI / FUNCTION ICONS')
      ),
      React.createElement('div', { className: 'sun-case__cover-head sun-anim sun-anim-2' },
        React.createElement('h2', { id: 'game-ui-sunlight-title', className: 'sun-case__title' },
          '日光补给站',
          React.createElement('span', { className: 'sun-case__subtitle' }, '安全基地大厅界面设计')
        ),
        React.createElement('p', { className: 'sun-case__intro' }, '以中央角色与小队关系建立视觉焦点，用暖黄色突出行前备战入口，分层组织玩家信息和功能导航。')
      ),
      React.createElement('div', { className: 'sun-case__compact-layout sun-anim sun-anim-3' },
        React.createElement('figure', { className: 'sun-case__hero sun-reveal' },
          React.createElement(PortfolioImage, {
            src: 'game-ui-sunlight-lobby.jpg', width: 2340, height: 1080,
            alt: '日光补给站安全基地大厅完整游戏界面'
          }),
          React.createElement('figcaption', null, '角色与队伍 / 行前备战 / 功能导航')
        ),
        React.createElement('div', { className: 'sun-case__compact-icons', id: 'game-ui-sunlight-breakdown' },
          React.createElement('figure', { className: 'sun-case__icons-visual sun-reveal' },
            React.createElement(PortfolioImage, {
              src: 'game-ui-sunlight-icons.jpg', width: 2200, height: 1400,
              alt: '日光补给站八枚功能图标完整设计'
            })
          ),
          React.createElement('h3', { id: 'game-ui-sunlight-icons-title' }, '功能图标设计'),
          React.createElement('p', null, '统一视角与光向，以柔和体积和清晰剪影保证小尺寸识别。')
        )
      )
    )
  );
}

window.PortfolioChapters.gameUI = function() {
  return [
    React.createElement(RainArchiveCase, { key: 'game-ui-rain-cover' }),
    React.createElement(RainArchiveCase, { key: 'game-ui-rain-collection', collection: true }),
    React.createElement(GameUICaseCover, { key: 'game-ui-case-cover' }),
    React.createElement(GameUISystemAnalysis, { key: 'game-ui-system-analysis' }),
    React.createElement(GameUIMotionPreview, { key: 'game-ui-motion-preview' }),
    React.createElement(ShuaituCaseCover, { key: 'game-ui-shuaitu-cover' }),
    React.createElement(ShuaituStructureComponents, { key: 'game-ui-shuaitu-structure' }),
    React.createElement(SunlightLobbyCaseCover, { key: 'game-ui-sunlight-cover' }),
    React.createElement(WarehouseGUICase, { key: 'game-ui-warehouse' })
  ];
};
