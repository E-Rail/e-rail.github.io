(() => {
  "use strict";

  const STORAGE_KEY = "erail-language";
  const COOKIE_KEY = "erail_language";
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
  const SUPPORTED_LANGUAGES = new Set(["en", "zh"]);
  const root = document.documentElement;
  const originalTitle = document.title;
  const textOriginals = new WeakMap();
  const attributeOriginals = new WeakMap();

  const commonTranslations = {
  "Skip to content": "跳到主要内容",
  "Product": "产品",
  "Docs": "文档",
  "Services": "服务",
  "Privacy": "隐私",
  "Terms": "条款",
  "Source": "源码",
  "Ethan’s site": "Ethan 的网站",
  "View on GitHub": "在 GitHub 查看",
  "View the source": "查看源码",
  "Overview": "概览",
  "Service catalog": "服务目录",
  "Service terms": "服务条款",
  "Data sources": "数据来源",
  "Downloads": "下载与离线数据",
  "Attribution": "署名",
  "Accessibility": "无障碍支持",
  "Notifications": "通知",
  "GitHub ↗": "GitHub ↗",
  "MIT license ↗": "MIT 许可证 ↗",
  "ON THIS PAGE": "本页内容",
  "Documentation navigation": "文档导航",
  "Just-Go documentation pages": "Just-Go 文档页面",
  "On this page": "本页内容",
  "Documentation snapshot": "文档快照",
  "Service snapshot": "服务快照",
  "Privacy policy status": "隐私政策状态",
  "Service terms status": "服务条款状态",
  "Data-source snapshot": "数据来源快照",
  "Attribution snapshot": "署名快照",
  "Download snapshot": "下载内容快照",
  "Just-Go navigation": "Just-Go 导航",
  "Read the documentation": "阅读文档",
  "Open the docs": "打开文档",
  "Return to documentation →": "返回文档 →",
  "Read the privacy policy →": "阅读隐私政策 →",
  "Read service terms →": "阅读服务条款 →",
  "Inspect runtime services →": "查看运行时服务 →",
  "View source on GitHub ↗": "在 GitHub 查看源码 ↗",
  "Just-Go": "Just-Go",
  "Beijing": "北京",
  "Hong Kong": "香港",
  "City": "城市",
  "Included": "内置",
  "External reference": "外部引用",
  "Live API": "实时 API",
  "Personal media": "个人媒体",
  "Included city packs": "内置城市数据包",
  "Matched stations": "匹配车站",
  "Verified indoor transfers": "已核实室内换乘",
  "Service model": "服务模型",
  "Included data": "内置数据",
  "External references": "外部引用",
  "Live arrivals": "实时到站",
  "Personal station media": "个人车站媒体",
  "Source-pending cities": "来源待补充城市",
  "Included media": "内置媒体",
  "Privacy policy": "隐私政策",
  "Terms of Use ↗": "使用条款 ↗",
  "Reviewed": "审核日期",
  "Effective": "生效日期",
  "Coverage": "覆盖范围",
  "Go companion": "GO 出行伴侣",
  "58 cities": "58 个城市",
  "58 cities.": "58 个城市。",
  "DATA.GOV.HK Terms of Use": "DATA.GOV.HK 使用条款",
  "No": "否",
  "YES": "是",
  "NO": "否",
  "NO DATASET": "无数据集",
  "INCLUDED": "内置",
  "EXTERNAL LINK": "外部链接",
  "LIVE API": "实时 API",
  "Route-picker baselines": "路线选择基线",
  "Official-resource directory": "官方资源目录",
  "Official-resource links": "官方资源链接",
  "Official-resource link": "官方资源链接",
  "Official-resource hyperlinks": "官方资源超链接",
  "Included offline packs": "内置离线数据包",
  "Offline city packs": "离线城市数据包",
  "2 · 606 stations": "2 个 · 606 个车站",
  "46 cities": "46 个城市",
  "330 links": "330 条链接",
  "330 records": "330 条记录",
  "Maps": "地图",
  "Travel": "出行",
  "Help": "帮助",
  "Total": "合计",
  "MTR System Map": "港铁系统图",
  "MTR Location Maps": "港铁位置图",
  "MTR Station Layouts": "港铁车站布局图",
  "Light Rail Street Maps": "轻铁街道图",
  "Official MTR index ↗": "港铁官方索引 ↗",
  "Source snapshot": "源码快照",
  "Station Quick Tags": "车站快速标签",
  "Station-sign recognition": "车站标识识别",
  "main · f35e624": "main · f35e624",
  "f35e624": "f35e624",
  "v0.1.3": "v0.1.3",
  "Shanghai": "上海",
  "Guangzhou": "广州",
  "Shenzhen": "深圳",
  "Hangzhou": "杭州",
  "Xi’an": "西安",
  "Chengdu": "成都",
  "Taipei": "臺北",
  "Tianjin": "天津",
  "Nanjing": "南京",
  "Wuhan": "武汉",
  "Chongqing": "重庆",
  "Suzhou": "苏州",
  "Beijing Subway": "北京地铁",
  "Shanghai Metro": "上海地铁",
  "Guangzhou Metro": "广州地铁",
  "Hangzhou Metro": "杭州地铁",
  "MTR / DATA.GOV.HK": "港铁 / DATA.GOV.HK",
  "Station information": "车站信息",
  "Native station information": "原生车站信息",
  "Place tags": "地点标签",
  "53 cities": "53 座城市",
  "770 links": "770 条链接",
  "770 records": "770 条记录",
  "1,598 stations": "1,598 座车站",
  "14 · 2,849 records": "14 个 · 2,849 条记录",
  "14 · 2,849 stations": "14 个 · 2,849 座车站",
  "14 included packs": "14 个内置数据包",
  "main · fc4bce3": "main · fc4bce3",
  "fc4bce3": "fc4bce3",
  "ON-DEVICE FETCH": "设备端获取",
  "INCLUDED PACK": "内置数据包",
  "LINK ONLY": "仅链接",
  "First / Last, Exits, Facilities": "首末班车、出入口、设施",
  "Live Trains, Exits, Facilities": "实时列车、出入口、设施",
  "Home": "首页",
  "Primary navigation": "主导航",
  "Just-Go sections": "Just-Go 页面分区",
  "What’s New": "新功能",
  "Learn more": "进一步了解",
  "Documentation": "文档",
  "API Service": "API 服务",
  "iOS & iPadOS 18+": "iOS 与 iPadOS 18+",
  "Current documentation snapshot": "当前文档快照",
  "API snapshot": "API 快照",
  "Terms status": "条款状态",
  "GitHub": "GitHub",
  "API source": "API 源码",
  "EFFECTIVE 2026-08-06": "2026-08-06 生效",
  "ROUND 36 · MAIN fc4bce3": "ROUND 36 · MAIN fc4bce3",
  "Software license": "软件许可证",
  "MIT": "MIT",
  "API": "API",
  "JSON": "JSON",
  "None": "无",
  "v0.1.12": "v0.1.12"
};

  const pageTranslations = {
    home: {
  "Ethan Song — Developer & Transit Enthusiast": "Ethan Song — 开发者与轨道交通爱好者",
  "Ethan Song — student developer, transit enthusiast, and maker of Just-Go.": "Ethan Song——学生开发者、轨道交通爱好者，也是 Just-Go 的创作者。",
  "Ethan Song, home": "Ethan Song，返回首页",
  "GitHub profile": "GitHub 主页",
  "Portfolio content": "作品集内容",
  "Portfolio sections": "作品集栏目",
  "Beijing · Building things": "北京 · 持续创造",
  "PERSONAL TERMINAL": "个人终端",
  "Hello, I’m Ethan.": "你好，我是 Ethan。",
  "I build useful things for": "我为每一次",
  "curious journeys.": "好奇的旅程创造实用工具。",
  "A high school student in Beijing working where software, public transit, and real-world problem solving meet.": "一名来自北京的高中生，专注于软件、公共交通与现实问题求解的交汇处。",
  "Currently exploring": "目前正在探索",
  "SwiftUI · AI · Transit data": "SwiftUI · AI · 轨道交通数据",
  "Introduction": "个人介绍",
  "GitHub Projects": "GitHub 项目",
  "Bilibili Videos": "哔哩哔哩视频",
  "ABOUT / 关于我": "关于我 / ABOUT",
  "Still learning.": "仍在学习。",
  "Already making.": "已经开始创造。",
  "I’m": "我是",
  ", a student at Beijing National Day School. I like turning things I care about into software people can actually use.": "，就读于北京十一学校。我喜欢把自己在意的事情，做成真正有人愿意使用的软件。",
  "That usually means building native apps, experimenting with AI, or finding better ways to understand complex transit systems. My work moves between code, mathematical modeling, and videos about the rail networks around us.": "这通常意味着开发原生应用、探索人工智能，或寻找理解复杂交通系统的更好方法。我的作品横跨代码、数学建模，以及记录身边轨道网络的视频。",
  "Software": "软件开发",
  "Swift, Python, JavaScript, and thoughtful interfaces.": "Swift、Python、JavaScript，以及经过认真思考的界面。",
  "Transit": "轨道交通",
  "Routes, stations, accessibility, and railway operations.": "线路、车站、无障碍出行与铁路运营。",
  "Modeling": "建模",
  "Using data and mathematics to explain real systems.": "用数据与数学解释真实系统。",
  "Say hello": "和我聊聊",
  "Follow the work on GitHub": "在 GitHub 关注我的作品",
  "SELECTED REPOSITORIES": "精选代码仓库",
  "Things I’m building.": "我正在做的项目。",
  "All repositories": "全部代码仓库",
  "01 / FEATURED": "01 / 精选",
  "02 / NEW": "02 / 新项目",
  "CONFIDENCE": "可信度",
  "58 cities": "58 个城市",
  "2 included packs": "2 个内置数据包",
  "A fast Rust TUI for finding, maintaining, and resuming Claude Code sessions directly from local JSONL logs.": "一款快速的 Rust 终端界面，可直接读取本地 JSONL 日志，用于查找、维护和继续 Claude Code 会话。",
  "Railway Tycoon": "铁路大亨",
  "Build routes across 40 Chinese cities, deploy trains, and optimize your railway network.": "在中国 40 个城市铺设线路、配置列车，并优化你的铁路网络。",
  "A cross-platform encrypted chat app with real-time messaging and OAuth.": "支持实时消息与 OAuth 的跨平台加密聊天应用。",
  "A local AI composer and rendering workflow for ACE-Step style music generation.": "用于 ACE-Step 风格音乐生成的本地 AI 作曲与渲染工作流。",
  "LATEST FROM E-RAIL": "E-RAIL 最新视频",
  "Transit, travel & the view outside.": "轨道交通、旅行，以及窗外的风景。",
  "View Bilibili": "前往哔哩哔哩",
  "LATEST · BEIJING": "最新 · 北京",
  "A quick ride and first look at Beijing Metro Lines 18 and 17.": "快速体验北京地铁 18 号线和 17 号线。",
  "TRAVEL": "旅行",
  "METRO": "地铁",
  "CITY LIFE": "城市生活",
  "RAIL JOURNEY": "铁路旅行",
  "TRANSIT RACE": "交通竞速",
  "Designed & built by Ethan Song.": "由 Ethan Song 设计并开发。",
  "BEIJING · 2026": "北京 · 2026",
  "Round 35 covers 58 cities with 46 route-picker baselines, two included offline packs containing 606 stations, and 330 reviewed official-resource links.": "Round 35 覆盖 58 个城市，包含 46 个路线选择基线、2 个共含 606 个车站的内置离线数据包，以及 330 条已审核的官方资源链接。",
  "A fast Rust TUI for finding, maintaining, and resuming Claude Code sessions—with branch, age, and log-size context from local JSONL.": "一款快速的 Rust 终端界面，可直接从本地 JSONL 获取分支、时间和日志大小信息，用于查找、维护和继续 Claude Code 会话。",
  "About": "关于",
  "Work": "作品",
  "Videos": "视频",
  "Visit just-go.com.cn": "访问 just-go.com.cn",
  "High-speed train at a station platform": "停靠在站台上的高速列车",
  "iOS 18+": "iOS 18 及以上",
  "Footer": "页脚",
  "Metro routing across 53 Chinese cities, where every field carries the source it came from — and the ones with no source stay empty.": "覆盖 53 座中国城市的地铁路线规划：每一项信息都标明其来源，没有来源的字段则保持空白。",
  "GUESSED": "凭猜测",
  "14 station packs": "14 个车站数据包",
  "A fast Rust TUI for finding, previewing, moving, and resuming Claude Code sessions—with branch, age, and log-size context from local JSONL.": "一款快速的 Rust 终端界面，可直接从本地 JSONL 获取分支、时间和日志大小信息，用于查找、预览、移动和继续 Claude Code 会话。"
},
    ccmgr: {
  "ccmgr — Claude Code session manager": "ccmgr — Claude Code 会话管理器",
  "ccmgr is a fast Rust terminal UI for browsing, filtering, renaming, deleting, and resuming Claude Code sessions without a background service.": "ccmgr 是一款快速的 Rust 终端界面，无需后台服务即可浏览、筛选、重命名、删除和继续 Claude Code 会话。",
  "ccmgr home": "ccmgr 首页",
  "ccmgr navigation": "ccmgr 导航",
  "Illustrative ccmgr terminal interface showing searchable Claude Code sessions": "ccmgr 终端界面示意图，展示可搜索的 Claude Code 会话",
  "Copy mirror install command": "复制镜像安装命令",
  "Copy npm install command": "复制 npm 安装命令",
  "Copy Cargo install command": "复制 Cargo 安装命令",
  "ccmgr data flow": "ccmgr 数据流",
  "ccmgr keybindings": "ccmgr 快捷键",
  "Install": "安装",
  "Features": "功能",
  "How it works": "工作原理",
  "Keybindings": "快捷键",
  "RUST TUI": "RUST 终端界面",
  "CLAUDE CODE SESSION MANAGER": "CLAUDE CODE 会话管理器",
  "Your sessions,": "你的会话，",
  "without the archaeology.": "不必再考古。",
  "Browse, live-filter, rename, delete, and resume Claude Code sessions from one fast terminal interface. No account, no indexer, no background service.": "在一个快速的终端界面中浏览、实时筛选、重命名、删除和继续 Claude Code 会话。无需账户、索引器或后台服务。",
  "Install ccmgr": "安装 ccmgr",
  "Read the source": "阅读源码",
  "SESSION SOURCE": "会话来源",
  "DEFAULT SCOPE": "默认范围",
  "current project": "当前项目",
  "RUNTIME": "运行方式",
  "one native binary": "单个原生二进制文件",
  "ccmgr — current project": "ccmgr — 当前项目",
  "01 / INSTALL": "01 / 安装",
  "One command.": "一条命令。",
  "One native binary.": "一个原生二进制文件。",
  "Use the E-Rail mirror, npm, or build from source. The install script selects the matching macOS or Linux release for x86_64 or ARM64.": "可使用 E-Rail 镜像、npm，或从源码构建。安装脚本会为 x86_64 或 ARM64 选择匹配的 macOS 或 Linux 发布版本。",
  "RECOMMENDED": "推荐",
  "E-Rail mirror": "E-Rail 镜像",
  "latest GitHub release": "最新 GitHub 发布版本",
  "COPY": "复制",
  "Installs to": "默认安装至",
  "by default. Set": "。如需选择其他位置，请设置",
  "to choose another destination.": "。",
  "Inspect install.sh →": "检查 install.sh →",
  "View releases ↗": "查看发布版本 ↗",
  "PACKAGE": "软件包",
  "global command": "全局命令",
  "The npm package downloads the native release matching the package version and exposes the": "npm 软件包会下载与软件包版本匹配的原生版本，并提供",
  "command.": "命令。",
  "TOOLCHAIN": "工具链",
  "Build from source": "从源码构建",
  "Clone the repository and compile the release locally with the Rust toolchain.": "克隆仓库，然后使用 Rust 工具链在本地编译发布版本。",
  "02 / THE LOOP": "02 / 工作循环",
  "Find the thread.": "找到那条会话。",
  "Get back to work.": "继续手头工作。",
  "ccmgr keeps the interaction deliberately small: select a scope, narrow the list, then resume or maintain the session you need.": "ccmgr 刻意保持交互精简：选择范围、缩小列表，然后继续或维护所需会话。",
  "Live-filter sessions": "实时筛选会话",
  "Start typing to filter by title immediately. Sessions remain ordered by most recent modification time.": "开始输入即可按标题筛选；会话始终按最近修改时间排序。",
  "Resume in context": "在原环境中继续",
  "Press Enter to run": "按 Enter 运行",
  "from the session’s original working directory.": "，并从会话的原始工作目录启动。",
  "Rename append-only": "仅追加式重命名",
  "Renaming appends a new": "重命名会向 JSONL 日志追加新的",
  "event to the JSONL log, matching Claude Code’s own convention.": "事件，遵循 Claude Code 自身的约定。",
  "Switch scope": "切换范围",
  "Use Tab to move between the current project and every project under Claude Code’s session store.": "使用 Tab 在当前项目与 Claude Code 会话存储中的所有项目之间切换。",
  "Delete with confirmation": "确认后删除",
  "Ctrl+D asks first, then removes the session log and its file-history sidecar directory when present.": "Ctrl+D 会先请求确认，然后删除会话日志及其文件历史附属目录（如存在）。",
  "Update in place": "原地更新",
  "Run": "运行",
  "to fetch the latest matching release and atomically replace the current non-npm binary.": "，获取最新的匹配版本，并以原子方式替换当前非 npm 安装的二进制文件。",
  "03 / INTERNALS": "03 / 内部原理",
  "Local files in.": "本地文件输入。",
  "Terminal actions out.": "终端操作输出。",
  "No database, account, or resident process sits between ccmgr and the session files Claude Code already maintains.": "ccmgr 与 Claude Code 已维护的会话文件之间，没有数据库、账户或常驻进程。",
  "DISCOVER": "发现",
  "Locate project directories in Claude Code’s local session store.": "在 Claude Code 的本地会话存储中定位项目目录。",
  "PARSE": "解析",
  "Read titles, working directories, IDs, and modification times.": "读取标题、工作目录、ID 和修改时间。",
  "ACT": "执行",
  "Hand the selected session back to the Claude Code CLI.": "将选中的会话交回 Claude Code CLI。",
  "NO DAEMON": "无守护进程",
  "Nothing waits in the background.": "没有进程在后台等待。",
  "The binary scans on launch and when the session list needs to reload.": "二进制文件会在启动时及会话列表需要重新加载时扫描。",
  "NO REINDEX": "无需重建索引",
  "Claude Code remains the source.": "Claude Code 始终是数据来源。",
  "ccmgr reads the existing JSONL logs instead of maintaining a second session database.": "ccmgr 读取现有 JSONL 日志，不维护第二套会话数据库。",
  "NO PATH GUESSING": "不猜测路径",
  "Resume from the recorded cwd.": "从记录的 cwd 继续。",
  "The original working directory is used when handing a session back to the CLI.": "将会话交回 CLI 时会使用原始工作目录。",
  "SMALL RELEASE": "精简发布",
  "Optimized as a native binary.": "针对原生二进制进行优化。",
  "The Rust release profile enables size optimization, LTO, stripping, and one codegen unit.": "Rust 发布配置启用了体积优化、LTO、符号剥离和单个代码生成单元。",
  "04 / KEYBINDINGS": "04 / 快捷键",
  "Stay on the keyboard.": "双手不离键盘。",
  "The whole manager is designed around a short, visible set of terminal controls.": "整个管理器围绕一组简短、清晰可见的终端操作设计。",
  "KEY": "按键",
  "ACTION": "操作",
  "Move selection": "移动选择项",
  "type": "输入",
  "Live-filter by title": "按标题实时筛选",
  "Resume selected session": "继续选中的会话",
  "Rename selected session": "重命名选中的会话",
  "Delete after confirmation": "确认后删除",
  "Toggle current / all projects": "切换当前／全部项目",
  "Quit": "退出",
  "COMMAND REFERENCE": "命令参考",
  "Open sessions for the current project.": "打开当前项目的会话。",
  "Start with sessions from every project.": "以全部项目的会话启动。",
  "Update the current non-npm binary.": "更新当前非 npm 安装的二进制文件。",
  "Remove the current non-npm binary after confirmation.": "确认后移除当前非 npm 安装的二进制文件。",
  "npm installs use": "npm 安装请改用",
  "and": "和",
  "instead.": "。",
  "OPEN SOURCE · MIT": "开源 · MIT",
  "Less session hunting.": "少找会话。",
  "More building.": "多做创造。",
  "Read the Rust source, inspect the installer, or open the terminal and pick up where you left off.": "阅读 Rust 源码、检查安装脚本，或打开终端，从上次停下的地方继续。",
  "Open E-Rail/ccmgr": "打开 E-Rail/ccmgr",
  "ccmgr v0.1.3 is a fast Rust terminal UI for browsing, filtering, renaming, deleting, and resuming Claude Code sessions with branch, age, and log-size context.": "ccmgr v0.1.3 是一款快速的 Rust 终端界面，可在显示分支、时间和日志大小信息的同时浏览、筛选、重命名、删除和继续 Claude Code 会话。",
  "Browse, live-filter, rename, delete, and resume Claude Code sessions with age, Git branch, and log-size context. No account, no indexer, no background service.": "在一个快速终端界面中浏览、实时筛选、重命名、删除和继续 Claude Code 会话，并查看时间、Git 分支和日志大小。无需账户、索引器或后台服务。",
  "session": "会话",
  "Redesign the session picker": "重新设计会话选择器",
  "2m ago · main · 182.4KB": "2 分钟前 · main · 182.4KB",
  "Fix session selection highlight": "修复会话选择高亮",
  "1h ago · fix/ui-picker · 91.8KB": "1 小时前 · fix/ui-picker · 91.8KB",
  "Review session metadata": "检查会话元数据",
  "3d ago · release/npm · 64.2KB": "3 天前 · release/npm · 64.2KB",
  "Type to search · ↑/↓ move · Enter resume · Ctrl+R rename · Ctrl+D delete · Tab scope · Ctrl+C quit": "输入以搜索 · ↑/↓ 移动 · Enter 继续 · Ctrl+R 重命名 · Ctrl+D 删除 · Tab 切换范围 · Ctrl+C 退出",
  "v0.1.3 reads age, Git branch, and log size directly from each session.": "v0.1.3 会直接从每个会话读取时间、Git 分支和日志大小。",
  "Filter with context": "携带上下文筛选",
  "Start typing to filter by title. Each row shows relative age, Git branch when present, and JSONL log size.": "开始输入即可按标题筛选；每行会显示相对时间、Git 分支（如有）和 JSONL 日志大小。",
  "Read titles, working directories, IDs, Git branches, modification times, and log sizes.": "读取标题、工作目录、ID、Git 分支、修改时间和日志大小。",
  "Use Tab to move between the current project and every project; all-project rows also show the recorded working directory.": "使用 Tab 在当前项目与全部项目之间切换；全部项目视图的每一行还会显示记录的工作目录。",
  "Ctrl+D asks first, then removes the session log and its file-history sidecar directory. Rename, delete, and resume statuses clear after three seconds.": "Ctrl+D 会先请求确认，然后删除会话日志及其文件历史附属目录。重命名、删除和继续操作的状态信息会在三秒后清除。",
  "ccmgr v0.1.12 is a fast Rust terminal UI for browsing, previewing, moving, and resuming Claude Code sessions with branch, age, and log-size context.": "ccmgr v0.1.12 是一款快速的 Rust 终端界面，可在显示分支、时间和日志大小的同时浏览、预览、移动和继续 Claude Code 会话。",
  "Space preview · Enter resume · Ctrl+O move · Ctrl+R rename · Esc quit": "空格预览 · Enter 继续 · Ctrl+O 移动 · Ctrl+R 重命名 · Esc 退出",
  "v0.1.12 can preview a session or move it to another folder, without a second copy of the log.": "v0.1.12 可以预览会话，或把它移动到另一个文件夹，而不再保存一份日志副本。",
  "Preview before you resume": "继续之前先预览",
  "Press Space to open the transcript. Arrow keys and Page Up or Page Down scroll it. Enter resumes, and Esc returns to the list.": "按空格打开会话记录。方向键以及 Page Up 或 Page Down 用来滚动。Enter 继续会话，Esc 返回列表。",
  "Move to another folder": "移动到另一个文件夹",
  "Ctrl+O re-files the session under a folder that already exists, rewriting paths inside the log before the original is removed.": "Ctrl+O 把会话归入一个已经存在的文件夹，并在删除原文件之前改写日志中的路径。",
  "Your terminal’s colors": "跟随终端的颜色",
  "Titles keep the accent. Everything else recedes, and ccmgr never paints its own background, so light, dark, and transparent terminals all come through.": "标题保留强调色，其余内容退到后面。ccmgr 不绘制自己的背景，因此浅色、深色和透明终端都能透出来。",
  "YOUR PALETTE": "你的配色",
  "Color comes from the terminal.": "颜色来自终端。",
  "An optional TOML config can name palette entries or pin exact colors. Defaults follow the terminal theme.": "可选的 TOML 配置可以指定调色板颜色，或固定为确切色值。默认跟随终端主题。",
  "SAFE MOVE": "安全移动",
  "The original stays until the rewrite lands.": "改写完成之前，原文件保持不动。",
  "A moved session is written into place before the old file is removed. A path that only shares a prefix is left alone.": "移动后的会话会先完整写入新位置，然后才删除旧文件。仅有相同前缀的路径不会被改动。",
  "Space": "空格",
  "Preview the selected session": "预览选中的会话",
  "Move the session to another folder": "将会话移动到另一个文件夹",
  "Esc": "Esc",
  "Quit, or leave a preview": "退出，或离开预览"
}
  };

  function normalizeLanguage(value) {
    if (typeof value !== "string") return null;
    const normalized = value.trim().toLowerCase();
    if (normalized === "zh" || normalized.startsWith("zh-")) return "zh";
    if (normalized === "en" || normalized.startsWith("en-")) return "en";
    return null;
  }

  function readStoredLanguage() {
    try {
      const stored = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
      if (SUPPORTED_LANGUAGES.has(stored)) return stored;
    } catch (_) {
      // Storage can be unavailable in privacy modes; the cookie remains a fallback.
    }

    try {
      const prefix = `${COOKIE_KEY}=`;
      const cookie = document.cookie
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(prefix));
      const stored = cookie ? normalizeLanguage(decodeURIComponent(cookie.slice(prefix.length))) : null;
      return SUPPORTED_LANGUAGES.has(stored) ? stored : null;
    } catch (_) {
      return null;
    }
  }

  function detectBrowserLanguage() {
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language];

    for (const candidate of candidates) {
      const language = normalizeLanguage(candidate);
      if (SUPPORTED_LANGUAGES.has(language)) return language;
    }
    return "en";
  }

  function persistLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (_) {
      // Cookie persistence below still works when localStorage is unavailable.
    }

    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(language)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  }

  function pageKey() {
    const path = window.location.pathname.replace(/index\.html$/, "").replace(/\/+$/, "") || "/";
    if (path === "/") return "home";
    if (path === "/ccmgr") return "ccmgr";
    return "home";
  }

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function translationMap() {
    return new Map(Object.entries({
      ...commonTranslations,
      ...(pageTranslations[pageKey()] || {})
    }));
  }

  function translatedText(original, translations) {
    const key = normalizeText(original);
    const translated = translations.get(key);
    if (!translated) return original;
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  }

  function translateTextNodes(language, translations) {
    if (!document.body) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!normalizeText(node.nodeValue || "")) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, code, pre, svg, [data-i18n-ignore]")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let node = walker.nextNode();
    while (node) {
      if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
      const original = textOriginals.get(node);
      node.nodeValue = language === "zh" ? translatedText(original, translations) : original;
      node = walker.nextNode();
    }
  }

  function translateAttributes(language, translations) {
    const elements = document.querySelectorAll("[title], [aria-label], [alt], meta[name='description']");
    elements.forEach((element) => {
      if (element.closest?.("[data-i18n-ignore]")) return;
      if (!attributeOriginals.has(element)) attributeOriginals.set(element, new Map());
      const originals = attributeOriginals.get(element);
      const names = element.matches("meta[name='description']")
        ? ["content"]
        : ["title", "aria-label", "alt"];

      names.forEach((name) => {
        if (!element.hasAttribute(name)) return;
        if (!originals.has(name)) originals.set(name, element.getAttribute(name));
        const original = originals.get(name);
        const translated = translations.get(normalizeText(original));
        element.setAttribute(name, language === "zh" && translated ? translated : original);
      });
    });
  }

  function updateSwitcher(language, announce = false) {
    const switcher = document.querySelector("[data-language-switcher]");
    if (!switcher) return;

    switcher.setAttribute("aria-label", language === "zh" ? "选择显示语言" : "Choose display language");
    switcher.querySelectorAll("[data-language]").forEach((button) => {
      const selected = button.dataset.language === language;
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", button.dataset.language === "zh" ? "使用简体中文" : "Use English");
      button.title = button.getAttribute("aria-label");
    });

    if (announce) {
      const status = switcher.querySelector(".language-switcher-status");
      if (status) status.textContent = language === "zh" ? "显示语言已切换为简体中文" : "Display language changed to English";
    }
  }

  let currentLanguage = readStoredLanguage() || detectBrowserLanguage();

  function applyLanguage(language, options = {}) {
    const normalized = normalizeLanguage(language) || "en";
    currentLanguage = normalized;
    root.lang = normalized === "zh" ? "zh-CN" : "en";
    root.dataset.language = normalized;

    const translations = translationMap();
    if (document.title) {
      const translatedTitle = translations.get(normalizeText(originalTitle));
      document.title = normalized === "zh" && translatedTitle ? translatedTitle : originalTitle;
    }
    translateTextNodes(normalized, translations);
    translateAttributes(normalized, translations);
    updateSwitcher(normalized, options.announce === true);
    if (options.persist === true) persistLanguage(normalized);
  }

  function buildSwitcher() {
    if (document.querySelector("[data-language-switcher]")) return;
    const target = document.querySelector(".header-right, .nav-actions");
    if (!target) return;

    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.dataset.languageSwitcher = "";
    switcher.dataset.i18nIgnore = "";
    switcher.setAttribute("role", "group");
    switcher.innerHTML = `
      <button type="button" lang="en" data-language="en">EN</button>
      <button type="button" lang="zh-CN" data-language="zh">中</button>
      <span class="language-switcher-status" aria-live="polite"></span>
    `;

    switcher.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => {
        applyLanguage(button.dataset.language, { persist: true, announce: true });
      });
    });

    const anchor = target.querySelector(".icon-link, .github-button, .github-link");
    target.insertBefore(switcher, anchor || null);
  }

  root.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  root.dataset.language = currentLanguage;
  root.classList.add("i18n-pending");
  const revealFallback = window.setTimeout(() => root.classList.remove("i18n-pending"), 1800);

  function initialize() {
    buildSwitcher();
    applyLanguage(currentLanguage);
    window.clearTimeout(revealFallback);
    root.classList.remove("i18n-pending");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    const language = normalizeLanguage(event.newValue);
    if (SUPPORTED_LANGUAGES.has(language) && language !== currentLanguage) {
      applyLanguage(language, { announce: true });
    }
  });

  window.eRailLanguage = Object.freeze({
    get current() {
      return currentLanguage;
    },
    set(language) {
      applyLanguage(language, { persist: true, announce: true });
    },
    supported: Object.freeze(["en", "zh"])
  });
})();
