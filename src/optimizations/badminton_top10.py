"""
Badminton Top 10 - オリンピックバドミントン金メダル
バドミントン Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【Olympic Badminton Gold】
  SCREENING_RULE: オリンピックバドミントンで 金メダル を 2個以上 獲得
                  ※バドミントンは金メダル3個以上の選手が存在しないため2個以上
  SORT_ORDER:     金メダル数 降順 → 同点時は初獲得年 昇順
  DATA_SCOPE:     夏季オリンピックバドミントン（シングルス・ダブルス・混合ダブルス）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "olympic_badminton_gold": {
        "rule": "オリンピックバドミントンで 金メダル を 2個以上 獲得",
        "min_count": 2,
        "sort_primary": "count_desc",
        "data_scope": "Summer Olympics Badminton (singles, doubles, mixed doubles)",
        "source": "IOC / BWF / Wikipedia",
    },
}


@dataclass
class BadmintonRecord:
    """バドミントン記録"""

    name: str
    name_origin: str
    award_type: str
    count: int
    years: str
    country: str
    gender: str = ""  # M | F
    discipline: str = ""  # singles | doubles | mixed | multiple

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


# オリンピックバドミントン金メダル 2個以上獲得者
# 出典: IOC, BWF, Wikipedia（バドミントンは金メダル3個以上の選手が存在しない）
OLYMPIC_BADMINTON_GOLD_2PLUS: list[BadmintonRecord] = [
    BadmintonRecord("Ge Fei", "葛菲", "olympic_badminton_gold", 2, "1996-2000", "China", "F", "doubles"),
    BadmintonRecord("Gu Jun", "顧俊", "olympic_badminton_gold", 2, "1996-2000", "China", "F", "doubles"),
    BadmintonRecord("Gao Ling", "高崚", "olympic_badminton_gold", 2, "2000-2004", "China", "F", "mixed"),
    BadmintonRecord("Zhang Jun", "张军", "olympic_badminton_gold", 2, "2000-2004", "China", "M", "mixed"),
    BadmintonRecord("Zhang Ning", "张宁", "olympic_badminton_gold", 2, "2004-2008", "China", "F", "singles"),
    BadmintonRecord("Lin Dan", "林丹", "olympic_badminton_gold", 2, "2008-2012", "China", "M", "singles"),
    BadmintonRecord("Fu Haifeng", "傅海峰", "olympic_badminton_gold", 2, "2012-2016", "China", "M", "doubles"),
    BadmintonRecord("Zhang Nan", "张楠", "olympic_badminton_gold", 2, "2012-2016", "China", "M", "multiple"),
    BadmintonRecord("Zhao Yunlei", "赵芸蕾", "olympic_badminton_gold", 2, "2012", "China", "F", "multiple"),
    BadmintonRecord("Kim Dong-moon", "김동문", "olympic_badminton_gold", 2, "1996-2004", "South Korea", "M", "multiple"),
    BadmintonRecord("Viktor Axelsen", "Viktor Axelsen", "olympic_badminton_gold", 2, "2020-2024", "Denmark", "M", "singles"),
    BadmintonRecord("Lee Yang", "李洋", "olympic_badminton_gold", 2, "2020-2024", "Chinese Taipei", "M", "doubles"),
    BadmintonRecord("Wang Chi-lin", "王齊麟", "olympic_badminton_gold", 2, "2020-2024", "Chinese Taipei", "M", "doubles"),
]


def get_top10(
    award_type: str = "olympic_badminton_gold",
    min_count: Optional[int] = None,
    gender: Optional[str] = None,
    discipline: Optional[str] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "olympic_badminton_gold"
        min_count: 最小金メダル数（省略時は2）
        gender: "M" | "F" | None（全選手）
        discipline: "singles" | "doubles" | "mixed" | "multiple" | None（全種目）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    records = OLYMPIC_BADMINTON_GOLD_2PLUS
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
