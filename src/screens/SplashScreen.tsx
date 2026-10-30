import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../navigation/types';
import { colors, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const logoMark = require('../assets/gymvero-logo-mark.png');

export function SplashScreen({ navigation }: Props) {
  const { ready, session } = useAuth();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      // Unauthenticated users always see product intro before sign-in (Play policy).
      navigation.replace(session ? 'MainTabs' : 'Welcome');
    }, 900);
    return () => clearTimeout(t);
  }, [ready, session, navigation]);


  return (
    <View style={styles.root}>
      <Animated.View
        style={[styles.center, { opacity, transform: [{ scale }] }]}
      >
        <Image source={logoMark} style={styles.logo} accessibilityLabel="Gymvero" />
        <Text style={styles.brand}>Gymvero</Text>
        <Text style={styles.tag}>Gym management for owners</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    marginBottom: 16,
  },
  brand: {
    ...typography.brand,
    color: colors.white,
    textAlign: 'center',
  },
  tag: {
    ...typography.body,
    color: colors.primarySoft,
    textAlign: 'center',
    marginTop: 8,
  },
});
