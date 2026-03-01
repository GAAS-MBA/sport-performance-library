"""
Core Mechanics - 基本力学
運動学・力学の基本モデル
"""

from dataclasses import dataclass
from typing import Optional
import math


@dataclass
class Motion:
    """運動の状態量"""

    position: float
    velocity: float
    acceleration: float
    time: float = 0.0

    def displacement(self, dt: float) -> "Motion":
        """時間 dt 後の新しい運動状態"""
        new_velocity = self.velocity + self.acceleration * dt
        new_position = self.position + self.velocity * dt + 0.5 * self.acceleration * dt**2
        return Motion(
            position=new_position,
            velocity=new_velocity,
            acceleration=self.acceleration,
            time=self.time + dt,
        )


@dataclass
class Force:
    """力とその効果"""

    magnitude: float  # 大きさ (N)
    angle: float = 0.0  # 角度 (rad)

    @property
    def fx(self) -> float:
        return self.magnitude * math.cos(self.angle)

    @property
    def fy(self) -> float:
        return self.magnitude * math.sin(self.angle)

    def impulse(self, dt: float) -> float:
        """力積 = F * Δt"""
        return self.magnitude * dt


@dataclass
class Momentum:
    """運動量"""

    mass: float  # kg
    velocity: float  # m/s

    @property
    def linear(self) -> float:
        """線運動量 p = mv"""
        return self.mass * self.velocity

    @property
    def kinetic_energy(self) -> float:
        """運動エネルギー K = (1/2)mv²"""
        return 0.5 * self.mass * self.velocity**2


@dataclass
class Energy:
    """エネルギー計算"""

    mass: float
    velocity: float
    height: float = 0.0
    g: float = 9.81

    @property
    def kinetic(self) -> float:
        """運動エネルギー"""
        return 0.5 * self.mass * self.velocity**2

    @property
    def potential(self) -> float:
        """位置エネルギー"""
        return self.mass * self.g * self.height

    @property
    def total_mechanical(self) -> float:
        """力学的エネルギー保存"""
        return self.kinetic + self.potential


@dataclass
class ProjectileMotion:
    """放物運動（ボール、パンチ、キック等）"""

    v0: float  # 初速度 (m/s)
    angle: float  # 射出角 (rad)
    g: float = 9.81

    @property
    def v0x(self) -> float:
        return self.v0 * math.cos(self.angle)

    @property
    def v0y(self) -> float:
        return self.v0 * math.sin(self.angle)

    def max_height(self) -> float:
        """最高点の高さ"""
        return (self.v0y**2) / (2 * self.g)

    def flight_time(self) -> float:
        """滞空時間"""
        return 2 * self.v0y / self.g

    def range(self) -> float:
        """水平到達距離"""
        return (self.v0**2 * math.sin(2 * self.angle)) / self.g

    def position_at(self, t: float) -> tuple[float, float]:
        """時刻 t での (x, y) 座標"""
        x = self.v0x * t
        y = self.v0y * t - 0.5 * self.g * t**2
        return (x, y)
