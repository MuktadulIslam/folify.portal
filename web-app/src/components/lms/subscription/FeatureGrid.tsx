"use client";

import type { SubscriptionProps } from "@/types/components";

const defaultPlans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    features: ["5 Courses", "Email Support", "Basic Certificate"],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "5 Courses",
      "Email Support",
      "Basic Certificate",
      "Unlimited Courses",
      "Priority Support",
      "Offline Access",
    ],
    highlighted: true,
    buttonText: "Go Pro",
  },
  {
    name: "Enterprise",
    price: "$79",
    period: "/month",
    features: [
      "5 Courses",
      "Email Support",
      "Basic Certificate",
      "Unlimited Courses",
      "Priority Support",
      "Offline Access",
      "Advanced Analytics",
      "Team Management",
      "Custom Branding",
    ],
    buttonText: "Contact Us",
  },
];

export default function FeatureGrid({
  heading = "Features by Plan",
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

  // Collect all unique features
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features))
  );

  // Determine which plans include each feature
  const featurePlanMap = allFeatures.map((feature) => ({
    feature,
    includedIn: plans
      .filter((plan) => plan.features.includes(feature))
      .map((plan) => ({ name: plan.name, highlighted: plan.highlighted })),
  }));

  // Plan color palette for badges
  const planColors: Record<string, { bg: string; text: string }> = {};
  const colorPalette = [
    { bg: "#dcfce7", text: "#166534" },
    { bg: "#bbf7d0", text: "#15803d" },
    { bg: "#86efac", text: "#14532d" },
    { bg: "#f0fdf4", text: "#166534" },
  ];
  plans.forEach((plan, idx) => {
    planColors[plan.name] = plan.highlighted
      ? { bg: "#22c55e", text: "#ffffff" }
      : colorPalette[idx % colorPalette.length];
  });

  return (
    <section style={baseStyle} className="w-full">
      <h2
        className="text-3xl font-bold text-center mb-4"
        style={{ color: color || "#166534" }}
      >
        {heading}
      </h2>

      {/* Plan legend */}
      <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
        {plans.map((plan, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: planColors[plan.name].bg === "#ffffff" ? "#22c55e" : planColors[plan.name].bg }}
            />
            <span className="text-sm font-medium" style={{ color: "#374151" }}>
              {plan.name}{" "}
              <span style={{ color: "#6b7280" }}>
                ({plan.price}{plan.period})
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {featurePlanMap.map(({ feature, includedIn }, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 rounded-xl p-5 border transition-shadow hover:shadow-md"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
            }}
          >
            {/* Feature icon + name */}
            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                style={{ backgroundColor: "#dcfce7" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#111827" }}
              >
                {feature}
              </span>
            </div>

            {/* Plan badges */}
            <div className="flex items-center gap-2 flex-wrap pl-11">
              {includedIn.map((plan, pIdx) => {
                const colors = planColors[plan.name];
                return (
                  <span
                    key={pIdx}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                    }}
                  >
                    {plan.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
