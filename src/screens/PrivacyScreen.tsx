import React from 'react';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { APP } from '../config/app';
import { colors, spacing, typography } from '../theme';

export function PrivacyScreen() {
  const openPrivacy = () => Linking.openURL(APP.privacyUrl);
  const openDelete = () => Linking.openURL(APP.deleteAccountUrl);

  return (
    <Screen>
      <Text style={styles.title}>Privacy policy</Text>
      <Text style={styles.body}>
        Gymvero stores your sign-in session and gym operational data used to
        provide the owner app. In this store-review build, that data stays on
        this device.
      </Text>
      <Text style={styles.body}>
        After the cloud backend launches, account and gym data will be processed
        to provide the service. We will not sell member lists.
      </Text>
      <Text style={styles.section}>Account deletion</Text>
      <Text style={styles.body}>
        Permanently delete your account in the app under More → Delete account.
        You can also use the web deletion page linked below.
      </Text>

      <PrimaryButton label="Open full privacy policy" onPress={openPrivacy} />
      <Pressable onPress={openDelete} accessibilityRole="link" style={styles.linkWrap}>
        <Text style={styles.link}>Account deletion web page</Text>
      </Pressable>
      <Text style={styles.meta}>
        {APP.privacyUrl}
        {'\n'}
        Support: {APP.supportUrl}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.hero, color: colors.ink, marginBottom: spacing.lg },
  section: {
    ...typography.subtitle,
    color: colors.ink,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.inkMuted,
    marginBottom: spacing.lg,
  },
  linkWrap: { marginTop: spacing.lg },
  link: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  meta: {
    ...typography.caption,
    color: colors.inkFaint,
    marginTop: spacing.lg,
  },
});
