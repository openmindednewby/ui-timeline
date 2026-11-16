function isValid(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

/** The day in the viewer's locale, or '' for an invalid date. */
export function defaultFormatDay(date: Date): string {
  return isValid(date) ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
}

/** The time of day in the viewer's locale, or '' for an invalid date. */
export function defaultFormatTime(date: Date): string {
  return isValid(date) ? date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '';
}
