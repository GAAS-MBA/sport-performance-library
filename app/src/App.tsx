import { useState } from 'react'
import { SPORTS, getTop10 } from './data/sports'
import { SIDEBAR_ITEMS } from './data/pages'
import { TENNIS_TOP10 } from './data/tennis'
import { getBoxingTop10, getWeightClassLabel } from './data/boxing'
import { getSoccerTop10 } from './data/soccer'
import { GOLF_MAJORS_TOP10 } from './data/golf'
import { BASEBALL_MVP_TOP10, BASEBALL_CY_YOUNG_TOP10 } from './data/baseball'
import type { AthleteRecord, TennisRecord, BoxingRecord, SoccerRecord } from './types'
import './App.css'

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
    <div className="athlete-card">
      <div className="athlete-rank">{rank}</div>
      <div className="athlete-info">
        <p className="athlete-name">{athlete.name}</p>
        <p className="athlete-origin">{athlete.nameOrigin}</p>
        {athlete.gender && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {athlete.gender === 'M' ? '男子' : '女子'}
          </span>
        )}
      </div>
      <div className="athlete-meta">
        <div className="athlete-count">{countValue}{['MVP', 'メジャー', 'Cy Young'].includes(countLabel) ? '回' : '個'}</div>
        <div className="athlete-years">{athlete.years}</div>
        <div className="athlete-country">{athlete.country}</div>
      </div>
    </div>
  )
}

function TennisCard({ rank, r }: { rank: number; r: TennisRecord }) {
  return (
    <div className="athlete-card">
      <div className="athlete-rank">{rank}</div>
      <div className="athlete-info">
        <p className="athlete-name">{r.name}</p>
        <p className="athlete-origin">{r.nameOrigin}</p>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.tour}</span>
      </div>
      <div className="athlete-meta">
        <div className="athlete-count">GS {r.grandSlamTitles}</div>
        <div className="athlete-years">世界1位 {r.totalWeeksNo1}週</div>
        <div className="athlete-country">{r.country}</div>
      </div>
    </div>
  )
}

function BoxingCard({ rank, r }: { rank: number; r: BoxingRecord }) {
  return (
    <div className="athlete-card">
      <div className="athlete-rank">{rank}</div>
      <div className="athlete-info">
        <p className="athlete-name">{r.name}</p>
        <p className="athlete-origin">{getWeightClassLabel(r.weightClass)}</p>
      </div>
      <div className="athlete-meta">
        <div className="athlete-count">{r.defenses}回防衛</div>
        <div className="athlete-years">{r.reignStart} - {r.reignEnd}</div>
        <div className="athlete-country">{r.country} / {r.sanctioningBodies}</div>
      </div>
    </div>
  )
}

function SoccerCard({ rank, r }: { rank: number; r: SoccerRecord }) {
  return (
    <div className="athlete-card">
      <div className="athlete-rank">{rank}</div>
      <div className="athlete-info">
        <p className="athlete-name">{r.name}</p>
        <p className="athlete-origin">{r.nameOrigin}</p>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.awardLabel}</span>
      </div>
      <div className="athlete-meta">
        <div className="athlete-count">{r.consecutiveWins}回連続</div>
        <div className="athlete-years">{r.years}</div>
        <div className="athlete-country">{r.country}</div>
      </div>
    </div>
  )
}

type RankingSortBy = 'rank' | 'population' | 'spectator' | 'market'

