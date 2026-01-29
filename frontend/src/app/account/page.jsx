"use client";

import { useUserProfile } from "@/context/UserProfileContext";

export default function AccountPage() {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-6"></div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

 if (!profile && !loading) {
  return (
    <div className="w-full">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Error Loading Profile
        </h3>
        <p className="text-sm text-red-700">
          We couldn't load your account information. Please refresh the page.
        </p>
      </div>
    </div>
  );
}


  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Account Overview
        </h1>
        <p className="text-sm text-gray-500">
          Manage your account information and preferences
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 sm:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-900 ">
              {profile.firstName?.[0]?.toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-300 mb-1">Welcome back,</p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                {profile.firstName}
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 transition-all group-hover:border-gray-300">
                <p className="font-medium text-gray-900">
                  {profile.firstName} {profile.lastName || ""}
                </p>
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 transition-all group-hover:border-gray-300">
                <p className="font-medium text-gray-900 break-all">
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Mobile Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Mobile Number
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 transition-all group-hover:border-gray-300">
                <p className="font-medium text-gray-900">
                  {profile.mobile || (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </p>
              </div>
            </div>

            {/* Account Status */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Account Status
              </label>
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 transition-all">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p className="font-medium text-green-900">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}