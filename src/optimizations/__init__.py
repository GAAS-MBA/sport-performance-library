"""
Sport-Specific Optimizations
スポーツ別個別最適化
"""

from .boxing import BoxingOptimizer
from .boxing_champions import (
    get_champions,
    list_weight_classes,
    normalize_weight_class,
    CHAMPIONS_3PLUS_DEFENSES,
)
from .tennis import TennisOptimizer
from .tennis_best_practices import (
    get_top10 as get_tennis_top10,
    get_top10_composite,
    list_metrics as list_tennis_metrics,
)
from .soccer import SoccerOptimizer
from .basketball_top10 import get_top10 as get_basketball_top10, get_screening_logic as get_basketball_screening
from .baseball_top10 import get_top10 as get_baseball_top10, get_screening_logic as get_baseball_screening
from .golf_top10 import get_top10 as get_golf_top10, get_screening_logic as get_golf_screening
from .swimming_top10 import get_top10 as get_swimming_top10, get_screening_logic as get_swimming_screening
from .sprint_top10 import get_top10 as get_sprint_top10, get_screening_logic as get_sprint_screening
from .long_distance_top10 import get_top10 as get_long_distance_top10, get_screening_logic as get_long_distance_screening
from .volleyball_top10 import get_top10 as get_volleyball_top10, get_screening_logic as get_volleyball_screening
from .badminton_top10 import get_top10 as get_badminton_top10, get_screening_logic as get_badminton_screening
from .table_tennis_top10 import get_top10 as get_table_tennis_top10, get_screening_logic as get_table_tennis_screening
from .soccer_award_winners import (
    get_award_winners,
    get_top10_unique_players,
    list_awards,
    AWARD_WINNERS_3PLUS_CONSECUTIVE,
)

__all__ = [
    "BoxingOptimizer",
    "get_champions",
    "list_weight_classes",
    "normalize_weight_class",
    "CHAMPIONS_3PLUS_DEFENSES",
    "get_basketball_top10",
    "get_basketball_screening",
    "get_baseball_top10",
    "get_baseball_screening",
    "get_golf_top10",
    "get_golf_screening",
    "get_swimming_top10",
    "get_swimming_screening",
    "get_sprint_top10",
    "get_sprint_screening",
    "get_long_distance_top10",
    "get_long_distance_screening",
    "get_volleyball_top10",
    "get_volleyball_screening",
    "get_badminton_top10",
    "get_badminton_screening",
    "get_table_tennis_top10",
    "get_table_tennis_screening",
    "TennisOptimizer",
    "get_tennis_top10",
    "get_top10_composite",
    "list_tennis_metrics",
    "SoccerOptimizer",
    "get_award_winners",
    "get_top10_unique_players",
    "list_awards",
    "AWARD_WINNERS_3PLUS_CONSECUTIVE",
]
