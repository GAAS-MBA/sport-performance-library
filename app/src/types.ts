export interface AthleteRecord {
  name: string
  nameOrigin: string
  count?: number
  years: string
  country: string
  gender?: string
  discipline?: string
  mvpCount?: number
  birthDate?: string  // YYYY-MM-DD
  /** 生涯得点数（NBAレギュラーシーズン） */
  careerPoints?: number
  /** 生涯出場試合数（得点の算定前提） */
  careerGames?: number
}

export interface TennisRecord {
  name: string
  nameOrigin: string
  tour: string
  metricValue: number
  grandSlamTitles: number
  totalWeeksNo1: number
  period: string
  country: string
  birthDate?: string  // YYYY-MM-DD
}

export interface BoxingRecord {
  name: string
  weightClass: string
  defenses: number
  reignStart: string
  reignEnd: string
  sanctioningBodies: string
  country: string
  birthDate?: string  // YYYY-MM-DD
  /** 複数階級の場合は通算防衛数。未指定時は defenses を使用 */
  totalDefenses?: number
  /** 複数階級制覇の場合の表示用（例: "5階級"） */
  weightClassLabel?: string
}

export interface SoccerRecord {
  name: string
  nameOrigin: string
  award: string
  awardLabel: string
  /** 著名賞の連続獲得数。得点ランキングの場合は0 */
  consecutiveWins?: number
  years: string
  country: string
  birthDate?: string  // YYYY-MM-DD
  /** 生涯得点数（クラブ＋代表の公式戦） */
  careerGoals?: number
  /** 生涯出場数（クラブ＋代表の公式戦。生涯得点の算定前提） */
  careerAppearances?: number
  /** 代表出場数（Aマッチキャップ数） */
  caps?: number
  /** 当該賞の通算獲得数 */
  totalAwardWins?: number
}

export interface SportConfig {
  id: string
  label: string
  labelEn: string
  rule: string
  ruleEn?: string
  minCount: number
  countLabel: string
  records: AthleteRecord[]
  countKey: 'count' | 'mvpCount' | 'careerPoints'
  marketSize?: number  // 市場規模順（1=最大）
}

export type PageType = 'standard' | 'tennis' | 'boxing' | 'soccer'

export interface PageConfig {
  id: string
  label: string
  pageType: PageType
}
