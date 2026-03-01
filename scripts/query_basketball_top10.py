#!/usr/bin/env python3
"""
バスケットボール Top 10 クエリスクリプト

スクリーニングロジック: NBA MVP 2回以上獲得
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.optimizations.basketball_top10 import get_top10, get_screening_logic


def main():
    parser = argparse.ArgumentParser(description="バスケットボール Top 10 (NBA MVP 2回以上)")
    parser.add_argument("--min-mvp", type=int, default=2, help="最小MVP受賞数")
    parser.add_argument("--json", action="store_true", help="JSON出力")
    parser.add_argument("--screening", action="store_true", help="スクリーニングロジック表示")
    args = parser.parse_args()

    if args.screening:
        logic = get_screening_logic()
        if args.json:
            print(json.dumps(logic, indent=2, ensure_ascii=False))
        else:
            print("【スクリーニングロジック】")
            for k, v in logic.items():
                print(f"  {k}: {v}")
        return 0

    results = get_top10(min_mvp=args.min_mvp)
    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        print("【バスケットボール Top 10】NBA MVP 2回以上獲得\n")
        print("スクリーニング: NBA MVP 2回以上 | ソート: 受賞数降順\n")
        for i, r in enumerate(results, 1):
            print(f"  {i}. {r['name']} ({r['name_origin']}) - {r['mvp_count']}回 ({r['years']}) [{r['country']}]")
    return 0


if __name__ == "__main__":
    sys.exit(main())
