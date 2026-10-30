import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  /** Add status-bar inset (for tab screens without a nav header). */
  safeTop?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

export function Screen({
  children,
  scroll = true,
  safeTop = false,
  refreshing,
  onRefresh,
  style,
  contentStyle,
}: Props) {
  const insets = useSafeAreaInsets();
  const paddingTop = spacing.lg + (safeTop ? insets.top : 0);

  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          paddingTop,
          paddingBottom: spacing.xxl + insets.bottom,
        },
        contentStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle, { flex: 1, paddingTop }]}>
      {children}
    </View>
  );

  return <View style={[styles.root, style]}>{body}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
});

