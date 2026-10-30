import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

type Props = {
  label: string;
  value: string;
  hint?: string;
  accent?: 'primary' | 'accent' | 'warning' | 'success';
};

export function StatCard({ label, value, hint, accent = 'primary' }: Props) {
  const soft =
    accent === 'accent'
      ? colors.accentSoft
      : accent === 'warning'
        ? colors.warningSoft
        : accent === 'success'
          ? colors.successSoft
          : colors.primarySoft;
  const ink =
    accent === 'accent'
      ? colors.accent
      : accent === 'warning'
        ? colors.warning
        : accent === 'success'
          ? colors.success
          : colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: soft }]}>
      <Text style={[styles.label, { color: ink }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.ink }]}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  value: {
    ...typography.monoStat,
  },
  hint: {
    ...typography.caption,
    color: colors.inkMuted,
    marginTop: spacing.xs,
  },
});
