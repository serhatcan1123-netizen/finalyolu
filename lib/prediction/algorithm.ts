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
  groupPositions: 1200,  // 12 grup × 100
  roundOf32: 4800,       // 32 takım × 150
  roundOf16: 4000,       // 16 takım × 250
  quarterFinals: 3200,   // 8 takım × 400
  semiFinals: 2000,      // 4 takım × 500
  thirdPlace: 600,
  champion: 600,
  topScorer: 200,
  goldenGlove: 200,
  scoreBonus: 3200,      // son32:16×75 + son16:8×100 + çeyrek:4×150 + yarı:2×150 + 3lük:150 + final:150
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
      // Tam sıralama doğruysa 100, ilk ikisi doğru geri kalan yanlışsa 50
      const actualTop2 = actualGroup.teamOrder.slice(0, 2);
      const predictedTop2 = predictedGroup.teamOrder.slice(0, 2);
      const exactMatch = predictedGroup.teamOrder.slice(0, 4).every((t, i) => t === actualGroup.teamOrder[i]);
      if (exactMatch) {
        breakdown.groupPositions += 100;
      } else if (
        actualTop2.includes(predictedTop2[0]) &&
        actualTop2.includes(predictedTop2[1])
      ) {
        breakdown.groupPositions += 50;
      }
    }
  }

  const knockoutRounds: Array<{ pred: KnockoutPrediction; act: KnockoutPrediction | undefined; pts: number; key: keyof typeof breakdown }> = [
    { pred: prediction.roundOf32, act: actual.roundOf32, pts: 150, key: 'roundOf32' },
    { pred: prediction.roundOf16, act: actual.roundOf16, pts: 250, key: 'roundOf16' },
    { pred: prediction.quarterFinals, act: actual.quarterFinals, pts: 400, key: 'quarterFinals' },
    { pred: prediction.semiFinals, act: actual.semiFinals, pts: 500, key: 'semiFinals' },
    { pred: prediction.thirdPlace, act: actual.thirdPlace, pts: 600, key: 'thirdPlace' },
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
    breakdown.champion += 600;
  }

  if (actual.topScorer && prediction.topScorer.toLowerCase() === actual.topScorer.toLowerCase()) {
    breakdown.topScorer = 200;
  }

  if (actual.goldenGlove && prediction.goldenGlove.toLowerCase() === actual.goldenGlove.toLowerCase()) {
    breakdown.goldenGlove = 200;
  }

  if (actual.knockoutScores && prediction.knockoutScores) {
    const scoreBonusByRound: Record<string, number> = {};
    if (actual.roundOf32) Object.keys(actual.roundOf32).forEach(id => scoreBonusByRound[id] = 75);
    if (actual.roundOf16) Object.keys(actual.roundOf16).forEach(id => scoreBonusByRound[id] = 100);
    if (actual.quarterFinals) Object.keys(actual.quarterFinals).forEach(id => scoreBonusByRound[id] = 150);
    if (actual.semiFinals) Object.keys(actual.semiFinals).forEach(id => scoreBonusByRound[id] = 150);
    if (actual.thirdPlace) Object.keys(actual.thirdPlace).forEach(id => scoreBonusByRound[id] = 150);
    if (actual.final) Object.keys(actual.final).forEach(id => scoreBonusByRound[id] = 150);

    for (const matchId of Object.keys(actual.knockoutScores)) {
      const a = actual.knockoutScores[matchId];
      const p = prediction.knockoutScores?.[matchId];
      if (p && a.home === p.home && a.away === p.away) {
        breakdown.scoreBonus += scoreBonusByRound[matchId] ?? 50;
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
