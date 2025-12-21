'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';
import axios from 'axios';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setLoading = useAuthStore(state => state.setLoading);
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchMe = async (): Promise<User | null> => {
      const user = await getMe();
      return user;
    };

    const fetchUser = async () => {
      setLoading(true);

      try {
        const user = await fetchMe();

        if (user) {
          setUser(user);
          return;
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401) {
          try {
            const sessionChecked = await checkSession();

            if (!sessionChecked) {
              // clearIsAuthenticated();
              return;
            }

            const user = await fetchMe();
            if (user) {
              setUser(user);
              return;
            }

            // clearIsAuthenticated();
            return;
          } catch (err) {
            console.error('AuthProvider refresh/me error:', err);
            // clearIsAuthenticated();
            return;
          }
        }

        console.error('AuthProvider getMe error:', e);
        // clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setLoading, setUser]);

  return children;
};

export default AuthProvider;
