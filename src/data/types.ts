export type MemberStatus = 'active' | 'expired' | 'paused';

export type MembershipPlan = {
  id: string;
  name: string;
  durationDays: number;
  priceInr: number;
  description: string;
};

export type Member = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  planId: string;
  status: MemberStatus;
  joinedAt: string;
  expiresAt: string;
  notes?: string;
};

export type AttendanceRecord = {
  id: string;
  memberId: string;
  checkedInAt: string;
  dateKey: string;
};

export type PaymentStatus = 'paid' | 'due' | 'overdue';

export type Payment = {
  id: string;
  memberId: string;
  amountInr: number;
  status: PaymentStatus;
  method: 'cash' | 'upi' | 'card' | 'other';
  note: string;
  paidAt?: string;
  dueAt: string;
};

export type GymProfile = {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  city: string;
};

export type SaasPlanId = 'monthly' | 'quarterly' | 'annual';

export type SaasSubscription = {
  planId: SaasPlanId;
  status: 'active' | 'trial' | 'expired';
  renewsAt: string;
  priceInr: number;
};

export type MockStore = {
  gym: GymProfile;
  plans: MembershipPlan[];
  members: Member[];
  attendance: AttendanceRecord[];
  payments: Payment[];
  subscription: SaasSubscription;
};

export const SAAS_CATALOG: Record<
  SaasPlanId,
  { label: string; priceInr: number; period: string; savings?: string }
> = {
  monthly: { label: 'Monthly', priceInr: 999, period: 'per month' },
  quarterly: {
    label: 'Quarterly',
    priceInr: 2699,
    period: 'per 3 months',
    savings: 'Save 10%',
  },
  annual: {
    label: 'Annual',
    priceInr: 8999,
    period: 'per year',
    savings: 'Save 25%',
  },
};
