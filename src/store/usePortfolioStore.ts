import { create } from 'zustand';
import { ThemeMode, CustomCursorState, OwnerProfile, ProjectItem } from '../types';
import { initialProfile, initialProjects } from '../data/portfolioData';

interface PortfolioStore {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;

  cursor: CustomCursorState;
  setCursor: (cursor: CustomCursorState) => void;

  profile: OwnerProfile;
  updateProfile: (partial: Partial<OwnerProfile>) => void;

  projects: ProjectItem[];
  activeProjectModal: ProjectItem | null;
  openProjectModal: (project: ProjectItem) => void;
  closeProjectModal: () => void;

  isCustomizerOpen: boolean;
  setCustomizerOpen: (open: boolean) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;

  projectsViewMode: 'slides' | 'list';
  setProjectsViewMode: (mode: 'slides' | 'list') => void;

  isResumeModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  theme: (typeof window !== 'undefined' && localStorage.getItem('portfolio-theme') === 'light') ? 'light' : 'dark',
  toggleTheme: () =>
    set((state) => {
      const next: ThemeMode = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-theme', next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { theme: next };
    }),
  setTheme: (mode) =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-theme', mode);
        if (mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { theme: mode };
    }),

  cursor: { variant: 'default' },
  setCursor: (cursor) => set({ cursor }),

  profile: initialProfile,
  updateProfile: (partial) =>
    set((state) => ({ profile: { ...state.profile, ...partial } })),

  projects: initialProjects,
  activeProjectModal: null,
  openProjectModal: (project) => set({ activeProjectModal: project }),
  closeProjectModal: () => set({ activeProjectModal: null }),

  isCustomizerOpen: false,
  setCustomizerOpen: (open) => set({ isCustomizerOpen: open }),

  toastMessage: null,
  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3500);
  },
  hideToast: () => set({ toastMessage: null }),

  projectsViewMode: 'slides',
  setProjectsViewMode: (mode) => set({ projectsViewMode: mode }),

  isResumeModalOpen: false,
  openResumeModal: () => set({ isResumeModalOpen: true }),
  closeResumeModal: () => set({ isResumeModalOpen: false }),
}));
