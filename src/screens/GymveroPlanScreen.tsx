import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { useGymData } from '../context/GymDataContext';
import { SAAS_CATALOG, type SaasPlanId } from '../data/types';
import { daysUntil, formatDate, formatInr } from '../utils/format';
import { colors, radii, spacing, typography } from '../theme';

const ORDER: SaasPlanId[] = ['monthly', 'quarterly', 'annual'];

export function GymveroPlanScreen() {
  const { subscription, selectSaasPlan } = useGymData();
  const [saving, setSaving] = useState(false);

  const onSelect = async (planId: SaasPlanId) => {
    setSaving(true);
    try {
      await selectSaasPlan(planId);
      Alert.alert(
        'Plan updated (demo)',
        'Billing will be enabled after launch. This only changes local demo state.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.brand}>Gymvero</Text>
      <Text style={styles.title}>Your SaaS plan</Text>
      <Text style={styles.sub}>
        Monthly, quarterly, or annual — what you pay Gymvero to run the app.
      </Text>

      {subscription ? (
        <View style={styles.current}>
          <Text style={styles.currentLabel}>Current</Text>
          <Text style={styles.currentTitle}>
            {SAAS_CATALOG[subscription.planId].label} · {subscription.status}
          </Text>
          <Text style={styles.currentMeta}>
            {formatInr(subscription.priceInr)} · renews {formatDate(subscription.renewsAt)}{' '}
            ({daysUntil(subscription.renewsAt)} days)
          </Text>
        </View>
      ) : null}

      {ORDER.map(id => {
        const plan = SAAS_CATALOG[id];
        const selected = subscription?.planId === id;
        return (
          <Pressable
            key={id}
            style={[styles.card, selected && styles.cardOn]}
            onPress={() => onSelect(id)}
            disabled={saving}
          >
            <View style={styles.cardTop}>
              <Text style={[styles.cardTitle, selected && styles.onText]}>
                {plan.label}
              </Text>
              {plan.savings ? (
                <Text style={styles.savings}>{plan.savings}</Text>
              ) : null}
            </View>
            <Text style={[styles.price, selected && styles.onText]}>
              {formatInr(plan.priceInr)}
            </Text>
            <Text style={[styles.period, selected && styles.onMuted]}>
              {plan.period}
            </Text>
          </Pressable>
        );
      })}

      <PrimaryButton
        label="Billing coming after approval"
        variant="ghost"
        onPress={() =>
          Alert.alert(
            'Not charged',
            'This demo build does not process payments. Real Gymvero billing ships after store approval.',
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: { ...typography.label, color: colors.primary },
  title: { ...typography.hero, color: colors.ink, marginTop: spacing.sm },
  sub: {
    ...typography.body,
    color: colors.inkMuted,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  current: {
    backgroundColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  currentLabel: { ...typography.label, color: colors.primarySoft },
  currentTitle: {
    ...typography.subtitle,
    color: colors.white,
    marginTop: spacing.sm,
  },
  currentMeta: {
    ...typography.caption,
    color: colors.inkFaint,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardOn: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { ...typography.subtitle, color: colors.ink },
  savings: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '700',
  },
  price: { ...typography.monoStat, color: colors.ink, marginTop: spacing.sm },
  period: { ...typography.caption, color: colors.inkMuted, marginTop: 4 },
  onText: { color: colors.white },
  onMuted: { color: colors.primarySoft },
});
