import type { AthleteRecord, SportConfig } from '../types'

// NBA 生涯得点 Top 10（レギュラーシーズンのみ）
const basketball: AthleteRecord[] = [
  { name: 'LeBron James', nameOrigin: 'LeBron Raymone James Sr.', careerPoints: 43066, careerGames: 1603, years: '2003-2024', country: 'USA', birthDate: '1984-12-30' },
  { name: 'Kareem Abdul-Jabbar', nameOrigin: 'Kareem Abdul-Jabbar', careerPoints: 38387, careerGames: 1560, years: '1969-1989', country: 'USA', birthDate: '1947-04-16' },
  { name: 'Karl Malone', nameOrigin: 'Karl Anthony Malone', careerPoints: 36928, careerGames: 1476, years: '1985-2004', country: 'USA', birthDate: '1963-07-24' },
  { name: 'Kobe Bryant', nameOrigin: 'Kobe Bean Bryant', careerPoints: 33643, careerGames: 1346, years: '1996-2016', country: 'USA', birthDate: '1978-08-23' },
  { name: 'Michael Jordan', nameOrigin: 'Michael Jordan', careerPoints: 32292, careerGames: 1072, years: '1984-2003', country: 'USA', birthDate: '1963-02-17' },
  { name: 'Kevin Durant', nameOrigin: 'Kevin Wayne Durant', careerPoints: 32038, careerGames: 1179, years: '2007-2024', country: 'USA', birthDate: '1988-09-29' },
  { name: 'Dirk Nowitzki', nameOrigin: 'Dirk Werner Nowitzki', careerPoints: 31560, careerGames: 1522, years: '1998-2019', country: 'Germany', birthDate: '1978-06-19' },
  { name: 'Wilt Chamberlain', nameOrigin: 'Wilton Norman Chamberlain', careerPoints: 31419, careerGames: 1045, years: '1959-1973', country: 'USA', birthDate: '1936-08-21' },
  { name: 'James Harden', nameOrigin: 'James Edward Harden Jr.', careerPoints: 28937, careerGames: 1202, years: '2009-2024', country: 'USA', birthDate: '1989-08-26' },
  { name: 'Shaquille O\'Neal', nameOrigin: 'Shaquille Rashaun O\'Neal', careerPoints: 28596, careerGames: 1207, years: '1992-2011', country: 'USA', birthDate: '1972-03-06' },
]

const swimming: AthleteRecord[] = [
  { name: 'Michael Phelps', nameOrigin: 'Michael Fred Phelps II', count: 23, years: '2004-2016', country: 'USA', gender: 'M', birthDate: '1985-06-30' },
  { name: 'Katie Ledecky', nameOrigin: 'Kathleen Genevieve Ledecky', count: 9, years: '2012-2024', country: 'USA', gender: 'F', birthDate: '1997-03-17' },
  { name: 'Mark Spitz', nameOrigin: 'Mark Andrew Spitz', count: 9, years: '1968-1972', country: 'USA', gender: 'M', birthDate: '1950-02-10' },
  { name: 'Caeleb Dressel', nameOrigin: 'Caeleb Remel Dressel', count: 9, years: '2016-2024', country: 'USA', gender: 'M', birthDate: '1996-08-16' },
  { name: 'Jenny Thompson', nameOrigin: 'Jennifer Beth Thompson', count: 8, years: '1992-2004', country: 'USA', gender: 'F', birthDate: '1973-02-26' },
  { name: 'Matt Biondi', nameOrigin: 'Matthew Nicholas Biondi', count: 8, years: '1984-1992', country: 'USA', gender: 'M', birthDate: '1965-10-08' },
  { name: 'Emma McKeon', nameOrigin: 'Emma McKeon', count: 6, years: '2016-2024', country: 'Australia', gender: 'F', birthDate: '1994-05-24' },
  { name: 'Kristin Otto', nameOrigin: 'Kristin Otto', count: 6, years: '1988', country: 'East Germany', gender: 'F', birthDate: '1966-02-07' },
  { name: 'Amy Van Dyken', nameOrigin: 'Amy Van Dyken', count: 6, years: '1996-2000', country: 'USA', gender: 'F', birthDate: '1973-02-15' },
  { name: 'Ryan Lochte', nameOrigin: 'Ryan Steven Lochte', count: 6, years: '2004-2016', country: 'USA', gender: 'M', birthDate: '1984-08-03' },
]

