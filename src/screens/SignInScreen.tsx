import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GymveroLogo } from '../components/GymveroLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { DEMO_AUTH } from '../config/demoAuth';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';


type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export function SignInScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState<string>(DEMO_AUTH.email);
  const [password, setPassword] = useState<string>(DEMO_AUTH.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const err = await signIn(emailOrPhone, password);
      if (err) {
        setError(err);
        return;
      }
      navigation.replace('MainTabs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top + spacing.xl }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <GymveroLogo size={44} style={styles.logo} />
        <Text style={styles.title}>Owner sign in</Text>
        <Text style={styles.hint}>
          Use the review credentials provided for App Store / Play testing.
        </Text>
      </View>


      <View style={styles.form}>
        <Text style={styles.label}>Email or phone</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          placeholder="demo@gymvero.app"
          placeholderTextColor={colors.inkFaint}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={colors.inkFaint}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo login</Text>
          <Text style={styles.demoLine}>{DEMO_AUTH.email}</Text>
          <Text style={styles.demoLine}>{DEMO_AUTH.password}</Text>
        </View>
        <PrimaryButton label="Continue" onPress={onSubmit} loading={loading} />
        <PrimaryButton
          label="Back"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  logo: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.hero,
    color: colors.ink,
  },

  hint: {
    ...typography.body,
    color: colors.inkMuted,
    marginTop: spacing.sm,
  },
  form: {
    gap: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.inkMuted,
    marginTop: spacing.md,
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
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.sm,
  },
  demoBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginVertical: spacing.md,
  },
  demoTitle: {
    ...typography.label,
    color: colors.primaryDark,
    marginBottom: spacing.sm,
  },
  demoLine: {
    ...typography.body,
    color: colors.ink,
  },
});
