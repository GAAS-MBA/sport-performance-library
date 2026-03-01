export interface AthleteRecord {
  name: string
  nameOrigin: string
  count?: number
  years: string
  country: string
  gender?: string
  discipline?: string
  mvpCount?: number
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
}

export interface BoxingRecord {
  name: string
  weightClass: string
  defenses: number
  reignStart: string
  reignEnd: string
  sanctioningBodies: string
  country: string
}

export interface SoccerRecord {
  name: string
  nameOrigin: string
  award: string
  awardLabel: string
  consecutiveWins: number
  years: string
  country: string
}

export interface SportConfig {
  id: string
  label: string
  labelEn: string
  rule: string
  minCount: number
  countLabel: string
  records: AthleteRecord[]
  countKey: 'count' | 'mvpCount'
  marketSize?: number  // 市場規模順（1=最大）
}

export type PageType = 'standard' | 'tennis' | 'boxing' | 'soccer'

export interface PageConfig {
  id: string
  label: string
  pageType: PageType
}
