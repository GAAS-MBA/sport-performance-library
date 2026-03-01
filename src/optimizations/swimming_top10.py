"""
Swimming Top 10 - オリンピック金メダル
水泳 Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【Olympic Gold Medals】
  SCREENING_RULE: オリンピック競泳で 金メダル を 3個以上 獲得
  SORT_ORDER:     金メダル数 降順 → 同点時は初獲得年 昇順
  DATA_SCOPE:     夏季オリンピック競泳（個人・リレー含む）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "olympic_gold": {
        "rule": "オリンピック競泳で 金メダル を 3個以上 獲得",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "Summer Olympics Swimming (individual + relay)",
        "source": "IOC / World Aquatics / Wikipedia",
    },
}


@dataclass
class SwimmingRecord:
    """水泳記録"""

    name: str
    name_origin: str
    award_type: str
    count: int
    years: str
    country: str
    gender: str = ""  # M | F

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "name_origin": self.name_origin,
            "award_type": self.award_type,
            "count": self.count,
            "years": self.years,
            "country": self.country,
            "gender": self.gender,
        }


# オリンピック金メダル 3個以上獲得者（スクリーニング適用済み）
# 出典: IOC, World Aquatics, Wikipedia
OLYMPIC_GOLD_3PLUS: list[SwimmingRecord] = [
    SwimmingRecord("Michael Phelps", "Michael Fred Phelps II", "olympic_gold", 23, "2004-2016", "USA", "M"),
    SwimmingRecord("Katie Ledecky", "Kathleen Genevieve Ledecky", "olympic_gold", 9, "2012-2024", "USA", "F"),
    SwimmingRecord("Mark Spitz", "Mark Andrew Spitz", "olympic_gold", 9, "1968-1972", "USA", "M"),
    SwimmingRecord("Caeleb Dressel", "Caeleb Remel Dressel", "olympic_gold", 9, "2016-2024", "USA", "M"),
    SwimmingRecord("Jenny Thompson", "Jennifer Beth Thompson", "olympic_gold", 8, "1992-2004", "USA", "F"),
    SwimmingRecord("Matt Biondi", "Matthew Nicholas Biondi", "olympic_gold", 8, "1984-1992", "USA", "M"),
    SwimmingRecord("Emma McKeon", "Emma McKeon", "olympic_gold", 6, "2016-2024", "Australia", "F"),
    SwimmingRecord("Kristin Otto", "Kristin Otto", "olympic_gold", 6, "1988", "East Germany", "F"),
    SwimmingRecord("Amy Van Dyken", "Amy Van Dyken", "olympic_gold", 6, "1996-2000", "USA", "F"),
    SwimmingRecord("Ryan Lochte", "Ryan Steven Lochte", "olympic_gold", 6, "2004-2016", "USA", "M"),
    SwimmingRecord("Gary Hall Jr.", "Gary Wayne Hall Jr.", "olympic_gold", 5, "1996-2004", "USA", "M"),
    SwimmingRecord("Ian Thorpe", "Ian James Thorpe", "olympic_gold", 5, "2000-2004", "Australia", "M"),
    SwimmingRecord("Ryan Murphy", "Ryan Murphy", "olympic_gold", 5, "2016-2024", "USA", "M"),
    SwimmingRecord("Aaron Peirsol", "Aaron Wells Peirsol", "olympic_gold", 5, "2000-2008", "USA", "M"),
    SwimmingRecord("Nathan Adrian", "Nathan Ghar-Jun Adrian", "olympic_gold", 5, "2008-2016", "USA", "M"),
    SwimmingRecord("Don Schollander", "Donald Arthur Schollander", "olympic_gold", 5, "1964-1968", "USA", "M"),
    SwimmingRecord("Johnny Weissmuller", "Peter John Weissmüller", "olympic_gold", 5, "1924-1928", "USA", "M"),
    SwimmingRecord("Kaylee McKeown", "Kaylee McKeown", "olympic_gold", 5, "2020-2024", "Australia", "F"),
    SwimmingRecord("Mollie O'Callaghan", "Mollie O'Callaghan", "olympic_gold", 5, "2020-2024", "Australia", "F"),
    SwimmingRecord("Krisztina Egerszegi", "Krisztina Egerszegi", "olympic_gold", 5, "1988-1996", "Hungary", "F"),
    SwimmingRecord("Dana Vollmer", "Dana Whitney Vollmer", "olympic_gold", 5, "2004-2016", "USA", "F"),
    SwimmingRecord("Missy Franklin", "Melissa Jeanette Franklin", "olympic_gold", 5, "2012-2016", "USA", "F"),
    SwimmingRecord("Alexander Popov", "Aleksandr Vladimirovich Popov", "olympic_gold", 4, "1992-2000", "Russia", "M"),
    SwimmingRecord("Roland Matthes", "Roland Matthes", "olympic_gold", 4, "1968-1976", "East Germany", "M"),
    SwimmingRecord("Dara Torres", "Dara Grace Torres", "olympic_gold", 4, "1984-2008", "USA", "F"),
    SwimmingRecord("Dawn Fraser", "Dawn Fraser", "olympic_gold", 4, "1956-1964", "Australia", "F"),
    SwimmingRecord("Kornelia Ender", "Kornelia Ender", "olympic_gold", 4, "1972-1976", "East Germany", "F"),
    SwimmingRecord("Allison Schmitt", "Allison Schmitt", "olympic_gold", 4, "2008-2020", "USA", "F"),
    SwimmingRecord("Ariarne Titmus", "Ariarne Titmus", "olympic_gold", 4, "2020-2024", "Australia", "F"),
]


def get_top10(
    award_type: str = "olympic_gold",
    min_count: Optional[int] = None,
    gender: Optional[str] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "olympic_gold"
        min_count: 最小金メダル数（省略時は3）
        gender: "M" | "F" | None（全選手）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    records = OLYMPIC_GOLD_3PLUS
    filtered = [r for r in records if r.count >= threshold]
    if gender:
        filtered = [r for r in filtered if r.gender == gender.upper()]
    filtered.sort(key=lambda x: (-x.count, x.years))
    return [r.to_dict() for r in filtered[:10]]


def get_screening_logic(award_type: Optional[str] = None) -> dict:
    """適用中のスクリーニングロジックを返す"""
    if award_type:
        return SCREENING_LOGIC[award_type].copy()
    return SCREENING_LOGIC.copy()
