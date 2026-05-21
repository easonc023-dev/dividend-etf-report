#!/usr/bin/env python
"""多红利策略ETF深度分析 — 生成带Tab切换的HTML静态报告"""
import sys, time, traceback
sys.stdout.reconfigure(encoding='utf-8')

import akshare as ak
import baostock as bs
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

today = datetime.now()

# ═══════════════════════════════════════════════════════════════
# 产品配置表
# ═══════════════════════════════════════════════════════════════
# type: etf_a / etf_hk / feeder_a / feeder_hk / index_fund / mixed_fund
# feeder 类使用底层ETF数据；etf_hk/feeder_hk 因港股baostock不支持PE/PB/DV
# ═══════════════════════════════════════════════════════════════

PRODUCTS = [

    # -- 能源/资源红利 --

    {
        'code': '021961', 'display_code': '520990',
        'name': '景顺长城中证国新港股通央企红利ETF联接A',
        'tab': '国新红利',
        'category': '能源/资源红利',
        'type': 'feeder_hk',
        'sina_sym': 'sh520990',
        'index_name': '中证国新港股通央企红利',
    },
    {
        'code': '021881',
        'name': '鑫元华证沪深港红利50指数A',
        'tab': '沪深港红利50',
        'category': '能源/资源红利',
        'type': 'index_fund_hk',
        'sina_sym': None,
        'index_name': '华证沪深港红利50',
    },
    {
        'code': '020866', 'display_code': '513920',
        'name': '华安恒生港股通中国央企红利ETF联接A',
        'tab': '港股通央企红利',
        'category': '能源/资源红利',
        'type': 'feeder_hk',
        'sina_sym': 'sh513920',
        'index_name': '恒生港股通中国央企红利',
    },
    {
        'code': '016185', 'display_code': '159611',
        'name': '广发电力公用事业ETF联接A',
        'tab': '电力公用事业',
        'category': '能源/资源红利',
        'type': 'feeder_a',
        'sina_sym': 'sz159611',
        'index_name': '中证电力公用事业',
    },
    {
        'code': '009051', 'display_code': '515180',
        'name': '易方达中证红利ETF联接A',
        'tab': '中证红利',
        'category': '能源/资源红利',
        'type': 'feeder_a',
        'sina_sym': 'sh515180',
        'index_name': '中证红利(000922)',
    },

    # -- 常规红利 --

    {
        'code': '014771',
        'name': '中泰红利优选一年持有期混合',
        'tab': '中泰红利优选',
        'category': '常规红利',
        'type': 'mixed_fund',
        'sina_sym': None,
        'index_name': None,
    },
    {
        'code': '020602', 'display_code': '563020',
        'name': '易方达红利低波ETF联接A',
        'tab': '红利低波(易方达)',
        'category': '常规红利',
        'type': 'feeder_a',
        'sina_sym': 'sh563020',
        'index_name': '红利低波(930955)',
    },
    {
        'code': '012708', 'display_code': '931446',
        'name': '东方红中证东方红红利低波动指数A',
        'tab': '东证红利低波',
        'category': '常规红利',
        'type': 'index_fund_a',
        'sina_sym': None,
        'index_name': '东证红利低波(931446)',
        'csi_index': '931446',
    },
    {
        'code': '515450',
        'name': '红利低波50ETF南方',
        'tab': '红利低波50',
        'category': '常规红利',
        'type': 'etf_a',
        'sina_sym': 'sh515450',
        'index_name': '标普中国A股大盘红利低波50',
    },
]

# ═══════════════════════════════════════════════════════════════
# 工具函数
# ═══════════════════════════════════════════════════════════════

def calc_rsi(series, period):
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = (-delta).clip(lower=0)
    avg_gain = gain.ewm(alpha=1/period, min_periods=period).mean()
    avg_loss = loss.ewm(alpha=1/period, min_periods=period).mean()
    rs = avg_gain / avg_loss
    return float(100 - 100/(1+rs).iloc[-1])

def weighted_avg(vals, weights):
    num = sum(v*w for v,w in zip(vals, weights) if v is not None and w > 0)
    den = sum(w for v,w in zip(vals, weights) if v is not None and w > 0)
    return num/den if den > 0 else 0

# hint/color helpers (复用原有逻辑)
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

def rsi_gradient_color_6d(rsi):
    if rsi >= 70: return '#0EA882'
    if rsi >= 50: return '#C88A0C'
    if rsi >= 35: return '#E07040'
    if rsi >= 25: return '#E04558'
    if rsi >= 15: return '#C0392B'
    return '#7B1818'

def rsi_gradient_color_7w(rsi):
    if rsi >= 75: return '#0EA882'
    if rsi >= 60: return '#C88A0C'
    if rsi >= 50: return '#E07040'
    if rsi >= 40: return '#E04558'
    if rsi >= 25: return '#A93226'
    return '#7B1818'

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

# ═══════════════════════════════════════════════════════════════
# 综合买入信号评分（纯技术指标）
# ═══════════════════════════════════════════════════════════════

def _score_segment(value, levels):
    """通用分段线性评分: levels=[(upper_bound, score), ...] 从高到低"""
    for i, (bound, score) in enumerate(levels):
        if value >= bound:
            if i == 0:
                return 0.0
            prev_bound, prev_score = levels[i-1]
            return prev_score + (prev_bound - value) / (prev_bound - bound) * (score - prev_score)
    # 低于最后一档, 线性延伸
    last_bound, last_score = levels[-1]
    prev_bound, prev_score = levels[-2]
    extrap = prev_score + (prev_bound - value) / (prev_bound - last_bound) * (last_score - prev_score)
    return min(100.0, max(0.0, extrap))

RSI6_LEVELS  = [(50, 0), (30, 40), (20, 70), (0, 100)]
RSI7_LEVELS  = [(50, 0), (35, 40), (25, 70), (0, 100)]
MA_LEVELS    = [(0, 0), (-5, 50), (-15, 80), (-30, 100)]

def calc_composite_score(d):
    """根据4个技术指标计算加权综合买入信号分 (0-100)"""
    rsi6  = _score_segment(d.get('rsi_6d', 50), RSI6_LEVELS)
    rsi7  = _score_segment(d.get('rsi_7w', 50), RSI7_LEVELS)
    ma250 = _score_segment(d.get('diff250', 0), MA_LEVELS)
    ma550 = _score_segment(d.get('diff550', 0), MA_LEVELS)

    # RSI7周 ×2, MA250偏离 ×2, RSI6日 ×1, MA550偏离 ×1
    composite = (rsi6 * 1 + rsi7 * 2 + ma250 * 2 + ma550 * 1) / 6.0

    if composite >= 60:   grade = 'buy'
    elif composite >= 40: grade = 'watch'
    else:                 grade = 'safe'

    return {
        'rsi6_score': round(rsi6, 1), 'rsi7_score': round(rsi7, 1),
        'ma250_score': round(ma250, 1), 'ma550_score': round(ma550, 1),
        'composite': round(composite, 1), 'grade': grade,
    }

def grade_label(grade):
    if grade == 'buy':   return '买入信号'
    if grade == 'watch': return '观察期'
    return '无需关注'

def indicator_signal_rsi(rsi, obs):
    """技术指标微型信号"""
    if rsi <= obs - 5:  return 'buy'
    if rsi <= obs:      return 'watch'
    return 'safe'

