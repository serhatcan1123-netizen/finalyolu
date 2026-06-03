import type { TournamentPrediction } from './algorithm';
import { getEmptyPrediction } from './algorithm';

const STORAGE_KEY = 'dk2026_predictions';

export function loadPrediction(): TournamentPrediction {
  if (typeof window === 'undefined') return getEmptyPrediction();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getEmptyPrediction();
    const parsed = JSON.parse(raw);
    if (parsed.version !== 2) return getEmptyPrediction();
    return parsed;
  } catch {
    return getEmptyPrediction();
  }
}

export function savePrediction(prediction: TournamentPrediction): void {
  if (typeof window === 'undefined') return;
  const updated = { ...prediction, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function resetPrediction(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function hasPrediction(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(STORAGE_KEY);
}
