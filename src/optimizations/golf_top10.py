"""
Golf Top 10 - メジャー優勝 & PGA Tour Player of the Year
ゴルフ Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【Majors】
  SCREENING_RULE: 男子メジャー（Masters, U.S. Open, The Open, PGA）を 3回以上 優勝
  SORT_ORDER:     優勝数 降順 → 同点時は初優勝年 昇順
  DATA_SCOPE:     男子メジャー4大会（1860年〜）
  OUTPUT:         Top 10

【PGA Tour Player of the Year】
  SCREENING_RULE: PGA Tour 年間最優秀選手賞（Jack Nicklaus Award）を 2回以上 獲得
  SORT_ORDER:     受賞数 降順 → 同点時は初受賞年 昇順
  DATA_SCOPE:     1990年〜（賞創設年）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "majors": {
        "rule": "男子メジャー（Masters, U.S. Open, The Open, PGA）を 3回以上 優勝",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "Men's Major Championships (1860 onwards)",
        "source": "PGA / R&A / USGA / Wikipedia",
    },
    "pga_player_of_year": {
        "rule": "PGA Tour 年間最優秀選手賞（Jack Nicklaus Award）を 2回以上 獲得",
        "min_count": 2,
        "sort_primary": "count_desc",
        "data_scope": "PGA Tour Player of the Year (1990 onwards)",
        "source": "PGA Tour Official",
    },
}


@dataclass
class GolfRecord:
    """ゴルフ記録"""

    name: str
    name_origin: str
    award_type: str  # majors | pga_player_of_year
    count: int
    years: str
    country: str

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "name_origin": self.name_origin,
            "award_type": self.award_type,
            "count": self.count,
            "years": self.years,
            "country": self.country,
        }


# 男子メジャー 3回以上優勝者（スクリーニング適用済み）
MAJORS_3PLUS: list[GolfRecord] = [
    GolfRecord("Jack Nicklaus", "Jack William Nicklaus", "majors", 18, "1962-1986", "USA"),
    GolfRecord("Tiger Woods", "Eldrick Tont Woods", "majors", 15, "1997-2019", "USA"),
    GolfRecord("Walter Hagen", "Walter Charles Hagen", "majors", 11, "1914-1929", "USA"),
    GolfRecord("Ben Hogan", "William Ben Hogan", "majors", 9, "1946-1953", "USA"),
    GolfRecord("Gary Player", "Gary Player", "majors", 9, "1959-1978", "South Africa"),
    GolfRecord("Tom Watson", "Thomas Sturges Watson", "majors", 8, "1975-1983", "USA"),
    GolfRecord("Harry Vardon", "Henry William Vardon", "majors", 7, "1896-1914", "Jersey"),
    GolfRecord("Bobby Jones", "Robert Tyre Jones Jr.", "majors", 7, "1923-1930", "USA"),
    GolfRecord("Gene Sarazen", "Eugenio Saraceni", "majors", 7, "1922-1935", "USA"),
    GolfRecord("Sam Snead", "Samuel Jackson Snead", "majors", 7, "1942-1954", "USA"),
    GolfRecord("Arnold Palmer", "Arnold Daniel Palmer", "majors", 7, "1958-1964", "USA"),
    GolfRecord("Lee Trevino", "Lee Buck Trevino", "majors", 6, "1968-1984", "USA"),
    GolfRecord("Nick Faldo", "Nicholas Alexander Faldo", "majors", 6, "1987-1996", "England"),
    GolfRecord("Phil Mickelson", "Philip Alfred Mickelson Jr.", "majors", 6, "2004-2021", "USA"),
]

# PGA Tour Player of the Year 2回以上獲得者（スクリーニング適用済み）
PGA_POY_2PLUS: list[GolfRecord] = [
    GolfRecord("Tiger Woods", "Eldrick Tont Woods", "pga_player_of_year", 11, "1997, 1999-2003, 2005-2007, 2009, 2013", "USA"),
    GolfRecord("Scottie Scheffler", "Scottie Scheffler", "pga_player_of_year", 4, "2022, 2023, 2024, 2025", "USA"),
    GolfRecord("Rory McIlroy", "Rory McIlroy", "pga_player_of_year", 3, "2012, 2014, 2019", "Northern Ireland"),
    GolfRecord("Fred Couples", "Frederick Stephen Couples", "pga_player_of_year", 2, "1991, 1992", "USA"),
    GolfRecord("Nick Price", "Nicholas Raymond Leige Price", "pga_player_of_year", 2, "1993, 1994", "Zimbabwe"),
    GolfRecord("Dustin Johnson", "Dustin Hunter Johnson", "pga_player_of_year", 2, "2016, 2020", "USA"),
]


def get_top10(
    award_type: str = "majors",
    min_count: Optional[int] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "majors" | "pga_player_of_year"
        min_count: 最小優勝/受賞数（省略時はスクリーニング基準）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    if award_type == "majors":
        records = MAJORS_3PLUS
    else:
        records = PGA_POY_2PLUS

    filtered = [r for r in records if r.count >= threshold]
    filtered.sort(key=lambda x: (-x.count, x.years))
    return [r.to_dict() for r in filtered[:10]]


def get_screening_logic(award_type: Optional[str] = None) -> dict:
    """適用中のスクリーニングロジックを返す"""
    if award_type:
        return SCREENING_LOGIC[award_type].copy()
    return SCREENING_LOGIC.copy()
