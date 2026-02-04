"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/UserProfileContext";

export default function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  const loading = authLoading || profileLoading;

  // 🔐 HARD BLOCK BEFORE RENDER
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

  // 🚫 NOTHING renders
  if (loading) return null;
  if (!user || profile?.role !== "ADMIN") return null;

  const navItem = (href, label, icon) => (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        pathname === href
          ? "bg-purple-600 text-white"
          : "hover:bg-white/10"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );

  // ✅ ADMIN ONLY UI
  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-[#0B0F1A] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`w-64 p-6 ${
          darkMode ? "bg-[#11162A]" : "bg-white border-r"
        }`}
      >
        <h1 className="text-2xl font-bold mb-10">
          Faltu<span className="text-purple-500">Admin</span>
        </h1>

        <nav className="space-y-2">
          {navItem("/Admin", "Dashboard", "📊")}
          {navItem("/Admin/products", "Products", "📦")}
          {navItem("/Admin/orders", "Orders", "🧾")}
          {navItem("/Admin/customers", "Customers", "👥")}
        </nav>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-10 w-full bg-purple-600 py-2 rounded-lg"
        >
          Toggle Theme
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
