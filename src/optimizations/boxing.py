"""
Boxing Optimization - ボクシング個別最適化
"""

from dataclasses import dataclass
from typing import Optional
import math

from ..dynamics import Momentum, Force, KinematicChain, PowerTransfer


@dataclass
class PunchMetrics:
    """パンチの計測値"""

    velocity: float  # m/s
    mass: float = 0.5  # 拳+手袋 kg
    reaction_time: float = 0.0  # 反応時間 s

    @property
    def momentum(self) -> float:
        return Momentum(self.mass, self.velocity).linear

    @property
    def impact_force_estimate(self) -> float:
        """衝撃力の推定 (簡易: F ≈ mv/Δt, Δt=0.01s 接触時間想定)"""
        contact_time = 0.01
        return self.momentum / contact_time


class BoxingOptimizer:
    """
    ボクシングパフォーマンス最適化

    最適化対象:
    - パンチ速度・力の最大化
    - キネマティックチェーン効率
    - スタミナ配分
    - 反応時間
    """

    def __init__(
        self,
        arm_length: float = 0.7,  # m
        torso_rotation_factor: float = 1.2,
    ):
        self.arm_length = arm_length
        self.torso_rotation_factor = torso_rotation_factor

    def optimal_punch_velocity(
        self,
        shoulder_speed: float,
        elbow_speed: float,
        wrist_speed: float,
    ) -> float:
        """
        キネマティックチェーンから最適パンチ速度を計算
        肩→肘→手首の順で速度が加算される
        """
        chain = KinematicChain(
            segment_lengths=[0.3, 0.25, 0.2],  # 上腕, 前腕, 手
            joint_angles=[0, 0, 0],
        )
        # 線形近似: 末端速度 ≈ 各関節速度の加算
        return (
            shoulder_speed * self.torso_rotation_factor
            + elbow_speed
            + wrist_speed
        )

    def power_transfer_efficiency(
        self, leg_power: float, core_power: float, arm_power: float
    ) -> float:
        """脚→体幹→腕のパワー伝達効率"""
        total_input = leg_power + core_power
        transfer = PowerTransfer(input_power=total_input, output_power=arm_power)
        return transfer.efficiency

    def round_pacing(
        self, total_rounds: int, round_duration: float, max_output: float
    ) -> list[float]:
        """
        ラウンド間のパワー配分最適化
        後半にスタミナを残すペーシング
        """
        # 線形減衰モデル（後半ほど出力低下を許容）
        pacing = []
        for r in range(total_rounds):
            decay = 1.0 - 0.05 * r  # ラウンドごとに5%減衰を想定
            pacing.append(max_output * decay)
        return pacing
