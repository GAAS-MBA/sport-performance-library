"""
Boxing Champions with 3+ Title Defenses by Weight Class
階級別・3回以上防衛した歴代チャンピオン

再現性のあるインプットアウトプットを持つコンピューターとして実装:
- INPUT: 階級名 / 階級ID / 最小防衛回数
- OUTPUT: 該当選手の構造化リスト
"""

from dataclasses import dataclass, field
from typing import Optional

# 階級定義（再現可能なマスターデータ）
WEIGHT_CLASSES = {
    "minimumweight": {"id": 1, "lbs": 105, "kg": 47.6, "alias": ["strawweight"]},
    "light_flyweight": {"id": 2, "lbs": 108, "kg": 49.0, "alias": []},
    "flyweight": {"id": 3, "lbs": 112, "kg": 50.8, "alias": []},
    "super_flyweight": {"id": 4, "lbs": 115, "kg": 52.2, "alias": []},
    "bantamweight": {"id": 5, "lbs": 118, "kg": 53.5, "alias": []},
    "super_bantamweight": {"id": 6, "lbs": 122, "kg": 55.3, "alias": ["jr_featherweight"]},
    "featherweight": {"id": 7, "lbs": 126, "kg": 57.2, "alias": []},
    "super_featherweight": {"id": 8, "lbs": 130, "kg": 59.0, "alias": ["jr_lightweight"]},
    "lightweight": {"id": 9, "lbs": 135, "kg": 61.2, "alias": []},
    "super_lightweight": {"id": 10, "lbs": 140, "kg": 63.5, "alias": ["jr_welterweight"]},
    "welterweight": {"id": 11, "lbs": 147, "kg": 66.7, "alias": []},
    "super_welterweight": {"id": 12, "lbs": 154, "kg": 69.9, "alias": ["jr_middleweight"]},
    "middleweight": {"id": 13, "lbs": 160, "kg": 72.6, "alias": []},
    "super_middleweight": {"id": 14, "lbs": 168, "kg": 76.2, "alias": []},
    "light_heavyweight": {"id": 15, "lbs": 175, "kg": 79.4, "alias": []},
    "cruiserweight": {"id": 16, "lbs": 200, "kg": 90.7, "alias": []},
    "heavyweight": {"id": 17, "lbs": 200, "kg": 90.7, "alias": []},
}


@dataclass
class ChampionRecord:
    """3回以上防衛したチャンピオンの記録"""

    name: str
    weight_class: str
    defenses: int
    reign_start: str
    reign_end: str
    sanctioning_bodies: str
    country: str = ""

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "weight_class": self.weight_class,
            "defenses": self.defenses,
            "reign_start": self.reign_start,
            "reign_end": self.reign_end,
            "sanctioning_bodies": self.sanctioning_bodies,
            "country": self.country,
        }


