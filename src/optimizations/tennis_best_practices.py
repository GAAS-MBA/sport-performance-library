"""
Tennis Computing Best Practices - Top 10
テニス・コンピューティングベストプラクティス

再現性のあるインプットアウトプットを持つコンピューターとして実装:
- INPUT: 指標 (consecutive_weeks_no1 | total_weeks_no1 | grand_slam_titles | composite)
- OUTPUT: Top 10 選手の構造化リスト（日本人以外は出身言語での名前を付与）
"""

from dataclasses import dataclass
from typing import Optional

# 指標定義
METRICS = {
    "consecutive_weeks_no1": {"id": 1, "name_en": "Consecutive Weeks at #1", "name_ja": "世界1位連続週数"},
    "total_weeks_no1": {"id": 2, "name_en": "Total Weeks at #1", "name_ja": "世界1位総週数"},
    "grand_slam_titles": {"id": 3, "name_en": "Grand Slam Singles Titles", "name_ja": "グランドスラム優勝"},
    "composite": {"id": 4, "name_en": "Composite Best Practices", "name_ja": "総合ベストプラクティス"},
}


@dataclass
class TennisRecord:
    """テニス記録"""

    name: str
    name_origin: str
    tour: str  # ATP | WTA
    metric_value: int
    metric_type: str
    period: str
    country: str
    grand_slam_titles: int = 0
    total_weeks_no1: int = 0

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "name_origin": self.name_origin,
            "tour": self.tour,
            "metric_value": self.metric_value,
            "metric_type": self.metric_type,
            "period": self.period,
            "country": self.country,
            "grand_slam_titles": self.grand_slam_titles,
            "total_weeks_no1": self.total_weeks_no1,
        }


# 世界1位連続週数 Top 10（ATP + WTA 統合、週数降順）
CONSECUTIVE_WEEKS_NO1: list[TennisRecord] = [
    TennisRecord("Roger Federer", "Roger Federer", "ATP", 237, "consecutive_weeks_no1", "2004-02-02 to 2008-08-17", "Switzerland", 20, 310),
    TennisRecord("Steffi Graf", "Stefanie Maria Graf", "WTA", 186, "consecutive_weeks_no1", "1987-08-17 to 1991-03-10", "Germany", 22, 377),
    TennisRecord("Serena Williams", "Serena Williams", "WTA", 186, "consecutive_weeks_no1", "2013-02-18 to 2016-09-11", "USA", 23, 319),
    TennisRecord("Jimmy Connors", "James Scott Connors", "ATP", 160, "consecutive_weeks_no1", "1974-07-29 to 1977-08-22", "USA", 8, 268),
    TennisRecord("Ivan Lendl", "Ivan Lendl", "ATP", 157, "consecutive_weeks_no1", "1985-09-09 to 1988-09-11", "Czechoslovakia", 8, 270),
    TennisRecord("Martina Navratilova", "Martina Navratilová", "WTA", 156, "consecutive_weeks_no1", "1982-06-14 to 1985-06-09", "USA", 18, 332),
    TennisRecord("Novak Djokovic", "Novak Đoković", "ATP", 122, "consecutive_weeks_no1", "2020-02-03 to 2022-06-12", "Serbia", 24, 428),
    TennisRecord("Ashleigh Barty", "Ashleigh Barty", "WTA", 114, "consecutive_weeks_no1", "2019-09 to 2022-04", "Australia", 3, 121),
    TennisRecord("Chris Evert", "Christine Marie Evert", "WTA", 113, "consecutive_weeks_no1", "1976-05 to 1978-07", "USA", 18, 260),
    TennisRecord("Pete Sampras", "Pete Sampras", "ATP", 102, "consecutive_weeks_no1", "1996-04-15 to 1998-03-29", "USA", 14, 286),
]

# 世界1位総週数 Top 10（週数降順）
TOTAL_WEEKS_NO1: list[TennisRecord] = [
    TennisRecord("Novak Djokovic", "Novak Đoković", "ATP", 428, "total_weeks_no1", "2011-2024", "Serbia", 24, 428),
    TennisRecord("Steffi Graf", "Stefanie Maria Graf", "WTA", 377, "total_weeks_no1", "1987-1997", "Germany", 22, 377),
    TennisRecord("Martina Navratilova", "Martina Navratilová", "WTA", 332, "total_weeks_no1", "1978-1990", "USA", 18, 332),
    TennisRecord("Serena Williams", "Serena Williams", "WTA", 319, "total_weeks_no1", "2002-2017", "USA", 23, 319),
    TennisRecord("Roger Federer", "Roger Federer", "ATP", 310, "total_weeks_no1", "2004-2018", "Switzerland", 20, 310),
    TennisRecord("Pete Sampras", "Pete Sampras", "ATP", 286, "total_weeks_no1", "1993-2000", "USA", 14, 286),
    TennisRecord("Ivan Lendl", "Ivan Lendl", "ATP", 270, "total_weeks_no1", "1983-1990", "Czechoslovakia", 8, 270),
    TennisRecord("Jimmy Connors", "James Scott Connors", "ATP", 268, "total_weeks_no1", "1974-1983", "USA", 8, 268),
    TennisRecord("Chris Evert", "Christine Marie Evert", "WTA", 260, "total_weeks_no1", "1975-1986", "USA", 18, 260),
    TennisRecord("Rafael Nadal", "Rafael Nadal Parera", "ATP", 209, "total_weeks_no1", "2008-2020", "Spain", 22, 209),
]