def indicator_signal_ma(dev):
    if dev <= -10: return 'buy'
    if dev <= 0:   return 'watch'
    return 'safe'

SIGNAL_COLORS = {'buy': '#c62828', 'watch': '#e07040', 'safe': '#6b7280'}

def signal_dot(sig):
    """信号对应的颜色圆点"""
    c = SIGNAL_COLORS.get(sig, '#6b7280')
    return '<span style="color:%s;font-size:16px">●</span>' % c

# ═══════════════════════════════════════════════════════════════
# 行情获取（带重试）
# ═══════════════════════════════════════════════════════════════

def get_etf_price(sina_sym, max_retries=3):
    """获取ETF行情数据，含重试"""
    for attempt in range(max_retries):
        try:
            df = ak.fund_etf_hist_sina(symbol=sina_sym)
            df = df.sort_values('date')
            df['date'] = pd.to_datetime(df['date'])
            df['close'] = pd.to_numeric(df['close'])
            return df
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2 * (attempt + 1))
            else:
                raise e

def get_fund_nav(code):
    """获取场外基金净值走势"""
    try:
        df = ak.fund_open_fund_info_em(symbol=code, indicator='单位净值走势')
        if df is not None and not df.empty:
            # 列: ['净值日期', '单位净值', '日增长率']
            df.columns = ['date', 'nav', 'daily_return']
            df['date'] = pd.to_datetime(df['date'])
            df['nav'] = pd.to_numeric(df['nav'])
            df = df.sort_values('date')
            df['close'] = df['nav']  # 统一字段名
            return df
    except:
        pass
    return None

# ═══════════════════════════════════════════════════════════════
# 核心：单产品数据采集
# ═══════════════════════════════════════════════════════════════

def collect_product_data(p, industry_map):
    """采集单个产品的全部数据，返回 data dict"""
    d = {
        'code': p['code'],
        'display_code': p.get('display_code', p['code']),
        'name': p['name'],
        'tab': p['tab'],
        'category': p['category'],
        'type': p['type'],
        'index_name': p['index_name'],
        'error': None,
    }

    try:
        _collect_inner(d, p, industry_map)
    except Exception as e:
        d['error'] = str(e)
        traceback.print_exc()

    return d

def _collect_inner(d, p, industry_map):
    ptype = p['type']
    code = d['display_code']
    is_hk = ptype in ('etf_hk', 'feeder_hk', 'index_fund_hk')
    no_baostock = ptype in ('etf_hk', 'feeder_hk', 'index_fund_hk', 'mixed_fund')
    use_fund_nav = ptype in ('index_fund_a', 'index_fund_hk', 'mixed_fund')

    # -- 1. 行情数据 --
    if use_fund_nav:
        df = get_fund_nav(p['code'])
        if df is None:
            raise Exception('基金净值获取失败')
        price_source = '基金净值'
    else:
        df = get_etf_price(p['sina_sym'])
        price_source = 'ETF行情'

    close_s = df.set_index('date')['close']
    latest = df.iloc[-1]
    nav = float(latest['close'])
    nav_date = latest['date'].strftime('%Y-%m-%d')

    d['nav'] = nav
    d['nav_date'] = nav_date
    d['price_source'] = price_source
    d['data_days'] = len(df)

    # 交易数据（ETF才有开盘/最高/最低/成交额）
    if not use_fund_nav:
        d['nav_open'] = float(latest.get('open', nav))
        d['nav_high'] = float(latest.get('high', nav))
        d['nav_low'] = float(latest.get('low', nav))
        try:
            d['nav_amount'] = float(latest.get('amount', 0)) / 1e4
        except:
            d['nav_amount'] = 0
    else:
        d['nav_open'] = nav
        d['nav_high'] = nav
        d['nav_low'] = nav
        d['nav_amount'] = 0

    # -- 2. 技术指标 --
    ma250 = float(df['close'].tail(250).mean()) if len(df) >= 250 else nav
    ma550 = float(df['close'].tail(min(550, len(df))).mean())
    diff250 = (nav - ma250) / ma250 * 100
    diff550 = (nav - ma550) / ma550 * 100

    rsi_6d = calc_rsi(close_s, 6)
    weekly = close_s.resample('W').last().dropna()
    rsi_7w = calc_rsi(weekly, 7) if len(weekly) >= 7 else 50.0

    d['ma250'] = ma250
    d['ma550'] = ma550
    d['diff250'] = diff250
    d['diff550'] = diff550
    d['rsi_6d'] = rsi_6d
    d['rsi_7w'] = rsi_7w

    # -- 3. 阶段收益 --
    returns = {}
    for label, days in [('近1周',7),('近1月',30),('近3月',90),('近6月',180),('近1年',365),('近2年',730)]:
        target = today - timedelta(days=days)
        pre = df[df['date'] <= pd.Timestamp(target)]
        if not pre.empty:
            prev = float(pre.iloc[-1]['close'])
            returns[label] = (nav - prev) / prev * 100
        else:
            returns[label] = 0
    d['returns'] = returns

    # -- 4. 风险评估 --
    log_ret = np.log(close_s / close_s.shift(1)).dropna()
    d['vol_20d'] = float(log_ret.tail(20).std() * np.sqrt(252) * 100) if len(log_ret) >= 20 else 0
    d['vol_60d'] = float(log_ret.tail(60).std() * np.sqrt(252) * 100) if len(log_ret) >= 60 else 0

    if len(df) > 250:
        close_1y = df['close'].tail(250).values
        peak = close_1y[0]
        max_dd = 0
        for px in close_1y:
            if px > peak: peak = px
            dd = (peak - px) / peak * 100
            if dd > max_dd: max_dd = dd
        d['max_dd'] = max_dd
    else:
        d['max_dd'] = 0

    # -- 5. 持仓/成分股 --
    stock_codes, stock_names, weight_map = [], [], {}

    # 指基如果有中证指数代码优先用指数成分股
    if ptype == 'index_fund_a' and p.get('csi_index'):
        try:
            df_cons = ak.index_stock_cons_csindex(symbol=p['csi_index'])
            stock_codes = df_cons['成分券代码'].tolist()
            stock_names = df_cons['成分券名称'].tolist()
            try:
                df_w = ak.index_stock_cons_weight_csindex(symbol=p['csi_index'])
                latest_w = df_w['日期'].max()
                df_w = df_w[df_w['日期'] == latest_w]
                for _, row in df_w.iterrows():
                    weight_map[str(row['成分券代码'])] = float(row['权重'])
            except:
                pass
        except:
            pass

    # 其他情况以及fallback：基金季报持仓
    if not stock_codes:
        try:
            df_hold = ak.fund_portfolio_hold_em(symbol=code, date=str(today.year))
            for _, row in df_hold.iterrows():
                sc = row['股票代码']
                sname = row['股票名称']
                w = float(row['占净值比例'])
                if w > 0.01:
                    stock_codes.append(sc)
                    stock_names.append(sname)
                    weight_map[sc] = w
        except:
            pass

    d['stock_count'] = len(stock_codes)

    # -- 6. PE/PB/股息率 (baostock, 仅A股) --
    stock_data = []
    industries = {}
    bs_ok = not no_baostock

    if bs_ok and stock_codes:
        for i, sc in enumerate(stock_codes):
            if sc.startswith(('6','5')): bs_code = f'sh.{sc}'
            elif sc.startswith(('0','3','1')): bs_code = f'sz.{sc}'
            else: continue

            stock_price, pe_v, pb_v, dv_v = None, None, None, None

            # PE/PB
            try:
                date_str = (today - timedelta(days=5)).strftime('%Y-%m-%d')
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

            # 股息率
            if stock_price and stock_price > 0:
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
                        if best_dps > 0:
                            dv_v = best_dps / stock_price * 100
                except:
                    pass

            ind = industry_map.get(sc, '其他')
            w = weight_map.get(sc, 0)
            stock_data.append((sc, stock_names[i] if i < len(stock_names) else '', w, pe_v, pb_v, dv_v, ind))
            if ind:
                industries[ind] = industries.get(ind, 0) + w
            time.sleep(0.05)

    # 加权估值
    pe_list = [s[3] for s in stock_data if s[3] is not None]
    pb_list = [s[4] for s in stock_data if s[4] is not None]
    dv_list = [s[5] for s in stock_data if s[5] is not None]

    d['pe_w'] = weighted_avg([s[3] for s in stock_data], [s[2] for s in stock_data])
    d['pb_w'] = weighted_avg([s[4] for s in stock_data], [s[2] for s in stock_data])
    d['dv_w'] = weighted_avg([s[5] for s in stock_data], [s[2] for s in stock_data])
    d['pe_median'] = np.median(pe_list) if pe_list else 0
    d['pb_median'] = np.median(pb_list) if pb_list else 0
    d['dv_median'] = np.median(dv_list) if dv_list else 0
    d['pe_mean'] = np.mean(pe_list) if pe_list else 0
    d['pb_mean'] = np.mean(pb_list) if pb_list else 0
    d['dv_mean'] = np.mean(dv_list) if dv_list else 0
    d['pe_p25'] = np.percentile(pe_list, 25) if pe_list else 0
    d['pe_p75'] = np.percentile(pe_list, 75) if pe_list else 0
    d['pb_p25'] = np.percentile(pb_list, 25) if pb_list else 0
    d['pb_p75'] = np.percentile(pb_list, 75) if pb_list else 0
    d['has_baostock'] = len(pe_list) > 0
    d['stock_data'] = stock_data
    d['industries'] = industries

    # -- 7. 同类对比 --
    d['peer_results'] = []  # 稍后统一采集

