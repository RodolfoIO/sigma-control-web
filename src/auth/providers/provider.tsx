import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "../store/auth.store";
import { Outlet } from "react-router";

export const AuthProvider = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <Outlet />;
};