"""
Soccer Award Winners - 3+ Consecutive Times
著名な賞を3回以上連続で獲得した選手

再現性のあるインプットアウトプットを持つコンピューターとして実装:
- INPUT: 賞名 / 最小連続回数 / ソート基準
- OUTPUT: 該当選手の構造化リスト（日本人以外は出身言語での名前を付与）
"""

from dataclasses import dataclass
from typing import Optional

# 著名な賞の定義
AWARDS = {
    "ballon_dor": {"id": 1, "name_en": "Ballon d'Or", "name_ja": "バロンドール"},
    "european_golden_shoe": {"id": 2, "name_en": "European Golden Shoe", "name_ja": "ヨーロッパ・ゴールデンシュー"},
    "pichichi": {"id": 3, "name_en": "Pichichi Trophy (La Liga)", "name_ja": "ピチーチ賞（ラ・リーガ）"},
    "premier_league_golden_boot": {"id": 4, "name_en": "Premier League Golden Boot", "name_ja": "プレミアリーグ・ゴールデンブーツ"},
    "bundesliga_torjagerkanone": {"id": 5, "name_en": "Bundesliga Torjägerkanone", "name_ja": "ブンデスリーガ得点王"},
    "ligue1_top_scorer": {"id": 6, "name_en": "Ligue 1 Top Scorer", "name_ja": "リーグ・アン得点王"},
    "capocannoniere": {"id": 7, "name_en": "Capocannoniere (Serie A)", "name_ja": "カポカンノニエーレ（セリエA）"},
}


@dataclass
class AwardWinnerRecord:
    """3回以上連続受賞した選手の記録"""

    name: str
    name_origin: str  # 出身言語での名前（日本人以外）
    award: str
    consecutive_wins: int
    years: str
    country: str
    country_code: str = ""

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "name_origin": self.name_origin,
            "award": self.award,
            "consecutive_wins": self.consecutive_wins,
            "years": self.years,
            "country": self.country,
        }


# 歴代 Top 10+ （著名な賞を3回以上連続獲得）
# 出典: France Football, UEFA, 各リーグ公式記録
AWARD_WINNERS_3PLUS_CONSECUTIVE: list[AwardWinnerRecord] = [
    # 1. Lionel Messi - Ballon d'Or 4連続（歴代最多）
    AwardWinnerRecord(
        name="Lionel Messi",
        name_origin="Lionel Andrés Messi Cuccittini",
        award="ballon_dor",
        consecutive_wins=4,
        years="2009-2012",
        country="Argentina",
        country_code="ARG",
    ),
    # 2. Michel Platini - Ballon d'Or 3連続
    AwardWinnerRecord(
        name="Michel Platini",
        name_origin="Michel François Platini",
        award="ballon_dor",
        consecutive_wins=3,
        years="1983-1985",
        country="France",
        country_code="FRA",
    ),
    # 3. Robert Lewandowski - ブンデスリーガ得点王 5連続（歴代最多）
    AwardWinnerRecord(
        name="Robert Lewandowski",
        name_origin="Robert Lewandowski",
        award="bundesliga_torjagerkanone",
        consecutive_wins=5,
        years="2017-18 to 2021-22",
        country="Poland",
        country_code="POL",
    ),
    # 4. Jean-Pierre Papin - リーグ・アン得点王 5連続
    AwardWinnerRecord(
        name="Jean-Pierre Papin",
        name_origin="Jean-Pierre Papin",
        award="ligue1_top_scorer",
        consecutive_wins=5,
        years="1987-88 to 1991-92",
        country="France",
        country_code="FRA",
    ),
    # 5. Hugo Sánchez - ピチーチ賞 4連続
    AwardWinnerRecord(
        name="Hugo Sánchez",
        name_origin="Hugo Sánchez Márquez",
        award="pichichi",
        consecutive_wins=4,
        years="1985-86 to 1988-89",
        country="Mexico",
        country_code="MEX",
    ),
    # 6. Lionel Messi - ヨーロッパ・ゴールデンシュー 3連続
    AwardWinnerRecord(
        name="Lionel Messi",
        name_origin="Lionel Andrés Messi Cuccittini",
        award="european_golden_shoe",
        consecutive_wins=3,
        years="2016-17 to 2018-19",
        country="Argentina",
        country_code="ARG",
    ),
    # 7. Lionel Messi - ピチーチ賞 3連続
    AwardWinnerRecord(
        name="Lionel Messi",
        name_origin="Lionel Andrés Messi Cuccittini",
        award="pichichi",
        consecutive_wins=3,
        years="2016-17 to 2018-19",
        country="Argentina",
        country_code="ARG",
    ),
    # 8. Alan Shearer - プレミアリーグ・ゴールデンブーツ 3連続
    AwardWinnerRecord(
        name="Alan Shearer",
        name_origin="Alan Shearer",
        award="premier_league_golden_boot",
        consecutive_wins=3,
        years="1994-95 to 1996-97",
        country="England",
        country_code="ENG",
    ),
    # 9. Thierry Henry - プレミアリーグ・ゴールデンブーツ 3連続
    AwardWinnerRecord(
        name="Thierry Henry",
        name_origin="Thierry Daniel Henry",
        award="premier_league_golden_boot",
        consecutive_wins=3,
        years="2003-04 to 2005-06",
        country="France",
        country_code="FRA",
    ),
    # 10. Telmo Zarra - ピチーチ賞 3連続
    AwardWinnerRecord(
        name="Telmo Zarra",
        name_origin="Telmo Zarraonandia Montoya",
        award="pichichi",
        consecutive_wins=3,
        years="1944-45 to 1946-47",
        country="Spain",
        country_code="ESP",
    ),
    # 11. Gunnar Nordahl - カポカンノニエーレ 3連続
    AwardWinnerRecord(
        name="Gunnar Nordahl",
        name_origin="Gunnar Nordahl",
        award="capocannoniere",
        consecutive_wins=3,
        years="1952-53 to 1954-55",
        country="Sweden",
        country_code="SWE",
    ),
    # 12. Kylian Mbappé - リーグ・アン得点王 3連続
    AwardWinnerRecord(
        name="Kylian Mbappé",
        name_origin="Kylian Mbappé Lottin",
        award="ligue1_top_scorer",
        consecutive_wins=3,
        years="2018-19 to 2020-21",
        country="France",
        country_code="FRA",
    ),
]