# ═══════════════════════════════════════════════════════════════
# 主流程
# ═══════════════════════════════════════════════════════════════

print("=" * 60)
print(f"  多红利策略ETF深度分析 — {today.strftime('%Y-%m-%d %H:%M')}")
print("=" * 60)

# -- baostock初始化 --
bs.login()

# 预加载行业映射
print("\n[0] 预加载行业映射...", end=' ', flush=True)
industry_map = {}
try:
    rs_ind = bs.query_stock_industry()
    if rs_ind.error_code == '0':
        ind_df = rs_ind.get_data()
        for _, row in ind_df.iterrows():
            code_raw = row['code']
            short_code = code_raw.split('.')[-1] if '.' in code_raw else code_raw
            industry_map[short_code] = row['industry']
    print(f"OK ({len(industry_map)} 条)")
except Exception as e:
    print(f"失败: {e}")

# -- 逐产品采集 --
all_data = []
total = len(PRODUCTS)
for idx, p in enumerate(PRODUCTS):
    print(f"\n[{idx+1}/{total}] {p['tab']} ({p['code']}) [{p['category']}] ...", flush=True)
    d = collect_product_data(p, industry_map)
    if d.get('error'):
        print(f"  ⚠ 失败: {d['error']} — 将在报告中标记")
    else:
        summary = f"  ✓ NAV={d['nav']:.4f}"
        if d.get('has_baostock'):
            summary += f"  PE={d['pe_w']:.1f}  PB={d['pb_w']:.1f}  DV={d['dv_w']:.1f}%"
        summary += f"  RSI6d={d['rsi_6d']:.1f}"
        print(summary)
    all_data.append(d)

# -- 计算综合买入信号评分 --
for d in all_data:
    # nav_str for header display
    if d.get('nav') is not None:
        d['nav_str'] = '%.4f' % d['nav']
    else:
        d['nav_str'] = '—'

    if not d.get('error') and d.get('rsi_6d') is not None:
        d['score'] = calc_composite_score(d)
    else:
        d['score'] = None

# -- 统一采集同类对比 --
print("\n[同类对比] 采集8支红利ETF近1年收益...", flush=True)
PEERS = [
    ('sh510880', '510880', '红利ETF华泰柏瑞'),
    ('sh515180', '515180', '红利ETF易方达'),
    ('sh515080', '515080', '中证红利ETF招商'),
    ('sh512890', '512890', '红利低波华泰柏瑞'),
    ('sh563020', '563020', '红利低波易方达'),
    ('sh515100', '515100', '红利低波100景顺'),
    ('sh515450', '515450', '红利低波50ETF南方'),
    ('sz159758', '159758', '红利质量ETF华夏'),
]

peer_results_all = []
for psym, pcode, pname in PEERS:
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
                peer_results_all.append((pname, pret, pcode))
        time.sleep(0.3)
    except:
        pass

peer_results_all.sort(key=lambda x: x[1], reverse=True)

# 把同类对比注入各产品（标记当前产品）
for d in all_data:
    dc = d['display_code']
    d['peer_results'] = [
        (name, ret, code == dc) for name, ret, code in peer_results_all
    ]

bs.logout()

# ═══════════════════════════════════════════════════════════════
# HTML 生成
# ═══════════════════════════════════════════════════════════════