const sprint: AthleteRecord[] = [
  { name: 'Usain Bolt', nameOrigin: 'Usain St. Leo Bolt', count: 8, years: '2008-2016', country: 'Jamaica', gender: 'M', birthDate: '1986-08-21' },
  { name: 'Carl Lewis', nameOrigin: 'Frederick Carlton Lewis', count: 6, years: '1984-1996', country: 'USA', gender: 'M', birthDate: '1961-07-01' },
  { name: 'Elaine Thompson-Herah', nameOrigin: 'Elaine Thompson-Herah', count: 5, years: '2016-2024', country: 'Jamaica', gender: 'F', birthDate: '1992-09-28' },
  { name: 'Maurice Greene', nameOrigin: 'Maurice Greene', count: 4, years: '2000-2004', country: 'USA', gender: 'M', birthDate: '1974-07-23' },
  { name: 'Shelly-Ann Fraser-Pryce', nameOrigin: 'Shelly-Ann Fraser-Pryce', count: 4, years: '2008-2024', country: 'Jamaica', gender: 'F', birthDate: '1986-12-27' },
  { name: 'Jesse Owens', nameOrigin: 'James Cleveland Owens', count: 3, years: '1936', country: 'USA', gender: 'M', birthDate: '1913-09-12' },
  { name: 'Florence Griffith Joyner', nameOrigin: 'Florence Delorez Griffith', count: 3, years: '1988', country: 'USA', gender: 'F', birthDate: '1959-12-21' },
  { name: 'Valerie Brisco-Hooks', nameOrigin: 'Valerie Ann Brisco-Hooks', count: 3, years: '1984', country: 'USA', gender: 'F', birthDate: '1960-07-06' },
  { name: 'Wilma Rudolph', nameOrigin: 'Wilma Glodean Rudolph', count: 3, years: '1960', country: 'USA', gender: 'F', birthDate: '1940-06-23' },
  { name: 'Betty Cuthbert', nameOrigin: 'Elizabeth Cuthbert', count: 3, years: '1956', country: 'Australia', gender: 'F', birthDate: '1938-04-20' },
]

const longDistance: AthleteRecord[] = [
  { name: 'Emil Zátopek', nameOrigin: 'Emil Zátopek', count: 4, years: '1948-1952', country: 'Czechoslovakia', gender: 'M', birthDate: '1922-09-19' },
  { name: 'Mo Farah', nameOrigin: 'Mohamed Farah', count: 4, years: '2012-2016', country: 'Great Britain', gender: 'M', birthDate: '1983-03-23' },
  { name: 'Lasse Virén', nameOrigin: 'Lasse Virén', count: 4, years: '1972-1976', country: 'Finland', gender: 'M', birthDate: '1949-07-22' },
  { name: 'Paavo Nurmi', nameOrigin: 'Paavo Johannes Nurmi', count: 3, years: '1920-1928', country: 'Finland', gender: 'M', birthDate: '1897-06-13' },
  { name: 'Kenenisa Bekele', nameOrigin: 'ከነኒሳ በቀለ', count: 3, years: '2004-2008', country: 'Ethiopia', gender: 'M', birthDate: '1982-06-13' },
  { name: 'Tirunesh Dibaba', nameOrigin: 'ትሩነሽ ዲባባ', count: 3, years: '2008-2012', country: 'Ethiopia', gender: 'F', birthDate: '1985-10-01' },
]

