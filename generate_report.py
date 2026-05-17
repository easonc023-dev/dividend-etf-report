#!/usr/bin/env python
"""Generate HTML report for 515450 with correct fund holdings data."""
import sys, time
sys.stdout.reconfigure(encoding='utf-8')

import akshare as ak
import baostock as bs
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

code = '515450'
sina_sym = 'sh515450'
etf_name = '红利低波50ETF南方'
index_name = '标普中国A股大盘红利低波50'
today = datetime.now()

bs.login()

# ─── Price data ───
df = ak.fund_etf_hist_sina(symbol=sina_sym)
df = df.sort_values('date')
df['date'] = pd.to_datetime(df['date'])
df['close'] = pd.to_numeric(df['close'])
latest = df.iloc[-1]
nav = float(latest['close'])
nav_date = latest['date'].strftime('%Y-%m-%d')
nav_open = float(latest['open'])
nav_high = float(latest['high'])
nav_low = float(latest['low'])
nav_amount = float(latest['amount']) / 1e4

# ─── Technical indicators ───
close_s = df.set_index('date')['close']
ma250 = float(df['close'].tail(250).mean())
ma550 = float(df['close'].tail(min(550, len(df))).mean())
diff250 = (nav - ma250) / ma250 * 100
diff550 = (nav - ma550) / ma550 * 100

def calc_rsi(series, period):
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = (-delta).clip(lower=0)
    avg_gain = gain.ewm(alpha=1/period, min_periods=period).mean()
    avg_loss = loss.ewm(alpha=1/period, min_periods=period).mean()
    rs = avg_gain / avg_loss
    return float(100 - 100/(1+rs).iloc[-1])

rsi_6d = calc_rsi(close_s, 6)
weekly = close_s.resample('W').last().dropna()
rsi_7w = calc_rsi(weekly, 7) if len(weekly) >= 7 else 50.0

# ─── Phase returns ───
returns = {}
for label, days in [('近1周',7),('近1月',30),('近3月',90),('近6月',180),('近1年',365),('近2年',730)]:
    target = today - timedelta(days=days)
    pre = df[df['date'] <= pd.Timestamp(target)]
    if not pre.empty:
        prev = float(pre.iloc[-1]['close'])
        returns[label] = (nav - prev) / prev * 100
    else:
        returns[label] = 0

# ─── Risk ───
log_ret = np.log(close_s / close_s.shift(1)).dropna()
vol_20d = float(log_ret.tail(20).std() * np.sqrt(252) * 100)
vol_60d = float(log_ret.tail(60).std() * np.sqrt(252) * 100)

if len(df) > 250:
    close_1y = df['close'].tail(250).values
    peak = close_1y[0]
    max_dd = 0
    for p in close_1y:
        if p > peak: peak = p
        dd = (peak - p) / peak * 100
        if dd > max_dd: max_dd = dd
else:
    max_dd = 0

# ─── Holdings from fund quarterly report ───
df_hold = ak.fund_portfolio_hold_em(symbol=code, date=str(today.year))
stock_codes, stock_names, weight_map = [], [], {}
for _, row in df_hold.iterrows():
    sc = row['股票代码']
    sname = row['股票名称']
    w = float(row['占净值比例'])
    if w > 0.01:
        stock_codes.append(sc)
        stock_names.append(sname)
        weight_map[sc] = w

# ─── PE/PB/DV/Industry from baostock ───
industry_map = {}
rs_ind = bs.query_stock_industry()
if rs_ind.error_code == '0':
    ind_df = rs_ind.get_data()
    for _, row in ind_df.iterrows():
        code_raw = row['code']
        short_code = code_raw.split('.')[-1] if '.' in code_raw else code_raw
        industry_map[short_code] = row['industry']

date_str = (today - timedelta(days=5)).strftime('%Y-%m-%d')
stock_data = []
industries = {}

