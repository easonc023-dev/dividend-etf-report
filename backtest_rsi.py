#!/usr/bin/env python
"""RSI 参数回测 — 含分红总回报口径
比较日线 RSI(6/14/21) × 观察点(15/20/25/30/35)
     周线 RSI(7/14)    × 观察点(30/35/40/45/50)
信号规则 A：首次跌破观察点触发，RSI 回升至 obs+5 以上才重新激活
"""
import sys, os, time, traceback, json
from datetime import datetime, timedelta
from collections import defaultdict
import numpy as np
import pandas as pd
import akshare as ak

sys.stdout.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# 产品配置（直接定义，避免导入 generate_report 触发其主流程）
PRODUCTS = [
    {'code': '021961', 'name': '景顺长城中证国新港股通央企红利ETF联接A', 'tab': '国新红利'},
    {'code': '021881', 'name': '鑫元华证沪深港红利50指数A', 'tab': '沪深港红利50'},
    {'code': '020866', 'name': '华安恒生港股通中国央企红利ETF联接A', 'tab': '港股通央企红利'},
    {'code': '016185', 'name': '广发电力公用事业ETF联接A', 'tab': '电力公用事业'},
    {'code': '009051', 'name': '易方达中证红利ETF联接A', 'tab': '中证红利'},
    {'code': '501059', 'name': '西部利得国企红利指数增强A', 'tab': '国企红利'},
    {'code': '014771', 'name': '中泰红利优选一年持有期混合', 'tab': '中泰红利优选'},
    {'code': '020602', 'name': '易方达红利低波ETF联接A', 'tab': '红利低波(易方达)'},
    {'code': '021550', 'name': '博时中证红利低波动100ETF联接A', 'tab': '红利低波100'},
    {'code': '012708', 'name': '东方红中证东方红红利低波动指数A', 'tab': '东证红利低波'},
    {'code': '515450', 'name': '红利低波50ETF南方', 'tab': '红利低波50'},
]

# ═══════════════════════════════════════════════════════════════
# 参数矩阵
# ═══════════════════════════════════════════════════════════════
DAILY_PERIODS = [6, 14, 21]
DAILY_OBS     = [15, 20, 25, 30, 35]  # 观察点

WEEKLY_PERIODS = [7, 14]
WEEKLY_OBS     = [30, 35, 40, 45, 50]

FORWARD_HORIZONS = [5, 10, 20, 60, 120, 250, 550]  # 交易日

# ═══════════════════════════════════════════════════════════════
# 数据获取（统一口径：累计净值 = 含分红总回报）
# ═══════════════════════════════════════════════════════════════

def get_cumulative_nav(code):
    """获取累计净值走势（含分红再投资），适用于所有产品类型。
    返回 DataFrame，列: date, close
    """
    df = ak.fund_open_fund_info_em(symbol=code, indicator='累计净值走势', period='成立以来')
    if df is None or df.empty:
        return None
    # 累计净值走势返回 2 列: ['净值日期', '累计净值']
    df.columns = ['date', 'cum_nav']
    df['date'] = pd.to_datetime(df['date'])
    df['cum_nav'] = pd.to_numeric(df['cum_nav'])
    df = df.sort_values('date')
    df['close'] = df['cum_nav']
    return df

# ═══════════════════════════════════════════════════════════════
# RSI 计算
# ═══════════════════════════════════════════════════════════════

def calc_rsi_series(close_series, period):
    """Wilder 平滑 RSI，返回完整 Series"""
    delta = close_series.diff()
    gain = delta.clip(lower=0)
    loss = (-delta).clip(lower=0)
    avg_gain = gain.ewm(alpha=1/period, min_periods=period).mean()
    avg_loss = loss.ewm(alpha=1/period, min_periods=period).mean()
    rs = avg_gain / avg_loss
    return 100 - 100 / (1 + rs)

# ═══════════════════════════════════════════════════════════════
# 信号生成（规则 A）
# ═══════════════════════════════════════════════════════════════

