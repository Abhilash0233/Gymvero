import React, { useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { useGymData } from '../context/GymDataContext';
import type { RootStackParamList } from '../navigation/types';
import { formatDate } from '../utils/format';
import { colors, radii, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'MemberDetail'>;

export function MemberDetailScreen({ navigation, route }: Props) {
  const { members, plans, removeMember, checkIn } = useGymData();
  const member = useMemo(
    () => members.find(m => m.id === route.params.memberId),
    [members, route.params.memberId],
  );
  const plan = plans.find(p => p.id === member?.planId);

  if (!member) {
    return (
      <Screen>
        <Text style={styles.missing}>Member not found.</Text>
        <PrimaryButton label="Back" onPress={() => navigation.goBack()} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.name}>{member.name}</Text>
      <Text style={styles.status}>{member.status}</Text>

      <View style={styles.card}>
        <Row label="Phone" value={member.phone} />
        {member.email ? <Row label="Email" value={member.email} /> : null}
        <Row label="Plan" value={plan?.name ?? '—'} />
        <Row label="Joined" value={formatDate(member.joinedAt)} />
        <Row label="Expires" value={formatDate(member.expiresAt)} />
        {member.notes ? <Row label="Notes" value={member.notes} /> : null}
      </View>

      <PrimaryButton
        label="Check in today"
        onPress={async () => {
          await checkIn(member.id);
          Alert.alert('Checked in', `${member.name} is checked in for today.`);
        }}
        style={styles.btn}
      />
      <PrimaryButton
        label="Edit member"
        variant="secondary"
        onPress={() => navigation.navigate('MemberForm', { memberId: member.id })}
        style={styles.btn}
      />
      <PrimaryButton
        label="Delete member"
        variant="danger"
        onPress={() => {
          Alert.alert('Delete member?', 'This removes the demo member locally.', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                await removeMember(member.id);
                navigation.goBack();
              },
            },
          ]);
        }}
        style={styles.btn}
      />
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: { ...typography.hero, color: colors.ink },
  status: {
    ...typography.label,
    color: colors.primary,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  row: { marginBottom: spacing.md },
  rowLabel: { ...typography.label, color: colors.inkFaint },
  rowValue: { ...typography.body, color: colors.ink, marginTop: 4 },
  btn: { marginBottom: spacing.sm },
  missing: { ...typography.body, color: colors.inkMuted, marginBottom: spacing.lg },
});