# 歴代チャンピオン（3回以上防衛）の正規化データ
# 出典: BoxRec, Guinness World Records, 各団体公式記録
CHAMPIONS_3PLUS_DEFENSES: list[ChampionRecord] = [
    # Minimumweight (105 lbs)
    ChampionRecord("Ricardo López", "minimumweight", 21, "1991-05-19", "1998-03-07", "WBC", "MEX"),
    ChampionRecord("Chayaphon Moonsri", "minimumweight", 12, "2014-11-27", "2020-02-29", "WBC", "THA"),
    ChampionRecord("Ivan Calderon", "minimumweight", 6, "2003-08-28", "2007-05-05", "WBO", "PUR"),
    ChampionRecord("Kosei Tanaka", "minimumweight", 3, "2015-05-30", "2016-12-31", "WBO", "JPN"),
    # Light Flyweight (108 lbs)
    ChampionRecord("Yuh Myung-woo", "light_flyweight", 17, "1990-03-19", "1993-09-17", "WBA", "KOR"),
    ChampionRecord("Michael Carbajal", "light_flyweight", 8, "1993-07-17", "1994-11-19", "IBF", "USA"),
    ChampionRecord("Hugo Cázares", "light_flyweight", 4, "2005-12-03", "2007-08-04", "WBO", "MEX"),
    ChampionRecord("Kazuto Ioka", "light_flyweight", 6, "2012-06-20", "2014-05-07", "WBA", "JPN"),
    # Flyweight (112 lbs)
    ChampionRecord("Pongsaklek Wonjongkam", "flyweight", 17, "2001-03-02", "2007-03-02", "WBC", "THA"),
    ChampionRecord("Miguel Canto", "flyweight", 14, "1975-01-08", "1979-03-18", "WBC", "MEX"),
    ChampionRecord("Omar Narváez", "flyweight", 16, "2002-07-13", "2009-12-19", "WBO", "ARG"),
    ChampionRecord("Roman Gonzalez", "flyweight", 4, "2008-09-15", "2010-10-16", "WBA", "NIC"),
    ChampionRecord("Vic Darchinyan", "flyweight", 6, "2004-12-03", "2007-07-07", "IBF", "ARM"),
    # Super Flyweight (115 lbs)
    ChampionRecord("Khaosai Galaxy", "super_flyweight", 19, "1984-11-21", "1991-12-19", "WBA", "THA"),
    ChampionRecord("Srisaket Sor Rungvisai", "super_flyweight", 6, "2013-05-03", "2014-05-31", "WBC", "THA"),
    ChampionRecord("Juan Francisco Estrada", "super_flyweight", 4, "2019-04-26", "2021-03-13", "WBA/WBO", "MEX"),
    # Bantamweight (118 lbs)
    ChampionRecord("Orlando Canizales", "bantamweight", 16, "1988-02-06", "1994-09-10", "IBF", "USA"),
    ChampionRecord("Rafael Marquez", "bantamweight", 7, "2003-02-08", "2006-08-05", "IBF", "MEX"),
    ChampionRecord("Naoya Inoue", "bantamweight", 7, "2019-11-07", "2022-12-13", "IBF/WBA", "JPN"),
    ChampionRecord("Eder Jofre", "bantamweight", 5, "1960-11-18", "1965-05-17", "NBA", "BRA"),
    # Super Bantamweight (122 lbs)
    ChampionRecord("Wilfredo Gómez", "super_bantamweight", 17, "1977-05-21", "1982-12-03", "WBC", "PUR"),
    ChampionRecord("Vuyani Bungu", "super_bantamweight", 13, "1994-03-19", "1999-09-04", "IBF", "RSA"),
    ChampionRecord("Israel Vázquez", "super_bantamweight", 4, "2004-12-03", "2005-12-03", "IBF", "MEX"),
    ChampionRecord("Manny Pacquiao", "super_bantamweight", 4, "2001-06-23", "2004-03-19", "IBF", "PHI"),
    # Featherweight (126 lbs)
    ChampionRecord("Eusebio Pedroza", "featherweight", 19, "1978-04-15", "1985-06-08", "WBA", "PAN"),
    ChampionRecord("Naseem Hamed", "featherweight", 15, "1995-09-30", "2000-04-22", "WBO", "GBR"),
    ChampionRecord("Johnny Kilbane", "featherweight", 6, "1912-02-22", "1923-06-02", "lineal", "USA"),
    ChampionRecord("Chris John", "featherweight", 18, "2003-09-26", "2013-06-15", "WBA", "INA"),
    # Super Featherweight (130 lbs)
    ChampionRecord("Azumah Nelson", "super_featherweight", 10, "1988-07-07", "1994-09-10", "WBC", "GHA"),
    ChampionRecord("Julio César Chávez", "super_featherweight", 9, "1984-09-13", "1987-11-21", "WBC", "MEX"),
    ChampionRecord("Floyd Mayweather Jr.", "super_featherweight", 8, "1998-10-03", "2002-04-20", "WBC", "USA"),
    ChampionRecord("Alexis Argüello", "super_featherweight", 8, "1978-01-28", "1980-06-21", "WBC", "NIC"),
    ChampionRecord("Alfredo Escalera", "super_featherweight", 10, "1975-05-17", "1978-01-28", "WBC", "PUR"),
    # Lightweight (135 lbs)
    ChampionRecord("Roberto Durán", "lightweight", 12, "1972-06-26", "1979-02-02", "WBA/WBC", "PAN"),
    ChampionRecord("Oscar De La Hoya", "lightweight", 6, "1997-04-12", "1999-02-13", "WBC", "USA"),
    ChampionRecord("Floyd Mayweather Jr.", "lightweight", 3, "2002-04-20", "2004-06-19", "WBC", "USA"),
    ChampionRecord("Teófimo López", "lightweight", 3, "2020-10-17", "2021-11-27", "WBA/IBF/WBO", "USA"),
    # Super Lightweight (140 lbs)
    ChampionRecord("Julio César Chávez", "super_lightweight", 9, "1989-05-13", "1994-03-05", "WBC", "MEX"),
    ChampionRecord("Kostya Tszyu", "super_lightweight", 7, "2001-02-03", "2005-06-04", "IBF/WBA/WBC", "RUS"),
    ChampionRecord("Terence Crawford", "super_lightweight", 5, "2014-03-01", "2015-04-18", "WBO", "USA"),
    ChampionRecord("Josh Taylor", "super_lightweight", 3, "2019-05-18", "2022-02-26", "WBA/IBF/WBO", "GBR"),
    # Welterweight (147 lbs)
    ChampionRecord("Félix Trinidad", "welterweight", 15, "1993-06-19", "2000-03-03", "IBF", "PUR"),
    ChampionRecord("Pernell Whitaker", "welterweight", 8, "1993-03-06", "1997-04-12", "WBC", "USA"),
    ChampionRecord("Floyd Mayweather Jr.", "welterweight", 9, "2014-05-03", "2017-08-26", "WBA/WBC", "USA"),
    ChampionRecord("Manny Pacquiao", "welterweight", 3, "2009-11-14", "2012-06-09", "WBO", "PHI"),
    ChampionRecord("Errol Spence Jr.", "welterweight", 6, "2017-05-27", "2022-04-16", "IBF", "USA"),
    # Super Welterweight (154 lbs)
    ChampionRecord("Floyd Mayweather Jr.", "super_welterweight", 3, "2013-09-14", "2015-09-12", "WBA/WBC", "USA"),
    ChampionRecord("Canelo Álvarez", "super_welterweight", 6, "2011-03-05", "2013-09-14", "WBC", "MEX"),
    ChampionRecord("Terence Crawford", "super_welterweight", 3, "2024-08-03", "Present", "WBA/WBC/IBF/WBO", "USA"),
    # Middleweight (160 lbs)
    ChampionRecord("Bernard Hopkins", "middleweight", 20, "1995-04-29", "2005-07-16", "IBF/WBA/WBC/WBO", "USA"),
    ChampionRecord("Gennady Golovkin", "middleweight", 20, "2010-08-14", "2018-09-15", "WBA/IBF", "KAZ"),
    ChampionRecord("Carlos Monzón", "middleweight", 14, "1970-11-07", "1977-08-30", "WBA", "ARG"),
    ChampionRecord("Marvin Hagler", "middleweight", 12, "1980-09-27", "1987-04-06", "WBA/WBC", "USA"),
    ChampionRecord("Sergio Martínez", "middleweight", 6, "2010-04-17", "2014-06-07", "WBC", "ARG"),
    ChampionRecord("Jermall Charlo", "middleweight", 5, "2019-06-29", "2024-11-30", "WBC", "USA"),
    # Super Middleweight (168 lbs)
    ChampionRecord("Joe Calzaghe", "super_middleweight", 21, "1997-10-11", "2008-04-19", "WBO/WBA/WBC", "GBR"),
    ChampionRecord("Andre Ward", "super_middleweight", 6, "2009-11-21", "2011-12-17", "WBA", "USA"),
    ChampionRecord("Canelo Álvarez", "super_middleweight", 4, "2020-12-19", "2021-11-06", "WBA/WBC/WBO", "MEX"),
    ChampionRecord("Carl Froch", "super_middleweight", 9, "2008-12-06", "2015-05-30", "WBC", "GBR"),
    # Light Heavyweight (175 lbs)
    ChampionRecord("Darius Michalczewski", "light_heavyweight", 23, "1997-06-21", "2003-01-18", "WBO/WBA/IBF", "GER"),
    ChampionRecord("Bernard Hopkins", "light_heavyweight", 3, "2011-05-21", "2012-04-28", "WBC", "USA"),
    ChampionRecord("Sergey Kovalev", "light_heavyweight", 8, "2014-11-08", "2016-11-19", "WBO/IBF/WBA", "RUS"),
    ChampionRecord("Artur Beterbiev", "light_heavyweight", 7, "2017-11-11", "2024-10-12", "IBF/WBC/WBO", "RUS"),
    ChampionRecord("Roy Jones Jr.", "light_heavyweight", 5, "1997-08-07", "2003-03-01", "WBC/WBA/IBF", "USA"),
    # Cruiserweight (200 lbs)
    ChampionRecord("Johnny Nelson", "cruiserweight", 13, "1999-03-06", "2005-02-04", "WBO", "GBR"),
    ChampionRecord("Marco Huck", "cruiserweight", 13, "2009-08-29", "2015-08-29", "WBO", "GER"),
    ChampionRecord("Oleksandr Usyk", "cruiserweight", 6, "2016-09-17", "2018-11-10", "WBO/WBC/WBA/IBF", "UKR"),
    ChampionRecord("Carl Thompson", "cruiserweight", 5, "1998-03-28", "2000-07-15", "WBO", "GBR"),
    ChampionRecord("Enzo Maccarinelli", "cruiserweight", 4, "2006-07-08", "2008-03-08", "WBO", "GBR"),
    # Heavyweight (200+ lbs)
    ChampionRecord("Joe Louis", "heavyweight", 26, "1937-06-22", "1949-03-01", "NYSAC/NBA", "USA"),
    ChampionRecord("Larry Holmes", "heavyweight", 19, "1978-06-09", "1985-09-21", "WBC/IBF", "USA"),
    ChampionRecord("Wladimir Klitschko", "heavyweight", 18, "2006-04-22", "2015-11-28", "WBA/IBF/WBO", "UKR"),
    ChampionRecord("Tommy Burns", "heavyweight", 13, "1906-02-23", "1908-12-26", "lineal", "CAN"),
    ChampionRecord("Muhammad Ali", "heavyweight", 10, "1974-10-30", "1978-02-15", "WBA/WBC", "USA"),
    ChampionRecord("Deontay Wilder", "heavyweight", 10, "2015-01-17", "2020-02-22", "WBC", "USA"),
    ChampionRecord("Mike Tyson", "heavyweight", 9, "1986-11-22", "1990-02-11", "WBA/WBC/IBF", "USA"),
    ChampionRecord("Joe Frazier", "heavyweight", 9, "1968-03-04", "1973-01-22", "NYSAC/WBA/WBC", "USA"),
    ChampionRecord("Lennox Lewis", "heavyweight", 9, "1997-02-07", "2001-04-22", "WBA/WBC/IBF", "GBR"),
    ChampionRecord("Ezzard Charles", "heavyweight", 8, "1950-09-27", "1951-07-18", "NBA/NYSAC", "USA"),
    ChampionRecord("James J. Jeffries", "heavyweight", 7, "1899-06-09", "1905-05-13", "lineal", "USA"),
    ChampionRecord("Rocky Marciano", "heavyweight", 6, "1952-09-23", "1956-04-27", "NYSAC/NBA", "USA"),
    ChampionRecord("Anthony Joshua", "heavyweight", 6, "2016-04-09", "2019-06-01", "WBA/IBF/WBO", "GBR"),
    ChampionRecord("Jack Johnson", "heavyweight", 6, "1908-12-26", "1915-04-05", "lineal", "USA"),
    ChampionRecord("Jack Dempsey", "heavyweight", 5, "1919-07-04", "1926-09-23", "lineal/NBA/NYSAC", "USA"),
    ChampionRecord("Oleksandr Usyk", "heavyweight", 5, "2021-09-25", "Present", "WBA/WBC/IBF/WBO", "UKR"),
]


