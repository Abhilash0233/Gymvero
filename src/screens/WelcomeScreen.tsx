import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GymveroLogo } from '../components/GymveroLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { ONBOARDING_SLIDES } from '../assets/onboarding';
import type { RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = Math.min(320, Math.round(SCREEN_WIDTH * 0.72));

export function WelcomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const slide = ONBOARDING_SLIDES[index];
  const isLast = index === ONBOARDING_SLIDES.length - 1;

  const goSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const onNext = useCallback(() => {
    if (isLast) {
      goSignIn();
      return;
    }
    const next = index + 1;
    scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });
    setIndex(next);
  }, [goSignIn, index, isLast]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setIndex(Math.max(0, Math.min(i, ONBOARDING_SLIDES.length - 1)));
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.topBar}>
        <GymveroLogo size={40} />
        <Pressable onPress={goSignIn} hitSlop={12} accessibilityRole="button">
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={styles.pager}
      >
        {ONBOARDING_SLIDES.map(item => (
          <View key={item.id} style={[styles.page, { width: SCREEN_WIDTH }]}>
            <View style={[styles.hero, { height: HERO_HEIGHT }]}>
              <Image
                source={item.image}
                style={styles.heroImage}
                resizeMode="cover"
                accessibilityLabel={item.title}
              />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.dots}>
          {ONBOARDING_SLIDES.map((s, i) => (
            <View
              key={s.id}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <PrimaryButton label={slide.cta} onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  topBar: {
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  skip: {
    ...typography.subtitle,
    color: colors.inkMuted,
    fontSize: 14,
  },
  pager: {
    flex: 1,
  },
  page: {
    paddingHorizontal: spacing.xl,
  },
  hero: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
    marginBottom: spacing.xl,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...typography.hero,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.inkMuted,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderStrong,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
});
