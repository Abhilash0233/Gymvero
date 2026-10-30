import { Platform, TextStyle } from 'react-native';

const displayFont = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif-condensed',
  default: 'System',
});

const bodyFont = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif',
  default: 'System',
});

export const typography = {
  brand: {
    fontFamily: displayFont,
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1.2,
  } as TextStyle,
  hero: {
    fontFamily: displayFont,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.6,
  } as TextStyle,
  title: {
    fontFamily: displayFont,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  } as TextStyle,
  subtitle: {
    fontFamily: bodyFont,
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  body: {
    fontFamily: bodyFont,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  } as TextStyle,
  caption: {
    fontFamily: bodyFont,
    fontSize: 13,
    fontWeight: '500',
  } as TextStyle,
  label: {
    fontFamily: bodyFont,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  } as TextStyle,
  monoStat: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'System' }),
    fontSize: 24,
    fontWeight: '700',
  } as TextStyle,
} as const;
