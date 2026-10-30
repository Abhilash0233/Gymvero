import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import type { MainTabParamList } from '../navigation/types';
import { colors, typography } from '../theme';
import { AttendanceScreen } from './AttendanceScreen';
import { DashboardScreen } from './DashboardScreen';
import { MembersScreen } from './MembersScreen';
import { MoreScreen } from './MoreScreen';
import { PaymentsScreen } from './PaymentsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inkFaint,
        tabBarStyle: {
          backgroundColor: colors.surfaceRaised,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontSize: 11,
        },
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof MainTabParamList, string> = {
            Dashboard: 'grid-outline',
            Members: 'people-outline',
            Attendance: 'checkmark-circle-outline',
            Payments: 'cash-outline',
            More: 'ellipsis-horizontal-circle-outline',
          };
          return <Icon name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Members" component={MembersScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
