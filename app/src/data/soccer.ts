import type { SoccerRecord } from '../types'

// 生涯得点 Top 10（クラブ＋代表の公式戦）
// 得点数のみでランキング。著名賞の連続獲得は問わない
export const SOCCER_TOP_GOALSCORERS: SoccerRecord[] = [
  { name: 'Cristiano Ronaldo', nameOrigin: 'Cristiano Ronaldo dos Santos Aveiro', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '2002-2024', country: 'Portugal', birthDate: '1985-02-05', careerGoals: 900, careerAppearances: 1234, caps: 212 },
  { name: 'Lionel Messi', nameOrigin: 'Lionel Andrés Messi Cuccittini', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '2004-2024', country: 'Argentina', birthDate: '1987-06-24', careerGoals: 832, careerAppearances: 1050, caps: 191 },
  { name: 'Josef Bican', nameOrigin: 'Josef Bican', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '1931-1955', country: 'Austria', birthDate: '1913-09-25', careerGoals: 805, careerAppearances: 530 },
  { name: 'Pelé', nameOrigin: 'Edson Arantes do Nascimento', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '1956-1977', country: 'Brazil', birthDate: '1940-10-23', careerGoals: 757, careerAppearances: 831 },
  { name: 'Romário', nameOrigin: 'Romário de Souza Faria', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '1985-2009', country: 'Brazil', birthDate: '1966-01-29', careerGoals: 755, careerAppearances: 994 },
  { name: 'Ferenc Puskás', nameOrigin: 'Ferenc Puskás', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '1943-1966', country: 'Hungary', birthDate: '1927-04-02', careerGoals: 729, careerAppearances: 754 },
  { name: 'Gerd Müller', nameOrigin: 'Gerhard Müller', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '1963-1981', country: 'Germany', birthDate: '1945-11-03', careerGoals: 634, careerAppearances: 705 },
  { name: 'Robert Lewandowski', nameOrigin: 'Robert Lewandowski', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '2006-2024', country: 'Poland', birthDate: '1988-08-21', careerGoals: 647, careerAppearances: 956, caps: 149 },
  { name: 'Neymar', nameOrigin: 'Neymar da Silva Santos Jr.', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '2009-2024', country: 'Brazil', birthDate: '1992-02-05', careerGoals: 461, careerAppearances: 709, caps: 128 },
  { name: 'Zlatan Ibrahimović', nameOrigin: 'Zlatan Ibrahimović', award: 'career_goals', awardLabel: '公式戦得点', consecutiveWins: 0, years: '1999-2023', country: 'Sweden', birthDate: '1981-10-03', careerGoals: 511, careerAppearances: 866, caps: 122 },
]

export function getSoccerTop10(): SoccerRecord[] {
  const sorted = [...SOCCER_TOP_GOALSCORERS].sort((a, b) => (b.careerGoals ?? 0) - (a.careerGoals ?? 0))
  const tenth = sorted[9]
  if (!tenth) return sorted
  const minGoals = tenth.careerGoals ?? 0
  return sorted.filter((r) => (r.careerGoals ?? 0) >= minGoals)
}
