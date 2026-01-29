'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import AuthModal from "@/app/components/auth/AuthModal";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser({ ...firebaseUser, token });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //  GLOBAL AUTH GUARD
  const requireAuth = (action) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    action();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        requireAuth,
        openAuthModal: () => setShowAuthModal(true),
        closeAuthModal: () => setShowAuthModal(false),
      }}
    >
      {children}

      {/* 🔥 Render AuthModal ONCE globally */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
