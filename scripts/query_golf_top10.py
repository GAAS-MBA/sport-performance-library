#!/usr/bin/env python3
"""
ゴルフ Top 10 クエリスクリプト

スクリーニングロジック:
  majors:            男子メジャー 3回以上優勝
  pga_player_of_year: PGA Tour 年間最優秀選手 2回以上獲得
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.optimizations.golf_top10 import get_top10, get_screening_logic


def main():
    parser = argparse.ArgumentParser(description="ゴルフ Top 10")
    parser.add_argument(
        "award",
        nargs="?",
        default="majors",
        choices=["majors", "pga_player_of_year"],
        help="賞種別",
    )
    parser.add_argument("--min", type=int, default=None, help="最小優勝/受賞数")
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
    labels = {
        "majors": ("男子メジャー優勝", 3),
        "pga_player_of_year": ("PGA Tour 年間最優秀選手", 2),
    }
    label, min_val = labels[args.award]
    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        print(f"【ゴルフ Top 10】{label} {min_val}回以上\n")
        print(f"スクリーニング: {label} {min_val}回以上 | ソート: 優勝/受賞数降順\n")
        for i, r in enumerate(results, 1):
            print(f"  {i}. {r['name']} ({r['name_origin']}) - {r['count']}回 ({r['years']}) [{r['country']}]")
    return 0


if __name__ == "__main__":
    sys.exit(main())
