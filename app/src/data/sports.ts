import type { AthleteRecord, SportConfig } from '../types'

const basketball: AthleteRecord[] = [
  { name: 'Kareem Abdul-Jabbar', nameOrigin: 'Kareem Abdul-Jabbar', mvpCount: 6, years: '1971-1980', country: 'USA' },
  { name: 'Michael Jordan', nameOrigin: 'Michael Jordan', mvpCount: 5, years: '1988-1998', country: 'USA' },
  { name: 'Bill Russell', nameOrigin: 'William Felton Russell', mvpCount: 5, years: '1958-1965', country: 'USA' },
  { name: 'Wilt Chamberlain', nameOrigin: 'Wilton Norman Chamberlain', mvpCount: 4, years: '1960-1968', country: 'USA' },
  { name: 'LeBron James', nameOrigin: 'LeBron Raymone James Sr.', mvpCount: 4, years: '2009-2013', country: 'USA' },
  { name: 'Larry Bird', nameOrigin: 'Larry Joe Bird', mvpCount: 3, years: '1984-1986', country: 'USA' },
  { name: 'Magic Johnson', nameOrigin: 'Earvin Johnson Jr.', mvpCount: 3, years: '1987-1990', country: 'USA' },
  { name: 'Moses Malone', nameOrigin: 'Moses Eugene Malone', mvpCount: 3, years: '1979-1983', country: 'USA' },
  { name: 'Nikola Jokić', nameOrigin: 'Nikola Jokić', mvpCount: 3, years: '2021-2024', country: 'Serbia' },
  { name: 'Bob Pettit', nameOrigin: 'Robert Lee Pettit Jr.', mvpCount: 2, years: '1956-1959', country: 'USA' },
]

const swimming: AthleteRecord[] = [
  { name: 'Michael Phelps', nameOrigin: 'Michael Fred Phelps II', count: 23, years: '2004-2016', country: 'USA', gender: 'M' },
  { name: 'Katie Ledecky', nameOrigin: 'Kathleen Genevieve Ledecky', count: 9, years: '2012-2024', country: 'USA', gender: 'F' },
  { name: 'Mark Spitz', nameOrigin: 'Mark Andrew Spitz', count: 9, years: '1968-1972', country: 'USA', gender: 'M' },
  { name: 'Caeleb Dressel', nameOrigin: 'Caeleb Remel Dressel', count: 9, years: '2016-2024', country: 'USA', gender: 'M' },
  { name: 'Jenny Thompson', nameOrigin: 'Jennifer Beth Thompson', count: 8, years: '1992-2004', country: 'USA', gender: 'F' },
  { name: 'Matt Biondi', nameOrigin: 'Matthew Nicholas Biondi', count: 8, years: '1984-1992', country: 'USA', gender: 'M' },
  { name: 'Emma McKeon', nameOrigin: 'Emma McKeon', count: 6, years: '2016-2024', country: 'Australia', gender: 'F' },
  { name: 'Kristin Otto', nameOrigin: 'Kristin Otto', count: 6, years: '1988', country: 'East Germany', gender: 'F' },
  { name: 'Amy Van Dyken', nameOrigin: 'Amy Van Dyken', count: 6, years: '1996-2000', country: 'USA', gender: 'F' },
  { name: 'Ryan Lochte', nameOrigin: 'Ryan Steven Lochte', count: 6, years: '2004-2016', country: 'USA', gender: 'M' },
]

const sprint: AthleteRecord[] = [
  { name: 'Usain Bolt', nameOrigin: 'Usain St. Leo Bolt', count: 8, years: '2008-2016', country: 'Jamaica', gender: 'M' },
  { name: 'Carl Lewis', nameOrigin: 'Frederick Carlton Lewis', count: 6, years: '1984-1996', country: 'USA', gender: 'M' },
  { name: 'Elaine Thompson-Herah', nameOrigin: 'Elaine Thompson-Herah', count: 5, years: '2016-2024', country: 'Jamaica', gender: 'F' },
  { name: 'Maurice Greene', nameOrigin: 'Maurice Greene', count: 4, years: '2000-2004', country: 'USA', gender: 'M' },
  { name: 'Shelly-Ann Fraser-Pryce', nameOrigin: 'Shelly-Ann Fraser-Pryce', count: 4, years: '2008-2024', country: 'Jamaica', gender: 'F' },
  { name: 'Jesse Owens', nameOrigin: 'James Cleveland Owens', count: 3, years: '1936', country: 'USA', gender: 'M' },
  { name: 'Florence Griffith Joyner', nameOrigin: 'Florence Delorez Griffith', count: 3, years: '1988', country: 'USA', gender: 'F' },
  { name: 'Valerie Brisco-Hooks', nameOrigin: 'Valerie Ann Brisco-Hooks', count: 3, years: '1984', country: 'USA', gender: 'F' },
  { name: 'Wilma Rudolph', nameOrigin: 'Wilma Glodean Rudolph', count: 3, years: '1960', country: 'USA', gender: 'F' },
  { name: 'Betty Cuthbert', nameOrigin: 'Elizabeth Cuthbert', count: 3, years: '1956', country: 'Australia', gender: 'F' },
]

