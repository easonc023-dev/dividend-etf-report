# AGENTS.md — 515450红利低波ETF深度分析报告

## 项目概述
为南方标普红利低波50ETF（OTC 008163，场内 515450）生成每日更新的深度分析 HTML 静态报告。

## 核心命令
```
python generate_report.py    # 拉取数据+生成HTML报告（唯一需要的命令）
python deep_scan.py 515450   # 仅数据采集（不生成报告）
```

用户说"更新数据"/"更新一下最新数据" → 直接跑 `generate_report.py`。

## 文件说明
| 文件 | 用途 |
|------|------|
| `generate_report.py` | **主文件** — 数据拉取+计算+HTML渲染，一切都在这里 |
| `deep_scan.py` | 独立的数据采集脚本（generate_report.py 已包含其逻辑，可独立使用） |
| `auto_monitor.py` | 自动巡检脚本 |
| `auto_monitor.bat` | Windows任务计划程序用批处理 |
| `红利低波50ETF_515450_深度分析.html` | 输出的静态报告（每次覆盖写入） |

## 数据架构
```
akshare(新浪行情+基金季报持仓) + baostock(PE/PB/股息/行业分类)
    → generate_report.py（采集+加权计算+HTML渲染）
    → 红利低波50ETF_515450_深度分析.html（静态覆盖写入）
```

## 关键数据逻辑（修改时必须注意）

### 指数跟踪
515450 跟踪的是 **标普中国A股大盘红利低波50指数（S&P）**，不是中证931375。**成分股不可通过中证指数API获取**，只能用 `ak.fund_portfolio_hold_em` 取基金实际季报持仓。

### 股息率归属
按预案公告月份归属财报年度：
- 1-4月 → 前一年年报
- 5-12月 → 当年中期
- 仅取年报已完整公告的财年（不可用FY2025年报数据如果baostock尚未入库）

### PE/PB/股息率计算
**加权计算**，非简单平均：`sum(value × weight) / sum(weights)`

### 持仓数量
季报仅披露前10大重仓（实际约18只），半年报/年报才有完整50只（下次：2026年7月）。

### RSI计算
EMA方法：`ewm(alpha=1/period).mean()`，周线需先 `resample('W').last()` 再计算。

### 均线计算
`df['close'].tail(250).mean()` — 简单移动平均，数据按 date 升序排列后取 tail。

## 10项核心指标
1. 净值(NAV) — 新浪实时行情
2. 股息率 — baostock，加权
3. PE(TTM) — baostock，加权
4. PB(MRQ) — baostock，加权
5. RSI(6日) — EMA算法
6. RSI(7周) — 周线resample后EMA
7. 250日均线 — 偏离百分比
8. 550日均线 — 偏离百分比
9. 行业分布 — baostock行业分类
10. 成分股 — 基金季报持仓

## 技术指标UI规范（勿随意改动）

每个cell采用统一结构：
```
标签(tech-label, 24px bold)
    ↓
hint tag(rsi-hint, 12px) — 不用关注(safe灰) / 进入观察期(watch黄) / 进入买点(buy红)
    ↓
大数值(tech-num, 44px extra bold)
    ↓
偏离小字(tech-dev, 14px semibold)
    ↓
色条(gauge-wrap, margin-top:28px)
  ├─ ▼观察点 标签(top:-22px, 箭头对准刻度)
  ├─ gauge-bar(10px高, 渐变)
  ├─ gauge-mark obs(白粗线) + buy(白细线)
  ├─ gauge-dot(当前值圆点)
  └─ gauge-ticks(height:34px, margin-top:4px)
    ↓
图例(rsi-legend, margin-top:10px)
```

### 各指标参数

| 参数 | 6日RSI | 7周RSI | 250日均线 | 550日均线 |
|------|--------|--------|-----------|-----------|
| 观察点 | 25 | 40 | 0% | 0% |
| 买点 | 20/15/10/5 | 35/30/25/20/15/10/5 | -5/-10/-15/-20/-25% | 同左 |
| 大字内容 | RSI值 | RSI值 | 均线数值 | 均线数值 |
| 偏离描述 | RSI偏离 +x.x% | RSI偏离 +x.x% | 净值偏离 -x.xx% | 净值偏离 +x.xx% |
| 色条方向 | 红(超卖)→绿(超买) | 同左 | 绿(折价)→红(溢价) | 同左 |
| 色条标签 | ▼观察点 | ▼观察点 | ▼观察点 | ▼观察点 |

### 配色
- 绿 #0ea882（估值/正收益/高股息）
- 蓝 #3168d8（技术）
- 红 #d64555（风险/负收益）
- 背景 #f5f6f8，卡片 #fff
- RSI色条保留原8色渐变（不可做配色收敛）

### hint判断逻辑
```python
# RSI 6日
def rsi_hint_6d(rsi):
    if rsi >= 25: return ('safe', '不用关注')
    if rsi >= 20: return ('watch', '进入观察期')
    return ('buy', '进入买点')

# RSI 7周
def rsi_hint_7w(rsi):
    if rsi >= 40: return ('safe', '不用关注')
    if rsi >= 35: return ('watch', '进入观察期')
    return ('buy', '进入买点')

# 均线
def ma_hint(dev):
    if dev >= 0: return ('safe', '不用关注')
    if dev >= -5: return ('watch', '进入观察期')
    return ('buy', '进入买点')
```

## 自动更新
- Claude会话内：每个交易日下午4:07运行 generate_report.py（会话关闭即停）
- 永久方案：Windows任务计划程序 + auto_monitor.bat（用户尚未配置）
- 用户口头触发即可，无需定时任务也能保持数据新鲜

## 待办/已知限制
- baostock FY2025年报分红数据待入库（届时加权股息率会自动切换到FY2025）
- 2026年7月基金半年报发布后，持仓将从~18只扩展为完整50只
- 同类对比卡片目前为空（未实现）
