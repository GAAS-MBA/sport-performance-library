"""
Baseball Top 10 - MLB MVP & Cy Young Award
ベースボール Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【MVP】
  SCREENING_RULE: MLB MVP を 3回以上 獲得した選手（打者）
  SORT_ORDER:     MVP受賞数 降順 → 同点時は初受賞年 昇順
  DATA_SCOPE:     AL/NL MVP（1931年〜）
  OUTPUT:         Top 10

【Cy Young】
  SCREENING_RULE: Cy Young Award を 3回以上 獲得した投手
  SORT_ORDER:     受賞数 降順 → 同点時は初受賞年 昇順
  DATA_SCOPE:     AL/NL Cy Young（1956年〜、1967年から両リーグ別々）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "mvp": {
        "rule": "MLB MVP を 3回以上 獲得した選手（打者）",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "AL/NL MVP (1931 onwards)",
        "source": "BBWAA / Baseball-Reference",
    },
    "cy_young": {
        "rule": "Cy Young Award を 3回以上 獲得した投手",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "AL/NL Cy Young (1956 onwards, both leagues since 1967)",
        "source": "BBWAA / Baseball-Reference",
    },
}


@dataclass
class BaseballRecord:
    """MLB 賞記録"""

    name: str
    name_origin: str
    award_type: str  # mvp | cy_young
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


# MLB MVP 3回以上獲得者（スクリーニング適用済み）
MLB_MVP_3PLUS: list[BaseballRecord] = [
    BaseballRecord("Barry Bonds", "Barry Lamar Bonds", "mvp", 7, "1990, 1992, 1993, 2001, 2002, 2003, 2004", "USA"),
    BaseballRecord("Shohei Ohtani", "大谷翔平", "mvp", 4, "2021, 2023, 2024, 2025", "Japan"),
    BaseballRecord("Aaron Judge", "Aaron James Judge", "mvp", 3, "2022, 2024, 2025", "USA"),
    BaseballRecord("Mike Schmidt", "Michael Jack Schmidt", "mvp", 3, "1980, 1981, 1986", "USA"),
    BaseballRecord("Albert Pujols", "José Alberto Pujols Alcántara", "mvp", 3, "2005, 2008, 2009", "Dominican Republic"),
    BaseballRecord("Alex Rodriguez", "Alexander Emmanuel Rodriguez", "mvp", 3, "2003, 2005, 2007", "USA"),
    BaseballRecord("Mike Trout", "Michael Nelson Trout", "mvp", 3, "2014, 2016, 2019", "USA"),
    BaseballRecord("Mickey Mantle", "Mickey Charles Mantle", "mvp", 3, "1956, 1957, 1962", "USA"),
    BaseballRecord("Yogi Berra", "Lawrence Peter Berra", "mvp", 3, "1951, 1954, 1955", "USA"),
    BaseballRecord("Roy Campanella", "Roy Campanella", "mvp", 3, "1951, 1953, 1955", "USA"),
    BaseballRecord("Stan Musial", "Stanley Frank Musial", "mvp", 3, "1943, 1946, 1948", "USA"),
    BaseballRecord("Joe DiMaggio", "Joseph Paul DiMaggio", "mvp", 3, "1939, 1941, 1947", "USA"),
    BaseballRecord("Jimmie Foxx", "James Emory Foxx", "mvp", 3, "1932, 1933, 1938", "USA"),
]

# Cy Young Award 3回以上獲得者（スクリーニング適用済み）
MLB_CY_YOUNG_3PLUS: list[BaseballRecord] = [
    BaseballRecord("Roger Clemens", "William Roger Clemens", "cy_young", 7, "1986, 1987, 1991, 1997, 1998, 2001, 2004", "USA"),
    BaseballRecord("Randy Johnson", "Randall David Johnson", "cy_young", 5, "1995, 1999, 2000, 2001, 2002", "USA"),
    BaseballRecord("Greg Maddux", "Gregory Alan Maddux", "cy_young", 4, "1992, 1993, 1994, 1995", "USA"),
    BaseballRecord("Steve Carlton", "Steven Norman Carlton", "cy_young", 4, "1972, 1977, 1980, 1982", "USA"),
    BaseballRecord("Clayton Kershaw", "Clayton Edward Kershaw", "cy_young", 3, "2011, 2013, 2014", "USA"),
    BaseballRecord("Max Scherzer", "Maxwell Martin Scherzer", "cy_young", 3, "2013, 2016, 2017", "USA"),
    BaseballRecord("Sandy Koufax", "Sanford Braun Koufax", "cy_young", 3, "1963, 1965, 1966", "USA"),
    BaseballRecord("Jim Palmer", "James Alvin Palmer", "cy_young", 3, "1973, 1975, 1976", "USA"),
    BaseballRecord("Pedro Martínez", "Pedro Jaime Martínez", "cy_young", 3, "1997, 1999, 2000", "Dominican Republic"),
    BaseballRecord("Tom Seaver", "George Thomas Seaver", "cy_young", 3, "1969, 1973, 1975", "USA"),
]


def get_top10(
    award_type: str = "mvp",
    min_count: Optional[int] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "mvp" | "cy_young"
        min_count: 最小受賞数（省略時はスクリーニング基準: MVP=3, Cy Young=3）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    if award_type == "mvp":
        records = MLB_MVP_3PLUS
    else:
        records = MLB_CY_YOUNG_3PLUS

    filtered = [r for r in records if r.count >= threshold]
    filtered.sort(key=lambda x: (-x.count, x.years))
    return [r.to_dict() for r in filtered[:10]]


def get_screening_logic(award_type: Optional[str] = None) -> dict:
    """適用中のスクリーニングロジックを返す"""
    if award_type:
        return SCREENING_LOGIC[award_type].copy()
    return SCREENING_LOGIC.copy()
