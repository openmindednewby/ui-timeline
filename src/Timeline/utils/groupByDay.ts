import type { TimelineDayGroup, TimelineItem } from '../types';

const INVALID_DAY_KEY = 'invalid';
const PAD = 2;

function toTime(item: TimelineItem): number {
  return new Date(item.at).getTime();
}

function dayKey(time: number): string {
  if (Number.isNaN(time)) return INVALID_DAY_KEY;
  const date = new Date(time);
  const month = String(date.getMonth() + 1).padStart(PAD, '0');
  const day = String(date.getDate()).padStart(PAD, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function newestFirst(a: number, b: number): number {
  if (Number.isNaN(a)) return Number.isNaN(b) ? 0 : 1;
  if (Number.isNaN(b)) return -1;
  return b - a;
}

/** Items newest first; an item whose `at` does not parse goes last, never dropped. */
export function sortNewestFirst<T extends TimelineItem>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => newestFirst(toTime(a), toTime(b)));
}

/** Items grouped by local calendar day, days and items newest first. */
export function groupByDay<T extends TimelineItem>(items: readonly T[]): TimelineDayGroup<T>[] {
  const groups: TimelineDayGroup<T>[] = [];
  for (const item of sortNewestFirst(items)) {
    const time = toTime(item);
    const key = dayKey(time);
    const last = groups[groups.length - 1];
    if (last !== undefined && last.key === key) last.items.push(item);
    else groups.push({ key, day: new Date(time), items: [item] });
  }
  return groups;
}
