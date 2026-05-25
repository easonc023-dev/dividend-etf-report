/**
 * Skills Dashboard — 数据生成脚本
 * 扫描全局 + 项目技能目录，读取 SKILL.md，生成 skills-data.js
 * 用法：node generate-skills-data.js
 * 零依赖，纯 Node.js
 */

const fs = require('fs');
const path = require('path');

// ============ 配置 ============
const GLOBAL_SKILLS_DIR = path.join(process.env.USERPROFILE, '.claude', 'skills');
const PROJECT_SKILLS_DIR = path.join(__dirname, '..', '.claude', 'skills');
const OUTPUT_FILE = path.join(__dirname, 'skills-data.js');

// ============ 内置技能（硬编码，无 SKILL.md 源文件） ============
const BUILTIN_SKILLS = [
  {
    name: 'init',
    description: '初始化新项目。当用户说"初始化项目""创建新项目""setup"时触发。',
    source: '系统内置',
    category: '项目管理',
    dimensions: {
      scenario: '开始一个新项目时，快速搭建项目骨架和配置文件。',
      trigger: '用户说"初始化项目""新建项目""init""setup"',
      features: '自动检测项目类型、生成基础配置文件、初始化 git 仓库',
      solves: '省去手动创建配置文件的繁琐步骤，确保项目结构规范统一。',
      steps: ['检测当前目录状态', '确定项目类型', '生成配置模板', '初始化 git'],
      tools: ['git init', '模板文件生成']
    }
  },
  {
    name: 'review',
    description: 'PR 代码审查。当用户说"review""审查""code review"时触发。',
    source: '系统内置',
    category: '开发工具',
    dimensions: {
      scenario: '提交代码前或审查同事的 Pull Request 时，获得专业的代码审查意见。',
      trigger: '用户说"review""审查这个 PR""帮我 review 一下"',
      features: '检查代码逻辑、命名规范、潜在 bug、安全漏洞、性能问题',
      solves: '在合并前发现肉眼容易忽略的问题，提升代码质量。',
      steps: ['获取 PR diff', '逐文件审查', '标注问题等级', '给出修改建议'],
      tools: ['gh CLI', 'git diff']
    }
  },
  {
    name: 'security-review',
    description: '安全漏洞审查。当用户说"安全检查""安全审查""security audit"时触发。',
    source: '系统内置',
    category: '开发工具',
    dimensions: {
      scenario: '发布前或处理敏感数据时，排查代码中的安全风险。',
      trigger: '用户说"安全审查""安全检查""security review""有没有安全漏洞"',
      features: '检测 SQL 注入、XSS、密钥泄露、权限漏洞、依赖项漏洞',
      solves: '在代码上线前拦截常见安全漏洞，降低被攻击风险。',
      steps: ['扫描代码文件', '匹配漏洞模式', '评估风险等级', '给出修复方案'],
      tools: ['静态代码分析', '依赖项扫描']
    }
  },
  {
    name: 'simplify',
    description: '代码简化与优化。当用户说"简化""优化代码""simplify"时触发。',
    source: '系统内置',
    category: '开发工具',
    dimensions: {
      scenario: '代码写完后觉得冗余、不够优雅，想让它更简洁高效。',
      trigger: '用户说"简化一下""能不能更简洁""optimize"',
      features: '检查重复代码、冗余逻辑、过度抽象、可读性问题',
      solves: '减少代码量同时保持可读性，降低维护成本。',
      steps: ['读取代码文件', '识别优化点', '给出简化方案', '应用修改'],
      tools: ['AST 分析']
    }
  },
  {
    name: 'update-config',
    description: '修改 Claude Code 的 settings.json 配置。当用户说"改配置""更新设置""settings""添加权限""环境变量"时触发。',
    source: '系统内置',
    category: '系统配置',
    dimensions: {
      scenario: '需要修改 Claude Code 的行为设置、添加新权限、配置环境变量时。',
      trigger: '用户说"改配置""settings""添加 permission""配置环境变量""允许 X 命令"',
      features: '管理权限白名单、环境变量、hooks、系统行为开关',
      solves: '不用手动找到并编辑 JSON 文件，自然语言就能改配置。',
      steps: ['确认修改项', '读取当前配置', '合并新配置', '写入文件'],
      tools: ['settings.json', 'settings.local.json']
    }
  },
  {
    name: 'keybindings-help',
    description: '自定义键盘快捷键。当用户想修改快捷键、添加组合键时触发。',
    source: '系统内置',
    category: '系统配置',
    dimensions: {
      scenario: '觉得默认快捷键不顺手，想自定义一套适合自己的快捷键方案。',
      trigger: '用户说"快捷键""keybinding""改快捷键""绑定按键"',
      features: '查看当前快捷键、添加新快捷键、修改已有绑定',
      solves: '不用死记默认快捷键，按自己的习惯来。',
      steps: ['读取 keybindings.json', '理解用户意图', '生成新绑定', '写入配置'],
      tools: ['keybindings.json']
    }
  },
  {
    name: 'fewer-permission-prompts',
    description: '智能减少权限弹窗。分析使用习惯，自动建议权限白名单。',
    source: '系统内置',
    category: '系统配置',
    dimensions: {
      scenario: '频繁弹出权限确认窗口打断工作流，想批量设置信任规则。',
      trigger: '用户说"减少弹窗""少点确认""权限太多了""allow list"',
      features: '扫描历史记录，识别常用安全操作，批量添加到白名单',
      solves: '一次配置，后续同类操作不再反复弹窗确认。',
      steps: ['扫描操作历史', '识别高频安全命令', '生成白名单建议', '写入配置'],
      tools: ['settings.json']
    }
  },
  {
    name: 'loop',
    description: '定时循环执行指令。用户说"每 X 分钟执行 Y""定时""loop"时触发。',
    source: '系统内置',
    category: '系统配置',
    dimensions: {
      scenario: '需要定期检查某个状态（如 CI 结果、部署进度、数据更新）。',
      trigger: '用户说"每 5 分钟""定时""循环""loop""一直监控"',
      features: '设置间隔时间、指定执行指令、自动重复运行直到停止',
      solves: '不用手动反复输入同样的指令，自动轮询等待结果。',
      steps: ['确定执行间隔', '指定执行指令', '启动循环', '按需停止'],
      tools: ['Cron / Schedule Wakeup']
    }
  }
];

