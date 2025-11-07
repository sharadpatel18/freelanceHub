// stores/useAuthStore.ts
import { userType } from "@/types/auth-types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  success: boolean;
  message: string;
  data: userType;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
  getUserFromLocalStorage: () => User | null;
  getTokenFromLocalStorage: () => string | null;
  initializeFromLocalStorage: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token: string | null) => set({ token }),

      setSession: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      clearSession: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      // Get user directly from localStorage (synchronous)
      getUserFromLocalStorage: (): User | null => {
        try {
          const storage = localStorage.getItem("auth-storage");
          if (storage) {
            const parsed = JSON.parse(storage);
            return parsed.state?.user || null;
          }
          return null;
        } catch (error) {
          console.error("Error reading user from localStorage:", error);
          return null;
        }
      },

      // Get token directly from localStorage (synchronous)
      getTokenFromLocalStorage: (): string | null => {
        try {
          const storage = localStorage.getItem("auth-storage");
          if (storage) {
            const parsed = JSON.parse(storage);
            return parsed.state?.token || null;
          }
          return null;
        } catch (error) {
          console.error("Error reading token from localStorage:", error);
          return null;
        }
      },

      // Initialize store from localStorage (useful for SSR/SSG)
      initializeFromLocalStorage: () => {
        try {
          const storage = localStorage.getItem("auth-storage");
          if (storage) {
            const parsed = JSON.parse(storage);
            const user = parsed.state?.user;
            const token = parsed.state?.token;
            const isAuthenticated = parsed.state?.isAuthenticated;

            if (user && token) {
              set({
                user,
                token,
                isAuthenticated: !!isAuthenticated,
              });
            }
          }
        } catch (error) {
          console.error("Error initializing from localStorage:", error);
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
