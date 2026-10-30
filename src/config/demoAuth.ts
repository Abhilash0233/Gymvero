/** Store-review demo credentials. Replace with real auth after approval. */
export const DEMO_AUTH = {
  email: 'demo@gymvero.app',
  phone: '9876543210',
  password: 'GymveroDemo1!',
  gymId: 'gym_demo_001',
  ownerName: 'Alex Rivera',
  gymName: 'Fitness Hub',
} as const;

export function matchesDemoCredentials(
  emailOrPhone: string,
  password: string,
): boolean {
  const id = emailOrPhone.trim().toLowerCase();
  const pass = password.trim();
  const emailOk = id === DEMO_AUTH.email.toLowerCase();
  const phoneOk =
    id === DEMO_AUTH.phone ||
    id === `+91${DEMO_AUTH.phone}` ||
    id.replace(/\D/g, '') === DEMO_AUTH.phone;
  return (emailOk || phoneOk) && pass === DEMO_AUTH.password;
}
