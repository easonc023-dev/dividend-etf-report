#!/usr/bin/env python
"""自动巡检 - 每日更新报告 + 推送至GitHub Pages + 自检 + 本地同步"""
import sys, os, subprocess, re
from datetime import datetime
sys.stdout.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(SCRIPT_DIR, '.monitor_log.txt')
INDEX_PATH = os.path.join(SCRIPT_DIR, 'index.html')

def log(msg):
    ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(line + '\n')

def run_cmd(cmd, timeout=120):
    result = subprocess.run(
        cmd, capture_output=True, text=True,
        encoding='utf-8', errors='replace',
        timeout=timeout, cwd=SCRIPT_DIR, shell=True
    )
    return result.returncode, result.stdout.strip(), result.stderr.strip()

def check_nav_date():
    """检查 index.html 中的 nav_date 是否全是今天"""
    today_str = datetime.now().strftime('%Y-%m-%d')
    if not os.path.exists(INDEX_PATH):
        return False, "index.html 不存在"
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    dates = set(re.findall(r'nav_date:\s*"(\d{4}-\d{2}-\d{2})"', content))
    if not dates:
        return False, "未找到 nav_date 字段"
    stale = [d for d in dates if d != today_str]
    if stale:
        return False, f"nav_date 不是今天: {', '.join(sorted(stale))}"
    return True, f"全部 {len(dates)} 条 nav_date = {today_str}"

def run_generate():
    """运行 generate_report.py，返回 (success, output_lines)"""
    result = subprocess.run(
        [sys.executable, os.path.join(SCRIPT_DIR, 'generate_report.py')],
        capture_output=True, text=True, encoding='utf-8', errors='replace',
        timeout=900, cwd=SCRIPT_DIR
    )
    lines = result.stdout.strip().split('\n')
    if result.returncode == 0:
        return True, lines
    else:
        return False, [result.stderr[:500]]

def main():
    log("=== 红利策略自动巡检开始 ===")
    today_str = datetime.now().strftime('%Y-%m-%d')
    ok = True

    # ---- 1. 切换到 master ----
    rc, out, err = run_cmd('git checkout master')
    if rc != 0:
        log(f"FAIL git checkout master: {err}")
        return
    log("已切换到 master")

    # ---- 2. 在 master 上生成报告 ----
    success, lines = run_generate()
    if success:
        log("报告生成成功")
        for line in lines[-6:]:
            if line.strip():
                log(f"  {line.strip()}")
    else:
        log(f"报告生成失败: {''.join(lines)[:300]}")
        return

    # ---- 3. 提交 ----
    ts = datetime.now().strftime('%Y-%m-%d %H:%M')
    rc, out, err = run_cmd('git add index.html "红利策略ETF深度分析.html"')
    if rc != 0:
        log(f"FAIL git add: {err}")
        return

    rc, out, err = run_cmd(f'git commit -m "每日数据更新: {ts}"')
    if rc == 0:
        log("git commit 成功")
    elif 'nothing to commit' in err or 'nothing to commit' in out:
        log("git commit 跳过: 数据无变化")
        ok = False
    else:
        log(f"FAIL git commit: {err}")
        return

    # ---- 4. 推送到 GitHub ----
    if ok:
        rc, out, err = run_cmd('git push origin master', timeout=180)
        if rc == 0:
            log("git push 成功 -> GitHub Pages 将在1-2分钟内更新")
        else:
            log(f"FAIL git push: {err[:300]}")
            return

    # ---- 5. 数据自检 ----
    check_ok, check_msg = check_nav_date()
    if check_ok:
        log(f"自检通过: {check_msg}")
    else:
        log(f"自检失败: {check_msg}")
        log("数据可能不是当天最新，请检查数据源")

    # ---- 6. 切回 dev + 同步本地 HTML ----
    run_cmd('git checkout dev')
    log("已切换到 dev，正在生成本地 HTML...")
    success, lines = run_generate()
    if success:
        log("本地 HTML 已同步")
        for line in lines[-3:]:
            if line.strip():
                log(f"  {line.strip()}")
    else:
        log(f"本地 HTML 生成失败: {''.join(lines)[:300]}")

    # ---- 7. 收尾 ----
    if ok and check_ok:
        log(f"巡检成功 -> GitHub Pages + 本地 HTML 均已更新至 {today_str}")
    elif not ok:
        log("巡检结束（数据无变化，跳过推送）")
    else:
        log("巡检完成但有警告，请检查上方日志")

if __name__ == '__main__':
    main()
