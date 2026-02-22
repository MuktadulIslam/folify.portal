"use client";

import type { LoginProps } from "@/types/components";

export default function SocialLogin({
  heading = "Sign In",
  subheading = "Choose your preferred sign-in method",
  buttonText = "Sign In with Email",
  showSocialButtons = true,
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
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color }}>
            {heading}
          </h2>
          {subheading && (
            <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
              {subheading}
            </p>
          )}
        </div>

        {/* Social Buttons */}
        {showSocialButtons && (
          <div className="space-y-3 mb-6">
            {/* Google */}
            <button
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                border: "1.5px solid #d1d5db",
                backgroundColor: "#ffffff",
                color: "#374151",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                border: "1.5px solid #d1d5db",
                backgroundColor: "#ffffff",
                color: "#374151",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#24292f"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>

            {/* Facebook */}
            <button
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                border: "1.5px solid #d1d5db",
                backgroundColor: "#ffffff",
                color: "#374151",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#1877F2"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continue with Facebook
            </button>
          </div>
        )}

        {/* Divider */}
        {showSocialButtons && (
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
            <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
              OR
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
          </div>
        )}

        {/* Email/Password Form */}
        <div className="space-y-4">
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
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
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
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                color: "#111827",
              }}
              readOnly
            />
          </div>

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
