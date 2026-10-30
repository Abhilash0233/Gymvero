import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DEMO_AUTH, matchesDemoCredentials } from '../config/demoAuth';
import { clearAccountData, loadStore, resetStore } from '../data/mockStore';
import {
  clearSession,
  loadSession,
  saveSession,
  type OwnerSession,
} from '../session';

type AuthContextValue = {
  ready: boolean;
  session: OwnerSession | null;
  signIn: (emailOrPhone: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  /** Permanently delete account data available on this device and end the session. */
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<OwnerSession | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadStore();
      const existing = await loadSession();
      if (!cancelled) {
        setSession(existing);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (emailOrPhone: string, password: string) => {
    if (!matchesDemoCredentials(emailOrPhone, password)) {
      return 'Invalid email/phone or password. Use the demo credentials.';
    }
    const next: OwnerSession = {
      gymId: DEMO_AUTH.gymId,
      gymName: DEMO_AUTH.gymName,
      ownerName: DEMO_AUTH.ownerName,
      email: DEMO_AUTH.email,
    };
    await resetStore();
    await saveSession(next);
    setSession(next);
    return null;
  }, []);

  const signOut = useCallback(async () => {
    await clearSession();
    setSession(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    await clearAccountData();
    await clearSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ ready, session, signIn, signOut, deleteAccount }),
    [ready, session, signIn, signOut, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
