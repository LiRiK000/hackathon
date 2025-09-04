import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User } from '@shared/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    set => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: user => set({ user, isAuthenticated: true }, false, 'auth/login'),
      logout: () =>
        set({ user: null, isAuthenticated: false }, false, 'auth/logout'),
      setLoading: isLoading => set({ isLoading }, false, 'auth/setLoading'),
    }),
    {
      name: 'auth-store',
    }
  )
)

interface AppState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  toggleTheme: () => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    set => ({
      theme: 'light',
      sidebarCollapsed: false,
      toggleTheme: () =>
        set(
          state => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
          false,
          'app/toggleTheme'
        ),
      toggleSidebar: () =>
        set(
          state => ({ sidebarCollapsed: !state.sidebarCollapsed }),
          false,
          'app/toggleSidebar'
        ),
    }),
    {
      name: 'app-store',
    }
  )
)
