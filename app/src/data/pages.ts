import { SPORTS } from './sports'

export interface SidebarItem {
  id: string
  label: string
  type: 'sport' | 'tennis' | 'boxing' | 'soccer' | 'golf' | 'baseball'
  marketSize: number  // 市場規模順（1=最大）
}

// 市場規模順（1=最大）: サッカー > 野球 > バスケ > テニス > ゴルフ > ボクシング > バレー > 水泳 > 短距離 > 長距離 > バドミントン > 卓球
const SPECIAL_PAGES: SidebarItem[] = [
  { id: 'soccer', label: 'サッカー', type: 'soccer', marketSize: 1 },
  { id: 'baseball', label: '野球', type: 'baseball', marketSize: 2 },
  { id: 'tennis', label: 'テニス', type: 'tennis', marketSize: 4 },
  { id: 'golf', label: 'ゴルフ', type: 'golf', marketSize: 5 },
  { id: 'boxing', label: 'ボクシング', type: 'boxing', marketSize: 6 },
]

export const SIDEBAR_ITEMS: SidebarItem[] = [
  ...SPECIAL_PAGES,
  ...SPORTS.map((s) => ({ id: s.id, label: s.label, type: 'sport' as const, marketSize: s.marketSize ?? 99 })),
].sort((a, b) => a.marketSize - b.marketSize)