def normalize_award(query: Optional[str]) -> Optional[str]:
    """
    INPUT: 賞名（英語・別名・ID）
    OUTPUT: 正規化された賞キー、または None
    """
    if not query:
        return None
    q = query.lower().strip().replace(" ", "_").replace("-", "_")
    if q in AWARDS:
        return q
    for key, info in AWARDS.items():
        if q == str(info["id"]):
            return key
    return None


def get_award_winners(
    award: Optional[str] = None,
    min_consecutive: int = 3,
    sort_by: str = "consecutive_wins",
    top_n: Optional[int] = 10,
) -> list[dict]:
    """
    再現性のあるクエリ関数

    INPUT:
        award: 賞名（省略時は全賞）
        min_consecutive: 最小連続回数（デフォルト3）
        sort_by: ソート基準 ("consecutive_wins" | "name" | "years")
        top_n: 返す件数（省略時は10、Noneで全件）

    OUTPUT:
        該当選手の辞書リスト
    """
    normalized = normalize_award(award) if award else None
    results = [
        w.to_dict()
        for w in AWARD_WINNERS_3PLUS_CONSECUTIVE
        if w.consecutive_wins >= min_consecutive
        and (normalized is None or w.award == normalized)
    ]
    if sort_by == "consecutive_wins":
        results.sort(key=lambda x: (-x["consecutive_wins"], x["name"]))
    elif sort_by == "name":
        results.sort(key=lambda x: x["name"])
    elif sort_by == "years":
        results.sort(key=lambda x: x["years"])
    if top_n is not None:
        results = results[:top_n]
    return results


def get_top10_unique_players() -> list[dict]:
    """
    歴代 Top 10 選手（同一選手は最高記録のみ）
    連続回数・賞の格付けでランク付け
    """
    # 同一選手は最高記録のみを採用
    best_by_player: dict[str, AwardWinnerRecord] = {}
    for w in AWARD_WINNERS_3PLUS_CONSECUTIVE:
        if w.name not in best_by_player or w.consecutive_wins > best_by_player[w.name].consecutive_wins:
            best_by_player[w.name] = w
    # 連続回数降順、同点は賞の格付け（バロンドール最優先）、名前でソート
    prestige = {
        "ballon_dor": 3,
        "european_golden_shoe": 2,
        "pichichi": 2,
        "premier_league_golden_boot": 1,
        "bundesliga_torjagerkanone": 1,
        "ligue1_top_scorer": 1,
        "capocannoniere": 1,
    }
    sorted_players = sorted(
        best_by_player.values(),
        key=lambda x: (
            -x.consecutive_wins,
            -(prestige.get(x.award, 0)),
            x.name,
        ),
    )
    return [w.to_dict() for w in sorted_players[:10]]


def list_awards() -> list[dict]:
    """全賞の一覧を返す"""
    return [
        {"id": info["id"], "key": key, "name_en": info["name_en"], "name_ja": info["name_ja"]}
        for key, info in AWARDS.items()
    ]
