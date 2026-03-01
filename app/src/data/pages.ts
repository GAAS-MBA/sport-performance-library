import { SPORTS } from './sports'

export interface SidebarItem {
  id: string
  label: string
  labelFull?: string  // 略称の正式名称（例: NFL → National Football League）
  type: 'sport' | 'tennis' | 'boxing' | 'soccer' | 'golf' | 'baseball' | 'cricket' | 'nfl' | 'f1' | 'esports' | 'mma' | 'rugby' | 'horse_racing' | 'market_ranking' | 'about'
  marketSize: number  // 市場規模順（1=最大）、0はランキングページ用
  population: string  // 競技人口（世界）
  spectatorPopulation: string  // 観戦人口（世界）
  marketSizeUsd: string  // 市場規模（ドルベース）
  populationNum: number  // ソート用（単位: 百万人）
  spectatorNum: number  // ソート用（単位: 百万人）
  marketSizeNum: number  // ソート用（単位: 10億ドル）
}

// 市場規模順（1=最大）: サッカー > NFL > ゴルフ > バスケ > クリケット > ...
// 競技人口・観戦人口・市場規模は参考値（各種統計・レポートに基づく概算）
const SPECIAL_PAGES: SidebarItem[] = [
  { id: 'soccer', label: 'サッカー', type: 'soccer', marketSize: 1, population: '2.6億人', spectatorPopulation: '35億人', marketSizeUsd: '$600B', populationNum: 260, spectatorNum: 3500, marketSizeNum: 600 },
  { id: 'nfl', label: 'NFL', labelFull: 'National Football League（ナショナルフットボールリーグ）', type: 'nfl', marketSize: 2, population: '1,500万人', spectatorPopulation: '5億人', marketSizeUsd: '$23B', populationNum: 15, spectatorNum: 500, marketSizeNum: 23 },
  { id: 'baseball', label: '野球', type: 'baseball', marketSize: 3, population: '3,500万人', spectatorPopulation: '5億人', marketSizeUsd: '$10B', populationNum: 35, spectatorNum: 500, marketSizeNum: 10 },
  { id: 'tennis', label: 'テニス', type: 'tennis', marketSize: 4, population: '1.1億人', spectatorPopulation: '10億人', marketSizeUsd: '$6B', populationNum: 110, spectatorNum: 1000, marketSizeNum: 6 },
  { id: 'golf', label: 'ゴルフ', type: 'golf', marketSize: 5, population: '6,600万人', spectatorPopulation: '4.5億人', marketSizeUsd: '$84B', populationNum: 66, spectatorNum: 450, marketSizeNum: 84 },
  { id: 'boxing', label: 'ボクシング', type: 'boxing', marketSize: 6, population: '1,000万人', spectatorPopulation: '5億人', marketSizeUsd: '$8B', populationNum: 10, spectatorNum: 500, marketSizeNum: 8 },
  { id: 'cricket', label: 'クリケット', type: 'cricket', marketSize: 7, population: '3億人', spectatorPopulation: '25億人', marketSizeUsd: '$17B', populationNum: 300, spectatorNum: 2500, marketSizeNum: 17 },
  { id: 'f1', label: 'F1', labelFull: 'Formula One World Championship（F1世界選手権）', type: 'f1', marketSize: 8, population: '1,000人', spectatorPopulation: '7.5億人', marketSizeUsd: '$10B', populationNum: 0.001, spectatorNum: 750, marketSizeNum: 10 },
  { id: 'horse_racing', label: '競馬', labelFull: 'Thoroughbred Racing（サラブレッド競馬）', type: 'horse_racing', marketSize: 9, population: '5万人', spectatorPopulation: '1億人', marketSizeUsd: '$115B', populationNum: 0.05, spectatorNum: 100, marketSizeNum: 115 },
  { id: 'esports', label: 'eスポーツ', labelFull: 'Electronic Sports（エレクトロニックスポーツ）', type: 'esports', marketSize: 10, population: '2億人', spectatorPopulation: '5億人', marketSizeUsd: '$2.5B', populationNum: 200, spectatorNum: 500, marketSizeNum: 2.5 },
  { id: 'mma', label: 'MMA', labelFull: 'Mixed Martial Arts（総合格闘技）', type: 'mma', marketSize: 11, population: '500万人', spectatorPopulation: '4億人', marketSizeUsd: '$1.5B', populationNum: 5, spectatorNum: 400, marketSizeNum: 1.5 },
  { id: 'rugby', label: 'ラグビー', type: 'rugby', marketSize: 12, population: '2,000万人', spectatorPopulation: '8億人', marketSizeUsd: '$5B', populationNum: 20, spectatorNum: 800, marketSizeNum: 5 },
]

