#!/usr/bin/env python
"""
红利策略ETF深度分析工具
用法: python deep_scan.py <ETF代码>
示例: python deep_scan.py 515450 / 510880 / 159758

输出: 净值/股息率/PE/PB/RSI/均线/成分行业/成分股/收益/风险 共10项指标
数据源: 新浪(行情) + 中证指数(成分股) + baostock(估值/行业/股息)
"""

import sys, time
sys.stdout.reconfigure(encoding='utf-8')

import akshare as ak
import baostock as bs
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# ─── 配置 ───
ETF_MAP = {
    '510880': ('sh510880', '000015', '红利ETF华泰柏瑞', '上证红利'),
    '515180': ('sh515180', '000922', '红利ETF易方达', '中证红利'),
    '515080': ('sh515080', '000922', '中证红利ETF招商', '中证红利'),
    '515890': ('sh515890', '000922', '红利ETF博时', '中证红利'),
    '159905': ('sz159905', '399324', '红利ETF工银', '深证红利'),
    '512890': ('sh512890', '930955', '红利低波ETF华泰柏瑞', '红利低波'),
    '563020': ('sh563020', '930955', '红利低波ETF易方达', '红利低波'),
    '515100': ('sh515100', '930955', '红利低波100景顺', '红利低波100'),
    '515450': ('sh515450', '__FUND_HOLDINGS__', '红利低波50ETF南方', '标普中国A股大盘红利低波50'),
    '159758': ('sz159758', '931157', '红利质量ETF华夏', '红利质量'),
    '513630': ('sh513630', '930958', '港股红利ETF摩根', '港股红利'),
    '501029': ('sh501029', 'CSPSADRP', '华宝标普A股红利LOF', '标普A股红利'),
}

# ─── 参数 ───
if len(sys.argv) < 2:
    print("用法: python deep_scan.py <ETF代码>")
    print("可用:", ', '.join(ETF_MAP.keys()))
    sys.exit(1)

code = sys.argv[1]
if code not in ETF_MAP:
    print(f"未知代码 {code}，可用: {', '.join(ETF_MAP.keys())}")
    sys.exit(1)

sina_sym, index_code, etf_name, index_name = ETF_MAP[code]
today = datetime.now()

# ─── 初始化 baostock ───
bs_login = bs.login()
BS_OK = (bs_login.error_code == '0')

print(f"""
╔══════════════════════════════════════════════════════════╗
║  {etf_name} ({code}) 深度分析                             ║
║  跟踪: {index_name} ({index_code})                          ║
║  日期: {today.strftime('%Y-%m-%d')}                                         ║
╚══════════════════════════════════════════════════════════╝
""")

# ═══ [1] 历史价格 (新浪) ═══
print("⏳ [1/6] 拉取历史价格...", end=' ', flush=True)
df = ak.fund_etf_hist_sina(symbol=sina_sym)
df = df.sort_values('date')
df['date'] = pd.to_datetime(df['date'])
df['close'] = pd.to_numeric(df['close'])
latest = df.iloc[-1]
nav = float(latest['close'])
print(f"✔ {len(df)} 个交易日")

# ═══ 净值 ═══
print("\n" + "─"*55)
print("📊 一、净值与交易")
print(f"  最新净值:     {nav:.4f}")
print(f"  净值日期:     {latest['date'].strftime('%Y-%m-%d')}")
print(f"  今日开盘:     {float(latest['open']):.4f}")
print(f"  最高/最低:    {float(latest['high']):.4f} / {float(latest['low']):.4f}")
try:
    print(f"  今日成交额:   {float(latest['amount'])/1e4:,.0f} 万元")
except:
    pass

# ═══ 技术指标 ═══
print("\n" + "─"*55)
print("📊 二、技术指标")

close_s = df.set_index('date')['close']

