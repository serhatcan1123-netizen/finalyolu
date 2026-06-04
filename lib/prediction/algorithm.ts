export interface GroupPrediction {
  groupId: string;
  teamOrder: string[];
}

export interface KnockoutPrediction {
  [matchId: string]: string;
}

export interface MatchScore {
  home: number;
  away: number;
}

export interface KnockoutScores {
  [matchId: string]: MatchScore;
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
  knockoutScores: KnockoutScores;
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
    scoreBonus: number;
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
  knockoutScores?: KnockoutScores;
  topScorer?: string;
  goldenGlove?: string;
  champion?: string;
}

const MAX_SCORES = {
  groupPositions: 192,
  roundOf32: 160,
  roundOf16: 96,
  quarterFinals: 64,
  semiFinals: 40,
  thirdPlace: 15,
  champion: 25,
  topScorer: 15,
  goldenGlove: 10,
  scoreBonus: 180,
};

export const MAX_TOTAL = Object.values(MAX_SCORES).reduce((a, b) => a + b, 0);

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
    scoreBonus: 0,
  };

  if (actual.groups) {
    for (const actualGroup of actual.groups) {
      const predictedGroup = prediction.groups.find(g => g.groupId === actualGroup.groupId);
      if (!predictedGroup) continue;
      for (let i = 0; i < 4; i++) {
        if (predictedGroup.teamOrder[i] === actualGroup.teamOrder[i]) {
          breakdown.groupPositions += 4;
        } else if (i < 2 && actualGroup.teamOrder.slice(0, 2).includes(predictedGroup.teamOrder[i])) {
          breakdown.groupPositions += 2;
        } else if (i === 3 && actualGroup.teamOrder[3] === predictedGroup.teamOrder[3]) {
          breakdown.groupPositions += 2;
        }
      }
    }
  }

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

  if (actual.champion && prediction.champion === actual.champion) {
    breakdown.champion += 25;
  }

  if (actual.topScorer && prediction.topScorer.toLowerCase() === actual.topScorer.toLowerCase()) {
    breakdown.topScorer = 15;
  }

  if (actual.goldenGlove && prediction.goldenGlove.toLowerCase() === actual.goldenGlove.toLowerCase()) {
    breakdown.goldenGlove = 10;
  }

  if (actual.knockoutScores && prediction.knockoutScores) {
    for (const matchId of Object.keys(actual.knockoutScores)) {
      const a = actual.knockoutScores[matchId];
      const p = prediction.knockoutScores?.[matchId];
      if (p && a.home === p.home && a.away === p.away) {
        breakdown.scoreBonus += 3;
      }
    }
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
    knockoutScores: {},
    topScorer: '',
    goldenGlove: '',
    champion: '',
  };
}
