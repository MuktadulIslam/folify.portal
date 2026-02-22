"use client";

import type { LoginProps } from "@/types/components";

export default function SplitScreenLogin({
  heading = "Welcome Back",
  subheading = "Sign in to access your courses",
  buttonText = "Sign In",
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
    fontStyle,
    fontFamily,
    padding,
    margin,
    borderRadius,
  };

  return (
    <div
      style={baseStyle}
      className="flex w-full min-h-[600px] rounded-2xl overflow-hidden shadow-lg border border-green-100"
    >
      {/* Left Panel - Branding */}
      <div
        className="hidden md:flex md:w-1/2 flex-col justify-between p-12"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #15803d 50%, #22c55e 100%)",
        }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">LearnHub</span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Continue Your Learning Journey
          </h1>
          <p className="text-lg text-green-100 leading-relaxed">
            Access thousands of courses, track your progress, and earn
            certificates. Your next skill is just a login away.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-12">
          <div>
            <p className="text-3xl font-bold text-white">10K+</p>
            <p className="text-sm text-green-200">Courses</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">50K+</p>
            <p className="text-sm text-green-200">Students</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">95%</p>
            <p className="text-sm text-green-200">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12"
        style={{ backgroundColor }}
      >
        <div className="w-full max-w-sm">
          <div className="mb-8">
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
            <>
              <div className="flex gap-3 mb-6">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                  style={{
                    border: "1.5px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#374151",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
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
                  Google
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                  style={{
                    border: "1.5px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#374151",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#24292f"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#e5e7eb" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "#9ca3af" }}
                >
                  OR
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#e5e7eb" }}
                />
              </div>
            </>
          )}

          {/* Form Fields */}
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

          <p
            className="text-center text-sm mt-6"
            style={{ color: "#6b7280" }}
          >
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
    </div>
  );
}
