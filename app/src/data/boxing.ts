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

// 3回以上防衛した歴代チャンピオン（主要階級の Top 10 相当）
export const BOXING_CHAMPIONS: BoxingRecord[] = [
  { name: 'Joe Louis', weightClass: 'heavyweight', defenses: 26, reignStart: '1937-06-22', reignEnd: '1949-03-01', sanctioningBodies: 'NYSAC/NBA', country: 'USA' },
  { name: 'Ricardo López', weightClass: 'minimumweight', defenses: 21, reignStart: '1991-05-19', reignEnd: '1998-03-07', sanctioningBodies: 'WBC', country: 'MEX' },
  { name: 'Joe Calzaghe', weightClass: 'super_middleweight', defenses: 21, reignStart: '1997-10-11', reignEnd: '2008-04-19', sanctioningBodies: 'WBO/WBA/WBC', country: 'GBR' },
  { name: 'Bernard Hopkins', weightClass: 'middleweight', defenses: 20, reignStart: '1995-04-29', reignEnd: '2005-07-16', sanctioningBodies: 'IBF/WBA/WBC/WBO', country: 'USA' },
  { name: 'Gennady Golovkin', weightClass: 'middleweight', defenses: 20, reignStart: '2010-08-14', reignEnd: '2018-09-15', sanctioningBodies: 'WBA/IBF', country: 'KAZ' },
  { name: 'Eusebio Pedroza', weightClass: 'featherweight', defenses: 19, reignStart: '1978-04-15', reignEnd: '1985-06-08', sanctioningBodies: 'WBA', country: 'PAN' },
  { name: 'Khaosai Galaxy', weightClass: 'super_flyweight', defenses: 19, reignStart: '1984-11-21', reignEnd: '1991-12-19', sanctioningBodies: 'WBA', country: 'THA' },
  { name: 'Larry Holmes', weightClass: 'heavyweight', defenses: 19, reignStart: '1978-06-09', reignEnd: '1985-09-21', sanctioningBodies: 'WBC/IBF', country: 'USA' },
  { name: 'Wladimir Klitschko', weightClass: 'heavyweight', defenses: 18, reignStart: '2006-04-22', reignEnd: '2015-11-28', sanctioningBodies: 'WBA/IBF/WBO', country: 'UKR' },
  { name: 'Chris John', weightClass: 'featherweight', defenses: 18, reignStart: '2003-09-26', reignEnd: '2013-06-15', sanctioningBodies: 'WBA', country: 'INA' },
]

export function getWeightClassLabel(key: string): string {
  return WEIGHT_CLASS_LABELS[key] ?? key
}

export function getBoxingTop10(weightClass?: string): BoxingRecord[] {
  let filtered = BOXING_CHAMPIONS
  if (weightClass) {
    filtered = filtered.filter((c) => c.weightClass === weightClass)
  }
  return filtered.sort((a, b) => b.defenses - a.defenses).slice(0, 10)
}
