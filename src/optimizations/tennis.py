"""
Tennis Optimization - テニス個別最適化
"""

from dataclasses import dataclass
import math

from ..dynamics import ProjectileMotion, Momentum, KinematicChain


@dataclass
class ServeMetrics:
    """サーブの計測値"""

    ball_speed: float  # km/h
    spin_rate: float = 0.0  # rpm
    net_clearance: float = 0.0  # m

    @property
    def ball_speed_ms(self) -> float:
        return self.ball_speed / 3.6


class TennisOptimizer:
    """
    テニスパフォーマンス最適化

    最適化対象:
    - サーブ速度・角度
    - ボール軌道
    - スイング力学
    - コートカバレッジ
    """

    def __init__(
        self,
        court_length: float = 23.77,  # m
        net_height: float = 0.914,
        service_line: float = 6.40,
    ):
        self.court_length = court_length
        self.net_height = net_height
        self.service_line = service_line

    def optimal_serve_angle(
        self, speed_kmh: float, target_depth: float = 12.0
    ) -> float:
        """
        指定速度・深さでの最適サーブ角度 (rad)
        ネットを越えつつサービスライン内に収める
        """
        v0 = speed_kmh / 3.6
        # 放物運動: 水平距離 = v²sin(2θ)/g
        # sin(2θ) = range * g / v²
        sin_2theta = (target_depth * 9.81) / (v0**2)
        sin_2theta = max(-1, min(1, sin_2theta))
        return math.asin(sin_2theta) / 2

    def serve_trajectory(
        self, speed_kmh: float, angle_deg: float
    ) -> ProjectileMotion:
        """サーブの軌道モデル"""
        v0 = speed_kmh / 3.6
        angle = math.radians(angle_deg)
        return ProjectileMotion(v0=v0, angle=angle)

    def optimal_contact_height(
        self, ball_speed_ms: float, desired_angle_deg: float
    ) -> float:
        """
        最適な打点の高さ（ネットクリアランス考慮）
        """
        angle = math.radians(desired_angle_deg)
        motion = ProjectileMotion(v0=ball_speed_ms, angle=angle)
        # ネット位置(11.89m)での高さ
        t_net = 11.89 / (ball_speed_ms * math.cos(angle))
        _, y_net = motion.position_at(t_net)
        return y_net + self.net_height  # ネット高さ + クリアランス

    def swing_kinematic_chain(
        self,
        shoulder_angular_v: float,
        elbow_angular_v: float,
        wrist_angular_v: float,
    ) -> float:
        """スイングのキネマティックチェーンによるラケットヘッド速度"""
        # 各セグメント長と角速度の積で線速度加算
        upper_arm = 0.32
        forearm = 0.26
        hand = 0.08
        return (
            upper_arm * shoulder_angular_v
            + forearm * elbow_angular_v
            + hand * wrist_angular_v
        )
