import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSeedStore } from './seed';
import type { MockStore } from './types';

const STORAGE_KEY = 'gymvero.mock.store.v2';

let memory: MockStore | null = null;
let listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

export function subscribeStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function loadStore(): Promise<MockStore> {
  if (memory) return memory;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      memory = JSON.parse(raw) as MockStore;
      return memory;
    }
  } catch {
    // fall through to seed
  }
  memory = createSeedStore();
  await persistStore();
  return memory;
}

export function getStoreSync(): MockStore {
  if (!memory) {
    memory = createSeedStore();
  }
  return memory;
}

export async function persistStore(): Promise<void> {
  if (!memory) return;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  notify();
}

export async function updateStore(
  mutator: (store: MockStore) => void,
): Promise<MockStore> {
  const store = await loadStore();
  mutator(store);
  memory = store;
  await persistStore();
  return store;
}

export async function resetStore(): Promise<MockStore> {
  memory = createSeedStore();
  await persistStore();
  return memory;
}

/** Wipe persisted gym data for account deletion (device-local in v1). */
export async function clearAccountData(): Promise<void> {
  memory = null;
  await AsyncStorage.removeItem(STORAGE_KEY);
  // Do not notify/reseed here — UI clears on sign-out; next sign-in reseeds.
}