def generate_signals(rsi_series, obs_point):
    """规则 A：首次跌破观察点触发，RSI > obs+5 才重新激活。
    返回信号日期列表（rsi_series.index 值）。
    如果 RSI 首日已在线下，不触发（不知道何时跌破的）。
    """
    signals = []
    reset_point = obs_point + 5
    armed = bool(rsi_series.iloc[0] >= obs_point)

    for i in range(1, len(rsi_series)):
        rsi_val = rsi_series.iloc[i]
        if armed and rsi_val < obs_point:
            signals.append(rsi_series.index[i])
            armed = False
        elif not armed and rsi_val > reset_point:
            armed = True
    return signals

def days_below_obs(rsi_series, obs_point):
    """统计 RSI 在线下的持续天数（用于计算窗口均长）"""
    intervals = []
    in_below = False
    start = None
    for i in range(len(rsi_series)):
        if not in_below and rsi_series.iloc[i] < obs_point:
            in_below = True
            start = rsi_series.index[i]
        elif in_below and rsi_series.iloc[i] >= obs_point:
            days = (rsi_series.index[i] - start).days
            intervals.append(days)
            in_below = False
    return intervals

# ═══════════════════════════════════════════════════════════════
# 前向收益计算
# ═══════════════════════════════════════════════════════════════

def calc_forward_return(close_series, signal_date, horizon_days):
    """从信号日到 N 个交易日后的收益率（含分红）"""
    idx = close_series.index.get_loc(signal_date)
    target_idx = idx + horizon_days
    if target_idx >= len(close_series):
        return None
    p0 = close_series.iloc[idx]
    p1 = close_series.iloc[target_idx]
    if p0 <= 0:
        return None
    return float((p1 / p0 - 1) * 100)

# ═══════════════════════════════════════════════════════════════
# 主回测逻辑
# ═══════════════════════════════════════════════════════════════

