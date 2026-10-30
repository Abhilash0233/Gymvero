import React, { useMemo } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { useGymData } from '../context/GymDataContext';
import { formatDate, formatInr } from '../utils/format';
import { colors, radii, spacing, typography } from '../theme';


const STATUS_COLOR = {
  paid: colors.success,
  due: colors.warning,
  overdue: colors.danger,
} as const;

export function PaymentsScreen() {
  const insets = useSafeAreaInsets();
  const { payments, members, markPaymentPaid, refreshing, refresh, stats } =
    useGymData();


  const rows = useMemo(
    () =>
      payments.map(p => ({
        ...p,
        memberName: members.find(m => m.id === p.memberId)?.name ?? 'Member',
      })),
    [payments, members],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: spacing.lg + insets.top }]}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.sub}>
          Outstanding {formatInr(stats.duesOutstanding)}
        </Text>
      </View>
      <FlatList
        data={rows}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={refresh}
        ListEmptyComponent={<EmptyState title="No payments yet" />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowMain}>
              <Text style={styles.name}>{item.memberName}</Text>
              <Text style={styles.meta}>
                {item.note} · due {formatDate(item.dueAt)}
              </Text>
              <Text
                style={[styles.status, { color: STATUS_COLOR[item.status] }]}
              >
                {item.status.toUpperCase()} · {formatInr(item.amountInr)}
              </Text>
            </View>
            {item.status !== 'paid' ? (
              <PrimaryButton
                label="Mark paid"
                onPress={() => {
                  Alert.alert('Mark as paid?', undefined, [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Paid',
                      onPress: () => markPaymentPaid(item.id),
                    },
                  ]);
                }}
                style={styles.payBtn}
              />
            ) : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  header: { paddingHorizontal: spacing.lg },
  title: { ...typography.hero, color: colors.ink },
  sub: { ...typography.caption, color: colors.inkMuted, marginTop: 4 },
  list: { padding: spacing.lg },
  row: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  rowMain: { marginBottom: spacing.sm },
  name: { ...typography.subtitle, color: colors.ink },
  meta: { ...typography.caption, color: colors.inkMuted, marginTop: 4 },
  status: { ...typography.caption, fontWeight: '700', marginTop: spacing.sm },
  payBtn: { minHeight: 40, alignSelf: 'flex-start' },
});
