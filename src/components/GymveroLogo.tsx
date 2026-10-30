import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, typography } from '../theme';

const mark = require('../assets/gymvero-logo-mark.png');

type Props = {
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: string;
  style?: StyleProp<ViewStyle>;
  markStyle?: StyleProp<ImageStyle>;
};

export function GymveroLogo({
  size = 40,
  showWordmark = true,
  wordmarkColor = colors.ink,
  style,
  markStyle,
}: Props) {
  return (
    <View style={[styles.row, style]}>
      <Image
        source={mark}
        style={[{ width: size, height: size, borderRadius: size * 0.28 }, markStyle]}
        accessibilityLabel="Gymvero logo"
      />
      {showWordmark ? (
        <Text style={[styles.word, { color: wordmarkColor, fontSize: size * 0.5 }]}>
          Gymvero
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  word: {
    ...typography.subtitle,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
});
