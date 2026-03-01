"""
Sprint Top 10 - オリンピック短距離金メダル
短距離走 Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【Olympic Sprint Gold】
  SCREENING_RULE: オリンピック短距離（100m, 200m, 4x100mリレー）で
                  金メダル を 3個以上 獲得
  SORT_ORDER:     金メダル数 降順 → 同点時は初獲得年 昇順
  DATA_SCOPE:     夏季オリンピック陸上競技（100m, 200m, 4x100mリレーのみ）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "olympic_sprint_gold": {
        "rule": "オリンピック短距離（100m, 200m, 4x100mリレー）で 金メダル を 3個以上 獲得",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "Summer Olympics Athletics (100m, 200m, 4x100m relay only)",
        "source": "IOC / World Athletics / Wikipedia",
    },
}


@dataclass
class SprintRecord:
    """短距離記録"""

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


# オリンピック短距離（100m, 200m, 4x100m）金メダル 3個以上獲得者
# 出典: IOC, World Athletics, Wikipedia
OLYMPIC_SPRINT_GOLD_3PLUS: list[SprintRecord] = [
    SprintRecord("Usain Bolt", "Usain St. Leo Bolt", "olympic_sprint_gold", 8, "2008-2016", "Jamaica", "M"),
    SprintRecord("Carl Lewis", "Frederick Carlton Lewis", "olympic_sprint_gold", 6, "1984-1996", "USA", "M"),
    SprintRecord("Elaine Thompson-Herah", "Elaine Thompson-Herah", "olympic_sprint_gold", 5, "2016-2024", "Jamaica", "F"),
    SprintRecord("Maurice Greene", "Maurice Greene", "olympic_sprint_gold", 4, "2000-2004", "USA", "M"),
    SprintRecord("Shelly-Ann Fraser-Pryce", "Shelly-Ann Fraser-Pryce", "olympic_sprint_gold", 4, "2008-2024", "Jamaica", "F"),
    SprintRecord("Jesse Owens", "James Cleveland Owens", "olympic_sprint_gold", 3, "1936", "USA", "M"),
    SprintRecord("Florence Griffith Joyner", "Florence Delorez Griffith", "olympic_sprint_gold", 3, "1988", "USA", "F"),
    SprintRecord("Valerie Brisco-Hooks", "Valerie Ann Brisco-Hooks", "olympic_sprint_gold", 3, "1984", "USA", "F"),
    SprintRecord("Wilma Rudolph", "Wilma Glodean Rudolph", "olympic_sprint_gold", 3, "1960", "USA", "F"),
    SprintRecord("Betty Cuthbert", "Elizabeth Cuthbert", "olympic_sprint_gold", 3, "1956", "Australia", "F"),
    SprintRecord("Wyomia Tyus", "Wyomia Tyus", "olympic_sprint_gold", 3, "1964-1968", "USA", "F"),
]


def get_top10(
    award_type: str = "olympic_sprint_gold",
    min_count: Optional[int] = None,
    gender: Optional[str] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "olympic_sprint_gold"
        min_count: 最小金メダル数（省略時は3）
        gender: "M" | "F" | None（全選手）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    records = OLYMPIC_SPRINT_GOLD_3PLUS
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
