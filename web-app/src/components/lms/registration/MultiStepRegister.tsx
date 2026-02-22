"use client";

import { useState } from "react";
import type { RegistrationProps } from "@/types/components";

const defaultFields = [
  { label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { label: "Email", type: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", placeholder: "Create a password" },
];

const steps = [
  { label: "Personal", icon: "user" },
  { label: "Account", icon: "mail" },
  { label: "Preferences", icon: "settings" },
];

const stepFields: { label: string; type: string; placeholder: string }[][] = [
  [
    { label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { label: "Date of Birth", type: "date", placeholder: "Select date" },
  ],
  [
    { label: "Email", type: "email", placeholder: "Enter your email" },
    { label: "Password", type: "password", placeholder: "Create a password" },
  ],
  [
    { label: "Learning Goal", type: "text", placeholder: "e.g. Web Development" },
    { label: "Experience Level", type: "text", placeholder: "Beginner, Intermediate, Advanced" },
  ],
];

function StepIcon({ step, active, completed, color }: { step: string; active: boolean; completed: boolean; color: string }) {
  const strokeColor = active || completed ? "#ffffff" : color;

  if (step === "user") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
  if (step === "mail") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export default function MultiStepRegister({
  heading = "Create an Account",
  subheading = "Complete the steps below to get started",
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
  const [activeStep, setActiveStep] = useState(0);

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

  const currentFields = stepFields[activeStep] ?? fields;

  return (
    <div
      style={baseStyle}
      className="w-full max-w-lg mx-auto shadow-lg border border-green-100"
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

      {/* Stepper */}
      <div className="flex items-center justify-between mb-10 px-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center" style={{ flex: idx < steps.length - 1 ? 1 : "none" }}>
            {/* Step circle */}
            <button
              onClick={() => setActiveStep(idx)}
              className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none p-0"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all"
                style={{
                  backgroundColor: idx <= activeStep ? color : "#f0fdf4",
                  border: idx <= activeStep ? "none" : `2px solid ${color}`,
                }}
              >
                {idx < activeStep ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <StepIcon step={step.icon} active={idx === activeStep} completed={idx < activeStep} color={color} />
                )}
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: idx <= activeStep ? color : "#9ca3af" }}
              >
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-3 rounded-full"
                style={{
                  backgroundColor: idx < activeStep ? color : "#e5e7eb",
                  marginBottom: "24px",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Fields for current step */}
      <div className="flex flex-col gap-5">
        {currentFields.map((field, idx) => (
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

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 mt-8">
        {activeStep > 0 && (
          <button
            onClick={() => setActiveStep((s) => s - 1)}
            className="flex-1 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "transparent",
              color,
              border: `1.5px solid ${color}`,
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={() => {
            if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
          }}
          className="flex-1 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
          style={{
            backgroundColor: color,
            color: "#ffffff",
            border: "none",
          }}
        >
          {activeStep === steps.length - 1 ? buttonText : "Continue"}
        </button>
      </div>

      {/* Step indicator */}
      <p className="text-center text-xs mt-5" style={{ color: "#9ca3af" }}>
        Step {activeStep + 1} of {steps.length}
      </p>
    </div>
  );
}
