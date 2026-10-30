import type { ImageSourcePropType } from 'react-native';

export type OnboardingSlide = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  cta: string;
};

/** Matches Figma: Gymvero — Onboarding Carousel */
export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'welcome',
    image: require('./onboarding-welcome.jpg'),
    title: 'Run your gym from one place',
    subtitle:
      'Gymvero helps gym owners manage members, memberships, attendance, and dues — without the spreadsheet chaos.',
    cta: 'Next',
  },
  {
    id: 'members',
    image: require('./onboarding-members.jpg'),
    title: 'Members & memberships',
    subtitle:
      'Add members, assign monthly or annual plans, and see who’s active, paused, or due for renewal.',
    cta: 'Next',
  },
  {
    id: 'ops',
    image: require('./onboarding-ops.jpg'),
    title: 'Check-ins and dues, clear',
    subtitle:
      'Record today’s attendance and track outstanding payments so your front desk stays in sync.',
    cta: 'Get started',
  },
];