def build_tech_cell(label, hint_fn, num_val, dev_val, dev_color_fn, is_rsi=False, is_ma=False):
    """构建单个技术指标cell的HTML"""
    hint_cls, hint_text = (hint_fn(num_val) if is_rsi else hint_fn(dev_val))
    color = (dev_color_fn(num_val) if is_rsi else dev_color_fn(dev_val))
    num_str = ('%.4f' % num_val) if is_ma else ('%.1f' % num_val)

    gauge_html = ''
    if is_rsi:
        obs_pos = 25 if ('6日' in label or '6d' in label) else 40
        buy_marks = [20,15,10,5] if ('6日' in label or '6d' in label) else [35,30,25,20,15,10,5]
        bar_class = 'gauge-bar-6d' if ('6日' in label or '6d' in label) else 'gauge-bar-7w'
        dev_text = 'RSI偏离 %+.1f%%' % dev_val
        gauge_html = '<div class="gauge-wrap">\n'
        gauge_html += '          <div class="gauge-obs-label" style="left:%d%%">▼观察点</div>\n' % obs_pos
        gauge_html += '          <div class="gauge-bar %s">\n' % bar_class
        gauge_html += '            <div class="gauge-mark obs" style="left:%d%%"></div>\n' % obs_pos
        for bm in buy_marks:
            gauge_html += '            <div class="gauge-mark buy" style="left:%d%%"></div>\n' % bm
        gauge_html += '            <div class="gauge-dot" style="left:%.1f%%;color:%s"></div>\n' % (num_val, color)
        gauge_html += '          </div>\n'
        gauge_html += '          <div class="gauge-ticks">\n'
        for tick in [5,10,15,20,25,30,35,40,50,75]:
            gauge_html += '            <div class="gauge-tick top" style="left:%d%%">%d</div>\n' % (tick, tick)
        gauge_html += '          </div>\n'
        gauge_html += '          <div class="rsi-legend" style="margin-top:10px;text-align:center">%d为观察点，低于%d越低越买</div>\n' % (obs_pos, obs_pos)
        gauge_html += '        </div>'
    else:
        obs_pos = ma_bar_pos(0)
        buy_marks_pct = [-5,-10,-15,-20,-25]
        dev_text = '净值偏离 %+.2f%%' % dev_val
        dot_pos = ma_bar_pos(dev_val)
        gauge_html = '<div class="gauge-wrap">\n'
        gauge_html += '          <div class="gauge-obs-label" style="left:%.1f%%">▼观察点</div>\n' % obs_pos
        gauge_html += '          <div class="gauge-bar gauge-bar-ma">\n'
        gauge_html += '            <div class="gauge-mark obs" style="left:%.1f%%"></div>\n' % obs_pos
        for bm in buy_marks_pct:
            bp = ma_bar_pos(bm)
            gauge_html += '            <div class="gauge-mark buy" style="left:%.1f%%"></div>\n' % bp
        gauge_html += '            <div class="gauge-dot" style="left:%.1f%%;color:%s"></div>\n' % (dot_pos, color)
        gauge_html += '          </div>\n'
        gauge_html += '          <div class="gauge-ticks">\n'
        for val in range(-30, 35, 5):
            pos = ma_bar_pos(val)
            gauge_html += '            <div class="gauge-tick top" style="left:%.1f%%">%+d%%</div>\n' % (pos, val)
        gauge_html += '          </div>\n'
        gauge_html += '          <div class="rsi-legend" style="margin-top:10px;text-align:center">触及均线为观察点，低于均线越低越买</div>\n'
        gauge_html += '        </div>'

    return '<div class="tech-cell">\n' \
           '        <div class="tech-label">%s</div>\n' \
           '        <div class="rsi-hint %s">%s</div>\n' \
           '        <div class="tech-num" style="color:%s">%s</div>\n' \
           '        <div class="tech-dev" style="color:%s">%s</div>\n' \
           '        %s\n' \
           '      </div>' % (label, hint_cls, hint_text, color, num_str, color, dev_text, gauge_html)


def build_panel_html(d):
    """生成单个产品的完整HTML面板"""
    if d.get('error'):
        return f'''<div class="etf-panel" id="panel-{d['code']}" style="display:none">
    <div class="wide-card"><p style="color:#d64555;font-size:16px">⚠ 数据采集失败：{d['error']}</p></div>
    </div>'''

    # 估值卡片
    if d.get('has_baostock'):
        val_html = f'''<div class="hero-card valuation">
        <h2>估值概览</h2>
        <div class="val-row">
          <div class="val-col">
            <div class="val-title">PE(TTM)</div>
            <div class="val-num" style="color:#0ea882">{d['pe_w']:.1f}<span class="pct"></span></div>
            <div class="val-info">中位 <b>{d['pe_median']:.1f}</b><br>区间 {d['pe_p25']:.1f}~{d['pe_p75']:.1f}</div>
          </div>
          <div class="val-col">
            <div class="val-title">PB</div>
            <div class="val-num" style="color:#0ea882">{d['pb_w']:.1f}<span class="pct"></span></div>
            <div class="val-info">中位 <b>{d['pb_median']:.1f}</b><br>区间 {d['pb_p25']:.1f}~{d['pb_p75']:.1f}</div>
          </div>
          <div class="val-col">
            <div class="val-title">股息率</div>
            <div class="val-num" style="color:#0ea882">{d['dv_w']:.1f}<span class="pct">%</span></div>
            <div class="val-info">中位 <b>{d['dv_median']:.1f}%</b><br>简单均值 {d['dv_mean']:.1f}%</div>
          </div>
        </div>
        <div class="val-note">
          指标说明：PE/PB/股息率采用<b>加权计算</b>（按持仓权重），数据来源为基金季报持仓及baostock估值数据。
        </div>
      </div>'''
    else:
        val_html = f'''<div class="hero-card valuation">
        <h2>估值概览</h2>
        <div class="val-note" style="margin-top:40px;margin-bottom:40px">
          ⚠ 该产品跟踪指数含<b>港股成分</b>，baostock暂不支持港股PE/PB/股息率数据。<br>
          持仓结构详见下方成分股列表。
        </div>
      </div>'''

    # 技术卡片
    tech_html = f'''<div class="hero-card technical">
        <h2>技术指标</h2>
        <div class="tech-grid">
          {build_tech_cell('250日均线', ma_hint, d['ma250'], d['diff250'], ma_dot_color, is_ma=True)}
          {build_tech_cell('550日均线', ma_hint, d['ma550'], d['diff550'], ma_dot_color, is_ma=True)}
          {build_tech_cell('6日RSI', rsi_hint_6d, d['rsi_6d'], d['rsi_6d']-25, rsi_gradient_color_6d, is_rsi=True)}
          {build_tech_cell('7周RSI', rsi_hint_7w, d['rsi_7w'], d['rsi_7w']-40, rsi_gradient_color_7w, is_rsi=True)}
        </div>
      </div>'''

    hero = f'''<div class="hero">{val_html}{tech_html}</div>'''

    # 净值收益 + 风险
    returns_html = ''
    for label in ['近1周','近1月','近3月','近6月','近1年','近2年']:
        r = d['returns'].get(label, 0)
        bar_len = min(int(abs(r)*3), 35)
        bar = '█' * bar_len
        clr = '#0ea882' if r >= 0 else '#d64555'
        returns_html += f'      <tr><td>{label}</td><td style="color:{clr};font-weight:700">{r:+.2f}%</td><td style="font-size:11px;color:{clr}">{bar}</td></tr>\n'

    main_grid = f'''<div class="main-grid">
      <div class="card">
        <h3 style="color:#0ea882">净值与阶段收益</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px">
          <div><span style="color:#5a6070;font-size:13px">{d['price_source']}</span><br><b style="font-size:20px">{d['nav']:.4f}</b></div>
          <div><span style="color:#5a6070;font-size:13px">日期</span><br><b style="font-size:16px">{d['nav_date']}</b></div>
          <div><span style="color:#5a6070;font-size:13px">数据天数</span><br><b>{d['data_days']} 个交易日</b></div>
          <div></div>
        </div>
        <table>
          <tr><th>阶段</th><th>收益率</th><th>走势</th></tr>{returns_html}</table>
      </div>
      <div class="card">
        <h3 style="color:#d64555">风险指标</h3>
        <div style="margin-bottom:24px">
          <div style="font-size:13px;color:#5a6070;margin-bottom:4px">年化波动率 (20日)</div>
          <div style="font-size:32px;font-weight:800;color:#111">{d['vol_20d']:.2f}%</div>
        </div>
        <div style="margin-bottom:24px">
          <div style="font-size:13px;color:#5a6070;margin-bottom:4px">年化波动率 (60日)</div>
          <div style="font-size:32px;font-weight:800;color:#111">{d['vol_60d']:.2f}%</div>
        </div>
        <div>
          <div style="font-size:13px;color:#5a6070;margin-bottom:4px">近1年最大回撤</div>
          <div style="font-size:32px;font-weight:800;color:#d64555">{d['max_dd']:.2f}%</div>
        </div>
      </div>
    </div>'''

    # 同类对比
    peer_rows = ''
    for rank, (pname, pret, is_self) in enumerate(d['peer_results'], 1):
        flag = '★当前' if is_self else ''
        clr = '#0ea882' if pret >= 0 else '#d64555'
        row_style = 'background:#f8fafb;' if is_self else ''
        peer_rows += f'      <tr style="{row_style}"><td>{rank}</td><td>{pname}</td><td style="text-align:right;color:{clr};font-weight:700">{pret:+.2f}%</td><td style="color:#0ea882;font-weight:700">{flag}</td></tr>\n'

    peer_html = f'''<div class="main-grid">
      <div class="card" style="grid-column:1/-1">
        <h3 style="color:#3168d8">同类红利ETF近1年收益对比</h3>
        <table><tr><th>排名</th><th>名称</th><th style="text-align:right">近1年收益</th><th></th></tr>{peer_rows}</table>
      </div>
    </div>'''

    # 行业分布
    industries = d.get('industries', {})
    if industries:
        total_w = sum(industries.values())
        ind_rows = ''
        sorted_ind = sorted(industries.items(), key=lambda x: x[1], reverse=True)
        for ind, w in sorted_ind:
            pct = w / total_w * 100
            ind_rows += f'''  <div class="ind-bar-wrap">
        <div class="ind-name">{ind}</div>
        <div class="ind-pct">{pct:.1f}%</div>
        <div class="ind-bar-bg"><div class="ind-bar-fill" style="width:{pct:.1f}%"></div></div>
      </div>\n'''
        top5_sum = sum(w for _, w in sorted_ind[:5]) / total_w * 100 if sorted_ind else 0
        ind_html = f'''<div class="wide-card">
      <h3 style="color:#0ea882">成分行业分布（按权重倒排）</h3>{ind_rows}
      <div style="margin-top:14px;font-size:13px;color:#5a6070">前5大行业权重合计 {top5_sum:.1f}%</div>
    </div>'''
    else:
        ind_html = ''

    # 成分股
    sd = sorted(d.get('stock_data', []), key=lambda x: x[2], reverse=True)
    if sd:
        hdr_extra = ''
        has_pe = any(s[3] is not None for s in sd)
        has_pb = any(s[4] is not None for s in sd)
        has_dv = any(s[5] is not None for s in sd)
        if has_pe: hdr_extra += '<th style="text-align:right">PE</th>'
        if has_pb: hdr_extra += '<th style="text-align:right">PB</th>'
        if has_dv: hdr_extra += '<th style="text-align:right">股息率</th>'

        stock_rows = ''
        for sc, sname, w, pe, pb, dv, ind in sd:
            pe_str = f'{pe:.2f}' if pe else '--'
            pb_str = f'{pb:.2f}' if pb else '--'
            dv_str = f'{dv:.2f}%' if dv else '--'
            dv_cls = 'green' if (dv and dv > 3) else 'red' if (dv and dv < 1.5) else ''
            row_extra = ''
            if has_pe: row_extra += f'<td style="text-align:right">{pe_str}</td>'
            if has_pb: row_extra += f'<td style="text-align:right">{pb_str}</td>'
            if has_dv: row_extra += f'<td style="text-align:right" class="{dv_cls}">{dv_str}</td>'
            stock_rows += f'    <tr><td>{sc}</td><td style="font-weight:700;color:#111">{sname}</td><td style="text-align:right;font-weight:700;color:#111">{w:.2f}%</td>{row_extra}<td style="font-size:13px;color:#5a6070">{ind}</td></tr>\n'

        pe_info = f' | PE加权 {d["pe_w"]:.1f}' if d.get('has_baostock') and d.get('pe_w', 0) > 0 else ''
        pb_info = f' | PB加权 {d["pb_w"]:.1f}' if d.get('has_baostock') and d.get('pb_w', 0) > 0 else ''
        dv_info = f' | 股息率加权 {d["dv_w"]:.1f}%' if d.get('has_baostock') and d.get('dv_w', 0) > 0 else ''

        stock_table = f'''<div class="wide-card">
      <h3 style="color:#0ea882">成分股及持仓占比（按权重倒排）</h3>
      <div style="font-size:13px;color:#5a6070;margin-bottom:12px">
        数据来源: 基金季报持仓/指数成分股 | 共 {len(sd)} 只{pe_info}{pb_info}{dv_info}
      </div>
      <table>
        <tr><th>代码</th><th>名称</th><th style="text-align:right">权重</th>{hdr_extra}<th>行业</th></tr>{stock_rows}</table>
    </div>'''
    else:
        stock_table = ''

    return f'''<div class="etf-panel" id="panel-{d['code']}">
    {hero}
    {main_grid}
    {peer_html}
    {ind_html}
    {stock_table}
    </div>'''


