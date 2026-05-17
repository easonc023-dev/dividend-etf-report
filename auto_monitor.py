#!/usr/bin/env python
"""自动巡检 - 每周刷新一次515450深度分析报告"""
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

def main():
    log("=== 515450 自动巡检开始 ===")
    try:
        result = subprocess.run(
            [sys.executable, os.path.join(SCRIPT_DIR, 'generate_report.py')],
            capture_output=True, text=True, encoding='utf-8', errors='replace',
            timeout=300, cwd=SCRIPT_DIR
        )
        if result.returncode == 0:
            log("报告刷新成功: 红利低波50ETF_515450_深度分析.html")
            # 打印最后几行关键数据
            for line in result.stdout.strip().split('\n')[-8:]:
                if line.strip():
                    log(f"  {line.strip()}")
        else:
            log(f"失败(exit={result.returncode}): {result.stderr[:300]}")
    except Exception as e:
        log(f"异常: {e}")
    log("=== 巡检结束 ===")

if __name__ == '__main__':
    main()