def run_backtest():
    today_str = datetime.now().strftime('%Y-%m-%d')
    print(f"RSI 参数回测 — {today_str}")
    print(f"{'='*60}")

    # 构建参数组合
    combos = []
    for period in DAILY_PERIODS:
        for obs in DAILY_OBS:
            combos.append({'label': f'RSI{period}日 / 观察点{obs}', 'period': period,
                          'obs': obs, 'type': 'daily'})
    for period in WEEKLY_PERIODS:
        for obs in WEEKLY_OBS:
            combos.append({'label': f'RSI{period}周 / 观察点{obs}', 'period': period,
                          'obs': obs, 'type': 'weekly'})

    all_results = []       # 每个 combo 的汇总
    all_signals_detail = []  # 每个信号的明细

    for pi, p in enumerate(PRODUCTS):
        code = p['code']
        name = p['name']
        tab = p['tab']

        print(f"\n[{pi+1}/{len(PRODUCTS)}] {tab} ({code})")

        # -- 拉取累计净值（统一口径，含分红） --
        try:
            df = get_cumulative_nav(code)
            if df is None:
                print(f"  ✗ 累计净值获取失败，跳过")
                continue
        except Exception as e:
            print(f"  ✗ 数据获取异常: {e}")
            continue

        close = df.set_index('date')['close']
        data_years = (close.index[-1] - close.index[0]).days / 365.25
        print(f"  ✓ 累计净值  {len(close)}天  {data_years:.1f}年")

        # 周线
        weekly_close = close.resample('W').last().dropna()

        for combo in combos:
            period = combo['period']
            obs = combo['obs']
            combo_type = combo['type']

            if combo_type == 'daily':
                # 日线 RSI
                rsi_series = calc_rsi_series(close, period).dropna()
                if len(rsi_series) < period * 2:
                    continue
                signals = generate_signals(rsi_series, obs)
                below_intervals = days_below_obs(rsi_series, obs)
                # 信号日期是交易日，直接用 close
                signal_close = close
            else:
                # 周线 RSI
                if len(weekly_close) < period * 2:
                    continue
                rsi_weekly = calc_rsi_series(weekly_close, period).dropna()
                signals_weekly = generate_signals(rsi_weekly, obs)
                # 周线信号日期映射到日线：取该周最后一天
                signals = []
                for wdate in signals_weekly:
                    # wdate 是该周周日，取该周最后一个有数据的交易日
                    week_start = wdate - timedelta(days=6)
                    mask = (close.index >= week_start) & (close.index <= wdate)
                    week_days = close.index[mask]
                    if len(week_days) > 0:
                        signals.append(week_days[-1])
                below_intervals_weekly = days_below_obs(rsi_weekly, obs)
                # 窗口天数 × 7 转成自然日（近似）
                below_intervals = [d * 7 for d in below_intervals_weekly]
                signal_close = close

            # 前向收益
            fwd = {h: [] for h in FORWARD_HORIZONS}
            for sdate in signals:
                for h in FORWARD_HORIZONS:
                    ret = calc_forward_return(signal_close, sdate, h)
                    if ret is not None:
                        fwd[h].append(ret)
                        all_signals_detail.append({
                            'product': tab, 'code': code,
                            'period': period, 'obs': obs, 'type': combo_type,
                            'signal_date': sdate.strftime('%Y-%m-%d'),
                            'horizon': h, 'return': round(ret, 2),
                            'years': round(data_years, 1),
                        })

            # 汇总
            total_signals = len(signals)
            avg_signals_per_year = total_signals / data_years if data_years > 0 else 0
            avg_window = (sum(below_intervals) / len(below_intervals) if below_intervals else 0)

            sig_counts = [len(fwd[h]) for h in FORWARD_HORIZONS]
            min_sig = min(sig_counts) if sig_counts else 0
            if min_sig < 3:
                confidence = 'low'
            elif min_sig < 10:
                confidence = 'mid'
            else:
                confidence = 'high'

            row = {
                'product': tab, 'code': code, 'years': round(data_years, 1),
                'period': period, 'obs': obs, 'type': combo_type,
                'label': combo['label'],
                'signals': total_signals,
                'sig_per_year': round(avg_signals_per_year, 2),
                'avg_window_days': round(avg_window, 1),
                'confidence': confidence,
            }
            for h in FORWARD_HORIZONS:
                rets = fwd[h]
                if len(rets) >= 3:
                    row[f'ret{h}d_mean'] = round(float(np.mean(rets)), 2)
                    row[f'ret{h}d_median'] = round(float(np.median(rets)), 2)
                    row[f'ret{h}d_std'] = round(float(np.std(rets)), 2)
                    row[f'ret{h}d_winrate'] = round(
                        sum(1 for r in rets if r > 0) / len(rets) * 100, 1)
                    row[f'ret{h}d_worst'] = round(float(np.min(rets)), 2)
                    row[f'ret{h}d_n'] = len(rets)
                else:
                    row[f'ret{h}d_mean'] = None
                    row[f'ret{h}d_winrate'] = None
                    row[f'ret{h}d_n'] = len(rets)
            all_results.append(row)

    if not all_results:
        print("\n无回测结果，退出")
        return

    # ═══════════════════════════════════════════════════════════
    # 跨产品聚合
    # ═══════════════════════════════════════════════════════════
    df = pd.DataFrame(all_results)

    # 按 combo 聚合（等权平均）
    agg_rows = []
    for label, grp in df.groupby('label'):
        combo_info = grp.iloc[0]
        n_products = len(grp)
        total_signals = int(grp['signals'].sum())
        avg_sig_per_year = round(float(grp['sig_per_year'].mean()), 2)
        avg_window = round(float(grp['avg_window_days'].mean()), 1)
        low_conf = int((grp['confidence'] == 'low').sum())

        agg = {
            'label': label,
            'period': combo_info['period'],
            'obs': combo_info['obs'],
            'type': combo_info['type'],
            'n_products': n_products,
            'total_signals': total_signals,
            'sig_per_year_per_product': avg_sig_per_year,
            'avg_window_days': avg_window,
            'low_conf_products': low_conf,
        }

        for h in FORWARD_HORIZONS:
            col_mean = f'ret{h}d_mean'
            col_winrate = f'ret{h}d_winrate'
            col_worst = f'ret{h}d_worst'
            col_n = f'ret{h}d_n'

            # 跨产品等权平均
            means = grp[col_mean].dropna()
            winrates = grp[col_winrate].dropna()
            worsts = grp[col_worst].dropna()
            total_n = int(grp[col_n].sum())

            agg[f'ret{h}d_mean'] = round(float(means.mean()), 2) if len(means) > 0 else None
            agg[f'ret{h}d_winrate'] = round(float(winrates.mean()), 1) if len(winrates) > 0 else None
            agg[f'ret{h}d_worst'] = round(float(worsts.min()), 2) if len(worsts) > 0 else None
            agg[f'ret{h}d_total_n'] = total_n

        # 年化预期收益（20日窗口）：单次平均收益 × 年均信号次数（每产品）
        if agg['ret20d_mean'] is not None:
            agg['annual_expected'] = round(agg['ret20d_mean'] * agg['sig_per_year_per_product'], 2)
        else:
            agg['annual_expected'] = None

        agg_rows.append(agg)

    agg_df = pd.DataFrame(agg_rows)
    agg_df = agg_df.sort_values('annual_expected', ascending=False, na_position='last')

    # ═══════════════════════════════════════════════════════════
    # 生成 HTML 报告
    # ═══════════════════════════════════════════════════════════
    html = _build_html_report(agg_df, df, today_str, all_signals_detail)
    report_path = os.path.join(SCRIPT_DIR, 'RSI参数回测报告.html')
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"\n{'='*60}")
    print(f"回测报告已生成: {report_path}")
    print(f"参数组合: {len(agg_df)}  |  产品: {df['product'].nunique()}")

    # 终端输出 TOP 10
    print(f"\n{'─'*80}")
    print("TOP 15（按年化预期收益排序）:")
    print(f"{'排名':<5}{'参数组合':<26}{'20日':>8}{'胜率':>6}{'120日':>8}{'250日':>8}{'550日':>8}{'年化预期':>10}{'置信':>6}")
    for i, row in agg_df.head(15).iterrows():
        rank = agg_df.index.get_loc(i) + 1
        label = row['label']
        ret20 = f"{row['ret20d_mean']:.1f}%" if row.get('ret20d_mean') is not None else '--'
        wr20 = f"{row['ret20d_winrate']:.0f}%" if row.get('ret20d_winrate') is not None else '--'
        ret120 = f"{row['ret120d_mean']:.1f}%" if row.get('ret120d_mean') is not None else '--'
        ret250 = f"{row['ret250d_mean']:.1f}%" if row.get('ret250d_mean') is not None else '--'
        ret550 = f"{row['ret550d_mean']:.1f}%" if row.get('ret550d_mean') is not None else '--'
        ann = f"{row['annual_expected']:.1f}%" if row.get('annual_expected') is not None else '--'
        conf = '⚠' if row['low_conf_products'] > 0 else '✓'
        print(f"{rank:<5}{label:<26}{ret20:>8}{wr20:>6}{ret120:>8}{ret250:>8}{ret550:>8}{ann:>10}{conf:>6}")

    return agg_df, df


