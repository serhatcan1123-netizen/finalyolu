// EDT (UTC-4) → TRT / TSİ (UTC+3) = +7 hours
// Turkey does not observe DST — TRT is UTC+3 year-round.
const TSI_OFFSET = 7;

/** Convert an ET time string (HH:MM) to TSİ (HH:MM). */
export function toTSI(timeET: string): string {
  const [h, m] = timeET.split(':').map(Number);
  const tsi = (h + TSI_OFFSET) % 24;
  return `${String(tsi).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Returns 1 if the TSİ time overflows to the next calendar day, 0 otherwise.
 * E.g. 18:00 ET → 01:00 TSİ (next day) → returns 1
 *      13:00 ET → 20:00 TSİ (same day) → returns 0
 */
export function tsiDayOffset(timeET: string): number {
  const [h] = timeET.split(':').map(Number);
  return h + TSI_OFFSET >= 24 ? 1 : 0;
}

/**
 * Returns the display date string (YYYY-MM-DD) adjusted for TSİ overflow.
 * Use this instead of match.date when showing the TSİ viewing date to Turkish fans.
 */
export function toTSIDate(dateET: string, timeET: string): string {
  const offset = tsiDayOffset(timeET);
  if (offset === 0) return dateET;
  // Advance date by 1 day
  const d = new Date(dateET + 'T12:00:00Z'); // noon UTC avoids any DST edge cases
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
