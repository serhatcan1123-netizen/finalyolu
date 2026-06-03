export interface GroupPrediction {
  groupId: string;
  teamOrder: string[]; // team slugs, 1st to 4th
}

export interface KnockoutPrediction {
  [matchId: string]: string; // matchId -> winner team slug
}

export interface TournamentPrediction {
  version: 2;
  timestamp: number;
  groups: GroupPrediction[];
  roundOf32: KnockoutPrediction;
  roundOf16: KnockoutPrediction;
  quarterFinals: KnockoutPrediction;
  semiFinals: KnockoutPrediction;
  thirdPlace: KnockoutPrediction;
  final: KnockoutPrediction;
  topScorer: string;
  goldenGlove: string;
  champion: string;
}

export interface PredictionScore {
  total: number;
  maxPossible: number;
  percentage: number;
  breakdown: {
    groupPositions: number;
    roundOf32: number;
    roundOf16: number;
    quarterFinals: number;
    semiFinals: number;
    thirdPlace: number;
    champion: number;
    topScorer: number;
    goldenGlove: number;
  };
}

export interface ActualResults {
  groups?: GroupPrediction[];
  roundOf32?: KnockoutPrediction;
  roundOf16?: KnockoutPrediction;
  quarterFinals?: KnockoutPrediction;
  semiFinals?: KnockoutPrediction;
  thirdPlace?: KnockoutPrediction;
  final?: KnockoutPrediction;
  topScorer?: string;
  goldenGlove?: string;
  champion?: string;
}

const MAX_SCORES = {
  groupPositions: 192, // 12 groups × 4 teams × 4 pts
  roundOf32: 160,       // 32 matches × 5 pts
  roundOf16: 96,        // 16 matches × 6 pts
  quarterFinals: 64,    // 8 matches × 8 pts
  semiFinals: 40,       // 4 matches × 10 pts
  thirdPlace: 15,
  champion: 25,
  topScorer: 15,
  goldenGlove: 10,
};

export const MAX_TOTAL = Object.values(MAX_SCORES).reduce((a, b) => a + b, 0); // 617

export function calculateScore(
  prediction: TournamentPrediction,
  actual: ActualResults
): PredictionScore {
  const breakdown = {
    groupPositions: 0,
    roundOf32: 0,
    roundOf16: 0,
    quarterFinals: 0,
    semiFinals: 0,
    thirdPlace: 0,
    champion: 0,
    topScorer: 0,
    goldenGlove: 0,
  };

  // Group stage scoring
  if (actual.groups) {
    for (const actualGroup of actual.groups) {
      const predictedGroup = prediction.groups.find(g => g.groupId === actualGroup.groupId);
      if (!predictedGroup) continue;
      for (let i = 0; i < 4; i++) {
        if (predictedGroup.teamOrder[i] === actualGroup.teamOrder[i]) {
          breakdown.groupPositions += 4; // exact position
        } else if (i < 2 && actualGroup.teamOrder.slice(0, 2).includes(predictedGroup.teamOrder[i])) {
          breakdown.groupPositions += 2; // correct qualified
        } else if (i === 3 && actualGroup.teamOrder[3] === predictedGroup.teamOrder[3]) {
          breakdown.groupPositions += 2; // correct eliminated
        }
      }
    }
  }

  // Knockout rounds
  const knockoutRounds: Array<{ pred: KnockoutPrediction; act: KnockoutPrediction | undefined; pts: number; key: keyof typeof breakdown }> = [
    { pred: prediction.roundOf32, act: actual.roundOf32, pts: 5, key: 'roundOf32' },
    { pred: prediction.roundOf16, act: actual.roundOf16, pts: 6, key: 'roundOf16' },
    { pred: prediction.quarterFinals, act: actual.quarterFinals, pts: 8, key: 'quarterFinals' },
    { pred: prediction.semiFinals, act: actual.semiFinals, pts: 10, key: 'semiFinals' },
    { pred: prediction.thirdPlace, act: actual.thirdPlace, pts: 15, key: 'thirdPlace' },
  ];

  for (const round of knockoutRounds) {
    if (!round.act) continue;
    for (const matchId of Object.keys(round.act)) {
      if (round.pred[matchId] && round.pred[matchId] === round.act[matchId]) {
        breakdown[round.key] += round.pts;
      }
    }
  }

  // Final / champion
  if (actual.champion && prediction.champion === actual.champion) {
    breakdown.champion += 25;
  }

  // Top scorer
  if (actual.topScorer && prediction.topScorer.toLowerCase() === actual.topScorer.toLowerCase()) {
    breakdown.topScorer = 15;
  }

  // Golden glove
  if (actual.goldenGlove && prediction.goldenGlove.toLowerCase() === actual.goldenGlove.toLowerCase()) {
    breakdown.goldenGlove = 10;
  }

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const percentage = Math.round((total / MAX_TOTAL) * 100);

  return { total, maxPossible: MAX_TOTAL, percentage, breakdown };
}

export function getEmptyPrediction(): TournamentPrediction {
  return {
    version: 2,
    timestamp: Date.now(),
    groups: [],
    roundOf32: {},
    roundOf16: {},
    quarterFinals: {},
    semiFinals: {},
    thirdPlace: {},
    final: {},
    topScorer: '',
    goldenGlove: '',
    champion: '',
  };
}