# ═══════════════════════════════════════════════════════════════
# 首页 Dashboard 面板
# ═══════════════════════════════════════════════════════════════

def _score_bar(composite):
    """评分进度条"""
    color = SIGNAL_COLORS['buy'] if composite >= 60 else (SIGNAL_COLORS['watch'] if composite >= 40 else SIGNAL_COLORS['safe'])
    return '<div class="score-bar-bg"><div class="score-bar-fill" style="width:%.0f%%;background:%s"></div></div>' % (composite, color)

def _mini_badge(label, value, sig, fmt='%.1f'):
    """微型指标徽章"""
    dot = signal_dot(sig)
    return '<div class="mini-badge"><span class="mini-label">%s</span>%s<span class="mini-val">%s</span></div>' % (label, dot, fmt % value)

def _build_score_card(d):
    """生成单个产品的评分卡片"""
    s = d['score']
    composite = s['composite']
    grade = s['grade']
    cat_key = 'energy' if '能源' in d['category'] else 'regular'
    cat_color = '#c88a0c' if cat_key == 'energy' else '#0ea882'

    # 4个微型信号
    sig_rsi6  = indicator_signal_rsi(d.get('rsi_6d', 50), 25)
    sig_rsi7  = indicator_signal_rsi(d.get('rsi_7w', 50), 40)
    sig_ma250 = indicator_signal_ma(d.get('diff250', 0))
    sig_ma550 = indicator_signal_ma(d.get('diff550', 0))

    badges = _mini_badge('RSI6', d.get('rsi_6d', 0), sig_rsi6) + \
             _mini_badge('RSI7W', d.get('rsi_7w', 0), sig_rsi7) + \
             _mini_badge('MA250', d.get('diff250', 0), sig_ma250, fmt='%+.1f%%') + \
             _mini_badge('MA550', d.get('diff550', 0), sig_ma550, fmt='%+.1f%%')

    gl = grade_label(grade)
    signal_color = SIGNAL_COLORS.get(grade, SIGNAL_COLORS['safe'])
    return '''
            <div class="score-card cat-%s" data-code="%s" onclick="switchToProduct(\'%s\')">
              <div class="sc-header">
                <span class="sc-name">%s</span>
                <span class="sc-code">%s</span>
              </div>
              <div class="sc-score-wrap">
                %s
                <span class="sc-num" style="color:%s">%.0f</span>
              </div>
              <div class="sc-grade" style="color:%s">%s</div>
              <div class="sc-badges">%s</div>
            </div>''' % (
                cat_key, d['code'], d['code'],
                d['tab'], d['display_code'],
                _score_bar(composite), signal_color, composite,
                signal_color, gl, badges,
            )