// ============ 技能详情补充表（启发式提取不足时使用） ============
const ENRICHMENTS = {
  'brand-guidelines': {
    scenario: '做 PPT、文档、网页时，希望统一用上 Anthropic 的专业品牌配色和字体。',
    trigger: '用户提到"品牌配色""品牌规范""Anthropic 风格""公司配色"',
    features: '提供 4 种主色 + 3 种强调色的完整调色板，2 套字体方案（Poppins + Lora），自动降级策略',
    solves: '不用自己配颜色、不用纠结字体搭配，一键获得专业视觉规范。',
    steps: ['选择配色方案', '选择字体方案', '应用到目标元素', '检查字体降级'],
    tools: ['色值表 (#141413 等)', '字体栈 (Poppins/Lora → Arial/Georgia)']
  },
  'theme-factory': {
    scenario: '在做 PPT、文档、网页时需要一套完整的配色+字体方案，不想自己从零搭配。',
    trigger: '用户提到"主题""theme""配色方案""字体搭配""换个风格"',
    features: '10 套预设主题（Ocean Depths, Sunset Boulevard 等），每套含色板+字体对，可自创主题',
    solves: '告别"不知道什么颜色配什么颜色"的困扰，10秒选定一套专业方案。',
    steps: ['展示主题预览', '用户选择主题', '读取主题配置', '应用到目标文件'],
    tools: ['theme-showcase.pdf', 'themes/ 目录下的主题配置']
  },
  'frontend-design': {
    scenario: '需要做网页、落地页、Dashboard、UI 组件时，想做出不千篇一律的设计。',
    trigger: '用户提到"做网页""前端""UI""landing page""Dashboard""网站"',
    features: '独特字体选择、大胆配色、非对称布局、微动效、氛围背景纹理',
    solves: '告别 AI 味十足的紫渐变白底+Inter 字体，做出让人眼前一亮的前端作品。',
    steps: ['理解设计目标', '确定美学方向', '选择字体配色', '实现 HTML/CSS', '打磨细节动效'],
    tools: ['HTML/CSS/JS', 'React/Vue (按需)', 'CSS 动画']
  },
  'algorithmic-art': {
    scenario: '想用代码生成独一无二的艺术作品，探索生成式算法美学。',
    trigger: '用户提到"生成艺术""algorithmic art""p5.js""粒子系统""流场"',
    features: '两步工作流：先写算法哲学宣言 → 再转 p5.js 交互作品，支持种子随机和参数探索',
    solves: '不会写生成式艺术代码？技能帮你把美学理念翻译成 p5.js 算法。',
    steps: ['撰写算法哲学 ( manifesto )', '设计 p5.js 生成逻辑', '实现交互参数面板', '输出 HTML+JS 文件'],
    tools: ['p5.js', '种子随机函数', '参数面板']
  },
  'canvas-design': {
    scenario: '需要做海报、视觉设计、静态艺术作品，输出 PNG 或 PDF。',
    trigger: '用户提到"海报""poster""设计图""视觉设计""静态作品"',
    features: '设计哲学→视觉表达两步法，输出 PNG/PDF，强调原创性',
    solves: '没有设计基础也能产出有美学理念支撑的视觉作品，而不是随便拼凑。',
    steps: ['创建设计哲学', '确定视觉语言', '在画布上实现', '导出 PNG/PDF'],
    tools: ['HTML Canvas', 'Python Pillow', '设计模板']
  },
  'pptx': {
    scenario: '需要创建、编辑、合并 PPT 文件，做演示文稿或提案。',
    trigger: '用户提到"PPT""幻灯片""slide""deck""presentation""pptx"',
    features: '创建新 PPT、编辑已有 PPT、合并拆分、模板布局、演讲者备注、评论管理',
    solves: '不用开 PowerPoint 逐页手动做，AI 直接生成结构完整、排版美观的 PPT 文件。',
    steps: ['分析内容结构', '选择主题模板', '逐页生成内容', '调整布局细节'],
    tools: ['python-pptx', 'HTML→PPTX 转换', '模板文件']
  },
  'pdf': {
    scenario: '处理任何 PDF 相关操作：读取、合并、拆分、水印、表单、OCR。',
    trigger: '用户提到".pdf""PDF""合并 PDF""拆分 PDF""OCR""加水印"',
    features: '读取/提取文本表格、合并/拆分 PDF、旋转页面、水印、加密/解密、OCR 识别',
    solves: '一个技能覆盖所有 PDF 操作，不用装多个工具。',
    steps: ['确定操作类型', '读取相关文件', '执行操作', '验证输出'],
    tools: ['pypdf', 'pdfplumber', 'OCR 引擎', '加密库']
  },
  'claude-api': {
    scenario: '用代码调用 Claude API，需要正确使用 SDK、prompt caching、tool use 等高级功能。',
    trigger: '代码中 import anthropic SDK，或用户问"Claude API""Anthropic SDK""prompt caching""tool use"',
    features: '自动检测项目语言→调度对应语言 SDK 文档，覆盖 caching / thinking / tool use / compaction / 文件 API',
    solves: '不用翻官方文档，技能直接告诉你当前语言的最佳实践和完整代码示例。',
    steps: ['检测项目语言', '读取对应语言文档', '检查 caching 机会', '生成 SDK 代码'],
    tools: ['各语言 SDK', 'Models API', 'Files API', 'Beta features']
  },
  'claude-api-curl': {
    scenario: '想用 shell 脚本或 curl 直接调 Claude API，不引入任何 SDK 依赖。',
    trigger: '用户写 curl 命令调 Claude API，或在 bash/zsh 脚本中调用 Anthropic API',
    features: '完整的 REST API 调用示例：消息、流式、工具调用、caching、thinking、所有必需 headers',
    solves: '最快验证 API 的方式——一行 curl 就能跑通，不用配 SDK 环境。',
    steps: ['设置 API key 环境变量', '构造 JSON 请求体', '发送 curl 请求', '用 jq 解析响应'],
    tools: ['curl', 'jq', 'Anthropic REST API']
  },
  'claude-api-go': {
    scenario: '用 Go 语言开发调用 Claude API 的应用或 Agent 系统。',
    trigger: '.go 文件 import anthropic-sdk-go，用户问"Go SDK""Claude Go""golang Claude"',
    features: 'Go SDK 全功能：Messages、Streaming、Tool Runner (Beta)、Thinking、Caching、Files API',
    solves: 'Go 的 Tool Runner 自动管理 Agent 工具调用循环，RunToCompletion() 一行搞定。',
    steps: ['go get SDK', '初始化 Client', '定义 Tools', 'Run ToolRunner', '处理结果'],
    tools: ['anthropic-sdk-go', 'ToolRunner', 'jsonschema struct tags']
  },
  'claude-api-java': {
    scenario: '用 Java 开发企业级应用，需要集成 Claude API。',
    trigger: '.java 文件 import com.anthropic.*，用户问"Java SDK""Claude Java"',
    features: 'Java SDK：Messages、Streaming、Tool Use、Thinking、Caching、Files API',
    solves: '企业后端直接集成 Claude，不用再搭一层 Python/Node 中转。',
    steps: ['Maven/Gradle 加依赖', '初始化 Client', '构造 Message 请求', '处理 Response'],
    tools: ['Maven/Gradle', 'Anthropic Java SDK']
  },
  'claude-api-csharp': {
    scenario: '用 C# / .NET 开发，需要调用 Claude API。',
    trigger: '.cs 文件 import Anthropic SDK，用户问"C# SDK""Claude .NET""dotnet Claude"',
    features: 'C# SDK：Messages、Streaming、Tool Use、Thinking、Caching、Files API、Effort 参数',
    solves: '.NET 生态直接集成 Claude，支持 Microsoft.Extensions.AI IChatClient 集成。',
    steps: ['dotnet add package', '初始化 AnthropicClient', '构造请求参数', '处理响应 union 类型'],
    tools: ['NuGet Anthropic 包', 'AnthropicClient', 'Union 类型 TryPick* 方法']
  },
  'claude-api-php': {
    scenario: '用 PHP 开发 Web 应用，需要接入 Claude API。',
    trigger: '.php 文件 use Anthropic\\*，用户问"PHP SDK""Claude PHP"',
    features: 'PHP SDK：Messages、Streaming、Tool Use、Thinking、Caching',
    solves: '快速在 PHP Web 项目中接入 Claude，做轻量 API 代理层。',
    steps: ['composer require', '初始化 Client', '构造请求', '处理响应'],
    tools: ['Composer', 'Anthropic PHP SDK']
  },
  'mcp-builder': {
    scenario: '需要创建一个 MCP 服务器，让 LLM 能通过标准化接口调用外部服务。',
    trigger: '用户说"创建 MCP""MCP server""模型上下文协议""FastMCP""MCP SDK"',
    features: 'Python (FastMCP) 和 Node/TypeScript (MCP SDK) 两种实现方式，完整工具定义、资源管理',
    solves: '不用从零学习 MCP 协议规范，技能提供经过验证的实现模式和最佳实践。',
    steps: ['选择语言（Python/Node）', '定义 Tools 接口', '实现业务逻辑', '测试 MCP 连接'],
    tools: ['FastMCP (Python)', 'MCP SDK (Node/TypeScript)', 'Claude Desktop 配置']
  },
  'skill-creator': {
    scenario: '想要创建、优化或评估一个 Skill，让它更精准地触发和更好地完成任务。',
    trigger: '用户说"创建 skill""优化技能""skill 评测""写个技能"',
    features: '完整工作流：写草稿→创建 eval 用例→运行测试→盲评对比→分析改进→迭代优化',
    solves: '从"凭感觉写技能"升级到"有数据验证的技能工程"，确保技能真的有用。',
    steps: ['定义技能目标', '写 SKILL.md 草稿', '创建 evals 测试', '运行 grading', '分析结果迭代'],
    tools: ['run_eval.py', 'grading agent', 'analyzer agent', 'comparator agent']
  },
  'xiaohongshu-architecture-ugc': {
    scenario: '运营小红书建筑考研 UGC 内容账号，需要批量化、多样化地产出内容。',
    trigger: '用户提到"小红书""建筑考研""UGC""内容营销""笔记"',
    features: '5 所学校 × 12 种选题 × 120 套公式 × 7 维变量引擎 × 5 种写作模板 × 4 阶段转化 SOP',
    solves: '不用每天绞尽脑汁想选题写文案，系统化批量产出有人味、不 AI 感的小红书内容。',
    steps: ['确定选题类型', '选取变量组合', '套用写作模板', '执行反 AI 话术检查', '输出排版好的笔记'],
    tools: ['120 套公式集', '7 维变量引擎', '5 种写作模板', 'Z 世代俚语手册', '反 AI 语调检测']
  }
};

