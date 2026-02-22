"use client";

import type { CardProps } from "@/types/components";

export default function StatsCard({
  title = "12,500+",
  description = "Active Students",
  imageUrl,
  badgeText,
  rating,
  buttonText,
  price,
  fontSize,
  color = "#166534",
  backgroundColor = "#f0fdf4",
  fontStyle,
  fontFamily,
  padding = "24px",
  margin,
  borderRadius = "12px",
}: CardProps) {
  const baseStyle: React.CSSProperties = {
    fontSize,
    color,
    backgroundColor: undefined,
    fontStyle,
    fontFamily,
    padding,
    margin,
    borderRadius,
  };

  return (
    <div
      style={{
        ...baseStyle,
        background: `linear-gradient(135deg, ${backgroundColor} 0%, #dcfce7 100%)`,
        border: "1px solid #bbf7d0",
      }}
      className="flex flex-col items-center text-center w-full max-w-xs"
    >
      {/* Icon Placeholder */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: "56px",
          height: "56px",
          backgroundColor: "rgba(22, 101, 52, 0.1)",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={description}
            style={{ width: "28px", height: "28px", objectFit: "contain" }}
          />
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#166534"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        )}
      </div>

      {/* Big Number / Stat */}
      <h3
        className="font-extrabold mt-4"
        style={{ fontSize: "2.25rem", lineHeight: 1, letterSpacing: "-0.025em" }}
      >
        {title}
      </h3>

      {/* Label */}
      <p
        className="font-medium text-sm mt-2"
        style={{ opacity: 0.7 }}
      >
        {description}
      </p>

      {/* Badge (optional additional context) */}
      {badgeText && (
        <span
          className="mt-3 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: "rgba(22, 101, 52, 0.15)", color: "#166534" }}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
}
