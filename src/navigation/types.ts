export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  SignIn: undefined;
  MainTabs: undefined;
  MemberDetail: { memberId: string };
  MemberForm: { memberId?: string } | undefined;
  MembershipPlans: undefined;
  GymveroPlan: undefined;
  Profile: undefined;
  DeleteAccount: undefined;
  Privacy: undefined;
  Terms: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Members: undefined;
  Attendance: undefined;
  Payments: undefined;
  More: undefined;
};
