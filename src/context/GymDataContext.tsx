import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AttendanceRepo,
  GymProfileRepo,
  MembersRepo,
  PaymentsRepo,
  PlansRepo,
  SubscriptionRepo,
  dashboardStats,
} from '../data/repos';
import { loadStore, resetStore, subscribeStore } from '../data/mockStore';
import type {
  AttendanceRecord,
  GymProfile,
  Member,
  MembershipPlan,
  Payment,
  SaasPlanId,
  SaasSubscription,
} from '../data/types';
import { useAuth } from './AuthContext';


type GymDataContextValue = {
  refreshing: boolean;
  gym: GymProfile | null;
  members: Member[];
  plans: MembershipPlan[];
  attendanceToday: AttendanceRecord[];
  payments: Payment[];
  subscription: SaasSubscription | null;
  stats: ReturnType<typeof dashboardStats>;
  refresh: () => Promise<void>;
  addMember: (
    input: Omit<Member, 'id' | 'joinedAt'> & { joinedAt?: string },
  ) => Promise<Member>;
  updateMember: (id: string, patch: Partial<Member>) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
  upsertPlan: (plan: MembershipPlan) => Promise<void>;
  checkIn: (memberId: string) => Promise<void>;
  markPaymentPaid: (id: string) => Promise<void>;
  updateGym: (patch: Partial<GymProfile>) => Promise<void>;
  selectSaasPlan: (planId: SaasPlanId) => Promise<void>;
  resetDemoData: () => Promise<void>;
};

const GymDataContext = createContext<GymDataContextValue | undefined>(undefined);

export function GymDataProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [gym, setGym] = useState<GymProfile | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [attendanceToday, setAttendanceToday] = useState<AttendanceRecord[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscription, setSubscription] = useState<SaasSubscription | null>(null);
  const [stats, setStats] = useState(dashboardStats());

  const clearLocalState = useCallback(() => {
    setGym(null);
    setMembers([]);
    setPlans([]);
    setAttendanceToday([]);
    setPayments([]);
    setSubscription(null);
    setStats({
      totalMembers: 0,
      activeMembers: 0,
      duesOutstanding: 0,
      checkInsToday: 0,
      overdueCount: 0,
      planCount: 0,
    });
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadStore();
      const [g, m, p, a, pay, sub] = await Promise.all([
        GymProfileRepo.get(),
        MembersRepo.list(),
        PlansRepo.list(),
        AttendanceRepo.listToday(),
        PaymentsRepo.list(),
        SubscriptionRepo.get(),
      ]);
      setGym(g);
      setMembers(m);
      setPlans(p);
      setAttendanceToday(a);
      setPayments(pay);
      setSubscription(sub);
      setStats(dashboardStats());
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!session) {
      clearLocalState();
      return;
    }
    refresh();
    return subscribeStore(() => {
      refresh();
    });
  }, [session, refresh, clearLocalState]);

  const addMember = useCallback(
    async (input: Omit<Member, 'id' | 'joinedAt'> & { joinedAt?: string }) => {
      const member = await MembersRepo.create(input);
      await refresh();
      return member;
    },
    [refresh],
  );

  const updateMember = useCallback(
    async (id: string, patch: Partial<Member>) => {
      await MembersRepo.update(id, patch);
      await refresh();
    },
    [refresh],
  );

  const removeMember = useCallback(
    async (id: string) => {
      await MembersRepo.remove(id);
      await refresh();
    },
    [refresh],
  );

  const upsertPlan = useCallback(
    async (plan: MembershipPlan) => {
      await PlansRepo.upsert(plan);
      await refresh();
    },
    [refresh],
  );

  const checkIn = useCallback(
    async (memberId: string) => {
      await AttendanceRepo.checkIn(memberId);
      await refresh();
    },
    [refresh],
  );

  const markPaymentPaid = useCallback(
    async (id: string) => {
      await PaymentsRepo.markPaid(id);
      await refresh();
    },
    [refresh],
  );

  const updateGym = useCallback(
    async (patch: Partial<GymProfile>) => {
      await GymProfileRepo.update(patch);
      await refresh();
    },
    [refresh],
  );

  const selectSaasPlan = useCallback(
    async (planId: SaasPlanId) => {
      await SubscriptionRepo.selectPlan(planId);
      await refresh();
    },
    [refresh],
  );

  const resetDemoData = useCallback(async () => {
    await resetStore();
    await refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      refreshing,
      gym,
      members,
      plans,
      attendanceToday,
      payments,
      subscription,
      stats,
      refresh,
      addMember,
      updateMember,
      removeMember,
      upsertPlan,
      checkIn,
      markPaymentPaid,
      updateGym,
      selectSaasPlan,
      resetDemoData,
    }),
    [
      refreshing,
      gym,
      members,
      plans,
      attendanceToday,
      payments,
      subscription,
      stats,
      refresh,
      addMember,
      updateMember,
      removeMember,
      upsertPlan,
      checkIn,
      markPaymentPaid,
      updateGym,
      selectSaasPlan,
      resetDemoData,
    ],
  );

  return (
    <GymDataContext.Provider value={value}>{children}</GymDataContext.Provider>
  );
}

export function useGymData(): GymDataContextValue {
  const ctx = useContext(GymDataContext);
  if (!ctx) throw new Error('useGymData must be used within GymDataProvider');
  return ctx;
}
