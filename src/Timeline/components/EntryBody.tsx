import React from 'react';

import { StyleSheet, View } from 'react-native';

import { AppText, TextKind } from '@dloizides/ui-layout';

const GAP = 2;

const styles = StyleSheet.create({
  body: { flexShrink: 1, gap: GAP },
});

export interface EntryBodyProps {
  title: string;
  timeLabel: string;
  meta?: string;
}

/** Molecule: the default entry text, a time line, the title and the optional meta. */
export const EntryBody = ({ title, timeLabel, meta }: EntryBodyProps): React.ReactElement => (
  <View style={styles.body}>
    {timeLabel === '' ? null : <AppText kind={TextKind.Small}>{timeLabel}</AppText>}
    <AppText kind={TextKind.Strong}>{title}</AppText>
    {meta === undefined || meta === '' ? null : <AppText kind={TextKind.Muted}>{meta}</AppText>}
  </View>
);
