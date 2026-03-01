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

function App() {
  const [pageId, setPageId] = useState(SIDEBAR_ITEMS[0].id)
  const currentItem = SIDEBAR_ITEMS.find((i) => i.id === pageId)!

  const isSport = currentItem.type === 'sport'
  const sport = isSport ? SPORTS.find((s) => s.id === pageId)! : null
  const athletes = isSport ? getTop10(pageId) : []

  const tennisRecords = pageId === 'tennis' ? TENNIS_TOP10 : []
  const boxingRecords = pageId === 'boxing' ? getBoxingTop10() : []
  const soccerRecords = pageId === 'soccer' ? getSoccerTop10() : []
  const golfRecords = pageId === 'golf' ? GOLF_MAJORS_TOP10 : []
  const baseballMvp = pageId === 'baseball' ? BASEBALL_MVP_TOP10 : []
  const baseballCyYoung = pageId === 'baseball' ? BASEBALL_CY_YOUNG_TOP10 : []

  const renderContent = () => {
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
          <h2 className="sidebar-title">スポーツ</h2>
        </div>
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${item.id === pageId ? 'active' : ''}`}
              onClick={() => setPageId(item.id)}
            >
              {item.label}
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