def normalize_weight_class(query: str) -> Optional[str]:
    """
    INPUT: 階級名（英語・別名・ID）
    OUTPUT: 正規化された階級キー、または None
    """
    q = query.lower().strip().replace(" ", "_").replace("-", "_")
    if q in WEIGHT_CLASSES:
        return q
    for key, info in WEIGHT_CLASSES.items():
        if q == str(info["id"]):
            return key
        if q in info.get("alias", []):
            return key
    return None


def get_champions(
    weight_class: Optional[str] = None,
    min_defenses: int = 3,
    sort_by: str = "defenses",
) -> list[dict]:
    """
    再現性のあるクエリ関数

    INPUT:
        weight_class: 階級名（省略時は全階級）
        min_defenses: 最小防衛回数（デフォルト3）
        sort_by: ソート基準 ("defenses" | "name" | "reign_start")

    OUTPUT:
        該当チャンピオンの辞書リスト
    """
    normalized = normalize_weight_class(weight_class) if weight_class else None
    results = [
        c.to_dict()
        for c in CHAMPIONS_3PLUS_DEFENSES
        if c.defenses >= min_defenses
        and (normalized is None or c.weight_class == normalized)
    ]
    if sort_by == "defenses":
        results.sort(key=lambda x: (-x["defenses"], x["name"]))
    elif sort_by == "name":
        results.sort(key=lambda x: x["name"])
    elif sort_by == "reign_start":
        results.sort(key=lambda x: x["reign_start"])
    return results


def list_weight_classes() -> list[dict]:
    """全階級の一覧を返す"""
    return [
        {"id": info["id"], "key": key, "lbs": info["lbs"], "kg": info["kg"]}
        for key, info in WEIGHT_CLASSES.items()
    ]
