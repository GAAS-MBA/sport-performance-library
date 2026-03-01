#!/usr/bin/env python3
"""
階級別・3回以上防衛した歴代チャンピオン クエリスクリプト

再現性のあるインプットアウトプット:
  python query_champions.py [階級名] [--min-defenses N] [--sort defenses|name|reign]
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.optimizations.boxing_champions import get_champions, list_weight_classes


def main():
    parser = argparse.ArgumentParser(
        description="階級別・3回以上防衛した歴代チャンピオンを検索"
    )
    parser.add_argument(
        "weight_class",
        nargs="?",
        default=None,
        help="階級名 (例: heavyweight, middleweight, 17)",
    )
    parser.add_argument(
        "--min-defenses",
        type=int,
        default=3,
        help="最小防衛回数 (デフォルト: 3)",
    )
    parser.add_argument(
        "--sort",
        choices=["defenses", "name", "reign_start"],
        default="defenses",
        help="ソート基準",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="JSON形式で出力",
    )
    parser.add_argument(
        "--list-classes",
        action="store_true",
        help="階級一覧を表示",
    )
    args = parser.parse_args()

    if args.list_classes:
        classes = list_weight_classes()
        if args.json:
            print(json.dumps(classes, indent=2, ensure_ascii=False))
        else:
            for c in classes:
                print(f"  {c['key']}: {c['lbs']} lbs (id={c['id']})")
        return 0

    results = get_champions(
        weight_class=args.weight_class,
        min_defenses=args.min_defenses,
        sort_by=args.sort,
    )

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        if not results:
            print("該当する選手はいません。")
            return 1
        title = args.weight_class or "全階級"
        print(f"【{title}】3回以上防衛 ({len(results)}件)\n")
        for r in results:
            print(
                f"  {r['name']} ({r['country']})"
                f" - {r['defenses']}回防衛"
                f" {r['reign_start']}〜{r['reign_end']}"
                f" [{r['sanctioning_bodies']}]"
            )
    return 0


if __name__ == "__main__":
    sys.exit(main())
