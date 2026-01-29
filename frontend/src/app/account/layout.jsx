"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cart/cartSlice";
import Footer from "../components/Footer";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";


import AuthModal from "@/app/components/auth/AuthModal";


export default function AccountLayout({ children }) {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user, loading } = useAuth();
  

    // Block account UI until auth is resolved
    if (loading) {
        return null; // or a skeleton if you want
    }

    // User NOT logged in → show auth modal only
    if (!user) {
        return (
            <>
                <AuthModal onClose={() => { }} />
            </>
        );
    }

    const navItems = [
        {
            name: "Overview",
            href: "/account",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            name: "My Orders",
            href: "/account/orders",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            name: "Saved Addresses",
            href: "/account/addresses",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
    ];

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(clearCart());
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="sm:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 "
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="text-sm font-medium">Menu</span>
                </button>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}>
                        <div className="bg-white w-64 h-full  p-6" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Account</h2>
                                <button onClick={() => setMobileMenuOpen(false)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <ul className="space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                          ${isActive
                                                        ? "bg-black text-white shadow-lg"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {item.icon}
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="border-t border-gray-200 my-6" />

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all w-full"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex gap-6 lg:gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="w-64 shrink-0 hidden sm:block">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6  sticky top-6">
                            <h2 className="text-lg font-semibold mb-6 text-gray-900">Account</h2>

                            <ul className="space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                          ${isActive
                                                        ? "bg-black text-white shadow-lg"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {item.icon}
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="border-t border-gray-200 my-6" />

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all w-full"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1 min-w-0">{children}</main>
                </div>
            </div>

            <Footer />
        </div>
    );
}