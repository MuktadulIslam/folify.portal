"use client";

import type { RegistrationProps } from "@/types/components";

const defaultFields = [
  { label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { label: "Email", type: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", placeholder: "Create a password" },
];

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1f2937">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

export default function SocialRegister({
  heading = "Create an Account",
  subheading = "Choose your preferred registration method",
  buttonText = "Register",
  showSocialButtons = true,
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

  const socialButtons = [
    { label: "Google", icon: <GoogleIcon /> },
    { label: "GitHub", icon: <GitHubIcon /> },
    { label: "Microsoft", icon: <MicrosoftIcon /> },
  ];

  return (
    <div
      style={baseStyle}
      className="w-full max-w-md mx-auto shadow-lg border border-green-100"
    >
      {/* Header */}
      <div className="text-center mb-8">
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
          <div className="flex flex-col gap-3 mb-8">
            {socialButtons.map((btn, idx) => (
              <button
                key={idx}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#f9fafb",
                  color: "#374151",
                  border: "1.5px solid #e5e7eb",
                }}
              >
                {btn.icon}
                Continue with {btn.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
            <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
              OR REGISTER WITH EMAIL
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
          </div>
        </>
      )}

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
