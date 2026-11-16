import { TimelineLayout } from '../TimelineLayout';

/** The layout to draw: the asked one, or for Auto the day groups from `breakpoint` up and the rail below it. */
export function resolveTimelineLayout(layout: TimelineLayout, width: number, breakpoint: number): TimelineLayout.Rail | TimelineLayout.Day {
  if (layout === TimelineLayout.Rail) return TimelineLayout.Rail;
  if (layout === TimelineLayout.Day) return TimelineLayout.Day;
  return width >= breakpoint ? TimelineLayout.Day : TimelineLayout.Rail;
}
