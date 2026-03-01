# sport-performance-hacking

スポーツパフォーマンスの動力学モデルと個別最適化ライブラリ。

## TypeScript アプリ（ライトカラーパターン）

`app/` に React + TypeScript + Vite の Web アプリがあります。各スポーツの Top 10 をブラウザで閲覧できます。

```bash
cd app && npm install && npm run dev
```

## 構成

### General Dynamics and Mechanism（一般的な動力学とメカニズム）

`src/dynamics/` - スポーツ共通の物理・力学基盤

- **mechanics.py**: 運動学・力学（Motion, Force, Momentum, Energy, ProjectileMotion）
- **biomechanics.py**: 生体力学（KinematicChain, JointTorque, PowerTransfer）

### 個別最適化（Sport-Specific Optimizations）

`src/optimizations/` - スポーツ別最適化モジュール

| スポーツ | モジュール | 主な最適化対象 |
|---------|-----------|---------------|
| **Boxing** | `boxing.py` | パンチ速度・力、キネマティックチェーン、スタミナ配分 |
| **Boxing Champions** | `boxing_champions.py` | 階級別・3回以上防衛した歴代チャンピオン（再現可能な入出力） |
| **Tennis** | `tennis.py` | サーブ角度・速度、ボール軌道、スイング力学 |
| **Tennis Best Practices** | `tennis_best_practices.py` | コンピューティングベストプラクティス Top 10（出身言語名付き） |
| **Soccer** | `soccer.py` | シュート角度、キック力学、スプリント配分 |
| **Soccer Award Winners** | `soccer_award_winners.py` | 著名な賞を3回以上連続獲得した選手（出身言語名付き） |
| **Basketball Top 10** | `basketball_top10.py` | NBA MVP 2回以上獲得（スクリーニングロジック規定） |
| **Baseball Top 10** | `baseball_top10.py` | MLB MVP / Cy Young 3回以上獲得（スクリーニングロジック規定） |
| **Golf Top 10** | `golf_top10.py` | メジャー3回以上 / PGA年間最優秀2回以上（スクリーニングロジック規定） |
| **Swimming Top 10** | `swimming_top10.py` | オリンピック金メダル3個以上（スクリーニングロジック規定） |
| **Sprint Top 10** | `sprint_top10.py` | 100m/200m/4x100m 金メダル3個以上（スクリーニングロジック規定） |
| **Long Distance Top 10** | `long_distance_top10.py` | 5000m/10000m/マラソン 金メダル3個以上（スクリーニングロジック規定） |
| **Volleyball Top 10** | `volleyball_top10.py` | 室内＋ビーチ 金メダル3個以上（スクリーニングロジック規定） |
| **Badminton Top 10** | `badminton_top10.py` | 金メダル2個以上（スクリーニングロジック規定） |
| **Table Tennis Top 10** | `table_tennis_top10.py` | 金メダル3個以上（スクリーニングロジック規定） |

## 使用例

```python
from src.dynamics import ProjectileMotion, Momentum
from src.optimizations import BoxingOptimizer, TennisOptimizer, SoccerOptimizer

# 放物運動
motion = ProjectileMotion(v0=25, angle=0.5)
print(motion.range(), motion.max_height())

# ボクシング最適化
boxing = BoxingOptimizer()
velocity = boxing.optimal_punch_velocity(5.0, 8.0, 12.0)

# 階級別・3回以上防衛した歴代チャンピオン（再現可能な入出力）
from src.optimizations import get_champions
heavyweights = get_champions("heavyweight")  # INPUT: 階級名
middleweights_10plus = get_champions("middleweight", min_defenses=10)

# テニス最適化
tennis = TennisOptimizer()
angle = tennis.optimal_serve_angle(200, target_depth=12)

# テニス・コンピューティングベストプラクティス Top 10
from src.optimizations import get_tennis_top10
top10 = get_tennis_top10("composite")  # 総合
consecutive = get_tennis_top10("consecutive_weeks_no1")  # 世界1位連続週数

# サッカー最適化
soccer = SoccerOptimizer()
prob = soccer.shot_success_probability(15, 0.3, defender_pressure=0.2)

# 著名な賞を3回以上連続獲得した選手（出身言語名付き）
from src.optimizations import get_top10_unique_players, get_award_winners

# バスケットボール Top 10（スクリーニング: NBA MVP 2回以上）
from src.optimizations import get_basketball_top10, get_basketball_screening
basketball_top10 = get_basketball_top10()

# ベースボール Top 10（スクリーニング: MVP/Cy Young 3回以上）
from src.optimizations import get_baseball_top10, get_baseball_screening
mvp_top10 = get_baseball_top10("mvp")
cy_young_top10 = get_baseball_top10("cy_young")

# ゴルフ Top 10（スクリーニング: メジャー3回以上 / PGA年間最優秀2回以上）
from src.optimizations import get_golf_top10, get_golf_screening
majors_top10 = get_golf_top10("majors")
pga_poy_top10 = get_golf_top10("pga_player_of_year")

# 水泳 Top 10（スクリーニング: オリンピック金メダル3個以上）
from src.optimizations import get_swimming_top10, get_swimming_screening
swimming_top10 = get_swimming_top10()
swimming_women = get_swimming_top10(gender="F")

# 短距離走 Top 10（スクリーニング: 100m/200m/4x100m 金メダル3個以上）
from src.optimizations import get_sprint_top10, get_sprint_screening
sprint_top10 = get_sprint_top10()

# 長距離走 Top 10（スクリーニング: 5000m/10000m/マラソン 金メダル3個以上）
from src.optimizations import get_long_distance_top10, get_long_distance_screening
long_distance_top10 = get_long_distance_top10()
long_distance_women = get_long_distance_top10(gender="F")

# バレーボール Top 10（スクリーニング: 室内＋ビーチ 金メダル3個以上）
from src.optimizations import get_volleyball_top10, get_volleyball_screening
volleyball_top10 = get_volleyball_top10()
volleyball_indoor = get_volleyball_top10(discipline="indoor")

# バドミントン Top 10（スクリーニング: 金メダル2個以上）
from src.optimizations import get_badminton_top10, get_badminton_screening
badminton_top10 = get_badminton_top10()
badminton_singles = get_badminton_top10(discipline="singles")

# 卓球 Top 10（スクリーニング: 金メダル3個以上）
from src.optimizations import get_table_tennis_top10, get_table_tennis_screening
table_tennis_top10 = get_table_tennis_top10()
table_tennis_women = get_table_tennis_top10(gender="F")

top10 = get_top10_unique_players()  # 歴代Top10
ballon_dor = get_award_winners("ballon_dor")  # バロンドール3回以上連続
```