// Lark 技能通用补充（结构高度一致，批量处理）
const LARK_SKILLS_MAP = {
  'lark-shared': { category: '飞书基础', scenario: '使用任何飞书功能前，进行认证、权限配置和环境初始化。', tools: ['lark-cli'] },
  'lark-contact': { category: '飞书通讯', scenario: '管理飞书通讯录：搜索用户/部门、查看联系人信息。', tools: ['lark-cli'] },
  'lark-im': { category: '飞书通讯', scenario: '收发飞书消息、管理群聊、搜索聊天记录、下载文件。', tools: ['lark-cli'] },
  'lark-calendar': { category: '飞书日程', scenario: '管理日历和日程：创建/搜索日程、预定会议室、查询忙闲。', tools: ['lark-cli'] },
  'lark-doc': { category: '飞书文档', scenario: '创建和编辑飞书云文档，支持 XML 和 Markdown 格式。', tools: ['lark-cli'] },
  'lark-wiki': { category: '飞书文档', scenario: '管理飞书知识库（Wiki）：创建/搜索/编辑知识空间和条目。', tools: ['lark-cli'] },
  'lark-minutes': { category: '飞书文档', scenario: '管理飞书会议纪要（Minutes）。', tools: ['lark-cli'] },
  'lark-markdown': { category: '飞书文档', scenario: '飞书 Markdown 内容处理与转换。', tools: ['lark-cli'] },
  'lark-whiteboard': { category: '飞书文档', scenario: '创建和管理飞书白板。', tools: ['lark-cli'] },
  'lark-base': { category: '飞书表格', scenario: '操作飞书多维表格：建表、字段管理、记录读写、视图配置、公式字段。', tools: ['lark-cli'] },
  'lark-sheets': { category: '飞书表格', scenario: '操作飞书电子表格。', tools: ['lark-cli'] },
  'lark-slides': { category: '飞书表格', scenario: '创建和管理飞书幻灯片。', tools: ['lark-cli'] },
  'lark-drive': { category: '飞书文件', scenario: '管理飞书云盘：上传/下载文件、搜索文件、管理目录。', tools: ['lark-cli'] },
  'lark-mail': { category: '飞书通讯', scenario: '使用飞书邮箱收发邮件。', tools: ['lark-cli'] },
  'lark-vc': { category: '飞书通讯', scenario: '飞书视频会议：搜索会议记录、查询会议详情。', tools: ['lark-cli'] },
  'lark-task': { category: '飞书协作', scenario: '管理飞书任务（Task）：创建/分配/追踪任务。', tools: ['lark-cli'] },
  'lark-okr': { category: '飞书协作', scenario: '管理飞书 OKR 目标和关键结果。', tools: ['lark-cli'] },
  'lark-approval': { category: '飞书协作', scenario: '飞书审批：管理审批实例和审批任务。', tools: ['lark-cli'] },
  'lark-attendance': { category: '飞书协作', scenario: '飞书考勤打卡：查询考勤记录。', tools: ['lark-cli'] },
  'lark-event': { category: '飞书基础', scenario: '飞书事件订阅：监听飞书开放平台事件。', tools: ['lark-cli'] },
  'lark-openapi-explorer': { category: '飞书工具', scenario: '浏览和调试飞书开放平台 OpenAPI。', tools: ['lark-cli'] },
  'lark-skill-maker': { category: '飞书工具', scenario: '飞书技能生成器：快速创建飞书相关技能。', tools: ['lark-cli'] },
  'lark-workflow-meeting-summary': { category: '飞书工作流', scenario: '自动生成飞书会议总结。', tools: ['lark-cli'] },
  'lark-workflow-standup-report': { category: '飞书工作流', scenario: '自动生成飞书每日站会报告。', tools: ['lark-cli'] }
};

