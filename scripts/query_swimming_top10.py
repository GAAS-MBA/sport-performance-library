#!/usr/bin/env python3
"""
水泳 Top 10 クエリスクリプト

スクリーニングロジック: オリンピック競泳 金メダル 3個以上獲得
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.optimizations.swimming_top10 import get_top10, get_screening_logic


def main():
    parser = argparse.ArgumentParser(description="水泳 Top 10（オリンピック金メダル3個以上）")
    parser.add_argument("--min", type=int, default=3, help="最小金メダル数")
    parser.add_argument("--gender", choices=["M", "F"], default=None, help="性別でフィルタ")
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

    results = get_top10(min_count=args.min, gender=args.gender)
    gender_str = f" [{args.gender}]" if args.gender else ""
    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        print(f"【水泳 Top 10】オリンピック金メダル {args.min}個以上{gender_str}\n")
        print(f"スクリーニング: オリンピック競泳 金メダル {args.min}個以上 | ソート: 金メダル数降順\n")
        for i, r in enumerate(results, 1):
            g = f" [{r['gender']}]" if r.get("gender") else ""
            print(f"  {i}. {r['name']} ({r['name_origin']}){g} - {r['count']}個 ({r['years']}) [{r['country']}]")
    return 0


if __name__ == "__main__":
    sys.exit(main())
