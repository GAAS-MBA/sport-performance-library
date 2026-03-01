"""
Soccer Optimization - サッカー個別最適化
"""

from dataclasses import dataclass
import math

from ..dynamics import ProjectileMotion, Momentum, Energy


@dataclass
class KickMetrics:
    """キックの計測値"""

    ball_speed: float  # km/h
    spin_rate: float = 0.0  # rpm
    contact_point: str = "instep"  # instep, inside, outside

    @property
    def ball_speed_ms(self) -> float:
        return self.ball_speed / 3.6


class SoccerOptimizer:
    """
    サッカーパフォーマンス最適化

    最適化対象:
    - シュート角度・速度
    - キック力学
    - 走行パターン・体力配分
    - ポジショニング
    """

    def __init__(
        self,
        goal_width: float = 7.32,  # m
        goal_depth: float = 1.0,
        penalty_spot: float = 11.0,
    ):
        self.goal_width = goal_width
        self.goal_depth = goal_depth
        self.penalty_spot = penalty_spot

    def optimal_shot_angle(
        self,
        distance: float,
        speed_kmh: float,
        goal_center_offset: float = 0.0,
    ) -> float:
        """
        ゴールを決める最適シュート角度 (rad)
        距離・速度・ゴール位置を考慮
        """
        v0 = speed_kmh / 3.6
        # 目標: ゴール中央から offset の位置
        target_y = goal_center_offset
        # tan(θ) = target_y / distance (簡易2Dモデル)
        return math.atan2(target_y, distance)

    def shot_trajectory(
        self, speed_kmh: float, angle_deg: float
    ) -> ProjectileMotion:
        """シュートの軌道モデル"""
        v0 = speed_kmh / 3.6
        angle = math.radians(angle_deg)
        return ProjectileMotion(v0=v0, angle=angle)

    def shot_success_probability(
        self,
        distance: float,
        angle_to_goal: float,
        defender_pressure: float = 0.0,
    ) -> float:
        """
        シュート成功率の簡易モデル
        distance: ゴールまでの距離 (m)
        angle_to_goal: ゴールを見る角度 (rad)
        defender_pressure: 0-1 の防御圧力
        """
        # 距離による減衰
        distance_factor = max(0, 1.0 - distance / 30)
        # 角度による係数（ゴールが大きく見えるほど有利）
        angle_factor = min(1.0, angle_to_goal / 0.5)
        # 防御圧力
        pressure_factor = 1.0 - defender_pressure * 0.5
        return distance_factor * angle_factor * pressure_factor

    def sprint_pacing(
        self,
        match_duration: float,
        sprint_count: int,
        max_sprint_speed: float,
    ) -> list[tuple[float, float]]:
        """
        試合中のスプリント配分
        返り値: [(時刻, 目標速度), ...]
        """
        # 均等配分の簡易モデル
        interval = match_duration / max(sprint_count, 1)
        return [
            (i * interval, max_sprint_speed * (1.0 - 0.02 * i))
            for i in range(sprint_count)
        ]
