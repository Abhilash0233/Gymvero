import React from 'react';
import { Linking, StyleSheet, Text } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { APP } from '../config/app';
import { colors, spacing, typography } from '../theme';

export function TermsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Terms of use</Text>
      <Text style={styles.body}>
        This Gymvero build is a store-review demo. Demo credentials unlock sample
        data only. Features that mutate data save locally on device and may be
        reset.
      </Text>
      <Text style={styles.body}>
        Gymvero SaaS billing (monthly / quarterly / annual) is shown for product
        preview and does not charge you in this version.
      </Text>
      <Text style={styles.body}>
        By using the app you agree to use demo access only for evaluation.
      </Text>
      <PrimaryButton
        label="Open full terms"
        onPress={() => Linking.openURL(APP.termsUrl)}
      />
      <Text style={styles.meta}>{APP.termsUrl}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.hero, color: colors.ink, marginBottom: spacing.lg },
  body: {
    ...typography.body,
    color: colors.inkMuted,
    marginBottom: spacing.lg,
  },
  meta: {
    ...typography.caption,
    color: colors.inkFaint,
    marginTop: spacing.lg,
  },
});
