import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { useGymData } from '../context/GymDataContext';
import type { MemberStatus } from '../data/types';
import type { RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'MemberForm'>;

const STATUSES: MemberStatus[] = ['active', 'paused', 'expired'];

export function MemberFormScreen({ navigation, route }: Props) {
  const memberId = route.params?.memberId;
  const { members, plans, addMember, updateMember } = useGymData();
  const existing = useMemo(
    () => members.find(m => m.id === memberId),
    [members, memberId],
  );

  const [name, setName] = useState(existing?.name ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [planId, setPlanId] = useState(existing?.planId ?? plans[0]?.id ?? '');
  const [status, setStatus] = useState<MemberStatus>(existing?.status ?? 'active');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    if (!name.trim() || !phone.trim() || !planId) {
      Alert.alert('Missing info', 'Name, phone, and plan are required.');
      return;
    }
    setSaving(true);
    try {
      const plan = plans.find(p => p.id === planId);
      const expires = new Date();
      expires.setDate(expires.getDate() + (plan?.durationDays ?? 30));
      if (existing) {
        await updateMember(existing.id, {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          planId,
          status,
          notes: notes.trim() || undefined,
        });
      } else {
        await addMember({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          planId,
          status,
          notes: notes.trim() || undefined,
          expiresAt: expires.toISOString(),
        });
      }
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>{existing ? 'Edit member' : 'Add member'}</Text>

      <Field label="Name" value={name} onChangeText={setName} />
      <Field
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Plan</Text>
      <View style={styles.chips}>
        {plans.map(p => (
          <Pressable
            key={p.id}
            onPress={() => setPlanId(p.id)}
            style={[styles.chip, planId === p.id && styles.chipOn]}
          >
            <Text style={[styles.chipText, planId === p.id && styles.chipTextOn]}>
              {p.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Status</Text>
      <View style={styles.chips}>
        {STATUSES.map(s => (
          <Pressable
            key={s}
            onPress={() => setStatus(s)}
            style={[styles.chip, status === s && styles.chipOn]}
          >
            <Text style={[styles.chipText, status === s && styles.chipTextOn]}>
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <Field label="Notes" value={notes} onChangeText={setNotes} multiline />

      <PrimaryButton
        label={existing ? 'Save changes' : 'Create member'}
        onPress={onSave}
        loading={saving}
        style={styles.save}
      />
    </Screen>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'default' | 'phone-pad' | 'email-address';
  autoCapitalize?: 'none' | 'sentences';
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        placeholderTextColor={colors.inkFaint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.hero, color: colors.ink, marginBottom: spacing.lg },
  field: { marginBottom: spacing.md },
  label: { ...typography.label, color: colors.inkMuted, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.ink,
  },
  multiline: { minHeight: 88, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  chip: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceRaised,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.caption, color: colors.ink, textTransform: 'capitalize' },
  chipTextOn: { color: colors.white, fontWeight: '700' },
  save: { marginTop: spacing.md },
});