def build_dashboard_panel(all_data, categories):
    """生成首页概览面板HTML"""
    sections = ''
    for cat, items in categories.items():
        cat_key = 'energy' if '能源' in cat else 'regular'
        cat_color = '#c88a0c' if cat_key == 'energy' else '#0ea882'

        # 按综合分降序, 失败的排最后
        sorted_items = sorted(items, key=lambda d: (
            d['score'] is None,
            -(d['score']['composite'] if d['score'] else 0)
        ))

        cards = ''
        for d in sorted_items:
            if d['score'] is None:
                # 数据失败的产品
                cards += '''
            <div class="score-card cat-%s error-card">
              <div class="sc-header">
                <span class="sc-name">%s</span>
                <span class="sc-code">%s</span>
              </div>
              <div class="sc-error-msg">数据暂不可用</div>
            </div>''' % (cat_key, d['tab'], d['display_code'])
            else:
                cards += _build_score_card(d)

        sections += '''
        <div class="dash-section">
          <div class="dash-section-head">
            <span class="dash-dot cat-%s"></span>
            <span class="dash-cat-name">%s</span>
            <span class="dash-cat-count">%d只产品</span>
          </div>
          <div class="dash-grid">%s
          </div>
        </div>''' % (cat_key, cat, len(items), cards)

    return '''<div class="etf-panel" id="panel-dashboard">
    <div class="dash-hero">
      <h2>综合买入信号概览</h2>
      <p class="dash-sub">基于RSI(6日/7周) + 均线偏离(250日/550日) 加权评分 | RSI7周×2 · MA250×2 · RSI6×1 · MA550×1</p>
      <div class="dash-legend">
        <span class="legend-item buy">● ≥60 买入信号</span>
        <span class="legend-item watch">● 40-59 观察期</span>
        <span class="legend-item safe">● &lt;40 无需关注</span>
      </div>
    </div>
    %s
  </div>''' % sections


# -- 构建分类Tab --
categories = {}
for d in all_data:
    cat = d['category']
    if cat not in categories:
        categories[cat] = []
    categories[cat].append(d)

# 分类配色
CAT_COLORS = {
    '能源/资源红利': '#c88a0c',  # 暖金
    '常规红利': '#0ea882',        # 绿
}

# 概览Tab（默认选中）
tab_html = '<div class="tab-group" style="margin-bottom:12px">\n'
tab_html += '    <button class="tab-btn tab-dashboard active" data-code="dashboard">概览<span class="tab-code">综合评分</span></button>\n'
tab_html += '  </div>\n'

# 分类Tab
for cat, items in categories.items():
    cat_color = CAT_COLORS.get(cat, '#0ea882')
    cat_key = 'energy' if '能源' in cat else 'regular'
    tab_html += '  <div class="tab-category" data-cat="%s">\n' % cat
    tab_html += '    <span class="tab-cat-dot cat-%s"></span>\n' % cat_key
    tab_html += '    <span class="tab-cat-label">%s</span>\n' % cat
    tab_html += '  </div>\n'
    tab_html += '  <div class="tab-group">\n'
    for d in items:
        error_cls = ' tab-error' if d.get('error') else ''
        tab_html += '    <button class="tab-btn cat-%s%s" data-code="%s" data-cat="%s">%s<span class="tab-code">%s</span></button>\n' % (
            cat_key, error_cls, d['code'], cat, d['tab'], d['code'])
    tab_html += '  </div>\n'

# -- 构建面板（首页概览 + 各产品详情）--
panels_html = build_dashboard_panel(all_data, categories) + '\n'
for d in all_data:
    panels_html += build_panel_html(d) + '\n'

# -- 默认选中概览页 --
default_code = 'dashboard'

# -- 获取某个产品的header信息 --
def get_header_info(code):
    if code == 'dashboard':
        return {
            'name': '红利策略综合概览',
            'display_code': '%d产品' % len(all_data),
            'index_name': 'RSI + 均线偏离加权评分',
            'category': '能源/资源红利 + 常规红利',
            'nav_str': '%d只' % len(all_data), 'price_source': '技术指标综合', 'nav_date': today.strftime('%Y-%m-%d'),
        }
    for d in all_data:
        if d['code'] == code:
            return d
    return all_data[0]

first = get_header_info(default_code)

# ═══════════════════════════════════════════════════════════════
# CSS (纯字符串, 避免 f-string 冲突)
# ═══════════════════════════════════════════════════════════════