// スポーツ別の競技人口・観戦人口・市場規模（SPORTS にないものは pages で定義）
const SPORT_META: Record<string, { population: string; spectatorPopulation: string; marketSizeUsd: string; populationNum: number; spectatorNum: number; marketSizeNum: number }> = {
  basketball: { population: '4.5億人', spectatorPopulation: '22億人', marketSizeUsd: '$75B', populationNum: 450, spectatorNum: 2200, marketSizeNum: 75 },
  swimming: { population: '1億人', spectatorPopulation: '5億人', marketSizeUsd: '$5B', populationNum: 100, spectatorNum: 500, marketSizeNum: 5 },
  sprint: { population: '1億人', spectatorPopulation: '10億人', marketSizeUsd: '$5B', populationNum: 100, spectatorNum: 1000, marketSizeNum: 5 },
  long_distance: { population: '8,000万人', spectatorPopulation: '8億人', marketSizeUsd: '$5B', populationNum: 80, spectatorNum: 800, marketSizeNum: 5 },
  volleyball: { population: '5億人', spectatorPopulation: '9億人', marketSizeUsd: '$5B', populationNum: 500, spectatorNum: 900, marketSizeNum: 5 },
  badminton: { population: '3億人', spectatorPopulation: '7億人', marketSizeUsd: '$5B', populationNum: 300, spectatorNum: 700, marketSizeNum: 5 },
  table_tennis: { population: '3億人', spectatorPopulation: '8億人', marketSizeUsd: '$5B', populationNum: 300, spectatorNum: 800, marketSizeNum: 5 },
}

// 市場規模ランキング一覧ページ（メニュー最上部）
const MARKET_RANKING_PAGE: SidebarItem = {
  id: 'market_ranking',
  label: '市場規模ランキング',
  type: 'market_ranking',
  marketSize: 0,
  population: '—',
  spectatorPopulation: '—',
  marketSizeUsd: '—',
  populationNum: 0,
  spectatorNum: 0,
  marketSizeNum: 0,
}

// このライブラリーの趣旨（メニュー最下部）
const ABOUT_PAGE: SidebarItem = {
  id: 'about',
  label: 'このライブラリーの趣旨',
  type: 'about',
  marketSize: 999,
  population: '—',
  spectatorPopulation: '—',
  marketSizeUsd: '—',
  populationNum: 0,
  spectatorNum: 0,
  marketSizeNum: 0,
}

const ALL_ITEMS: SidebarItem[] = [
  MARKET_RANKING_PAGE,
  ...SPECIAL_PAGES,
  ...SPORTS.map((s) => {
    const meta = SPORT_META[s.id] ?? { population: '—', spectatorPopulation: '—', marketSizeUsd: '—', populationNum: 0, spectatorNum: 0, marketSizeNum: 0 }
    return {
      id: s.id,
      label: s.label,
      type: 'sport' as const,
      marketSize: s.marketSize ?? 99,
      population: meta.population,
      spectatorPopulation: meta.spectatorPopulation,
      marketSizeUsd: meta.marketSizeUsd,
      populationNum: meta.populationNum,
      spectatorNum: meta.spectatorNum,
      marketSizeNum: meta.marketSizeNum,
    }
  }),
]
const SPORTS_ONLY = ALL_ITEMS.filter((i) => i.type !== 'market_ranking' && i.type !== 'about').sort((a, b) => b.marketSizeNum - a.marketSizeNum)
export const SIDEBAR_ITEMS: SidebarItem[] = [
  MARKET_RANKING_PAGE,
  ...SPORTS_ONLY.map((item, idx) => ({ ...item, marketSize: idx + 1 })),
  ABOUT_PAGE,
]
