import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { useGymData } from '../context/GymDataContext';
import { formatInr } from '../utils/format';
import { colors, radii, spacing, typography } from '../theme';

export function MembershipPlansScreen() {
  const { plans, upsertPlan } = useGymData();
  const [name, setName] = useState('');
  const [days, setDays] = useState('30');
  const [price, setPrice] = useState('1499');
  const [description, setDescription] = useState('');

  const onAdd = async () => {
    const durationDays = Number(days);
    const priceInr = Number(price);
    if (!name.trim() || !durationDays || !priceInr) {
      Alert.alert('Check fields', 'Name, days, and price are required.');
      return;
    }
    await upsertPlan({
      id: `plan_${Date.now().toString(36)}`,
      name: name.trim(),
      durationDays,
      priceInr,
      description: description.trim() || `${durationDays}-day membership`,
    });
    setName('');
    setDays('30');
    setPrice('1499');
    setDescription('');
  };

  return (
    <Screen>
      <Text style={styles.title}>Membership plans</Text>
      <Text style={styles.sub}>
        These are the plans your gym members purchase — not your Gymvero SaaS fee.
      </Text>

      {plans.map(plan => (
        <View key={plan.id} style={styles.card}>
          <Text style={styles.cardTitle}>{plan.name}</Text>
          <Text style={styles.cardMeta}>
            {plan.durationDays} days · {formatInr(plan.priceInr)}
          </Text>
          <Text style={styles.cardDesc}>{plan.description}</Text>
        </View>
      ))}

      <Text style={styles.section}>Add plan</Text>
      <TextInput
        style={styles.input}
        placeholder="Plan name"
        placeholderTextColor={colors.inkFaint}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Days"
          placeholderTextColor={colors.inkFaint}
          keyboardType="number-pad"
          value={days}
          onChangeText={setDays}
        />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Price INR"
          placeholderTextColor={colors.inkFaint}
          keyboardType="number-pad"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={colors.inkFaint}
        value={description}
        onChangeText={setDescription}
      />
      <PrimaryButton label="Save plan" onPress={onAdd} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.hero, color: colors.ink },
  sub: {
    ...typography.body,
    color: colors.inkMuted,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  cardTitle: { ...typography.subtitle, color: colors.ink },
  cardMeta: { ...typography.caption, color: colors.primary, marginTop: 4 },
  cardDesc: { ...typography.body, color: colors.inkMuted, marginTop: spacing.sm },
  section: {
    ...typography.subtitle,
    color: colors.ink,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  row: { flexDirection: 'row', gap: spacing.sm },
  half: { flex: 1 },
});
