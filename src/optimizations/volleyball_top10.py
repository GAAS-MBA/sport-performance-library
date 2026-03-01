"""
Volleyball Top 10 - オリンピックバレーボール金メダル
バレーボール Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【Olympic Volleyball Gold】
  SCREENING_RULE: オリンピックバレーボール（室内＋ビーチ）で
                  金メダル を 3個以上 獲得
  SORT_ORDER:     金メダル数 降順 → 同点時は初獲得年 昇順
  DATA_SCOPE:     夏季オリンピック（室内バレーボール・ビーチバレーボール）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "olympic_volleyball_gold": {
        "rule": "オリンピックバレーボール（室内＋ビーチ）で 金メダル を 3個以上 獲得",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "Summer Olympics (indoor volleyball + beach volleyball)",
        "source": "IOC / FIVB / Wikipedia",
    },
}


@dataclass
class VolleyballRecord:
    """バレーボール記録"""

    name: str
    name_origin: str
    award_type: str
    count: int
    years: str
    country: str
    gender: str = ""  # M | F
    discipline: str = ""  # indoor | beach | both

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "name_origin": self.name_origin,
            "award_type": self.award_type,
            "count": self.count,
            "years": self.years,
            "country": self.country,
            "gender": self.gender,
            "discipline": self.discipline,
        }


# オリンピックバレーボール（室内＋ビーチ）金メダル 3個以上獲得者
# 出典: IOC, FIVB, Wikipedia
OLYMPIC_VOLLEYBALL_GOLD_3PLUS: list[VolleyballRecord] = [
    VolleyballRecord("Karch Kiraly", "Charles Frederick Kiraly", "olympic_volleyball_gold", 3, "1984-1996", "USA", "M", "both"),
    VolleyballRecord("Regla Torres", "Regla Radameris Torres Herrera", "olympic_volleyball_gold", 3, "1992-2000", "Cuba", "F", "indoor"),
    VolleyballRecord("Kerri Walsh Jennings", "Kerri Lee Walsh Jennings", "olympic_volleyball_gold", 3, "2004-2012", "USA", "F", "beach"),
    VolleyballRecord("Misty May-Treanor", "Misty Elizabeth May-Treanor", "olympic_volleyball_gold", 3, "2004-2012", "USA", "F", "beach"),
    VolleyballRecord("Mireya Luis", "Mireya Luis Hernández", "olympic_volleyball_gold", 3, "1992-2000", "Cuba", "F", "indoor"),
    VolleyballRecord("Marlenis Costa", "Marlenis Costa Blanco", "olympic_volleyball_gold", 3, "1992-2000", "Cuba", "F", "indoor"),
    VolleyballRecord("Regla Bell", "Regla Bell Macías", "olympic_volleyball_gold", 3, "1992-2000", "Cuba", "F", "indoor"),
    VolleyballRecord("Lilia Izquierdo", "Lilia Izquierdo", "olympic_volleyball_gold", 3, "1992-2000", "Cuba", "F", "indoor"),
    VolleyballRecord("Idalmis Gato", "Idalmis Gato Moya", "olympic_volleyball_gold", 3, "1992-2000", "Cuba", "F", "indoor"),
]


def get_top10(
    award_type: str = "olympic_volleyball_gold",
    min_count: Optional[int] = None,
    gender: Optional[str] = None,
    discipline: Optional[str] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "olympic_volleyball_gold"
        min_count: 最小金メダル数（省略時は3）
        gender: "M" | "F" | None（全選手）
        discipline: "indoor" | "beach" | "both" | None（全種目）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    records = OLYMPIC_VOLLEYBALL_GOLD_3PLUS
    filtered = [r for r in records if r.count >= threshold]
    if gender:
        filtered = [r for r in filtered if r.gender == gender.upper()]
    if discipline:
        filtered = [r for r in filtered if r.discipline == discipline.lower()]
    filtered.sort(key=lambda x: (-x.count, x.years))
    return [r.to_dict() for r in filtered[:10]]


def get_screening_logic(award_type: Optional[str] = None) -> dict:
    """適用中のスクリーニングロジックを返す"""
    if award_type:
        return SCREENING_LOGIC[award_type].copy()
    return SCREENING_LOGIC.copy()