for sc, sname in zip(stock_codes, stock_names):
    if sc.startswith(('6','5')): bs_code = f'sh.{sc}'
    elif sc.startswith(('0','3','1')): bs_code = f'sz.{sc}'
    else: continue

    stock_price, pe_v, pb_v, dv_v = None, None, None, None
    try:
        rs_k = bs.query_history_k_data_plus(
            code=bs_code, fields='date,close,peTTM,pbMRQ',
            start_date=date_str, end_date=today.strftime('%Y-%m-%d'),
            frequency='d', adjustflag='2'
        )
        if rs_k.error_code == '0':
            kdf = rs_k.get_data()
            if not kdf.empty:
                last = kdf.iloc[-1]
                stock_price = float(last['close']) if last['close'] else None
                pe_str, pb_str = last['peTTM'], last['pbMRQ']
                if pe_str and pe_str != '':
                    try: pe_v = float(pe_str)
                    except: pass
                if pb_str and pb_str != '':
                    try: pb_v = float(pb_str)
                    except: pass
    except:
        pass

    # Dividend - 按预案公告日期归属财报年度,取最新完整财年
    # 规则: 预案月份1-4→前一年财年年报, 5-12→当年财年中期/特别
    # 完整性: FY N需要(N+1)年3-4月年报数据已入库(1-2月不可靠,可能是特别分红)
    try:
        dps_by_fy = {}
        has_annual = set()
        for report_yr in [str(today.year-2), str(today.year-1), str(today.year)]:
            rs_dv = bs.query_dividend_data(code=bs_code, year=report_yr, yearType='report')
            if rs_dv.error_code != '0': continue
            ddf = rs_dv.get_data()
            if ddf.empty: continue
            for _, dr in ddf.iterrows():
                v = dr.get('dividCashPsBeforeTax', 0)
                if v is None or v == '': continue
                try: dps_val = float(v)
                except: continue
                ann_date = str(dr.get('dividPlanAnnounceDate', ''))
                if ann_date and ann_date != 'nan' and len(ann_date) >= 7:
                    try: ann_month = int(ann_date[5:7])
                    except: ann_month = 0
                else:
                    ann_month = 0
                if 1 <= ann_month <= 4:
                    fy = int(report_yr) - 1
                    if ann_month >= 3:
                        has_annual.add(fy)
                elif 5 <= ann_month <= 12:
                    fy = int(report_yr)
                else:
                    fy = int(report_yr) - 1
                dps_by_fy[fy] = dps_by_fy.get(fy, 0) + dps_val

        if dps_by_fy:
            available_fys = sorted(dps_by_fy.keys(), reverse=True)
            best_dps = 0
            for fy in available_fys:
                if fy in has_annual and dps_by_fy.get(fy, 0) > 0:
                    best_dps = dps_by_fy[fy]
                    break
            if best_dps == 0:
                best_dps = max(dps_by_fy.values())
            if best_dps > 0 and stock_price and stock_price > 0:
                dv_v = best_dps / stock_price * 100
    except:
        pass

    ind = industry_map.get(sc, '其他')
    w = weight_map.get(sc, 0)
    stock_data.append((sc, sname, w, pe_v, pb_v, dv_v, ind))
    if ind:
        industries[ind] = industries.get(ind, 0) + w
    time.sleep(0.05)

# Calculate weighted metrics
pe_list = [s[3] for s in stock_data if s[3] is not None]
pb_list = [s[4] for s in stock_data if s[4] is not None]
dv_list = [s[5] for s in stock_data if s[5] is not None]

def weighted_avg(vals, weights):
    num = sum(v*w for v,w in zip(vals, weights) if v is not None and w > 0)
    den = sum(w for v,w in zip(vals, weights) if v is not None and w > 0)
    return num/den if den > 0 else 0

pe_w = weighted_avg([s[3] for s in stock_data], [s[2] for s in stock_data])
pb_w = weighted_avg([s[4] for s in stock_data], [s[2] for s in stock_data])
dv_w = weighted_avg([s[5] for s in stock_data], [s[2] for s in stock_data])

pe_mean = np.mean(pe_list) if pe_list else 0
pb_mean = np.mean(pb_list) if pb_list else 0
dv_mean = np.mean(dv_list) if dv_list else 0

pe_median = np.median(pe_list) if pe_list else 0
pb_median = np.median(pb_list) if pb_list else 0
dv_median = np.median(dv_list) if dv_list else 0

pe_p25 = np.percentile(pe_list, 25) if pe_list else 0
pe_p75 = np.percentile(pe_list, 75) if pe_list else 0
pb_p25 = np.percentile(pb_list, 25) if pb_list else 0
pb_p75 = np.percentile(pb_list, 75) if pb_list else 0

# ─── Peers ───
PEERS = {
    '510880': ('sh510880', '红利ETF华泰柏瑞'),
    '515180': ('sh515180', '红利ETF易方达'),
    '515080': ('sh515080', '中证红利ETF招商'),
    '512890': ('sh512890', '红利低波华泰柏瑞'),
    '563020': ('sh563020', '红利低波易方达'),
    '515100': ('sh515100', '红利低波100景顺'),
    '515450': (sina_sym, etf_name),
    '159758': ('sz159758', '红利质量ETF华夏'),
}

