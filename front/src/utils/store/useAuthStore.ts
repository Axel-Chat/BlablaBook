import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUserAuthStore {
  name: string,
  id: number,
}

interface IAuthState {
  user: IUserAuthStore | null
  token: string | null
  theme: "light" | "dark";
  login: (name: string, id: number, token: string) => void
  logout: () => void,
  setUser: (userData: IUserAuthStore) => void; // Allows you to update the user and make it available to all components
  setTheme: (theme: "light" | "dark") => void;
}

/**
 * Custom hook for managing authentication state with persistence.
 * Uses Zustand for state management and persist middleware for local storage.
 *
 * @returns {IAuthState} - The authentication state and methods.
 */
export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,  // Initialize user as null (not authenticated)
      token: null, // Initialize token as null (not authenticated)
      theme: "light",

      // Login function to set user data and token
      login: (name, id, token) => set(() => ({user: {name, id}, token})),

      // Logout function to clear user data and token
      logout: () => set({ user: null, token: null }),

      setUser: (userData) => set({ user: userData }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "auth-storage",  // Key for local storage
      partialize: (state) => ({ user: state.user, token: state.token, theme: state.theme, }),  // Specify which parts of state to persist
    }
  )
);