for period, label in [(250, '250日均线(年线)'), (550, '550日均线')]:
    if len(df) >= period:
        ma = float(df['close'].tail(period).mean())
        diff = (nav - ma) / ma * 100
        pos = "↑高于" if diff > 0 else "↓低于"
        print(f"  {label}: {ma:.4f}  {pos}{abs(diff):.2f}%")
    else:
        print(f"  {label}: 数据不足(仅{len(df)}天)")

def calc_rsi(series, period):
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = (-delta).clip(lower=0)
    avg_gain = gain.ewm(alpha=1/period, min_periods=period).mean()
    avg_loss = loss.ewm(alpha=1/period, min_periods=period).mean()
    rs = avg_gain / avg_loss
    return float(100 - 100/(1+rs).iloc[-1])

rsi_6d = calc_rsi(close_s, 6)
print(f"  6日RSI:      {rsi_6d:.2f}  ", end='')
print("⚠超买" if rsi_6d>70 else "📉超卖" if rsi_6d<30 else "偏强" if rsi_6d>50 else "偏弱")

weekly = close_s.resample('W').last().dropna()
if len(weekly) >= 7:
    rsi_7w = calc_rsi(weekly, 7)
    print(f"  7周RSI:      {rsi_7w:.2f}  ", end='')
    print("⚠超买" if rsi_7w>70 else "📉超卖" if rsi_7w<30 else "偏强" if rsi_7w>50 else "偏弱")

# ═══ 阶段收益 ═══
print("\n" + "─"*55)
print("📊 三、阶段收益")
for label, days in [('近1周',7),('近1月',30),('近3月',90),('近6月',180),('近1年',365),('近2年',730)]:
    target = today - timedelta(days=days)
    pre = df[df['date'] <= pd.Timestamp(target)]
    if not pre.empty:
        prev = float(pre.iloc[-1]['close'])
        ret = (nav - prev) / prev * 100
        bar = '█' * min(int(abs(ret)*3), 35)
        print(f"  {label:<8s}: {ret:+7.2f}%  {bar}")

# ═══ [2] 成分股+权重 ═══
print("\n" + "─"*55)
print("📊 四、估值指标 (PE/PB/股息率)")
print("  ⏳ [2/6] 拉取成分股及权重...", end=' ', flush=True)

stock_codes, stock_names, weight_map = [], [], {}
USE_FUND_HOLDINGS = (index_code == '__FUND_HOLDINGS__')
data_source_note = ''

if USE_FUND_HOLDINGS:
    # 标普指数成分股无法通过akshare获取,改用基金季报持仓
    try:
        df_hold = ak.fund_portfolio_hold_em(symbol=code, date=str(today.year))
        for _, row in df_hold.iterrows():
            sc = row['股票代码']
            sname = row['股票名称']
            w = float(row['占净值比例'])
            if w > 0.01:  # 过滤IPO申购等零仓位
                stock_codes.append(sc)
                stock_names.append(sname)
                weight_map[sc] = w
        data_source_note = '数据来源: 基金定期报告持仓'
        print(f"✔ {len(stock_codes)} 只 (基金季报披露持仓)")
    except Exception as e:
        print(f"❌ 基金持仓获取失败: {e}")
else:
    try:
        df_cons = ak.index_stock_cons_csindex(symbol=index_code)
        stock_codes = df_cons['成分券代码'].tolist()
        stock_names = df_cons['成分券名称'].tolist()
        # 权重
        try:
            df_w = ak.index_stock_cons_weight_csindex(symbol=index_code)
            latest_w = df_w['日期'].max()
            df_w = df_w[df_w['日期'] == latest_w]
            for _, row in df_w.iterrows():
                weight_map[str(row['成分券代码'])] = float(row['权重'])
        except:
            pass
        print(f"✔ {len(stock_codes)} 只 (权重{len(weight_map)}只)")
    except Exception as e:
        print(f"❌ {e}")

# ═══ [3] PE/PB/股息率+行业 (baostock) ═══
stock_data = []  # [(code, name, weight%, pe, pb, dv%, industry)]
industries = {}
bs_success = 0

