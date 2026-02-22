"use client";

import type { SubscriptionProps } from "@/types/components";

const defaultPlans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    features: ["5 Courses", "Email Support", "Certificate of Completion"],
    buttonText: "Choose Basic",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "5 Courses",
      "Email Support",
      "Certificate of Completion",
      "Unlimited Courses",
      "Priority Support",
      "Offline Access",
    ],
    highlighted: true,
    buttonText: "Choose Pro",
  },
  {
    name: "Business",
    price: "$79",
    period: "/month",
    features: [
      "5 Courses",
      "Email Support",
      "Certificate of Completion",
      "Unlimited Courses",
      "Priority Support",
      "Offline Access",
      "Advanced Analytics",
      "Team Management",
      "Custom Branding",
    ],
    buttonText: "Choose Business",
  },
];

export default function ComparisonPlan({
  heading = "Compare Plans",
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

  // Collect all unique features across plans
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features))
  );

  return (
    <section style={baseStyle} className="w-full">
      <h2
        className="text-3xl font-bold text-center mb-12"
        style={{ color: color || "#166534" }}
      >
        {heading}
      </h2>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: "600px" }}>
          {/* Header row: plan names + prices */}
          <thead>
            <tr>
              <th
                className="text-left py-4 px-4 text-sm font-medium"
                style={{
                  color: "#6b7280",
                  borderBottom: "2px solid #e5e7eb",
                  width: "30%",
                }}
              >
                Features
              </th>
              {plans.map((plan, idx) => (
                <th
                  key={idx}
                  className="text-center py-4 px-4"
                  style={{
                    borderBottom: "2px solid #e5e7eb",
                    backgroundColor: plan.highlighted ? "#f0fdf4" : "transparent",
                  }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{ color: plan.highlighted ? "#15803d" : "#111827" }}
                  >
                    {plan.name}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: plan.highlighted ? "#15803d" : "#374151" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      {plan.period}
                    </span>
                  </div>
                  {plan.highlighted && (
                    <span
                      className="inline-block mt-2 text-xs font-semibold px-3 py-0.5 rounded-full"
                      style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
                    >
                      Recommended
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Feature rows */}
          <tbody>
            {allFeatures.map((feature, fIdx) => (
              <tr key={fIdx}>
                <td
                  className="py-3 px-4 text-sm font-medium"
                  style={{
                    color: "#374151",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {feature}
                </td>
                {plans.map((plan, pIdx) => {
                  const hasFeature = plan.features.includes(feature);
                  return (
                    <td
                      key={pIdx}
                      className="text-center py-3 px-4"
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        backgroundColor: plan.highlighted
                          ? "#f0fdf4"
                          : "transparent",
                      }}
                    >
                      {hasFeature ? (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="inline-block"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#d1d5db"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="inline-block"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          {/* CTA row */}
          <tfoot>
            <tr>
              <td className="py-6 px-4" />
              {plans.map((plan, idx) => (
                <td
                  key={idx}
                  className="text-center py-6 px-4"
                  style={{
                    backgroundColor: plan.highlighted ? "#f0fdf4" : "transparent",
                  }}
                >
                  <button
                    className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: plan.highlighted ? "#22c55e" : "transparent",
                      color: plan.highlighted ? "#ffffff" : "#15803d",
                      border: plan.highlighted ? "none" : "2px solid #22c55e",
                      cursor: "pointer",
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
