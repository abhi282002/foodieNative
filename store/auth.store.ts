import { getCurrentUser, User } from '@/lib/appwrite';
import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;

  setUser: (value: User | null) => void;

  setIsLoading: (value: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setUser: (value: User | null) => set({ user: value }),
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  fetchAuthenticatedUser: async () => {
    try {
      const user = await getCurrentUser();

      if (user) {
        set({ isAuthenticated: true, user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error('Fetch authenticated user error:', error);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
