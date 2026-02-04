"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/UserProfileContext";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  const loading = authLoading || profileLoading;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (profile?.role !== "ADMIN") {
      router.replace("/");
    }
  }, [user, profile, loading, router]);

  // 🚫 BLOCK EVERYTHING
  if (loading) return null;
  if (!user || profile?.role !== "ADMIN") return null;

  return children;
}