if BS_OK and stock_codes:
    print("  ⏳ [3/6] baostock 拉取估值/行业/股息...", end=' ', flush=True)

    # 先获取全量行业映射
    industry_map = {}
    try:
        rs_ind = bs.query_stock_industry()
        if rs_ind.error_code == '0':
            ind_df = rs_ind.get_data()
            for _, row in ind_df.iterrows():
                code_raw = row['code']
                short_code = code_raw.split('.')[-1] if '.' in code_raw else code_raw
                industry_map[short_code] = row['industry']
    except:
        pass

    date_str = (today - timedelta(days=5)).strftime('%Y-%m-%d')

    for i, sc in enumerate(stock_codes):
        stock_price = None
        pe_v, pb_v, dv_v = None, None, None
        try:
            if sc.startswith('6') or sc.startswith('5'):
                bs_code = f'sh.{sc}'
            elif sc.startswith('0') or sc.startswith('3') or sc.startswith('1'):
                bs_code = f'sz.{sc}'
            else:
                continue

            # PE/PB
            rs_k = bs.query_history_k_data_plus(
                code=bs_code, fields='date,close,peTTM,pbMRQ',
                start_date=date_str,
                end_date=today.strftime('%Y-%m-%d'),
                frequency='d', adjustflag='2'
            )
            if rs_k.error_code == '0':
                kdf = rs_k.get_data()
                if not kdf.empty:
                    last = kdf.iloc[-1]
                    stock_price = float(last['close']) if last['close'] else None
                    pe_str, pb_str = last['peTTM'], last['pbMRQ']
                    if pe_str and pe_str != '':
                        pe_v = float(pe_str)
                    if pb_str and pb_str != '':
                        pb_v = float(pb_str)

            # 行业
            ind = industry_map.get(sc, '')

            # 股息率 — 按预案公告日期归属财报年度,取最新完整财年
            # 规则: 预案月份1-4→前一年财年年报分红, 5-12→当年财年中期/特别分红
            # 完整性: FY N需要(N+1)年3-4月年报数据已入库(1-2月可能是特别分红,不可靠)
            try:
                dps_by_fy = {}  # {fiscal_year: total_dps}
                has_annual = set()  # 哪些财年有3-4月年报公告
                for report_yr in [str(today.year-2), str(today.year-1), str(today.year)]:
                    rs_dv = bs.query_dividend_data(code=bs_code, year=report_yr, yearType='report')
                    if rs_dv.error_code != '0':
                        continue
                    ddf = rs_dv.get_data()
                    if ddf.empty:
                        continue
                    for _, dr in ddf.iterrows():
                        v = dr.get('dividCashPsBeforeTax', 0)
                        if v is None or v == '':
                            continue
                        try:
                            dps_val = float(v)
                        except:
                            continue
                        ann_date = str(dr.get('dividPlanAnnounceDate', ''))
                        if ann_date and ann_date != 'nan' and len(ann_date) >= 7:
                            try:
                                ann_month = int(ann_date[5:7])
                            except:
                                ann_month = 0
                        else:
                            ann_month = 0
                        if 1 <= ann_month <= 4:
                            fy = int(report_yr) - 1  # 年报/特别分红→上一财年
                            if ann_month >= 3:        # 3-4月才是年报窗口,1-2月不可靠
                                has_annual.add(fy)
                        elif 5 <= ann_month <= 12:
                            fy = int(report_yr)        # 中期/特别分红→当年财年
                        else:
                            fy = int(report_yr) - 1
                        dps_by_fy[fy] = dps_by_fy.get(fy, 0) + dps_val

                if dps_by_fy:
                    # 从最新财年开始,找第一个有3-4月年报公告的完整财年
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

            # 保存
            sname = stock_names[i] if i < len(stock_names) else ''
            w = weight_map.get(sc, 0)
            stock_data.append((sc, sname, w, pe_v, pb_v, dv_v, ind))
            if ind:
                industries[ind] = industries.get(ind, 0) + w  # 按权重累加

            bs_success += 1
        except:
            pass

        if (i+1) % 10 == 0:
            print(f"\n    ... {i+1}/{len(stock_codes)}", end='', flush=True)
        time.sleep(0.05)

    print(f"  (成功: {bs_success}/{len(stock_codes)})")

