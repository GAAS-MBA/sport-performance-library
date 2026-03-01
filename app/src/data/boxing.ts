import type { BoxingRecord } from '../types'

const WEIGHT_CLASS_LABELS: Record<string, string> = {
  minimumweight: 'ミニマム級',
  light_flyweight: 'ライトフライ級',
  flyweight: 'フライ級',
  super_flyweight: 'スーパーフライ級',
  bantamweight: 'バンタム級',
  super_bantamweight: 'スーパーバンタム級',
  featherweight: 'フェザー級',
  super_featherweight: 'スーパーフェザー級',
  lightweight: 'ライト級',
  super_lightweight: 'スーパーライト級',
  welterweight: 'ウェルター級',
  super_welterweight: 'スーパーウェルター級',
  middleweight: 'ミドル級',
  super_middleweight: 'スーパーミドル級',
  light_heavyweight: 'ライトヘビー級',
  cruiserweight: 'クルーザー級',
  heavyweight: 'ヘビー級',
}

// 3回以上防衛した歴代チャンピオン（単一階級・複数階級の通算防衛数。主要 Top 10 相当）
export const BOXING_CHAMPIONS: BoxingRecord[] = [
  { name: 'Joe Louis', weightClass: 'heavyweight', defenses: 26, reignStart: '1937-06-22', reignEnd: '1949-03-01', sanctioningBodies: 'NYSAC/NBA', country: 'USA', birthDate: '1914-05-13' },
  { name: 'Floyd Mayweather Jr.', weightClass: 'welterweight', defenses: 0, reignStart: '1998-10-03', reignEnd: '2017-08-26', sanctioningBodies: 'WBC/WBA/IBF/WBO', country: 'USA', birthDate: '1977-02-24', totalDefenses: 26, weightClassLabel: '5階級' },
  { name: 'Ricardo López', weightClass: 'minimumweight', defenses: 21, reignStart: '1991-05-19', reignEnd: '1998-03-07', sanctioningBodies: 'WBC', country: 'MEX', birthDate: '1966-07-25' },
  { name: 'Joe Calzaghe', weightClass: 'super_middleweight', defenses: 21, reignStart: '1997-10-11', reignEnd: '2008-04-19', sanctioningBodies: 'WBO/WBA/WBC', country: 'GBR', birthDate: '1972-03-23' },
  { name: 'Bernard Hopkins', weightClass: 'middleweight', defenses: 20, reignStart: '1995-04-29', reignEnd: '2005-07-16', sanctioningBodies: 'IBF/WBA/WBC/WBO', country: 'USA', birthDate: '1965-01-15' },
  { name: 'Gennady Golovkin', weightClass: 'middleweight', defenses: 20, reignStart: '2010-08-14', reignEnd: '2018-09-15', sanctioningBodies: 'WBA/IBF', country: 'KAZ', birthDate: '1982-04-08' },
  { name: 'Eusebio Pedroza', weightClass: 'featherweight', defenses: 19, reignStart: '1978-04-15', reignEnd: '1985-06-08', sanctioningBodies: 'WBA', country: 'PAN', birthDate: '1953-03-02' },
  { name: 'Khaosai Galaxy', weightClass: 'super_flyweight', defenses: 19, reignStart: '1984-11-21', reignEnd: '1991-12-19', sanctioningBodies: 'WBA', country: 'THA', birthDate: '1959-05-15' },
  { name: 'Larry Holmes', weightClass: 'heavyweight', defenses: 19, reignStart: '1978-06-09', reignEnd: '1985-09-21', sanctioningBodies: 'WBC/IBF', country: 'USA', birthDate: '1949-11-03' },
  { name: 'Wladimir Klitschko', weightClass: 'heavyweight', defenses: 18, reignStart: '2006-04-22', reignEnd: '2015-11-28', sanctioningBodies: 'WBA/IBF/WBO', country: 'UKR', birthDate: '1976-03-25' },
  { name: 'Chris John', weightClass: 'featherweight', defenses: 18, reignStart: '2003-09-26', reignEnd: '2013-06-15', sanctioningBodies: 'WBA', country: 'INA', birthDate: '1979-09-14' },
]

export function getWeightClassLabel(key: string): string {
  return WEIGHT_CLASS_LABELS[key] ?? key
}

export function getBoxingTop10(weightClass?: string): BoxingRecord[] {
  let filtered = BOXING_CHAMPIONS
  if (weightClass) {
    filtered = filtered.filter((c) => c.weightClass === weightClass)
  }
  const getDefenses = (r: BoxingRecord) => r.totalDefenses ?? r.defenses
  const sorted = filtered.sort((a, b) => getDefenses(b) - getDefenses(a))
  const tenth = sorted[9]
  if (!tenth) return sorted
  const minDefenses = getDefenses(tenth)
  return sorted.filter((r) => getDefenses(r) >= minDefenses)
}