# ═══════════════════════════════════════════════════════════════
# HTML 报告
# ═══════════════════════════════════════════════════════════════

def _build_html_report(agg_df, detail_df, today_str, signals_detail):
    """生成完整 HTML 报告"""

    # 排名颜色
    def rank_color(rank, total):
        if rank <= 3:
            return '#0ea882'
        if rank <= total * 0.3:
            return '#c88a0c'
        return '#8b919e'

    def conf_badge(conf_count):
        if conf_count == 0:
            return '<span style="color:#0ea882">✓ 全部可信</span>'
        return f'<span style="color:#e07040">⚠ {conf_count} 产品低置信</span>'

    # 汇总表格行
    total_combos = len(agg_df)
    table_rows = ''
    for rank, (idx, row) in enumerate(agg_df.iterrows(), 1):
        clr = rank_color(rank, total_combos)
        ret20 = f'{row["ret20d_mean"]:.2f}%' if row.get('ret20d_mean') is not None else '--'
        wr20 = f'{row["ret20d_winrate"]:.0f}%' if row.get('ret20d_winrate') is not None else '--'
        ret120 = f'{row["ret120d_mean"]:.2f}%' if row.get('ret120d_mean') is not None else '--'
        ret250 = f'{row["ret250d_mean"]:.2f}%' if row.get('ret250d_mean') is not None else '--'
        ret550 = f'{row["ret550d_mean"]:.2f}%' if row.get('ret550d_mean') is not None else '--'
        ann = f'{row["annual_expected"]:.1f}%' if row.get('annual_expected') is not None else '--'
        worst = f'{row["ret20d_worst"]:.2f}%' if row.get('ret20d_worst') is not None else '--'

        table_rows += f'''
        <tr style="border-left: 3px solid {clr}">
          <td style="font-weight:700;color:{clr}">{rank}</td>
          <td>{row['label']}</td>
          <td>{row['total_signals']}</td>
          <td>{row['sig_per_year_per_product']:.1f}</td>
          <td>{row['avg_window_days']:.0f}天</td>
          <td style="font-weight:700;color:{clr}">{ret20}</td>
          <td>{wr20}</td>
          <td style="font-weight:700">{ret120}</td>
          <td style="font-weight:700">{ret250}</td>
          <td style="font-weight:700">{ret550}</td>
          <td style="font-weight:700;color:{clr}">{ann}</td>
          <td style="color:#c62828">{worst}</td>
          <td>{conf_badge(row['low_conf_products'])}</td>
        </tr>'''

    # 每参数组合 × 产品详情行
    detail_rows = ''
    pivot = detail_df.pivot_table(
        index=['label', 'period', 'obs', 'type'],
        columns='product',
        values=['ret20d_mean', 'ret20d_winrate', 'signals', 'sig_per_year'],
        aggfunc='first'
    )
    for label, grp in detail_df.groupby('label'):
        grp_sorted = grp.sort_values('ret20d_mean', ascending=False, na_position='last')
        for _, drow in grp_sorted.iterrows():
            ret20 = f'{drow["ret20d_mean"]:.1f}%' if pd.notna(drow.get('ret20d_mean')) else '--'
            wr20 = f'{drow["ret20d_winrate"]:.0f}%' if pd.notna(drow.get('ret20d_winrate')) else '--'
            conf_cls = 'low' if drow['confidence'] == 'low' else ''
            detail_rows += f'''
            <tr class="{conf_cls}">
              <td>{drow['label']}</td>
              <td>{drow['product']}</td>
              <td>{ret20}</td>
              <td>{wr20}</td>
              <td>{int(drow['signals'])}</td>
              <td>{drow['sig_per_year']:.1f}</td>
              <td>{drow['years']:.1f}年</td>
            </tr>'''

    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RSI 参数回测报告 — {today_str}</title>
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  body {{ font-family: -apple-system, 'Microsoft YaHei', sans-serif; background:#f5f6f8;
         color:#2d3748; padding:24px 32px; }}
  h1 {{ font-size:22px; margin-bottom:4px; }}
  .sub {{ color:#8b919e; font-size:13px; margin-bottom:24px; }}
  .section {{ margin-bottom:32px; }}
  h2 {{ font-size:17px; margin-bottom:12px; padding-bottom:8px; border-bottom:2px solid #e2e6ec; }}

  table {{ width:100%; border-collapse:collapse; font-size:13px; background:#fff;
          border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.06); }}
  th {{ background:#f0f2f5; color:#4a5568; font-weight:600; padding:10px 10px;
        text-align:center; font-size:12px; white-space:nowrap; }}
  td {{ padding:8px 10px; text-align:center; border-top:1px solid #f0f2f5; }}
  tr:hover {{ background:#f8f9fb; }}
  tr.low {{ color:#a0a8b4; font-style:italic; }}

  .note {{ margin-top:24px; padding:14px 18px; background:#fff; border-radius:8px;
           font-size:12px; color:#5a6070; line-height:1.8;
           box-shadow:0 1px 3px rgba(0,0,0,0.06); }}
  .note strong {{ color:#c62828; }}

  .tab-nav {{ display:flex; gap:4px; margin-bottom:16px; }}
  .tab-btn {{ padding:6px 18px; border:1px solid #d0d5dd; border-radius:6px;
              background:#fff; cursor:pointer; font-size:13px; }}
  .tab-btn.active {{ background:#1a5fdc; color:#fff; border-color:#1a5fdc; }}
  .tab-content {{ display:none; }}
  .tab-content.active {{ display:block; }}
</style>
</head>
<body>

<h1>RSI 参数回测报告</h1>
<div class="sub">
  生成日期: {today_str} &nbsp;|&nbsp;
  数据口径: 全部产品统一用累计净值（含分红总回报）&nbsp;|&nbsp;
  信号规则: 首次跌破观察点即触发，RSI回升至 obs+5 上方重新激活
</div>

<div class="tab-nav">
  <button class="tab-btn active" onclick="switchTab('summary')">汇总排名</button>
  <button class="tab-btn" onclick="switchTab('daily')">日线 RSI</button>
  <button class="tab-btn" onclick="switchTab('weekly')">周线 RSI</button>
  <button class="tab-btn" onclick="switchTab('detail')">产品明细</button>
</div>

<!-- 汇总排名 -->
<div id="tab-summary" class="tab-content active section">
  <h2>全部参数组合排名（按年化预期收益 ↓）</h2>
  <div style="overflow-x:auto">
  <table>
    <thead>
    <tr>
      <th>排名</th><th>参数组合</th><th>总信号数</th><th>年均/产品</th>
      <th>窗口均长</th><th>20日均收益</th><th>20日胜率</th>
      <th>120日均收益</th><th>250日均收益</th><th>550日均收益</th><th>年化预期(20日)</th>
      <th>最差20日</th><th>低置信产品</th>
    </tr>
    </thead>
    <tbody>
    {table_rows}
    </tbody>
  </table>
  </div>
</div>

<!-- 日线 -->
<div id="tab-daily" class="tab-content section">
  <h2>日线 RSI（6日 / 14日 / 21日）</h2>
  <div style="overflow-x:auto">
  <table>
    <thead>
    <tr>
      <th>排名</th><th>参数组合</th><th>总信号数</th><th>年均/产品</th>
      <th>窗口均长</th><th>20日均收益</th><th>20日胜率</th>
      <th>120日均收益</th><th>250日均收益</th><th>550日均收益</th><th>年化预期(20日)</th>
      <th>最差20日</th><th>低置信产品</th>
    </tr>
    </thead>
    <tbody>
    {_filtered_table_rows(agg_df, 'daily')}
    </tbody>
  </table>
  </div>
</div>

<!-- 周线 -->
<div id="tab-weekly" class="tab-content section">
  <h2>周线 RSI（7周 / 14周）</h2>
  <div style="overflow-x:auto">
  <table>
    <thead>
    <tr>
      <th>排名</th><th>参数组合</th><th>总信号数</th><th>年均/产品</th>
      <th>窗口均长</th><th>20日均收益</th><th>20日胜率</th>
      <th>120日均收益</th><th>250日均收益</th><th>550日均收益</th><th>年化预期(20日)</th>
      <th>最差20日</th><th>低置信产品</th>
    </tr>
    </thead>
    <tbody>
    {_filtered_table_rows(agg_df, 'weekly')}
    </tbody>
  </table>
  </div>
</div>

<!-- 产品明细 -->
<div id="tab-detail" class="tab-content section">
  <h2>每产品 × 每参数组合 详情</h2>
  <div style="overflow-x:auto">
  <table>
    <thead>
    <tr><th>参数组合</th><th>产品</th><th>20日均收益</th><th>20日胜率</th>
        <th>信号数</th><th>年均信号</th><th>数据年限</th></tr>
    </thead>
    <tbody>
    {detail_rows}
    </tbody>
  </table>
  </div>
  <p style="margin-top:8px;font-size:12px;color:#a0a8b4">
    灰色斜体 = 信号数不足5，低置信度
  </p>
</div>

<div class="note">
  <strong>指标说明：</strong><br>
  · <strong>年化预期收益(20日)</strong> = 信号后20日平均收益 × 每产品年均信号次数。综合衡量信号质量和实操密度。<br>
  · <strong>20日均收益</strong>：信号发出后持有20个交易日（≈1个月）的平均总回报。衡量入场时机把握能力。<br>
  · <strong>120日均收益</strong>：持有约半年的总回报。衡量中期投资结果。<br>
  · <strong>250日均收益</strong>：持有约一年的总回报。衡量长期投资结果。<br>
  · <strong>550日均收益</strong>：持有约两年的总回报。衡量跨周期投资结果。<br>
  · <strong>窗口均长</strong>：RSI跌破观察点后，在线下持续的平均自然日天数。<br>
  · <strong>低置信产品</strong>：信号数不足5。对应该参数组合数据分析支撑不足。<br>
  · <strong>数据口径</strong>：全部产品统一使用天天基金「累计净值」（含分红再投资），日收益率自动包含分红。<br>
  · <strong>信号去重</strong>：同一段 RSI 线下走势中仅取首次跌破为有效信号，RSI 回到 obs+5 以上后才重新激活。<br>
  · <strong>跨产品聚合</strong>：各产品等权平均，不做规模或年限加权。
</div>

<script>
function switchTab(name) {{
  document.querySelectorAll('.tab-btn').forEach(function(b) {{ b.classList.remove('active'); }});
  document.querySelectorAll('.tab-content').forEach(function(c) {{ c.classList.remove('active'); }});
  document.getElementById('tab-' + name).classList.add('active');
  event.target.classList.add('active');
}}
</script>
</body>
</html>'''


def _filtered_table_rows(agg_df, combo_type):
    """生成过滤后的表格行（仅日线或周线）"""
    filtered = agg_df[agg_df['type'] == combo_type]
    total = len(filtered)
    rows = ''
    for rank, (idx, row) in enumerate(filtered.iterrows(), 1):
        def rc(r, t):
            if r <= max(1, t * 0.15): return '#0ea882'
            if r <= t * 0.4: return '#c88a0c'
            return '#8b919e'
        clr = rc(rank, total)
        ret20 = f'{row["ret20d_mean"]:.2f}%' if row.get('ret20d_mean') is not None else '--'
        wr20 = f'{row["ret20d_winrate"]:.0f}%' if row.get('ret20d_winrate') is not None else '--'
        ret120 = f'{row["ret120d_mean"]:.2f}%' if row.get('ret120d_mean') is not None else '--'
        ret250 = f'{row["ret250d_mean"]:.2f}%' if row.get('ret250d_mean') is not None else '--'
        ret550 = f'{row["ret550d_mean"]:.2f}%' if row.get('ret550d_mean') is not None else '--'
        ann = f'{row["annual_expected"]:.1f}%' if row.get('annual_expected') is not None else '--'
        worst = f'{row["ret20d_worst"]:.2f}%' if row.get('ret20d_worst') is not None else '--'
        rows += f'''
        <tr style="border-left: 3px solid {clr}">
          <td style="font-weight:700;color:{clr}">{rank}</td>
          <td>{row['label']}</td>
          <td>{row['total_signals']}</td>
          <td>{row['sig_per_year_per_product']:.1f}</td>
          <td>{row['avg_window_days']:.0f}天</td>
          <td style="font-weight:700;color:{clr}">{ret20}</td>
          <td>{wr20}</td>
          <td style="font-weight:700">{ret120}</td>
          <td style="font-weight:700">{ret250}</td>
          <td style="font-weight:700">{ret550}</td>
          <td style="font-weight:700;color:{clr}">{ann}</td>
          <td style="color:#c62828">{worst}</td>
          <td>{'✓' if row['low_conf_products'] == 0 else f'⚠{row["low_conf_products"]}'}</td>
        </tr>'''
    return rows


# ═══════════════════════════════════════════════════════════════
if __name__ == '__main__':
    run_backtest()
