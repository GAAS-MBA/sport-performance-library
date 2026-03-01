import type { SoccerRecord } from '../types'

// 著名な賞を3回以上連続獲得した選手 Top 10
export const SOCCER_AWARD_WINNERS: SoccerRecord[] = [
  { name: 'Lionel Messi', nameOrigin: 'Lionel Andrés Messi Cuccittini', award: 'ballon_dor', awardLabel: 'バロンドール', consecutiveWins: 4, years: '2009-2012', country: 'Argentina' },
  { name: 'Robert Lewandowski', nameOrigin: 'Robert Lewandowski', award: 'bundesliga_torjagerkanone', awardLabel: 'ブンデスリーガ得点王', consecutiveWins: 5, years: '2017-18 to 2021-22', country: 'Poland' },
  { name: 'Jean-Pierre Papin', nameOrigin: 'Jean-Pierre Papin', award: 'ligue1_top_scorer', awardLabel: 'リーグ・アン得点王', consecutiveWins: 5, years: '1987-88 to 1991-92', country: 'France' },
  { name: 'Hugo Sánchez', nameOrigin: 'Hugo Sánchez Márquez', award: 'pichichi', awardLabel: 'ピチーチ賞', consecutiveWins: 4, years: '1985-86 to 1988-89', country: 'Mexico' },
  { name: 'Michel Platini', nameOrigin: 'Michel François Platini', award: 'ballon_dor', awardLabel: 'バロンドール', consecutiveWins: 3, years: '1983-1985', country: 'France' },
  { name: 'Lionel Messi', nameOrigin: 'Lionel Andrés Messi Cuccittini', award: 'european_golden_shoe', awardLabel: 'ヨーロッパ・ゴールデンシュー', consecutiveWins: 3, years: '2016-17 to 2018-19', country: 'Argentina' },
  { name: 'Lionel Messi', nameOrigin: 'Lionel Andrés Messi Cuccittini', award: 'pichichi', awardLabel: 'ピチーチ賞', consecutiveWins: 3, years: '2016-17 to 2018-19', country: 'Argentina' },
  { name: 'Alan Shearer', nameOrigin: 'Alan Shearer', award: 'premier_league_golden_boot', awardLabel: 'プレミアリーグ・ゴールデンブーツ', consecutiveWins: 3, years: '1994-95 to 1996-97', country: 'England' },
  { name: 'Thierry Henry', nameOrigin: 'Thierry Daniel Henry', award: 'premier_league_golden_boot', awardLabel: 'プレミアリーグ・ゴールデンブーツ', consecutiveWins: 3, years: '2003-04 to 2005-06', country: 'France' },
  { name: 'Telmo Zarra', nameOrigin: 'Telmo Zarraonandia Montoya', award: 'pichichi', awardLabel: 'ピチーチ賞', consecutiveWins: 3, years: '1944-45 to 1946-47', country: 'Spain' },
]

export function getSoccerTop10(award?: string): SoccerRecord[] {
  let filtered = SOCCER_AWARD_WINNERS
  if (award) {
    filtered = filtered.filter((w) => w.award === award)
  }
  return filtered.sort((a, b) => b.consecutiveWins - a.consecutiveWins).slice(0, 10)
}