# グランドスラム優勝数 Top 10
GRAND_SLAM_TITLES: list[TennisRecord] = [
    TennisRecord("Margaret Court", "Margaret Court", "WTA", 24, "grand_slam_titles", "1960-1975", "Australia", 24, 0),
    TennisRecord("Novak Djokovic", "Novak Đoković", "ATP", 24, "grand_slam_titles", "2008-2024", "Serbia", 24, 428),
    TennisRecord("Serena Williams", "Serena Williams", "WTA", 23, "grand_slam_titles", "1999-2017", "USA", 23, 319),
    TennisRecord("Steffi Graf", "Stefanie Maria Graf", "WTA", 22, "grand_slam_titles", "1987-1999", "Germany", 22, 377),
    TennisRecord("Rafael Nadal", "Rafael Nadal Parera", "ATP", 22, "grand_slam_titles", "2005-2022", "Spain", 22, 209),
    TennisRecord("Roger Federer", "Roger Federer", "ATP", 20, "grand_slam_titles", "2003-2018", "Switzerland", 20, 310),
    TennisRecord("Helen Wills Moody", "Helen Newington Wills", "WTA", 19, "grand_slam_titles", "1923-1938", "USA", 19, 0),
    TennisRecord("Chris Evert", "Christine Marie Evert", "WTA", 18, "grand_slam_titles", "1974-1986", "USA", 18, 260),
    TennisRecord("Martina Navratilova", "Martina Navratilová", "WTA", 18, "grand_slam_titles", "1978-1990", "USA", 18, 332),
    TennisRecord("Pete Sampras", "Pete Sampras", "ATP", 14, "grand_slam_titles", "1990-2002", "USA", 14, 286),
]


def normalize_metric(query: Optional[str]) -> Optional[str]:
    """INPUT: 指標名 -> OUTPUT: 正規化されたキー"""
    if not query:
        return None
    q = query.lower().strip().replace(" ", "_")
    if q in METRICS:
        return q
    aliases = {
        "consecutive": "consecutive_weeks_no1",
        "total_weeks": "total_weeks_no1",
        "weeks": "total_weeks_no1",
        "grand_slam": "grand_slam_titles",
        "gs": "grand_slam_titles",
        "composite": "composite",
    }
    return aliases.get(q)


def get_top10(
    metric: str = "composite",
    tour: Optional[str] = None,
) -> list[dict]:
    """
    再現性のあるクエリ関数

    INPUT:
        metric: consecutive_weeks_no1 | total_weeks_no1 | grand_slam_titles | composite
        tour: ATP | WTA | None（全ツアー）

    OUTPUT:
        Top 10 選手の辞書リスト
    """
    normalized = normalize_metric(metric) or "composite"

    if normalized == "consecutive_weeks_no1":
        records = CONSECUTIVE_WEEKS_NO1
    elif normalized == "total_weeks_no1":
        records = TOTAL_WEEKS_NO1
    elif normalized == "grand_slam_titles":
        records = GRAND_SLAM_TITLES
    else:
        return get_top10_composite()

    results = [r.to_dict() for r in records]
    if tour:
        results = [r for r in results if r["tour"] == tour]
    return results[:10]


def get_top10_composite() -> list[dict]:
    """
    総合ベストプラクティス Top 10
    GS優勝数・世界1位週数を統合したランキング
    スコア = GS×10 + total_weeks/20
    """
    players: dict[str, tuple[int, int, TennisRecord]] = {}
    for r in GRAND_SLAM_TITLES + TOTAL_WEEKS_NO1:
        key = r.name
        gs = r.grand_slam_titles if r.grand_slam_titles else (r.metric_value if r.metric_type == "grand_slam_titles" else 0)
        weeks = r.total_weeks_no1 if r.total_weeks_no1 else (r.metric_value if r.metric_type == "total_weeks_no1" else 0)
        if key not in players:
            players[key] = (gs, weeks, r)
        else:
            old_gs, old_weeks, _ = players[key]
            players[key] = (max(gs, old_gs), max(weeks, old_weeks), r)
    score_sorted = sorted(
        players.values(),
        key=lambda x: (
            -(x[0] * 10 + x[1] // 20),
            -x[0],
            -x[1],
        ),
    )
    return [
        TennisRecord(
            r.name, r.name_origin, r.tour,
            gs * 10 + weeks // 20,
            "composite", r.period, r.country,
            grand_slam_titles=gs, total_weeks_no1=weeks,
        ).to_dict()
        for (gs, weeks, r) in score_sorted[:10]
    ]


def list_metrics() -> list[dict]:
    """指標一覧を返す"""
    return [
        {"id": info["id"], "key": key, "name_en": info["name_en"], "name_ja": info["name_ja"]}
        for key, info in METRICS.items()
    ]
