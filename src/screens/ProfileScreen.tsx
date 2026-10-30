import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';
import type { RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const { signOut } = useAuth();
  const { gym, updateGym, resetDemoData } = useGymData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!gym) return;
    setName(gym.name);
    setPhone(gym.phone);
    setEmail(gym.email);
    setAddress(gym.address);
    setHours(gym.hours);
  }, [gym]);

  const onSave = async () => {
    setSaving(true);
    try {
      await updateGym({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        hours: hours.trim(),
      });
      Alert.alert('Saved', 'Gym profile updated locally.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Gym profile</Text>
      <Field label="Gym name" value={name} onChangeText={setName} />
      <Field label="Phone" value={phone} onChangeText={setPhone} />
      <Field label="Email" value={email} onChangeText={setEmail} />
      <Field label="Address" value={address} onChangeText={setAddress} />
      <Field label="Hours" value={hours} onChangeText={setHours} />

      <PrimaryButton label="Save profile" onPress={onSave} loading={saving} />
      <PrimaryButton
        label="Restore sample data"
        variant="secondary"
        onPress={() => {
          Alert.alert(
            'Restore sample data?',
            'Restores the original sample gym used for store review.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Restore', onPress: () => resetDemoData() },
            ],
          );
        }}
        style={styles.gap}
      />
      <PrimaryButton
        label="Sign out"
        variant="secondary"
        onPress={async () => {
          await signOut();
          navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
        }}
        style={styles.gap}
      />
      <PrimaryButton
        label="Delete account"
        variant="danger"
        onPress={() => navigation.navigate('DeleteAccount')}
        style={styles.gap}
      />
    </Screen>
  );
}

function Field({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
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
  gap: { marginTop: spacing.sm },
});
