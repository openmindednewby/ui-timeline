import React, { useCallback } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

import { useFocusRing } from '@dloizides/ui-buttons';
import { useUi } from '@dloizides/ui-feedback';

import { MIN_HIT_SIZE } from '../constants';
import type { TimelineItem } from '../types';

import { EntryBody } from './EntryBody';
import { RailDot } from './RailDot';

const RADIUS = 8;
const GAP = 12;
const PADDING_V = 8;
const PADDING_H = 8;

const styles = StyleSheet.create({
  body: { flex: 1, minWidth: 0, paddingVertical: PADDING_V },
  pressable: { borderRadius: RADIUS, cursor: 'pointer' },
  row: { flexDirection: 'row', gap: GAP, minHeight: MIN_HIT_SIZE, paddingHorizontal: PADDING_H },
});

type EntryState = PressableStateCallbackType & { hovered?: boolean };

export interface TimelineEntryProps<T extends TimelineItem> {
  item: T;
  timeLabel: string;
  rail: boolean;
  isLast: boolean;
  onOpen?: (item: T) => void;
  openHint?: string;
  renderItem?: (item: T) => React.ReactNode;
  testID: string;
}

/** Molecule: one entry, the rail dot when on the rail, its body, and a pressable row when it opens. */
export function TimelineEntry<T extends TimelineItem>({
  item, timeLabel, rail, isLast, onOpen, openHint, renderItem, testID,
}: TimelineEntryProps<T>): React.ReactElement {
  const { theme } = useUi();
  const { ringStyle, onFocus, onBlur } = useFocusRing(RADIUS);
  const handlePress = useCallback((): void => onOpen?.(item), [onOpen, item]);
  const pressStyle = useCallback(
    ({ pressed, hovered }: EntryState): StyleProp<ViewStyle> => [
      styles.pressable,
      pressed || hovered === true ? { backgroundColor: theme.colors.surfaceElevated } : null,
      ringStyle,
    ],
    [theme.colors.surfaceElevated, ringStyle],
  );
  const body = renderItem === undefined ? <EntryBody meta={item.meta} timeLabel={timeLabel} title={item.title} /> : renderItem(item);
  const content = (
    <View style={styles.row}>
      {rail ? <RailDot isLast={isLast} testID={`${testID}-dot`} tone={item.tone} /> : null}
      <View style={styles.body}>{body}</View>
    </View>
  );
  if (onOpen === undefined) return <View role="listitem" testID={testID}>{content}</View>;
  return (
    <View role="listitem">
      <Pressable
        accessibilityHint={openHint}
        accessibilityLabel={timeLabel === '' ? item.title : `${item.title}, ${timeLabel}`}
        accessibilityRole="button"
        onBlur={onBlur}
        onFocus={onFocus}
        onPress={handlePress}
        style={pressStyle}
        testID={testID}
      >
        {content}
      </Pressable>
    </View>
  );
}