# 计算加权估值
pe_list_raw = [s[3] for s in stock_data if s[3] is not None]
pb_list_raw = [s[4] for s in stock_data if s[4] is not None]
dv_list_raw = [s[5] for s in stock_data if s[5] is not None]

if pe_list_raw:
    pe_median = np.median(pe_list_raw)
    pe_mean = np.mean(pe_list_raw)
    pe_p25 = np.percentile(pe_list_raw, 25)
    pe_p75 = np.percentile(pe_list_raw, 75)
    # 加权PE (harmonic-like: weighted sum / sum of weights)
    pe_weighted = sum(s[3]*s[2] for s in stock_data if s[3] is not None and s[2] > 0)
    pe_w_sum = sum(s[2] for s in stock_data if s[3] is not None and s[2] > 0)
    pe_w = pe_weighted / pe_w_sum if pe_w_sum > 0 else pe_mean
    print(f"\n  市盈率(PE TTM):")
    print(f"    加权均值: {pe_w:.2f}  |  简单均值: {pe_mean:.2f}  |  中位数: {pe_median:.2f}")
    print(f"    区间:     {pe_p25:.2f} ~ {pe_p75:.2f}  (25%-75%分位)")
else:
    print(f"\n  市盈率(PE):  未获取到")

if pb_list_raw:
    pb_median = np.median(pb_list_raw)
    pb_mean = np.mean(pb_list_raw)
    pb_p25 = np.percentile(pb_list_raw, 25)
    pb_p75 = np.percentile(pb_list_raw, 75)
    pb_weighted = sum(s[4]*s[2] for s in stock_data if s[4] is not None and s[2] > 0)
    pb_w_sum = sum(s[2] for s in stock_data if s[4] is not None and s[2] > 0)
    pb_w = pb_weighted / pb_w_sum if pb_w_sum > 0 else pb_mean
    print(f"\n  市净率(PB):")
    print(f"    加权均值: {pb_w:.2f}  |  简单均值: {pb_mean:.2f}  |  中位数: {pb_median:.2f}")
    print(f"    区间:     {pb_p25:.2f} ~ {pb_p75:.2f}  (25%-75%分位)")
else:
    print(f"\n  市净率(PB):  未获取到")

if dv_list_raw:
    dv_median = np.median(dv_list_raw)
    dv_mean = np.mean(dv_list_raw)
    dv_weighted = sum(s[5]*s[2] for s in stock_data if s[5] is not None and s[2] > 0)
    dv_w_sum = sum(s[2] for s in stock_data if s[5] is not None and s[2] > 0)
    dv_w = dv_weighted / dv_w_sum if dv_w_sum > 0 else dv_mean
    print(f"\n  股息率:")
    print(f"    加权均值: {dv_w:.2f}%  |  简单均值: {dv_mean:.2f}%  |  中位数: {dv_median:.2f}%")
else:
    print(f"\n  股息率:      未获取到 (成分股分红数据不足)")

if not BS_OK:
    print(f"\n  ⚠ baostock 未连接，估值数据跳过")

# ═══ 成分行业 ═══
print("\n" + "─"*55)
print("📊 五、成分行业及持仓占比（按权重倒排）")

if industries:
    total_w = sum(industries.values())
    sorted_ind = sorted(industries.items(), key=lambda x: x[1], reverse=True)
    print(f"  {'行业':<24s} {'权重':>8s}  {'分布'}")
    print(f"  {'─'*52}")
    for ind, w in sorted_ind:
        pct = w / total_w * 100
        bar = '█' * int(pct)
        print(f"  {ind:<24s} {pct:>6.1f}%  {bar}")
