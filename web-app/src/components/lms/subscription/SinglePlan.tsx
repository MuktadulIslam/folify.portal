"use client";

import type { SubscriptionProps } from "@/types/components";

const defaultPlans = [
  {
    name: "Professional Plan",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited Course Access",
      "Priority Support",
      "Certificate of Completion",
      "Offline Downloads",
      "Progress Analytics",
      "Community Access",
    ],
    highlighted: true,
    buttonText: "Start Free Trial",
  },
];

export default function SinglePlan({
  heading = "Everything You Need to Learn",
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

  // Use the first plan (or the first highlighted one)
  const plan = plans.find((p) => p.highlighted) || plans[0];

  return (
    <section style={baseStyle} className="w-full flex justify-center">
      <div
        className="w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Header band */}
        <div
          className="w-full py-6 px-8 text-center"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
          }}
        >
          <h2
            className="text-2xl font-bold mb-1"
            style={{ color: "#ffffff" }}
          >
            {heading}
          </h2>
          <p className="text-sm" style={{ color: "#bbf7d0" }}>
            {plan.name}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-1 py-8">
          <span
            className="text-5xl font-extrabold"
            style={{ color: "#15803d" }}
          >
            {plan.price}
          </span>
          <span className="text-base" style={{ color: "#6b7280" }}>
            {plan.period}
          </span>
        </div>

        {/* Divider */}
        <div
          className="mx-8 h-px"
          style={{ backgroundColor: "#e5e7eb" }}
        />

        {/* Features list */}
        <ul className="flex flex-col gap-4 px-8 py-8">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#dcfce7" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#374151" }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="px-8 pb-8">
          <button
            className="w-full py-3.5 rounded-xl font-bold text-base transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {plan.buttonText}
          </button>
          <p
            className="text-center text-xs mt-3"
            style={{ color: "#9ca3af" }}
          >
            Cancel anytime. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
