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
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please login instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
        return "No account found with this email. Please sign up.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/invalid-credential":
        return "Invalid email or password. Please check and try again.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const googleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
      onClose();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      onClose();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    onClick={(e)=>e.stopPropagation}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        {/* Left side with promotion banner */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h3>
          <p className="text-gray-600 text-sm">
            Sign in to access exclusive features
          </p>
        </div>

        {/* Right side with login form */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Email input */}
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email or mobile phone number"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={loading}
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              disabled={loading}
            />
          </div>

          {/* Continue button */}
          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
          >
            {loading ? "PLEASE WAIT..." : "CONTINUE"}
          </button>

          {/* Terms text */}
          <p className="text-xs text-gray-500 text-center mb-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Notice
            </a>
            .
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Google login */}
          <button
            onClick={googleLogin}
            disabled={loading}
            className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Toggle sign up / login */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "New user? Create your account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}