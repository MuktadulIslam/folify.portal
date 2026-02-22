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

  // Terminate deployment modal state
  const [terminateDep, setTerminateDep] = useState<Deployment | null>(null);
  const [terminateConfirmText, setTerminateConfirmText] = useState("");
  const [terminateSuperKey, setTerminateSuperKey] = useState("");
  const [terminateLoading, setTerminateLoading] = useState(false);
  const [terminateError, setTerminateError] = useState("");
  const [recovering, setRecovering] = useState(false);
  const [recoverResult, setRecoverResult] = useState<string | null>(null);

  // Reset password modal state
  const [resetUser, setResetUser] = useState<User | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Delete user modal state
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteSuperKey, setDeleteSuperKey] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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

  async function handleTerminate() {
    if (!terminateDep) return;
    setTerminateError("");

    const expected = `Terminate ${terminateDep.projectName}`;
    if (terminateConfirmText !== expected) {
      setTerminateError(`Type exactly: Terminate ${terminateDep.projectName}`);
      return;
    }
    if (!terminateSuperKey) {
      setTerminateError("Super key is required.");
      return;
    }

    setTerminateLoading(true);
    setTerminatingId(terminateDep.projectId);
    try {
      const res = await fetch(`/api/admin/deployments/${terminateDep.projectId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ superKey: terminateSuperKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTerminateError(data.error || "Failed to terminate deployment");
        return;
      }
      setDeployments((prev) => prev.filter((d) => d.projectId !== terminateDep.projectId));
      setTerminateDep(null);
      setTerminateConfirmText("");
      setTerminateSuperKey("");
    } catch {
      setTerminateError("Something went wrong.");
    } finally {
      setTerminateLoading(false);
      setTerminatingId(null);
    }
  }

  async function handleResetPassword() {
    if (!resetUser) return;
    setResetError("");
    setResetSuccess("");

    if (!resetPassword) {
      setResetError("Password is required.");
      return;
    }
    if (resetPassword.length < 6) {
      setResetError("Password must be at least 6 characters.");
      return;
    }

    setResetLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: resetUser._id, newPassword: resetPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResetError(data.error || "Failed to reset password");
        return;
      }
      setResetSuccess("Password updated successfully.");
      setResetPassword("");
      setTimeout(() => {
        setResetUser(null);
        setResetSuccess("");
      }, 1500);
    } catch {
      setResetError("Something went wrong.");
    } finally {
      setResetLoading(false);
    }
  }

  async function handleDeleteUser() {
    if (!deleteUser) return;
    setDeleteError("");

    const expected = `Delete ${deleteUser.username}`;
    if (deleteConfirmText !== expected) {
      setDeleteError(`Type exactly: Delete ${deleteUser.username}`);
      return;
    }
    if (!deleteSuperKey) {
      setDeleteError("Super key is required.");
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: deleteUser._id, superKey: deleteSuperKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDeleteError(data.error || "Failed to delete user");
        return;
      }
      setUsers((prev) => prev.filter((u) => u._id !== deleteUser._id));
      setDeployments((prev) => prev.filter((d) => d.user?.username !== deleteUser.username));
      setDeleteUser(null);
      setDeleteConfirmText("");
      setDeleteSuperKey("");
    } catch {
      setDeleteError("Something went wrong.");
    } finally {
      setDeleteLoading(false);
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
                    <div className="w-9 h-9 rounded-full bg-purple-800 flex items-center justify-center text-sm font-bold text-purple-200 shrink-0">
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
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => {
                          setResetUser(user);
                          setResetPassword("");
                          setResetError("");
                          setResetSuccess("");
                        }}
                        className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs rounded-lg transition-colors border border-gray-700"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => { setDeleteUser(user); setDeleteError(""); setDeleteConfirmText(""); setDeleteSuperKey(""); }}
                        className="px-2.5 py-1 bg-red-950 hover:bg-red-900 text-red-400 hover:text-red-300 text-xs rounded-lg transition-colors border border-red-800"
                      >
                        Delete
                      </button>
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
                    <div className="w-2 h-2 rounded-full bg-green-400 shrink-0 mt-1"></div>
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
                      onClick={() => { setTerminateDep(dep); setTerminateConfirmText(""); setTerminateSuperKey(""); setTerminateError(""); }}
                      disabled={terminatingId === dep.projectId}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900 hover:bg-red-800 disabled:bg-gray-800 text-red-300 disabled:text-gray-500 text-sm rounded-lg transition-colors shrink-0"
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

      {/* Terminate Deployment Modal */}
      {terminateDep && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-white mb-1">Terminate Deployment</h3>
            <p className="text-sm text-gray-400 mb-1">
              You are about to terminate{" "}
              <span className="text-white font-medium">{terminateDep.projectName}</span>.
            </p>
            <p className="text-sm text-red-400 mb-5">
              The running process will be killed and the port freed. The project data will remain in the database.
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Type <span className="text-white font-mono">Terminate {terminateDep.projectName}</span> to confirm
                </label>
                <input
                  type="text"
                  value={terminateConfirmText}
                  onChange={(e) => setTerminateConfirmText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={`Terminate ${terminateDep.projectName}`}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Super Key</label>
                <input
                  type="password"
                  value={terminateSuperKey}
                  onChange={(e) => setTerminateSuperKey(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter super key"
                />
              </div>
            </div>

            {terminateError && (
              <div className="mb-4 px-3 py-2 bg-red-950 border border-red-800 text-red-400 rounded-lg text-sm">
                {terminateError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setTerminateDep(null); setTerminateConfirmText(""); setTerminateSuperKey(""); setTerminateError(""); }}
                disabled={terminateLoading}
                className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 text-gray-300 text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTerminate}
                disabled={terminateLoading}
                className="flex-1 py-2 bg-red-700 hover:bg-red-600 disabled:bg-red-950 disabled:text-red-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {terminateLoading ? "Terminating..." : "Terminate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {deleteUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-white mb-1">Delete User</h3>
            <p className="text-sm text-gray-400 mb-1">
              You are about to permanently delete{" "}
              <span className="text-white font-medium">@{deleteUser.username}</span>.
            </p>
            <p className="text-sm text-red-400 mb-5">
              All their projects will be terminated and deleted from the database and filesystem. This cannot be undone.
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Type <span className="text-white font-mono">Delete {deleteUser.username}</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={`Delete ${deleteUser.username}`}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Super Key</label>
                <input
                  type="password"
                  value={deleteSuperKey}
                  onChange={(e) => setDeleteSuperKey(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter super key"
                />
              </div>
            </div>

            {deleteError && (
              <div className="mb-4 px-3 py-2 bg-red-950 border border-red-800 text-red-400 rounded-lg text-sm">
                {deleteError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setDeleteUser(null); setDeleteConfirmText(""); setDeleteSuperKey(""); setDeleteError(""); }}
                disabled={deleteLoading}
                className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 text-gray-300 text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={deleteLoading}
                className="flex-1 py-2 bg-red-700 hover:bg-red-600 disabled:bg-red-950 disabled:text-red-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {deleteLoading ? "Deleting..." : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-white mb-1">Reset Password</h3>
            <p className="text-sm text-gray-400 mb-5">
              Set a new password for <span className="text-white font-medium">@{resetUser.username}</span>
            </p>

            {resetSuccess && (
              <div className="mb-4 px-3 py-2 bg-green-950 border border-green-800 text-green-400 rounded-lg text-sm">
                {resetSuccess}
              </div>
            )}
            {resetError && (
              <div className="mb-4 px-3 py-2 bg-red-950 border border-red-800 text-red-400 rounded-lg text-sm">
                {resetError}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">New Password</label>
              <input
                type="password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Min. 6 characters"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setResetUser(null); setResetPassword(""); setResetError(""); setResetSuccess(""); }}
                disabled={resetLoading}
                className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 text-gray-300 text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={resetLoading}
                className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:text-purple-400 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {resetLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
