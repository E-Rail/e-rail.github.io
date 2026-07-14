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
    "Accessibility": "无障碍支持",
    "Notifications": "通知",
    "GitHub ↗": "GitHub ↗",
    "MIT license ↗": "MIT 许可证 ↗",
    "ON THIS PAGE": "本页目录",
    "Documentation navigation": "文档导航",
    "JustGo documentation pages": "JustGo 文档页面",
    "On this page": "本页目录",
    "Documentation snapshot": "文档快照",
    "Service snapshot": "服务快照",
    "Privacy policy status": "隐私政策状态",
    "Service terms status": "服务条款状态",
    "JustGo navigation": "JustGo 导航",
    "Read the documentation": "阅读文档",
    "Open the docs": "打开文档",
    "Return to documentation →": "返回文档 →",
    "Read the privacy policy →": "阅读隐私政策 →",
    "Read service terms →": "阅读服务条款 →",
    "Inspect runtime services →": "查看运行时服务 →",
    "View source on GitHub ↗": "在 GitHub 查看源码 ↗",
    "JustGo": "JustGo"
  };

  const pageTranslations = {
    home: {
      "Ethan Song — Developer & Transit Enthusiast": "Ethan Song — 开发者与轨道交通爱好者",
      "Ethan Song — student developer, transit enthusiast, and maker of JustGo.": "Ethan Song——学生开发者、轨道交通爱好者，也是 JustGo 的创作者。",
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
      "CONFIDENCE": "可信度",
      "Accessibility-first metro planning across 46 Chinese city networks, with explainable confidence, route maps, and 13 richer city data packs.": "面向中国 46 个城市轨道网络的无障碍优先出行规划，提供可解释的可信度、线路图，以及 13 个信息更丰富的城市数据包。",
      "46 networks": "46 个网络",
      "13 data packs": "13 个数据包",
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
      "BEIJING · 2026": "北京 · 2026"
    },

    justgo: {
      "JustGo — Subway confidence for China": "JustGo — 更有把握地乘地铁",
      "JustGo — accessibility-first metro confidence across 46 Chinese city networks.": "JustGo——覆盖中国 46 个城市轨道网络、以无障碍为先的可信出行规划。",
      "Illustrative JustGo route-confidence interface": "JustGo 路线可信度界面示意图",
      "Why JustGo": "为什么选择 JustGo",
      "What’s new": "最新功能",
      "Coverage": "覆盖范围",
      "OPEN SOURCE · iOS & iPadOS 18+": "开源 · iOS 与 iPadOS 18+",
      "Maps find a route.": "地图找到路线。",
      "JustGo finds confidence.": "JustGo 找到把握。",
      "Plan door-to-door journeys across 46 metro networks with explainable confidence, source-backed station facts, and guidance that says exactly what is known—and what is not.": "在 46 个城市轨道网络中规划门到门行程，获得可解释的可信度、注明来源的车站信息，以及明确区分已知与未知的出行提示。",
      "CURRENT BUILD": "当前版本",
      "46 city networks": "46 个城市网络",
      "13 city packs": "13 个城市数据包",
      "3 app languages": "3 种应用语言",
      "BEIJING": "北京",
      "SHANGHAI": "上海",
      "ROUTE PLANNER": "路线规划",
      "Where are you going?": "你要去哪里？",
      "FROM": "出发地",
      "TO": "目的地",
      "Transit first": "公共交通优先",
      "Least walking": "步行最少",
      "Fewest transfers": "换乘最少",
      "TRIP CONFIDENCE": "行程可信度",
      "High confidence": "可信度高",
      "Direct ride · Official schedule": "直达 · 官方时刻表",
      "Line 1 · 3 stops": "1 号线 · 3 站",
      "8 min · ¥3 · 1.8 km": "8 分钟 · ¥3 · 1.8 公里",
      "Check before you go": "出发前请确认",
      "Step-free arrival access is not confirmed in the current city pack.": "当前城市数据包尚未确认到达站的无台阶通行条件。",
      "Map": "地图",
      "Route": "路线",
      "Search": "搜索",
      "Profile": "我的",
      "01 / THE IDEA": "01 / 核心理念",
      "“A route can be technically possible": "“一条路线在技术上可行",
      "and still be": "却仍可能在现实中",
      "practically impossible.": "根本走不通。",
      "JustGo builds subway paths from locally bundled network graphs, asks Apple Maps for place search and walking legs, then checks critical stations against source-backed city packs. The result is a route with reasons, caveats, and data confidence—not a mysterious green score.": "JustGo 使用应用内置的网络图计算地铁路径，通过 Apple 地图搜索地点并规划步行路段，再用注明来源的城市数据包核查关键车站。最终得到的不是一个来历不明的绿色分数，而是一条附有理由、注意事项与数据可信度的路线。",
      "High confidence · 80–100": "可信度高 · 80–100",
      "Fewer concerns in the available data": "现有数据中需要留意的问题较少",
      "Worth checking · 60–79": "建议确认 · 60–79",
      "One or more details need attention": "一项或多项细节需要注意",
      "Plan carefully · 0–59": "谨慎规划 · 0–59",
      "Complex, risky, or data-limited": "路线复杂、存在风险或数据不足",
      "02 / JULY 2026 BUILD": "02 / 2026 年 7 月版本",
      "More than": "不只是",
      "A to B.": "从 A 到 B。",
      "The current app has grown far beyond the original six-city concept.": "现在的应用早已超越最初只覆盖六个城市的构想。",
      "46 local network graphs": "46 个本地网络图",
      "Physical-track geometry and station topology are bundled for 46 cities, so subway paths follow the actual network—not a generic straight line.": "应用内置 46 个城市的真实轨道几何与车站拓扑，因此地铁路径沿实际网络计算，而不是用简单直线代替。",
      "Door-to-door planning": "门到门规划",
      "Apple Maps resolves places and walking approaches; JustGo connects them to stations and generates fastest, least-walking, and fewest-transfer alternatives.": "Apple 地图解析地点与步行接驳；JustGo 将它们连接到车站，并生成最快、步行最少和换乘最少的备选路线。",
      "EXPLAINED": "可解释",
      "Explainable confidence": "可解释的可信度",
      "The 0–100 score accounts for transfers, walking, source coverage, service hours, feasibility, crowd-control windows, and your own local reports.": "0–100 分会综合考虑换乘、步行、来源覆盖、运营时间、可行性、客流管控时段，以及你保存在本地的报告。",
      "13 richer city packs": "13 个更丰富的城市数据包",
      "Downloadable packs add the facts each source can support: schedules, accessibility, facilities, maps, exits, and crowd-control windows.": "可下载的数据包按来源能力补充时刻表、无障碍设施、站内设施、车站地图、出入口和客流管控时段。",
      "A hands-on Go companion": "需要你参与的 Go 行程助手",
      "Manual step progression, route-map previews, speech, haptics, visual announcements, and clearly labeled time-estimated get-off reminders.": "支持手动推进步骤、路线图预览、语音、触觉反馈、视觉提示，以及明确标注为时间估算的下车提醒。",
      "LOCAL": "本地",
      "Personal, on your device": "只属于你，保存在设备上",
      "Favorites, Home and Work tags, saved trips, history, active trips, preferences, and accessibility reports stay in the app’s local storage.": "收藏、家庭与工作标签、保存的行程、历史记录、进行中的行程、偏好和无障碍报告都保留在应用本地存储中。",
      "03 / COVERAGE · MANIFEST 2026-07-02": "03 / 覆盖范围 · 清单 2026-07-02",
      "46 networks.": "46 个网络。",
      "13 richer packs.": "13 个丰富数据包。",
      "Every supported city includes a bundled, drawable metro network. The current manifest adds downloadable station data for 13 cities. Coverage is field-by-field: “available” never silently means “live.”": "每个受支持城市都包含可绘制的内置地铁网络。当前清单为 13 个城市提供可下载的车站数据。覆盖状态按字段标注：“可用”绝不会被悄悄等同于“实时”。",
      "See the full coverage matrix": "查看完整覆盖矩阵",
      "NEW": "新增",
      "Partial schedules · 2026-07-02": "部分时刻表 · 2026-07-02",
      "Official accessibility · 2026-07-02": "官方无障碍数据 · 2026-07-02",
      "Access · schedules · station maps": "无障碍 · 时刻表 · 车站地图",
      "Access · schedules": "无障碍 · 时刻表",
      "Official schedules": "官方时刻表",
      "READ THE DETAILS": "阅读详细说明",
      "Confidence should": "可信度应该",
      "be inspectable.": "经得起查看。",
      "Read the route math, service boundaries, data labels, and known limitations.": "了解路线计算、服务边界、数据标签与已知限制。",
      "SWIFTUI · MAPKIT · OPEN SOURCE": "SWIFTUI · MAPKIT · 开源"
    },

    docs: {
      "JustGo Documentation — How the app works": "JustGo 文档 — 应用工作原理",
      "Detailed JustGo documentation: routing, confidence scoring, data sources, coverage, accessibility, and limitations.": "JustGo 详细文档：路线规划、可信度评分、数据来源、覆盖范围、无障碍支持与限制。",
      "/ Documentation": "/ 文档",
      "Confidence,": "可信度，",
      "fully explained.": "从原理到细节。",
      "This is the implementation-level guide to what JustGo calculates, where each fact comes from, what stays on the device, and which labels are estimates rather than live transit information.": "这份实现级指南说明 JustGo 如何计算、每项信息来自何处、哪些数据留在设备上，以及哪些标签只是估算而非实时交通信息。",
      "SOURCE SNAPSHOT": "源码快照",
      "App source": "应用源码",
      "Pack manifest": "数据包清单",
      "Minimum OS": "最低系统版本",
      "Documentation reviewed": "文档复核日期",
      "Start here": "从这里开始",
      "Route pipeline": "路线流程",
      "Route modes": "路线模式",
      "Confidence score": "可信度评分",
      "Data labels": "数据标签",
      "Coverage": "覆盖范围",
      "Accessibility": "无障碍支持",
      "Live Go": "Go 行程助手",
      "On-device data": "设备端数据",
      "Known limits": "已知限制",
      "Development": "开发说明",
      "01 / START HERE": "01 / 从这里开始",
      "What JustGo actually is.": "JustGo 到底是什么。",
      "JustGo is an open-source SwiftUI app for planning metro journeys in China. It combines a bundled metro graph, Apple place and walking services, downloadable city data, deterministic confidence rules, and local rider preferences. It is not a transit operator, a live signaling system, or a guarantee that a station facility will be working.": "JustGo 是一款用 SwiftUI 开发的开源中国地铁出行规划应用。它结合内置地铁网络图、Apple 地点与步行服务、可下载城市数据、确定性的可信度规则，以及乘客的本地偏好。它不是交通运营方、实时信号系统，也不能保证车站设施当前可用。",
      "Bundled city networks with stations, lines, service patterns, and physical-track geometry.": "内置城市网络，包含车站、线路、运营模式与真实轨道几何。",
      "Downloadable city packs in the current manifest; each field has its own capability status.": "当前清单中的可下载城市数据包；每个字段都有独立的能力状态。",
      "Graph-generated route strategies: fastest, fewest transfers, and least walking.": "由网络图生成的路线策略：最快、换乘最少和步行最少。",
      "User-facing route modes. Six of them rerank the generated alternatives using human-centered criteria.": "面向用户的路线模式，其中六种会依据以人为本的标准重新排序已生成的方案。",
      "A deterministic explanation score. It is a heuristic, not a statistical probability.": "一项确定性的解释分数；它是启发式指标，不是统计概率。",
      "Local": "本地",
      "No account, analytics SDK, ad SDK, or developer-operated user database appears in the reviewed source.": "经复核的源码中没有账户、分析 SDK、广告 SDK，也没有由开发者运营的用户数据库。",
      "The short version": "简要说明",
      "Search and walking use Apple Maps. Subway routing uses bundled network graphs. City packs enrich critical stations. Confidence then explains the combined result.": "搜索与步行使用 Apple 地图；地铁路线使用内置网络图；城市数据包补充关键车站信息；可信度再对综合结果作出解释。",
      "Inspect every service →": "查看全部服务 →",
      "Browse the Swift source ↗": "浏览 Swift 源码 ↗",
      "02 / ROUTE PIPELINE": "02 / 路线处理流程",
      "From two places to one explained route.": "从两个地点，得到一条可解释的路线。",
      "A route is assembled in layers. The source of each layer stays visible so a missing schedule cannot be mistaken for a routing failure, and an estimated exit cannot be mistaken for an official instruction.": "一条路线由多个层次组合而成。每一层的来源都清晰可见，因此缺失时刻表不会被误认为路线计算失败，估算出的出口也不会被误认为官方指引。",
      "Resolve places": "解析地点",
      "Typed POIs and addresses are searched with": "输入的兴趣点与地址通过",
      ". “Current Location” asks Core Location only when the rider invokes it. Saved and favorite places may already contain coordinates.": "搜索。“当前位置”只有在乘客主动调用时才会请求 Core Location；已保存或收藏的地点可能已经包含坐标。",
      "Choose a network": "选择城市网络",
      "Both endpoints must lie within 25 km of a bundled network’s bounds. If more than one network qualifies, JustGo chooses the one with the smallest combined endpoint-to-network access distance.": "两个端点都必须位于某个内置网络边界 25 公里以内。如果多个网络符合条件，JustGo 会选择两个端点接入该网络的合计距离最小者。",
      "Choose access stations": "选择接入车站",
      "For each endpoint, the four nearest stations become graph candidates. Their walking distance is included in the path cost rather than forcing the single nearest station.": "每个端点附近最近的四座车站都会成为网络图候选。它们的步行距离会计入路径成本，而不是强制选择唯一最近的车站。",
      "Search the metro graph": "搜索地铁网络图",
      "A minimum-cost graph search runs three times. Fastest uses normal costs; fewest transfers raises the transfer penalty from 300 to 1,200 seconds; least walking triples the access-walking weight.": "最小成本网络图搜索会运行三次。最快路线使用常规成本；换乘最少将换乘惩罚从 300 秒提高到 1,200 秒；步行最少将接入步行权重提高到三倍。",
      "Build the legs": "构建各段行程",
      "Train time is estimated as": "每条网络图边的列车时间按",
      "per graph edge. Transfers add five minutes. Apple walking directions are requested for the first and last leg.": "估算。每次换乘增加五分钟；首段与末段会请求 Apple 步行路线。",
      "Fall back honestly": "如实回退",
      "If walking directions fail, distance becomes straight-line distance and duration uses 1.25 m/s. The route receives a “walking distance is estimated” note instead of silently presenting the fallback as mapped walking.": "如果步行路线请求失败，距离将改用直线距离，时长按 1.25 米/秒估算。路线会明确显示“步行距离为估算值”，不会把回退结果悄悄伪装成地图步行路线。",
      "Enrich critical stops": "补充关键车站信息",
      "Boarding, transfer, and arrival stations are checked for city-pack schedules, accessibility, facilities, station maps, crowd-control windows, and entrance or exit guidance.": "系统会查询城市数据包，检查上车站、换乘站与到达站的时刻表、无障碍信息、设施、车站地图、客流管控时段和出入口指引。",
      "Rank and explain": "排序并解释",
      "The selected route mode reranks the unique alternatives. Feasibility, service-hours status, comfort, source coverage, and personal reports are then folded into the confidence explanation.": "所选路线模式会重新排序互不重复的方案，再把可行性、运营时间状态、舒适度、来源覆盖和个人报告纳入可信度解释。",
      "Network requirement": "网络连接要求",
      "The metro graph itself is bundled, but fresh place search and Apple walking routes require connectivity. Existing saved coordinates can reduce that dependency; they do not turn the entire planning flow into a guaranteed offline service.": "地铁网络图本身内置于应用，但新的地点搜索和 Apple 步行路线仍需要联网。已保存的坐标可以降低这种依赖，却不能让整个规划流程成为有保证的离线服务。",
      "03 / ROUTE MODES": "03 / 路线模式",
      "Generation and ranking are different.": "生成路线与排序路线是两件事。",
      "JustGo generates at most three unique graph paths, then applies one of nine user-facing ranking modes. A mode can change which option is shown first without creating a physically different path.": "JustGo 最多生成三条互不重复的网络图路径，再应用九种面向用户的排序模式之一。模式可以改变首选方案，但不一定生成物理上不同的新路径。",
      "Mode": "模式",
      "What it does now": "当前行为",
      "New graph path?": "生成新路径？",
      "Transit First": "公共交通优先",
      "Prefers a route tagged metro-first; with the current bundled provider, duration is the practical tie-break because generated paths are tagged fastest, fewest-transfer, or least-walking.": "优先选择标记为地铁优先的路线；在当前内置提供方中，生成路径被标记为最快、换乘最少或步行最少，因此实际以总时长作为同分判定。",
      "RERANK": "重新排序",
      "Fastest": "最快",
      "Uses normal walking, train, and 300-second transfer costs; then orders matching alternatives by total duration.": "使用常规步行、列车和 300 秒换乘成本，再按总时长排列符合条件的方案。",
      "GENERATED": "生成路径",
      "Least Walking": "步行最少",
      "Multiplies access-walking cost by three and later orders by measured walking distance.": "将接入步行成本乘以三，随后按测得的步行距离排序。",
      "Fewest Transfers": "换乘最少",
      "Raises the transfer penalty to 1,200 seconds; final order uses transfer count, duration, then walking.": "将换乘惩罚提高到 1,200 秒；最终依次按换乘次数、总时长和步行距离排序。",
      "Least Confusing": "最易理解",
      "Rewards official data, then subtracts 20 points per transfer and one point per 100 m of walking.": "奖励官方数据；每次换乘扣 20 分，每 100 米步行扣 1 分。",
      "Luggage Friendly": "行李友好",
      "Rewards accessibility and step-free evidence; penalizes transfers, walking, and warnings.": "奖励无障碍与无台阶证据，并对换乘、步行和警告进行扣分。",
      "Elderly Friendly": "长者友好",
      "Uses the same evidence with stronger penalties for transfers, walking, and warnings.": "使用相同证据，但对换乘、步行和警告施加更高惩罚。",
      "Official Data Only": "官方数据优先",
      "Ranks by the number of critical stops with official accessibility, schedule, map, and facility records.": "按拥有官方无障碍、时刻表、地图与设施记录的关键车站数量排序。",
      "Step-Free Support": "无台阶支持",
      "Ranks accessibility assessment first. A detected barrier is demoted but not hidden, because the graph does not yet encode barrier-free edges.": "优先按无障碍评估排序。检测到障碍的路线会降级但不会隐藏，因为网络图尚未编码无障碍边。",
      "04 / CONFIDENCE SCORE": "04 / 可信度评分",
      "A score with receipts.": "每一分都有依据。",
      "Every route starts at 100. The current service applies fixed additions and deductions, clamps the result to 0–100, then labels 80–100 high, 60–79 medium, and 0–59 low.": "每条路线从 100 分开始。当前服务应用固定加减分，将结果限制在 0–100，再把 80–100 标为高、60–79 标为中、0–59 标为低。",
      "− 8 × transfers − min(20, floor(walking metres ÷ 100)) − 10 if schedules are not official − 10 if station maps are not official − 10 if accessibility is not official − min(15, 5 × missing core data categories) + feasibility adjustment + service-hours adjustment + comfort adjustment + alternative / full-coverage bonuses = clamp(0…100)": "− 8 × 换乘次数 − min(20, floor(步行米数 ÷ 100)) − 时刻表非官方时扣 10 − 车站地图非官方时扣 10 − 无障碍数据非官方时扣 10 − min(15, 5 × 缺失的核心数据类别数) + 可行性调整 + 运营时间调整 + 舒适度调整 + 备选路线/完整覆盖奖励 = clamp(0…100)",
      "Signal": "信号",
      "Adjustment": "调整",
      "Meaning": "含义",
      "Feasibility: caution / risky / unknown": "可行性：需注意 / 风险高 / 未知",
      "Based on stairs, step-free uncertainty, long walks, service state, crowding, and personal reports.": "依据楼梯、无台阶不确定性、长距离步行、运营状态、拥挤程度与个人报告判断。",
      "Personal issue affects route": "个人问题影响路线",
      "A local report matches the route or one of its station IDs.": "本地报告与该路线或其中某个车站 ID 匹配。",
      "Service ended / not started / last train soon": "运营结束 / 尚未开始 / 末班车临近",
      "Derived from static first/last schedule windows for the boarding line.": "根据上车线路的静态首末班时刻窗口推导。",
      "Comfort: busy / moderate": "舒适度：拥挤 / 一般",
      "Busy requires an active source-backed crowd-control window. A weekday rush-hour heuristic alone is capped at moderate.": "“拥挤”必须有当前生效且注明来源的客流管控时段；仅凭工作日高峰启发式判断，最多只能标为“一般”。",
      "Fewest transfers among alternatives": "备选方案中换乘最少",
      "Rewards the route if its transfer count equals the current minimum.": "若路线换乘次数等于当前最小值，则给予奖励。",
      "All core official fields covered": "核心官方字段全部覆盖",
      "Applied when core coverage has official data and no unknown category.": "核心覆盖拥有官方数据且没有未知类别时应用。",
      "Not a probability": "不是概率",
      "An 84 does not mean an 84% chance of success. The score is a readable comparison heuristic over the data currently available to the app. Station conditions and operations can change after the data was captured.": "84 分并不表示成功概率为 84%。这个分数只是基于应用当前可用数据、便于阅读比较的启发式指标。数据采集后，车站条件与运营情况仍可能变化。",
      "05 / DATA LABELS": "05 / 数据标签",
      "“Unknown” is a valid answer.": "“未知”本身就是有效答案。",
      "JustGo carries provenance labels through the model instead of treating every non-empty field as equivalent.": "JustGo 会让来源标签贯穿整个模型，而不是把所有非空字段都视为同等可信。",
      "Label": "标签",
      "Interpretation": "解释",
      "Official": "官方",
      "The required critical stations are covered by records marked official in the current city pack.": "当前城市数据包中，所需关键车站均由标记为官方的记录覆盖。",
      "Estimated from maps": "根据地图估算",
      "Produced from Apple Maps or map-derived walking context, not a transit-operator facility statement.": "来自 Apple 地图或地图推导的步行上下文，并非交通运营方对设施的说明。",
      "Estimated": "估算",
      "Inferred from available text or geometry. For example, an exit token may be extracted from station accessibility text.": "根据现有文本或几何信息推断。例如，可能从车站无障碍文字中提取出口标记。",
      "Source pending": "来源待补充",
      "Some but not all required stops are covered, or the manifest says the field’s source is still incomplete.": "只覆盖了部分所需车站，或清单表明该字段的来源仍不完整。",
      "Not available": "不可用",
      "The pack has no usable record for this route or field.": "数据包中没有可用于该路线或字段的记录。",
      "No data": "无数据",
      "No critical-station denominator exists yet, so coverage cannot be assessed.": "尚不存在关键车站分母，因此无法评估覆盖率。",
      "Personal report": "个人报告",
      "A note the rider created locally. It is not uploaded or community-verified in the current source.": "乘客在本地创建的备注；当前源码不会上传，也没有社区验证。",
      "06 / COVERAGE": "06 / 覆盖范围",
      "46 maps; 13 enrichment packs.": "46 张网络图；13 个增强数据包。",
      "The two coverage layers solve different problems. Bundled networks make the map and graph routable. Downloadable city packs add station facts where sources have been prepared.": "两层覆盖解决不同问题：内置网络让地图与网络图可以规划路线；可下载城市数据包则在来源已经整理的地方补充车站事实。",
      "Bundled metro networks": "内置地铁网络",
      "Each of these 46 cities has a bundled": "以下 46 个城市都包含内置的",
      "network file in the reviewed source:": "网络文件：",
      "Current downloadable city packs": "当前可下载城市数据包",
      "Cities with bundled metro networks": "包含内置地铁网络的城市",
      "The manifest was generated on 2 July 2026. “Schedule only” in the live-arrival column means static first/last times are available; it does not mean a live vehicle countdown.": "清单生成于 2026 年 7 月 2 日。“实时到站”列中的“仅时刻表”表示可以提供静态首末班时间，并不代表实时列车倒计时。",
      "City / pack": "城市 / 数据包",
      "Accessibility": "无障碍",
      "Schedules": "时刻表",
      "Live arrivals": "实时到站",
      "Station maps": "车站地图",
      "PENDING": "待补充",
      "PARTIAL": "部分可用",
      "Schedule only": "仅时刻表",
      "OFFICIAL": "官方",
      "SOURCE:": "来源：",
      "07 / ACCESSIBILITY": "07 / 无障碍支持",
      "Support, with honest boundaries.": "提供支持，也坦诚说明边界。",
      "Accessibility affects the profile, route ordering, warnings, station detail, and the Go companion. JustGo distinguishes an affirmative facility record from the absence of evidence.": "无障碍信息会影响个人配置、路线排序、警告、车站详情与 Go 行程助手。JustGo 会区分明确的设施记录与单纯缺少证据。",
      "Route assessment states": "路线评估状态",
      "State": "状态",
      "Current rule": "当前规则",
      "Confirmed": "已确认",
      "Every critical stop has accessibility data and every record marks the station fully accessible.": "每个关键车站都有无障碍数据，且所有记录都将车站标为完全无障碍。",
      "Likely": "很可能",
      "Every critical stop has accessibility data and each has either an elevator or a wheelchair ramp.": "每个关键车站都有无障碍数据，并且每站至少有电梯或轮椅坡道。",
      "Barrier detected": "检测到障碍",
      "Apple walking directions or route warnings mention stairs.": "Apple 步行路线或路线警告中提到了楼梯。",
      "Unknown": "未知",
      "Coverage is incomplete or does not meet a stronger rule. Unknown is not the same as inaccessible.": "覆盖不完整或不符合更强规则。“未知”并不等同于“不可通行”。",
      "Rider controls": "乘客控制项",
      "Wheelchair access, elevator preference, stair avoidance, and maximum walking distance shape route filters and ranking.": "轮椅通行、电梯偏好、避开楼梯和最大步行距离会影响路线筛选与排序。",
      "Audio navigation speaks each Go step; vibration alerts add haptic feedback; visual announcements show a temporary step banner.": "语音导航会朗读每个 Go 步骤；振动提醒提供触觉反馈；视觉提示会暂时显示步骤横幅。",
      "Simplified UI removes nonessential planner sections; step-by-step guidance can open the Go companion automatically.": "简化界面会移除非必要的规划器区域；逐步引导可以自动打开 Go 行程助手。",
      "Accessibility reports are personal notes stored locally. They can lower feasibility and confidence for matching routes, but are not sent to other riders.": "无障碍报告是保存在本地的个人备注。它们可能降低匹配路线的可行性与可信度，但不会发送给其他乘客。",
      "Step-free is not guaranteed": "不保证全程无台阶",
      "The routing graph currently does not encode elevator outages or barrier-free transfer edges. Hard mobility requirements demote routes with a detected barrier; they do not remove every unknown route or prove a complete step-free path.": "当前路线网络图不会编码电梯停运或无障碍换乘边。严格的行动要求会降低检测到障碍的路线排序，但不会移除所有未知路线，也不能证明存在完整无台阶路径。",
      "08 / LIVE GO": "08 / GO 行程助手",
      "A companion, not vehicle tracking.": "是行程助手，不是车辆追踪。",
      "Go converts a chosen route into ordered walk, ride, transfer, and arrival cards. The rider advances and reverses steps manually.": "Go 会把所选路线转换为按顺序排列的步行、乘车、换乘和到达卡片；乘客需要手动前进或返回步骤。",
      "Walking steps can show an Apple Maps route preview when path geometry is available.": "路径几何可用时，步行步骤可以显示 Apple 地图路线预览。",
      "Transfer steps can show a 3D station-area preview centered on the transfer coordinate.": "换乘步骤可以显示以换乘坐标为中心的 3D 车站区域预览。",
      "Ride steps can display the exit hint selected from city-pack guidance.": "乘车步骤可以显示从城市数据包指引中选出的出口提示。",
      "Speech, haptics, and visual banners follow the rider’s local accessibility preferences.": "语音、触觉反馈与视觉横幅会遵循乘客的本地无障碍偏好。",
      "Get-off reminders use the estimated segment duration minus the chosen lead time. Both the in-app banner and local notification explicitly say they are time estimates, not a live train position.": "下车提醒使用路段估算时长减去所选提前量。应用内横幅与本地通知都会明确说明这是时间估算，而非列车实时位置。",
      "The active route is saved locally when Go starts so the planner can offer to resume after the app is terminated.": "Go 启动时，进行中的路线会保存在本地，因此应用被终止后，规划器可以提供继续行程的选项。",
      "09 / ON-DEVICE DATA": "09 / 设备端数据",
      "Your personal layer stays local.": "你的个人数据层留在本地。",
      "The reviewed source stores preferences and rider-created records with": "经复核的源码使用",
      ". There is no sign-in or synchronization service.": "存储偏好与乘客创建的记录；没有登录或同步服务。",
      "Record": "记录",
      "Stored fields": "存储字段",
      "Current limit": "当前上限",
      "Saved trips": "保存的行程",
      "Name, endpoint coordinates and addresses, city, preferred strategy/filter, dates, use count, optional note.": "名称、端点坐标与地址、城市、首选策略/筛选器、日期、使用次数和可选备注。",
      "Trip records": "行程记录",
      "Endpoint names, city, duration, walking, transfers, strategy, warnings, completion and optional note.": "端点名称、城市、时长、步行、换乘、策略、警告、完成状态和可选备注。",
      "Favorite stations": "收藏车站",
      "Station/city IDs, names, coordinates, line metadata, optional Home, Work, or custom tag.": "车站/城市 ID、名称、坐标、线路元数据，以及可选的家庭、工作或自定义标签。",
      "Accessibility reports": "无障碍报告",
      "Station or route reference, item type, status, severity, note, timestamps.": "车站或路线引用、项目类型、状态、严重程度、备注与时间戳。",
      "Recent routes": "最近路线",
      "Station IDs and names, line, duration, city.": "车站 ID 与名称、线路、时长和城市。",
      "Recent station searches": "最近车站搜索",
      "Station ID/name, city, date, count.": "车站 ID/名称、城市、日期与次数。",
      "Active Go trip": "进行中的 Go 行程",
      "The selected route, retained until normal dismissal or explicit discard.": "所选路线，保留到正常结束或明确丢弃为止。",
      "See the": "请参阅",
      "privacy documentation": "隐私文档",
      "for permission timing, Apple Maps data flow, static-host requests, retention, and the app’s privacy-manifest declarations.": "了解权限请求时机、Apple 地图数据流、静态主机请求、保留期限，以及应用隐私清单声明。",
      "10 / KNOWN LIMITS": "10 / 已知限制",
      "What the labels do not promise.": "这些标签不作哪些承诺。",
      "No live vehicle position:": "没有实时车辆位置：",
      "arrival reminders and Go timing use route segment estimates.": "到站提醒与 Go 计时使用路线分段估算值。",
      "No general disruption feed:": "没有通用运营中断信息流：",
      "the current “line status” screen resolves running, not-yet-started, last-train-soon, or ended from first/last schedule windows at a representative station.": "当前“线路状态”界面根据代表性车站的首末班时刻窗口，推导正在运营、尚未开始、末班车临近或运营结束。",
      "No facility uptime guarantee:": "不保证设施当前可用：",
      "a city pack can record that an elevator exists; that does not prove it is operating now.": "城市数据包可以记录某处有电梯，但这不能证明电梯现在正在运行。",
      "No barrier-free graph:": "没有无障碍网络图：",
      "accessibility evidence enriches and ranks routes after graph generation.": "无障碍证据在网络图生成路线后才用于补充信息与排序。",
      "At most three unique graph alternatives:": "最多三条互不重复的网络图方案：",
      "several user-facing modes rerank that set rather than generating a bespoke path.": "多种面向用户的模式只会重新排序这组方案，而不会生成专属路径。",
      "Walking text is language-dependent:": "步行文字依赖语言：",
      "stair detection relies in part on Apple walking instructions and source text.": "楼梯检测部分依赖 Apple 步行指引和来源文本。",
      "Pack freshness varies:": "数据包新鲜度不一：",
      "version dates show build dates, not a promise that every source fact changed or was re-verified that day.": "版本日期表示构建日期，并不承诺每项来源事实都在当天变化或重新核验。",
      "City packs are process-memory data:": "城市数据包保存在进程内存中：",
      "the current service retains decoded packs in memory and may release them on memory pressure; it does not implement an app-managed persistent pack database.": "当前服务会把已解码数据包保留在内存中，并可能在内存压力下释放；它没有实现由应用管理的持久数据包数据库。",
      "11 / DEVELOPMENT": "11 / 开发说明",
      "Build the current source.": "构建当前源码。",
      "The repository is MIT-licensed and built with SwiftUI plus Apple frameworks. No paid routing API key is required.": "该仓库采用 MIT 许可证，使用 SwiftUI 与 Apple 框架构建，不需要付费路线 API 密钥。",
      "Use macOS with Xcode 16 or later and a Swift 5.9-capable toolchain.": "使用 macOS、Xcode 16 或更高版本，以及支持 Swift 5.9 的工具链。",
      "Clone": "克隆",
      "Open": "打开",
      "Optionally define": "可选：定义",
      "or": "或",
      "in": "于",
      "Without a private host, the app falls back to jsDelivr and then raw GitHub for": "没有私有主机时，应用会依次回退到 jsDelivr 和 GitHub 原始文件地址来获取",
      "Build for an iOS or iPadOS 18+ simulator or device.": "为 iOS 或 iPadOS 18+ 模拟器或设备构建。",
      "Architecture in one sentence": "一句话概括架构",
      "SwiftUI views and observable view models call injected service objects; network and graph services are actor-isolated where they own mutable caches; route and station facts remain plain Codable model values.": "SwiftUI 视图与可观察视图模型调用注入的服务对象；拥有可变缓存的网络与图服务使用 actor 隔离；路线与车站事实保持为普通 Codable 模型值。",
      "Read the service catalog →": "阅读服务目录 →",
      "DOCS · 2026-07-13": "文档 · 2026-07-13"
    },
    services: {
      "JustGo Services — Runtime architecture": "JustGo 服务 — 运行时架构",
      "JustGo service catalog: exact responsibilities, data flow, caching, failure behavior, and runtime boundaries.": "JustGo 服务目录：具体职责、数据流、缓存、故障行为与运行时边界。",
      "/ Services": "/ 服务",
      "The services behind": "一条路线背后的",
      "one route.": "全部服务。",
      "Responsibilities, inputs, outputs, network calls, retained state, timeouts, and failure behavior—mapped to the current Swift source.": "依照当前 Swift 源码，逐项说明职责、输入、输出、网络调用、保留状态、超时与故障行为。",
      "RUNTIME SNAPSHOT": "运行时快照",
      "Service source files": "服务源码文件",
      "MapKit deadline": "MapKit 截止时间",
      "12 seconds": "12 秒",
      "Pack request timeout": "数据包请求超时",
      "15 seconds": "15 秒",
      "Pack failure cooldown": "数据包失败冷却",
      "45 seconds": "45 秒",
      "Service source ↗": "服务源码 ↗",
      "Catalog": "目录",
      "Runtime boundaries": "运行时边界",
      "Location & places": "位置与地点",
      "Metro graph": "地铁网络图",
      "City packs": "城市数据包",
      "Route planning": "路线规划",
      "Confidence services": "可信度服务",
      "Station services": "车站服务",
      "Personal data services": "个人数据服务",
      "Notifications": "通知",
      "Caching & failures": "缓存与故障",
      "01 / CATALOG": "01 / 服务目录",
      "Small services, explicit jobs.": "小型服务，职责明确。",
      "At launch,": "启动时，",
      "constructs the production graph and injects it into SwiftUI. Services are concrete objects behind narrow protocols where substitution matters.": "会构建生产服务图并注入 SwiftUI。在需要替换实现的地方，具体服务对象位于职责收窄的协议之后。",
      "DEVICE + APPLE": "设备 + APPLE",
      "Location & place search": "位置与地点搜索",
      "Permission-scoped coordinates, local-search results, reverse geocoding, and walking directions.": "受权限控制的坐标、本地搜索结果、反向地理编码与步行路线。",
      "BUNDLED": "内置",
      "Metro network & routing": "地铁网络与路线计算",
      "46 network files, viewport rendering, graph construction, and three path-cost strategies.": "46 个网络文件、视口渲染、网络图构建和三种路径成本策略。",
      "STATIC HOSTS": "静态主机",
      "Official city packs": "官方城市数据包",
      "Manifest discovery, per-city download, validation, station enrichment, and source confidence.": "清单发现、按城市下载、验证、车站信息补充与来源可信度。",
      "ORCHESTRATION": "编排",
      "Combines graph paths, walking legs, schedules, accessibility, exits, comfort, and ordering.": "组合网络图路径、步行路段、时刻表、无障碍信息、出口、舒适度与排序。",
      "PURE RULES": "纯规则",
      "Trust calculations": "可信度计算",
      "Feasibility, confidence, service hours, crowd-control parsing, and comfort forecasting.": "可行性、可信度、运营时间、客流管控解析与舒适度预测。",
      "ON DEVICE": "设备本地",
      "Memory & reports": "行程记忆与报告",
      "Saved trips, activity, favorite stations, local reports, and resumable Go trips.": "保存的行程、活动记录、收藏车站、本地报告和可恢复的 Go 行程。",
      "Composition root": "组合根",
      "Object": "对象",
      "Production implementation": "生产实现",
      "Lifetime": "生命周期",
      "Location": "位置",
      "App session": "应用会话",
      "Place search": "地点搜索",
      "Metro network": "地铁网络",
      "App session; in-memory caches releasable": "应用会话；内存缓存可释放",
      "Subway routes": "地铁路线",
      "App session; graph caches releasable": "应用会话；网络图缓存可释放",
      "App session; decoded packs retained in memory": "应用会话；已解码数据包保留在内存中",
      "Route orchestration": "路线编排",
      "Personal records": "个人记录",
      "App session + UserDefaults persistence": "应用会话 + UserDefaults 持久化",
      "App session + iOS pending local requests": "应用会话 + iOS 待处理本地请求",
      "02 / RUNTIME BOUNDARIES": "02 / 运行时边界",
      "What leaves the app.": "哪些数据会离开应用。",
      "JustGo has no custom account or route backend in the reviewed source. Runtime network traffic is limited to Apple mapping services and static city-pack hosts.": "经复核的源码中，JustGo 没有自建账户或路线后端。运行时网络流量仅限 Apple 地图服务与城市数据包静态主机。",
      "Boundary": "边界",
      "Sent or requested": "发送或请求内容",
      "Purpose": "目的",
      "Notes": "说明",
      "Apple Maps / Core Location": "Apple 地图 / Core Location",
      "Search query, search region, selected coordinates, walking endpoints, and reverse-geocode coordinates as required by Apple frameworks.": "Apple 框架所需的搜索词、搜索区域、所选坐标、步行端点与反向地理编码坐标。",
      "Place search, POI resolution, walking route, address text, device location.": "地点搜索、兴趣点解析、步行路线、地址文字与设备位置。",
      "Governed by Apple and the device’s location settings. No paid API key is embedded.": "受 Apple 规则与设备位置设置管理；应用未嵌入付费 API 密钥。",
      "HTTP GET for": "通过 HTTP GET 请求",
      ", a selected city-pack JSON file, or a pack asset.": "、所选城市数据包 JSON 文件或数据包资源。",
      "Primary public fallback for enrichment data.": "补充数据的首选公共回退主机。",
      "Request URLs identify the pack/city; normal server metadata such as IP address may be visible to the host.": "请求 URL 会标识数据包/城市；主机可能看到 IP 地址等常规服务器元数据。",
      "The same static files if earlier configured or jsDelivr locations fail.": "此前配置的位置或 jsDelivr 失败时，请求相同的静态文件。",
      "Final public fallback.": "最后的公共回退主机。",
      "No explicit search query or device location is placed into the pack URL by JustGo.": "JustGo 不会把明确的搜索词或设备位置写入数据包 URL。",
      "No runtime geometry request.": "运行时不请求几何数据。",
      "Metro geometry attribution.": "地铁几何数据署名。",
      "Prepared network geometry is bundled in the app. The attribution link opens only if the rider taps it.": "预处理的网络几何内置于应用；只有乘客点击署名链接时才会打开相关网站。",
      "iOS notification center": "iOS 通知中心",
      "Notification title, body, local fire time, sound preference.": "通知标题、正文、本地触发时间与声音偏好。",
      "Departure and estimated get-off reminders.": "出发提醒与估算下车提醒。",
      "Local notifications; no push token or remote notification server is used.": "仅使用本地通知；不使用推送令牌或远程通知服务器。",
      "Source sites versus runtime hosts": "来源网站与运行时主机",
      "City-pack manifests list the public pages from which facts were prepared. The app normally downloads the prepared pack from its configured static host; it does not scrape every listed transit-operator page during a rider’s trip.": "城市数据包清单会列出整理事实所依据的公开页面。应用通常从配置的静态主机下载已准备好的数据包，不会在乘客出行时抓取清单中的每个运营方页面。",
      "03 / LOCATION & PLACES": "03 / 位置与地点",
      "Location is requested for a reason, then stopped.": "按需请求位置，用完即停止。",
      "Wraps": "封装",
      "and exposes the current fix, authorization state, and a single asynchronous location request.": "，提供当前位置、授权状态与一次性异步位置请求。",
      "ACCURACY TARGET": "精度目标",
      ", 10 m distance filter.": "，10 米距离筛选。",
      "CACHE FAST PATH": "缓存快速路径",
      "Authorized fix, at most 30 seconds old and at most 100 m horizontal uncertainty.": "已授权的位置数据，时间不超过 30 秒，水平不确定度不超过 100 米。",
      "REQUEST TIMEOUT": "请求超时",
      "15 seconds before pending callers receive “current location unavailable.”": "15 秒后，等待中的调用方会收到“当前位置不可用”。",
      "BATTERY BEHAVIOR": "电池行为",
      "Continuous updates run only while a request is pending and stop on success, failure, timeout, or cancellation.": "连续更新只在有请求等待时运行，并在成功、失败、超时或取消时停止。",
      "PREWARM": "预热",
      "One-shot": "一次性调用",
      "; does nothing and shows no prompt unless already authorized.": "；除非已经获得授权，否则不会执行操作或显示提示。",
      "PERMISSION": "权限",
      "When-in-use is requested lazily. Denied or restricted state clears the in-memory fix.": "使用期间的位置权限按需请求；拒绝或受限状态会清除内存中的位置。",
      "Uses": "使用",
      "for addresses and POIs and creates a fresh": "搜索地址与兴趣点，并为每次反向地理编码调用创建新的",
      "for each reverse-geocode call so overlapping requests do not cancel one another.": "，从而避免重叠请求相互取消。",
      "RESULT TYPES": "结果类型",
      "Address and point-of-interest.": "地址与兴趣点。",
      "SEARCH BIAS": "搜索偏向",
      "Visible map region when available; otherwise an 80 km × 80 km region around the selected city.": "优先使用可见地图区域；否则使用所选城市周围 80 公里 × 80 公里的区域。",
      "RESULT LIMITS": "结果上限",
      "12 for map place search, 20 for combined station search, 6 for suggestions.": "地图地点搜索 12 条，组合车站搜索 20 条，建议 6 条。",
      "DEADLINE": "截止时间",
      "12-second race around MapKit calls so UI spinners can recover from a stalled framework request.": "为 MapKit 调用设置 12 秒竞争超时，使界面加载指示器能从卡住的框架请求中恢复。",
      "CANCELLATION": "取消",
      "Callers guard against stale results because MapKit requests may continue after Swift task cancellation.": "由于 Swift 任务取消后 MapKit 请求仍可能继续，调用方会防止旧结果生效。",
      "FAILURE": "失败",
      "Surfaces a user-facing “place search requires a network connection” result.": "向用户显示“地点搜索需要网络连接”的结果。",
      "04 / METRO GRAPH": "04 / 地铁网络图",
      "The subway path is local.": "地铁路径在本地计算。",
      "Loads one of 46 bundled JSON files containing city bounds, stations, lines, service patterns, and physical-track polylines.": "加载 46 个内置 JSON 文件之一，其中包含城市边界、车站、线路、运营模式与真实轨道折线。",
      "VALIDATION": "验证",
      "City ID must match the requested ID and": "城市 ID 必须与请求的 ID 一致，且",
      "must equal": "必须等于",
      "CHEAP CITY MATCH": "轻量城市匹配",
      "Decodes bounds-only summaries for all cities before loading full network objects.": "在加载完整网络对象前，先解码所有城市仅含边界的摘要。",
      "DECODE THREAD": "解码线程",
      "File reads and JSON decoding run in a detached utility task.": "文件读取与 JSON 解码在分离的实用任务中运行。",
      "CACHES": "缓存",
      "Full networks, display stations, summaries, and normalized station-name indexes.": "完整网络、显示车站、摘要与规范化车站名称索引。",
      "MAP RULES": "地图规则",
      "Normal station markers appear only at closer zoom; transfer stations remain visible farther out.": "普通车站标记只在较近缩放级别显示；换乘站在更远视图中仍保持可见。",
      "RELEASE": "释放",
      "Memory warning clears full networks, display stations, and normalized indexes.": "内存警告会清除完整网络、显示车站与规范化索引。",
      "Builds an adjacency graph from service-pattern station pairs, searches it with a minimum-cost heap, and assembles the winning edges into ride and transfer segments.": "根据运营模式中的车站对构建邻接图，使用最小成本堆进行搜索，再把胜出边组合为乘车段与换乘段。",
      "COVERAGE GATE": "覆盖门槛",
      "Both endpoints within 25 km of network bounds.": "两个端点均须位于网络边界 25 公里以内。",
      "ACCESS CANDIDATES": "接入候选",
      "Four nearest stations for each endpoint.": "每个端点选择最近的四座车站。",
      "GENERATED PATHS": "生成路径",
      "Fastest, fewest transfers, least walking; duplicate edge sequences are removed.": "最快、换乘最少、步行最少；重复边序列会被移除。",
      "TRANSFER COST": "换乘成本",
      "300 seconds normally; 1,200 seconds for fewest-transfer search.": "通常为 300 秒；换乘最少搜索为 1,200 秒。",
      "WALK COST": "步行成本",
      "Distance ÷ 1.25 m/s; multiplied by three in least-walking search.": "距离 ÷ 1.25 米/秒；步行最少搜索中乘以三。",
      "TRAIN COST": "列车成本",
      "seconds.": "秒。",
      "WALKING LEGS": "步行路段",
      "when available; straight-line + 1.25 m/s fallback.": "可用时调用；否则回退为直线距离 + 1.25 米/秒。",
      "GEOMETRY GUARDS": "几何保护",
      "Handles ring-line seams and rejects implausibly long polyline matches.": "处理环线接缝，并拒绝不合理的超长折线匹配。",
      "05 / CITY PACKS": "05 / 城市数据包",
      "Enrichment is downloaded per city.": "补充数据按城市下载。",
      "owns manifest lookup, pack downloads, validation, in-memory indexing, and station enrichment.": "负责清单查找、数据包下载、验证、内存索引和车站信息补充。",
      "Find a manifest": "查找清单",
      "Try configured manifest/base/fallback values, then jsDelivr, then raw GitHub. Duplicate URLs are removed.": "依次尝试配置的清单、基础地址与回退值，然后尝试 jsDelivr 和 GitHub 原始文件；重复 URL 会被移除。",
      "Find the city": "查找城市",
      "The manifest entry decides whether a pack is available, source-pending, unavailable, or not configured.": "清单条目决定数据包是可用、来源待补充、不可用还是未配置。",
      "Coalesce work": "合并任务",
      "Concurrent callers for the same city share one in-flight task. A delete increments the load generation and cancels stale completion.": "同一城市的并发调用方共享一个进行中任务。删除操作会增加加载代数并取消旧任务完成结果。",
      "Download & validate": "下载并验证",
      "Each request has a 15-second timeout. Decoded city ID and version must exactly match the manifest entry.": "每个请求有 15 秒超时；解码出的城市 ID 与版本必须与清单条目完全一致。",
      "Index in memory": "在内存中建立索引",
      "Station records are keyed by normalized name. The service does not write an app-managed persistent pack file.": "车站记录以规范化名称为键；服务不会写入由应用管理的持久数据包文件。",
      "Enrich on demand": "按需补充",
      "Stations receive lines, accessibility, facilities, schedules, maps, timetable assets, service status, exits, platform hints, and interchange hints when fields exist.": "字段存在时，车站会获得线路、无障碍、设施、时刻表、地图、时刻表资源、运营状态、出口、站台提示与换乘提示。",
      "Important operational details": "重要运行细节",
      "A failed load is cached for 45 seconds, preventing every station lookup from restarting the full fallback chain while the rider is underground.": "失败加载会缓存 45 秒，避免乘客在地下时每次车站查询都重新启动完整回退链。",
      "Manifests are cached by URL for the app session. Loaded packs remain decoded in memory until deletion or memory-pressure release.": "清单按 URL 在应用会话内缓存；已加载数据包会以解码状态留在内存中，直到删除或因内存压力释放。",
      "Exit guidance prefers structured pack entries. If none exist, a short exit token may be extracted from accessibility text and labeled estimated.": "出口指引优先使用结构化数据包条目；如果不存在，可能从无障碍文字中提取简短出口标记，并标为估算。",
      "“Train times” are represented as official schedule rows. Their remaining-minutes field is": "“列车时间”以官方时刻表行表示；其剩余分钟字段为",
      "unless a future live provider supplies it.": "，除非未来的实时提供方为其赋值。",
      "06 / ROUTE PLANNING": "06 / 路线规划",
      "One coordinator, several independent lookups.": "一个协调器，多项独立查询。",
      "asks the route provider for alternatives, enriches each alternative concurrently, and exposes ranking functions for all user-facing modes.": "向路线提供方请求备选方案，并发补充每个方案，再为所有面向用户的模式提供排序函数。",
      "Stage": "阶段",
      "Work": "工作",
      "Output attached to Route": "附加到 Route 的输出",
      "Critical stops": "关键车站",
      "Deduplicate boarding, transfer, and arrival endpoints.": "去重上车、换乘与到达端点。",
      "Stable list used by all enrichment calls.": "供所有信息补充调用使用的稳定列表。",
      "Parallel enrichment": "并行补充",
      "Fetch coverage counts, enriched accessibility records, and crowd-control windows concurrently.": "并发获取覆盖计数、增强无障碍记录与客流管控时段。",
      "Service hours": "运营时间",
      "Match boarding line to official first/last windows at the departure moment.": "在出发时刻，将上车线路与官方首末班窗口匹配。",
      "Running, last-train-soon, ended, not-yet-started, or unknown.": "运营中、末班车临近、已结束、尚未开始或未知。",
      "Station guidance": "车站指引",
      "Choose official or estimated access points and matching transfer-corridor hints.": "选择官方或估算的出入口点，以及匹配的换乘通道提示。",
      "Boarding/transfer/arrival guidance with confidence.": "带可信度的上车/换乘/到达指引。",
      "Assess all critical stops and walking warnings.": "评估所有关键车站与步行警告。",
      "Confirmed, likely, unknown, or barrier detected.": "已确认、很可能、未知或检测到障碍。",
      "Ranking": "排序",
      "Apply chosen preference; use comfort only after all stronger keys tie.": "应用所选偏好；只有所有更强排序键相同时才使用舒适度。",
      "Ordered alternatives; none are silently removed.": "排好顺序的备选方案；不会静默移除任何路线。",
      "07 / CONFIDENCE SERVICES": "07 / 可信度服务",
      "Pure calculations are kept separate.": "纯计算彼此独立。",
      "Combines step-free state, route warnings, walking instruction keywords, local reports, and comfort. It produces good, caution, risky, or unknown; explanations; a bottleneck; and estimated extra minutes.": "组合无台阶状态、路线警告、步行指引关键词、本地报告与舒适度，输出良好、需注意、风险高或未知，以及解释、瓶颈和估算额外分钟数。",
      "Applies the documented 0–100 rule set after feasibility is known. It returns a level, one mode-aware explanation, positive reasons, and warnings. It performs no network calls and uses no machine-learning model.": "在可行性确定后应用文档中的 0–100 规则集，返回等级、一条感知模式的解释、正面理由与警告。它不发起网络调用，也不使用机器学习模型。",
      "Parses first/last schedule strings, including multiple times separated by slash and last trains after midnight. “Last train soon” means within 20 minutes of the latest matched last-train time.": "解析首末班时刻字符串，包括斜线分隔的多个时间与午夜后的末班车。“末班车临近”表示距离匹配到的最晚末班车时间不足 20 分钟。",
      "Only runs when source-backed crowd-control windows exist for the route. An active official window produces busy; otherwise weekday 07:30–09:30 or 17:00–19:30 can produce moderate; outside those periods the route is labeled likely comfortable.": "仅在路线存在注明来源的客流管控时段时运行。当前生效的官方时段会产生“拥挤”；否则，工作日 07:30–09:30 或 17:00–19:30 可产生“一般”；这些时段以外标为“可能舒适”。",
      "Turns route segments into ordered walking, transfer, ride, and arrival steps. It uses only the selected route snapshot and carries arrival-exit hints into ride steps.": "将路线分段转换为有序的步行、换乘、乘车与到达步骤；只使用所选路线快照，并把到达出口提示带入乘车步骤。",
      "08 / STATION SERVICES": "08 / 车站服务",
      "Search local first, then broaden.": "先搜索本地，再扩大范围。",
      "combines the selected city’s bundled station list with Apple place search and city-pack enrichment.": "把所选城市的内置车站列表、Apple 地点搜索与城市数据包补充结果组合起来。",
      "An empty keyword returns the bundled city station list.": "关键词为空时返回内置城市车站列表。",
      "A keyword first filters station name, English name, and pinyin locally.": "关键词首先在本地筛选车站名称、英文名与拼音。",
      "Apple place results are resolved concurrently; a result matching a known station is replaced by the station model.": "Apple 地点结果会并发解析；与已知车站匹配的结果会替换为车站模型。",
      "Results are deduplicated by city plus normalized station name.": "结果按城市与规范化车站名称去重。",
      "Filters can require known full accessibility, a known elevator, transfer status, or a facility type.": "筛选器可以要求已知的完全无障碍、已知电梯、换乘状态或设施类型。",
      "When location exists, filtered station results are sorted by calculated distance; otherwise they are sorted by localized name.": "有位置时，筛选后的车站按计算距离排序；否则按本地化名称排序。",
      "09 / PERSONAL DATA SERVICES": "09 / 个人数据服务",
      "Useful memory without an account.": "无需账户的实用记忆。",
      "Service": "服务",
      "Responsibility": "职责",
      "Persistence": "持久化",
      "Saved trips (50), trip records (300), favorite stations (50), Home/Work/custom tags, use counts, and notes.": "保存的行程（50）、行程记录（300）、收藏车站（50）、家庭/工作/自定义标签、使用次数与备注。",
      "Codable values in UserDefaults.": "UserDefaults 中的 Codable 值。",
      "Up to 100 station or route reports with status, severity, item type, note, and timestamps.": "最多 100 条车站或路线报告，包含状态、严重程度、项目类型、备注与时间戳。",
      "Codable values in UserDefaults; never uploaded by this service.": "UserDefaults 中的 Codable 值；此服务从不上传。",
      "One selected route while Go is active, allowing recovery after iOS terminates the app.": "Go 活动期间保存一条所选路线，使 iOS 终止应用后仍可恢复。",
      "UserDefaults; cleared after normal Go dismissal or explicit discard.": "UserDefaults；Go 正常结束或明确丢弃后清除。",
      "Selected tab/city in memory and the rider’s accessibility profile on disk.": "内存中的所选标签页/城市，以及磁盘上的乘客无障碍配置。",
      "Accessibility preference in UserDefaults.": "UserDefaults 中的无障碍偏好。",
      "View models": "视图模型",
      "Ten recent routes, ten recent station searches, selected sort strategy.": "十条最近路线、十次最近车站搜索与所选排序策略。",
      "For field-level detail and third-party processing, read the": "如需字段级细节与第三方处理说明，请阅读",
      "privacy page": "隐私页面",
      "UserDefaults.": "UserDefaults。",
      "10 / NOTIFICATIONS": "10 / 通知",
      "Local reminders, requested lazily.": "按需请求的本地提醒。",
      "is the only notification layer in the current source.": "是当前源码中唯一的通知层。",
      "Authorization is requested when the rider first tries to schedule a reminder, never automatically at launch.": "乘客首次尝试安排提醒时才会请求授权，启动时绝不会自动请求。",
      "Departure reminders use a nonrepeating calendar trigger at the calculated leave-by time minus the selected lead minutes.": "出发提醒使用不重复的日历触发器，触发时间为计算出的最晚出发时间减去所选提前分钟数。",
      "Get-off reminders use a nonrepeating time-interval trigger based on estimated route-segment duration.": "下车提醒根据估算路线分段时长使用不重复的时间间隔触发器。",
      "Past-dated reminders are not scheduled. Replacing a reminder cancels the previous request with the same route or step identifier.": "不会安排已过期提醒。替换提醒时，会取消具有相同路线或步骤标识符的先前请求。",
      "Foreground reminders are explicitly shown as a banner with sound.": "前台提醒会明确以带声音的横幅显示。",
      "No remote push provider, device token, or notification analytics appears in the service.": "该服务中没有远程推送提供方、设备令牌或通知分析。",
      "11 / CACHING & FAILURE": "11 / 缓存与故障",
      "Fail fast enough to remain usable underground.": "足够快地失败，才能在地下保持可用。",
      "Condition": "情况",
      "Behavior": "行为",
      "Stalled MapKit call": "MapKit 调用卡住",
      "The app-side 12-second race releases the caller and loading UI. The Apple framework request may continue in the background, so stale-result guards remain necessary.": "应用端 12 秒竞争会释放调用方与加载界面。Apple 框架请求可能仍在后台继续，因此仍需防止旧结果生效。",
      "Stalled pack host": "数据包主机卡住",
      "The URL request has a 15-second timeout before the next fallback host is tried.": "URL 请求在尝试下一个回退主机前有 15 秒超时。",
      "Repeated pack failure": "数据包重复失败",
      "The city returns the cached failed status for 45 seconds instead of restarting every enrichment request.": "该城市会在 45 秒内返回缓存的失败状态，而不是重启每个补充请求。",
      "Concurrent pack requests": "并发数据包请求",
      "One in-flight task is shared per city. A later deletion invalidates its generation.": "每个城市共享一个进行中任务；后续删除会使该代任务失效。",
      "Malformed network": "网络数据格式错误",
      "The city is marked missing for the session rather than crashing the route or map flow.": "该城市会在本次会话中标为缺失，而不会让路线或地图流程崩溃。",
      "Missing walking route": "缺失步行路线",
      "Use straight-line distance and estimated time; attach an explicit estimate note.": "使用直线距离与估算时间，并附上明确的估算说明。",
      "Memory warning": "内存警告",
      "Release decoded city packs, full metro networks, station projections, graph caches, and normalized-name indexes.": "释放已解码城市数据包、完整地铁网络、车站投影、网络图缓存与规范化名称索引。",
      "App termination during Go": "Go 期间应用被终止",
      "Retain the active route in UserDefaults and offer a resume banner on the next planner appearance.": "在 UserDefaults 中保留进行中的路线，并在规划器下次出现时提供继续横幅。",
      "Read the service source ↗": "阅读服务源码 ↗",
      "Review known limits →": "查看已知限制 →",
      "SERVICES · 2026-07-13": "服务 · 2026-07-13"
    },
    privacy: {
      "JustGo Privacy — Data handling and permissions": "JustGo 隐私政策 — 数据处理与权限",
      "JustGo privacy policy and implementation notes: location, Apple Maps, city-pack requests, local storage, retention, and permissions.": "JustGo 隐私政策与实现说明：位置、Apple 地图、城市数据包请求、本地存储、保留期限与权限。",
      "/ Privacy": "/ 隐私",
      "Private by design,": "以隐私为设计原则，",
      "specific by policy.": "以具体政策说明。",
      "This page states what the current JustGo app handles, what stays on the device, which third parties receive requests, and how to remove or restrict that data.": "本页说明当前 JustGo 应用处理哪些数据、哪些数据留在设备上、哪些第三方会收到请求，以及如何删除或限制这些数据。",
      "POLICY STATUS": "政策状态",
      "Effective": "生效日期",
      "Accounts": "账户",
      "None": "无",
      "Advertising / tracking": "广告 / 追踪",
      "Developer user backend": "开发者用户后端",
      "None in source": "源码中没有",
      "Privacy manifest ↗": "隐私清单 ↗",
      "Plain-language summary": "通俗摘要",
      "Scope & contact": "范围与联系",
      "Data handled": "处理的数据",
      "Location": "位置",
      "Network services": "网络服务",
      "Local storage": "本地存储",
      "Permissions": "权限",
      "Apple manifest": "Apple 隐私清单",
      "Retention & deletion": "保留与删除",
      "Security": "安全",
      "Changes": "变更",
      "01 / PLAIN-LANGUAGE SUMMARY": "01 / 通俗摘要",
      "The privacy model in four facts.": "用四件事说明隐私模式。",
      "No JustGo account": "没有 JustGo 账户",
      "The current app has no sign-in, profile server, cloud synchronization, or developer-operated user database.": "当前应用没有登录、个人资料服务器、云同步，也没有由开发者运营的用户数据库。",
      "Personal records stay local": "个人记录留在本地",
      "Saved trips, favorite stations, history, preferences, active trips, and accessibility reports are written to the app’s local container.": "保存的行程、收藏车站、历史记录、偏好、进行中的行程与无障碍报告都写入应用本地容器。",
      "Maps are a third-party service": "地图属于第三方服务",
      "Apple frameworks receive place queries and coordinates when JustGo performs search, reverse geocoding, or walking directions.": "JustGo 执行搜索、反向地理编码或步行路线时，Apple 框架会接收地点查询与坐标。",
      "No ads or behavioral tracking": "没有广告或行为追踪",
      "The reviewed source contains no advertising SDK, analytics SDK, cross-app tracking code, or remote push provider.": "经复核的源码不包含广告 SDK、分析 SDK、跨应用追踪代码或远程推送提供方。",
      "Transit privacy is not the same as zero network traffic": "保护出行隐私并不等于没有网络流量",
      "Place search and walking guidance depend on Apple services. City-pack enrichment depends on static file hosts. Those providers receive normal network requests under their own privacy terms.": "地点搜索与步行指引依赖 Apple 服务，城市数据包补充依赖静态文件主机。这些提供方会依据各自隐私条款接收正常网络请求。",
      "02 / SCOPE & CONTACT": "02 / 范围与联系",
      "What this policy covers.": "本政策覆盖哪些内容。",
      "This policy covers the JustGo iOS and iPadOS app represented by the public": "本政策适用于公开",
      "repository and the JustGo documentation on this site. It describes source reviewed through commit": "仓库所代表的 JustGo iOS 与 iPadOS 应用，以及本网站上的 JustGo 文档。政策描述复核至提交",
      "and may change as the app adds services.": "的源码，并可能随着应用新增服务而变化。",
      "Questions, deletion concerns that cannot be resolved on the device, or privacy reports can be sent to": "如有问题、无法在设备上解决的删除事项或隐私报告，请发送至",
      "03 / DATA HANDLED": "03 / 处理的数据",
      "Field-level data flow.": "字段级数据流。",
      "Data": "数据",
      "When handled": "处理时机",
      "Where it goes": "流向",
      "Retention": "保留期限",
      "Device location": "设备位置",
      "When the rider requests current location, nearby stations, or a location-based route input.": "乘客请求当前位置、附近车站或基于位置的路线输入时。",
      "Held in app memory; coordinates may be passed to Apple mapping/geocoding services. Not sent to a JustGo-operated server.": "保存在应用内存中；坐标可能传给 Apple 地图/地理编码服务，不会发送到 JustGo 运营的服务器。",
      "Latest fix in memory. A coordinate can persist locally if used in a saved place or trip.": "最新位置保存在内存中；若坐标用于保存的地点或行程，则可能在本地持久保留。",
      "Place queries": "地点查询",
      "When typing an address, landmark, or POI that requires Apple place search.": "输入需要 Apple 地点搜索的地址、地标或兴趣点时。",
      "Apple Maps through": "通过 Apple 地图的",
      ", with a city or visible-map search region.": "发送，并附带城市或可见地图搜索区域。",
      "JustGo does not store raw free-text query history as a separate log. Selected station and recent-route records may persist locally.": "JustGo 不会把原始自由文本查询历史单独存为日志；所选车站与最近路线记录可能保存在本地。",
      "Route endpoints": "路线端点",
      "When planning, saving, or resuming a trip.": "规划、保存或恢复行程时。",
      "Used locally by the metro graph; coordinates are sent to Apple when walking directions are requested.": "由本地地铁网络图使用；请求步行路线时，坐标会发送给 Apple。",
      "Current planner state in memory; saved-trip coordinates/addresses, recent station IDs, or an active route may persist locally.": "当前规划器状态保存在内存中；已保存行程的坐标/地址、最近车站 ID 或进行中的路线可能在本地持久保留。",
      "Favorite stations": "收藏车站",
      "When a rider favorites or tags a station.": "乘客收藏车站或为车站添加标签时。",
      "Local app storage only.": "仅存储在应用本地。",
      "Up to 50 until individually removed or the app’s data is deleted.": "最多 50 条，保留到逐条删除或应用数据被删除。",
      "Trip memory": "行程记忆",
      "When a trip is saved, planned, completed, or annotated.": "保存、规划、完成行程或添加备注时。",
      "Up to 50 saved trips and 300 trip records.": "最多 50 条保存的行程和 300 条行程记录。",
      "Accessibility profile": "无障碍配置",
      "When route/accessibility settings are changed.": "路线/无障碍设置发生变化时。",
      "Local app storage; used to alter UI, warnings, and ranking.": "存储在应用本地，用于调整界面、警告和排序。",
      "Until changed or the app’s data is deleted.": "保留到被修改或应用数据被删除。",
      "Accessibility reports": "无障碍报告",
      "When the rider writes a personal station or route report.": "乘客撰写个人车站或路线报告时。",
      "Local app storage only. The current service contains no upload call.": "仅存储在应用本地；当前服务没有上传调用。",
      "Up to 100 until individually removed or the app’s data is deleted.": "最多 100 条，保留到逐条删除或应用数据被删除。",
      "Notification content": "通知内容",
      "When the rider schedules a departure or estimated get-off reminder.": "乘客安排出发提醒或估算下车提醒时。",
      "iOS local notification center.": "iOS 本地通知中心。",
      "Until it fires, is replaced, is canceled, or iOS removes it.": "保留到触发、被替换、被取消或由 iOS 移除。",
      "City-pack request metadata": "城市数据包请求元数据",
      "When a manifest, selected city pack, or pack asset is requested.": "请求清单、所选城市数据包或数据包资源时。",
      "The configured static host, jsDelivr, or GitHub. Hosts may receive IP address, request time, requested path, and ordinary HTTP metadata.": "发送至配置的静态主机、jsDelivr 或 GitHub。主机可能收到 IP 地址、请求时间、请求路径与常规 HTTP 元数据。",
      "Controlled by the third-party host’s policy; JustGo keeps decoded pack data in process memory.": "保留期限由第三方主机政策控制；JustGo 将解码后的数据包数据保存在进程内存中。",
      "Website display language": "网站显示语言",
      "On the first visit when no preference exists, and whenever a visitor uses the language switcher.": "首次访问且没有已保存偏好时，以及访客每次使用语言切换器时。",
      "The browser language is read locally and is not stored by the site. An explicit selection is written to localStorage as": "浏览器语言只在本地读取，网站不会存储。明确选择会写入 localStorage，键名为",
      "and a first-party": "以及一个第一方",
      "cookie scoped to this site. The cookie accompanies same-origin requests handled by the site host; no developer-operated backend uses it.": "Cookie，作用域为本网站。该 Cookie 会随同源请求发送至网站托管方；没有由开发者运营的后端使用它。",
      "The cookie lasts up to one year. localStorage remains until the choice is changed or browser site data is cleared.": "Cookie 最长保留一年；localStorage 会保留到选择发生变化或浏览器网站数据被清除。",
      "Data the reviewed app does not ask for": "经复核的应用不会请求的数据",
      "JustGo does not request a name, email address, phone number, password, contacts, calendar, photos, camera, microphone, payment details, advertising identifier, or social profile. Speech guidance uses text-to-speech; it does not record the rider’s voice.": "JustGo 不会请求姓名、电子邮件地址、电话号码、密码、联系人、日历、照片、相机、麦克风、付款信息、广告标识符或社交资料。语音引导使用文字转语音，不会录制乘客声音。",
      "04 / LOCATION": "04 / 位置",
      "On demand—not a background trail.": "按需使用，不形成后台轨迹。",
      "The current source calls": "当前源码调用",
      ". It does not start a persistent background-location session.": "，不会启动持续的后台位置会话。",
      "Location is used to center the map, identify a nearby city, calculate station distances, fill “Current Location,” and reverse geocode an address label.": "位置用于居中地图、识别附近城市、计算车站距离、填写“当前位置”，以及反向地理编码地址标签。",
      "A cached fix is reused only when authorized, no more than 30 seconds old, and no worse than 100 m horizontal accuracy.": "只有在已授权、位置数据不超过 30 秒且水平精度不差于 100 米时，才会复用缓存位置。",
      "Continuous GPS updates run only while one or more explicit requests are waiting and stop on success, error, timeout, or cancellation.": "连续 GPS 更新只在一个或多个明确请求等待时运行，并在成功、出错、超时或取消时停止。",
      "A prewarm operation uses a one-shot request only after permission already exists; it does not trigger the permission prompt.": "预热操作只会在已经获得权限后发起一次性请求，不会触发权限提示。",
      "Turning off location permission does not remove saved route or favorite coordinates already stored on the device.": "关闭位置权限不会删除设备上已存储的路线或收藏坐标。",
      "Info.plist wording": "Info.plist 文案",
      "The app bundle includes both when-in-use and always-and-when-in-use description strings. The reviewed implementation requests when-in-use access and does not configure background tracking.": "应用包同时包含“使用期间”和“始终及使用期间”的说明字符串。经复核的实现只请求使用期间权限，且没有配置后台追踪。",
      "05 / NETWORK SERVICES": "05 / 网络服务",
      "Third parties have their own rules.": "第三方适用各自规则。",
      "JustGo uses Apple frameworks and public static hosts. These providers process requests under their own terms, independently from this policy.": "JustGo 使用 Apple 框架和公共静态主机。这些提供方依据各自条款处理请求，不受本政策直接控制。",
      "Provider": "提供方",
      "Purpose": "目的",
      "JustGo request contents": "JustGo 请求内容",
      "Apple": "Apple",
      "Device location, place search, reverse geocoding, POI resolution, base-map display, and walking directions.": "设备位置、地点搜索、反向地理编码、兴趣点解析、底图显示与步行路线。",
      "As required by the selected Apple API: query text, region, coordinates, walking endpoints, and device/service metadata.": "根据所选 Apple API 的需要：查询文字、区域、坐标、步行端点与设备/服务元数据。",
      "Public fallback host for the manifest, city packs, and assets.": "清单、城市数据包与资源的公共回退主机。",
      "Static file path identifying the requested manifest, city, pack version, or asset; ordinary network metadata.": "标识所请求清单、城市、数据包版本或资源的静态文件路径，以及常规网络元数据。",
      "Final raw-file fallback and links to source/data attribution.": "最终原始文件回退，以及指向源码/数据署名的链接。",
      "Static file path and ordinary network metadata when a fallback is used or a link is opened.": "使用回退或打开链接时的静态文件路径与常规网络元数据。",
      "Attribution and source of prepared metro geometry.": "已准备地铁几何数据的署名与来源。",
      "No automatic runtime geometry request. Tapping the attribution link opens the OSM website.": "运行时不会自动请求几何数据；点击署名链接会打开 OSM 网站。",
      "Reference policies:": "参考政策：",
      "Apple Privacy Policy": "Apple 隐私政策",
      "GitHub Privacy Statement": "GitHub 隐私声明",
      "jsDelivr Privacy Policy": "jsDelivr 隐私政策",
      ", and": "，以及",
      "OpenStreetMap Foundation Privacy Policy": "OpenStreetMap 基金会隐私政策",
      "06 / LOCAL STORAGE": "06 / 本地存储",
      "What is written to the app container.": "哪些内容会写入应用容器。",
      "The current source serializes these records into": "当前源码将这些记录序列化到",
      ". JustGo does not implement CloudKit, iCloud key-value synchronization, or an account sync API.": "。JustGo 没有实现 CloudKit、iCloud 键值同步或账户同步 API。",
      "Theme, language choice, badge display, reminder lead times, onboarding state, arrival-alert setting, and route sort strategy.": "主题、语言选择、徽章显示、提醒提前量、引导状态、到站提醒设置与路线排序策略。",
      "Accessibility category and mobility, audio, visual, haptic, cognitive, and walking preferences.": "无障碍类别，以及行动、音频、视觉、触觉、认知与步行偏好。",
      "Saved trips, trip records, favorite stations and tags, recent route summaries, and recent station selections.": "保存的行程、行程记录、收藏车站与标签、最近路线摘要和最近车站选择。",
      "Personal accessibility reports and optional free-text notes.": "个人无障碍报告与可选自由文本备注。",
      "One active route while the Go companion is in progress.": "Go 行程助手进行期间的一条活动路线。",
      "These records may be included in device backups according to the rider’s iOS backup settings. JustGo does not separately control Apple’s device-backup retention.": "这些记录可能依据乘客的 iOS 备份设置包含在设备备份中。JustGo 不会单独控制 Apple 的设备备份保留期限。",
      "07 / PERMISSIONS": "07 / 权限",
      "Permission timing and effects.": "权限请求时机与影响。",
      "Permission": "权限",
      "Requested when": "请求时机",
      "If denied": "拒绝后",
      "Change later": "稍后更改",
      "Location while using app": "使用应用期间的位置",
      "The rider asks for current location and authorization is not yet determined.": "乘客请求当前位置，且授权状态尚未确定时。",
      "Map centering, nearby distance, and Current Location input are unavailable. Manual place/station selection remains possible.": "地图居中、附近距离与当前位置输入不可用；仍可手动选择地点/车站。",
      "iOS Settings → Privacy & Security → Location Services → JustGo.": "iOS 设置 → 隐私与安全性 → 定位服务 → JustGo。",
      "The rider first enables a departure or get-off reminder.": "乘客首次启用出发或下车提醒时。",
      "No local reminder is scheduled. Route planning and Go cards still work.": "不会安排本地提醒；路线规划与 Go 卡片仍可使用。",
      "iOS Settings → Notifications → JustGo.": "iOS 设置 → 通知 → JustGo。",
      "JustGo does not request camera, microphone, photo-library, contacts, Bluetooth, motion, health, or tracking authorization in the reviewed source.": "经复核的源码中，JustGo 不会请求相机、麦克风、照片图库、联系人、蓝牙、运动、健康或追踪授权。",
      "08 / APPLE PRIVACY MANIFEST": "08 / APPLE 隐私清单",
      "The shipped declarations.": "随应用交付的声明。",
      "The repository includes": "仓库包含",
      ". This table reproduces its current declarations; Apple’s manifest vocabulary is not a description of a JustGo account system.": "。下表复现其当前声明；Apple 隐私清单用语并不表示 JustGo 存在账户系统。",
      "Declaration": "声明",
      "Current value": "当前值",
      "Implementation context": "实现背景",
      "Tracking": "追踪",
      "false": "否",
      "No cross-app tracking behavior or tracking domains are declared.": "未声明跨应用追踪行为或追踪域名。",
      "Location data": "位置数据",
      "Collected; linked; app functionality; not used for tracking.": "收集；关联；用于应用功能；不用于追踪。",
      "Conservative Apple-manifest declaration for route/location functionality. The reviewed app has no JustGo account identifier or developer user backend.": "针对路线/位置功能作出的保守 Apple 隐私清单声明。经复核的应用没有 JustGo 账户标识符或开发者用户后端。",
      "UserDefaults API": "UserDefaults API",
      "Reason": "原因",
      "Stores settings, preferences, recent activity, saved trips, favorites, reports, and the active trip.": "存储设置、偏好、最近活动、保存的行程、收藏、报告与进行中的行程。",
      "Disk space API": "磁盘空间 API",
      "Declared required-reason API category in the app manifest.": "应用隐私清单中声明的必需理由 API 类别。",
      "System boot time API": "系统启动时间 API",
      "SOURCE:": "来源：",
      "09 / RETENTION & DELETION": "09 / 保留与删除",
      "Controls live where the records live.": "控制项就在记录所在之处。",
      "Saved trips, trip records, favorite stations, recent searches, and accessibility reports have item-level delete controls in their relevant screens.": "保存的行程、行程记录、收藏车站、最近搜索与无障碍报告，都可以在相应界面逐条删除。",
      "The active Go route is cleared after normal dismissal or an explicit discard. If iOS terminates the app mid-trip, it remains so the rider can resume.": "活动 Go 路线会在正常结束或明确丢弃后清除。如果 iOS 在行程中终止应用，路线会保留，以便乘客继续。",
      "Pending local notifications can be canceled by changing the route/step flow or disabled in iOS Settings.": "待处理的本地通知可通过更改路线/步骤流程取消，也可在 iOS 设置中禁用。",
      "The current city-pack service holds decoded packs in memory. Its delete action cancels a load and removes the in-memory pack; no app-managed persistent pack database is present.": "当前城市数据包服务将解码后的数据包保存在内存中。删除操作会取消加载并移除内存数据包；不存在由应用管理的持久数据包数据库。",
      "To remove all JustGo local records at once, delete the app and its data from the device. If the device is restored from a backup, Apple’s backup settings may restore app-container data.": "如需一次性移除全部 JustGo 本地记录，请从设备删除应用及其数据。如果设备从备份恢复，Apple 的备份设置可能恢复应用容器数据。",
      "To stop future Apple location processing, revoke JustGo’s location permission. To stop future static-host requests, do not load city-pack-dependent detail while online or remove network access at the system level.": "如需停止未来的 Apple 位置处理，请撤销 JustGo 的位置权限。如需停止未来的静态主机请求，请勿在联网时加载依赖城市数据包的详情，或在系统层面移除网络访问。",
      "10 / SECURITY & CHILDREN": "10 / 安全与儿童",
      "Reasonable safeguards, no impossible promises.": "采取合理保护措施，但不作不可能的承诺。",
      "Local records are kept inside the iOS app container and benefit from the device’s normal sandbox and protection settings. Network requests use system URL loading and HTTPS for the built-in jsDelivr and raw GitHub fallbacks. No security method eliminates every risk, especially on a compromised device or network.": "本地记录保存在 iOS 应用容器内，受益于设备的常规沙盒与保护设置。网络请求使用系统 URL 加载；内置 jsDelivr 与 GitHub 原始文件回退均使用 HTTPS。任何安全方法都无法消除全部风险，尤其是在设备或网络已被入侵时。",
      "JustGo is a general transit utility and does not knowingly operate a service that asks children for account or contact information. Because the current app has no account or developer user backend, it does not intentionally build child profiles. Third-party Apple and static-host processing remains governed by their policies and applicable law.": "JustGo 是通用交通工具，不会明知而运营向儿童索取账户或联系信息的服务。由于当前应用没有账户或开发者用户后端，它不会有意建立儿童资料。Apple 与静态主机的第三方处理仍受其政策和适用法律约束。",
      "11 / CHANGES & QUESTIONS": "11 / 变更与问题",
      "If the service changes, this page changes.": "服务发生变化，本页也会更新。",
      "A future account system, analytics service, remote report sharing, real-time transit provider, or cloud sync feature would materially change this privacy model. The effective date at the top will be updated when the policy changes.": "未来的账户系统、分析服务、远程报告共享、实时交通提供方或云同步功能，都会实质性改变此隐私模式。政策变化时，页面顶部的生效日期将更新。",
      "Questions or reports:": "问题或报告：",
      "PRIVACY · EFFECTIVE 2026-07-14": "隐私政策 · 2026-07-14 生效"
    },
    terms: {
      "JustGo Service Terms": "JustGo 服务条款",
      "JustGo service terms covering transit-data limits, acceptable use, third-party services, open-source licensing, and availability.": "JustGo 服务条款：交通数据限制、可接受使用、第三方服务、开源许可与可用性。",
      "/ Service terms": "/ 服务条款",
      "Useful guidance,": "实用指引，",
      "clear boundaries.": "明确边界。",
      "These terms describe the current open-source JustGo app and documentation. The most important rule is simple: verify safety-critical and time-sensitive details with the transit operator and station staff.": "这些条款适用于当前开源 JustGo 应用与文档。最重要的规则很简单：涉及安全与时效的细节，请向交通运营方和车站工作人员核实。",
      "TERMS STATUS": "条款状态",
      "Effective": "生效日期",
      "Product stage": "产品阶段",
      "Open-source development": "开源开发中",
      "Transit operator": "交通运营方",
      "No": "否",
      "Emergency service": "紧急服务",
      "Agreement & scope": "同意与范围",
      "The service": "服务内容",
      "Safety & accuracy": "安全与准确性",
      "Data sources": "数据来源",
      "Acceptable use": "可接受使用",
      "Third parties": "第三方",
      "Open-source license": "开源许可证",
      "Availability": "可用性",
      "Disclaimers": "免责声明",
      "Changes & contact": "变更与联系",
      "01 / AGREEMENT & SCOPE": "01 / 同意与范围",
      "Terms for using JustGo.": "使用 JustGo 的条款。",
      "By downloading, building, or using the JustGo app or relying on its hosted documentation, you agree to these service terms. If you do not agree, do not use the service.": "下载、构建或使用 JustGo 应用，或依赖其托管文档，即表示你同意这些服务条款。如果不同意，请勿使用本服务。",
      "These terms cover the JustGo app, its documentation, and public data-pack delivery maintained for the project. They do not replace the MIT License that governs copying, modifying, and distributing the source code.": "这些条款覆盖 JustGo 应用、其文档，以及为项目维护的公共数据包交付。它们不取代规范源码复制、修改与分发的 MIT 许可证。",
      "02 / THE SERVICE": "02 / 服务内容",
      "What JustGo provides.": "JustGo 提供什么。",
      "JustGo provides informational tools for metro route planning, station discovery, walking approaches, route comparison, service-hour context, accessibility context, local trip memory, and step-by-step trip cards. Some features require Apple Maps or downloadable city-pack data.": "JustGo 提供信息性工具，用于地铁路线规划、车站发现、步行接驳、路线比较、运营时间背景、无障碍背景、本地行程记忆与逐步行程卡片。部分功能需要 Apple 地图或可下载城市数据包。",
      "JustGo is an independent open-source project. It is not operated, sponsored, certified, or endorsed by a metro operator, Apple, OpenStreetMap, GitHub, jsDelivr, or a municipal authority unless a separate written statement says otherwise.": "JustGo 是独立开源项目。除非另有书面说明，否则它不由任何地铁运营方、Apple、OpenStreetMap、GitHub、jsDelivr 或市政机构运营、赞助、认证或认可。",
      "03 / SAFETY & ACCURACY": "03 / 安全与准确性",
      "Never treat an estimate as an instruction from staff.": "绝不要把估算结果当作工作人员指示。",
      "Verify before and during travel": "出发前及行程中均请核实",
      "Check official operator notices, station signage, platform displays, announcements, barriers, and staff instructions. In an emergency or evacuation, follow authorities and station personnel—not JustGo.": "请查看运营方官方公告、车站标识、站台显示屏、广播、隔离设施与工作人员指示。发生紧急情况或疏散时，请听从主管部门和车站人员，而不是 JustGo。",
      "Route duration, fare, walking time, crowding, service state, get-off alerts, entrance guidance, and confidence scores may be estimated, incomplete, stale, or wrong.": "路线时长、票价、步行时间、拥挤程度、运营状态、下车提醒、出入口指引与可信度评分都可能是估算值、不完整、过时或错误。",
      "Accessibility information can describe a facility’s known presence without proving it is working now.": "无障碍信息可以说明已知存在某项设施，但不能证明设施当前正常运行。",
      "“Official” describes the provenance label in a prepared data pack. It does not guarantee current operational status or endorsement of JustGo.": "“官方”描述的是已准备数据包中的来源标签，并不保证当前运营状态，也不表示相关机构认可 JustGo。",
      "“High confidence” is a deterministic comparison label, not a probability, safety certification, or accessibility guarantee.": "“可信度高”是确定性的比较标签，不是概率、安全认证或无障碍保证。",
      "The app must not be used as the sole source for last-train decisions, emergency movement, medical transport, or any journey where delay or error could cause serious harm.": "在判断末班车、紧急转移、医疗运输，或任何延误或错误可能造成严重伤害的行程中，不得把本应用作为唯一信息来源。",
      "04 / DATA SOURCES": "04 / 数据来源",
      "Different sources, different promises.": "不同来源，承诺不同。",
      "Layer": "层",
      "Source": "来源",
      "Limitation": "限制",
      "Place search and walking": "地点搜索与步行",
      "Apple Maps frameworks.": "Apple 地图框架。",
      "Availability, accuracy, and terms are controlled by Apple and may vary by region or connectivity.": "可用性、准确性与条款由 Apple 控制，并可能随地区或网络连接而变化。",
      "Metro network geometry": "地铁网络几何",
      "Prepared OpenStreetMap-derived physical-track network files bundled in the app.": "应用内置的、由 OpenStreetMap 衍生并预处理的真实轨道网络文件。",
      "May lag openings, closures, realignments, naming changes, or operator-specific service patterns.": "可能滞后于开通、关闭、改线、更名或运营方特有的运营模式。",
      "Station enrichment": "车站信息补充",
      "Prepared city packs citing public operator or other listed sources.": "引用公共运营方或其他列明来源的预处理城市数据包。",
      "Coverage is field-specific. Source-pending and partial fields are intentionally incomplete.": "覆盖状态按字段区分；来源待补充和部分可用字段本就不完整。",
      "Personal reports": "个人报告",
      "Notes entered by the rider on that device.": "乘客在该设备上输入的备注。",
      "Not independently verified, shared, or moderated by the current app.": "当前应用不会独立验证、共享或审核。",
      "Confidence and comfort": "可信度与舒适度",
      "Fixed local rules over route and pack data.": "基于路线与数据包信息的固定本地规则。",
      "Heuristics, not live prediction or machine-learned probability.": "属于启发式指标，而非实时预测或机器学习概率。",
      "The": "《",
      "technical overview": "技术概览》",
      "describes the exact current formulas and coverage matrix.": "说明当前的具体公式与覆盖矩阵。",
      "05 / ACCEPTABLE USE": "05 / 可接受使用",
      "Use the service responsibly.": "负责任地使用本服务。",
      "You may use JustGo for ordinary personal, educational, research, and development purposes consistent with these terms and applicable law. You must not:": "你可以在符合这些条款与适用法律的前提下，将 JustGo 用于一般个人、教育、研究与开发目的。你不得：",
      "interfere with, overload, probe, or bypass security controls on project-hosted or third-party services;": "干扰、使项目托管或第三方服务过载、探测此类服务，或绕过其安全控制；",
      "use automated traffic against city-pack hosts in a way that degrades service for others;": "以降低他人服务质量的方式，向城市数据包主机发送自动化流量；",
      "misrepresent JustGo as an official transit-operator product or present its estimates as certified operational data;": "把 JustGo 错误表述为交通运营方官方产品，或把其估算值表述为经过认证的运营数据；",
      "remove legally required attribution when redistributing source or prepared OpenStreetMap-derived data;": "重新分发源码或预处理的 OpenStreetMap 衍生数据时，删除法律要求的署名；",
      "use the service to violate privacy, intellectual-property, access-control, export, sanctions, transportation, or other applicable laws.": "使用本服务违反隐私、知识产权、访问控制、出口、制裁、交通运输或其他适用法律。",
      "06 / THIRD-PARTY SERVICES": "06 / 第三方服务",
      "External services remain external.": "外部服务仍由外部提供方控制。",
      "Apple Maps, OpenStreetMap, GitHub, jsDelivr, transit-operator sites, and any linked source are governed by their own terms, licenses, availability, and privacy practices. JustGo does not control those services and is not responsible for their content, uptime, changes, or decisions.": "Apple 地图、OpenStreetMap、GitHub、jsDelivr、交通运营方网站及任何链接来源，均受其自身条款、许可证、可用性与隐私做法约束。JustGo 不控制这些服务，也不对其内容、正常运行时间、变更或决定负责。",
      "Following a link or requesting a map or data pack may connect your device directly to the relevant provider. See the": "打开链接或请求地图/数据包可能使你的设备直接连接相关提供方。关于运行时数据流，请参阅",
      "privacy policy": "隐私政策",
      "for runtime data flows.": "。",
      "07 / OPEN-SOURCE LICENSE": "07 / 开源许可证",
      "Service terms and source license do different jobs.": "服务条款与源码许可证各司其职。",
      "The JustGo source repository is made available under the": "JustGo 源码仓库采用",
      "MIT License": "MIT 许可证",
      ". That license governs permission to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of the software, subject to its notice and disclaimer.": "。在遵守其声明与免责声明的前提下，该许可证规范使用、复制、修改、合并、发布、分发、再许可或销售软件副本的权限。",
      "These service terms govern use of the running app, hosted documentation, and project-operated data delivery. Third-party data, artwork, map content, names, and trademarks may have separate rights and attribution requirements.": "这些服务条款规范运行中应用、托管文档与项目运营的数据交付的使用。第三方数据、美术作品、地图内容、名称与商标可能适用独立权利和署名要求。",
      "08 / AVAILABILITY & CHANGES": "08 / 可用性与变更",
      "An active project can change.": "持续开发的项目会发生变化。",
      "Features, supported cities, city-pack fields, hosts, system requirements, labels, and documentation may be corrected, added, limited, suspended, or removed. The project does not promise continuous availability, a release schedule, backward compatibility, or support for a particular city or data source.": "功能、支持城市、城市数据包字段、主机、系统要求、标签与文档都可能被修正、新增、限制、暂停或移除。本项目不承诺持续可用、发布计划、向后兼容，也不承诺支持特定城市或数据来源。",
      "Updates may change route results or invalidate older saved data. You are responsible for keeping the app and source appropriate for your device and use case.": "更新可能改变路线结果或使旧的保存数据失效。你有责任确保应用与源码适合自己的设备和使用场景。",
      "09 / DISCLAIMERS & LIABILITY": "09 / 免责声明与责任限制",
      "Provided as available.": "按现状与可用状态提供。",
      "To the maximum extent permitted by applicable law, JustGo and its hosted services are provided “as is” and “as available,” without warranties of accuracy, availability, merchantability, fitness for a particular purpose, non-infringement, accessibility, or uninterrupted operation.": "在适用法律允许的最大范围内，JustGo 及其托管服务均按“现状”和“可用状态”提供，不就准确性、可用性、适销性、特定用途适用性、不侵权、无障碍或不间断运行作出保证。",
      "To the maximum extent permitted by applicable law, the project maintainers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive losses, or for missed trains, fares, delays, route errors, data loss, device use, personal injury, or reliance on incomplete transit or accessibility information. Nothing in these terms excludes liability that applicable law does not allow to be excluded.": "在适用法律允许的最大范围内，项目维护者不对间接、附带、特殊、后果性、示范性或惩罚性损失负责，也不对误车、票价、延误、路线错误、数据丢失、设备使用、人身伤害，或依赖不完整交通/无障碍信息负责。本条款不排除适用法律不允许排除的责任。",
      "10 / PRIVACY": "10 / 隐私",
      "Privacy is part of the service boundary.": "隐私是服务边界的一部分。",
      "Use of JustGo is also governed by the": "使用 JustGo 同时受",
      "JustGo Privacy Policy": "JustGo 隐私政策",
      ", which explains location handling, Apple Maps requests, static-host requests, local records, permissions, retention, and deletion.": "约束；该政策说明位置处理、Apple 地图请求、静态主机请求、本地记录、权限、保留与删除。",
      "11 / CHANGES & CONTACT": "11 / 变更与联系",
      "The effective date tells you which terms apply.": "生效日期说明适用哪个版本。",
      "These terms may be updated as the project changes. The revised effective date will be shown at the top. Continuing to use the hosted service after an update means the updated terms apply from that date, to the extent permitted by law.": "这些条款可能随项目变化而更新，修订后的生效日期会显示在页面顶部。在法律允许的范围内，更新后继续使用托管服务，表示更新条款自该日期起适用。",
      "Questions:": "问题：",
      "TERMS · EFFECTIVE 2026-07-13": "条款 · 2026-07-13 生效"
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
    if (path === "/justgo") return "justgo";
    if (path === "/justgo/docs") return "docs";
    if (path === "/justgo/docs/services") return "services";
    if (path === "/justgo/docs/privacy") return "privacy";
    if (path === "/justgo/docs/terms") return "terms";
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

    const anchor = target.querySelector(".icon-link, .github-button");
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
