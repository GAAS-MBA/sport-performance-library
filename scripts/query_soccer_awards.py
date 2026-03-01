#!/usr/bin/env python3
"""
著名な賞を3回以上連続で獲得したサッカー選手 クエリスクリプト

再現性のあるインプットアウトプット:
  python query_soccer_awards.py [賞名] [--min N] [--top N] [--json]
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.optimizations.soccer_award_winners import (
    get_award_winners,
    get_top10_unique_players,
    list_awards,
)


def main():
    parser = argparse.ArgumentParser(
        description="著名な賞を3回以上連続で獲得した選手を検索"
    )
    parser.add_argument(
        "award",
        nargs="?",
        default=None,
        help="賞名 (例: ballon_dor, pichichi, premier_league_golden_boot)",
    )
    parser.add_argument(
        "--min",
        type=int,
        default=3,
        help="最小連続回数 (デフォルト: 3)",
    )
    parser.add_argument(
        "--top",
        type=int,
        default=None,
        help="表示件数 (省略時は10)",
    )
    parser.add_argument(
        "--unique",
        action="store_true",
        help="歴代Top10選手（同一選手は最高記録のみ）",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="JSON形式で出力",
    )
    parser.add_argument(
        "--list-awards",
        action="store_true",
        help="賞一覧を表示",
    )
    args = parser.parse_args()

    if args.list_awards:
        awards = list_awards()
        if args.json:
            print(json.dumps(awards, indent=2, ensure_ascii=False))
        else:
            for a in awards:
                print(f"  {a['key']}: {a['name_ja']} ({a['name_en']})")
        return 0

    if args.unique:
        results = get_top10_unique_players()
    else:
        results = get_award_winners(
            award=args.award,
            min_consecutive=args.min,
            top_n=args.top or 10,
        )

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        if not results:
            print("該当する選手はいません。")
            return 1
        title = "歴代 Top 10" if args.unique else f"3回以上連続受賞 ({args.award or '全賞'})"
        print(f"【{title}】\n")
        for i, r in enumerate(results, 1):
            origin = f" ({r['name_origin']})" if r.get("name_origin") else ""
            print(
                f"  {i}. {r['name']}{origin}"
                f" - {r['consecutive_wins']}回連続"
                f" [{r['award']}]"
                f" {r['years']}"
                f" ({r['country']})"
            )
    return 0


if __name__ == "__main__":
    sys.exit(main())
