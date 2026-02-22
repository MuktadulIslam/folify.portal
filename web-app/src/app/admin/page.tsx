"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  fullName: string;
  email: string;
  address: string;
  username: string;
  createdAt: string;
}

interface Deployment {
  projectId: string;
  projectName: string;
  port: number;
  pid: number;
  lastDeployedAt: string;
  user: { username: string; fullName: string; email: string } | null;
}

type Tab = "users" | "deployments" | "create-user";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState<User[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingDeployments, setLoadingDeployments] = useState(false);
  const [terminatingId, setTerminatingId] = useState<string | null>(null);
  const [recovering, setRecovering] = useState(false);
  const [recoverResult, setRecoverResult] = useState<string | null>(null);

  // Create user form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    username: "",
    password: "",
    superKey: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      // ignore
    } finally {
      setLoadingUsers(false);
    }
  }, [router]);

  const fetchDeployments = useCallback(async () => {
    setLoadingDeployments(true);
    try {
      const res = await fetch("/api/admin/deployments");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setDeployments(data.deployments || []);
    } catch {
      // ignore
    } finally {
      setLoadingDeployments(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUsers();
    fetchDeployments();
  }, [fetchUsers, fetchDeployments]);

  async function handleRecover() {
    setRecovering(true);
    setRecoverResult(null);
    try {
      const res = await fetch("/api/admin/recover", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        const restarted = data.results?.filter((r: { status: string }) => r.status === "restarted").length ?? 0;
        const total = data.results?.length ?? 0;
        setRecoverResult(`Recovery complete: ${restarted} of ${total} deployments restarted.`);
        fetchDeployments();
      } else {
        setRecoverResult("Recovery failed: " + (data.error || "Unknown error"));
      }
    } catch {
      setRecoverResult("Recovery failed");
    } finally {
      setRecovering(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  async function handleTerminate(projectId: string) {
    setTerminatingId(projectId);
    try {
      const res = await fetch(`/api/admin/deployments/${projectId}`, { method: "DELETE" });
      if (res.ok) {
        setDeployments((prev) => prev.filter((d) => d.projectId !== projectId));
      }
    } finally {
      setTerminatingId(null);
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to create user");
        return;
      }

      setFormSuccess(`User "${data.user.username}" created successfully!`);
      setForm({ fullName: "", email: "", address: "", username: "", password: "", superKey: "" });
      fetchUsers();
    } catch {
      setFormError("Something went wrong");
    } finally {
      setFormLoading(false);
    }
  }

  function formField(label: string, key: keyof typeof form, type = "text", placeholder = "") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder={placeholder}
          required
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">Folify Admin</h1>
            <p className="text-xs text-gray-400">Super Admin Portal</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </header>

      {/* Stats bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-sm text-gray-400">
            <span className="font-semibold text-white">{users.length}</span> users
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-gray-400">
            <span className="font-semibold text-white">{deployments.length}</span> active deployments
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 w-fit mb-6">
          {(["users", "deployments", "create-user"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t === "users" && "Users"}
              {t === "deployments" && "Deployments"}
              {t === "create-user" && "Create User"}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold text-white">All Users</h2>
              <button
                onClick={fetchUsers}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            {loadingUsers ? (
              <div className="px-6 py-12 text-center text-gray-500">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">No users found</div>
            ) : (
              <div className="divide-y divide-gray-800">
                {users.map((user) => (
                  <div key={user._id} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-purple-800 flex items-center justify-center text-sm font-bold text-purple-200 flex-shrink-0">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white truncate">{user.fullName}</span>
                        <span className="text-xs text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">@{user.username}</span>
                      </div>
                      <div className="text-sm text-gray-400 truncate">{user.email}</div>
                      <div className="text-xs text-gray-500 truncate">{user.address}</div>
                    </div>
                    <div className="text-xs text-gray-500 flex-shrink-0">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Deployments Tab */}
        {tab === "deployments" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between gap-3 flex-wrap">
              <h2 className="font-semibold text-white">Active Deployments</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRecover}
                  disabled={recovering}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-900 hover:bg-yellow-800 disabled:bg-gray-800 text-yellow-300 disabled:text-gray-500 text-sm rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {recovering ? "Recovering..." : "Recover All"}
                </button>
                <button
                  onClick={fetchDeployments}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
            {recoverResult && (
              <div className="px-6 py-2 bg-yellow-950 border-b border-yellow-900 text-yellow-300 text-sm">
                {recoverResult}
              </div>
            )}
            {loadingDeployments ? (
              <div className="px-6 py-12 text-center text-gray-500">Loading deployments...</div>
            ) : deployments.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">No active deployments</div>
            ) : (
              <div className="divide-y divide-gray-800">
                {deployments.map((dep) => (
                  <div key={dep.projectId} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 mt-1"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white truncate">{dep.projectName}</span>
                        <span className="text-xs text-green-400 bg-green-950 border border-green-800 px-1.5 py-0.5 rounded font-mono">
                          :{dep.port}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">PID {dep.pid}</span>
                      </div>
                      {dep.user && (
                        <div className="text-sm text-gray-400">
                          {dep.user.fullName} <span className="text-gray-600">(@{dep.user.username})</span>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-3">
                        <a
                          href={`http://localhost:${dep.port}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          localhost:{dep.port}
                        </a>
                        <span>Deployed {new Date(dep.lastDeployedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTerminate(dep.projectId)}
                      disabled={terminatingId === dep.projectId}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900 hover:bg-red-800 disabled:bg-gray-800 text-red-300 disabled:text-gray-500 text-sm rounded-lg transition-colors flex-shrink-0"
                    >
                      {terminatingId === dep.projectId ? (
                        "Stopping..."
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Terminate
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create User Tab */}
        {tab === "create-user" && (
          <div className="max-w-lg">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-6">Create New User</h2>

              {formSuccess && (
                <div className="mb-4 px-4 py-3 bg-green-950 border border-green-800 text-green-400 rounded-lg text-sm">
                  {formSuccess}
                </div>
              )}
              {formError && (
                <div className="mb-4 px-4 py-3 bg-red-950 border border-red-800 text-red-400 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                {formField("Full Name", "fullName", "text", "John Doe")}
                {formField("Email", "email", "email", "john@example.com")}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="123 Main St, City, Country"
                    rows={2}
                    required
                  />
                </div>
                {formField("Username", "username", "text", "johndoe")}
                {formField("Password", "password", "password", "Min. 6 characters")}

                <div className="pt-2 border-t border-gray-800">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Super Key</label>
                  <input
                    type="password"
                    value={form.superKey}
                    onChange={(e) => setForm((f) => ({ ...f, superKey: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm with super key"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1.5">Required to authorize user creation</p>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:text-purple-400 text-white font-medium rounded-lg transition-colors"
                >
                  {formLoading ? "Creating User..." : "Create User"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
