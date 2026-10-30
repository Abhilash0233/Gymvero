/** Gymvero brand — deep teal + ember accent on cool stone surfaces */
export const colors = {
  ink: '#102A2E',
  inkMuted: '#4A6368',
  inkFaint: '#7A9297',
  surface: '#F3F6F5',
  surfaceRaised: '#FFFFFF',
  surfaceMuted: '#E6EEEC',
  primary: '#1B7F7A',
  primaryDark: '#145F5B',
  primarySoft: '#D4EFEB',
  accent: '#E4572E',
  accentSoft: '#FCE8E1',
  success: '#2D8A5E',
  successSoft: '#DFF3E8',
  warning: '#C4841D',
  warningSoft: '#F8E9CC',
  danger: '#C0392B',
  dangerSoft: '#F8E0DD',
  border: '#D5E0DD',
  borderStrong: '#B4C6C2',
  overlay: 'rgba(16, 42, 46, 0.45)',
  white: '#FFFFFF',
  black: '#000000',
  demoBanner: '#1B7F7A',
} as const;

export type ColorName = keyof typeof colors;
