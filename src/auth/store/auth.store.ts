import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  checkAuth: async () => {
    set({ loading: true });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    set({
      user: session?.user ?? null,
      loading: false,
    });
  },

  logout: async () => {
    await supabase.auth.signOut();

    set({
      user: null,
    });
  },
}));