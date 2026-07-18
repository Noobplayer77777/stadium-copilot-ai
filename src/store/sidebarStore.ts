import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      isCollapsed: false,
      isMobileOpen: false,
      collapse: () => set({ isCollapsed: true }),
      expand: () => set({ isCollapsed: false }),
      toggle: () => set({ isCollapsed: !get().isCollapsed }),
      openMobile: () => set({ isMobileOpen: true }),
      closeMobile: () => set({ isMobileOpen: false }),
      toggleMobile: () => set({ isMobileOpen: !get().isMobileOpen }),
    }),
    { name: 'stadium-copilot-sidebar' }
  )
);
