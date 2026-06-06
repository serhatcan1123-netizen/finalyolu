// timeET alanı artık direkt TSİ saati olarak saklanıyor.
// toTSI ve toTSIDate fonksiyonları bu değerleri olduğu gibi döner.

export function toTSI(timeTSI: string): string {
  return timeTSI;
}

export function tsiDayOffset(_timeET: string): number {
  return 0;
}

export function toTSIDate(dateTSI: string, _timeET: string): string {
  return dateTSI;
}
