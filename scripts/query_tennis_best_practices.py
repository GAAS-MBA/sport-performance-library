#!/usr/bin/env python3
"""
テニス・コンピューティングベストプラクティス Top 10 クエリスクリプト

再現性のあるインプットアウトプット:
  python query_tennis_best_practices.py [指標] [--tour ATP|WTA] [--json]
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.optimizations.tennis_best_practices import get_top10, list_metrics


def main():
    parser = argparse.ArgumentParser(
        description="テニス・コンピューティングベストプラクティス Top 10"
    )
    parser.add_argument(
        "metric",
        nargs="?",
        default="composite",
        help="指標: composite | consecutive_weeks_no1 | total_weeks_no1 | grand_slam_titles",
    )
    parser.add_argument(
        "--tour",
        choices=["ATP", "WTA"],
        default=None,
        help="ツアーでフィルタ",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="JSON形式で出力",
    )
    parser.add_argument(
        "--list-metrics",
        action="store_true",
        help="指標一覧を表示",
    )
    args = parser.parse_args()

    if args.list_metrics:
        metrics = list_metrics()
        if args.json:
            print(json.dumps(metrics, indent=2, ensure_ascii=False))
        else:
            for m in metrics:
                print(f"  {m['key']}: {m['name_ja']} ({m['name_en']})")
        return 0

    results = get_top10(metric=args.metric, tour=args.tour)

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        metric_labels = {
            "composite": "総合スコア",
            "consecutive_weeks_no1": "連続週数",
            "total_weeks_no1": "総週数",
            "grand_slam_titles": "優勝回数",
        }
        label = metric_labels.get(args.metric, args.metric)
        tour_str = f" [{args.tour}]" if args.tour else ""
        print(f"【テニス ベストプラクティス Top 10】{tour_str}\n")
        print(f"指標: {label}\n")
        for i, r in enumerate(results, 1):
            origin = f" ({r['name_origin']})" if r.get("name_origin") else ""
            val = r["metric_value"]
            extra = f" GS:{r['grand_slam_titles']} #1:{r['total_weeks_no1']}週" if r.get("grand_slam_titles") or r.get("total_weeks_no1") else ""
            print(f"  {i}. {r['name']}{origin} [{r['tour']}] {label}:{val}{extra}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
