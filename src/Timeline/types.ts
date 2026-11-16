import type { BadgeTone } from '@dloizides/ui-layout';

export interface TimelineItem {
  id: string;
  at: Date | string | number;
  title: string;
  meta?: string;
  tone?: BadgeTone;
}

export interface TimelineDayGroup<T extends TimelineItem> {
  key: string;
  day: Date;
  items: T[];
}
