import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { useGymData } from '../context/GymDataContext';
import { formatTime } from '../utils/format';
import { colors, radii, spacing, typography } from '../theme';

export function AttendanceScreen() {
  const insets = useSafeAreaInsets();
  const { attendanceToday, members, checkIn, refreshing, refresh } = useGymData();
  const [pickerOpen, setPickerOpen] = useState(false);

  const rows = useMemo(
    () =>
      attendanceToday.map(a => ({
        ...a,
        name: members.find(m => m.id === a.memberId)?.name ?? 'Member',
      })),
    [attendanceToday, members],
  );

  const checkedIds = new Set(attendanceToday.map(a => a.memberId));
  const candidates = members.filter(
    m => m.status === 'active' && !checkedIds.has(m.id),
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: spacing.lg + insets.top }]}>
        <View>
          <Text style={styles.title}>Attendance</Text>
          <Text style={styles.sub}>{rows.length} check-ins today</Text>
        </View>
        <PrimaryButton
          label="Check in"
          onPress={() => setPickerOpen(true)}
          style={styles.btn}
        />
      </View>
      <FlatList
        data={rows}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={refresh}
        ListEmptyComponent={
          <EmptyState
            title="No check-ins yet"
            subtitle="Tap Check in to record a visit."
          />
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{formatTime(item.checkedInAt)}</Text>
          </View>
        )}
      />

      <Modal visible={pickerOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select member</Text>
            {candidates.length === 0 ? (
              <Text style={styles.modalEmpty}>
                All active members are already checked in.
              </Text>
            ) : (
              candidates.map(m => (
                <Pressable
                  key={m.id}
                  style={styles.modalRow}
                  onPress={async () => {
                    await checkIn(m.id);
                    setPickerOpen(false);
                  }}
                >
                  <Text style={styles.name}>{m.name}</Text>
                  <Text style={styles.time}>{m.phone}</Text>
                </Pressable>
              ))
            )}
            <PrimaryButton
              label="Close"
              variant="secondary"
              onPress={() => setPickerOpen(false)}
              style={{ marginTop: spacing.md }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  header: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: { ...typography.hero, color: colors.ink },
  sub: { ...typography.caption, color: colors.inkMuted, marginTop: 4 },
  btn: { minHeight: 40, paddingHorizontal: spacing.lg },
  list: { padding: spacing.lg },
  row: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { ...typography.subtitle, color: colors.ink },
  time: { ...typography.caption, color: colors.inkMuted },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.surfaceRaised,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.xl,
    maxHeight: '70%',
  },
  modalTitle: { ...typography.title, color: colors.ink, marginBottom: spacing.md },
  modalEmpty: { ...typography.body, color: colors.inkMuted },
  modalRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
});
