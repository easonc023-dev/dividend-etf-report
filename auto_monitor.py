#!/usr/bin/env python
"""自动巡检 - 每日更新报告 + 推送至GitHub Pages"""
import sys, os, subprocess
from datetime import datetime
sys.stdout.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(SCRIPT_DIR, '.monitor_log.txt')

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

def main():
    log("=== 红利策略自动巡检开始 ===")

    # 1. 切换到 master
    rc, out, err = run_cmd('git checkout master')
    if rc != 0:
        log(f"git checkout master 失败: {err}")
        return
    log("已切换到 master 分支")

    # 2. 在 master 上直接生成报告
    try:
        result = subprocess.run(
            [sys.executable, os.path.join(SCRIPT_DIR, 'generate_report.py')],
            capture_output=True, text=True, encoding='utf-8', errors='replace',
            timeout=900, cwd=SCRIPT_DIR
        )
        if result.returncode == 0:
            log("报告刷新成功")
            for line in result.stdout.strip().split('\n')[-6:]:
                if line.strip():
                    log(f"  {line.strip()}")
        else:
            log(f"报告生成失败(exit={result.returncode}): {result.stderr[:300]}")
            log("=== 巡检异常终止 ===")
            return
    except Exception as e:
        log(f"报告生成异常: {e}")
        log("=== 巡检异常终止 ===")
        return

    # 3. 提交
    ts = datetime.now().strftime('%Y-%m-%d %H:%M')
    commit_msg = f"每日数据更新: {ts}"

    rc, out, err = run_cmd('git add index.html "红利策略ETF深度分析.html"')
    if rc != 0:
        log(f"git add 失败: {err}")
        return

    rc, out, err = run_cmd(f'git commit -m "{commit_msg}"')
    if rc == 0:
        log(f"git commit 成功: {commit_msg}")
    elif 'nothing to commit' in err or 'nothing to commit' in out:
        log("git commit 跳过: 数据无变化")
        run_cmd('git checkout dev')
        log("=== 巡检结束 ===")
        return
    else:
        log(f"git commit 失败: {err}")
        return

    # 4. 推送到 GitHub
    rc, out, err = run_cmd('git push origin master', timeout=180)
    if rc == 0:
        log("git push 成功 -> GitHub Pages 将在1-2分钟内更新")
    else:
        log(f"git push 失败: {err[:300]}")
        log("GitHub Pages 未更新，请检查网络或手动推送")
        return

    # 5. 切回 dev
    run_cmd('git checkout dev')
    log("=== 巡检结束 ===")

if __name__ == '__main__':
    main()
