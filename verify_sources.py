#!/usr/bin/env python
"""探测各ETF/基金的数据源可用性"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

import akshare as ak
import pandas as pd
import time

# 待验证产品清单
PRODUCTS = [
    # (代码, 名称, 类型, sina_sym, 分类)
    # ETF类 - 可直接用akshare基金ETF行情
    ('520990', '国新红利ETF', 'ETF', 'sh520990', '能源/资源红利'),
    ('513920', '港股通央企红利ETF华安', 'ETF', 'sh513920', '能源/资源红利'),
    ('159611', '电力ETF广发', 'ETF', 'sz159611', '能源/资源红利'),
    ('515180', '红利ETF易方达', 'ETF', 'sh515180', '能源/资源红利'),  # 已有
    ('563020', '红利低波ETF易方达', 'ETF', 'sh563020', '常规红利'),  # 已有
    ('515450', '红利低波50ETF南方', 'ETF', 'sh515450', '常规红利'),  # 现有

    # 联接/指数基金类 - 需验证
    ('021961', '景顺长城中证国新港股通央企红利ETF联接A', '联接基金', None, '能源/资源红利'),
    ('021881', '鑫元华证沪深港红利50指数A', '指数基金', None, '能源/资源红利'),
    ('020866', '华安恒生港股通中国央企红利ETF联接A', '联接基金', None, '能源/资源红利'),
    ('016185', '广发电力公用事业ETF联接A', '联接基金', None, '能源/资源红利'),
    ('009051', '易方达中证红利ETF联接A', '联接基金', None, '能源/资源红利'),

    # 混合/指基类
    ('014771', '中泰红利优选一年持有期混合', '混合基金', None, '常规红利'),
    ('020602', '易方达红利低波ETF联接A', '联接基金', None, '常规红利'),
    ('012708', '东方红中证东方红红利低波动指数A', '指数基金', None, '常规红利'),
]

print("=" * 70)
print("  数据源验证 - 2026/05/21")
print("=" * 70)

# ─── 1. ETF行情验证 ───
print("\n\n>>> 1. ETF行情 (ak.fund_etf_hist_sina) <<<\n")
etf_items = [p for p in PRODUCTS if p[2] == 'ETF']
for code, name, ptype, sym, cat in etf_items:
    try:
        df = ak.fund_etf_hist_sina(symbol=sym)
        df = df.sort_values('date')
        df['close'] = pd.to_numeric(df['close'])
        latest = df.iloc[-1]
        nav = float(latest['close'])
        print(f"  ✓ {code} {name}: NAV={nav:.4f}  交易日={len(df)}天  最新日期={latest['date']}")
    except Exception as e:
        print(f"  ✗ {code} {name}: 行情失败 - {str(e)[:80]}")
    time.sleep(0.3)

# ─── 2. 联接/指数基金净值验证 ───
print("\n\n>>> 2. 场外基金净值 (ak.fund_open_fund_info_em) <<<\n")
fund_items = [p for p in PRODUCTS if p[2] != 'ETF']
for code, name, ptype, sym, cat in fund_items:
    try:
        # 尝试获取基金信息
        info = ak.fund_open_fund_info_em(symbol=code, indicator='单位净值走势')
        if info is not None and not info.empty:
            latest_row = info.iloc[-1]
            nav_val = float(latest_row.iloc[1]) if len(latest_row) >= 2 else '?'
            print(f"  ✓ {code} {name} ({ptype}): 净值数据={len(info)}天  最新净值≈{nav_val}")
        else:
            print(f"  ✗ {code} {name} ({ptype}): 返回空")
    except Exception as e:
        # 试试备用方式 - 基金历史净值
        try:
            df2 = ak.fund_open_fund_info_em(symbol=code, indicator='累计净值走势')
            if df2 is not None and not df2.empty:
                print(f"  △ {code} {name} ({ptype}): 累计净值可用, {len(df2)}条")
            else:
                print(f"  ✗ {code} {name} ({ptype}): 失败 - {str(e)[:80]}")
        except Exception as e2:
            print(f"  ✗ {code} {name} ({ptype}): 失败 - {str(e2)[:80]}")
    time.sleep(0.3)

# ─── 3. ETF持仓验证（中证指数成分股 vs 基金季报持仓）───
print("\n\n>>> 3. 持仓/成分股获取 <<<\n")
for code, name, ptype, sym, cat in etf_items:
    # 先试中证指数
    try:
        # 查这支ETF的跟踪指数代码
        # 515180 → 000922(中证红利), 563020 → 930955(红利低波), 等等
        pass
    except:
        pass

    # 用基金季报持仓
    try:
        df_hold = ak.fund_portfolio_hold_em(symbol=code, date='2026')
        count = len(df_hold)
        codes = df_hold['股票代码'].tolist()[:5]
        print(f"  ✓ {code} {name}: 季报持仓 {count} 只 (前5: {codes})")
    except Exception as e:
        print(f"  ✗ {code} {name}: 持仓获取失败 - {str(e)[:80]}")
    time.sleep(0.3)

print("\n\n>>> 4. 联接基金底层ETF确认 <<<\n")
# 联接基金有季报披露的持仓ETF
feeder_funds = ['021961', '020866', '016185', '009051', '020602']
for code in feeder_funds:
    name = [p[1] for p in PRODUCTS if p[0] == code][0]
    try:
        df_hold = ak.fund_portfolio_hold_em(symbol=code, date='2026')
        if df_hold is not None and not df_hold.empty:
            # 联接基金主要持仓是ETF而非股票
            codes = df_hold['股票代码'].tolist()[:10]
            names_list = df_hold['股票名称'].tolist()[:10]
            print(f"  ✓ {code} {name}: 持仓 {len(df_hold)} 项 → {list(zip(codes, names_list))}")
        else:
            print(f"  ✗ {code} {name}: 持仓为空")
    except Exception as e:
        print(f"  ✗ {code} {name}: {str(e)[:80]}")
    time.sleep(0.3)

# ─── 指数成分股验证 ───
print("\n\n>>> 5. 指数成分股 (ak.index_stock_cons_csindex) <<<\n")
INDEX_TESTS = [
    ('000922', '中证红利'),
    ('930955', '红利低波(CSI)'),
    ('931446', '东证红利低波'),
    ('931375', '标普红利低波50(CSI)'),
]
for idx_code, idx_name in INDEX_TESTS:
    try:
        df_cons = ak.index_stock_cons_csindex(symbol=idx_code)
        print(f"  ✓ {idx_code} {idx_name}: {len(df_cons)} 只成分股")
    except Exception as e:
        print(f"  ✗ {idx_code} {idx_name}: {str(e)[:80]}")
    time.sleep(0.3)

print("\n\n" + "=" * 70)
print("  验证完成")
print("=" * 70)
