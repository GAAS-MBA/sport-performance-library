"""
Basketball Top 10 - NBA MVP
バスケットボール Top 10 列挙

スクリーニングロジック（明確に規定）:
────────────────────────────────────────────────────────────────
  SCREENING_RULE: NBA MVP を 2回以上 獲得した選手
  SORT_ORDER:     MVP受賞数 降順 → 同点時は初受賞年 昇順
  DATA_SCOPE:     NBA レギュラーシーズン MVP（1955-56 シーズン〜）
  OUTPUT:         上記条件を満たす選手の Top 10
────────────────────────────────────────────────────────────────
"""

from dataclasses import dataclass
from typing import Optional

# スクリーニングロジックの定義（再現性のため定数化）
SCREENING_LOGIC = {
    "rule": "NBA MVP を 2回以上 獲得した選手",
    "min_mvp_count": 2,
    "sort_primary": "mvp_count_desc",
    "sort_secondary": "first_win_year_asc",
    "data_scope": "NBA Regular Season MVP (1955-56 season onwards)",
    "source": "NBA Official / Basketball-Reference",
}


@dataclass
class BasketballRecord:
    """NBA MVP 記録"""

    name: str
    name_origin: str
    mvp_count: int
    years: str
    country: str

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "name_origin": self.name_origin,
            "mvp_count": self.mvp_count,
            "years": self.years,
            "country": self.country,
        }


# NBA MVP 2回以上獲得者（スクリーニング適用済み、受賞数降順）
# 出典: NBA Official, Basketball-Reference, Wikipedia
NBA_MVP_2PLUS: list[BasketballRecord] = [
    BasketballRecord("Kareem Abdul-Jabbar", "Kareem Abdul-Jabbar", 6, "1971, 1972, 1974, 1976, 1977, 1980", "USA"),
    BasketballRecord("Michael Jordan", "Michael Jordan", 5, "1988, 1991, 1992, 1996, 1998", "USA"),
    BasketballRecord("Bill Russell", "William Felton Russell", 5, "1958, 1961, 1962, 1963, 1965", "USA"),
    BasketballRecord("Wilt Chamberlain", "Wilton Norman Chamberlain", 4, "1960, 1966, 1967, 1968", "USA"),
    BasketballRecord("LeBron James", "LeBron Raymone James Sr.", 4, "2009, 2010, 2012, 2013", "USA"),
    BasketballRecord("Larry Bird", "Larry Joe Bird", 3, "1984, 1985, 1986", "USA"),
    BasketballRecord("Magic Johnson", "Earvin Johnson Jr.", 3, "1987, 1989, 1990", "USA"),
    BasketballRecord("Moses Malone", "Moses Eugene Malone", 3, "1979, 1982, 1983", "USA"),
    BasketballRecord("Nikola Jokić", "Nikola Jokić", 3, "2021, 2022, 2024", "Serbia"),
    BasketballRecord("Bob Pettit", "Robert Lee Pettit Jr.", 2, "1956, 1959", "USA"),
    BasketballRecord("Karl Malone", "Karl Anthony Malone", 2, "1997, 1999", "USA"),
    BasketballRecord("Tim Duncan", "Timothy Theodore Duncan", 2, "2002, 2003", "USA"),
    BasketballRecord("Steve Nash", "Stephen John Nash", 2, "2005, 2006", "Canada"),
    BasketballRecord("Stephen Curry", "Wardell Stephen Curry II", 2, "2015, 2016", "USA"),
    BasketballRecord("Giannis Antetokounmpo", "Giannis Sina Ugo Antetokounmpo", 2, "2019, 2020", "Greece"),
]


def get_top10(min_mvp: int = 2) -> list[dict]:
    """
    スクリーニングロジックに基づく Top 10 取得

    INPUT:
        min_mvp: 最小MVP受賞数（デフォルト: 2 = スクリーニング基準）

    OUTPUT:
        条件を満たす選手の辞書リスト（最大10件）
    """
    filtered = [r for r in NBA_MVP_2PLUS if r.mvp_count >= min_mvp]
    # SORT: mvp_count 降順 → years 昇順（初受賞が早い順）
    filtered.sort(key=lambda x: (-x.mvp_count, x.years))
    return [r.to_dict() for r in filtered[:10]]


def get_screening_logic() -> dict:
    """適用中のスクリーニングロジックを返す"""
    return SCREENING_LOGIC.copy()
