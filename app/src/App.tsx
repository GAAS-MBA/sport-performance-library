import { useState } from 'react'
import { t, formatPopulation, formatSpectator, formatMarketSize, type Lang } from './i18n'
import { SPORTS, getTop10 } from './data/sports'
import { SIDEBAR_ITEMS } from './data/pages'
import { TENNIS_TOP10 } from './data/tennis'
import { getBoxingTop10, getWeightClassLabel } from './data/boxing'
import { getSoccerTop10 } from './data/soccer'
import { GOLF_MAJORS_TOP10 } from './data/golf'
import { BASEBALL_MVP_TOP10, BASEBALL_CY_YOUNG_TOP10 } from './data/baseball'
import { HORSE_RACING_TOP10 } from './data/horseRacing'
import { CRICKET_TOP10 } from './data/cricket'
import { NFL_MVP_TOP10 } from './data/nfl'
import { F1_TOP10 } from './data/f1'
import { ESPORTS_TOP10 } from './data/esports'
import { MMA_TOP10 } from './data/mma'
import { RUGBY_TOP10 } from './data/rugby'
import type { AthleteRecord, TennisRecord, BoxingRecord, SoccerRecord } from './types'

function formatBirthDate(lang: Lang, d?: string): string {
  if (!d) return ''
  const [y, m, n] = d.split('-')
  if (!y) return ''
  if (lang === 'en') {
    if (m && n) {
      const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(m, 10) - 1]
      return `${month} ${parseInt(n, 10)}, ${y}`
    }
    return y
  }
  return m && n ? `${y}年${parseInt(m, 10)}月${parseInt(n, 10)}日` : `${y}年`
}