const volleyball: AthleteRecord[] = [
  { name: 'Karch Kiraly', nameOrigin: 'Charles Frederick Kiraly', count: 3, years: '1984-1996', country: 'USA', gender: 'M', discipline: 'both', birthDate: '1960-11-03' },
  { name: 'Regla Torres', nameOrigin: 'Regla Radameris Torres Herrera', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor', birthDate: '1975-02-12' },
  { name: 'Kerri Walsh Jennings', nameOrigin: 'Kerri Lee Walsh Jennings', count: 3, years: '2004-2012', country: 'USA', gender: 'F', discipline: 'beach', birthDate: '1978-08-15' },
  { name: 'Misty May-Treanor', nameOrigin: 'Misty Elizabeth May-Treanor', count: 3, years: '2004-2012', country: 'USA', gender: 'F', discipline: 'beach', birthDate: '1977-07-30' },
  { name: 'Mireya Luis', nameOrigin: 'Mireya Luis Hernández', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor', birthDate: '1967-08-14' },
  { name: 'Marlenis Costa', nameOrigin: 'Marlenis Costa Blanco', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor', birthDate: '1973-04-05' },
  { name: 'Regla Bell', nameOrigin: 'Regla Bell Macías', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor', birthDate: '1970-07-06' },
  { name: 'Lilia Izquierdo', nameOrigin: 'Lilia Izquierdo', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor', birthDate: '1967-08-18' },
  { name: 'Idalmis Gato', nameOrigin: 'Idalmis Gato Moya', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor', birthDate: '1971-08-08' },
]

const badminton: AthleteRecord[] = [
  { name: 'Ge Fei', nameOrigin: '葛菲', count: 2, years: '1996-2000', country: 'China', gender: 'F', discipline: 'doubles', birthDate: '1975-10-09' },
  { name: 'Gu Jun', nameOrigin: '顧俊', count: 2, years: '1996-2000', country: 'China', gender: 'F', discipline: 'doubles', birthDate: '1975-01-26' },
  { name: 'Gao Ling', nameOrigin: '高崚', count: 2, years: '2000-2004', country: 'China', gender: 'F', discipline: 'mixed', birthDate: '1979-03-14' },
  { name: 'Zhang Jun', nameOrigin: '张军', count: 2, years: '2000-2004', country: 'China', gender: 'M', discipline: 'mixed', birthDate: '1977-11-26' },
  { name: 'Zhang Ning', nameOrigin: '张宁', count: 2, years: '2004-2008', country: 'China', gender: 'F', discipline: 'singles', birthDate: '1975-05-19' },
  { name: 'Lin Dan', nameOrigin: '林丹', count: 2, years: '2008-2012', country: 'China', gender: 'M', discipline: 'singles', birthDate: '1983-10-14' },
  { name: 'Fu Haifeng', nameOrigin: '傅海峰', count: 2, years: '2012-2016', country: 'China', gender: 'M', discipline: 'doubles', birthDate: '1983-08-23' },
  { name: 'Zhang Nan', nameOrigin: '张楠', count: 2, years: '2012-2016', country: 'China', gender: 'M', discipline: 'multiple', birthDate: '1990-03-01' },
  { name: 'Zhao Yunlei', nameOrigin: '赵芸蕾', count: 2, years: '2012', country: 'China', gender: 'F', discipline: 'multiple', birthDate: '1986-08-25' },
  { name: 'Kim Dong-moon', nameOrigin: '김동문', count: 2, years: '1996-2004', country: 'South Korea', gender: 'M', discipline: 'multiple', birthDate: '1975-09-22' },
]

const tableTennis: AthleteRecord[] = [
  { name: 'Ma Long', nameOrigin: '马龙', count: 6, years: '2012-2024', country: 'China', gender: 'M', birthDate: '1988-10-20' },
  { name: 'Deng Yaping', nameOrigin: '邓亚萍', count: 4, years: '1992-1996', country: 'China', gender: 'F', birthDate: '1973-02-06' },
  { name: 'Wang Nan', nameOrigin: '王楠', count: 4, years: '2000-2008', country: 'China', gender: 'F', birthDate: '1978-10-23' },
  { name: 'Zhang Yining', nameOrigin: '张怡宁', count: 4, years: '2004-2008', country: 'China', gender: 'F', birthDate: '1981-10-05' },
  { name: 'Chen Meng', nameOrigin: '陈梦', count: 4, years: '2020-2024', country: 'China', gender: 'F', birthDate: '1994-01-15' },
  { name: 'Ma Lin', nameOrigin: '马琳', count: 3, years: '2004-2008', country: 'China', gender: 'M', birthDate: '1980-02-19' },
  { name: 'Zhang Jike', nameOrigin: '张继科', count: 3, years: '2012-2016', country: 'China', gender: 'M', birthDate: '1988-02-16' },
  { name: 'Li Xiaoxia', nameOrigin: '李晓霞', count: 3, years: '2012-2016', country: 'China', gender: 'F', birthDate: '1988-01-16' },
  { name: 'Ding Ning', nameOrigin: '丁宁', count: 3, years: '2012-2016', country: 'China', gender: 'F', birthDate: '1990-06-20' },
  { name: 'Fan Zhendong', nameOrigin: '樊振东', count: 3, years: '2020-2024', country: 'China', gender: 'M', birthDate: '1997-01-22' },
]

// 市場規模順（1=最大）
const SPORTS_RAW: SportConfig[] = [
  { id: 'basketball', label: 'バスケットボール', labelEn: 'Basketball', rule: '生涯得点 Top 10（NBAレギュラーシーズン）', ruleEn: 'Career Points Top 10 (NBA Regular Season)', minCount: 20000, countLabel: '得点', countKey: 'careerPoints', records: basketball, marketSize: 3 },
  { id: 'swimming', label: '水泳', labelEn: 'Swimming', rule: 'オリンピック金メダル 3個以上', ruleEn: '3+ Olympic Gold Medals', minCount: 3, countLabel: '金メダル', countKey: 'count', records: swimming, marketSize: 8 },
  { id: 'sprint', label: '短距離走', labelEn: 'Sprint', rule: '100m/200m/4x100m 金メダル 3個以上', ruleEn: '3+ Gold Medals (100m/200m/4x100m)', minCount: 3, countLabel: '金メダル', countKey: 'count', records: sprint, marketSize: 9 },
  { id: 'long_distance', label: '長距離走', labelEn: 'Long Distance', rule: '5000m/10000m/マラソン 金メダル 3個以上', ruleEn: '3+ Gold Medals (5000m/10000m/Marathon)', minCount: 3, countLabel: '金メダル', countKey: 'count', records: longDistance, marketSize: 10 },
  { id: 'volleyball', label: 'バレーボール', labelEn: 'Volleyball', rule: '室内＋ビーチ 金メダル 3個以上', ruleEn: '3+ Gold Medals (Indoor & Beach)', minCount: 3, countLabel: '金メダル', countKey: 'count', records: volleyball, marketSize: 7 },
  { id: 'badminton', label: 'バドミントン', labelEn: 'Badminton', rule: '金メダル 2個以上', ruleEn: '2+ Gold Medals', minCount: 2, countLabel: '金メダル', countKey: 'count', records: badminton, marketSize: 11 },
  { id: 'table_tennis', label: '卓球', labelEn: 'Table Tennis', rule: '金メダル 3個以上', ruleEn: '3+ Gold Medals', minCount: 3, countLabel: '金メダル', countKey: 'count', records: tableTennis, marketSize: 12 },
]

export const SPORTS = [...SPORTS_RAW].sort((a, b) => (a.marketSize ?? 99) - (b.marketSize ?? 99))

export function getTop10(
  sportId: string,
  options?: { minCount?: number; gender?: string }
): AthleteRecord[] {
  const sport = SPORTS.find((s) => s.id === sportId)
  if (!sport) return []

  const threshold = options?.minCount ?? sport.minCount
  const gender = options?.gender?.toUpperCase()

  const getVal = (r: AthleteRecord) => {
    if (sport.countKey === 'mvpCount') return r.mvpCount ?? 0
    if (sport.countKey === 'careerPoints') return r.careerPoints ?? 0
    return r.count ?? 0
  }

  let filtered = sport.records.filter((r) => getVal(r) >= threshold)

  if (gender) {
    filtered = filtered.filter((r) => r.gender === gender)
  }

  filtered.sort((a, b) => {
    const ca = getVal(a)
    const cb = getVal(b)
    if (cb !== ca) return cb - ca
    return (a.years || '').localeCompare(b.years || '')
  })

  // 10位と同列の選手は全員含める
  const getCount = getVal
  const tenth = filtered[9]
  if (!tenth) return filtered
  const minCount = getCount(tenth)
  return filtered.filter((r) => getCount(r) >= minCount)
}
