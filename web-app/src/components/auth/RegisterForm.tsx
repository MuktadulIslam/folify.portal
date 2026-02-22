"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    username: "",
    password: "",
    superKey: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/builder");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Full Name</label>
        <input
          type="text"
          value={form.fullName}
          onChange={handleChange("fullName")}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="john@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Address</label>
        <textarea
          value={form.address}
          onChange={handleChange("address")}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
          placeholder="123 Main St, City, Country"
          rows={2}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Username</label>
        <input
          type="text"
          value={form.username}
          onChange={handleChange("username")}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="Choose a username (min 3 chars)"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="Choose a password (min 6 chars)"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">Super Key</label>
        <input
          type="password"
          value={form.superKey}
          onChange={handleChange("superKey")}
          className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="Enter the super key"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-medium rounded-lg transition-colors"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
      <p className="text-center text-sm text-green-700">
        Already have an account?{" "}
        <a href="/auth/login" className="text-green-600 font-medium hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
