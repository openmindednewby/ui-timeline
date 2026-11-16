import React, { useMemo } from 'react';

import { View, useWindowDimensions } from 'react-native';

import { TIMELINE_BREAKPOINT, TIMELINE_TEST_ID } from './constants';
import { DayGroup } from './components/DayGroup';
import { TimelineEntry } from './components/TimelineEntry';
import { TimelineLayout } from './TimelineLayout';
import type { TimelineItem } from './types';
import { defaultFormatDay, defaultFormatTime } from './utils/defaultFormats';
import { groupByDay, sortNewestFirst } from './utils/groupByDay';
import { resolveTimelineLayout } from './utils/resolveTimelineLayout';

export interface TimelineProps<T extends TimelineItem> {
  items: readonly T[];
  accessibilityLabel: string;
  onOpenItem?: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
  layout?: TimelineLayout;
  breakpoint?: number;
  formatDay?: (date: Date) => string;
  formatTime?: (date: Date) => string;
  openItemHint?: string;
  empty?: React.ReactNode;
  testID?: string;
}

function joinLabel(day: string, time: string): string {
  return [day, time].filter((part) => part !== '').join(' ');
}

/** Organism: entries by time, a rail with dots below `breakpoint`, grouped by day from it; all text comes from props. */
export function Timeline<T extends TimelineItem>({
  items, accessibilityLabel, onOpenItem, renderItem, layout = TimelineLayout.Auto, breakpoint = TIMELINE_BREAKPOINT,
  formatDay = defaultFormatDay, formatTime = defaultFormatTime, openItemHint, empty = null, testID = TIMELINE_TEST_ID,
}: TimelineProps<T>): React.ReactElement {
  const { width } = useWindowDimensions();
  const resolved = resolveTimelineLayout(layout, width, breakpoint);
  const sorted = useMemo(() => sortNewestFirst(items), [items]);
  const groups = useMemo(() => groupByDay(items), [items]);
  if (items.length === 0) return <View testID={`${testID}-empty`}>{empty}</View>;
  const entry = (item: T, timeLabel: string, rail: boolean, isLast: boolean): React.ReactElement => (
    <TimelineEntry
      isLast={isLast} item={item} key={item.id} onOpen={onOpenItem} openHint={openItemHint}
      rail={rail} renderItem={renderItem} testID={`${testID}-item-${item.id}`} timeLabel={timeLabel}
    />
  );
  if (resolved === TimelineLayout.Rail) {
    return (
      <View accessibilityLabel={accessibilityLabel} role="list" testID={testID}>
        {sorted.map((item, index) => {
          const date = new Date(item.at);
          return entry(item, joinLabel(formatDay(date), formatTime(date)), true, index === sorted.length - 1);
        })}
      </View>
    );
  }
  return (
    <View accessibilityLabel={accessibilityLabel} testID={testID}>
      {groups.map((group) => (
        <DayGroup key={group.key} label={formatDay(group.day)} testID={`${testID}-day-${group.key}`}>
          <View role="list">{group.items.map((item) => entry(item, formatTime(new Date(item.at)), false, false))}</View>
        </DayGroup>
      ))}
    </View>
  );
}
