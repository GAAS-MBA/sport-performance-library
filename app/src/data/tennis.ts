import type { TennisRecord } from '../types'

// 総合ベストプラクティス Top 10（GS優勝数・世界1位週数統合）
export const TENNIS_TOP10: TennisRecord[] = [
  { name: 'Novak Djokovic', nameOrigin: 'Novak Đoković', tour: 'ATP', metricValue: 428, grandSlamTitles: 24, totalWeeksNo1: 428, period: '2011-2024', country: 'Serbia' },
  { name: 'Steffi Graf', nameOrigin: 'Stefanie Maria Graf', tour: 'WTA', metricValue: 377, grandSlamTitles: 22, totalWeeksNo1: 377, period: '1987-1997', country: 'Germany' },
  { name: 'Martina Navratilova', nameOrigin: 'Martina Navratilová', tour: 'WTA', metricValue: 332, grandSlamTitles: 18, totalWeeksNo1: 332, period: '1978-1990', country: 'USA' },
  { name: 'Serena Williams', nameOrigin: 'Serena Williams', tour: 'WTA', metricValue: 319, grandSlamTitles: 23, totalWeeksNo1: 319, period: '2002-2017', country: 'USA' },
  { name: 'Roger Federer', nameOrigin: 'Roger Federer', tour: 'ATP', metricValue: 310, grandSlamTitles: 20, totalWeeksNo1: 310, period: '2004-2018', country: 'Switzerland' },
  { name: 'Pete Sampras', nameOrigin: 'Pete Sampras', tour: 'ATP', metricValue: 286, grandSlamTitles: 14, totalWeeksNo1: 286, period: '1993-2000', country: 'USA' },
  { name: 'Ivan Lendl', nameOrigin: 'Ivan Lendl', tour: 'ATP', metricValue: 270, grandSlamTitles: 8, totalWeeksNo1: 270, period: '1983-1990', country: 'Czechoslovakia' },
  { name: 'Jimmy Connors', nameOrigin: 'James Scott Connors', tour: 'ATP', metricValue: 268, grandSlamTitles: 8, totalWeeksNo1: 268, period: '1974-1983', country: 'USA' },
  { name: 'Chris Evert', nameOrigin: 'Christine Marie Evert', tour: 'WTA', metricValue: 260, grandSlamTitles: 18, totalWeeksNo1: 260, period: '1975-1986', country: 'USA' },
  { name: 'Rafael Nadal', nameOrigin: 'Rafael Nadal Parera', tour: 'ATP', metricValue: 209, grandSlamTitles: 22, totalWeeksNo1: 209, period: '2008-2020', country: 'Spain' },
]
