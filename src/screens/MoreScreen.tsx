import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { APP } from '../config/app';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'More'>,
  NativeStackScreenProps<RootStackParamList>
>;

const LINKS: { title: string; subtitle: string; route: keyof RootStackParamList }[] = [
  {
    title: 'Membership plans',
    subtitle: 'Plans members buy at your gym',
    route: 'MembershipPlans',
  },
  {
    title: 'Gymvero subscription',
    subtitle: 'Monthly, quarterly, or annual SaaS plan',
    route: 'GymveroPlan',
  },
  {
    title: 'Gym profile',
    subtitle: 'Name, contact, hours, sign out',
    route: 'Profile',
  },
  {
    title: 'Delete account',
    subtitle: 'Permanently delete your Gymvero account',
    route: 'DeleteAccount',
  },
  {
    title: 'Privacy policy',
    subtitle: 'How Gymvero handles data',
    route: 'Privacy',
  },
  {
    title: 'Terms of use',
    subtitle: 'App terms',
    route: 'Terms',
  },
];

export function MoreScreen({ navigation }: Props) {
  return (
    <Screen safeTop>
      <Text style={styles.title}>More</Text>
      <Text style={styles.sub}>v{APP.version}</Text>
      <View style={styles.list}>
        {LINKS.map(link => (
          <Pressable
            key={link.route}
            style={styles.row}
            onPress={() => navigation.navigate(link.route as never)}
          >
            <Text style={styles.rowTitle}>{link.title}</Text>
            <Text style={styles.rowSub}>{link.subtitle}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.hero, color: colors.ink },
  sub: { ...typography.caption, color: colors.inkMuted, marginBottom: spacing.lg },
  list: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowTitle: { ...typography.subtitle, color: colors.ink },
  rowSub: { ...typography.caption, color: colors.inkMuted, marginTop: 4 },
});
