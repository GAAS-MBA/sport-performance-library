"""
Table Tennis Top 10 - オリンピック卓球金メダル
卓球 Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
【Olympic Table Tennis Gold】
  SCREENING_RULE: オリンピック卓球で 金メダル を 3個以上 獲得
  SORT_ORDER:     金メダル数 降順 → 同点時は初獲得年 昇順
  DATA_SCOPE:     夏季オリンピック卓球（シングルス・ダブルス・団体・混合ダブルス）
  OUTPUT:         Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "olympic_table_tennis_gold": {
        "rule": "オリンピック卓球で 金メダル を 3個以上 獲得",
        "min_count": 3,
        "sort_primary": "count_desc",
        "data_scope": "Summer Olympics Table Tennis (singles, doubles, team, mixed doubles)",
        "source": "IOC / ITTF / Wikipedia",
    },
}


@dataclass
class TableTennisRecord:
    """卓球記録"""

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


# オリンピック卓球金メダル 3個以上獲得者
# 出典: IOC, ITTF, Wikipedia
OLYMPIC_TABLE_TENNIS_GOLD_3PLUS: list[TableTennisRecord] = [
    TableTennisRecord("Ma Long", "马龙", "olympic_table_tennis_gold", 6, "2012-2024", "China", "M"),
    TableTennisRecord("Deng Yaping", "邓亚萍", "olympic_table_tennis_gold", 4, "1992-1996", "China", "F"),
    TableTennisRecord("Wang Nan", "王楠", "olympic_table_tennis_gold", 4, "2000-2008", "China", "F"),
    TableTennisRecord("Zhang Yining", "张怡宁", "olympic_table_tennis_gold", 4, "2004-2008", "China", "F"),
    TableTennisRecord("Chen Meng", "陈梦", "olympic_table_tennis_gold", 4, "2020-2024", "China", "F"),
    TableTennisRecord("Ma Lin", "马琳", "olympic_table_tennis_gold", 3, "2004-2008", "China", "M"),
    TableTennisRecord("Zhang Jike", "张继科", "olympic_table_tennis_gold", 3, "2012-2016", "China", "M"),
    TableTennisRecord("Li Xiaoxia", "李晓霞", "olympic_table_tennis_gold", 3, "2012-2016", "China", "F"),
    TableTennisRecord("Ding Ning", "丁宁", "olympic_table_tennis_gold", 3, "2012-2016", "China", "F"),
    TableTennisRecord("Fan Zhendong", "樊振东", "olympic_table_tennis_gold", 3, "2020-2024", "China", "M"),
    TableTennisRecord("Sun Yingsha", "孙颖莎", "olympic_table_tennis_gold", 3, "2020-2024", "China", "F"),
]


def get_top10(
    award_type: str = "olympic_table_tennis_gold",
    min_count: Optional[int] = None,
    gender: Optional[str] = None,
) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        award_type: "olympic_table_tennis_gold"
        min_count: 最小金メダル数（省略時は3）
        gender: "M" | "F" | None（全選手）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    logic = SCREENING_LOGIC[award_type]
    threshold = min_count if min_count is not None else logic["min_count"]

    records = OLYMPIC_TABLE_TENNIS_GOLD_3PLUS
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
