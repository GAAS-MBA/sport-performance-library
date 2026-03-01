"""
Biomechanics - 生体力学
身体運動の力学モデル
"""

from dataclasses import dataclass
from typing import List
import math


@dataclass
class KinematicChain:
    """
    運動学的連鎖
    複数セグメントの連鎖による運動伝達
    """

    segment_lengths: List[float]  # 各セグメントの長さ
    joint_angles: List[float]  # 各関節角度 (rad)

    def endpoint_position(self) -> tuple[float, float]:
        """連鎖の先端位置 (x, y)"""
        x, y = 0.0, 0.0
        angle_sum = 0.0

        for length, joint_angle in zip(self.segment_lengths, self.joint_angles):
            angle_sum += joint_angle
            x += length * math.cos(angle_sum)
            y += length * math.sin(angle_sum)

        return (x, y)

    def endpoint_velocity(
        self, angular_velocities: List[float]
    ) -> tuple[float, float]:
        """先端の線速度 (vx, vy)"""
        vx, vy = 0.0, 0.0
        angle_sum = 0.0

        for i, (length, av) in enumerate(
            zip(self.segment_lengths, angular_velocities)
        ):
            angle_sum += self.joint_angles[i] if i < len(self.joint_angles) else 0
            vx -= length * av * math.sin(angle_sum)
            vy += length * av * math.cos(angle_sum)

        return (vx, vy)


@dataclass
class JointTorque:
    """関節トルク"""

    torque: float  # N·m
    angular_velocity: float  # rad/s

    @property
    def power(self) -> float:
        """関節パワー P = τω"""
        return self.torque * self.angular_velocity


@dataclass
class PowerTransfer:
    """
    パワー伝達
    体の一部から他へのエネルギー伝達効率
    """

    input_power: float
    output_power: float

    @property
    def efficiency(self) -> float:
        """伝達効率 η = P_out / P_in"""
        if self.input_power == 0:
            return 0.0
        return self.output_power / self.input_power
