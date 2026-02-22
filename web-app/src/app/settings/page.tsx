"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Check, Eye, EyeOff } from "lucide-react";
import { routePaths } from "@/config";

export default function SettingsPage() {
  const router = useRouter();

  // Profile state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // UI state
  const [fetching, setFetching] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (userData.user) {
          setFullName(userData.user.fullName);
          setEmail(userData.user.email);
        }
      } catch {
        setProfileError("Failed to load your information.");
      } finally {
        setFetching(false);
      }
    }
    loadData();
  }, []);

  async function handleSaveProfile() {
    setProfileError(null);
    setProfileSaved(false);

    if (!fullName.trim() || !email.trim()) {
      setProfileError("Name and email are required.");
      return;
    }

    setProfileLoading(true);
    try {
      const userRes = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email }),
      });
      if (!userRes.ok) {
        const data = await userRes.json();
        setProfileError(data.error || "Failed to update profile.");
        return;
      }

      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch {
      setProfileError("Something went wrong. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleChangePassword() {
    setPasswordError(null);
    setPasswordSaved(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, currentPassword, newPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        setPasswordError(data.error || "Failed to update password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 3000);
    } catch {
      setPasswordError("Something went wrong. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Top bar */}
      <div className="bg-white border-b border-green-200 px-6 h-14 flex items-center gap-4">
        <button
          onClick={() => router.push(routePaths.home)}
          className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <span className="text-green-200">|</span>
        <h1 className="text-sm font-semibold text-green-900">Account Settings</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-green-500" />
          </div>
        ) : (
          <>
            {/* Profile section */}
            <div className="bg-white rounded-xl border border-green-100 shadow-sm">
              <div className="px-6 py-4 border-b border-green-100">
                <h2 className="text-sm font-semibold text-green-900">Profile</h2>
                <p className="text-xs text-green-500 mt-0.5">Update your name and email</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                {profileError && <p className="text-xs text-red-600">{profileError}</p>}
              </div>
              <div className="px-6 py-4 border-t border-green-100 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={profileLoading}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
                >
                  {profileLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : profileSaved ? (
                    <Check className="w-4 h-4" />
                  ) : null}
                  {profileLoading ? "Saving..." : profileSaved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Password section */}
            <div className="bg-white rounded-xl border border-green-100 shadow-sm">
              <div className="px-6 py-4 border-b border-green-100">
                <h2 className="text-sm font-semibold text-green-900">Change Password</h2>
                <p className="text-xs text-green-500 mt-0.5">Set a new password for your account</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600"
                    >
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="Repeat new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
              </div>
              <div className="px-6 py-4 border-t border-green-100 flex justify-end">
                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
                >
                  {passwordLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : passwordSaved ? (
                    <Check className="w-4 h-4" />
                  ) : null}
                  {passwordLoading ? "Updating..." : passwordSaved ? "Password Updated!" : "Update Password"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
