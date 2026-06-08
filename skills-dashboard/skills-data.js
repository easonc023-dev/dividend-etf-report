// 自动生成于 2026/6/7 01:46:25
// 运行 node generate-skills-data.js 重新生成
// 请勿手动编辑此文件
window.__SKILLS_DATA__ = {
  "generatedAt": "2026-06-06T17:46:25.219Z",
  "totals": {
    "all": 105,
    "global": 97,
    "project": 0,
    "builtin": 8
  },
  "categories": [
    "API 开发",
    "其他",
    "内容创作",
    "创意设计",
    "开发工具",
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
    "系统内置",
    "飞书"
  ],
  "skills": [
    {
      "name": "algorithmic-art",
      "description": "使用 p5.js 创建生成式算法艺术，支持种子随机和交互式参数探索。当用户请求用代码创作艺术、生成艺术、算法艺术、流场或粒子系统时使用。",
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
        ],
        "verification": "页面是否可交互（参数面板可用）？同一种子是否产生相同结果？作品是否原创而非复制现有艺术家？"
      }
    },
    {
      "name": "brand-guidelines",
      "description": "将 Anthropic 官方品牌色彩和字体应用到任何需要统一视觉风格的作品中。当涉及品牌颜色、样式规范、视觉格式化或公司设计标准时使用。",
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
        ],
        "verification": "标题字体是否为 Poppins？按钮色值是否为 #3b82f6？字体缺失时是否自动降级为 Georgia/Arial？"
      }
    },
    {
      "name": "canvas-design",
      "description": "使用设计哲学创作精美的 PNG 和 PDF 静态视觉艺术作品。当用户要求创建海报、艺术作品、设计或其他静态视觉作品时使用。",
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
        ],
        "verification": "输出是否为 PNG 或 PDF？画面元素是否符合设计哲学描述？是否原创而非复制现有艺术家？"
      }
    },
    {
      "name": "frontend-design",
      "description": "创建独具风格、生产级质量的前端界面。当用户要求构建网页组件、页面、Dashboard、React 组件、HTML/CSS 布局，或美化任何 Web UI 时使用。告别 AI 味的通用设计。",
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
        ],
        "verification": "页面是否避免了 AI 味的紫渐变+Inter 字体？是否有独特的字体和配色选择？布局是否突破对称模板？"
      }
    },
    {
      "name": "theme-factory",
      "description": "为各类作品（幻灯片、文档、报告、HTML 落地页等）应用主题样式。内置 10 套预设主题（含配色+字体），也可即时生成新主题。",
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
        ],
        "verification": "颜色是否来自选定主题？字体对是否正确应用？整体风格是否与主题预览一致？"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "lark-event",
      "description": "飞书实时事件监听与订阅：通过 lark-cli 流式消费 NDJSON 事件（覆盖消息接收、表情回应、群成员变更等）。用于飞书机器人、实时消息处理、长期运行的订阅者、流式 webhook 推送处理。",
      "source": "飞书",
      "category": "飞书基础",
      "dimensions": {
        "scenario": "飞书事件订阅：监听飞书开放平台事件。",
        "trigger": "飞书实时事件监听与订阅：通过 lark-cli 流式消费 NDJSON 事件（覆盖消息接收、表情回应、群成员变更等）。",
        "features": "飞书实时事件监听与订阅：通过 lark-cli 流式消费 NDJSON 事件（覆盖消息接收、表情回应、群成员变更等）。用于飞书机器人、实时消息处理、长期运行的订阅者、流式 webhook 推送处理。",
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
        ],
        "verification": "事件流是否正确消费？事件类型是否匹配预期？--max-events / --timeout 限制下是否正常退出？"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "lark-whiteboard",
      "description": "飞书画板：查询和编辑飞书云文档中的画板。支持导出画板为预览图片、导出原始节点结构、使用 DSL/PlantUML/Mermaid 格式更新画板内容。当需要可视化表达架构、流程、组织关系等结构化信息时使用。",
      "source": "飞书",
      "category": "飞书文档",
      "dimensions": {
        "scenario": "创建和管理飞书白板。",
        "trigger": "飞书画板：查询和编辑飞书云文档中的画板。",
        "features": "飞书画板：查询和编辑飞书云文档中的画板。支持导出画板为预览图片、导出原始节点结构、使用 DSL/PlantUML/Mermaid 格式更新画板内容。当需要可视化表达架构、流程、组织关系等结构化信息时使用。",
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
        ],
        "verification": "画板内容是否正确导出为图片？DSL/PlantUML/Mermaid 格式更新是否生效？"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "karpathy-guidelines",
      "description": "减少 LLM 常见编码错误的五条行为准则。在写代码、审查代码、重构代码时使用，避免过度工程、盲目修改、缺乏验证等问题，让代码改动更精准可控。",
      "source": "Anthropic",
      "category": "开发工具",
      "dimensions": {
        "scenario": "写代码、改代码、重构代码时，需要遵循一套经过验证的行为准则，避免低级错误。",
        "trigger": "用户写代码、审查代码、重构代码——任何涉及代码修改的场景自动激活。",
        "features": "5 条核心准则：先思考再动手、极简优先、手术刀式修改、验证再迭代、坦诚沟通",
        "solves": "减少过度工程、盲目修改、缺乏验证等 LLM 常见编码坏习惯，让代码改动更精准可控。",
        "steps": [
          "理解需求后再动手",
          "用最简方案解决问题",
          "只改必要的代码",
          "验证改动效果",
          "如实报告结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "代码改动是否符合\"最小修改\"原则？是否在改代码前先理解了需求？改完后是否验证了效果？"
      }
    },
    {
      "name": "mcp-builder",
      "description": "创建高质量 MCP（模型上下文协议）服务器的指南，让 LLM 能通过标准化工具与外部服务交互。支持 Python（FastMCP）和 Node/TypeScript（MCP SDK）两种实现方式。",
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
        ],
        "verification": "MCP 服务器能否成功连接？工具列表是否正确注册？调用工具后是否返回预期 JSON？"
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
        ],
        "verification": "是否找出了肉眼容易忽略的 bug？建议是否具体可操作？是否标注了问题严重等级？"
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
        ],
        "verification": "是否扫描了所有关键文件？漏洞是否按严重度分级？修复方案是否可行且不影响功能？"
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
        ],
        "verification": "简化后功能是否完好？代码行数是否减少？可读性是否反而变差？"
      }
    },
    {
      "name": "skill-creator",
      "description": "创建新技能、修改优化已有技能、评测技能表现。当用户想从零创建技能、编辑优化已有技能、运行 eval 测试、基准评测技能性能、优化技能描述以提升触发准确率时使用。",
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
        ],
        "verification": "技能触发准确率是否提升？eval 评分是否达标？盲评对比是否优于旧版本？"
      }
    },
    {
      "name": "pdf",
      "description": "处理任何 PDF 相关操作：读取提取文本/表格、合并拆分、旋转页面、添加水印、创建填写表单、加密解密、OCR 识别。用户提到 .pdf 文件或要生成 PDF 时使用。",
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
        ],
        "verification": "输出 PDF 能否正常打开？合并/拆分页数是否正确？OCR 结果是否可搜索？水印是否在预期位置？"
      }
    },
    {
      "name": "pptx",
      "description": "处理任何与 .pptx 文件相关的操作：创建幻灯片、演示文稿、提取内容、编辑修改、合并拆分、模板布局、演讲者备注。只要用户提到\"PPT\"\"幻灯片\"\"演示文稿\"或引用 .pptx 文件就触发。",
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
        ],
        "verification": "生成的 .pptx 能否用 PowerPoint/WPS 正常打开？幻灯片页数是否正确？文字和图片是否在预期位置？"
      }
    },
    {
      "name": "agent-reach",
      "description": ">",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": ">。",
        "trigger": ">",
        "features": ">",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-article-illustrator",
      "description": "Analyzes article structure, identifies positions requiring visual aids, generates illustrations with Type × Style × Palette three-dimension approach. Use when user asks to \"illustrate article\", \"add images\", \"generate images for article\", or \"为文章配图\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Analyzes article structure, identifies positions requiring visual aids, generates illustrations with Type × Style × Palette three-dimension approach. Use when user asks to \"illustrate article\", \"add images\", \"generate images for article\", or \"为文章配图\".。",
        "trigger": "Analyzes article structure, identifies positions requiring visual aids, generates illustrations with Type × Style × Palette three-dimension approach。 Use when user asks to \"illustrate article\", \"add images\", \"generate images for article\", or \"为文章配图\"",
        "features": "Analyzes article structure, identifies positions requiring visual aids, generates illustrations with Type × Style × Palette three-dimension approach. Use when user asks to \"illustrate article\", \"add images\", \"generate images for article\", or \"为文章配图\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-comic",
      "description": "Knowledge comic creator supporting multiple art styles and tones. Creates original educational comics with detailed panel layouts and batch-capable image generation. Use when user asks to create \"知识漫画\", \"教育漫画\", \"biography comic\", \"tutorial comic\", or \"Logicomix-style comic\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Knowledge comic creator supporting multiple art styles and tones. Creates original educational comics with detailed panel layouts and batch-capable image generation. Use when user asks to create \"知识漫画\", \"教育漫画\", \"biography comic\", \"tutorial comic\", or \"Logicomix-style comic\".。",
        "trigger": "Knowledge comic creator supporting multiple art styles and tones。 Creates original educational comics with detailed panel layouts and batch-capable image generation",
        "features": "Knowledge comic creator supporting multiple art styles and tones. Creates original educational comics with detailed panel layouts and batch-capable image generation. Use when user asks to create \"知识漫画\", \"教育漫画\", \"biography comic\", \"tutorial comic\", or \"Logicomix-style comic\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-compress-image",
      "description": "Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to \"compress image\", \"optimize image\", \"convert to webp\", or reduce image file size.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to \"compress image\", \"optimize image\", \"convert to webp\", or reduce image file size.。",
        "trigger": "Compresses images to WebP (default) or PNG with automatic tool selection。 Use when user asks to \"compress image\", \"optimize image\", \"convert to webp\", or reduce image file size",
        "features": "Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to \"compress image\", \"optimize image\", \"convert to webp\", or reduce image file size.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-cover-image",
      "description": "Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes and 7 rendering styles. Supports cinematic (2.35:1), widescreen (16:9), and square (1:1) aspects. Use when user asks to \"generate cover image\", \"create article cover\", or \"make cover\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes and 7 rendering styles. Supports cinematic (2.35:1), widescreen (16:9), and square (1:1) aspects. Use when user asks to \"generate cover image\", \"create article cover\", or \"make cover\".。",
        "trigger": "Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes and 7 rendering styles。 Supports cinematic (2",
        "features": "Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes and 7 rendering styles. Supports cinematic (2.35:1), widescreen (16:9), and square (1:1) aspects. Use when user asks to \"generate cover image\", \"create article cover\", or \"make cover\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-danger-gemini-web",
      "description": "Generates images and text via reverse-engineered Gemini Web API. Supports text generation, image generation from prompts, reference images for vision input, and multi-turn conversations. Use when other skills need image generation backend, or when user requests \"generate image with Gemini\", \"Gemini text generation\", or needs vision-capable AI generation.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Generates images and text via reverse-engineered Gemini Web API. Supports text generation, image generation from prompts, reference images for vision input, and multi-turn conversations. Use when other skills need image generation backend, or when user requests \"generate image with Gemini\", \"Gemini text generation\", or needs vision-capable AI generation.。",
        "trigger": "Generates images and text via reverse-engineered Gemini Web API。 Supports text generation, image generation from prompts, reference images for vision input, and multi-turn conversations",
        "features": "Generates images and text via reverse-engineered Gemini Web API. Supports text generation, image generation from prompts, reference images for vision input, and multi-turn conversations. Use when other skills need image generation backend, or when user requests \"generate image with Gemini\", \"Gemini text generation\", or needs vision-capable AI generation.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-danger-x-to-markdown",
      "description": "Converts X (Twitter) tweets and articles to markdown with YAML front matter. Uses reverse-engineered API requiring user consent. Use when user mentions \"X to markdown\", \"tweet to markdown\", \"save tweet\", or provides x.com/twitter.com URLs for conversion.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Converts X (Twitter) tweets and articles to markdown with YAML front matter. Uses reverse-engineered API requiring user consent. Use when user mentions \"X to markdown\", \"tweet to markdown\", \"save tweet\", or provides x.com/twitter.com URLs for conversion.。",
        "trigger": "Converts X (Twitter) tweets and articles to markdown with YAML front matter。 Uses reverse-engineered API requiring user consent",
        "features": "Converts X (Twitter) tweets and articles to markdown with YAML front matter. Uses reverse-engineered API requiring user consent. Use when user mentions \"X to markdown\", \"tweet to markdown\", \"save tweet\", or provides x.com/twitter.com URLs for conversion.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-diagram",
      "description": "Create professional, dark-themed SVG diagrams of any type — architecture diagrams, flowcharts, sequence diagrams, structural diagrams, mind maps, timelines, illustrative/conceptual diagrams, and more. Use this skill whenever the user asks for any kind of technical or conceptual diagram, visualization of a system, process flow, data flow, component relationship, network topology, decision tree, org chart, state machine, or any visual representation of structure/logic/process. Also trigger when the user says \"画个图\" \"画一个架构图\" \"diagram\" \"flowchart\" \"sequence diagram\" \"draw me a ...\" or uploads content and asks to visualize it. Output is always a standalone .svg file.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Create professional, dark-themed SVG diagrams of any type — architecture diagrams, flowcharts, sequence diagrams, structural diagrams, mind maps, timelines, illustrative/conceptual diagrams, and more. Use this skill whenever the user asks for any kind of technical or conceptual diagram, visualization of a system, process flow, data flow, component relationship, network topology, decision tree, org chart, state machine, or any visual representation of structure/logic/process. Also。",
        "trigger": "the user says \"画个图\" \"画一个架构图\" \"diagram\" \"flowchart\" \"sequence diagram\" \"draw me a ...\" or uploads content and asks to visualize it. Output is always a standalone .svg file.",
        "features": "Create professional, dark-themed SVG diagrams of any type — architecture diagrams, flowcharts, sequence diagrams, structural diagrams, mind maps, timelines, illustrative/conceptual diagrams, and more. Use this skill whenever the user asks for any kind of technical or conceptual diagram, visualization of a system, process flow, data flow, component relationship, network topology, decision tree, org chart, state machine, or any visual representation of structure/logic/process. Also",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "1",
          "Identify the diagram type from the user's request 2",
          "Read the relevant reference file if one exists for that type 3",
          "Plan the layout: list all components, determine grouping and flow direction, calculate positions 4",
          "Write the SVG following the layering order above 5"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-electron-extract",
      "description": "Extracts resources and JavaScript from any installed Electron app (`.asar` bundle), restoring original sources from `.js.map` files when available or formatting minified code with Prettier otherwise. Use when user wants to \"extract Electron app\", \"decompile Electron\", \"get the source code of <app>\", \"inspect app.asar\", \"看 Electron 应用源码\", \"提取 .asar\", or asks how a desktop Electron app is built. Skips `node_modules` and supports both macOS and Windows.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Extracts resources and JavaScript from any installed Electron app (`.asar` bundle), restoring original sources from `.js.map` files when available or formatting minified code with Prettier otherwise. Use when user wants to \"extract Electron app\", \"decompile Electron\", \"get the source code of <app>\", \"inspect app.asar\", \"看 Electron 应用源码\", \"提取 .asar\", or asks how a desktop Electron app is built. Skips `node_modules` and supports both macOS and Windows.。",
        "trigger": "Extracts resources and JavaScript from any installed Electron app (`。asar` bundle), restoring original sources from `",
        "features": "Extracts resources and JavaScript from any installed Electron app (`.asar` bundle), restoring original sources from `.js.map` files when available or formatting minified code with Prettier otherwise. Use when user wants to \"extract Electron app\", \"decompile Electron\", \"get the source code of <app>\", \"inspect app.asar\", \"看 Electron 应用源码\", \"提取 .asar\", or asks how a desktop Electron app is built. Skips `node_modules` and supports both macOS and Windows.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-format-markdown",
      "description": "Formats plain text or markdown files with frontmatter, titles, summaries, headings, bold, lists, and code blocks. Use when user asks to \"format markdown\", \"beautify article\", \"add formatting\", or improve article layout. Outputs to {filename}-formatted.md.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Formats plain text or markdown files with frontmatter, titles, summaries, headings, bold, lists, and code blocks. Use when user asks to \"format markdown\", \"beautify article\", \"add formatting\", or improve article layout. Outputs to {filename}-formatted.md.。",
        "trigger": "Formats plain text or markdown files with frontmatter, titles, summaries, headings, bold, lists, and code blocks。 Use when user asks to \"format markdown\", \"beautify article\", \"add formatting\", or improve article layout",
        "features": "Formats plain text or markdown files with frontmatter, titles, summaries, headings, bold, lists, and code blocks. Use when user asks to \"format markdown\", \"beautify article\", \"add formatting\", or improve article layout. Outputs to {filename}-formatted.md.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-image-gen",
      "description": "AI image generation with OpenAI GPT Image 2, Azure OpenAI, Google, OpenRouter, DashScope, Z.AI GLM-Image, MiniMax, Jimeng, Seedream and Replicate APIs. Supports text-to-image, reference images, aspect ratios, and batch generation from saved prompt files. Sequential by default; use batch parallel generation when the user already has multiple prompts or wants stable multi-image throughput. Use when user asks to generate, create, or draw images.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "AI image generation with OpenAI GPT Image 2, Azure OpenAI, Google, OpenRouter, DashScope, Z.AI GLM-Image, MiniMax, Jimeng, Seedream and Replicate APIs. Supports text-to-image, reference images, aspect ratios, and batch generation from saved prompt files. Sequential by default; use batch parallel generation when the user already has multiple prompts or wants stable multi-image throughput. Use when user asks to generate, create, or draw images.。",
        "trigger": "AI image generation with OpenAI GPT Image 2, Azure OpenAI, Google, OpenRouter, DashScope, Z。AI GLM-Image, MiniMax, Jimeng, Seedream and Replicate APIs",
        "features": "AI image generation with OpenAI GPT Image 2, Azure OpenAI, Google, OpenRouter, DashScope, Z.AI GLM-Image, MiniMax, Jimeng, Seedream and Replicate APIs. Supports text-to-image, reference images, aspect ratios, and batch generation from saved prompt files. Sequential by default; use batch parallel generation when the user already has multiple prompts or wants stable multi-image throughput. Use when user asks to generate, create, or draw images.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "**Found** → load, parse, apply. If `default_model.[provider]` is null → ask model only.",
          "**Not found** → run first-time setup (`references/config/first-time-setup.md`) using AskUserQuestion to collect provider + model + quality + save location. Save EXTEND.md, then continue. Do not generate images before this completes."
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-infographic",
      "description": "Generate professional infographics with 21 layout types and 22 visual styles. Analyzes content, recommends layout×style combinations, and generates publication-ready infographics. Use when user asks to create \"infographic\", \"信息图\", \"visual summary\", \"可视化\", or \"高密度信息大图\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Generate professional infographics with 21 layout types and 22 visual styles. Analyzes content, recommends layout×style combinations, and generates publication-ready infographics. Use when user asks to create \"infographic\", \"信息图\", \"visual summary\", \"可视化\", or \"高密度信息大图\".。",
        "trigger": "Generate professional infographics with 21 layout types and 22 visual styles。 Analyzes content, recommends layout×style combinations, and generates publication-ready infographics",
        "features": "Generate professional infographics with 21 layout types and 22 visual styles. Analyzes content, recommends layout×style combinations, and generates publication-ready infographics. Use when user asks to create \"infographic\", \"信息图\", \"visual summary\", \"可视化\", or \"高密度信息大图\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-markdown-to-html",
      "description": "Converts Markdown to styled HTML with WeChat-compatible themes. Supports code highlighting, math, Mermaid (rendered to PNG via headless Chrome), PlantUML, footnotes, alerts, infographics, and optional bottom citations for external links. Use when user asks for \"markdown to html\", \"convert md to html\", \"md 转 html\", \"微信外链转底部引用\", or needs styled HTML output from markdown.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Converts Markdown to styled HTML with WeChat-compatible themes. Supports code highlighting, math, Mermaid (rendered to PNG via headless Chrome), PlantUML, footnotes, alerts, infographics, and optional bottom citations for external links. Use when user asks for \"markdown to html\", \"convert md to html\", \"md 转 html\", \"微信外链转底部引用\", or needs styled HTML output from markdown.。",
        "trigger": "Converts Markdown to styled HTML with WeChat-compatible themes。 Supports code highlighting, math, Mermaid (rendered to PNG via headless Chrome), PlantUML, footnotes, alerts, infographics, and optional bottom citations for external links",
        "features": "Converts Markdown to styled HTML with WeChat-compatible themes. Supports code highlighting, math, Mermaid (rendered to PNG via headless Chrome), PlantUML, footnotes, alerts, infographics, and optional bottom citations for external links. Use when user asks for \"markdown to html\", \"convert md to html\", \"md 转 html\", \"微信外链转底部引用\", or needs styled HTML output from markdown.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-post-to-wechat",
      "description": "Posts content to WeChat Official Account (微信公众号) via API or Chrome CDP. Supports article posting (文章) with HTML, markdown, or plain text input, and image-text posting (贴图, formerly 图文) with multiple images. Markdown article workflows default to converting ordinary external links into bottom citations for WeChat-friendly output. Use when user mentions \"发布公众号\", \"post to wechat\", \"微信公众号\", or \"贴图/图文/文章\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Posts content to WeChat Official Account (微信公众号) via API or Chrome CDP. Supports article posting (文章) with HTML, markdown, or plain text input, and image-text posting (贴图, formerly 图文) with multiple images. Markdown article workflows default to converting ordinary external links into bottom citations for WeChat-friendly output. Use when user mentions \"发布公众号\", \"post to wechat\", \"微信公众号\", or \"贴图/图文/文章\".。",
        "trigger": "Posts content to WeChat Official Account (微信公众号) via API or Chrome CDP。 Supports article posting (文章) with HTML, markdown, or plain text input, and image-text posting (贴图, formerly 图文) with multiple images",
        "features": "Posts content to WeChat Official Account (微信公众号) via API or Chrome CDP. Supports article posting (文章) with HTML, markdown, or plain text input, and image-text posting (贴图, formerly 图文) with multiple images. Markdown article workflows default to converting ordinary external links into bottom citations for WeChat-friendly output. Use when user mentions \"发布公众号\", \"post to wechat\", \"微信公众号\", or \"贴图/图文/文章\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-post-to-weibo",
      "description": "Posts content to Weibo (微博). Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP. Use when user asks to \"post to Weibo\", \"发微博\", \"发布微博\", \"publish to Weibo\", \"share on Weibo\", \"写微博\", or \"微博头条文章\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Posts content to Weibo (微博). Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP. Use when user asks to \"post to Weibo\", \"发微博\", \"发布微博\", \"publish to Weibo\", \"share on Weibo\", \"写微博\", or \"微博头条文章\".。",
        "trigger": "Posts content to Weibo (微博)。 Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP",
        "features": "Posts content to Weibo (微博). Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP. Use when user asks to \"post to Weibo\", \"发微博\", \"发布微博\", \"publish to Weibo\", \"share on Weibo\", \"写微博\", or \"微博头条文章\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-post-to-x",
      "description": "Posts content and articles to X (Twitter). Supports regular posts with images/videos and X Articles (long-form Markdown). In Codex, honor explicit requests for the Codex Chrome plugin/@chrome by using the Chrome Extension workflow; otherwise use Chrome Computer Use when available and fall back to real Chrome CDP scripts only when allowed. Use when user asks to \"post to X\", \"tweet\", \"publish to Twitter\", or \"share on X\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Posts content and articles to X (Twitter). Supports regular posts with images/videos and X Articles (long-form Markdown). In Codex, honor explicit requests for the Codex Chrome plugin/@chrome by using the Chrome Extension workflow; otherwise use Chrome Computer Use when available and fall back to real Chrome CDP scripts only when allowed. Use when user asks to \"post to X\", \"tweet\", \"publish to Twitter\", or \"share on X\".。",
        "trigger": "Posts content and articles to X (Twitter)。 Supports regular posts with images/videos and X Articles (long-form Markdown)",
        "features": "Posts content and articles to X (Twitter). Supports regular posts with images/videos and X Articles (long-form Markdown). In Codex, honor explicit requests for the Codex Chrome plugin/@chrome by using the Chrome Extension workflow; otherwise use Chrome Computer Use when available and fall back to real Chrome CDP scripts only when allowed. Use when user asks to \"post to X\", \"tweet\", \"publish to Twitter\", or \"share on X\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-slide-deck",
      "description": "Generates professional slide deck images from content. Creates outlines with style instructions, then generates individual slide images. Use when user asks to \"create slides\", \"make a presentation\", \"generate deck\", \"slide deck\", or \"PPT\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Generates professional slide deck images from content. Creates outlines with style instructions, then generates individual slide images. Use when user asks to \"create slides\", \"make a presentation\", \"generate deck\", \"slide deck\", or \"PPT\".。",
        "trigger": "Generates professional slide deck images from content。 Creates outlines with style instructions, then generates individual slide images",
        "features": "Generates professional slide deck images from content. Creates outlines with style instructions, then generates individual slide images. Use when user asks to \"create slides\", \"make a presentation\", \"generate deck\", \"slide deck\", or \"PPT\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-translate",
      "description": "Translates articles and documents between languages with three modes - quick (direct), normal (analyze then translate), and refined (analyze, translate, review, polish). Supports custom glossaries and terminology consistency via EXTEND.md. Use when user asks to \"translate\", \"翻译\", \"精翻\", \"translate article\", \"translate to Chinese/English\", \"改成中文\", \"改成英文\", \"convert to Chinese\", \"localize\", \"本地化\", or needs any document translation. Also triggers for \"refined translation\", \"精细翻译\", \"proofread translation\", \"快速翻译\", \"快翻\", \"这篇文章翻译一下\", or when a URL or file is provided with translation intent.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Translates articles and documents between languages with three modes - quick (direct), normal (analyze then translate), and refined (analyze, translate, review, polish). Supports custom glossaries and terminology consistency via EXTEND.md. Use when user asks to \"translate\", \"翻译\", \"精翻\", \"translate article\", \"translate to Chinese/English\", \"改成中文\", \"改成英文\", \"convert to Chinese\", \"localize\", \"本地化\", or needs any document translation. Also triggers for \"refined translation\", \"精细翻译\", \"proofread translation\", \"快速翻译\", \"快翻\", \"这篇文章翻译一下\", or when a URL or file is provided with translation intent.。",
        "trigger": "s for \"refined translation\", \"精细翻译\", \"proofread translation\", \"快速翻译\", \"快翻\", \"这篇文章翻译一下\", or when a URL or file is provided with translation intent.",
        "features": "Translates articles and documents between languages with three modes - quick (direct), normal (analyze then translate), and refined (analyze, translate, review, polish). Supports custom glossaries and terminology consistency via EXTEND.md. Use when user asks to \"translate\", \"翻译\", \"精翻\", \"translate article\", \"translate to Chinese/English\", \"改成中文\", \"改成英文\", \"convert to Chinese\", \"localize\", \"本地化\", or needs any document translation. Also triggers for \"refined translation\", \"精细翻译\", \"proofread translation\", \"快速翻译\", \"快翻\", \"这篇文章翻译一下\", or when a URL or file is provided with translation intent.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-url-to-markdown",
      "description": "Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters). Built-in adapters for X/Twitter, YouTube transcripts, Hacker News threads, and generic pages via Defuddle. Handles login/CAPTCHA via interaction wait modes. Use when user wants to save a webpage as markdown.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters). Built-in adapters for X/Twitter, YouTube transcripts, Hacker News threads, and generic pages via Defuddle. Handles login/CAPTCHA via interaction wait modes. Use when user wants to save a webpage as markdown.。",
        "trigger": "Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters)。 Built-in adapters for X/Twitter, YouTube transcripts, Hacker News threads, and generic pages via Defuddle",
        "features": "Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters). Built-in adapters for X/Twitter, YouTube transcripts, Hacker News threads, and generic pages via Defuddle. Handles login/CAPTCHA via interaction wait modes. Use when user wants to save a webpage as markdown.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-wechat-summary",
      "description": "Summarizes WeChat group chat highlights into a structured digest using the local wx-cli binary (https://github.com/jackwener/wx-cli). Generates a normal digest by default; a roast (毒舌) version is opt-in. Maintains per-group history (history.json + history-digests.jsonl) and per-user profiles across runs, with privacy guardrails baked in. Use when the user asks to \"总结群聊\", \"群聊精华\", \"群聊摘要\", \"summarize group chat\", \"group chat digest\", mentions a WeChat group name with a time range, says \"帮我看看 XX 群最近聊了什么\", \"XX 群有什么值得看的\", or asks to \"回溯画像\" / \"初始化画像\" / \"backfill profiles\". Adds the roast version when the user says \"毒舌版\", \"roast 版\", \"再来个毒舌的\", or similar.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Summarizes WeChat group chat highlights into a structured digest using the local wx-cli binary (https://github.com/jackwener/wx-cli). Generates a normal digest by default; a roast (毒舌) version is opt-in. Maintains per-group history (history.json + history-digests.jsonl) and per-user profiles across runs, with privacy guardrails baked in. Use when the user asks to \"总结群聊\", \"群聊精华\", \"群聊摘要\", \"summarize group chat\", \"group chat digest\", mentions a WeChat group name with a time range, says \"帮我看看 XX 群最近聊了什么\", \"XX 群有什么值得看的\", or asks to \"回溯画像\" / \"初始化画像\" / \"backfill profiles\". Adds the roast version when the user says \"毒舌版\", \"roast 版\", \"再来个毒舌的\", or similar.。",
        "trigger": "Summarizes WeChat group chat highlights into a structured digest using the local wx-cli binary (https://github。com/jackwener/wx-cli)",
        "features": "Summarizes WeChat group chat highlights into a structured digest using the local wx-cli binary (https://github.com/jackwener/wx-cli). Generates a normal digest by default; a roast (毒舌) version is opt-in. Maintains per-group history (history.json + history-digests.jsonl) and per-user profiles across runs, with privacy guardrails baked in. Use when the user asks to \"总结群聊\", \"群聊精华\", \"群聊摘要\", \"summarize group chat\", \"group chat digest\", mentions a WeChat group name with a time range, says \"帮我看看 XX 群最近聊了什么\", \"XX 群有什么值得看的\", or asks to \"回溯画像\" / \"初始化画像\" / \"backfill profiles\". Adds the roast version when the user says \"毒舌版\", \"roast 版\", \"再来个毒舌的\", or similar.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-xhs-images",
      "description": "Generates infographic image card series with 12 visual styles, 8 layouts, and 3 color palettes. Breaks content into 1-10 cartoon-style image cards optimized for social media engagement. Use when user mentions \"小红书图片\", \"小红书种草\", \"小绿书\", \"微信图文\", \"微信贴图\", \"image cards\", \"图片卡片\", baoyu-xhs-images, or wants social media infographic series.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Generates infographic image card series with 12 visual styles, 8 layouts, and 3 color palettes. Breaks content into 1-10 cartoon-style image cards optimized for social media engagement. Use when user mentions \"小红书图片\", \"小红书种草\", \"小绿书\", \"微信图文\", \"微信贴图\", \"image cards\", \"图片卡片\", baoyu-xhs-images, or wants social media infographic series.。",
        "trigger": "Generates infographic image card series with 12 visual styles, 8 layouts, and 3 color palettes。 Breaks content into 1-10 cartoon-style image cards optimized for social media engagement",
        "features": "Generates infographic image card series with 12 visual styles, 8 layouts, and 3 color palettes. Breaks content into 1-10 cartoon-style image cards optimized for social media engagement. Use when user mentions \"小红书图片\", \"小红书种草\", \"小绿书\", \"微信图文\", \"微信贴图\", \"image cards\", \"图片卡片\", baoyu-xhs-images, or wants social media infographic series.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "baoyu-youtube-transcript",
      "description": "Downloads YouTube video transcripts/subtitles and cover images by URL or video ID. Supports multiple languages, translation, chapters, and speaker identification. Caches raw data for fast re-formatting. Use when user asks to \"get YouTube transcript\", \"download subtitles\", \"get captions\", \"YouTube字幕\", \"YouTube封面\", \"视频封面\", \"video thumbnail\", \"video cover image\", or provides a YouTube URL and wants the transcript/subtitle text or cover image extracted.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Downloads YouTube video transcripts/subtitles and cover images by URL or video ID. Supports multiple languages, translation, chapters, and speaker identification. Caches raw data for fast re-formatting. Use when user asks to \"get YouTube transcript\", \"download subtitles\", \"get captions\", \"YouTube字幕\", \"YouTube封面\", \"视频封面\", \"video thumbnail\", \"video cover image\", or provides a YouTube URL and wants the transcript/subtitle text or cover image extracted.。",
        "trigger": "Downloads YouTube video transcripts/subtitles and cover images by URL or video ID。 Supports multiple languages, translation, chapters, and speaker identification",
        "features": "Downloads YouTube video transcripts/subtitles and cover images by URL or video ID. Supports multiple languages, translation, chapters, and speaker identification. Caches raw data for fast re-formatting. Use when user asks to \"get YouTube transcript\", \"download subtitles\", \"get captions\", \"YouTube字幕\", \"YouTube封面\", \"视频封面\", \"video thumbnail\", \"video cover image\", or provides a YouTube URL and wants the transcript/subtitle text or cover image extracted.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "claude-design-card",
      "description": "|",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "|。",
        "trigger": "|",
        "features": "|",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "所有样式内联，不依赖外部 CSS / JS",
          "使用本地字体（`TsangerJinKai02-W04.ttf`、`NotoSerifSC-Regular.ttf`），通过 `@font-face` 加载",
          "卡片宽度与格式尺寸匹配",
          "底部包含一键保存 PNG 按鈕（浏览器直接打开可用）"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "content-pipeline",
      "description": "内容生产和分发统一管线。素材收集→出稿→排版→封面→朋友圈文案→多平台转换→一键分发。涵盖公众号写作、小红书轮播图、即刻文案、播客音频、品牌视频、Chrome CDP 自动发布。",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "内容生产和分发统一管线。",
        "trigger": "内容生产和分发统一管线。素材收集→出稿→排版→封面→朋友圈文案→多平台转换→一键分发",
        "features": "内容生产和分发统一管线。素材收集→出稿→排版→封面→朋友圈文案→多平台转换→一键分发。涵盖公众号写作、小红书轮播图、即刻文案、播客音频、品牌视频、Chrome CDP 自动发布。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "export-to-docx",
      "description": "将当前对话中产生的结构化内容（分析报告、梳理总结、技术文档等）导出为排版良好的 Word 文档（.docx）。当用户说「导出word」「导出到word」「导出成word」「存成word」或类似意图时使用。",
      "source": "Anthropic",
      "category": "其他",
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
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "find-skills",
      "description": "Helps users discover and install agent skills when they ask questions like \"how do I do X\", \"find a skill for X\", \"is there a skill that can...\", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Helps users discover and install agent skills when they ask questions like \"how do I do X\", \"find a skill for X\", \"is there a skill that can...\", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.。",
        "trigger": "Helps users discover and install agent skills when they ask questions like \"how do I do X\", \"find a skill for X\", \"is there a skill that can。",
        "features": "Helps users discover and install agent skills when they ask questions like \"how do I do X\", \"find a skill for X\", \"is there a skill that can...\", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "humanizer-zh",
      "description": "|",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "|。",
        "trigger": "|",
        "features": "|",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "kling-api",
      "description": "可灵 (Kling) AI 图片与视频生成。当用户说\"生成一张图\"\"做一张海报\"\"生成视频\"\"文生图\"\"图生视频\"\"可灵\"\"kling\"时触发。",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "可灵 (Kling) AI 图片与视频生成。",
        "trigger": "可灵 (Kling) AI 图片与视频生成。当用户说\"生成一张图\"\"做一张海报\"\"生成视频\"\"文生图\"\"图生视频\"\"可灵\"\"kling\"时触发",
        "features": "可灵 (Kling) AI 图片与视频生成。当用户说\"生成一张图\"\"做一张海报\"\"生成视频\"\"文生图\"\"图生视频\"\"可灵\"\"kling\"时触发。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "md2wechat",
      "description": "Convert Markdown to WeChat Official Account HTML. Use this whenever the user wants WeChat article conversion, draft upload, image generation for articles, cover or infographic generation, image-post creation, writer-style drafting, AI trace removal, or needs to inspect supported providers, themes, and prompt templates before running the workflow.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Convert Markdown to WeChat Official Account HTML. Use this whenever the user wants WeChat article conversion, draft upload, image generation for articles, cover or infographic generation, image-post creation, writer-style drafting, AI trace removal, or needs to inspect supported providers, themes, and prompt templates before running the workflow.。",
        "trigger": "Convert Markdown to WeChat Official Account HTML。 Use this whenever the user wants WeChat article conversion, draft upload, image generation for articles, cover or infographic generation, image-post creation, writer-style drafting, AI trace removal, or needs to inspect supported providers, themes, and prompt templates before running the workflow",
        "features": "Convert Markdown to WeChat Official Account HTML. Use this whenever the user wants WeChat article conversion, draft upload, image generation for articles, cover or infographic generation, image-post creation, writer-style drafting, AI trace removal, or needs to inspect supported providers, themes, and prompt templates before running the workflow.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "notebooklm",
      "description": "Use this skill to query your Google NotebookLM notebooks directly from Claude Code for source-grounded, citation-backed answers from Gemini. Browser automation, library management, persistent auth. Drastically reduced hallucinations through document-only responses.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use this skill to query your Google NotebookLM notebooks directly from Claude Code for source-grounded, citation-backed answers from Gemini. Browser automation, library management, persistent auth. Drastically reduced hallucinations through document-only responses.。",
        "trigger": "Use this skill to query your Google NotebookLM notebooks directly from Claude Code for source-grounded, citation-backed answers from Gemini。 Browser automation, library management, persistent auth",
        "features": "Use this skill to query your Google NotebookLM notebooks directly from Claude Code for source-grounded, citation-backed answers from Gemini. Browser automation, library management, persistent auth. Drastically reduced hallucinations through document-only responses.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "opencli-adapter-author",
      "description": "Use when writing an OpenCLI adapter for a new site or adding a new command to an existing site. Guides end-to-end from first recon through field decoding, adapter coding, and verify. Replaces opencli-oneshot / opencli-explorer. For ad-hoc browser driving (no adapter), see opencli-browser instead; for a top-level orientation to opencli, see opencli-usage.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when writing an OpenCLI adapter for a new site or adding a new command to an existing site. Guides end-to-end from first recon through field decoding, adapter coding, and verify. Replaces opencli-oneshot / opencli-explorer. For ad-hoc browser driving (no adapter), see opencli-browser instead; for a top-level orientation to opencli, see opencli-usage.。",
        "trigger": "Use when writing an OpenCLI adapter for a new site or adding a new command to an existing site。 Guides end-to-end from first recon through field decoding, adapter coding, and verify",
        "features": "Use when writing an OpenCLI adapter for a new site or adding a new command to an existing site. Guides end-to-end from first recon through field decoding, adapter coding, and verify. Replaces opencli-oneshot / opencli-explorer. For ad-hoc browser driving (no adapter), see opencli-browser instead; for a top-level orientation to opencli, see opencli-usage.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "opencli-autofix",
      "description": "Automatically fix broken OpenCLI adapters when commands fail. Load this skill when an opencli command fails — it guides you through collecting a trace artifact, patching the adapter, retrying, and filing an upstream GitHub issue after a verified fix. Works with any AI agent.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Automatically fix broken OpenCLI adapters when commands fail. Load this skill when an opencli command fails — it guides you through collecting a trace artifact, patching the adapter, retrying, and filing an upstream GitHub issue after a verified fix. Works with any AI agent.。",
        "trigger": "Automatically fix broken OpenCLI adapters when commands fail。 Load this skill when an opencli command fails — it guides you through collecting a trace artifact, patching the adapter, retrying, and filing an upstream GitHub issue after a verified fix",
        "features": "Automatically fix broken OpenCLI adapters when commands fail. Load this skill when an opencli command fails — it guides you through collecting a trace artifact, patching the adapter, retrying, and filing an upstream GitHub issue after a verified fix. Works with any AI agent.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "opencli-browser",
      "description": "Use when an agent needs to drive a real Chrome window via opencli — inspect a page, fill forms, click through logged-in flows, or extract data ad-hoc. Covers the selector-first target contract, compound form fields, stale-ref handling, network capture, and the agent-native envelopes the CLI returns. Not for writing adapters — see opencli-adapter-author for that.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when an agent needs to drive a real Chrome window via opencli — inspect a page, fill forms, click through logged-in flows, or extract data ad-hoc. Covers the selector-first target contract, compound form fields, stale-ref handling, network capture, and the agent-native envelopes the CLI returns. Not for writing adapters — see opencli-adapter-author for that.。",
        "trigger": "Use when an agent needs to drive a real Chrome window via opencli — inspect a page, fill forms, click through logged-in flows, or extract data ad-hoc。 Covers the selector-first target contract, compound form fields, stale-ref handling, network capture, and the agent-native envelopes the CLI returns",
        "features": "Use when an agent needs to drive a real Chrome window via opencli — inspect a page, fill forms, click through logged-in flows, or extract data ad-hoc. Covers the selector-first target contract, compound form fields, stale-ref handling, network capture, and the agent-native envelopes the CLI returns. Not for writing adapters — see opencli-adapter-author for that.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "opencli-usage",
      "description": "Use at the start of any OpenCLI session — this is the top-level map of what `opencli` can do, how to discover adapters, what flags and output formats are universal, and which specialized skill to load next. Point here when an agent asks \"what can opencli do?\" or \"how do I find the right command?\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use at the start of any OpenCLI session — this is the top-level map of what `opencli` can do, how to discover adapters, what flags and output formats are universal, and which specialized skill to load next. Point here when an agent asks \"what can opencli do?\" or \"how do I find the right command?\".。",
        "trigger": "Use at the start of any OpenCLI session — this is the top-level map of what `opencli` can do, how to discover adapters, what flags and output formats are universal, and which specialized skill to load next。 Point here when an agent asks \"what can opencli do?\" or \"how do I find the right command?\"",
        "features": "Use at the start of any OpenCLI session — this is the top-level map of what `opencli` can do, how to discover adapters, what flags and output formats are universal, and which specialized skill to load next. Point here when an agent asks \"what can opencli do?\" or \"how do I find the right command?\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "pdf-full-reader",
      "description": "",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "。",
        "trigger": "。",
        "features": "",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "pdf-vision-reader",
      "description": "Converts PDF pages to images and uses vision analysis to extract content including diagrams, charts, and visual elements. Use for PDFs with rich visual content. Requires pdf2image and poppler-utils.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Converts PDF pages to images and uses vision analysis to extract content including diagrams, charts, and visual elements. Use for PDFs with rich visual content. Requires pdf2image and poppler-utils.。",
        "trigger": "Converts PDF pages to images and uses vision analysis to extract content including diagrams, charts, and visual elements。 Use for PDFs with rich visual content",
        "features": "Converts PDF pages to images and uses vision analysis to extract content including diagrams, charts, and visual elements. Use for PDFs with rich visual content. Requires pdf2image and poppler-utils.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "project-summary",
      "description": "项目总结汇报生成器。当用户需要对项目进行总结汇报、制作项目 presentation、生成项目介绍 PPT、向利益相关者展示项目来龙去脉时使用。也适用于用户说\"总结这个项目\"、\"做一个项目汇报\"、\"生成项目 presentation\"、\"给老板看这个项目\"等场景。生成全屏横滑幻灯片式 HTML，风格为浅米色+金色点缀的专业投研报告风格。",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "项目总结汇报生成器。",
        "trigger": "项目总结汇报生成器。当用户需要对项目进行总结汇报、制作项目 presentation、生成项目介绍 PPT、向利益相关者展示项目来龙去脉时使用",
        "features": "项目总结汇报生成器。当用户需要对项目进行总结汇报、制作项目 presentation、生成项目介绍 PPT、向利益相关者展示项目来龙去脉时使用。也适用于用户说\"总结这个项目\"、\"做一个项目汇报\"、\"生成项目 presentation\"、\"给老板看这个项目\"等场景。生成全屏横滑幻灯片式 HTML，风格为浅米色+金色点缀的专业投研报告风格。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "project-to-article",
      "description": "将 coding 项目总结为结构清晰、有人味、视觉吸睛的公众号文章。当用户说\"把这个项目写成文章\"、\"总结成公众号文章\"、\"生成一篇项目介绍文\"、\"写一篇推文介绍这个项目\"时使用。也适用于用户想将技术项目转化为面向普通读者的叙事性文章。",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "将 coding 项目总结为结构清晰、有人味、视觉吸睛的公众号文章。",
        "trigger": "将 coding 项目总结为结构清晰、有人味、视觉吸睛的公众号文章。当用户说\"把这个项目写成文章\"、\"总结成公众号文章\"、\"生成一篇项目介绍文\"、\"写一篇推文介绍这个项目\"时使用",
        "features": "将 coding 项目总结为结构清晰、有人味、视觉吸睛的公众号文章。当用户说\"把这个项目写成文章\"、\"总结成公众号文章\"、\"生成一篇项目介绍文\"、\"写一篇推文介绍这个项目\"时使用。也适用于用户想将技术项目转化为面向普通读者的叙事性文章。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "具体、有数字、有悬念感",
          "例：\"我花了两个月，用三个免费工具，搭了一套量化投研系统\"",
          "副标题一句话提炼核心价值",
          "**语气**：像朋友聊天，不像老师讲课。用\"说实话\"、\"后来才想明白\"这类口语化转折",
          "**金句**：每段至少 1 句可以单独摘出来发朋友圈的话，用斜体"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "release-skills",
      "description": "Universal release workflow. Auto-detects version files and changelogs. Supports Node.js, Python, Rust, Claude Plugin, GitHub Releases, annotated tags, historical release backfill, and generic projects. Use when user says \"release\", \"发布\", \"new version\", \"bump version\", \"push\", \"推送\", \"release notes\", \"GitHub Release\", or \"回填 Release\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Universal release workflow. Auto-detects version files and changelogs. Supports Node.js, Python, Rust, Claude Plugin, GitHub Releases, annotated tags, historical release backfill, and generic projects. Use when user says \"release\", \"发布\", \"new version\", \"bump version\", \"push\", \"推送\", \"release notes\", \"GitHub Release\", or \"回填 Release\".。",
        "trigger": "Universal release workflow。 Auto-detects version files and changelogs",
        "features": "Universal release workflow. Auto-detects version files and changelogs. Supports Node.js, Python, Rust, Claude Plugin, GitHub Releases, annotated tags, historical release backfill, and generic projects. Use when user says \"release\", \"发布\", \"new version\", \"bump version\", \"push\", \"推送\", \"release notes\", \"GitHub Release\", or \"回填 Release\".",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "skill-publisher",
      "description": "Publish a Claude Code skill to GitHub with one command. Automates git init, commit, repo creation, README generation, topics, and license setup. TRIGGER when: user wants to upload a skill to GitHub, publish a skill, push to GitHub, \"上传到GitHub\", \"发布到GitHub\", \"skill上传到我github\", \"把这个skill发布到github\", \"推送到github\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Publish a Claude Code skill to GitHub with one command. Automates git init, commit, repo creation, README generation, topics, and license setup.。",
        "trigger": "user wants to upload a skill to GitHub, publish a skill, push to GitHub, \"上传到GitHub\", \"发布到GitHub\", \"skill上传到我github\", \"把这个skill发布到github\", \"推送到github\".",
        "features": "Publish a Claude Code skill to GitHub with one command. Automates git init, commit, repo creation, README generation, topics, and license setup.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "`gh` not found → install: `winget install GitHub.cli` (Windows) or direct to https://cli.github.com",
          "`gh` not authenticated → direct user to run `gh auth login`",
          "`git` not found → direct user to install Git",
          "Look for pattern: `Logged in to github.com account <USERNAME>`",
          "Store as `GITHUB_USER`"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "skills-dashboard",
      "description": "Build an HTML dashboard to visualize and manage all your Claude Code skills. Uses a 7-dimension analysis framework with auto-generated skill data, search, filter, and interactive expandable cards. TRIGGER when: user wants to see all skills, build a skills dashboard, visualize skills, manage skills overview, create a skills gallery/展示页面, make a skill management page, or asks \"what skills do I have\" / \"show me my skills\" / \"列出所有技能\" / \"技能概览\" / \"查看技能\" / \"我有哪些技能\".",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Build an HTML dashboard to visualize and manage all your Claude Code skills. Uses a 7-dimension analysis framework with auto-generated skill data, search, filter, and interactive expandable cards.。",
        "trigger": "user wants to see all skills, build a skills dashboard, visualize skills, manage skills overview, create a skills gallery/展示页面, make a skill management page, or asks \"what skills do I have\" / \"show me my skills\" / \"列出所有技能\" / \"技能概览\" / \"查看技能\" / \"我有哪些技能\".",
        "features": "Build an HTML dashboard to visualize and manage all your Claude Code skills. Uses a 7-dimension analysis framework with auto-generated skill data, search, filter, and interactive expandable cards.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "socratic",
      "description": "Socratic questioning to examine beliefs, uncover assumptions, and develop deeper understanding. Use to challenge thinking, evaluate proposals, or teach without lecturing.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Socratic questioning to examine beliefs, uncover assumptions, and develop deeper understanding. Use to challenge thinking, evaluate proposals, or teach without lecturing.。",
        "trigger": "Socratic questioning to examine beliefs, uncover assumptions, and develop deeper understanding。 Use to challenge thinking, evaluate proposals, or teach without lecturing",
        "features": "Socratic questioning to examine beliefs, uncover assumptions, and develop deeper understanding. Use to challenge thinking, evaluate proposals, or teach without lecturing.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-brainstorming",
      "description": "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.。",
        "trigger": "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior。 Explores user intent, requirements and design before implementation",
        "features": "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "Check out the current project state first (files, docs, recent commits)",
          "Before asking detailed questions, assess scope: if the request describes multiple independent subsystems (e.g., \"build a platform with chat, file storage, billing, and analytics\"), flag this immediately. Don't spend questions refining details of a project that needs to be decomposed first.",
          "If the project is too large for a single spec, help the user decompose into sub-projects: what are the independent pieces, how do they relate, what order should they be built? Then brainstorm the first sub-project through the normal design flow. Each sub-project gets its own spec → plan → implementation cycle.",
          "For appropriately-scoped projects, ask questions one at a time to refine the idea",
          "Prefer multiple choice questions when possible, but open-ended is fine too"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-dispatching-parallel-agents",
      "description": "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies。",
        "trigger": "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies",
        "features": "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "After agents return: 1. **Review each summary** - Understand what changed 2. **Check for conflicts** - Did agents edit same code? 3. **Run full suite** - Verify all fixes work together 4. **Spot check** - Agents can make systematic errors"
      }
    },
    {
      "name": "superpowers-executing-plans",
      "description": "Use when you have a written implementation plan to execute in a separate session with review checkpoints",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when you have a written implementation plan to execute in a separate session with review checkpoints。",
        "trigger": "Use when you have a written implementation plan to execute in a separate session with review checkpoints",
        "features": "Use when you have a written implementation plan to execute in a separate session with review checkpoints",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "Announce: \"I'm using the finishing-a-development-branch skill to complete this work.\"",
          "**REQUIRED SUB-SKILL:** Use superpowers:finishing-a-development-branch",
          "Follow that skill to verify tests, present options, execute choice",
          "Partner updates the plan based on your feedback",
          "Fundamental approach needs rethinking"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-finishing-a-development-branch",
      "description": "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup。",
        "trigger": "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup",
        "features": "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-receiving-code-review",
      "description": "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation。",
        "trigger": "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation",
        "features": "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-requesting-code-review",
      "description": "Use when completing tasks, implementing major features, or before merging to verify work meets requirements",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when completing tasks, implementing major features, or before merging to verify work meets requirements。",
        "trigger": "Use when completing tasks, implementing major features, or before merging to verify work meets requirements",
        "features": "Use when completing tasks, implementing major features, or before merging to verify work meets requirements",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-subagent-driven-development",
      "description": "Use when executing implementation plans with independent tasks in the current session",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when executing implementation plans with independent tasks in the current session。",
        "trigger": "Use when executing implementation plans with independent tasks in the current session",
        "features": "Use when executing implementation plans with independent tasks in the current session",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-systematic-debugging",
      "description": "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes。",
        "trigger": "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes",
        "features": "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "\"Quick fix for now, investigate later\"",
          "\"Just try changing X and see if it works\"",
          "\"Add multiple changes, run tests\"",
          "\"Skip the test, I'll manually verify\"",
          "\"It's probably X, let me fix that\""
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-test-driven-development",
      "description": "Use when implementing any feature or bugfix, before writing implementation code",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when implementing any feature or bugfix, before writing implementation code。",
        "trigger": "Use when implementing any feature or bugfix, before writing implementation code",
        "features": "Use when implementing any feature or bugfix, before writing implementation code",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-using-git-worktrees",
      "description": "Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback。",
        "trigger": "Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback",
        "features": "Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-using-superpowers",
      "description": "Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions。",
        "trigger": "Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions",
        "features": "Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-verification-before-completion",
      "description": "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always。",
        "trigger": "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always",
        "features": "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-writing-plans",
      "description": "Use when you have a spec or requirements for a multi-step task, before touching code",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when you have a spec or requirements for a multi-step task, before touching code。",
        "trigger": "Use when you have a spec or requirements for a multi-step task, before touching code",
        "features": "Use when you have a spec or requirements for a multi-step task, before touching code",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "superpowers-writing-skills",
      "description": "Use when creating new skills, editing existing skills, or verifying skills work before deployment",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "Use when creating new skills, editing existing skills, or verifying skills work before deployment。",
        "trigger": "Use when creating new skills, editing existing skills, or verifying skills work before deployment",
        "features": "Use when creating new skills, editing existing skills, or verifying skills work before deployment",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
      }
    },
    {
      "name": "xiaohongshu-architecture-ugc",
      "description": "小红书建筑学考研UGC获客方法论（已锁定）。当用户需要创作建筑考研类小红书笔记、设计引流钩子、撰写私信转化话术、规划选题排期时使用。覆盖5校（浙大/浙工大/浙农林/浙理工/浙大城院）×12大话题类型×120套公式套装×7维变异引擎×5套写作模板×4阶段转化SOP×封面设计×去AI味×活人感×Z世代口语词库×防过度做作校准。",
      "source": "Anthropic",
      "category": "其他",
      "dimensions": {
        "scenario": "小红书建筑学考研UGC获客方法论（已锁定）。",
        "trigger": "小红书建筑学考研UGC获客方法论（已锁定）。当用户需要创作建筑考研类小红书笔记、设计引流钩子、撰写私信转化话术、规划选题排期时使用",
        "features": "小红书建筑学考研UGC获客方法论（已锁定）。当用户需要创作建筑考研类小红书笔记、设计引流钩子、撰写私信转化话术、规划选题排期时使用。覆盖5校（浙大/浙工大/浙农林/浙理工/浙大城院）×12大话题类型×120套公式套装×7维变异引擎×5套写作模板×4阶段转化SOP×封面设计×去AI味×活人感×Z世代口语词库×防过度做作校准。",
        "solves": "提升效率，减少手动操作和查找文档的时间。",
        "steps": [
          "读取技能文档",
          "按文档执行操作",
          "输出结果"
        ],
        "tools": [
          "无特定外部依赖"
        ],
        "verification": "检查输出结果是否符合预期格式和内容要求。"
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
        ],
        "verification": "弹窗频率是否明显减少？建议的白名单是否真实命中高频操作？是否有误放危险命令？"
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
        ],
        "verification": "快捷键是否正确绑定？是否与已有快捷键冲突？用户按下组合键后是否触发预期功能？"
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
        ],
        "verification": "循环是否按设定间隔执行？是否能手动正常停止？执行结果是否符合预期？"
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
        ],
        "verification": "配置是否正确写入 JSON？新增权限是否生效？原有配置是否被误删？"
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
        ],
        "verification": "项目目录下是否生成了基础配置文件？git 仓库是否初始化成功？"
      }
    },
    {
      "name": "claude-api",
      "description": "构建、调试和优化 Claude API / Anthropic SDK 应用。覆盖 prompt caching、streaming、thinking、tool use、compaction、batch、files、citations、memory 等全部功能，以及模型版本迁移（4.5→4.6→4.7）。",
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
        ],
        "verification": "生成的代码能否直接运行？是否使用了 prompt caching？SDK 版本是否匹配项目语言？"
      }
    },
    {
      "name": "claude-api-csharp",
      "description": "使用官方 C# Anthropic SDK 构建 Claude API 应用。覆盖 dotnet 安装、客户端初始化、消息发送、流式响应、thinking、tool use、prompt caching、结构化输出、PDF 输入、Files API、effort 参数等功能。",
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
        ],
        "verification": "C# 代码能否 dotnet build 通过？Union 类型是否由 TryPick* 正确处理？"
      }
    },
    {
      "name": "claude-api-curl",
      "description": "使用原始 HTTP 请求（curl）调用 Claude API。覆盖 REST 端点、认证头、JSON 请求响应、SSE 流式事件、tool use 循环、prompt caching、extended thinking 等功能。",
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
        ],
        "verification": "curl 命令能否成功返回 200？响应体是否能用 jq 正确解析？headers 是否完整？"
      }
    },
    {
      "name": "claude-api-go",
      "description": "使用官方 Go Anthropic SDK 构建 Claude API 应用。覆盖 go get 安装、客户端初始化、消息发送、流式累积、tool use（Beta ToolRunner + jsonschema struct tags）、thinking、prompt caching 等功能。",
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
        ],
        "verification": "Go 代码能否 go build 通过？ToolRunner 是否正确处理工具调用循环？流式响应是否完整累积？"
      }
    },
    {
      "name": "claude-api-java",
      "description": "使用官方 Java Anthropic SDK 构建 Claude API 应用。覆盖 Maven/Gradle 安装、客户端初始化、消息发送、流式响应、thinking、tool use、prompt caching、结构化输出、PDF 输入、Files API 等功能。",
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
        ],
        "verification": "Java 代码能否 mvn/gradle 编译通过？Response 类型是否正确解析？异常是否被妥善处理？"
      }
    },
    {
      "name": "claude-api-php",
      "description": "使用官方 PHP Anthropic SDK 构建 Claude API 应用。覆盖 composer 安装、客户端初始化、消息发送、流式响应、thinking、tool use、prompt caching、结构化输出、PDF 输入、Files API 等功能。",
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
        ],
        "verification": "PHP 代码能否 composer install 后正常运行？Response 是否正确解析？异常处理是否到位？"
      }
    }
  ]
};