CSS = """
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    background: #f5f6f8;
    color: #2a3140;
    line-height: 1.5;
  }

  .header {
    background: #fff;
    border-bottom: 1px solid #e2e6ec;
    padding: 24px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header h1 { font-size: 20px; font-weight: 600; color: #111; }
  .header .sub { font-size: 13px; color: #5a6070; margin-top: 2px; }
  .header .sub span { color: #0ea882; font-weight: 600; }
  .header .nav-num { font-size: 38px; font-weight: 700; color: #111; }
  .header .nav-label { font-size: 14px; font-weight: 600; color: #0ea882; text-align: right; }
  .header .nav-date { font-size: 12px; color: #6b7385; text-align: right; margin-top: 2px; }

  .tab-bar {
    background: #fff;
    border-bottom: 1px solid #eef0f4;
    padding: 16px 48px 12px;
  }

  /* Category header */
  .tab-category {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 14px 0 8px 0;
  }
  .tab-category:first-child { margin-top: 0; }
  .tab-cat-dot {
    width: 6px; height: 6px; border-radius: 50%;
    flex-shrink: 0;
  }
  .tab-cat-dot.cat-energy { background: #c88a0c; }
  .tab-cat-dot.cat-regular { background: #0ea882; }
  .tab-cat-label {
    font-size: 12px; font-weight: 600; color: #2a3140;
    letter-spacing: 0.3px;
  }

  /* Tab group */
  .tab-group {
    display: flex; flex-wrap: wrap; gap: 6px;
    margin-bottom: 2px;
  }

  /* Tab button */
  .tab-btn {
    padding: 7px 16px;
    border: none;
    border-radius: 20px;
    background: #f3f4f6;
    font-size: 13px; font-weight: 500;
    color: #5a6070; cursor: pointer;
    transition: all 0.2s ease;
    display: flex; align-items: center; gap: 6px;
    white-space: nowrap;
    font-family: inherit;
  }
  .tab-btn:hover {
    background: #e5e7eb;
    color: #2a3140;
  }
  .tab-btn.active {
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .tab-btn.cat-energy.active {
    background: #c88a0c;
    color: #fff;
    box-shadow: 0 2px 8px rgba(200,138,12,0.28);
  }
  .tab-btn.cat-regular.active {
    background: #0ea882;
    color: #fff;
    box-shadow: 0 2px 8px rgba(14,168,130,0.28);
  }
  .tab-btn.active .tab-code {
    color: rgba(255,255,255,0.6);
  }
  .tab-btn.tab-error {
    opacity: 0.45;
    background: #fafafa;
    border: 1px dashed #d0d4da;
  }
  .tab-code {
    font-size: 10px; color: #a0a8b4; font-weight: 400;
    opacity: 0.8;
  }

  .etf-panel { display: none; }
  .etf-panel.active { display: block; }

  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    padding: 24px 48px 0;
  }
  .hero-card {
    background: #fff;
    border: 1px solid #e2e6ec;
    border-radius: 14px;
    padding: 32px 36px;
  }
  .hero-card h2 {
    font-size: 15px; font-weight: 700; letter-spacing: 1px;
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 24px;
  }
  .hero-card h2::after { content: ''; flex:1; height: 1px; opacity: 0.15; }
  .valuation h2 { color: #0ea882; }
  .valuation h2::after { background: #0ea882; }
  .technical h2 { color: #3168d8; }
  .technical h2::after { background: #3168d8; }

  .val-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
  .val-col { text-align: center; padding: 8px 12px; }
  .val-col + .val-col { border-left: 1px solid #eef0f4; }
  .val-title { font-size: 20px; font-weight: 600; color: #111; margin-bottom: 6px; }
  .val-num { font-size: 40px; font-weight: 700; line-height: 1; }
  .val-num .pct { font-size: 20px; }
  .val-info { font-size: 12px; color: #5a6070; line-height: 1.6; margin-top: 6px; }
  .val-info b { color: #2a3140; }
  .val-note {
    margin-top: 18px; padding: 8px 14px;
    background: #f0faf6; border-left: 3px solid #0ea882;
    font-size: 13px; color: #3a6055; border-radius: 0 6px 6px 0;
  }

  .tech-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 0; }
  .tech-cell { padding: 24px 24px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; }
  .tech-cell + .tech-cell { border-left: 1px solid #eef0f4; }
  .tech-cell:nth-child(3), .tech-cell:nth-child(4) { border-top: 1px solid #eef0f4; }

  .tech-label { font-size: 20px; font-weight: 600; color: #111; margin-bottom: 6px; }
  .tech-num { font-size: 40px; font-weight: 700; color: #111; line-height: 1; margin-bottom: 2px; }
  .tech-dev { font-size: 13px; font-weight: 600; margin-bottom: 4px; }

  .gauge-wrap { margin-top: 28px; width: 100%; position: relative; }
  .gauge-bar {
    height: 10px; border-radius: 5px; position: relative; width: 100%;
  }
  .gauge-bar-6d {
    background: linear-gradient(to right, #7B1818 0%, #C0392B 15%, #E04558 25%, #E07040 35%, #C88A0C 50%, #0EA882 70%, #0EA882 100%);
  }
  .gauge-bar-7w {
    background: linear-gradient(to right, #7B1818 0%, #A93226 20%, #E04558 40%, #E07040 50%, #C88A0C 60%, #0EA882 75%, #0EA882 100%);
  }
  .gauge-bar-ma {
    background: linear-gradient(to right,
      #0EA882 0%, #0EA882 17%, #0EA882 33%,
      #C88A0C 42%, #E07040 50%, #E04558 58%,
      #C0392B 67%, #A93226 83%, #7B1818 100%);
  }
  .gauge-dot {
    position: absolute; top: -3px; width: 16px; height: 16px;
    border-radius: 50%; border: 3px solid #fff;
    box-shadow: 0 0 0 2px currentColor, 0 1px 4px rgba(0,0,0,0.2);
    transform: translateX(-50%);
  }
  .gauge-obs-label { position: absolute; top: -22px; font-size: 11px; font-weight: 700; color: #E04558; transform: translateX(-3px); white-space: nowrap; z-index: 3; }
  .gauge-ticks { position: relative; width: 100%; height: 34px; margin-top: 4px; }
  .gauge-mark { position: absolute; top: 0; width: 2px; border-radius: 1px; transform: translateX(-50%); }
  .gauge-mark.obs { height: 10px; background: #fff; box-shadow: 0 0 3px rgba(0,0,0,0.4); z-index: 2; }
  .gauge-mark.buy { height: 6px; background: rgba(255,255,255,0.5); z-index: 1; }
  .gauge-tick {
    position: absolute; font-size: 11px; color: #5a6070;
    transform: translateX(-50%); white-space: nowrap;
  }
  .gauge-tick.top { top: 6px; font-weight: 600; color: #2a3140; }

  .rsi-hint { display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; margin-bottom: 6px; }
  .rsi-hint.safe { background: #eef0f4; color: #6b7385; }
  .rsi-hint.watch { background: #fff8e6; color: #C88A0C; }
  .rsi-hint.buy { background: #fef2f3; color: #d64555; }

  .rsi-legend { margin-top: 8px; padding: 8px 12px; background: #f8f9fb; border-radius: 6px; font-size: 12px; line-height: 1.6; }

  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    padding: 18px 48px 0;
  }
  .card {
    background: #fff;
    border: 1px solid #e2e6ec;
    border-radius: 14px;
    padding: 28px 32px;
  }
  .card h3 {
    font-size: 15px; font-weight: 700; margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
    letter-spacing: 1px;
  }
  .card h3::after { content: ''; flex:1; height: 1px; background: #e2e6ec; }

  .wide-card {
    margin: 18px 48px;
    background: #fff;
    border: 1px solid #e2e6ec;
    border-radius: 14px;
    padding: 28px 32px;
  }
  .wide-card h3 {
    font-size: 15px; font-weight: 700; margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
    letter-spacing: 1px;
  }
  .wide-card h3::after { content: ''; flex:1; height: 1px; background: #e2e6ec; }

  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { text-align: left; padding: 10px 8px; border-bottom: 2px solid #e2e6ec; color: #5a6070; font-size: 13px; font-weight: 600; }
  td { padding: 10px 8px; border-bottom: 1px solid #eef0f4; }

  .ind-bar-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .ind-name { width: 220px; font-size: 14px; color: #2a3140; flex-shrink: 0; }
  .ind-pct { width: 52px; font-size: 14px; font-weight: 600; color: #111; text-align: right; flex-shrink: 0; }
  .ind-bar-bg { flex:1; height: 22px; background: #f0f2f5; border-radius: 4px; overflow: hidden; }
  .ind-bar-fill { height: 100%; border-radius: 4px; background: #0ea882; }

  .green { color: #0ea882; }
  .red { color: #d64555; }

  /* ═══════════════════════════════════════ */
  /* 概览 Tab 按钮 */
  /* ═══════════════════════════════════════ */
  .tab-btn.tab-dashboard {
    background: #fff;
    border: 1.5px solid #d0d4da;
    font-weight: 600;
    font-size: 14px;
    color: #2a3140;
    padding: 8px 20px;
  }
  .tab-btn.tab-dashboard:hover {
    background: #f8f9fb;
    border-color: #b0b6c0;
  }
  .tab-btn.tab-dashboard.active {
    background: #2a3140;
    color: #fff;
    border-color: #2a3140;
    box-shadow: 0 2px 10px rgba(42,49,64,0.3);
  }
  .tab-btn.tab-dashboard.active .tab-code {
    color: rgba(255,255,255,0.55);
  }

  /* ═══════════════════════════════════════ */
  /* Dashboard 概览面板 */
  /* ═══════════════════════════════════════ */
  .dash-hero {
    padding: 28px 48px 0;
    margin-bottom: 8px;
  }
  .dash-hero h2 {
    font-size: 20px; font-weight: 700; color: #111; margin-bottom: 6px;
  }
  .dash-sub {
    font-size: 13px; color: #8a92a3; margin-bottom: 14px;
  }
  .dash-legend {
    display: flex; gap: 22px; font-size: 13px; color: #5a6070;
  }
  .dash-legend .legend-item { display: flex; align-items: center; gap: 4px; }
  .dash-legend .legend-item.buy { color: #c62828; font-weight: 600; }
  .dash-legend .legend-item.watch { color: #e07040; font-weight: 600; }
  .dash-legend .legend-item.safe { color: #6b7280; }

  .dash-section {
    padding: 8px 48px 14px;
  }
  .dash-section-head {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 14px;
  }
  .dash-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  }
  .dash-dot.cat-energy { background: #c88a0c; }
  .dash-dot.cat-regular { background: #0ea882; }
  .dash-cat-name {
    font-size: 16px; font-weight: 700; color: #2a3140;
  }
  .dash-cat-count {
    font-size: 12px; color: #a0a8b4; margin-left: 2px;
  }

  .dash-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 14px;
  }

  /* Score card */
  .score-card {
    background: #fff;
    border: 1px solid #e2e6ec;
    border-radius: 14px;
    padding: 20px 18px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  .score-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    border-color: #c0c8d4;
  }
  .score-card.cat-energy { border-top: 3px solid #c88a0c; }
  .score-card.cat-regular { border-top: 3px solid #0ea882; }
  .score-card.error-card {
    opacity: 0.55;
    cursor: default;
  }
  .score-card.error-card:hover {
    transform: none;
    box-shadow: none;
    border-color: #e2e6ec;
  }

  .sc-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 14px;
  }
  .sc-name {
    font-size: 15px; font-weight: 700; color: #2a3140;
  }
  .sc-code {
    font-size: 11px; color: #a0a8b4; font-weight: 500;
  }
  .sc-error-msg {
    text-align: center; color: #a0a8b4; font-size: 14px; padding: 12px 0;
  }

  /* Score bar + number */
  .sc-score-wrap {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 4px;
  }
  .score-bar-bg {
    flex: 1; height: 6px; background: #eef0f4; border-radius: 3px; overflow: hidden;
  }
  .score-bar-fill {
    height: 100%; border-radius: 3px; transition: width 0.4s ease;
  }
  .sc-num {
    font-size: 26px; font-weight: 800; flex-shrink: 0; line-height: 1;
  }
  .sc-grade {
    font-size: 12px; font-weight: 700; margin-bottom: 14px; padding-left: 0;
  }
  .sc-grade.buy   { color: #c62828; }
  .sc-grade.watch { color: #e07040; }
  .sc-grade.safe  { color: #6b7280; }

  /* Mini badges */
  .sc-badges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    border-top: 1px solid #eef0f4;
    padding-top: 12px;
  }
  .mini-badge {
    display: flex; align-items: center; gap: 3px;
    font-size: 12px;
  }
  .mini-label {
    color: #8a92a3; font-weight: 500; min-width: 34px; font-size: 11px;
  }
  .mini-val {
    color: #2a3140; font-weight: 600; margin-left: 2px;
  }

  .footer {
    text-align: center; padding: 24px 48px 32px;
    font-size: 13px; color: #8a92a3;
  }
"""

