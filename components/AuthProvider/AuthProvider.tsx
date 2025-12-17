'use client';

import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();

        if (user) {
          setUser(user);
          return;
        }

        // ✅ якщо user нема (401 або 304 без body) — це гість
        clearIsAuthenticated();
      } catch (e) {
        // ✅ будь-які інші помилки — не валимо апку
        console.error('AuthProvider getMe error:', e);
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
