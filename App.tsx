import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { GymDataProvider } from './src/context/GymDataContext';
import type { RootStackParamList } from './src/navigation/types';
import { GymveroPlanScreen } from './src/screens/GymveroPlanScreen';
import { MainTabs } from './src/screens/MainTabs';
import { MemberDetailScreen } from './src/screens/MemberDetailScreen';
import { MemberFormScreen } from './src/screens/MemberFormScreen';
import { MembershipPlansScreen } from './src/screens/MembershipPlansScreen';
import { DeleteAccountScreen } from './src/screens/DeleteAccountScreen';
import { PrivacyScreen } from './src/screens/PrivacyScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { TermsScreen } from './src/screens/TermsScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.surface,
    card: colors.surfaceRaised,
    text: colors.ink,
    border: colors.border,
    notification: colors.accent,
  },
};

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.ink,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.surface },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MemberDetail"
        component={MemberDetailScreen}
        options={{ title: 'Member' }}
      />
      <Stack.Screen
        name="MemberForm"
        component={MemberFormScreen}
        options={{ title: 'Member' }}
      />
      <Stack.Screen
        name="MembershipPlans"
        component={MembershipPlansScreen}
        options={{ title: 'Membership plans' }}
      />
      <Stack.Screen
        name="GymveroPlan"
        component={GymveroPlanScreen}
        options={{ title: 'Gymvero plan' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{ title: 'Delete account' }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ title: 'Privacy' }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ title: 'Terms' }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <AuthProvider>
        <GymDataProvider>
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
          </NavigationContainer>
        </GymDataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
