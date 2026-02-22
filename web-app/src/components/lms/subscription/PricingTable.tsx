"use client";

import type { SubscriptionProps } from "@/types/components";

const defaultPlans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    features: ["5 Courses", "Basic Support", "Certificate of Completion"],
    buttonText: "Get Started",
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited Courses",
      "Priority Support",
      "Certificate of Completion",
      "Offline Access",
      "Progress Analytics",
    ],
    highlighted: true,
    buttonText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "$79",
    period: "/month",
    features: [
      "Unlimited Courses",
      "Dedicated Support",
      "Custom Certificates",
      "Offline Access",
      "Advanced Analytics",
      "Team Management",
    ],
    buttonText: "Contact Sales",
  },
];

export default function PricingTable({
  heading = "Choose Your Learning Plan",
  plans = defaultPlans,
  fontSize,
  color,
  backgroundColor,
  fontStyle,
  fontFamily,
  padding = "48px 24px",
  margin,
  borderRadius,
}: SubscriptionProps) {
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
    <section style={baseStyle} className="w-full">
      <h2
        className="text-3xl font-bold text-center mb-12"
        style={{ color: color || "#166534" }}
      >
        {heading}
      </h2>

      <div className="flex items-end justify-center gap-6 flex-wrap">
        {plans.map((plan, idx) => {
          const isHighlighted = plan.highlighted;

          return (
            <div
              key={idx}
              className={`relative flex flex-col rounded-2xl border transition-shadow ${
                isHighlighted
                  ? "shadow-xl scale-105 z-10"
                  : "shadow-md hover:shadow-lg"
              }`}
              style={{
                backgroundColor: isHighlighted ? "#f0fdf4" : "#ffffff",
                borderColor: isHighlighted ? "#22c55e" : "#e5e7eb",
                borderWidth: isHighlighted ? "2px" : "1px",
                width: "320px",
                padding: "32px",
              }}
            >
              {/* Popular badge */}
              {isHighlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full"
                  style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
                >
                  Most Popular
                </span>
              )}

              {/* Plan name */}
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#166534" }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{ color: isHighlighted ? "#15803d" : "#111827" }}
                >
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: "#6b7280" }}>
                  {plan.period}
                </span>
              </div>

              {/* Divider */}
              <div
                className="w-full h-px mb-6"
                style={{ backgroundColor: isHighlighted ? "#bbf7d0" : "#e5e7eb" }}
              />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-sm">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: "#374151" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: isHighlighted ? "#22c55e" : "transparent",
                  color: isHighlighted ? "#ffffff" : "#15803d",
                  border: isHighlighted ? "none" : "2px solid #22c55e",
                  cursor: "pointer",
                }}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
