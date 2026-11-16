import React from 'react';

import { StyleSheet, View } from 'react-native';

import { useUi } from '@dloizides/ui-feedback';
import { resolveToneColors } from '@dloizides/ui-layout';
import type { BadgeTone } from '@dloizides/ui-layout';

const DOT_SIZE = 12;
const LINE_WIDTH = 2;
const COLUMN_WIDTH = 20;
const DOT_TOP = 16;

const styles = StyleSheet.create({
  column: { alignItems: 'center', width: COLUMN_WIDTH },
  dot: { borderRadius: DOT_SIZE / 2, borderWidth: LINE_WIDTH, height: DOT_SIZE, marginTop: DOT_TOP, width: DOT_SIZE },
  line: { flex: 1, width: LINE_WIDTH },
});

export interface RailDotProps {
  tone?: BadgeTone;
  isLast: boolean;
  testID?: string;
}

/** Atom: the rail beside one entry, a dot in the entry's tone and the line down to the next entry. */
export const RailDot = ({ tone, isLast, testID }: RailDotProps): React.ReactElement => {
  const { theme } = useUi();
  const fill = tone === undefined ? theme.colors.surface : resolveToneColors(theme, tone).backgroundColor;
  return (
    <View aria-hidden style={styles.column} testID={testID}>
      <View style={[styles.dot, { backgroundColor: fill, borderColor: theme.colors.border }]} testID={testID === undefined ? undefined : `${testID}-fill`} />
      {isLast ? null : <View style={[styles.line, { backgroundColor: theme.colors.border }]} />}
    </View>
  );
};
