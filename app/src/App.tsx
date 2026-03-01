import { useState } from 'react'
import { SPORTS, getTop10 } from './data/sports'
import { SIDEBAR_ITEMS } from './data/pages'
import { TENNIS_TOP10 } from './data/tennis'
import { getBoxingTop10, getWeightClassLabel } from './data/boxing'
import { getSoccerTop10 } from './data/soccer'
import { GOLF_MAJORS_TOP10 } from './data/golf'
import { BASEBALL_MVP_TOP10, BASEBALL_CY_YOUNG_TOP10 } from './data/baseball'
import type { AthleteRecord, TennisRecord, BoxingRecord, SoccerRecord } from './types'

function AthleteCard({
  rank,
  athlete,
  countLabel,
  countValue,
}: {
  rank: number
  athlete: AthleteRecord
  countLabel: string
  countValue: number
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0 sm:flex-initial">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{athlete.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{athlete.nameOrigin}</p>
          {athlete.gender && (
            <span className="text-xs text-slate-500">
              {athlete.gender === 'M' ? '男子' : '女子'}
            </span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-base sm:text-lg font-bold text-sky-500">{countValue}{['MVP', 'メジャー', 'Cy Young'].includes(countLabel) ? '回' : '個'}</div>
        <div className="text-xs sm:text-sm text-slate-500">{athlete.years}</div>
        <div className="text-xs text-slate-500 mt-0.5">{athlete.country}</div>
      </div>
    </div>
  )
}

function TennisCard({ rank, r }: { rank: number; r: TennisRecord }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0 sm:flex-initial">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{r.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{r.nameOrigin}</p>
          <span className="text-xs text-slate-500">{r.tour}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-base sm:text-lg font-bold text-sky-500">GS {r.grandSlamTitles}</div>
        <div className="text-xs sm:text-sm text-slate-500">世界1位 {r.totalWeeksNo1}週</div>
        <div className="text-xs text-slate-500 mt-0.5">{r.country}</div>
      </div>
    </div>
  )
}

function BoxingCard({ rank, r }: { rank: number; r: BoxingRecord }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0 sm:flex-initial">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{r.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{getWeightClassLabel(r.weightClass)}</p>
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-base sm:text-lg font-bold text-sky-500">{r.defenses}回防衛</div>
        <div className="text-xs sm:text-sm text-slate-500">{r.reignStart} - {r.reignEnd}</div>
        <div className="text-xs text-slate-500 mt-0.5">{r.country} / {r.sanctioningBodies}</div>
      </div>
    </div>
  )
}

function SoccerCard({ rank, r }: { rank: number; r: SoccerRecord }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0 sm:flex-initial">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{r.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{r.nameOrigin}</p>
          <span className="text-xs text-slate-500">{r.awardLabel}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-base sm:text-lg font-bold text-sky-500">{r.consecutiveWins}回連続</div>
        <div className="text-xs sm:text-sm text-slate-500">{r.years}</div>
        <div className="text-xs text-slate-500 mt-0.5">{r.country}</div>
      </div>
    </div>
  )
}

type RankingSortBy = 'rank' | 'population' | 'spectator' | 'market'