// ============ 辅助函数 ============

/** 解析 YAML frontmatter */
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  for (const line of lines) {
    const kvMatch = line.match(/^(\w[\w-]*)\s*:\s*(.+)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      fm[currentKey] = kvMatch[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return fm;
}

/** 读取正文（frontmatter 之后的内容） */
function getBody(content) {
  const parts = content.split(/^---\s*$/m);
  if (parts.length >= 3) return parts.slice(2).join('---').trim();
  return content.trim();
}

/** 从正文中提取标题段落 */
function extractSections(body) {
  const sections = {};
  let currentHeading = '_intro';
  const lines = body.split('\n');
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    if (h2) {
      currentHeading = h2[1].toLowerCase();
      sections[currentHeading] = sections[currentHeading] || '';
    } else if (h3) {
      currentHeading = h3[1].toLowerCase();
      sections[currentHeading] = sections[currentHeading] || '';
    } else if (line.trim()) {
      sections[currentHeading] = (sections[currentHeading] || '') + line.trim() + ' ';
    }
  }
  return sections;
}

/** 从正文提取列表项 */
function extractListItems(body, heading) {
  const lines = body.split('\n');
  let inTarget = false;
  const items = [];
  for (const line of lines) {
    if (line.match(/^##\s+(.+)/)) {
      inTarget = line.match(new RegExp(heading, 'i')) !== null;
      continue;
    }
    if (inTarget) {
      const li = line.match(/^-\s+(.+)/);
      if (li) items.push(li[1].trim());
      if (line.match(/^##\s+/) || line.match(/^#\s+/)) break;
    }
  }
  return items;
}

/** 从描述中提取触发条件 */
function extractTrigger(description) {
  const triggerMatch = description.match(/TRIGGER\s*(?:when)?\s*:?\s*(.+?)(?:\.\s*SKIP|$)/i);
  if (triggerMatch) return triggerMatch[1].trim();
  // 取前两句
  const sentences = description.split(/[。.]/);
  return sentences.slice(0, 2).join('。').trim();
}

/** 从描述中提取核心功能 */
function extractFeatures(description) {
  return description.replace(/\bTRIGGER\b.*$/i, '').replace(/\bSKIP\b.*$/i, '').trim();
}

/** 判断技能分类 */
function categorize(name, fm) {
  const d = name.toLowerCase();
  if (d.startsWith('lark-')) {
    return LARK_SKILLS_MAP[name]?.category || '飞书协作';
  }
  if (d.startsWith('claude-api')) return 'API 开发';
  const designSet = ['brand-guidelines', 'theme-factory', 'frontend-design', 'algorithmic-art', 'canvas-design'];
  const contentSet = ['pptx', 'pdf'];
  const toolSet = ['skill-creator', 'mcp-builder', 'karpathy-guidelines'];
  const customSet = ['export-to-docx', 'xiaohongshu-architecture-ugc'];
  if (designSet.includes(name)) return '创意设计';
  if (contentSet.includes(name)) return '内容创作';
  if (toolSet.includes(name)) return '开发工具';
  if (customSet.includes(name)) return '用户自定义';
  return '其他';
}

/** 判断来源 */
function getSource(name) {
  if (name.startsWith('lark-')) return '飞书';
  if (name === 'export-to-docx' || name === 'xiaohongshu-architecture-ugc') return '自定义';
  if (name === 'karpathy-guidelines') return '第三方';
  return 'Anthropic';
}

/** 为 Lark 技能生成通用执行步骤 */
function larkSteps(name) {
  const base = ['读取 lark-shared 认证配置'];
  if (name.includes('create') || name.includes('search')) base.push('构造查询参数');
  base.push('执行 lark-cli 命令', '格式化返回结果');
  return base;
}

// ============ 主流程 ============

function scanSkills(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(d => {
    const full = path.join(dir, d);
    if (!fs.statSync(full).isDirectory()) return false;
    return fs.existsSync(path.join(full, 'SKILL.md'));
  });
}

function parseSkill(dir, name) {
  const skillMdPath = path.join(dir, name, 'SKILL.md');
  const content = fs.readFileSync(skillMdPath, 'utf-8');
  const fm = parseFrontmatter(content);
  const body = getBody(content);
  const sections = extractSections(body);

  return { name, fm, body, sections };
}

function buildSkillData(raw) {
  const { name, fm, body, sections } = raw;
  const description = fm.description || '';
  const source = getSource(name);
  const category = categorize(name, fm);

  // 检查是否有硬编码补充
  const enrichment = ENRICHMENTS[name] || null;
  const larkInfo = LARK_SKILLS_MAP[name] || null;

  // 提取触发条件
  let trigger = extractTrigger(description);
  if (enrichment?.trigger) trigger = enrichment.trigger;
  else if (larkInfo) trigger = description.split('。')[0] + '。';

  // 提取应用场景
  let scenario = enrichment?.scenario || '';
  if (!scenario && larkInfo) scenario = larkInfo.scenario;
  if (!scenario) scenario = description.replace(/\bTRIGGER\b.*$/i, '').replace(/\bSKIP\b.*$/i, '').trim().split('。')[0] + '。';

  // 提取核心功能
  let features = enrichment?.features || extractFeatures(description);
  if (larkInfo && !enrichment) features = description;

  // 提取解决的问题
  let solves = enrichment?.solves || '';
  if (!solves) solves = '提升效率，减少手动操作和查找文档的时间。';

  // 提取执行步骤
  let steps = enrichment?.steps || [];
  if (steps.length === 0) {
    const stepSection = sections['执行步骤'] || sections['execution steps'] || sections['process'] || '';
    if (stepSection) {
      steps = stepSection.split(/[。.]/).filter(s => s.trim()).slice(0, 5).map(s => s.trim());
    } else if (larkInfo) {
      steps = larkSteps(name);
    } else {
      const listItems = extractListItems(body, 'step|步骤|流程|process');
      if (listItems.length > 0) steps = listItems.slice(0, 5);
    }
  }

  // 提取涉及工具
  let tools = enrichment?.tools || larkInfo?.tools ? [larkInfo?.tools || ''].filter(Boolean) : [];
  if (tools.length === 0) {
    const toolSection = sections['涉及工具'] || sections['tools'] || sections['scripts'] || '';
    if (toolSection) {
      tools = toolSection.match(/`[^`]+`/g)?.map(t => t.replace(/`/g, '')) || [];
    }
    if (fm.metadata?.requires?.bins) {
      try {
        const bins = JSON.parse(fm.metadata.requires.replace(/'/g, '"')).bins || [];
        tools = [...tools, ...bins];
      } catch (e) { /* ignore */ }
    }
    if (tools.length === 0) tools = ['无特定外部依赖'];
  }

  // 清理：确保 steps 和 tools 是清理过的数组
  steps = steps.filter(s => s && s.trim()).slice(0, 5).map(s => s.trim().replace(/^[-\s]+/, ''));
  tools = [...new Set(tools)].filter(Boolean).slice(0, 5);

  return {
    name,
    description,
    source,
    category,
    dimensions: {
      scenario: scenario || '使用该技能完成特定任务。',
      trigger: trigger || description.split('。')[0] + '。',
      features: features || description,
      solves: solves || '自动化处理，提高工作效率。',
      steps: steps.length > 0 ? steps : ['读取技能文档', '按文档执行操作', '输出结果'],
      tools: tools.length > 0 ? tools : ['无需特定外部工具']
    }
  };
}

// ============ 执行 ============

console.log('🔍 扫描技能目录...\n');

const globalSkillNames = scanSkills(GLOBAL_SKILLS_DIR);
const projectSkillNames = scanSkills(PROJECT_SKILLS_DIR);

console.log(`全局技能: ${globalSkillNames.length} 个`);
console.log(`项目技能: ${projectSkillNames.length} 个`);

const allSkills = [];

// 处理全局技能
for (const name of globalSkillNames) {
  try {
    const raw = parseSkill(GLOBAL_SKILLS_DIR, name);
    const data = buildSkillData(raw);
    allSkills.push(data);
    console.log(`  ✅ ${name}`);
  } catch (err) {
    console.log(`  ⚠️ ${name} — 解析失败: ${err.message}`);
    // 回退：仅使用 frontmatter 描述
    try {
      const skillMdPath = path.join(GLOBAL_SKILLS_DIR, name, 'SKILL.md');
      const content = fs.readFileSync(skillMdPath, 'utf-8');
      const fm = parseFrontmatter(content);
      if (fm.name) {
        allSkills.push({
          name: fm.name || name,
          description: fm.description || '',
          source: getSource(name),
          category: categorize(name, fm),
          dimensions: {
            scenario: fm.description || '',
            trigger: fm.description || '',
            features: fm.description || '',
            solves: '自动化处理，提高工作效率。',
            steps: ['读取技能文档', '按文档执行操作', '输出结果'],
            tools: ['无特定外部依赖']
          }
        });
      }
    } catch (e2) {
      console.log(`  ❌ ${name} — 完全无法解析，跳过`);
    }
  }
}

// 处理项目技能
for (const name of projectSkillNames) {
  try {
    const raw = parseSkill(PROJECT_SKILLS_DIR, name);
    const data = buildSkillData(raw);
    data.source = '项目级';
    allSkills.push(data);
    console.log(`  ✅ [项目] ${name}`);
  } catch (err) {
    console.log(`  ⚠️ [项目] ${name} — 解析失败: ${err.message}`);
  }
}

// 合并内置技能
for (const builtin of BUILTIN_SKILLS) {
  allSkills.push(builtin);
}

// 统计
const categories = [...new Set(allSkills.map(s => s.category))];
const sources = [...new Set(allSkills.map(s => s.source))];

console.log(`\n📊 总计: ${allSkills.length} 个技能`);
console.log(`📂 分类: ${categories.join(', ')}`);
console.log(`🏷️ 来源: ${sources.join(', ')}`);

// 生成 skills-data.js
const outputData = {
  generatedAt: new Date().toISOString(),
  totals: {
    all: allSkills.length,
    global: globalSkillNames.length,
    project: projectSkillNames.length,
    builtin: BUILTIN_SKILLS.length
  },
  categories: categories.sort(),
  sources: sources.sort(),
  skills: allSkills.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  })
};

const jsContent = `// 自动生成于 ${new Date().toLocaleString('zh-CN')}
// 运行 node generate-skills-data.js 重新生成
// 请勿手动编辑此文件
window.__SKILLS_DATA__ = ${JSON.stringify(outputData, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf-8');
console.log(`\n✨ 数据文件已生成: ${OUTPUT_FILE}`);
console.log(`   (${(jsContent.length / 1024).toFixed(1)} KB)`);