function App() {
  const [pageId, setPageId] = useState(SIDEBAR_ITEMS[0].id)
  const [rankingSortBy, setRankingSortBy] = useState<RankingSortBy>('rank')
  const [rankingSortDesc, setRankingSortDesc] = useState(false) // rank: 昇順(1→12)、他: 降順(大→小)
  const currentItem = SIDEBAR_ITEMS.find((i) => i.id === pageId)!

  const isMarketRanking = pageId === 'market_ranking'
  const isAbout = pageId === 'about'
  const isSport = !isMarketRanking && !isAbout && currentItem.type === 'sport'
  const sport = isSport ? SPORTS.find((s) => s.id === pageId)! : null
  const athletes = isSport ? getTop10(pageId) : []

  // 市場規模ランキングページ用（ランキング・趣旨ページを除く、ソート適用）
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
      setRankingSortDesc(col === 'rank' ? false : true) // 順位は昇順、競技/観戦/市場は降順
    }
  }

  const tennisRecords = pageId === 'tennis' ? TENNIS_TOP10 : []
  const boxingRecords = pageId === 'boxing' ? getBoxingTop10() : []
  const soccerRecords = pageId === 'soccer' ? getSoccerTop10() : []
  const golfRecords = pageId === 'golf' ? GOLF_MAJORS_TOP10 : []
  const baseballMvp = pageId === 'baseball' ? BASEBALL_MVP_TOP10 : []
  const baseballCyYoung = pageId === 'baseball' ? BASEBALL_CY_YOUNG_TOP10 : []

  const renderContent = () => {
    if (isMarketRanking) {
      return (
        <>
          <span className="rule-badge">競技人口・市場規模は参考値（各種統計・レポートに基づく概算）</span>
          <div className="market-ranking-table">
            <div className="market-ranking-header">
              <button
                type="button"
                className={`col-sort ${rankingSortBy === 'rank' ? 'active' : ''}`}
                onClick={() => handleRankingSort('rank')}
              >
                順位 {rankingSortBy === 'rank' && (rankingSortDesc ? '↓' : '↑')}
              </button>
              <span className="col-label">スポーツ</span>
              <button
                type="button"
                className={`col-sort col-population ${rankingSortBy === 'population' ? 'active' : ''}`}
                onClick={() => handleRankingSort('population')}
              >
                競技人口 {rankingSortBy === 'population' && (rankingSortDesc ? '↓' : '↑')}
              </button>
              <button
                type="button"
                className={`col-sort col-spectator ${rankingSortBy === 'spectator' ? 'active' : ''}`}
                onClick={() => handleRankingSort('spectator')}
              >
                観戦人口 {rankingSortBy === 'spectator' && (rankingSortDesc ? '↓' : '↑')}
              </button>
              <button
                type="button"
                className={`col-sort col-market ${rankingSortBy === 'market' ? 'active' : ''}`}
                onClick={() => handleRankingSort('market')}
              >
                市場規模 {rankingSortBy === 'market' && (rankingSortDesc ? '↓' : '↑')}
              </button>
            </div>
            {rankingItems.map((item, idx) => (
              <button
                key={item.id}
                className="market-ranking-row"
                onClick={() => setPageId(item.id)}
              >
                <span className="col-rank">
                  {rankingSortBy === 'rank' ? item.marketSize : idx + 1}
                </span>
                <span className="col-label">
                  {item.label}
                  {item.labelFull && <span className="col-label-full">{item.labelFull}</span>}
                </span>
                <span className="col-population">{item.population}</span>
                <span className="col-spectator">{item.spectatorPopulation}</span>
                <span className="col-market">{item.marketSizeUsd}</span>
              </button>
            ))}
          </div>
        </>
      )
    }
    if (isAbout) {
      return (
        <div className="about-page">
          <h2 className="about-title">Sport Performance Library について</h2>
          <section className="about-section">
            <h3>趣旨</h3>
            <p>
              Sport Performance Library は、<strong>スポーツパフォーマンスの個別最適化データ</strong>を集約・提供するライブラリーです。
              各スポーツの競技人口・市場規模・観戦人口といった産業構造を理解し、
              さらに各競技における「ベストプラクティス」としての歴代トップ選手を参照することで、
              スポーツビジネスやパフォーマンス分析のための基礎データを提供します。
            </p>
          </section>
          <section className="about-section">
            <h3>収録内容</h3>
            <ul>
              <li><strong>市場規模ランキング</strong> — 競技人口・観戦人口・市場規模（ドルベース）によるソート可能な一覧</li>
              <li><strong>種目別 Top 10</strong> — 各スポーツの選定基準（MVP、金メダル、優勝回数など）に基づく歴代選手データ</li>
              <li><strong>産業構造</strong> — 競技人口と観戦人口を分離し、スポーツ産業の特性を可視化</li>
            </ul>
          </section>
          <section className="about-section">
            <h3>利用目的</h3>
            <p>
              本ライブラリーは、スポーツ投資・マーケティング・メディア分析・アスリート育成など、
              スポーツ産業に関わる意思決定のための<strong>参照データ</strong>として活用できます。
              数値は各種統計・レポートに基づく概算であり、出典は随時更新されます。
            </p>
          </section>
          <section className="about-section">
            <h3>免責事項</h3>
            <p>
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
          <span className="rule-badge">総合ベストプラクティス（GS優勝・世界1位週数）</span>
          <div className="athlete-list">
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
          <span className="rule-badge">階級別・3回以上防衛した歴代チャンピオン</span>
          <div className="athlete-list">
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
          <span className="rule-badge">著名な賞を3回以上連続獲得</span>
          <div className="athlete-list">
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
          <span className="rule-badge">男子メジャー（Masters, U.S. Open, The Open, PGA）3回以上優勝</span>
          <div className="athlete-list">
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
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="rule-badge">MLB MVP 3回以上獲得</span>
            <div className="athlete-list">
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
            <span className="rule-badge">Cy Young Award 3回以上獲得</span>
            <div className="athlete-list">
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
        <span className="rule-badge">{s.rule}</span>
        <div className="athlete-list">
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

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">市場規模ランキング</h2>
        </div>
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${item.id === pageId ? 'active' : ''}`}
              onClick={() => setPageId(item.id)}
            >
              {item.type === 'market_ranking' ? (
                <span className="sidebar-rank sidebar-rank-icon" title="一覧">≡</span>
              ) : item.type === 'about' ? (
                <span className="sidebar-rank sidebar-rank-icon" title="趣旨">ℹ</span>
              ) : (
                <span className="sidebar-rank">{item.marketSize}</span>
              )}
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">
                  {item.label}
                  {item.labelFull && <span className="sidebar-item-full">{item.labelFull}</span>}
                </span>
                {item.type !== 'market_ranking' && item.type !== 'about' && (
                  <span className="sidebar-item-meta">
                    競技 {item.population} · 観戦 {item.spectatorPopulation} · {item.marketSizeUsd}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
        <footer className="sidebar-footer">© TANAAKK</footer>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Sport Performance Library</h1>
          <p>スポーツパフォーマンス 個別最適化データ</p>
        </header>

        <div>{renderContent()}</div>
      </main>
    </div>
  )
}

export default App