const longDistance: AthleteRecord[] = [
  { name: 'Emil Zátopek', nameOrigin: 'Emil Zátopek', count: 4, years: '1948-1952', country: 'Czechoslovakia', gender: 'M' },
  { name: 'Mo Farah', nameOrigin: 'Mohamed Farah', count: 4, years: '2012-2016', country: 'Great Britain', gender: 'M' },
  { name: 'Lasse Virén', nameOrigin: 'Lasse Virén', count: 4, years: '1972-1976', country: 'Finland', gender: 'M' },
  { name: 'Paavo Nurmi', nameOrigin: 'Paavo Johannes Nurmi', count: 3, years: '1920-1928', country: 'Finland', gender: 'M' },
  { name: 'Kenenisa Bekele', nameOrigin: 'ከነኒሳ በቀለ', count: 3, years: '2004-2008', country: 'Ethiopia', gender: 'M' },
  { name: 'Tirunesh Dibaba', nameOrigin: 'ትሩነሽ ዲባባ', count: 3, years: '2008-2012', country: 'Ethiopia', gender: 'F' },
]

const volleyball: AthleteRecord[] = [
  { name: 'Karch Kiraly', nameOrigin: 'Charles Frederick Kiraly', count: 3, years: '1984-1996', country: 'USA', gender: 'M', discipline: 'both' },
  { name: 'Regla Torres', nameOrigin: 'Regla Radameris Torres Herrera', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor' },
  { name: 'Kerri Walsh Jennings', nameOrigin: 'Kerri Lee Walsh Jennings', count: 3, years: '2004-2012', country: 'USA', gender: 'F', discipline: 'beach' },
  { name: 'Misty May-Treanor', nameOrigin: 'Misty Elizabeth May-Treanor', count: 3, years: '2004-2012', country: 'USA', gender: 'F', discipline: 'beach' },
  { name: 'Mireya Luis', nameOrigin: 'Mireya Luis Hernández', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor' },
  { name: 'Marlenis Costa', nameOrigin: 'Marlenis Costa Blanco', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor' },
  { name: 'Regla Bell', nameOrigin: 'Regla Bell Macías', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor' },
  { name: 'Lilia Izquierdo', nameOrigin: 'Lilia Izquierdo', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor' },
  { name: 'Idalmis Gato', nameOrigin: 'Idalmis Gato Moya', count: 3, years: '1992-2000', country: 'Cuba', gender: 'F', discipline: 'indoor' },
]

const badminton: AthleteRecord[] = [
  { name: 'Ge Fei', nameOrigin: '葛菲', count: 2, years: '1996-2000', country: 'China', gender: 'F', discipline: 'doubles' },
  { name: 'Gu Jun', nameOrigin: '顧俊', count: 2, years: '1996-2000', country: 'China', gender: 'F', discipline: 'doubles' },
  { name: 'Gao Ling', nameOrigin: '高崚', count: 2, years: '2000-2004', country: 'China', gender: 'F', discipline: 'mixed' },
  { name: 'Zhang Jun', nameOrigin: '张军', count: 2, years: '2000-2004', country: 'China', gender: 'M', discipline: 'mixed' },
  { name: 'Zhang Ning', nameOrigin: '张宁', count: 2, years: '2004-2008', country: 'China', gender: 'F', discipline: 'singles' },
  { name: 'Lin Dan', nameOrigin: '林丹', count: 2, years: '2008-2012', country: 'China', gender: 'M', discipline: 'singles' },
  { name: 'Fu Haifeng', nameOrigin: '傅海峰', count: 2, years: '2012-2016', country: 'China', gender: 'M', discipline: 'doubles' },
  { name: 'Zhang Nan', nameOrigin: '张楠', count: 2, years: '2012-2016', country: 'China', gender: 'M', discipline: 'multiple' },
  { name: 'Zhao Yunlei', nameOrigin: '赵芸蕾', count: 2, years: '2012', country: 'China', gender: 'F', discipline: 'multiple' },
  { name: 'Kim Dong-moon', nameOrigin: '김동문', count: 2, years: '1996-2004', country: 'South Korea', gender: 'M', discipline: 'multiple' },
]

const tableTennis: AthleteRecord[] = [
  { name: 'Ma Long', nameOrigin: '马龙', count: 6, years: '2012-2024', country: 'China', gender: 'M' },
  { name: 'Deng Yaping', nameOrigin: '邓亚萍', count: 4, years: '1992-1996', country: 'China', gender: 'F' },
  { name: 'Wang Nan', nameOrigin: '王楠', count: 4, years: '2000-2008', country: 'China', gender: 'F' },
  { name: 'Zhang Yining', nameOrigin: '张怡宁', count: 4, years: '2004-2008', country: 'China', gender: 'F' },
  { name: 'Chen Meng', nameOrigin: '陈梦', count: 4, years: '2020-2024', country: 'China', gender: 'F' },
  { name: 'Ma Lin', nameOrigin: '马琳', count: 3, years: '2004-2008', country: 'China', gender: 'M' },
  { name: 'Zhang Jike', nameOrigin: '张继科', count: 3, years: '2012-2016', country: 'China', gender: 'M' },
  { name: 'Li Xiaoxia', nameOrigin: '李晓霞', count: 3, years: '2012-2016', country: 'China', gender: 'F' },
  { name: 'Ding Ning', nameOrigin: '丁宁', count: 3, years: '2012-2016', country: 'China', gender: 'F' },
  { name: 'Fan Zhendong', nameOrigin: '樊振东', count: 3, years: '2020-2024', country: 'China', gender: 'M' },
]

// 市場規模順（1=最大）
const SPORTS_RAW: SportConfig[] = [
  { id: 'basketball', label: 'バスケットボール', labelEn: 'Basketball', rule: 'NBA MVP 2回以上獲得', minCount: 2, countLabel: 'MVP', countKey: 'mvpCount', records: basketball, marketSize: 3 },
  { id: 'swimming', label: '水泳', labelEn: 'Swimming', rule: 'オリンピック金メダル 3個以上', minCount: 3, countLabel: '金メダル', countKey: 'count', records: swimming, marketSize: 8 },
  { id: 'sprint', label: '短距離走', labelEn: 'Sprint', rule: '100m/200m/4x100m 金メダル 3個以上', minCount: 3, countLabel: '金メダル', countKey: 'count', records: sprint, marketSize: 9 },
  { id: 'long_distance', label: '長距離走', labelEn: 'Long Distance', rule: '5000m/10000m/マラソン 金メダル 3個以上', minCount: 3, countLabel: '金メダル', countKey: 'count', records: longDistance, marketSize: 10 },
  { id: 'volleyball', label: 'バレーボール', labelEn: 'Volleyball', rule: '室内＋ビーチ 金メダル 3個以上', minCount: 3, countLabel: '金メダル', countKey: 'count', records: volleyball, marketSize: 7 },
  { id: 'badminton', label: 'バドミントン', labelEn: 'Badminton', rule: '金メダル 2個以上', minCount: 2, countLabel: '金メダル', countKey: 'count', records: badminton, marketSize: 11 },
  { id: 'table_tennis', label: '卓球', labelEn: 'Table Tennis', rule: '金メダル 3個以上', minCount: 3, countLabel: '金メダル', countKey: 'count', records: tableTennis, marketSize: 12 },
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

  let filtered = sport.records.filter((r) => {
    const c = sport.countKey === 'mvpCount' ? (r.mvpCount ?? 0) : (r.count ?? 0)
    return c >= threshold
  })

  if (gender) {
    filtered = filtered.filter((r) => r.gender === gender)
  }

  filtered.sort((a, b) => {
    const ca = sport.countKey === 'mvpCount' ? (a.mvpCount ?? 0) : (a.count ?? 0)
    const cb = sport.countKey === 'mvpCount' ? (b.mvpCount ?? 0) : (b.count ?? 0)
    if (cb !== ca) return cb - ca
    return (a.years || '').localeCompare(b.years || '')
  })

  return filtered.slice(0, 10)
}
