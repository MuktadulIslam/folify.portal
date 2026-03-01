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

  const inputCls = "w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow";
  const labelCls = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <label className={labelCls}>Full Name</label>
        <input type="text" value={form.fullName} onChange={handleChange("fullName")} className={inputCls} placeholder="John Doe" required />
      </div>
      <div>
        <label className={labelCls}>Email</label>
        <input type="email" value={form.email} onChange={handleChange("email")} className={inputCls} placeholder="john@example.com" required />
      </div>
      <div>
        <label className={labelCls}>Address</label>
        <textarea value={form.address} onChange={handleChange("address")} className={inputCls + " resize-none"} placeholder="123 Main St, City, Country" rows={2} required />
      </div>
      <div>
        <label className={labelCls}>Username</label>
        <input type="text" value={form.username} onChange={handleChange("username")} className={inputCls} placeholder="Choose a username (min 3 chars)" required />
      </div>
      <div>
        <label className={labelCls}>Password</label>
        <input type="password" value={form.password} onChange={handleChange("password")} className={inputCls} placeholder="Choose a password (min 6 chars)" required />
      </div>
      <div>
        <label className={labelCls}>Super Key</label>
        <input type="password" value={form.superKey} onChange={handleChange("superKey")} className={inputCls} placeholder="Enter the super key" required />
      </div>
      {error && (
        <div className="px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-lg transition-colors shadow-sm"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a href="/auth/login" className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
