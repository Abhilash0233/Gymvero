import { DEMO_AUTH } from '../config/demoAuth';
import type { MockStore } from './types';

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function daysAgo(days: number): string {
  return daysFromNow(-days);
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createSeedStore(): MockStore {
  const today = todayKey();
  return {
    gym: {
      id: DEMO_AUTH.gymId,
      name: DEMO_AUTH.gymName,
      ownerName: DEMO_AUTH.ownerName,
      phone: DEMO_AUTH.phone,
      email: DEMO_AUTH.email,
      address: '12 Fitness Lane, Koramangala',
      hours: 'Mon–Sat 6:00–22:00 · Sun 7:00–14:00',
      city: 'Bengaluru',
    },
    plans: [
      {
        id: 'plan_month',
        name: 'Monthly Flex',
        durationDays: 30,
        priceInr: 1499,
        description: 'Full gym access for 30 days',
      },
      {
        id: 'plan_quarter',
        name: 'Quarterly Strength',
        durationDays: 90,
        priceInr: 3999,
        description: '3 months + one free PT session',
      },
      {
        id: 'plan_annual',
        name: 'Annual Elite',
        durationDays: 365,
        priceInr: 12999,
        description: 'Full year + locker priority',
      },
    ],
    members: [
      {
        id: 'm1',
        name: 'Aarav Mehta',
        phone: '9811111111',
        email: 'aarav@example.com',
        planId: 'plan_annual',
        status: 'active',
        joinedAt: daysAgo(120),
        expiresAt: daysFromNow(245),
      },
      {
        id: 'm2',
        name: 'Priya Sharma',
        phone: '9822222222',
        planId: 'plan_quarter',
        status: 'active',
        joinedAt: daysAgo(40),
        expiresAt: daysFromNow(50),
      },
      {
        id: 'm3',
        name: 'Rohan Kapoor',
        phone: '9833333333',
        planId: 'plan_month',
        status: 'active',
        joinedAt: daysAgo(12),
        expiresAt: daysFromNow(18),
      },
      {
        id: 'm4',
        name: 'Neha Iyer',
        phone: '9844444444',
        planId: 'plan_month',
        status: 'expired',
        joinedAt: daysAgo(80),
        expiresAt: daysAgo(5),
      },
      {
        id: 'm5',
        name: 'Vikram Singh',
        phone: '9855555555',
        planId: 'plan_quarter',
        status: 'paused',
        joinedAt: daysAgo(60),
        expiresAt: daysFromNow(30),
        notes: 'Traveling until next month',
      },
      {
        id: 'm6',
        name: 'Ananya Rao',
        phone: '9866666666',
        planId: 'plan_annual',
        status: 'active',
        joinedAt: daysAgo(200),
        expiresAt: daysFromNow(165),
      },
      {
        id: 'm7',
        name: 'Karan Patel',
        phone: '9877777777',
        planId: 'plan_month',
        status: 'active',
        joinedAt: daysAgo(5),
        expiresAt: daysFromNow(25),
      },
      {
        id: 'm8',
        name: 'Sneha Nair',
        phone: '9888888888',
        planId: 'plan_quarter',
        status: 'active',
        joinedAt: daysAgo(25),
        expiresAt: daysFromNow(65),
      },
    ],
    attendance: [
      {
        id: 'a1',
        memberId: 'm1',
        checkedInAt: `${today}T06:42:00.000Z`,
        dateKey: today,
      },
      {
        id: 'a2',
        memberId: 'm2',
        checkedInAt: `${today}T07:15:00.000Z`,
        dateKey: today,
      },
      {
        id: 'a3',
        memberId: 'm6',
        checkedInAt: `${today}T08:05:00.000Z`,
        dateKey: today,
      },
      {
        id: 'a4',
        memberId: 'm7',
        checkedInAt: `${today}T09:20:00.000Z`,
        dateKey: today,
      },
    ],
    payments: [
      {
        id: 'p1',
        memberId: 'm1',
        amountInr: 12999,
        status: 'paid',
        method: 'upi',
        note: 'Annual Elite renewal',
        paidAt: daysAgo(120),
        dueAt: daysAgo(120),
      },
      {
        id: 'p2',
        memberId: 'm2',
        amountInr: 3999,
        status: 'paid',
        method: 'card',
        note: 'Quarterly Strength',
        paidAt: daysAgo(40),
        dueAt: daysAgo(40),
      },
      {
        id: 'p3',
        memberId: 'm3',
        amountInr: 1499,
        status: 'paid',
        method: 'cash',
        note: 'Monthly Flex',
        paidAt: daysAgo(12),
        dueAt: daysAgo(12),
      },
      {
        id: 'p4',
        memberId: 'm4',
        amountInr: 1499,
        status: 'overdue',
        method: 'upi',
        note: 'Renewal pending',
        dueAt: daysAgo(5),
      },
      {
        id: 'p5',
        memberId: 'm5',
        amountInr: 3999,
        status: 'due',
        method: 'upi',
        note: 'Resume after pause',
        dueAt: daysFromNow(7),
      },
      {
        id: 'p6',
        memberId: 'm8',
        amountInr: 3999,
        status: 'paid',
        method: 'upi',
        note: 'Quarterly Strength',
        paidAt: daysAgo(25),
        dueAt: daysAgo(25),
      },
    ],
    subscription: {
      planId: 'annual',
      status: 'active',
      renewsAt: daysFromNow(280),
      priceInr: 8999,
    },
  };
}
