import { getStoreSync, loadStore, updateStore } from './mockStore';
import type {
  AttendanceRecord,
  GymProfile,
  Member,
  MembershipPlan,
  Payment,
  SaasPlanId,
  SaasSubscription,
} from './types';
import { SAAS_CATALOG } from './types';

function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const GymProfileRepo = {
  async get(): Promise<GymProfile> {
    const store = await loadStore();
    return store.gym;
  },
  async update(patch: Partial<GymProfile>): Promise<GymProfile> {
    const store = await updateStore(s => {
      s.gym = { ...s.gym, ...patch };
    });
    return store.gym;
  },
};

export const PlansRepo = {
  async list(): Promise<MembershipPlan[]> {
    const store = await loadStore();
    return [...store.plans];
  },
  async upsert(plan: MembershipPlan): Promise<MembershipPlan[]> {
    const store = await updateStore(s => {
      const idx = s.plans.findIndex(p => p.id === plan.id);
      if (idx >= 0) s.plans[idx] = plan;
      else s.plans.push(plan);
    });
    return [...store.plans];
  },
  async remove(id: string): Promise<MembershipPlan[]> {
    const store = await updateStore(s => {
      s.plans = s.plans.filter(p => p.id !== id);
    });
    return [...store.plans];
  },
};

export const MembersRepo = {
  async list(): Promise<Member[]> {
    const store = await loadStore();
    return [...store.members].sort((a, b) => a.name.localeCompare(b.name));
  },
  async get(id: string): Promise<Member | undefined> {
    const store = await loadStore();
    return store.members.find(m => m.id === id);
  },
  async create(
    input: Omit<Member, 'id' | 'joinedAt'> & { joinedAt?: string },
  ): Promise<Member> {
    const member: Member = {
      ...input,
      id: uid('m'),
      joinedAt: input.joinedAt ?? new Date().toISOString(),
    };
    await updateStore(s => {
      s.members.push(member);
    });
    return member;
  },
  async update(id: string, patch: Partial<Member>): Promise<Member | undefined> {
    let updated: Member | undefined;
    await updateStore(s => {
      const idx = s.members.findIndex(m => m.id === id);
      if (idx < 0) return;
      s.members[idx] = { ...s.members[idx], ...patch, id };
      updated = s.members[idx];
    });
    return updated;
  },
  async remove(id: string): Promise<void> {
    await updateStore(s => {
      s.members = s.members.filter(m => m.id !== id);
      s.attendance = s.attendance.filter(a => a.memberId !== id);
      s.payments = s.payments.filter(p => p.memberId !== id);
    });
  },
};

export const AttendanceRepo = {
  async listToday(): Promise<AttendanceRecord[]> {
    const store = await loadStore();
    const key = todayKey();
    return store.attendance
      .filter(a => a.dateKey === key)
      .sort((a, b) => b.checkedInAt.localeCompare(a.checkedInAt));
  },
  async checkIn(memberId: string): Promise<AttendanceRecord> {
    const key = todayKey();
    const existing = getStoreSync().attendance.find(
      a => a.memberId === memberId && a.dateKey === key,
    );
    if (existing) return existing;

    const record: AttendanceRecord = {
      id: uid('a'),
      memberId,
      checkedInAt: new Date().toISOString(),
      dateKey: key,
    };
    await updateStore(s => {
      s.attendance.unshift(record);
    });
    return record;
  },
};

export const PaymentsRepo = {
  async list(): Promise<Payment[]> {
    const store = await loadStore();
    return [...store.payments].sort((a, b) =>
      (b.paidAt ?? b.dueAt).localeCompare(a.paidAt ?? a.dueAt),
    );
  },
  async markPaid(id: string): Promise<Payment | undefined> {
    let updated: Payment | undefined;
    await updateStore(s => {
      const idx = s.payments.findIndex(p => p.id === id);
      if (idx < 0) return;
      s.payments[idx] = {
        ...s.payments[idx],
        status: 'paid',
        paidAt: new Date().toISOString(),
      };
      updated = s.payments[idx];
    });
    return updated;
  },
};

export const SubscriptionRepo = {
  async get(): Promise<SaasSubscription> {
    const store = await loadStore();
    return store.subscription;
  },
  async selectPlan(planId: SaasPlanId): Promise<SaasSubscription> {
    const catalog = SAAS_CATALOG[planId];
    const renews = new Date();
    if (planId === 'monthly') renews.setMonth(renews.getMonth() + 1);
    else if (planId === 'quarterly') renews.setMonth(renews.getMonth() + 3);
    else renews.setFullYear(renews.getFullYear() + 1);

    const store = await updateStore(s => {
      s.subscription = {
        planId,
        status: 'active',
        renewsAt: renews.toISOString(),
        priceInr: catalog.priceInr,
      };
    });
    return store.subscription;
  },
};

export function dashboardStats() {
  const store = getStoreSync();
  const today = todayKey();
  const activeMembers = store.members.filter(m => m.status === 'active').length;
  const dues = store.payments
    .filter(p => p.status === 'due' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amountInr, 0);
  const checkInsToday = store.attendance.filter(a => a.dateKey === today).length;
  const overdueCount = store.payments.filter(p => p.status === 'overdue').length;
  return {
    totalMembers: store.members.length,
    activeMembers,
    duesOutstanding: dues,
    checkInsToday,
    overdueCount,
    planCount: store.plans.length,
  };
}