function App() {
  const [pageId, setPageId] = useState(SIDEBAR_ITEMS[0].id)
  const [rankingSortBy, setRankingSortBy] = useState<RankingSortBy>('rank')
  const [rankingSortDesc, setRankingSortDesc] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentItem = SIDEBAR_ITEMS.find((i) => i.id === pageId)!

  const isMarketRanking = pageId === 'market_ranking'
  const isAbout = pageId === 'about'
  const isSport = !isMarketRanking && !isAbout && currentItem.type === 'sport'
  const sport = isSport ? SPORTS.find((s) => s.id === pageId)! : null
  const athletes = isSport ? getTop10(pageId) : []

  const rankingItemsRaw = SIDEBAR_ITEMS.filter((i) => i.type !== 'market_ranking' && i.type !== 'about')
  const rankingItems = [...rankingItemsRaw].sort((a, b) => {
    const dir = rankingSortDesc ? -1 : 1
    if (rankingSortBy === 'rank') return (a.marketSize - b.marketSize) * dir
    if (rankingSortBy === 'population') return (a.populationNum - b.populationNum) * dir
    if (rankingSortBy === 'spectator') return (a.spectatorNum - b.spectatorNum) * dir
    return (a.marketSizeNum - b.marketSizeNum) * dir
  })

  const handleRankingSort = (col: RankingSortBy) => {
    if (rankingSortBy === col) {
      setRankingSortDesc((d) => !d)
    } else {
      setRankingSortBy(col)
      setRankingSortDesc(col === 'rank' ? false : true)
    }
  }

  const tennisRecords = pageId === 'tennis' ? TENNIS_TOP10 : []
  const boxingRecords = pageId === 'boxing' ? getBoxingTop10() : []
  const soccerRecords = pageId === 'soccer' ? getSoccerTop10() : []
  const golfRecords = pageId === 'golf' ? GOLF_MAJORS_TOP10 : []
  const baseballMvp = pageId === 'baseball' ? BASEBALL_MVP_TOP10 : []
  const baseballCyYoung = pageId === 'baseball' ? BASEBALL_CY_YOUNG_TOP10 : []

  const colSortClass = (col: RankingSortBy) =>
    `flex items-center gap-1 p-0 font-semibold text-slate-500 uppercase tracking-wide bg-transparent border-none cursor-pointer text-left transition-colors hover:text-sky-500 ${
      rankingSortBy === col ? 'text-sky-500' : ''
    }`

  const renderContent = () => {
    if (isMarketRanking) {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            競技人口・市場規模は参考値（各種統計・レポートに基づく概算）
          </span>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-col gap-1 min-w-[320px]">
              <div className="grid grid-cols-[2.5rem_1fr_3.5rem_3.5rem_4rem] sm:grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-5 text-[0.65rem] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">
                <button type="button" className={colSortClass('rank')} onClick={() => handleRankingSort('rank')}>
                  順位 {rankingSortBy === 'rank' && (rankingSortDesc ? '↓' : '↑')}
                </button>
                <span className="uppercase">スポーツ</span>
                <button type="button" className={colSortClass('population')} onClick={() => handleRankingSort('population')}>
                  競技 {rankingSortBy === 'population' && (rankingSortDesc ? '↓' : '↑')}
                </button>
                <button type="button" className={colSortClass('spectator')} onClick={() => handleRankingSort('spectator')}>
                  観戦 {rankingSortBy === 'spectator' && (rankingSortDesc ? '↓' : '↑')}
                </button>
                <button type="button" className={colSortClass('market')} onClick={() => handleRankingSort('market')}>
                  市場 {rankingSortBy === 'market' && (rankingSortDesc ? '↓' : '↑')}
                </button>
              </div>
              {rankingItems.map((item, idx) => (
                <button
                  key={item.id}
                  className="grid grid-cols-[2.5rem_1fr_3.5rem_3.5rem_4rem] sm:grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-2 sm:gap-3 items-center py-2.5 sm:py-3.5 px-3 sm:px-5 text-xs sm:text-[0.95rem] text-left border-none rounded-lg bg-white text-slate-800 cursor-pointer transition-all shadow-sm hover:bg-slate-100 hover:shadow-md"
                  onClick={() => setPageId(item.id)}
                >
                  <span className="font-semibold text-sky-500">
                    {rankingSortBy === 'rank' ? item.marketSize : idx + 1}
                  </span>
                  <span className="font-medium truncate">
                    {item.label}
                    {item.labelFull && <span className="block text-[0.65rem] sm:text-[0.7rem] font-normal text-slate-500 mt-0.5">{item.labelFull}</span>}
                  </span>
                  <span className="text-[0.65rem] sm:text-sm text-slate-500 truncate">{item.population}</span>
                  <span className="text-[0.65rem] sm:text-sm text-slate-500 truncate">{item.spectatorPopulation}</span>
                  <span className="text-[0.65rem] sm:text-sm text-slate-500 truncate">{item.marketSizeUsd}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )
    }
    if (isAbout) {
      return (
        <div className="max-w-[560px] w-full">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 m-0 mb-4 sm:mb-6">Sport Performance Library について</h2>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">趣旨</h3>
            <p className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-800 m-0">
              Sport Performance Library は、<strong>スポーツパフォーマンスの個別最適化データ</strong>を集約・提供するライブラリーです。
              各スポーツの競技人口・市場規模・観戦人口といった産業構造を理解し、
              さらに各競技における「ベストプラクティス」としての歴代トップ選手を参照することで、
              スポーツビジネスやパフォーマンス分析のための基礎データを提供します。
            </p>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">収録内容</h3>
            <ul className="m-0 pl-5 text-sm sm:text-[0.9rem] leading-relaxed text-slate-800">
              <li className="mb-2"><strong>市場規模ランキング</strong> — 競技人口・観戦人口・市場規模（ドルベース）によるソート可能な一覧</li>
              <li className="mb-2"><strong>種目別 Top 10</strong> — 各スポーツの選定基準（MVP、金メダル、優勝回数など）に基づく歴代選手データ</li>
              <li className="mb-2"><strong>産業構造</strong> — 競技人口と観戦人口を分離し、スポーツ産業の特性を可視化</li>
            </ul>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">利用目的</h3>
            <p className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-800 m-0">
              本ライブラリーは、スポーツ投資・マーケティング・メディア分析・アスリート育成など、
              スポーツ産業に関わる意思決定のための<strong>参照データ</strong>として活用できます。
              数値は各種統計・レポートに基づく概算であり、出典は随時更新されます。
            </p>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">免責事項</h3>
            <p className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-800 m-0">
              競技人口・観戦人口・市場規模は参考値であり、調査機関・手法により変動します。
              選手データは公開情報に基づき、選定基準は種目ごとに異なります。
            </p>
          </section>
        </div>
      )
    }
    if (pageId === 'tennis') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            総合ベストプラクティス（GS優勝・世界1位週数）
          </span>
          <div className="flex flex-col gap-2">
            {tennisRecords.map((r, i) => (
              <TennisCard key={`${r.name}-${r.period}`} rank={i + 1} r={r} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'boxing') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            階級別・3回以上防衛した歴代チャンピオン
          </span>
          <div className="flex flex-col gap-2">
            {boxingRecords.map((r, i) => (
              <BoxingCard key={`${r.name}-${r.weightClass}-${r.reignStart}`} rank={i + 1} r={r} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'soccer') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            著名な賞を3回以上連続獲得
          </span>
          <div className="flex flex-col gap-2">
            {soccerRecords.map((r, i) => (
              <SoccerCard key={`${r.name}-${r.award}-${r.years}`} rank={i + 1} r={r} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'golf') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            男子メジャー（Masters, U.S. Open, The Open, PGA）3回以上優勝
          </span>
          <div className="flex flex-col gap-2">
            {golfRecords.map((r, i) => (
              <AthleteCard
                key={`${r.name}-${r.years}`}
                rank={i + 1}
                athlete={r}
                countLabel="メジャー"
                countValue={r.count ?? 0}
              />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'baseball') {
      return (
        <>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
              MLB MVP 3回以上獲得
            </span>
            <div className="flex flex-col gap-2">
              {baseballMvp.map((r, i) => (
                <AthleteCard
                  key={`mvp-${r.name}-${r.years}`}
                  rank={i + 1}
                  athlete={r}
                  countLabel="MVP"
                  countValue={r.count ?? 0}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
              Cy Young Award 3回以上獲得
            </span>
            <div className="flex flex-col gap-2">
              {baseballCyYoung.map((r, i) => (
                <AthleteCard
                  key={`cy-${r.name}-${r.years}`}
                  rank={i + 1}
                  athlete={r}
                  countLabel="Cy Young"
                  countValue={r.count ?? 0}
                />
              ))}
            </div>
          </div>
        </>
      )
    }
    const s = sport!
    return (
      <>
        <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
          {s.rule}
        </span>
        <div className="flex flex-col gap-2">
          {athletes.map((a, i) => (
            <AthleteCard
              key={`${a.name}-${a.years}`}
              rank={i + 1}
              athlete={a}
              countLabel={s.countLabel}
              countValue={s.countKey === 'mvpCount' ? (a.mvpCount ?? 0) : (a.count ?? 0)}
            />
          ))}
        </div>
      </>
    )
  }

  const sidebarItemClass = (id: string) =>
    `flex items-start gap-2 w-full py-2.5 px-4 text-[0.9rem] font-medium text-left border-none rounded-lg bg-transparent text-slate-500 cursor-pointer transition-all hover:bg-slate-100 hover:text-slate-800 ${
      id === pageId ? 'bg-sky-100 text-sky-500' : ''
    }`

  const handleSidebarItemClick = (id: string) => {
    setPageId(id)
    setSidebarOpen(false)
  }

  const SidebarContent = () => (
    <>
      <div className="px-3 sm:px-5 pb-3 sm:pb-4 border-b border-slate-200 mb-3">
        <h2 className="text-[0.65rem] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide m-0">市場規模ランキング</h2>
      </div>
      <nav className="flex flex-col gap-0.5 px-2 sm:px-3 overflow-y-auto flex-1">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${sidebarItemClass(item.id)} flex-none py-2.5 px-4 text-[0.9rem] w-full`}
            onClick={() => handleSidebarItemClick(item.id)}
          >
            {item.type === 'market_ranking' ? (
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-base font-normal rounded" title="一覧">≡</span>
            ) : item.type === 'about' ? (
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-base font-normal rounded" title="趣旨">ℹ</span>
            ) : (
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[0.7rem] font-semibold text-sky-500 bg-sky-100 rounded-full">
                {item.marketSize}
              </span>
            )}
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="font-medium">
                {item.label}
                {item.labelFull && <span className="block text-[0.65rem] font-normal text-slate-500 mt-0.5">{item.labelFull}</span>}
              </span>
              {item.type !== 'market_ranking' && item.type !== 'about' && (
                <span className={`text-[0.7rem] font-normal opacity-90 ${item.id === pageId ? 'text-sky-500' : 'text-slate-500'}`}>
                  競技 {item.population} · 観戦 {item.spectatorPopulation} · {item.marketSizeUsd}
                </span>
              )}
            </div>
          </button>
        ))}
      </nav>
      <footer className="pt-3 sm:pt-4 px-3 sm:px-5 border-t border-slate-200 text-[0.65rem] sm:text-xs text-slate-500 shrink-0">© TANAAKK</footer>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* モバイル: オーバーレイ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          fixed sm:static inset-y-0 left-0 z-50 w-[280px] sm:w-60 flex-shrink-0 flex flex-col bg-white border-r border-slate-200 pt-4 sm:pt-6 px-4 sm:px-0 pb-4 sm:pb-0
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
        `}
      >
        <div className="sm:hidden flex items-center justify-between mb-3 pb-3 border-b border-slate-200">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide m-0">メニュー</h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 -m-2 rounded-lg hover:bg-slate-100 text-slate-500"
            aria-label="メニューを閉じる"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarContent />
      </aside>

      <main className="flex-1 min-w-0 w-full max-w-[720px] py-4 px-4 sm:py-8 sm:px-6 mx-auto">
        <header className="flex items-center gap-3 mb-6 sm:mb-10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 flex-shrink-0"
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 text-center sm:text-center min-w-0">
            <h1 className="text-xl sm:text-[1.75rem] font-bold text-slate-800 m-0 mb-1 tracking-tight">Sport Performance Library</h1>
            <p className="text-sm sm:text-[0.95rem] text-slate-500 m-0">スポーツパフォーマンス 個別最適化データ</p>
          </div>
          <div className="sm:hidden w-10 shrink-0" aria-hidden="true" />
        </header>

        <div>{renderContent()}</div>
      </main>
    </div>
  )
}

export default App
