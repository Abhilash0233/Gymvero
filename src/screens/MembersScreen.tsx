import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { useGymData } from '../context/GymDataContext';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';


type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Members'>,
  NativeStackScreenProps<RootStackParamList>
>;

const STATUS_COLOR = {
  active: colors.success,
  expired: colors.danger,
  paused: colors.warning,
} as const;

export function MembersScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { members, plans, refreshing, refresh } = useGymData();
  const [query, setQuery] = useState('');


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        (m.email ?? '').toLowerCase().includes(q),
    );
  }, [members, query]);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: spacing.lg + insets.top }]}>
        <Text style={styles.title}>Members</Text>
        <PrimaryButton
          label="Add"
          onPress={() => navigation.navigate('MemberForm')}
          style={styles.addBtn}
        />
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search name or phone"
        placeholderTextColor={colors.inkFaint}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={refresh}
        ListEmptyComponent={
          <EmptyState title="No members" subtitle="Add your first member to get started." />
        }
        renderItem={({ item }) => {
          const plan = plans.find(p => p.id === item.planId);
          return (
            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate('MemberDetail', { memberId: item.id })}
            >
              <View style={styles.rowMain}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>
                  {plan?.name ?? 'No plan'} · {item.phone}
                </Text>
              </View>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: `${STATUS_COLOR[item.status]}22` },
                ]}
              >
                <Text style={[styles.badgeText, { color: STATUS_COLOR[item.status] }]}>
                  {item.status}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  header: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: { ...typography.hero, color: colors.ink },
  addBtn: { minHeight: 40, paddingHorizontal: spacing.lg },
  search: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.ink,
  },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  row: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowMain: { flex: 1 },
  name: { ...typography.subtitle, color: colors.ink },
  meta: { ...typography.caption, color: colors.inkMuted, marginTop: 4 },
  badge: {
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: { ...typography.caption, textTransform: 'capitalize', fontWeight: '700' },
});
