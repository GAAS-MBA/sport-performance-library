"""
Long Distance Top 10 - オリンピック長距離金メダル
長距離走 Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【Olympic Long Distance Gold】
  SCREENING_RULE: オリンピック長距離（5000m, 10000m, マラソン）で
                  金メダル を 3個以上 獲得
  SORT_ORDER:     金メダル数 降順 → 同点時は初獲得年 昇順
  DATA_SCOPE:     夏季オリンピック陸上競技（5000m, 10000m, マラソンのみ）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "olympic_long_distance_gold": {
        "rule": "オリンピック長距離（5000m, 10000m, マラソン）で 金メダル を 3個以上 獲得",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "Summer Olympics Athletics (5000m, 10000m, marathon only)",
        "source": "IOC / World Athletics / Wikipedia",
    },
}


@dataclass
class LongDistanceRecord:
    """長距離記録"""

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


# オリンピック長距離（5000m, 10000m, マラソン）金メダル 3個以上獲得者
# 出典: IOC, World Athletics, Wikipedia
OLYMPIC_LONG_DISTANCE_GOLD_3PLUS: list[LongDistanceRecord] = [
    LongDistanceRecord("Emil Zátopek", "Emil Zátopek", "olympic_long_distance_gold", 4, "1948-1952", "Czechoslovakia", "M"),
    LongDistanceRecord("Mo Farah", "Mohamed Farah", "olympic_long_distance_gold", 4, "2012-2016", "Great Britain", "M"),
    LongDistanceRecord("Lasse Virén", "Lasse Virén", "olympic_long_distance_gold", 4, "1972-1976", "Finland", "M"),
    LongDistanceRecord("Paavo Nurmi", "Paavo Johannes Nurmi", "olympic_long_distance_gold", 3, "1920-1928", "Finland", "M"),
    LongDistanceRecord("Kenenisa Bekele", "ከነኒሳ በቀለ", "olympic_long_distance_gold", 3, "2004-2008", "Ethiopia", "M"),
    LongDistanceRecord("Tirunesh Dibaba", "ትሩነሽ ዲባባ", "olympic_long_distance_gold", 3, "2008-2012", "Ethiopia", "F"),
]


def get_top10(
    award_type: str = "olympic_long_distance_gold",
    min_count: Optional[int] = None,
    gender: Optional[str] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "olympic_long_distance_gold"
        min_count: 最小金メダル数（省略時は3）
        gender: "M" | "F" | None（全選手）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    records = OLYMPIC_LONG_DISTANCE_GOLD_3PLUS
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
