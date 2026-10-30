import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'gymvero.owner.session.v2';

export type OwnerSession = {
  gymId: string;
  gymName: string;
  ownerName: string;
  email: string;
};

export async function loadSession(): Promise<OwnerSession | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as OwnerSession;
    if (!parsed?.gymId || !parsed.gymName) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveSession(session: OwnerSession): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