peer_results = []
for pcode, (psym, pname) in PEERS.items():
    try:
        pdf = ak.fund_etf_hist_sina(symbol=psym)
        if pdf is not None and not pdf.empty:
            pdf = pdf.sort_values('date')
            pdf['date'] = pd.to_datetime(pdf['date'])
            pnav = float(pdf.iloc[-1]['close'])
            cutoff = today - timedelta(days=365)
            pre_pdf = pdf[pdf['date'] <= pd.Timestamp(cutoff)]
            if not pre_pdf.empty:
                pprev = float(pre_pdf.iloc[-1]['close'])
                pret = round((pnav - pprev) / pprev * 100, 2)
                peer_results.append((pname, pret, pcode == code))
        time.sleep(0.3)
    except:
        pass

peer_results.sort(key=lambda x: x[1], reverse=True)

bs.logout()

# ─── Helper functions for HTML ───
def rsi_label(rsi):
    return '超买' if rsi > 70 else '偏强' if rsi > 50 else '偏弱' if rsi > 30 else '超卖'

def rsi_tag_class(rsi):
    return 'tag-overbought' if rsi > 70 else 'tag-strong' if rsi > 50 else 'tag-weak' if rsi > 30 else 'tag-oversold'

def rsi_gradient_color_6d(rsi):
    """Map RSI value to color from the 6d gradient."""
    if rsi >= 70: return '#0EA882'
    if rsi >= 50: return '#C88A0C'
    if rsi >= 35: return '#E07040'
    if rsi >= 25: return '#E04558'
    if rsi >= 15: return '#C0392B'
    return '#7B1818'

def rsi_gradient_color_7w(rsi):
    """Map RSI value to color from the 7w gradient."""
    if rsi >= 75: return '#0EA882'
    if rsi >= 60: return '#C88A0C'
    if rsi >= 50: return '#E07040'
    if rsi >= 40: return '#E04558'
    if rsi >= 25: return '#A93226'
    return '#7B1818'

def rsi_hint_6d(rsi):
    if rsi >= 25: return ('safe', '不用关注')
    if rsi >= 20: return ('watch', '进入观察期')
    return ('buy', '进入买点')

def rsi_hint_7w(rsi):
    if rsi >= 40: return ('safe', '不用关注')
    if rsi >= 35: return ('watch', '进入观察期')
    return ('buy', '进入买点')

def ma_hint(dev):
    if dev >= 0: return ('safe', '不用关注')
    if dev >= -5: return ('watch', '进入观察期')
    return ('buy', '进入买点')

def ma_bar_pos(dev):
    return max(0, min(100, (dev + 30) / 60 * 100))

def ma_dot_color(dev):
    if dev <= -20: return '#0EA882'
    if dev <= -10: return '#0EA882'
    if dev <= -5: return '#C88A0C'
    if dev <= 0: return '#E07040'
    if dev <= 10: return '#E04558'
    if dev <= 20: return '#C0392B'
    return '#7B1818'

def ma_ticks_html():
    lines = ''
    for val in range(-30, 35, 5):
        pos = (val + 30) / 60 * 100
        lines += f'            <div class="gauge-tick top" style="left:{pos:.1f}%">{val:+d}%</div>\n'
    return lines

def ma_buy_marks_html():
    lines = ''
    for val in [-5, -10, -15, -20, -25]:
        pos = (val + 30) / 60 * 100
        lines += f'            <div class="gauge-mark buy" style="left:{pos:.1f}%"></div>\n'
    return lines