function AthleteCard({
  lang,
  rank,
  athlete,
  countLabel,
  countValue,
}: {
  lang: Lang
  rank: number
  athlete: AthleteRecord
  countLabel: string
  countValue: number
}) {
  const suffix = ['MVP', 'メジャー', 'Cy Young', 'G1勝利', 'WDC', '防衛', 'W杯優勝', '世界大会優勝'].includes(countLabel) ? t(lang, 'times') : t(lang, 'countUnit')
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{athlete.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{athlete.nameOrigin}</p>
          {athlete.birthDate && (
            <p className="text-xs text-slate-500 m-0 mt-0.5">{t(lang, 'birth')}: {formatBirthDate(lang, athlete.birthDate)}</p>
          )}
          {athlete.gender && (
            <span className="text-xs text-slate-500">
              {athlete.gender === 'M' ? t(lang, 'male') : t(lang, 'female')}
            </span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-base sm:text-lg font-bold text-sky-500">
          {countLabel === '得点'
            ? `${countValue.toLocaleString()}${t(lang, 'points')}`
            : `${countValue}${suffix}`}
        </div>
        <div className="text-xs sm:text-sm text-slate-500">{athlete.years}</div>
        {countLabel === '得点' && athlete.careerGames != null && (
          <div className="text-xs text-slate-500 mt-0.5">
            {athlete.careerGames.toLocaleString()}{t(lang, 'games')}・{(countValue / athlete.careerGames).toFixed(1)}{t(lang, 'ptsPerGame')}
          </div>
        )}
        <div className="text-xs text-slate-500 mt-0.5">{athlete.country}</div>
      </div>
    </div>
  )
}

function TennisCard({ lang, rank, r }: { lang: Lang; rank: number; r: TennisRecord }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{r.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{r.nameOrigin}</p>
          {r.birthDate && (
            <p className="text-xs text-slate-500 m-0 mt-0.5">{t(lang, 'birth')}: {formatBirthDate(lang, r.birthDate)}</p>
          )}
          <span className="text-xs text-slate-500">{r.tour}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-base sm:text-lg font-bold text-sky-500">GS {r.grandSlamTitles}</div>
        <div className="text-xs sm:text-sm text-slate-500">{t(lang, 'worldNo1')} {r.totalWeeksNo1}{t(lang, 'weeks')}</div>
        <div className="text-xs text-slate-500 mt-0.5">{r.country}</div>
      </div>
    </div>
  )
}

function BoxingCard({ lang, rank, r }: { lang: Lang; rank: number; r: BoxingRecord }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{r.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{r.weightClassLabel ?? getWeightClassLabel(r.weightClass)}</p>
          {r.birthDate && (
            <p className="text-xs text-slate-500 m-0 mt-0.5">{t(lang, 'birth')}: {formatBirthDate(lang, r.birthDate)}</p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-base sm:text-lg font-bold text-sky-500">{(r.totalDefenses ?? r.defenses)}{t(lang, 'defenses')}</div>
        <div className="text-xs sm:text-sm text-slate-500">{r.reignStart} - {r.reignEnd}</div>
        <div className="text-xs text-slate-500 mt-0.5">{r.country} / {r.sanctioningBodies}</div>
      </div>
    </div>
  )
}

function SoccerCard({ lang, rank, r }: { lang: Lang; rank: number; r: SoccerRecord }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-semibold text-sky-500 bg-sky-100 rounded-full">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 m-0 mb-0.5 text-sm sm:text-base">{r.name}</p>
          <p className="text-xs sm:text-sm text-slate-500 m-0">{r.nameOrigin}</p>
          {r.birthDate && (
            <p className="text-xs text-slate-500 m-0 mt-0.5">{t(lang, 'birth')}: {formatBirthDate(lang, r.birthDate)}</p>
          )}
          <span className="text-xs text-slate-500">{r.awardLabel}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-left sm:text-right border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        {(r.consecutiveWins ?? 0) > 0 ? (
          <div className="text-sm sm:text-base text-slate-600">{r.consecutiveWins}{t(lang, 'consecutiveWins')}</div>
        ) : r.careerGoals != null ? (
          <div className="text-base sm:text-lg font-bold text-sky-500">{r.careerGoals.toLocaleString()}{t(lang, 'points')}</div>
        ) : null}
        <div className="text-xs sm:text-sm text-slate-500">{r.years}</div>
        {r.careerGoals != null && r.careerAppearances != null && (
          <div className="text-xs text-slate-500 mt-0.5">
            {(r.consecutiveWins ?? 0) > 0 ? (
              <>{t(lang, 'careerGoals')}: {r.careerGoals.toLocaleString()}（{r.careerAppearances.toLocaleString()}{t(lang, 'games')}・{(r.careerGoals / r.careerAppearances).toFixed(2)}{t(lang, 'ptsPerGame')}）</>
            ) : (
              <>{r.careerAppearances.toLocaleString()}{t(lang, 'games')}・{(r.careerGoals / r.careerAppearances).toFixed(2)}{t(lang, 'ptsPerGame')}</>
            )}
          </div>
        )}
        {r.caps != null && (
          <div className="text-xs text-slate-500 mt-0.5">{t(lang, 'caps')}: {r.caps}{t(lang, 'capsGames')}</div>
        )}
        <div className="text-xs text-slate-500 mt-0.5">{r.country}</div>
      </div>
    </div>
  )
}

type RankingSortBy = 'rank' | 'population' | 'spectator' | 'market'
type SoccerSortBy = 'careerGoals' | 'caps' | 'careerAppearances' | 'goalsPerGame'

function App() {
  const [pageId, setPageId] = useState(SIDEBAR_ITEMS[0].id)
  const [rankingSortBy, setRankingSortBy] = useState<RankingSortBy>('rank')
  const [rankingSortDesc, setRankingSortDesc] = useState(false)
  const [soccerSortBy, setSoccerSortBy] = useState<SoccerSortBy>('careerGoals')
  const [soccerSortDesc, setSoccerSortDesc] = useState(false)
  const [lang, setLang] = useState<Lang>('ja')
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
  const soccerRecordsRaw = pageId === 'soccer' ? getSoccerTop10() : []
  const soccerRecords = [...soccerRecordsRaw].sort((a, b) => {
    const dir = soccerSortDesc ? -1 : 1
    const getVal = (r: SoccerRecord) => {
      if (soccerSortBy === 'careerGoals') return r.careerGoals ?? 0
      if (soccerSortBy === 'caps') return r.caps ?? 0
      if (soccerSortBy === 'careerAppearances') return r.careerAppearances ?? 0
      if (soccerSortBy === 'goalsPerGame') return (r.careerGoals ?? 0) / (r.careerAppearances ?? 1)
      return r.careerGoals ?? 0
    }
    return (getVal(b) - getVal(a)) * dir
  })
  const golfRecords = pageId === 'golf' ? GOLF_MAJORS_TOP10 : []
  const baseballMvp = pageId === 'baseball' ? BASEBALL_MVP_TOP10 : []
  const baseballCyYoung = pageId === 'baseball' ? BASEBALL_CY_YOUNG_TOP10 : []
  const horseRacingRecords = pageId === 'horse_racing' ? HORSE_RACING_TOP10 : []
  const cricketRecords = pageId === 'cricket' ? CRICKET_TOP10 : []
  const nflRecords = pageId === 'nfl' ? NFL_MVP_TOP10 : []
  const f1Records = pageId === 'f1' ? F1_TOP10 : []
  const esportsRecords = pageId === 'esports' ? ESPORTS_TOP10 : []
  const mmaRecords = pageId === 'mma' ? MMA_TOP10 : []
  const rugbyRecords = pageId === 'rugby' ? RUGBY_TOP10 : []

  const colSortClass = (col: RankingSortBy) =>
    `flex items-center gap-1 p-0 font-semibold text-slate-500 uppercase tracking-wide bg-transparent border-none cursor-pointer text-left transition-colors hover:text-sky-500 ${
      rankingSortBy === col ? 'text-sky-500' : ''
    }`

  const renderContent = () => {
    if (isMarketRanking) {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'marketNote')}
          </span>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-col gap-1 min-w-[320px]">
              <div className="grid grid-cols-[2.5rem_1fr_3.5rem_3.5rem_4rem] sm:grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-5 text-[0.65rem] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">
                <button type="button" className={colSortClass('rank')} onClick={() => handleRankingSort('rank')}>
                  {t(lang, 'rank')} {rankingSortBy === 'rank' && (rankingSortDesc ? '↓' : '↑')}
                </button>
                <span className="uppercase">{t(lang, 'sportCol')}</span>
                <button type="button" className={colSortClass('population')} onClick={() => handleRankingSort('population')}>
                  {t(lang, 'participation')} {rankingSortBy === 'population' && (rankingSortDesc ? '↓' : '↑')}
                </button>
                <button type="button" className={colSortClass('spectator')} onClick={() => handleRankingSort('spectator')}>
                  {t(lang, 'spectator')} {rankingSortBy === 'spectator' && (rankingSortDesc ? '↓' : '↑')}
                </button>
                <button type="button" className={colSortClass('market')} onClick={() => handleRankingSort('market')}>
                  {t(lang, 'market')} {rankingSortBy === 'market' && (rankingSortDesc ? '↓' : '↑')}
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
                    {lang === 'en' && item.labelEn ? item.labelEn : item.label}
                    {item.labelFull && <span className="block text-[0.65rem] sm:text-[0.7rem] font-normal text-slate-500 mt-0.5">{item.labelFull}</span>}
                  </span>
                  <span className="text-[0.65rem] sm:text-sm text-slate-500 truncate">{formatPopulation(lang, item.populationNum)}</span>
                  <span className="text-[0.65rem] sm:text-sm text-slate-500 truncate">{formatSpectator(lang, item.spectatorNum)}</span>
                  <span className="text-[0.65rem] sm:text-sm text-slate-500 truncate">{formatMarketSize(lang, item.marketSizeNum)}</span>
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
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 m-0 mb-4 sm:mb-6">{t(lang, 'aboutTitle')}</h2>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">{t(lang, 'aboutPurpose')}</h3>
            <p className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-800 m-0">{t(lang, 'aboutPurposeText')}</p>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">{t(lang, 'aboutContent')}</h3>
            <ul className="m-0 pl-5 text-sm sm:text-[0.9rem] leading-relaxed text-slate-800">
              <li className="mb-2">{t(lang, 'aboutContent1')}</li>
              <li className="mb-2">{t(lang, 'aboutContent2')}</li>
              <li className="mb-2">{t(lang, 'aboutContent3')}</li>
            </ul>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">{t(lang, 'aboutUsage')}</h3>
            <p className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-800 m-0">{t(lang, 'aboutUsageText')}</p>
          </section>
          <section className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-sky-500 m-0 mb-2 sm:mb-3">{t(lang, 'aboutDisclaimer')}</h3>
            <p className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-800 m-0">{t(lang, 'aboutDisclaimerText')}</p>
          </section>
        </div>
      )
    }
    if (pageId === 'tennis') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_tennis')}
          </span>
          <div className="flex flex-col gap-2">
            {tennisRecords.map((r, i) => (
              <TennisCard key={`${r.name}-${r.period}`} lang={lang} rank={i + 1} r={r} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'boxing') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_boxing')}
          </span>
          <div className="flex flex-col gap-2">
            {boxingRecords.map((r, i) => (
              <BoxingCard key={`${r.name}-${r.weightClass}-${r.reignStart}`} lang={lang} rank={i + 1} r={r} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'soccer') {
      const soccerSortClass = (col: SoccerSortBy) =>
        `px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
          soccerSortBy === col
            ? 'bg-sky-100 text-sky-600'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`
      const handleSoccerSort = (col: SoccerSortBy) => {
        if (soccerSortBy === col) {
          setSoccerSortDesc((d) => !d)
        } else {
          setSoccerSortBy(col)
          setSoccerSortDesc(false)
        }
      }
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_soccer')}
          </span>
          <p className="text-xs text-slate-500 mb-4">
            {t(lang, 'rule_soccer_sub')}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <button type="button" className={soccerSortClass('careerGoals')} onClick={() => handleSoccerSort('careerGoals')}>
              {t(lang, 'careerGoals')} {soccerSortBy === 'careerGoals' && (soccerSortDesc ? '↑' : '↓')}
            </button>
            <button type="button" className={soccerSortClass('goalsPerGame')} onClick={() => handleSoccerSort('goalsPerGame')}>
              {t(lang, 'ptsPerGame')} {soccerSortBy === 'goalsPerGame' && (soccerSortDesc ? '↑' : '↓')}
            </button>
            <button type="button" className={soccerSortClass('careerAppearances')} onClick={() => handleSoccerSort('careerAppearances')}>
              {t(lang, 'careerAppearances')} {soccerSortBy === 'careerAppearances' && (soccerSortDesc ? '↑' : '↓')}
            </button>
            <button type="button" className={soccerSortClass('caps')} onClick={() => handleSoccerSort('caps')}>
              {t(lang, 'caps')} {soccerSortBy === 'caps' && (soccerSortDesc ? '↑' : '↓')}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {soccerRecords.map((r, i) => (
              <SoccerCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} r={r} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'golf') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_golf')}
          </span>
          <div className="flex flex-col gap-2">
            {golfRecords.map((r, i) => (
              <AthleteCard
                key={`${r.name}-${r.years}`}
                lang={lang}
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
              {t(lang, 'rule_baseball_mvp')}
            </span>
            <div className="flex flex-col gap-2">
              {baseballMvp.map((r, i) => (
                <AthleteCard
                  key={`mvp-${r.name}-${r.years}`}
                  lang={lang}
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
              {t(lang, 'rule_baseball_cy')}
            </span>
            <div className="flex flex-col gap-2">
              {baseballCyYoung.map((r, i) => (
                <AthleteCard
                  key={`cy-${r.name}-${r.years}`}
                  lang={lang}
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
    if (pageId === 'horse_racing') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_horse_racing')}
          </span>
          <div className="flex flex-col gap-2">
            {horseRacingRecords.map((r, i) => (
              <AthleteCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} athlete={r} countLabel="G1勝利" countValue={r.count ?? 0} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'cricket') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_cricket')}
          </span>
          <div className="flex flex-col gap-2">
            {cricketRecords.map((r, i) => (
              <AthleteCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} athlete={r} countLabel="センチュリー" countValue={r.count ?? 0} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'nfl') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_nfl')}
          </span>
          <div className="flex flex-col gap-2">
            {nflRecords.map((r, i) => (
              <AthleteCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} athlete={r} countLabel="MVP" countValue={r.count ?? 0} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'f1') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_f1')}
          </span>
          <div className="flex flex-col gap-2">
            {f1Records.map((r, i) => (
              <AthleteCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} athlete={r} countLabel="WDC" countValue={r.count ?? 0} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'esports') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_esports')}
          </span>
          <div className="flex flex-col gap-2">
            {esportsRecords.map((r, i) => (
              <AthleteCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} athlete={r} countLabel="世界大会優勝" countValue={r.count ?? 0} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'mma') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_mma')}
          </span>
          <div className="flex flex-col gap-2">
            {mmaRecords.map((r, i) => (
              <AthleteCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} athlete={r} countLabel="防衛" countValue={r.count ?? 0} />
            ))}
          </div>
        </>
      )
    }
    if (pageId === 'rugby') {
      return (
        <>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
            {t(lang, 'rule_rugby')}
          </span>
          <div className="flex flex-col gap-2">
            {rugbyRecords.map((r, i) => (
              <AthleteCard key={`${r.name}-${r.years}`} lang={lang} rank={i + 1} athlete={r} countLabel="W杯優勝" countValue={r.count ?? 0} />
            ))}
          </div>
        </>
      )
    }
    const s = sport!
    return (
      <>
        <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-100 text-sky-500 rounded-full mb-4">
          {lang === 'en' && s.ruleEn ? s.ruleEn : s.rule}
        </span>
        <div className="flex flex-col gap-2">
          {athletes.map((a, i) => (
            <AthleteCard
              key={`${a.name}-${a.years}`}
              lang={lang}
              rank={i + 1}
              athlete={a}
              countLabel={s.countLabel}
              countValue={s.countKey === 'mvpCount' ? (a.mvpCount ?? 0) : s.countKey === 'careerPoints' ? (a.careerPoints ?? 0) : (a.count ?? 0)}
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
        <h2 className="text-[0.65rem] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide m-0">{t(lang, 'marketRanking')}</h2>
      </div>
      <nav className="flex flex-col gap-0.5 px-2 sm:px-3 overflow-y-auto flex-1">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${sidebarItemClass(item.id)} flex-none py-2.5 px-4 text-[0.9rem] w-full`}
            onClick={() => handleSidebarItemClick(item.id)}
          >
            {item.type === 'market_ranking' ? (
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-base font-normal rounded" title={t(lang, 'listTitle')}>≡</span>
            ) : item.type === 'about' ? (
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-base font-normal rounded" title={t(lang, 'aboutIconTitle')}>ℹ</span>
            ) : (
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[0.7rem] font-semibold text-sky-500 bg-sky-100 rounded-full">
                {item.marketSize}
              </span>
            )}
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="font-medium">
                {lang === 'en' && item.labelEn ? item.labelEn : item.label}
                {item.labelFull && <span className="block text-[0.65rem] font-normal text-slate-500 mt-0.5">{item.labelFull}</span>}
              </span>
              {item.type !== 'market_ranking' && item.type !== 'about' && (
                <span className={`text-[0.7rem] font-normal opacity-90 ${item.id === pageId ? 'text-sky-500' : 'text-slate-500'}`}>
                  {t(lang, 'participation')} {formatPopulation(lang, item.populationNum)} · {t(lang, 'spectator')} {formatSpectator(lang, item.spectatorNum)} · {formatMarketSize(lang, item.marketSizeNum)}
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
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide m-0">{t(lang, 'menu')}</h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 -m-2 rounded-lg hover:bg-slate-100 text-slate-500"
            aria-label={t(lang, 'menuClose')}
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
            aria-label={t(lang, 'menuOpen')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 text-center sm:text-center min-w-0">
            <h1 className="text-xl sm:text-[1.75rem] font-bold text-slate-800 m-0 mb-1 tracking-tight">{t(lang, 'title')}</h1>
            <p className="text-sm sm:text-[0.95rem] text-slate-500 m-0">{t(lang, 'subtitle')}</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setLang('ja')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${lang === 'ja' ? 'bg-sky-100 text-sky-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              Ja
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${lang === 'en' ? 'bg-sky-100 text-sky-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              En
            </button>
          </div>
          <div className="sm:hidden w-4 shrink-0" aria-hidden="true" />
        </header>

        <div>{renderContent()}</div>
      </main>
    </div>
  )
}

export default App
