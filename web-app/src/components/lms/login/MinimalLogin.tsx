"use client";

import type { LoginProps } from "@/types/components";

export default function MinimalLogin({
  heading = "Sign In",
  subheading,
  buttonText = "Continue",
  showRememberMe = false,
  forgotPasswordText = "Forgot password?",
  fontSize,
  color = "#166534",
  backgroundColor = "transparent",
  fontStyle,
  fontFamily,
  padding = "32px 0",
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
      style={baseStyle}
      className="w-full max-w-sm mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold" style={{ color }}>
          {heading}
        </h2>
        {subheading && (
          <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>
            {subheading}
          </p>
        )}
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div>
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-0 py-3 text-sm outline-none"
            style={{
              border: "none",
              borderBottom: "1.5px solid #d1d5db",
              backgroundColor: "transparent",
              color: "#111827",
              borderRadius: 0,
            }}
            readOnly
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-0 py-3 text-sm outline-none"
            style={{
              border: "none",
              borderBottom: "1.5px solid #d1d5db",
              backgroundColor: "transparent",
              color: "#111827",
              borderRadius: 0,
            }}
            readOnly
          />
        </div>

        {(showRememberMe || forgotPasswordText) && (
          <div className="flex items-center justify-between pt-1">
            {showRememberMe && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded accent-green-700"
                  readOnly
                />
                <span className="text-xs" style={{ color: "#9ca3af" }}>
                  Remember me
                </span>
              </label>
            )}
            {forgotPasswordText && (
              <a
                href="#"
                className="text-xs font-medium hover:underline"
                style={{ color }}
              >
                {forgotPasswordText}
              </a>
            )}
          </div>
        )}

        <button
          className="w-full py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 mt-2"
          style={{
            backgroundColor: color,
            color: "#ffffff",
            border: "none",
          }}
        >
          {buttonText}
        </button>
      </div>

      {/* Sign Up */}
      <p className="text-xs mt-6" style={{ color: "#9ca3af" }}>
        No account?{" "}
        <a
          href="#"
          className="font-semibold hover:underline"
          style={{ color }}
        >
          Create one
        </a>
      </p>
    </div>
  );
}
