import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { APP } from '../config/app';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'DeleteAccount'>;

const CONFIRM_WORD = 'DELETE';

export function DeleteAccountScreen({ navigation }: Props) {
  const { session, deleteAccount } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [busy, setBusy] = useState(false);

  const openWebDeletion = async () => {
    const url = APP.deleteAccountUrl;
    const can = await Linking.canOpenURL(url);
    if (!can) {
      Alert.alert(
        'Open in browser',
        `Visit ${url} or email ${APP.deleteAccountEmail} to request account deletion.`,
      );
      return;
    }
    await Linking.openURL(url);
  };

  const onDelete = () => {
    if (confirmText.trim().toUpperCase() !== CONFIRM_WORD) {
      Alert.alert(
        'Confirmation needed',
        `Type ${CONFIRM_WORD} to permanently delete your account.`,
      );
      return;
    }

    Alert.alert(
      'Delete account permanently?',
      'This removes your Gymvero owner account data available in this app. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete account',
          style: 'destructive',
          onPress: async () => {
            setBusy(true);
            try {
              await deleteAccount();
              Alert.alert(
                'Account deleted',
                'Your account and associated app data on this device have been deleted.',
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome' }],
                      }),
                  },
                ],
              );
            } finally {
              setBusy(false);
            }
          },
        },
      ],
    );
  };

  return (
    <Screen>
      <Text style={styles.title}>Delete account</Text>
      <Text style={styles.body}>
        You can permanently delete your Gymvero owner account and associated
        personal data from this app. Temporary deactivation is not offered —
        deletion removes the account record available to Gymvero.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Signed in as</Text>
        <Text style={styles.value}>{session?.email ?? 'Owner account'}</Text>
        <Text style={styles.valueMuted}>{session?.gymName}</Text>
      </View>

      <Text style={styles.body}>
        What is deleted: sign-in session, gym profile edits, members, plans,
        attendance, payments, and subscription preferences stored for this
        account in the app.
      </Text>
      <Text style={styles.body}>
        If any data must be retained later for legal or fraud-prevention
        reasons, that will be described in the privacy policy. This build stores
        data on-device only.
      </Text>

      <Text style={styles.label}>Type {CONFIRM_WORD} to confirm</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="characters"
        autoCorrect={false}
        value={confirmText}
        onChangeText={setConfirmText}
        placeholder={CONFIRM_WORD}
        placeholderTextColor={colors.inkFaint}
      />

      <PrimaryButton
        label="Delete my account"
        variant="danger"
        onPress={onDelete}
        loading={busy}
        style={styles.gap}
      />

      <Text style={styles.webHint}>
        Google Play also requires an external deletion path. You can request
        deletion on the web if you prefer:
      </Text>
      <Pressable onPress={openWebDeletion} accessibilityRole="link">
        <Text style={styles.link}>{APP.deleteAccountUrl}</Text>
      </Pressable>
      <Text style={styles.webHint}>Or email {APP.deleteAccountEmail}</Text>

      <PrimaryButton
        label="Cancel"
        variant="ghost"
        onPress={() => navigation.goBack()}
        style={styles.gap}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.hero, color: colors.ink, marginBottom: spacing.md },
  body: {
    ...typography.body,
    color: colors.inkMuted,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.dangerSoft,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.inkMuted,
    marginBottom: spacing.sm,
  },
  value: { ...typography.subtitle, color: colors.ink },
  valueMuted: {
    ...typography.caption,
    color: colors.inkMuted,
    marginTop: 4,
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
    marginBottom: spacing.md,
  },
  gap: { marginTop: spacing.sm },
  webHint: {
    ...typography.caption,
    color: colors.inkMuted,
    marginTop: spacing.lg,
  },
  link: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});
