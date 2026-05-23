// 自动生成于 2026/5/23 18:45:05
// 运行 node generate-skills-data.js 重新生成
// 请勿手动编辑此文件
window.__SKILLS_DATA__ = {
  "generatedAt": "2026-05-23T10:45:05.672Z",
  "totals": {
    "all": 50,
    "global": 42,
    "project": 0,
    "builtin": 8
  },
  "categories": [
    "API 开发",
    "内容创作",
    "创意设计",
    "开发工具",
    "用户自定义",
    "系统配置",
    "项目管理",
    "飞书协作",
    "飞书基础",
    "飞书工作流",
    "飞书工具",
    "飞书文件",
    "飞书文档",
    "飞书日程",
    "飞书表格",
    "飞书通讯"
  ],
  "sources": [
    "Anthropic",
    "第三方",
    "系统内置",
    "自定义",
    "飞书"
  ],
  "skills": [
    {
      "name": "algorithmic-art",
      "description": "Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or particle systems. Create original algorithmic art rather than copying existing artists' work to avoid copyright violations.",
      "source": "Anthropic",
      "category": "创意设计",
      "dimensions": {
        "scenario": "想用代码生成独一无二的艺术作品，探索生成式算法美学。",
        "trigger": "用户提到\"生成艺术\"\"algorithmic art\"\"p5.js\"\"粒子系统\"\"流场\"",
        "features": "两步工作流：先写算法哲学宣言 → 再转 p5.js 交互作品，支持种子随机和参数探索",
        "solves": "不会写生成式艺术代码？技能帮你把美学理念翻译成 p5.js 算法。",
        "steps": [
          "撰写算法哲学 ( manifesto )",
          "设计 p5.js 生成逻辑",
          "实现交互参数面板",
          "输出 HTML+JS 文件"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "brand-guidelines",
      "description": "Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.",
      "source": "Anthropic",
      "category": "创意设计",
      "dimensions": {
        "scenario": "做 PPT、文档、网页时，希望统一用上 Anthropic 的专业品牌配色和字体。",
        "trigger": "用户提到\"品牌配色\"\"品牌规范\"\"Anthropic 风格\"\"公司配色\"",
        "features": "提供 4 种主色 + 3 种强调色的完整调色板，2 套字体方案（Poppins + Lora），自动降级策略",
        "solves": "不用自己配颜色、不用纠结字体搭配，一键获得专业视觉规范。",
        "steps": [
          "选择配色方案",
          "选择字体方案",
          "应用到目标元素",
          "检查字体降级"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "canvas-design",
      "description": "Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.",
      "source": "Anthropic",
      "category": "创意设计",
      "dimensions": {
        "scenario": "需要做海报、视觉设计、静态艺术作品，输出 PNG 或 PDF。",
        "trigger": "用户提到\"海报\"\"poster\"\"设计图\"\"视觉设计\"\"静态作品\"",
        "features": "设计哲学→视觉表达两步法，输出 PNG/PDF，强调原创性",
        "solves": "没有设计基础也能产出有美学理念支撑的视觉作品，而不是随便拼凑。",
        "steps": [
          "创建设计哲学",
          "确定视觉语言",
          "在画布上实现",
          "导出 PNG/PDF"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "frontend-design",
      "description": "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.",
      "source": "Anthropic",
      "category": "创意设计",
      "dimensions": {
        "scenario": "需要做网页、落地页、Dashboard、UI 组件时，想做出不千篇一律的设计。",
        "trigger": "用户提到\"做网页\"\"前端\"\"UI\"\"landing page\"\"Dashboard\"\"网站\"",
        "features": "独特字体选择、大胆配色、非对称布局、微动效、氛围背景纹理",
        "solves": "告别 AI 味十足的紫渐变白底+Inter 字体，做出让人眼前一亮的前端作品。",
        "steps": [
          "理解设计目标",
          "确定美学方向",
          "选择字体配色",
          "实现 HTML/CSS",
          "打磨细节动效"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "theme-factory",
      "description": "Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.",
      "source": "Anthropic",
      "category": "创意设计",
      "dimensions": {
        "scenario": "在做 PPT、文档、网页时需要一套完整的配色+字体方案，不想自己从零搭配。",
        "trigger": "用户提到\"主题\"\"theme\"\"配色方案\"\"字体搭配\"\"换个风格\"",
        "features": "10 套预设主题（Ocean Depths, Sunset Boulevard 等），每套含色板+字体对，可自创主题",
        "solves": "告别\"不知道什么颜色配什么颜色\"的困扰，10秒选定一套专业方案。",
        "steps": [
          "展示主题预览",
          "用户选择主题",
          "读取主题配置",
          "应用到目标文件"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "lark-base",
      "description": "当需要用 lark-cli 操作飞书多维表格（Base）时调用：搜索 Base、建表、字段管理、记录读写、记录分享链接、视图配置、历史查询，以及角色/表单/仪表盘管理/工作流；也适用于把旧的 +table / +field / +record 写法改成当前命令写法。涉及字段设计、公式字段、查找引用、跨表计算、行级派生指标、数据分析需求时也必须使用本 skill。",
      "source": "飞书",
      "category": "飞书表格",
      "dimensions": {
        "scenario": "操作飞书多维表格：建表、字段管理、记录读写、视图配置、公式字段。",
        "trigger": "当需要用 lark-cli 操作飞书多维表格（Base）时调用：搜索 Base、建表、字段管理、记录读写、记录分享链接、视图配置、历史查询，以及角色/表单/仪表盘管理/工作流；也适用于把旧的 +table / +field / +record 写法改成当前命令写法。",
        "features": "当需要用 lark-cli 操作飞书多维表格（Base）时调用：搜索 Base、建表、字段管理、记录读写、记录分享链接、视图配置、历史查询，以及角色/表单/仪表盘管理/工作流；也适用于把旧的 +table / +field / +record 写法改成当前命令写法。涉及字段设计、公式字段、查找引用、跨表计算、行级派生指标、数据分析需求时也必须使用本 skill。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-sheets",
      "description": "飞书电子表格：创建和操作电子表格。支持创建表格、创建/复制/删除/更新工作表、读写单元格、追加行数据、查找内容、导出文件。当用户需要创建电子表格、管理工作表、批量读写数据、在已知表格中查找内容、导出或下载表格时使用。若用户是想按名称或关键词搜索云空间里的表格文件，请改用 lark-doc 的 docs +search 先定位资源。",
      "source": "飞书",
      "category": "飞书表格",
      "dimensions": {
        "scenario": "操作飞书电子表格。",
        "trigger": "飞书电子表格：创建和操作电子表格。",
        "features": "飞书电子表格：创建和操作电子表格。支持创建表格、创建/复制/删除/更新工作表、读写单元格、追加行数据、查找内容、导出文件。当用户需要创建电子表格、管理工作表、批量读写数据、在已知表格中查找内容、导出或下载表格时使用。若用户是想按名称或关键词搜索云空间里的表格文件，请改用 lark-doc 的 docs +search 先定位资源。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-slides",
      "description": "飞书幻灯片：创建和编辑幻灯片，接口通过 XML 协议通信。创建演示文稿、读取幻灯片内容、管理幻灯片页面（创建、删除、读取、局部替换）。当用户需要创建或编辑幻灯片、读取或修改单个页面时使用。",
      "source": "飞书",
      "category": "飞书表格",
      "dimensions": {
        "scenario": "创建和管理飞书幻灯片。",
        "trigger": "飞书幻灯片：创建和编辑幻灯片，接口通过 XML 协议通信。",
        "features": "飞书幻灯片：创建和编辑幻灯片，接口通过 XML 协议通信。创建演示文稿、读取幻灯片内容、管理幻灯片页面（创建、删除、读取、局部替换）。当用户需要创建或编辑幻灯片、读取或修改单个页面时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-openapi-explorer",
      "description": "飞书/Lark 原生 OpenAPI 探索：从官方文档库中挖掘未经 CLI 封装的原生 OpenAPI 接口。当用户的需求无法被现有 lark-* skill 或 lark-cli 已注册命令满足，需要查找并调用原生飞书 OpenAPI 时使用。",
      "source": "飞书",
      "category": "飞书工具",
      "dimensions": {
        "scenario": "浏览和调试飞书开放平台 OpenAPI。",
        "trigger": "飞书/Lark 原生 OpenAPI 探索：从官方文档库中挖掘未经 CLI 封装的原生 OpenAPI 接口。",
        "features": "飞书/Lark 原生 OpenAPI 探索：从官方文档库中挖掘未经 CLI 封装的原生 OpenAPI 接口。当用户的需求无法被现有 lark-* skill 或 lark-cli 已注册命令满足，需要查找并调用原生飞书 OpenAPI 时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-skill-maker",
      "description": "创建 lark-cli 的自定义 Skill。当用户需要把飞书 API 操作封装成可复用的 Skill（包装原子 API 或编排多步流程）时使用。",
      "source": "飞书",
      "category": "飞书工具",
      "dimensions": {
        "scenario": "飞书技能生成器：快速创建飞书相关技能。",
        "trigger": "创建 lark-cli 的自定义 Skill。",
        "features": "创建 lark-cli 的自定义 Skill。当用户需要把飞书 API 操作封装成可复用的 Skill（包装原子 API 或编排多步流程）时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-workflow-meeting-summary",
      "description": "会议纪要整理工作流：汇总指定时间范围内的会议纪要并生成结构化报告。当用户需要整理会议纪要、生成会议周报、回顾一段时间内的会议内容时使用。",
      "source": "飞书",
      "category": "飞书工作流",
      "dimensions": {
        "scenario": "自动生成飞书会议总结。",
        "trigger": "会议纪要整理工作流：汇总指定时间范围内的会议纪要并生成结构化报告。",
        "features": "会议纪要整理工作流：汇总指定时间范围内的会议纪要并生成结构化报告。当用户需要整理会议纪要、生成会议周报、回顾一段时间内的会议内容时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-workflow-standup-report",
      "description": "日程待办摘要：编排 calendar +agenda 和 task +get-my-tasks，生成指定日期的日程与未完成任务摘要。适用于了解今天/明天/本周的安排。",
      "source": "飞书",
      "category": "飞书工作流",
      "dimensions": {
        "scenario": "自动生成飞书每日站会报告。",
        "trigger": "日程待办摘要：编排 calendar +agenda 和 task +get-my-tasks，生成指定日期的日程与未完成任务摘要。",
        "features": "日程待办摘要：编排 calendar +agenda 和 task +get-my-tasks，生成指定日期的日程与未完成任务摘要。适用于了解今天/明天/本周的安排。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-event",
      "description": "Lark/Feishu real-time event listening / subscribing / consuming: stream events as NDJSON via `lark-cli event consume <EventKey>` (covers IM message receive, reactions, chat member changes, etc.). Use for Lark bots, real-time message processing, long-running subscribers, streaming webhook/push handlers. Supports `--max-events` / `--timeout` bounded runs and a stderr ready-marker contract — designed for AI agents running as subprocesses.",
      "source": "飞书",
      "category": "飞书基础",
      "dimensions": {
        "scenario": "飞书事件订阅：监听飞书开放平台事件。",
        "trigger": "Lark/Feishu real-time event listening / subscribing / consuming: stream events as NDJSON via `lark-cli event consume <EventKey>` (covers IM message receive, reactions, chat member changes, etc.). Use for Lark bots, real-time message processing, long-running subscribers, streaming webhook/push handlers. Supports `--max-events` / `--timeout` bounded runs and a stderr ready-marker contract — designed for AI agents running as subprocesses.。",
        "features": "Lark/Feishu real-time event listening / subscribing / consuming: stream events as NDJSON via `lark-cli event consume <EventKey>` (covers IM message receive, reactions, chat member changes, etc.). Use for Lark bots, real-time message processing, long-running subscribers, streaming webhook/push handlers. Supports `--max-events` / `--timeout` bounded runs and a stderr ready-marker contract — designed for AI agents running as subprocesses.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-shared",
      "description": "飞书/Lark CLI 共享基础：应用配置初始化、认证登录（auth login）、身份切换（--as user/bot）、权限与 scope 管理、Permission denied 错误处理、安全规则。当用户需要第一次配置(`lark-cli config init`)、使用登录授权(`lark-cli auth login`)、遇到权限不足、切换 user/bot 身份、配置 scope、或首次使用 lark-cli 时触发。",
      "source": "飞书",
      "category": "飞书基础",
      "dimensions": {
        "scenario": "使用任何飞书功能前，进行认证、权限配置和环境初始化。",
        "trigger": "飞书/Lark CLI 共享基础：应用配置初始化、认证登录（auth login）、身份切换（--as user/bot）、权限与 scope 管理、Permission denied 错误处理、安全规则。",
        "features": "飞书/Lark CLI 共享基础：应用配置初始化、认证登录（auth login）、身份切换（--as user/bot）、权限与 scope 管理、Permission denied 错误处理、安全规则。当用户需要第一次配置(`lark-cli config init`)、使用登录授权(`lark-cli auth login`)、遇到权限不足、切换 user/bot 身份、配置 scope、或首次使用 lark-cli 时触发。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-calendar",
      "description": "飞书日历（calendar）：提供日历与日程（会议）的全面管理能力。核心场景包括：查看/搜索日程、创建/更新日程、管理参会人、查询忙闲状态及推荐空闲时段、查询/搜索与预定会议室。注意：涉及【预约日程/会议】或【查询/预定会议室】时，必须先读取 references/lark-calendar-schedule-meeting.md 工作流！高频操作请优先使用 Shortcuts：+agenda（快速概览今日/近期行程）、+create（创建日程并按需邀请参会人及预定会议室）、+update（更新既有日程字段，或独立增删参会人/会议室）、+freebusy（查询用户主日历的忙闲信息和rsvp的状态）、+rsvp（回复日程邀请）",
      "source": "飞书",
      "category": "飞书日程",
      "dimensions": {
        "scenario": "管理日历和日程：创建/搜索日程、预定会议室、查询忙闲。",
        "trigger": "飞书日历（calendar）：提供日历与日程（会议）的全面管理能力。",
        "features": "飞书日历（calendar）：提供日历与日程（会议）的全面管理能力。核心场景包括：查看/搜索日程、创建/更新日程、管理参会人、查询忙闲状态及推荐空闲时段、查询/搜索与预定会议室。注意：涉及【预约日程/会议】或【查询/预定会议室】时，必须先读取 references/lark-calendar-schedule-meeting.md 工作流！高频操作请优先使用 Shortcuts：+agenda（快速概览今日/近期行程）、+create（创建日程并按需邀请参会人及预定会议室）、+update（更新既有日程字段，或独立增删参会人/会议室）、+freebusy（查询用户主日历的忙闲信息和rsvp的状态）、+rsvp（回复日程邀请）",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-contact",
      "description": "飞书 / Lark 通讯录,用于按姓名 / 邮箱把员工解析成 open_id,以及按 open_id 反查员工的姓名 / 部门 / 邮箱 / 联系方式。当用户说出某人姓名而下一步需要发消息 / 加群 / 排日程时,先用本 skill 把姓名换成 ID;当输出里出现 open_id 需要展示成姓名给用户看,或用户直接询问某人的部门 / 邮箱 / 联系方式时,用本 skill 查。不负责部门树遍历、按部门列员工、组织架构图,这类需求走原生 OpenAPI。",
      "source": "飞书",
      "category": "飞书通讯",
      "dimensions": {
        "scenario": "管理飞书通讯录：搜索用户/部门、查看联系人信息。",
        "trigger": "飞书 / Lark 通讯录,用于按姓名 / 邮箱把员工解析成 open_id,以及按 open_id 反查员工的姓名 / 部门 / 邮箱 / 联系方式。",
        "features": "飞书 / Lark 通讯录,用于按姓名 / 邮箱把员工解析成 open_id,以及按 open_id 反查员工的姓名 / 部门 / 邮箱 / 联系方式。当用户说出某人姓名而下一步需要发消息 / 加群 / 排日程时,先用本 skill 把姓名换成 ID;当输出里出现 open_id 需要展示成姓名给用户看,或用户直接询问某人的部门 / 邮箱 / 联系方式时,用本 skill 查。不负责部门树遍历、按部门列员工、组织架构图,这类需求走原生 OpenAPI。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-im",
      "description": "飞书即时通讯：收发消息和管理群聊。发送和回复消息、搜索聊天记录、管理群聊成员、上传下载图片和文件（支持大文件分片下载）、管理表情回复。当用户需要发消息、查看或搜索聊天记录、下载聊天中的文件、查看群成员时使用。",
      "source": "飞书",
      "category": "飞书通讯",
      "dimensions": {
        "scenario": "收发飞书消息、管理群聊、搜索聊天记录、下载文件。",
        "trigger": "飞书即时通讯：收发消息和管理群聊。",
        "features": "飞书即时通讯：收发消息和管理群聊。发送和回复消息、搜索聊天记录、管理群聊成员、上传下载图片和文件（支持大文件分片下载）、管理表情回复。当用户需要发消息、查看或搜索聊天记录、下载聊天中的文件、查看群成员时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-mail",
      "description": "飞书邮箱 — draft, compose, send, reply, forward, read, and search emails; manage drafts, folders, labels, contacts, attachments, and mail rules. Use when user mentions 起草邮件, 写一封邮件, 拟邮件, 草稿, 发通知邮件, 发送邮件, 发邮件, 回复邮件, 转发邮件, 查看邮件, 看邮件, 读邮件, 搜索邮件, 查邮件, 收件箱, 邮件会话, 编辑草稿, 管理草稿, 下载附件, 邮件文件夹, 邮件标签, 邮件联系人, 监听新邮件, 收信规则, 邮件规则, draft, compose, send email, reply, forward, inbox, mail thread, mail rules.",
      "source": "飞书",
      "category": "飞书通讯",
      "dimensions": {
        "scenario": "使用飞书邮箱收发邮件。",
        "trigger": "飞书邮箱 — draft, compose, send, reply, forward, read, and search emails; manage drafts, folders, labels, contacts, attachments, and mail rules. Use when user mentions 起草邮件, 写一封邮件, 拟邮件, 草稿, 发通知邮件, 发送邮件, 发邮件, 回复邮件, 转发邮件, 查看邮件, 看邮件, 读邮件, 搜索邮件, 查邮件, 收件箱, 邮件会话, 编辑草稿, 管理草稿, 下载附件, 邮件文件夹, 邮件标签, 邮件联系人, 监听新邮件, 收信规则, 邮件规则, draft, compose, send email, reply, forward, inbox, mail thread, mail rules.。",
        "features": "飞书邮箱 — draft, compose, send, reply, forward, read, and search emails; manage drafts, folders, labels, contacts, attachments, and mail rules. Use when user mentions 起草邮件, 写一封邮件, 拟邮件, 草稿, 发通知邮件, 发送邮件, 发邮件, 回复邮件, 转发邮件, 查看邮件, 看邮件, 读邮件, 搜索邮件, 查邮件, 收件箱, 邮件会话, 编辑草稿, 管理草稿, 下载附件, 邮件文件夹, 邮件标签, 邮件联系人, 监听新邮件, 收信规则, 邮件规则, draft, compose, send email, reply, forward, inbox, mail thread, mail rules.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-vc",
      "description": "飞书视频会议：查询会议记录、获取会议纪要产物（总结、待办、章节、逐字稿）。1. 查询已经结束的会议数量或详情时使用本技能(如历史日期｜ 昨天 | 上周 | 今天已经开过的会议等场景)，查询未开始的会议日程使用 lark-calendar 技能。2. 支持通过关键词、时间范围、组织者、参与者、会议室等筛选条件搜索会议记录。3. 获取或整理会议纪要时使用本技能。",
      "source": "飞书",
      "category": "飞书通讯",
      "dimensions": {
        "scenario": "飞书视频会议：搜索会议记录、查询会议详情。",
        "trigger": "飞书视频会议：查询会议记录、获取会议纪要产物（总结、待办、章节、逐字稿）。",
        "features": "飞书视频会议：查询会议记录、获取会议纪要产物（总结、待办、章节、逐字稿）。1. 查询已经结束的会议数量或详情时使用本技能(如历史日期｜ 昨天 | 上周 | 今天已经开过的会议等场景)，查询未开始的会议日程使用 lark-calendar 技能。2. 支持通过关键词、时间范围、组织者、参与者、会议室等筛选条件搜索会议记录。3. 获取或整理会议纪要时使用本技能。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-doc",
      "description": "飞书云文档（v2）：创建和编辑飞书文档。使用本 skill 时，docs +create、docs +fetch、docs +update 必须携带 --api-version v2；默认使用 DocxXML 格式（也支持 Markdown）。创建文档、获取文档内容（支持 simple/with-ids/full 三种导出详细度，以及 full/outline/range/keyword/section 五种局部读取模式，可按目录、block id 区间、关键词或标题自动成节只拉部分内容以节省上下文）、更新文档（八种指令：str_replace/block_insert_after/block_copy_insert_after/block_replace/block_delete/block_move_after/overwrite/append）、上传和下载文档中的图片和文件、搜索云空间文档。当用户需要创建或编辑飞书文档、读取文档内容、在文档中插入图片、搜索云空间文档时使用；如果用户是想按名称或关键词先定位电子表格、报表等云空间对象，也优先使用本 skill 的 docs +search 做资源发现。",
      "source": "飞书",
      "category": "飞书文档",
      "dimensions": {
        "scenario": "创建和编辑飞书云文档，支持 XML 和 Markdown 格式。",
        "trigger": "飞书云文档（v2）：创建和编辑飞书文档。",
        "features": "飞书云文档（v2）：创建和编辑飞书文档。使用本 skill 时，docs +create、docs +fetch、docs +update 必须携带 --api-version v2；默认使用 DocxXML 格式（也支持 Markdown）。创建文档、获取文档内容（支持 simple/with-ids/full 三种导出详细度，以及 full/outline/range/keyword/section 五种局部读取模式，可按目录、block id 区间、关键词或标题自动成节只拉部分内容以节省上下文）、更新文档（八种指令：str_replace/block_insert_after/block_copy_insert_after/block_replace/block_delete/block_move_after/overwrite/append）、上传和下载文档中的图片和文件、搜索云空间文档。当用户需要创建或编辑飞书文档、读取文档内容、在文档中插入图片、搜索云空间文档时使用；如果用户是想按名称或关键词先定位电子表格、报表等云空间对象，也优先使用本 skill 的 docs +search 做资源发现。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-markdown",
      "description": "飞书 Markdown：查看、创建、上传和编辑 Markdown 文件。当用户需要创建或编辑 Markdown 文件、读取或修改时使用。",
      "source": "飞书",
      "category": "飞书文档",
      "dimensions": {
        "scenario": "飞书 Markdown 内容处理与转换。",
        "trigger": "飞书 Markdown：查看、创建、上传和编辑 Markdown 文件。",
        "features": "飞书 Markdown：查看、创建、上传和编辑 Markdown 文件。当用户需要创建或编辑 Markdown 文件、读取或修改时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-minutes",
      "description": "飞书妙记：妙记相关基本功能。1.查询妙记列表（按关键词/所有者/参与者/时间范围）；2.获取妙记基础信息（标题、封面、时长 等）；3.下载妙记音视频文件；4.获取妙记相关 AI 产物（总结、待办、章节）；5.上传音视频生成妙记，也支持将本地音视频文件转成纪要、逐字稿、文字稿、撰写文字等产物。遇到这类请求时，应优先使用本 skill，而不是尝试 `ffmpeg`、`whisper` 等本地转写命令。飞书妙记 URL 格式: http(s)://<host>/minutes/<minute-token>",
      "source": "飞书",
      "category": "飞书文档",
      "dimensions": {
        "scenario": "管理飞书会议纪要（Minutes）。",
        "trigger": "飞书妙记：妙记相关基本功能。",
        "features": "飞书妙记：妙记相关基本功能。1.查询妙记列表（按关键词/所有者/参与者/时间范围）；2.获取妙记基础信息（标题、封面、时长 等）；3.下载妙记音视频文件；4.获取妙记相关 AI 产物（总结、待办、章节）；5.上传音视频生成妙记，也支持将本地音视频文件转成纪要、逐字稿、文字稿、撰写文字等产物。遇到这类请求时，应优先使用本 skill，而不是尝试 `ffmpeg`、`whisper` 等本地转写命令。飞书妙记 URL 格式: http(s)://<host>/minutes/<minute-token>",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-whiteboard",
      "description": ">",
      "source": "飞书",
      "category": "飞书文档",
      "dimensions": {
        "scenario": "创建和管理飞书白板。",
        "trigger": ">。",
        "features": ">",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-wiki",
      "description": "飞书知识库：管理知识空间、空间成员和文档节点。创建和查询知识空间、查看和管理空间成员、管理节点层级结构、在知识库中组织文档和快捷方式。当用户需要在知识库中查找或创建文档、浏览知识空间结构、查看或管理空间成员、移动或复制节点时使用。",
      "source": "飞书",
      "category": "飞书文档",
      "dimensions": {
        "scenario": "管理飞书知识库（Wiki）：创建/搜索/编辑知识空间和条目。",
        "trigger": "飞书知识库：管理知识空间、空间成员和文档节点。",
        "features": "飞书知识库：管理知识空间、空间成员和文档节点。创建和查询知识空间、查看和管理空间成员、管理节点层级结构、在知识库中组织文档和快捷方式。当用户需要在知识库中查找或创建文档、浏览知识空间结构、查看或管理空间成员、移动或复制节点时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-drive",
      "description": "飞书云空间：管理云空间中的文件和文件夹。上传和下载文件、创建文件夹、复制/移动/删除文件、查看文件元数据、管理文档评论、管理文档权限、订阅用户评论变更事件、修改文件标题（docx、sheet、bitable、file、folder、wiki）；也负责把本地 Word/Markdown/Excel/CSV 以及 Base 快照（.base）导入为飞书在线云文档（docx、sheet、bitable）。当用户需要上传或下载文件、整理云空间目录、查看文件详情、管理评论、管理文档权限、修改文件标题、订阅用户评论变更事件，或要把本地文件导入成新版文档、电子表格、多维表格/Base 时使用。",
      "source": "飞书",
      "category": "飞书文件",
      "dimensions": {
        "scenario": "管理飞书云盘：上传/下载文件、搜索文件、管理目录。",
        "trigger": "飞书云空间：管理云空间中的文件和文件夹。",
        "features": "飞书云空间：管理云空间中的文件和文件夹。上传和下载文件、创建文件夹、复制/移动/删除文件、查看文件元数据、管理文档评论、管理文档权限、订阅用户评论变更事件、修改文件标题（docx、sheet、bitable、file、folder、wiki）；也负责把本地 Word/Markdown/Excel/CSV 以及 Base 快照（.base）导入为飞书在线云文档（docx、sheet、bitable）。当用户需要上传或下载文件、整理云空间目录、查看文件详情、管理评论、管理文档权限、修改文件标题、订阅用户评论变更事件，或要把本地文件导入成新版文档、电子表格、多维表格/Base 时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-approval",
      "description": "飞书审批 API：审批实例、审批任务管理。",
      "source": "飞书",
      "category": "飞书协作",
      "dimensions": {
        "scenario": "飞书审批：管理审批实例和审批任务。",
        "trigger": "飞书审批 API：审批实例、审批任务管理。",
        "features": "飞书审批 API：审批实例、审批任务管理。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-attendance",
      "description": "飞书考勤打卡：查询自己的考勤打卡记录",
      "source": "飞书",
      "category": "飞书协作",
      "dimensions": {
        "scenario": "飞书考勤打卡：查询考勤记录。",
        "trigger": "飞书考勤打卡：查询自己的考勤打卡记录。",
        "features": "飞书考勤打卡：查询自己的考勤打卡记录",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-okr",
      "description": "飞书 OKR：管理目标与关键结果。查看和编辑 OKR 周期、目标（Objective）、关键结果（Key Result）、对齐关系、量化指标和进展记录。当用户需要查看或创建 OKR、管理目标和关键结果、查看对齐关系时使用。",
      "source": "飞书",
      "category": "飞书协作",
      "dimensions": {
        "scenario": "管理飞书 OKR 目标和关键结果。",
        "trigger": "飞书 OKR：管理目标与关键结果。",
        "features": "飞书 OKR：管理目标与关键结果。查看和编辑 OKR 周期、目标（Objective）、关键结果（Key Result）、对齐关系、量化指标和进展记录。当用户需要查看或创建 OKR、管理目标和关键结果、查看对齐关系时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "lark-task",
      "description": "飞书任务：管理任务、清单和任务智能体。创建待办任务、查看和更新任务状态、拆分子任务、组织任务清单、分配协作成员、注册或注销任务智能体、更新任务智能体的主页数据、写入智能体任务记录。当用户需要创建待办事项、查看任务列表、跟踪任务进度、管理项目清单或给他人分配任务、注册注销任务智能体、更新智能体主页数据、写入任务记录时使用。",
      "source": "飞书",
      "category": "飞书协作",
      "dimensions": {
        "scenario": "管理飞书任务（Task）：创建/分配/追踪任务。",
        "trigger": "飞书任务：管理任务、清单和任务智能体。",
        "features": "飞书任务：管理任务、清单和任务智能体。创建待办任务、查看和更新任务状态、拆分子任务、组织任务清单、分配协作成员、注册或注销任务智能体、更新任务智能体的主页数据、写入智能体任务记录。当用户需要创建待办事项、查看任务列表、跟踪任务进度、管理项目清单或给他人分配任务、注册注销任务智能体、更新智能体主页数据、写入任务记录时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取 lark-shared 认证配置",
          "执行 lark-cli 命令",
          "格式化返回结果"
        ],
        "tools": [
          [
            "lark-cli"
          ]
        ]
      }
    },
    {
      "name": "karpathy-guidelines",
      "description": "Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.",
      "source": "第三方",
      "category": "开发工具",
      "dimensions": {
        "scenario": "Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.。",
        "trigger": "Behavioral guidelines to reduce common LLM coding mistakes。 Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria",
        "features": "Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "mcp-builder",
      "description": "Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).",
      "source": "Anthropic",
      "category": "开发工具",
      "dimensions": {
        "scenario": "需要创建一个 MCP 服务器，让 LLM 能通过标准化接口调用外部服务。",
        "trigger": "用户说\"创建 MCP\"\"MCP server\"\"模型上下文协议\"\"FastMCP\"\"MCP SDK\"",
        "features": "Python (FastMCP) 和 Node/TypeScript (MCP SDK) 两种实现方式，完整工具定义、资源管理",
        "solves": "不用从零学习 MCP 协议规范，技能提供经过验证的实现模式和最佳实践。",
        "steps": [
          "选择语言（Python/Node）",
          "定义 Tools 接口",
          "实现业务逻辑",
          "测试 MCP 连接"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "review",
      "description": "PR 代码审查。当用户说\"review\"\"审查\"\"code review\"时触发。",
      "source": "系统内置",
      "category": "开发工具",
      "dimensions": {
        "scenario": "提交代码前或审查同事的 Pull Request 时，获得专业的代码审查意见。",
        "trigger": "用户说\"review\"\"审查这个 PR\"\"帮我 review 一下\"",
        "features": "检查代码逻辑、命名规范、潜在 bug、安全漏洞、性能问题",
        "solves": "在合并前发现肉眼容易忽略的问题，提升代码质量。",
        "steps": [
          "获取 PR diff",
          "逐文件审查",
          "标注问题等级",
          "给出修改建议"
        ],
        "tools": [
          "gh CLI",
          "git diff"
        ]
      }
    },
    {
      "name": "security-review",
      "description": "安全漏洞审查。当用户说\"安全检查\"\"安全审查\"\"security audit\"时触发。",
      "source": "系统内置",
      "category": "开发工具",
      "dimensions": {
        "scenario": "发布前或处理敏感数据时，排查代码中的安全风险。",
        "trigger": "用户说\"安全审查\"\"安全检查\"\"security review\"\"有没有安全漏洞\"",
        "features": "检测 SQL 注入、XSS、密钥泄露、权限漏洞、依赖项漏洞",
        "solves": "在代码上线前拦截常见安全漏洞，降低被攻击风险。",
        "steps": [
          "扫描代码文件",
          "匹配漏洞模式",
          "评估风险等级",
          "给出修复方案"
        ],
        "tools": [
          "静态代码分析",
          "依赖项扫描"
        ]
      }
    },
    {
      "name": "simplify",
      "description": "代码简化与优化。当用户说\"简化\"\"优化代码\"\"simplify\"时触发。",
      "source": "系统内置",
      "category": "开发工具",
      "dimensions": {
        "scenario": "代码写完后觉得冗余、不够优雅，想让它更简洁高效。",
        "trigger": "用户说\"简化一下\"\"能不能更简洁\"\"optimize\"",
        "features": "检查重复代码、冗余逻辑、过度抽象、可读性问题",
        "solves": "减少代码量同时保持可读性，降低维护成本。",
        "steps": [
          "读取代码文件",
          "识别优化点",
          "给出简化方案",
          "应用修改"
        ],
        "tools": [
          "AST 分析"
        ]
      }
    },
    {
      "name": "skill-creator",
      "description": "Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.",
      "source": "Anthropic",
      "category": "开发工具",
      "dimensions": {
        "scenario": "想要创建、优化或评估一个 Skill，让它更精准地触发和更好地完成任务。",
        "trigger": "用户说\"创建 skill\"\"优化技能\"\"skill 评测\"\"写个技能\"",
        "features": "完整工作流：写草稿→创建 eval 用例→运行测试→盲评对比→分析改进→迭代优化",
        "solves": "从\"凭感觉写技能\"升级到\"有数据验证的技能工程\"，确保技能真的有用。",
        "steps": [
          "定义技能目标",
          "写 SKILL.md 草稿",
          "创建 evals 测试",
          "运行 grading",
          "分析结果迭代"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "pdf",
      "description": "Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging multiple PDFs into one, splitting PDFs apart, rotating pages, adding watermarks, creating new PDFs, filling PDF forms, encrypting/decrypting PDFs, extracting images, and OCR on scanned PDFs to make them searchable. If the user mentions a .pdf file or asks to produce one, use this skill.",
      "source": "Anthropic",
      "category": "内容创作",
      "dimensions": {
        "scenario": "处理任何 PDF 相关操作：读取、合并、拆分、水印、表单、OCR。",
        "trigger": "用户提到\".pdf\"\"PDF\"\"合并 PDF\"\"拆分 PDF\"\"OCR\"\"加水印\"",
        "features": "读取/提取文本表格、合并/拆分 PDF、旋转页面、水印、加密/解密、OCR 识别",
        "solves": "一个技能覆盖所有 PDF 操作，不用装多个工具。",
        "steps": [
          "确定操作类型",
          "读取相关文件",
          "执行操作",
          "验证输出"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "pptx",
      "description": "Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes: creating slide decks, pitch decks, or presentations; reading, parsing, or extracting text from any .pptx file (even if the extracted content will be used elsewhere, like in an email or summary); editing, modifying, or updating existing presentations; combining or splitting slide files; working with templates, layouts, speaker notes, or comments. Trigger whenever the user mentions \\\"deck,\\\" \\\"slides,\\\" \\\"presentation,\\\" or references a .pptx filename, regardless of what they plan to do with the content afterward. If a .pptx file needs to be opened, created, or touched, use this skill.",
      "source": "Anthropic",
      "category": "内容创作",
      "dimensions": {
        "scenario": "需要创建、编辑、合并 PPT 文件，做演示文稿或提案。",
        "trigger": "用户提到\"PPT\"\"幻灯片\"\"slide\"\"deck\"\"presentation\"\"pptx\"",
        "features": "创建新 PPT、编辑已有 PPT、合并拆分、模板布局、演讲者备注、评论管理",
        "solves": "不用开 PowerPoint 逐页手动做，AI 直接生成结构完整、排版美观的 PPT 文件。",
        "steps": [
          "分析内容结构",
          "选择主题模板",
          "逐页生成内容",
          "调整布局细节"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "fewer-permission-prompts",
      "description": "智能减少权限弹窗。分析使用习惯，自动建议权限白名单。",
      "source": "系统内置",
      "category": "系统配置",
      "dimensions": {
        "scenario": "频繁弹出权限确认窗口打断工作流，想批量设置信任规则。",
        "trigger": "用户说\"减少弹窗\"\"少点确认\"\"权限太多了\"\"allow list\"",
        "features": "扫描历史记录，识别常用安全操作，批量添加到白名单",
        "solves": "一次配置，后续同类操作不再反复弹窗确认。",
        "steps": [
          "扫描操作历史",
          "识别高频安全命令",
          "生成白名单建议",
          "写入配置"
        ],
        "tools": [
          "settings.json"
        ]
      }
    },
    {
      "name": "keybindings-help",
      "description": "自定义键盘快捷键。当用户想修改快捷键、添加组合键时触发。",
      "source": "系统内置",
      "category": "系统配置",
      "dimensions": {
        "scenario": "觉得默认快捷键不顺手，想自定义一套适合自己的快捷键方案。",
        "trigger": "用户说\"快捷键\"\"keybinding\"\"改快捷键\"\"绑定按键\"",
        "features": "查看当前快捷键、添加新快捷键、修改已有绑定",
        "solves": "不用死记默认快捷键，按自己的习惯来。",
        "steps": [
          "读取 keybindings.json",
          "理解用户意图",
          "生成新绑定",
          "写入配置"
        ],
        "tools": [
          "keybindings.json"
        ]
      }
    },
    {
      "name": "loop",
      "description": "定时循环执行指令。用户说\"每 X 分钟执行 Y\"\"定时\"\"loop\"时触发。",
      "source": "系统内置",
      "category": "系统配置",
      "dimensions": {
        "scenario": "需要定期检查某个状态（如 CI 结果、部署进度、数据更新）。",
        "trigger": "用户说\"每 5 分钟\"\"定时\"\"循环\"\"loop\"\"一直监控\"",
        "features": "设置间隔时间、指定执行指令、自动重复运行直到停止",
        "solves": "不用手动反复输入同样的指令，自动轮询等待结果。",
        "steps": [
          "确定执行间隔",
          "指定执行指令",
          "启动循环",
          "按需停止"
        ],
        "tools": [
          "Cron / Schedule Wakeup"
        ]
      }
    },
    {
      "name": "update-config",
      "description": "修改 Claude Code 的 settings.json 配置。当用户说\"改配置\"\"更新设置\"\"settings\"\"添加权限\"\"环境变量\"时触发。",
      "source": "系统内置",
      "category": "系统配置",
      "dimensions": {
        "scenario": "需要修改 Claude Code 的行为设置、添加新权限、配置环境变量时。",
        "trigger": "用户说\"改配置\"\"settings\"\"添加 permission\"\"配置环境变量\"\"允许 X 命令\"",
        "features": "管理权限白名单、环境变量、hooks、系统行为开关",
        "solves": "不用手动找到并编辑 JSON 文件，自然语言就能改配置。",
        "steps": [
          "确认修改项",
          "读取当前配置",
          "合并新配置",
          "写入文件"
        ],
        "tools": [
          "settings.json",
          "settings.local.json"
        ]
      }
    },
    {
      "name": "init",
      "description": "初始化新项目。当用户说\"初始化项目\"\"创建新项目\"\"setup\"时触发。",
      "source": "系统内置",
      "category": "项目管理",
      "dimensions": {
        "scenario": "开始一个新项目时，快速搭建项目骨架和配置文件。",
        "trigger": "用户说\"初始化项目\"\"新建项目\"\"init\"\"setup\"",
        "features": "自动检测项目类型、生成基础配置文件、初始化 git 仓库",
        "solves": "省去手动创建配置文件的繁琐步骤，确保项目结构规范统一。",
        "steps": [
          "检测当前目录状态",
          "确定项目类型",
          "生成配置模板",
          "初始化 git"
        ],
        "tools": [
          "git init",
          "模板文件生成"
        ]
      }
    },
    {
      "name": "export-to-docx",
      "description": "将当前对话中产生的结构化内容（分析报告、梳理总结、技术文档等）导出为排版良好的 Word 文档（.docx）。当用户说「导出word」「导出到word」「导出成word」「存成word」或类似意图时使用。",
      "source": "自定义",
      "category": "用户自定义",
      "dimensions": {
        "scenario": "将当前对话中产生的结构化内容（分析报告、梳理总结、技术文档等）导出为排版良好的 Word 文档（.docx）。",
        "trigger": "将当前对话中产生的结构化内容（分析报告、梳理总结、技术文档等）导出为排版良好的 Word 文档（。docx）",
        "features": "将当前对话中产生的结构化内容（分析报告、梳理总结、技术文档等）导出为排版良好的 Word 文档（.docx）。当用户说「导出word」「导出到word」「导出成word」「存成word」或类似意图时使用。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "默认输出到用户本次对话的工作目录（`d:\\AI漫剧制作\\` 或其子文件夹）",
          "文件名使用用户指定的名称，若未指定则根据内容自动命名",
          "同时输出 `.md`（便于版本管理）和 `.docx`（便于使用）",
          "使用清晰的标题层级（`#` `##` `###` `####`）",
          "表格用标准 markdown 表格语法"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "xiaohongshu-architecture-ugc",
      "description": "小红书建筑学考研UGC获客方法论（已锁定）。当用户需要创作建筑考研类小红书笔记、设计引流钩子、撰写私信转化话术、规划选题排期时使用。覆盖5校（浙大/浙工大/浙农林/浙理工/浙大城院）×12大话题类型×120套公式套装×7维变异引擎×5套写作模板×4阶段转化SOP×封面设计×去AI味×活人感×Z世代口语词库×防过度做作校准。",
      "source": "自定义",
      "category": "用户自定义",
      "dimensions": {
        "scenario": "运营小红书建筑考研 UGC 内容账号，需要批量化、多样化地产出内容。",
        "trigger": "用户提到\"小红书\"\"建筑考研\"\"UGC\"\"内容营销\"\"笔记\"",
        "features": "5 所学校 × 12 种选题 × 120 套公式 × 7 维变量引擎 × 5 种写作模板 × 4 阶段转化 SOP",
        "solves": "不用每天绞尽脑汁想选题写文案，系统化批量产出有人味、不 AI 感的小红书内容。",
        "steps": [
          "确定选题类型",
          "选取变量组合",
          "套用写作模板",
          "执行反 AI 话术检查",
          "输出排版好的笔记"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "claude-api",
      "description": "Build, debug, and optimize Claude API / Anthropic SDK apps. Apps built with this skill should include prompt caching. Also handles migrating existing Claude API code between Claude model versions (4.5 → 4.6, 4.6 → 4.7, retired-model replacements). TRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`; user asks for the Claude API, Anthropic SDK, or Managed Agents; user adds/modifies/tunes a Claude feature (caching, thinking, compaction, tool use, batch, files, citations, memory) or model (Opus/Sonnet/Haiku) in a file; questions about prompt caching / cache hit rate in an Anthropic SDK project. SKIP: file imports `openai`/other-provider SDK, filename like `*-openai.py`/`*-generic.py`, provider-neutral code, general programming/ML.",
      "source": "Anthropic",
      "category": "API 开发",
      "dimensions": {
        "scenario": "用代码调用 Claude API，需要正确使用 SDK、prompt caching、tool use 等高级功能。",
        "trigger": "代码中 import anthropic SDK，或用户问\"Claude API\"\"Anthropic SDK\"\"prompt caching\"\"tool use\"",
        "features": "自动检测项目语言→调度对应语言 SDK 文档，覆盖 caching / thinking / tool use / compaction / 文件 API",
        "solves": "不用翻官方文档，技能直接告诉你当前语言的最佳实践和完整代码示例。",
        "steps": [
          "检测项目语言",
          "读取对应语言文档",
          "检查 caching 机会",
          "生成 SDK 代码"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "claude-api-csharp",
      "description": "Build Claude API applications with the official C# Anthropic SDK. Covers installation, client init, messages, streaming, thinking, tool use (raw definitions + JSON schema), prompt caching, structured output, PDF input, Files API, context editing/compaction, effort parameter, token counting, and server-side tools. TRIGGER when: .cs/.csproj/.sln files import Anthropic SDK; user asks about Claude API in C#/.NET; C# code calls Anthropic models.",
      "source": "Anthropic",
      "category": "API 开发",
      "dimensions": {
        "scenario": "用 C# / .NET 开发，需要调用 Claude API。",
        "trigger": ".cs 文件 import Anthropic SDK，用户问\"C# SDK\"\"Claude .NET\"\"dotnet Claude\"",
        "features": "C# SDK：Messages、Streaming、Tool Use、Thinking、Caching、Files API、Effort 参数",
        "solves": ".NET 生态直接集成 Claude，支持 Microsoft.Extensions.AI IChatClient 集成。",
        "steps": [
          "dotnet add package",
          "初始化 AnthropicClient",
          "构造请求参数",
          "处理响应 union 类型"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "claude-api-curl",
      "description": "Build Claude API applications using raw HTTP requests (curl). Covers REST endpoint usage, authentication headers, JSON request/response handling, streaming SSE events, tool use loop, prompt caching, extended thinking, and beta features via anthropic-beta header. TRIGGER when: user writes curl commands for Claude API; shell scripts calling Anthropic API; raw HTTP integration without an official SDK; bash/zsh scripts hitting api.anthropic.com.",
      "source": "Anthropic",
      "category": "API 开发",
      "dimensions": {
        "scenario": "想用 shell 脚本或 curl 直接调 Claude API，不引入任何 SDK 依赖。",
        "trigger": "用户写 curl 命令调 Claude API，或在 bash/zsh 脚本中调用 Anthropic API",
        "features": "完整的 REST API 调用示例：消息、流式、工具调用、caching、thinking、所有必需 headers",
        "solves": "最快验证 API 的方式——一行 curl 就能跑通，不用配 SDK 环境。",
        "steps": [
          "设置 API key 环境变量",
          "构造 JSON 请求体",
          "发送 curl 请求",
          "用 jq 解析响应"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "claude-api-go",
      "description": "Build Claude API applications with the official Go Anthropic SDK. Covers go get install, client init, messages, streaming with accumulation, tool use (Beta ToolRunner with jsonschema struct tags + manual loop), thinking (adaptive), prompt caching, server-side tools, PDF input, Files API, and context editing/compaction. TRIGGER when: .go files import anthropic-sdk-go; user asks about Claude API in Go; Go code calls Anthropic models.",
      "source": "Anthropic",
      "category": "API 开发",
      "dimensions": {
        "scenario": "用 Go 语言开发调用 Claude API 的应用或 Agent 系统。",
        "trigger": ".go 文件 import anthropic-sdk-go，用户问\"Go SDK\"\"Claude Go\"\"golang Claude\"",
        "features": "Go SDK 全功能：Messages、Streaming、Tool Runner (Beta)、Thinking、Caching、Files API",
        "solves": "Go 的 Tool Runner 自动管理 Agent 工具调用循环，RunToCompletion() 一行搞定。",
        "steps": [
          "go get SDK",
          "初始化 Client",
          "定义 Tools",
          "Run ToolRunner",
          "处理结果"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "claude-api-java",
      "description": "Build Claude API applications with the official Java Anthropic SDK. Covers Maven/Gradle install, client init, messages, streaming, thinking (adaptive), tool use, prompt caching, structured output, PDF input, Files API, and context editing/compaction. TRIGGER when: .java files import com.anthropic.*; user asks about Claude API in Java; Java code calls Anthropic models.",
      "source": "Anthropic",
      "category": "API 开发",
      "dimensions": {
        "scenario": "用 Java 开发企业级应用，需要集成 Claude API。",
        "trigger": ".java 文件 import com.anthropic.*，用户问\"Java SDK\"\"Claude Java\"",
        "features": "Java SDK：Messages、Streaming、Tool Use、Thinking、Caching、Files API",
        "solves": "企业后端直接集成 Claude，不用再搭一层 Python/Node 中转。",
        "steps": [
          "Maven/Gradle 加依赖",
          "初始化 Client",
          "构造 Message 请求",
          "处理 Response"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    },
    {
      "name": "claude-api-php",
      "description": "Build Claude API applications with the official PHP Anthropic SDK. Covers composer install, client init, messages, streaming, thinking (adaptive), tool use, prompt caching, structured output, PDF input, Files API, and context editing/compaction. TRIGGER when: .php files use Anthropic\\* namespace; user asks about Claude API in PHP; PHP code calls Anthropic models.",
      "source": "Anthropic",
      "category": "API 开发",
      "dimensions": {
        "scenario": "用 PHP 开发 Web 应用，需要接入 Claude API。",
        "trigger": ".php 文件 use Anthropic\\*，用户问\"PHP SDK\"\"Claude PHP\"",
        "features": "PHP SDK：Messages、Streaming、Tool Use、Thinking、Caching",
        "solves": "快速在 PHP Web 项目中接入 Claude，做轻量 API 代理层。",
        "steps": [
          "composer require",
          "初始化 Client",
          "构造请求",
          "处理响应"
        ],
        "tools": [
          "无特定外部依赖"
        ]
      }
    }
  ]
};
