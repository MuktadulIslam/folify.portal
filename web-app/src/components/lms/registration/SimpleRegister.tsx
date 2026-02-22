"use client";

import type { RegistrationProps } from "@/types/components";

const defaultFields = [
  { label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { label: "Email", type: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", placeholder: "Create a password" },
];

export default function SimpleRegister({
  heading = "Create an Account",
  subheading = "Start your learning journey today",
  buttonText = "Register",
  fields = defaultFields,
  fontSize,
  color = "#166534",
  backgroundColor = "#ffffff",
  fontStyle,
  fontFamily,
  padding = "40px",
  margin,
  borderRadius = "16px",
}: RegistrationProps) {
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
      className="w-full max-w-md mx-auto shadow-lg border border-green-100"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
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

      {/* Fields */}
      <div className="flex flex-col gap-5">
        {fields.map((field, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "#374151" }}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              readOnly
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                color: "#111827",
              }}
            />
          </div>
        ))}
      </div>

      {/* Register Button */}
      <button
        className="w-full mt-8 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
        style={{
          backgroundColor: color,
          color: "#ffffff",
          border: "none",
        }}
      >
        {buttonText}
      </button>

      {/* Footer */}
      <p className="text-center text-sm mt-6" style={{ color: "#9ca3af" }}>
        Already have an account?{" "}
        <span className="font-medium cursor-pointer" style={{ color }}>
          Sign in
        </span>
      </p>
    </div>
  );
}
