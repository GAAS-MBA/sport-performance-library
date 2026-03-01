#!/usr/bin/env python3
"""
ベースボール Top 10 クエリスクリプト

スクリーニングロジック:
  MVP:    MLB MVP 3回以上獲得
  Cy Young: Cy Young Award 3回以上獲得
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.optimizations.baseball_top10 import get_top10, get_screening_logic


def main():
    parser = argparse.ArgumentParser(description="ベースボール Top 10")
    parser.add_argument("award", nargs="?", default="mvp", choices=["mvp", "cy_young"], help="賞種別")
    parser.add_argument("--min", type=int, default=None, help="最小受賞数（省略時は基準値）")
    parser.add_argument("--json", action="store_true", help="JSON出力")
    parser.add_argument("--screening", action="store_true", help="スクリーニングロジック表示")
    args = parser.parse_args()

    if args.screening:
        logic = get_screening_logic()
        if args.json:
            print(json.dumps(logic, indent=2, ensure_ascii=False))
        else:
            print("【スクリーニングロジック】")
            for award, rules in logic.items():
                print(f"\n[{award}]")
                for k, v in rules.items():
                    print(f"  {k}: {v}")
        return 0

    results = get_top10(award_type=args.award, min_count=args.min)
    label = "MLB MVP" if args.award == "mvp" else "Cy Young Award"
    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        min_val = 3
        print(f"【ベースボール Top 10】{label} {min_val}回以上獲得\n")
        print(f"スクリーニング: {label} {min_val}回以上 | ソート: 受賞数降順\n")
        for i, r in enumerate(results, 1):
            print(f"  {i}. {r['name']} ({r['name_origin']}) - {r['count']}回 ({r['years']}) [{r['country']}]")
    return 0


if __name__ == "__main__":
    sys.exit(main())