elif stock_codes:
    print("  (行业数据未获取到)")
else:
    print("  (成分股数据不可用)")

# ═══ 成分股列表 ═══
print("\n" + "─"*55)
print("📊 六、成分股及持仓占比（按权重倒排）")

if stock_data:
    # 按权重倒排
    stock_data.sort(key=lambda x: x[2], reverse=True)

    has_pe = any(s[3] is not None for s in stock_data)
    has_pb = any(s[4] is not None for s in stock_data)
    has_dv = any(s[5] is not None for s in stock_data)

    header = f"  {'代码':<10s}{'名称':<14s}{'权重%':>8s}"
    if has_pe: header += f"{'PE':>8s}"
    if has_pb: header += f"{'PB':>8s}"
    if has_dv: header += f"{'股息%':>8s}"
    print(header)
    print(f"  {'─'*(38 + 8*has_pe + 8*has_pb + 8*has_dv)}")
    for sd in stock_data:
        sc, sn, w, pe, pb, dv, ind = sd
        line = f"  {sc:<10s}{sn:<14s}{w:>7.2f}%"
        if has_pe: line += f"{pe:>8.2f}" if pe else f"{'--':>8s}"
        if has_pb: line += f"{pb:>8.2f}" if pb else f"{'--':>8s}"
        if has_dv: line += f"{dv:>7.2f}%" if dv else f"{'--':>8s}"
        print(line)
elif stock_codes:
    print(f"  {'序号':<5s}{'代码':<10s}{'名称':<16s}")
    for i in range(min(len(stock_codes), 50)):
        sname = stock_names[i] if i < len(stock_names) else ''
        print(f"  {i+1:<5d}{stock_codes[i]:<10s}{sname:<16s}")

# ═══ 风险 ═══
print("\n" + "─"*55)
print("📊 七、风险指标")

log_ret = np.log(close_s / close_s.shift(1)).dropna()
vol_20d = float(log_ret.tail(20).std() * np.sqrt(252) * 100)
vol_60d = float(log_ret.tail(60).std() * np.sqrt(252) * 100)
print(f"  年化波动率(20日):  {vol_20d:.2f}%")
print(f"  年化波动率(60日):  {vol_60d:.2f}%")

if len(df) > 250:
    close_1y = df['close'].tail(250).values
    peak = close_1y[0]
    max_dd = 0
    for p in close_1y:
        if p > peak: peak = p
        dd = (peak - p) / peak * 100
        if dd > max_dd: max_dd = dd
    print(f"  近1年最大回撤:     {max_dd:.2f}%")

# ═══ 同类对比 ═══
print("\n" + "─"*55)
print("📊 八、同类红利ETF近1年收益对比")
print("  ⏳ [4/6] 拉取同类数据...", end=' ', flush=True)

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

results = []
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
                results.append((pname, pret, pcode == code))
        time.sleep(0.3)
    except:
        pass

results.sort(key=lambda x: x[1], reverse=True)
print("✔")
print(f"\n  {'排名':<5s}{'名称':<22s}{'近1年':>8s}")
print(f"  {'─'*37}")
for rank, (pname, pret, is_self) in enumerate(results, 1):
    flag = ' ★当前' if is_self else ''
    print(f"  {rank:<5d}{pname:<22s}{pret:+7.2f}%{flag}")

# ─── 清理 ───
if BS_OK:
    bs.logout()

ds_label = '基金季报持仓' if USE_FUND_HOLDINGS else '中证指数(成分股)'
print(f"""
{'='*55}
  分析完成 | {today.strftime('%Y-%m-%d %H:%M')}
  数据源: 新浪(行情) + {ds_label} + baostock(估值/行业/股息)
  脚本: python deep_scan.py {code}
{'='*55}
""")