# ─── Generate HTML ───
html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{etf_name} (515450) 深度分析 | {today.strftime('%Y-%m-%d')}</title>
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    background: #f5f6f8;
    color: #2a3140;
    line-height: 1.5;
  }}

  .header {{
    background: #fff;
    border-bottom: 1px solid #e2e6ec;
    padding: 28px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .header h1 {{ font-size: 22px; font-weight: 700; color: #111; }}
  .header .sub {{ font-size: 14px; color: #5a6070; margin-top: 4px; }}
  .header .sub span {{ color: #0ea882; font-weight: 600; }}
  .header .nav-num {{ font-size: 42px; font-weight: 800; color: #111; }}
  .header .nav-label {{ font-size: 15px; font-weight: 700; color: #0ea882; text-align: right; }}
  .header .nav-date {{ font-size: 13px; color: #6b7385; text-align: right; margin-top: 2px; }}

  .hero {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    padding: 24px 48px 0;
  }}
  .hero-card {{
    background: #fff;
    border: 1px solid #e2e6ec;
    border-radius: 14px;
    padding: 32px 36px;
  }}
  .hero-card h2 {{
    font-size: 15px; font-weight: 700; letter-spacing: 1px;
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 24px;
  }}
  .hero-card h2::after {{ content: ''; flex:1; height: 1px; opacity: 0.15; }}
  .valuation h2 {{ color: #0ea882; }}
  .valuation h2::after {{ background: #0ea882; }}
  .technical h2 {{ color: #3168d8; }}
  .technical h2::after {{ background: #3168d8; }}

  .val-row {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }}
  .val-col {{ text-align: center; padding: 8px 12px; }}
  .val-col + .val-col {{ border-left: 1px solid #eef0f4; }}
  .val-title {{ font-size: 24px; font-weight: 700; color: #111; margin-bottom: 6px; }}
  .val-num {{ font-size: 44px; font-weight: 800; line-height: 1; }}
  .val-num .pct {{ font-size: 22px; }}
  .val-info {{ font-size: 13px; color: #5a6070; line-height: 1.6; margin-top: 6px; }}
  .val-info b {{ color: #2a3140; }}
  .val-note {{
    margin-top: 18px; padding: 8px 14px;
    background: #f0faf6; border-left: 3px solid #0ea882;
    font-size: 13px; color: #3a6055; border-radius: 0 6px 6px 0;
  }}

  .tech-grid {{ display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 0; }}
  .tech-cell {{ padding: 24px 24px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; }}
  .tech-cell + .tech-cell {{ border-left: 1px solid #eef0f4; }}
  .tech-cell:nth-child(3), .tech-cell:nth-child(4) {{ border-top: 1px solid #eef0f4; }}

  .tech-label {{ font-size: 24px; font-weight: 700; color: #111; margin-bottom: 6px; }}
  .tech-num {{ font-size: 44px; font-weight: 800; color: #111; line-height: 1; margin-bottom: 2px; }}
  .tech-dev {{ font-size: 14px; font-weight: 600; margin-bottom: 4px; }}
          
  /* RSI Gauge */
  .gauge-wrap {{ margin-top: 28px; width: 100%; position: relative; }}
  .gauge-bar {{
    height: 10px; border-radius: 5px; position: relative; width: 100%;
  }}
  .gauge-bar-6d {{
    background: linear-gradient(to right, #7B1818 0%, #C0392B 15%, #E04558 25%, #E07040 35%, #C88A0C 50%, #0EA882 70%, #0EA882 100%);
  }}
  .gauge-bar-ma {{
    background: linear-gradient(to right,
      #0EA882 0%, #0EA882 17%,
      #0EA882 33%,
      #C88A0C 42%,
      #E07040 50%,
      #E04558 58%,
      #C0392B 67%,
      #A93226 83%,
      #7B1818 100%
    );
  }}
  .gauge-bar-7w {{
    background: linear-gradient(to right, #7B1818 0%, #A93226 20%, #E04558 40%, #E07040 50%, #C88A0C 60%, #0EA882 75%, #0EA882 100%);
  }}
  .gauge-dot {{
    position: absolute; top: -3px; width: 16px; height: 16px;
    border-radius: 50%; border: 3px solid #fff;
    box-shadow: 0 0 0 2px currentColor, 0 1px 4px rgba(0,0,0,0.2);
    transform: translateX(-50%);
  }}
  .gauge-obs-label {{ position: absolute; top: -22px; font-size: 11px; font-weight: 700; color: #E04558; transform: translateX(-3px); white-space: nowrap; z-index: 3; }}
  .gauge-ticks {{ position: relative; width: 100%; height: 34px; margin-top: 4px; }}
  .gauge-mark {{ position: absolute; top: 0; width: 2px; border-radius: 1px; transform: translateX(-50%); }}
  .gauge-mark.obs {{ height: 10px; background: #fff; box-shadow: 0 0 3px rgba(0,0,0,0.4); z-index: 2; }}
  .gauge-mark.buy {{ height: 6px; background: rgba(255,255,255,0.5); z-index: 1; }}
  .gauge-tick {{
    position: absolute; font-size: 12px; color: #5a6070;
    transform: translateX(-50%); white-space: nowrap;
  }}
  .gauge-tick.top {{ top: 6px; font-weight: 600; color: #2a3140; }}
  .gauge-tick.bot {{ top: 19px; }}

  .rsi-hint {{ display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; margin-bottom: 6px; }}
  .rsi-hint.safe {{ background: #eef0f4; color: #6b7385; }}
  .rsi-hint.watch {{ background: #fff8e6; color: #C88A0C; }}
  .rsi-hint.buy {{ background: #fef2f3; color: #d64555; }}

  .rsi-legend {{ margin-top: 8px; padding: 8px 12px; background: #f8f9fb; border-radius: 6px; font-size: 13px; line-height: 1.6; }}

  /* Main grid */
  .main-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    padding: 18px 48px 0;
  }}
  .card {{
    background: #fff;
    border: 1px solid #e2e6ec;
    border-radius: 14px;
    padding: 28px 32px;
  }}
  .card h3 {{
    font-size: 15px; font-weight: 700; margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
    letter-spacing: 1px;
  }}
  .card h3::after {{ content: ''; flex:1; height: 1px; background: #e2e6ec; }}

  .wide-card {{
    margin: 18px 48px;
    background: #fff;
    border: 1px solid #e2e6ec;
    border-radius: 14px;
    padding: 28px 32px;
  }}
  .wide-card h3 {{
    font-size: 15px; font-weight: 700; margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
    letter-spacing: 1px;
  }}
  .wide-card h3::after {{ content: ''; flex:1; height: 1px; background: #e2e6ec; }}

  /* Tables */
  table {{ width: 100%; border-collapse: collapse; font-size: 14px; }}
  th {{ text-align: left; padding: 10px 8px; border-bottom: 2px solid #e2e6ec; color: #5a6070; font-size: 13px; font-weight: 600; }}
  td {{ padding: 10px 8px; border-bottom: 1px solid #eef0f4; }}
  .highlight {{ color: #0ea882; font-weight: 700; }}

  .ind-bar-wrap {{ display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }}
  .ind-name {{ width: 220px; font-size: 14px; color: #2a3140; flex-shrink: 0; }}
  .ind-pct {{ width: 52px; font-size: 14px; font-weight: 600; color: #111; text-align: right; flex-shrink: 0; }}
  .ind-bar-bg {{ flex:1; height: 22px; background: #f0f2f5; border-radius: 4px; overflow: hidden; }}
  .ind-bar-fill {{ height: 100%; border-radius: 4px; background: #0ea882; }}

  .green {{ color: #0ea882; }}
  .red {{ color: #d64555; }}

  .footer {{
    text-align: center; padding: 24px 48px 32px;
    font-size: 13px; color: #8a92a3;
  }}
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <div>
    <h1>{etf_name} (515450)</h1>
    <div class="sub">跟踪 <span>{index_name}</span> | 红利低波策略</div>
  </div>
  <div style="text-align:right">
    <div class="nav-num">{nav:.3f}</div>
    <div class="nav-label">最新净值</div>
    <div class="nav-date">{nav_date}</div>
  </div>
</div>

<!-- HERO -->
<div class="hero">
  <!-- Valuation Card -->
  <div class="hero-card valuation">
    <h2>估值概览</h2>
    <div class="val-row">
      <div class="val-col">
        <div class="val-title">PE(TTM)</div>
        <div class="val-num" style="color:#0ea882">{pe_w:.1f}<span class="pct"></span></div>
        <div class="val-info">中位 <b>{pe_median:.1f}</b><br>区间 {pe_p25:.1f}~{pe_p75:.1f}</div>
      </div>
      <div class="val-col">
        <div class="val-title">PB</div>
        <div class="val-num" style="color:#0ea882">{pb_w:.1f}<span class="pct"></span></div>
        <div class="val-info">中位 <b>{pb_median:.1f}</b><br>区间 {pb_p25:.1f}~{pb_p75:.1f}</div>
      </div>
      <div class="val-col">
        <div class="val-title">股息率</div>
        <div class="val-num" style="color:#0ea882">{dv_w:.1f}<span class="pct">%</span></div>
        <div class="val-info">中位 <b>{dv_median:.1f}%</b><br>简单均值 {dv_mean:.1f}%</div>
      </div>
    </div>
    <div class="val-note">
      指标说明：PE/PB/股息率为<b>加权计算</b>（按持仓权重），数据来源于基金2026年1季度报告持仓及baostock估值数据。标普指数成分股不可通过中证渠道获取，使用基金实际持仓替代。
    </div>
  </div>

  <!-- Technical Card -->
  <div class="hero-card technical">
    <h2>技术指标</h2>
    <div class="tech-grid">
      <div class="tech-cell">
        <div class="tech-label">250日均线</div>
        <div class="rsi-hint {ma_hint(diff250)[0]}">{ma_hint(diff250)[1]}</div>
        <div class="tech-num" style="color:{ma_dot_color(diff250)}">{ma250:.4f}</div>
        <div class="tech-dev" style="color:{ma_dot_color(diff250)}">净值偏离 {diff250:+.2f}%</div>
                <div class="gauge-wrap">
          <div class="gauge-obs-label" style="left:{ma_bar_pos(0):.1f}%">▼观察点</div>
          <div class="gauge-bar gauge-bar-ma">
            <div class="gauge-mark obs" style="left:{ma_bar_pos(0):.1f}%"></div>
            <div class="gauge-mark buy" style="left:41.7%"></div>
            <div class="gauge-mark buy" style="left:33.3%"></div>
            <div class="gauge-mark buy" style="left:25.0%"></div>
            <div class="gauge-mark buy" style="left:16.7%"></div>
            <div class="gauge-mark buy" style="left:8.3%"></div>
            <div class="gauge-dot" style="left:{ma_bar_pos(diff250):.1f}%;color:{ma_dot_color(diff250)}"></div>
          </div>
          <div class="gauge-ticks">
            <div class="gauge-tick top" style="left:0.0%">-30%</div>
            <div class="gauge-tick top" style="left:8.3%">-25%</div>
            <div class="gauge-tick top" style="left:16.7%">-20%</div>
            <div class="gauge-tick top" style="left:25.0%">-15%</div>
            <div class="gauge-tick top" style="left:33.3%">-10%</div>
            <div class="gauge-tick top" style="left:41.7%">-5%</div>
            <div class="gauge-tick top" style="left:50.0%">+0%</div>
            <div class="gauge-tick top" style="left:58.3%">+5%</div>
            <div class="gauge-tick top" style="left:66.7%">+10%</div>
            <div class="gauge-tick top" style="left:75.0%">+15%</div>
            <div class="gauge-tick top" style="left:83.3%">+20%</div>
            <div class="gauge-tick top" style="left:91.7%">+25%</div>
            <div class="gauge-tick top" style="left:100.0%">+30%</div>
          </div>
          <div class="rsi-legend" style="margin-top:10px;text-align:center">触及均线为观察点，低于均线越低越买</div>
        </div>
      </div>
      <div class="tech-cell">
        <div class="tech-label">550日均线</div>
        <div class="rsi-hint {ma_hint(diff550)[0]}">{ma_hint(diff550)[1]}</div>
        <div class="tech-num" style="color:{ma_dot_color(diff550)}">{ma550:.4f}</div>
        <div class="tech-dev" style="color:{ma_dot_color(diff550)}">净值偏离 {diff550:+.2f}%</div>
                <div class="gauge-wrap">
          <div class="gauge-obs-label" style="left:{ma_bar_pos(0):.1f}%">▼观察点</div>
          <div class="gauge-bar gauge-bar-ma">
            <div class="gauge-mark obs" style="left:{ma_bar_pos(0):.1f}%"></div>
            <div class="gauge-mark buy" style="left:41.7%"></div>
            <div class="gauge-mark buy" style="left:33.3%"></div>
            <div class="gauge-mark buy" style="left:25.0%"></div>
            <div class="gauge-mark buy" style="left:16.7%"></div>
            <div class="gauge-mark buy" style="left:8.3%"></div>
            <div class="gauge-dot" style="left:{ma_bar_pos(diff550):.1f}%;color:{ma_dot_color(diff550)}"></div>
          </div>
          <div class="gauge-ticks">
            <div class="gauge-tick top" style="left:0.0%">-30%</div>
            <div class="gauge-tick top" style="left:8.3%">-25%</div>
            <div class="gauge-tick top" style="left:16.7%">-20%</div>
            <div class="gauge-tick top" style="left:25.0%">-15%</div>
            <div class="gauge-tick top" style="left:33.3%">-10%</div>
            <div class="gauge-tick top" style="left:41.7%">-5%</div>
            <div class="gauge-tick top" style="left:50.0%">+0%</div>
            <div class="gauge-tick top" style="left:58.3%">+5%</div>
            <div class="gauge-tick top" style="left:66.7%">+10%</div>
            <div class="gauge-tick top" style="left:75.0%">+15%</div>
            <div class="gauge-tick top" style="left:83.3%">+20%</div>
            <div class="gauge-tick top" style="left:91.7%">+25%</div>
            <div class="gauge-tick top" style="left:100.0%">+30%</div>
          </div>
          <div class="rsi-legend" style="margin-top:10px;text-align:center">触及均线为观察点，低于均线越低越买</div>
        </div>
      </div>
      <div class="tech-cell">
        <div class="tech-label">6日RSI</div>
        <div class="rsi-hint {rsi_hint_6d(rsi_6d)[0]}">{rsi_hint_6d(rsi_6d)[1]}</div>
        <div class="tech-num" style="color:{rsi_gradient_color_6d(rsi_6d)}">{rsi_6d:.1f}</div>
        <div class="tech-dev" style="color:{rsi_gradient_color_6d(rsi_6d)}">RSI偏离 {rsi_6d-25:+.1f}%</div>
                <div class="gauge-wrap">
          <div class="gauge-obs-label" style="left:25%">▼观察点</div>
          <div class="gauge-bar gauge-bar-6d">
            <div class="gauge-mark obs" style="left:25%"></div>
            <div class="gauge-mark buy" style="left:20%"></div>
            <div class="gauge-mark buy" style="left:15%"></div>
            <div class="gauge-mark buy" style="left:10%"></div>
            <div class="gauge-mark buy" style="left:5%"></div>
            <div class="gauge-dot" style="left:{rsi_6d:.1f}%;color:{rsi_gradient_color_6d(rsi_6d)}"></div>
          </div>
          <div class="gauge-ticks">
            <div class="gauge-tick top" style="left:5%">5</div>
            <div class="gauge-tick top" style="left:10%">10</div>
            <div class="gauge-tick top" style="left:15%">15</div>
            <div class="gauge-tick top" style="left:20%">20</div>
            <div class="gauge-tick top" style="left:25%">25</div>
            <div class="gauge-tick top" style="left:50%">50</div>
            <div class="gauge-tick top" style="left:75%">75</div>
            </div>
          <div class="rsi-legend" style="margin-top:10px;text-align:center">25为观察点，低于25越低越买：20/15/10/5</div>
        </div>
      </div>
      <div class="tech-cell">
        <div class="tech-label">7周RSI</div>
        <div class="rsi-hint {rsi_hint_7w(rsi_7w)[0]}">{rsi_hint_7w(rsi_7w)[1]}</div>
        <div class="tech-num" style="color:{rsi_gradient_color_7w(rsi_7w)}">{rsi_7w:.1f}</div>
        <div class="tech-dev" style="color:{rsi_gradient_color_7w(rsi_7w)}">RSI偏离 {rsi_7w-40:+.1f}%</div>
                <div class="gauge-wrap">
          <div class="gauge-obs-label" style="left:40%">▼观察点</div>
          <div class="gauge-bar gauge-bar-7w">
            <div class="gauge-mark obs" style="left:40%"></div>
            <div class="gauge-mark buy" style="left:35%"></div>
            <div class="gauge-mark buy" style="left:30%"></div>
            <div class="gauge-mark buy" style="left:25%"></div>
            <div class="gauge-mark buy" style="left:20%"></div>
            <div class="gauge-mark buy" style="left:15%"></div>
            <div class="gauge-mark buy" style="left:10%"></div>
            <div class="gauge-mark buy" style="left:5%"></div>
            <div class="gauge-dot" style="left:{rsi_7w:.1f}%;color:{rsi_gradient_color_7w(rsi_7w)}"></div>
          </div>
          <div class="gauge-ticks">
            <div class="gauge-tick top" style="left:5%">5</div>
            <div class="gauge-tick top" style="left:10%">10</div>
            <div class="gauge-tick top" style="left:15%">15</div>
            <div class="gauge-tick top" style="left:20%">20</div>
            <div class="gauge-tick top" style="left:25%">25</div>
            <div class="gauge-tick top" style="left:30%">30</div>
            <div class="gauge-tick top" style="left:35%">35</div>
            <div class="gauge-tick top" style="left:40%">40</div>
            <div class="gauge-tick top" style="left:50%">50</div>
            <div class="gauge-tick top" style="left:75%">75</div>
            </div>
          <div class="rsi-legend" style="margin-top:10px;text-align:center">40为观察点，低于40越低越买：35/30/25/20/15/10/5</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MAIN GRID ROW 1 -->
<div class="main-grid">
  <!-- NAV & Performance -->
  <div class="card">
    <h3 style="color:#0ea882">净值与阶段收益</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px">
      <div><span style="color:#5a6070;font-size:13px">最新净值</span><br><b style="font-size:20px">{nav:.4f}</b></div>
      <div><span style="color:#5a6070;font-size:13px">净值日期</span><br><b style="font-size:16px">{nav_date}</b></div>
      <div><span style="color:#5a6070;font-size:13px">开盘</span><br><b>{nav_open:.4f}</b></div>
      <div><span style="color:#5a6070;font-size:13px">最高 / 最低</span><br><b>{nav_high:.4f} / {nav_low:.4f}</b></div>
    </div>
    <table>
      <tr><th>阶段</th><th>收益率</th><th>走势</th></tr>
'''
for label in ['近1周','近1月','近3月','近6月','近1年','近2年']:
    r = returns.get(label, 0)
    bar_len = min(int(abs(r)*3), 35)
    bar = '█' * bar_len
    clr = '#0ea882' if r >= 0 else '#d64555'
    html += f'      <tr><td>{label}</td><td style="color:{clr};font-weight:700">{r:+.2f}%</td><td style="font-size:11px;color:{clr}">{bar}</td></tr>\n'

html += f'''    </table>
  </div>

  <!-- Risk -->
  <div class="card">
    <h3 style="color:#d64555">风险指标</h3>
    <div style="margin-bottom:24px">
      <div style="font-size:13px;color:#5a6070;margin-bottom:4px">年化波动率 (20日)</div>
      <div style="font-size:32px;font-weight:800;color:#111">{vol_20d:.2f}%</div>
    </div>
    <div style="margin-bottom:24px">
      <div style="font-size:13px;color:#5a6070;margin-bottom:4px">年化波动率 (60日)</div>
      <div style="font-size:32px;font-weight:800;color:#111">{vol_60d:.2f}%</div>
    </div>
    <div>
      <div style="font-size:13px;color:#5a6070;margin-bottom:4px">近1年最大回撤</div>
      <div style="font-size:32px;font-weight:800;color:#d64555">{max_dd:.2f}%</div>
    </div>
  </div>
</div>

<!-- Peer comparison -->
<div class="main-grid">
  <div class="card" style="grid-column:1/-1">
    <h3 style="color:#3168d8">同类红利ETF近1年收益对比</h3>
    <table>
      <tr><th>排名</th><th>名称</th><th style="text-align:right">近1年收益</th><th></th></tr>
'''
for rank, (pname, pret, is_self) in enumerate(peer_results, 1):
    flag = '★当前' if is_self else ''
    clr = '#0ea882' if pret >= 0 else '#d64555'
    row_style = 'background:#f8fafb;' if is_self else ''
    html += f'      <tr style="{row_style}"><td>{rank}</td><td>{pname}</td><td style="text-align:right;color:{clr};font-weight:700">{pret:+.2f}%</td><td style="color:#0ea882;font-weight:700">{flag}</td></tr>\n'

html += '''    </table>
  </div>
</div>

<!-- Industry breakdown -->
<div class="wide-card">
  <h3 style="color:#0ea882">成分行业分布（按权重倒排）</h3>
'''
total_w = sum(industries.values()) if industries else 1
sorted_ind = sorted(industries.items(), key=lambda x: x[1], reverse=True)
for ind, w in sorted_ind:
    pct = w / total_w * 100
    html += f'''  <div class="ind-bar-wrap">
    <div class="ind-name">{ind}</div>
    <div class="ind-pct">{pct:.1f}%</div>
    <div class="ind-bar-bg"><div class="ind-bar-fill" style="width:{pct:.1f}%"></div></div>
  </div>
'''

# Industry summary
ind_total = sum(industries.values())
ind_lines = []
for ind, w in sorted_ind[:5]:
    ind_lines.append(f'{ind} {w/ind_total*100:.1f}%')
ind_summary = ' | '.join(ind_lines)

html += f'''  <div style="margin-top:14px;font-size:13px;color:#5a6070">
    前5大行业权重合计 {sum(w for _, w in sorted_ind[:5])/ind_total*100:.1f}%
  </div>
</div>

<!-- Top holdings table -->
<div class="wide-card">
  <h3 style="color:#0ea882">成分股及持仓占比（按权重倒排）</h3>
  <div style="font-size:13px;color:#5a6070;margin-bottom:12px">
    数据来源: 基金2026年1季度报告 | 共 {len(stock_data)} 只 |
    PE加权 {pe_w:.1f} | PB加权 {pb_w:.1f} | 股息率加权 {dv_w:.1f}%
  </div>
  <table>
    <tr><th>代码</th><th>名称</th><th style="text-align:right">权重</th><th style="text-align:right">PE</th><th style="text-align:right">PB</th><th style="text-align:right">股息率</th><th>行业</th></tr>
'''

stock_data.sort(key=lambda x: x[2], reverse=True)
for sc, sname, w, pe, pb, dv, ind in stock_data:
    pe_str = f'{pe:.2f}' if pe else '--'
    pb_str = f'{pb:.2f}' if pb else '--'
    dv_str = f'{dv:.2f}%' if dv else '--'
    dv_cls = 'green' if (dv and dv > 3) else 'red' if (dv and dv < 1.5) else ''
    html += f'    <tr><td>{sc}</td><td style="font-weight:700;color:#111">{sname}</td><td style="text-align:right;font-weight:700;color:#111">{w:.2f}%</td><td style="text-align:right">{pe_str}</td><td style="text-align:right">{pb_str}</td><td style="text-align:right" class="{dv_cls}">{dv_str}</td><td style="font-size:13px;color:#5a6070">{ind}</td></tr>\n'

html += f'''  </table>
</div>

<div class="footer">
  {etf_name} (515450) 深度分析 | {today.strftime('%Y-%m-%d %H:%M')}<br>
  数据源: 新浪(行情) + 基金季报持仓 + baostock(估值/行业/股息)<br>
  重要声明: 本报告仅供投资参考，不构成投资建议。投资有风险，入市需谨慎。
</div>

</body>
</html>'''

# Write
output_path = f'd:\\AI漫剧制作\\红利低波50ETF_515450_深度分析.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f'Report written to: {output_path}')
print(f'NAV: {nav}, PE(w): {pe_w:.2f}, PB(w): {pb_w:.2f}, DV(w): {dv_w:.2f}%, RSI(6d): {rsi_6d:.1f}, RSI(7w): {rsi_7w:.1f}')
