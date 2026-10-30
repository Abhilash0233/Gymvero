import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { StatCard } from '../components/StatCard';
import { useGymData } from '../context/GymDataContext';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { SAAS_CATALOG } from '../data/types';
import { daysUntil, formatInr } from '../utils/format';
import { colors, radii, spacing, typography } from '../theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function DashboardScreen({ navigation }: Props) {
  const { gym, stats, subscription, attendanceToday, members, refreshing, refresh } =
    useGymData();

  const recent = attendanceToday.slice(0, 4).map(a => {
    const member = members.find(m => m.id === a.memberId);
    return { ...a, name: member?.name ?? 'Member' };
  });

  return (
    <Screen safeTop refreshing={refreshing} onRefresh={refresh}>
      <Text style={styles.kicker}>{gym?.name ?? 'Your gym'}</Text>
      <Text style={styles.title}>Today</Text>

      <View style={styles.grid}>
        <StatCard
          label="Members"
          value={String(stats.totalMembers)}
          hint={`${stats.activeMembers} active`}
        />
        <StatCard
          label="Check-ins"
          value={String(stats.checkInsToday)}
          hint="Today"
          accent="success"
        />
        <StatCard
          label="Dues"
          value={formatInr(stats.duesOutstanding)}
          hint={
            stats.overdueCount
              ? `${stats.overdueCount} overdue`
              : 'Outstanding'
          }
          accent="warning"
        />
        <StatCard
          label="Plans"
          value={String(stats.planCount)}
          hint="Membership plans"
          accent="accent"
        />
      </View>

      {subscription ? (
        <Pressable
          style={styles.subCard}
          onPress={() => navigation.navigate('GymveroPlan')}
        >
          <Text style={styles.subLabel}>Gymvero plan</Text>
          <Text style={styles.subTitle}>
            {SAAS_CATALOG[subscription.planId].label} · {subscription.status}
          </Text>
          <Text style={styles.subHint}>
            Renews in {daysUntil(subscription.renewsAt)} days ·{' '}
            {formatInr(subscription.priceInr)}
          </Text>
        </Pressable>
      ) : null}

      <Text style={styles.section}>Recent check-ins</Text>
      <View style={styles.list}>
        {recent.length === 0 ? (
          <Text style={styles.empty}>No check-ins yet today.</Text>
        ) : (
          recent.map(item => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.rowMeta}>
                {new Date(item.checkedInAt).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: {
    ...typography.label,
    color: colors.primary,
  },
  title: {
    ...typography.hero,
    color: colors.ink,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  subCard: {
    backgroundColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  subLabel: {
    ...typography.label,
    color: colors.primarySoft,
  },
  subTitle: {
    ...typography.subtitle,
    color: colors.white,
    marginTop: spacing.sm,
  },
  subHint: {
    ...typography.caption,
    color: colors.inkFaint,
    marginTop: spacing.xs,
  },
  section: {
    ...typography.subtitle,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  list: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: {
    ...typography.body,
    color: colors.ink,
    fontWeight: '600',
  },
  rowMeta: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  empty: {
    ...typography.body,
    color: colors.inkMuted,
    padding: spacing.lg,
  },
});
