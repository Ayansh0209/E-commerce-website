"use client";

import { auth } from "@/firebase/firebaseClient";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export default function AuthModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
    onClose();
  };

  const emailLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    onClose();
  };

  const emailSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[350px] relative">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Login / Register</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={emailLogin} className="w-full bg-black text-white py-2 mb-2">
          Login
        </button>
        <button onClick={emailSignup} className="w-full border py-2 mb-2">
          Register
        </button>
        <button onClick={googleLogin} className="w-full border py-2">
          Continue with Google
        </button>
      </div>
    </div>
  );
}
