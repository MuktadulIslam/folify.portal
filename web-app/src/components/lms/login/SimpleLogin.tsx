"use client";

import type { LoginProps } from "@/types/components";

export default function SimpleLogin({
  heading = "Welcome Back",
  subheading = "Sign in to continue your learning journey",
  buttonText = "Sign In",
  showRememberMe = true,
  forgotPasswordText = "Forgot password?",
  fontSize,
  color = "#166534",
  backgroundColor = "#ffffff",
  fontStyle,
  fontFamily,
  padding,
  margin,
  borderRadius,
}: LoginProps) {
  const baseStyle: React.CSSProperties = {
    fontSize,
    color,
    backgroundColor,
    fontStyle,
    fontFamily,
    padding,
    margin,
    borderRadius,
  };

  return (
    <div
      className="flex items-center justify-center min-h-[600px] w-full"
      style={{ backgroundColor: "#f0fdf4" }}
    >
      <div
        style={baseStyle}
        className="w-full max-w-md rounded-2xl shadow-lg border border-green-100 p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
            style={{ backgroundColor: "#dcfce7" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold" style={{ color }}>
            {heading}
          </h2>
          {subheading && (
            <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
              {subheading}
            </p>
          )}
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "#374151" }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                color: "#111827",
              }}
              readOnly
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "#374151" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                color: "#111827",
              }}
              readOnly
            />
          </div>

          {/* Remember Me & Forgot Password */}
          {(showRememberMe || forgotPasswordText) && (
            <div className="flex items-center justify-between">
              {showRememberMe && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-green-700"
                    readOnly
                  />
                  <span className="text-sm" style={{ color: "#6b7280" }}>
                    Remember me
                  </span>
                </label>
              )}
              {forgotPasswordText && (
                <a
                  href="#"
                  className="text-sm font-medium hover:underline"
                  style={{ color }}
                >
                  {forgotPasswordText}
                </a>
              )}
            </div>
          )}

          {/* Button */}
          <button
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: color,
              color: "#ffffff",
              border: "none",
            }}
          >
            {buttonText}
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-6" style={{ color: "#6b7280" }}>
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="font-semibold hover:underline"
            style={{ color }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
