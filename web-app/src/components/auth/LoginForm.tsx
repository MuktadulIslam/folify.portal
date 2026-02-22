"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { config as appConfig, routePaths } from "@/config";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Redirect to the original destination if provided, otherwise go to builder
      const callbackUrl = searchParams.get(appConfig.callbackUrlName) || routePaths.builder;
      router.push(callbackUrl);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="Enter your username"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="Enter your password"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-medium rounded-lg transition-colors"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <p className="text-center text-sm text-green-700">
        Don&apos;t have an account?{" "}
        <a href="/auth/register" className="text-green-600 font-medium hover:underline">
          Create one
        </a>
      </p>
    </form>
  );
}
