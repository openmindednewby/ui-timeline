import React from 'react';

import { StyleSheet, View } from 'react-native';

import { useUi } from '@dloizides/ui-feedback';
import { AppText, TextKind } from '@dloizides/ui-layout';

const DAY_COLUMN_WIDTH = 140;
const GAP = 16;
const PADDING = 12;

const styles = StyleSheet.create({
  day: { paddingTop: PADDING, width: DAY_COLUMN_WIDTH },
  entries: { flex: 1, minWidth: 0 },
  row: { borderTopWidth: 1, flexDirection: 'row', gap: GAP, paddingVertical: PADDING },
});

export interface DayGroupProps {
  label: string;
  children: React.ReactNode;
  testID?: string;
}

/** Molecule: one day of the wide layout, the day in a left column and its entries beside it. */
export const DayGroup = ({ label, children, testID }: DayGroupProps): React.ReactElement => {
  const { theme } = useUi();
  return (
    <View aria-label={label} role="group" style={[styles.row, { borderTopColor: theme.colors.border }]} testID={testID}>
      <View role="heading" style={styles.day}>
        <AppText kind={TextKind.Strong}>{label}</AppText>
      </View>
      <View style={styles.entries}>{children}</View>
    </View>
  );
};