# ═══════════════════════════════════════════════════════════════
# 组装 HTML
# ═══════════════════════════════════════════════════════════════

# 生成 JS 产品数据
js_data_lines = []
for d in all_data:
    js_data_lines.append('  "%s": { name: "%s", display_code: "%s", nav_str: "%s", nav_date: "%s", price_source: "%s", index_name: "%s", category: "%s" }' % (
        d['code'], d['name'], d['display_code'],
        d.get('nav_str', '—'), d.get('nav_date', ''),
        d.get('price_source', ''), d.get('index_name') or '', d['category']
    ))
js_product_data = ',\n'.join(js_data_lines)

html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>红利策略ETF深度分析 | %s</title>
<style>%s</style>
</head>
<body>

<div class="header" id="main-header">
  <div>
    <h1 id="header-name">%s (%s)</h1>
    <div class="sub">跟踪 <span id="header-index">%s</span> | <span id="header-cat">%s</span></div>
  </div>
  <div style="text-align:right">
    <div class="nav-num" id="header-nav">%s</div>
    <div class="nav-label" id="header-src">%s</div>
    <div class="nav-date" id="header-date">%s</div>
  </div>
</div>

<div class="tab-bar" id="tab-bar">
%s</div>

%s

<div class="footer">
  红利策略ETF深度分析 | %s<br>
  数据源: 新浪(行情) + 天天基金(净值) + 基金季报/指数成分股 + baostock(估值/行业/股息)<br>
  重要声明: 本报告仅供投资参考，不构成投资建议。投资有风险，入市需谨慎。
</div>

<script>
const PRODUCT_DATA = {
%s
};

function switchToProduct(code) {
  /* score card click → switch to product tab */
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.etf-panel').forEach(p => p.style.display = 'none');
  const btn = document.querySelector('.tab-btn[data-code="' + code + '"]');
  if (btn) btn.classList.add('active');
  const panel = document.getElementById('panel-' + code);
  if (panel) { panel.style.display = 'block'; panel.classList.add('active'); }
  const pd = PRODUCT_DATA[code];
  if (pd) {
    document.getElementById('header-name').textContent = pd.name + ' (' + pd.display_code + ')';
    document.getElementById('header-index').textContent = pd.index_name || '-';
    document.getElementById('header-cat').textContent = pd.category;
    document.getElementById('header-nav').textContent = pd.nav_str;
    document.getElementById('header-src').textContent = pd.price_source;
    document.getElementById('header-date').textContent = pd.nav_date;
  }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.dataset.code;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.etf-panel').forEach(p => p.style.display = 'none');
    const panel = document.getElementById('panel-' + code);
    if (panel) {
      panel.style.display = 'block';
      panel.classList.add('active');
    }
    if (code === 'dashboard') {
      document.getElementById('header-name').textContent = '红利策略综合概览';
      document.getElementById('header-index').textContent = 'RSI + 均线偏离加权评分';
      document.getElementById('header-cat').textContent = '能源/资源红利 + 常规红利';
      document.getElementById('header-nav').textContent = '%s';
      document.getElementById('header-src').textContent = '技术指标综合';
      document.getElementById('header-date').textContent = '%s';
    } else {
      const pd = PRODUCT_DATA[code];
      if (pd) {
        document.getElementById('header-name').textContent = pd.name + ' (' + pd.display_code + ')';
        document.getElementById('header-index').textContent = pd.index_name || '-';
        document.getElementById('header-cat').textContent = pd.category;
        document.getElementById('header-nav').textContent = pd.nav_str;
        document.getElementById('header-src').textContent = pd.price_source;
        document.getElementById('header-date').textContent = pd.nav_date;
      }
    }
  });
});

(function() {
  const defaultCode = '%s';
  const panel = document.getElementById('panel-' + defaultCode);
  if (panel) {
    panel.style.display = 'block';
    panel.classList.add('active');
  }
  const btn = document.querySelector('.tab-btn[data-code="' + defaultCode + '"]');
  if (btn) btn.classList.add('active');
})();
</script>

</body>
</html>""" % (
    today.strftime('%Y-%m-%d'),
    CSS,
    first['name'], first['display_code'],
    first.get('index_name') or '-', first['category'],
    first.get('nav_str', '—'), first.get('price_source', ''), first.get('nav_date', ''),
    tab_html,
    panels_html,
    today.strftime('%Y-%m-%d %H:%M'),
    js_product_data,
    '%d只' % len(all_data), today.strftime('%Y-%m-%d'),
    default_code,
)

# -- 写入文件 --
output_path = r'd:\投资管理系统\红利策略ETF深度分析.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\n{'='*60}")
print(f"  报告已生成: {output_path}")
print(f"  产品总数: {len(all_data)} | 成功: {sum(1 for d in all_data if not d.get('error'))} | 失败: {sum(1 for d in all_data if d.get('error'))}")
print(f"{'='*60}")
