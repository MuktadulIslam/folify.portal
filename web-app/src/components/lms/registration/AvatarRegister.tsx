"use client";

import type { RegistrationProps } from "@/types/components";

const defaultFields = [
  { label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { label: "Email", type: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", placeholder: "Create a password" },
];

export default function AvatarRegister({
  heading = "Create an Account",
  subheading = "Upload a photo and fill in your details",
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
      {/* Avatar Upload */}
      <div className="flex flex-col items-center mb-8">
        <div
          className="relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer group"
          style={{
            backgroundColor: "#f0fdf4",
            border: `3px dashed ${color}`,
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>

          {/* Camera badge */}
          <div
            className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: color }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium" style={{ color }}>
          Upload Profile Photo
        </p>
        <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
          JPG, PNG or GIF (max 5MB)
        </p>
      </div>

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
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
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
