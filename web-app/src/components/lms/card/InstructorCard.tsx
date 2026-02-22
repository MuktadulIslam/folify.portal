"use client";

import type { CardProps } from "@/types/components";

export default function InstructorCard({
  title = "Dr. Sarah Mitchell",
  description = "Senior Software Engineer with 10+ years of experience in full-stack development and a passion for teaching.",
  imageUrl,
  badgeText = "Top Instructor",
  rating = 5,
  buttonText,
  price,
  fontSize,
  color = "#166534",
  backgroundColor = "#ffffff",
  fontStyle,
  fontFamily,
  padding = "24px",
  margin,
  borderRadius = "12px",
}: CardProps) {
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

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={i < count ? "#166534" : "none"}
        stroke="#166534"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <div
      style={{ ...baseStyle, border: "1px solid #dcfce7" }}
      className="flex flex-col items-center text-center w-full max-w-xs"
    >
      {/* Avatar Circle */}
      <div
        className="flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: "96px",
          height: "96px",
          backgroundColor: "#f0fdf4",
          border: "3px solid #bbf7d0",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#166534"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.4 }}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>

      {/* Badge */}
      {badgeText && (
        <span
          className="mt-3 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: "#dcfce7", color: "#166534" }}
        >
          {badgeText}
        </span>
      )}

      {/* Instructor Name */}
      <h3 className="font-bold text-lg mt-3">{title}</h3>

      {/* Bio */}
      <p className="text-sm leading-relaxed mt-2" style={{ opacity: 0.75 }}>
        {description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-3">
        {renderStars(rating ?? 0)}
        <span className="text-xs font-medium ml-1" style={{ opacity: 0.6 }}>
          {rating?.toFixed(1)}
        </span>
      </div>

      {/* Stats Row */}
      <div
        className="flex items-center justify-center gap-6 mt-4 pt-4 w-full"
        style={{ borderTop: "1px solid #dcfce7" }}
      >
        <div className="flex flex-col items-center">
          <span className="font-bold text-base">12</span>
          <span className="text-xs" style={{ opacity: 0.6 }}>
            Courses
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-base">8.4k</span>
          <span className="text-xs" style={{ opacity: 0.6 }}>
            Students
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-base">156</span>
          <span className="text-xs" style={{ opacity: 0.6 }}>
            Reviews
          </span>
        </div>
      </div>
    </div>
  );
}
