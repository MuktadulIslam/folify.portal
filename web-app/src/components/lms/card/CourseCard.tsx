"use client";

import type { CardProps } from "@/types/components";

export default function CourseCard({
  title = "Introduction to Web Development",
  description = "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites from scratch.",
  imageUrl,
  badgeText = "Bestseller",
  rating = 4,
  price = "$49.99",
  buttonText = "Enroll Now",
  fontSize,
  color = "#166534",
  backgroundColor = "#ffffff",
  fontStyle,
  fontFamily,
  padding = "0px",
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
        width="16"
        height="16"
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
      style={{ ...baseStyle, border: "1px solid #dcfce7", overflow: "hidden" }}
      className="flex flex-col w-full max-w-sm"
    >
      {/* Image Placeholder */}
      <div
        className="w-full flex items-center justify-center relative"
        style={{ backgroundColor: "#f0fdf4", height: "180px" }}
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
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#166534"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.4 }}
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        )}
        {badgeText && (
          <span
            className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-semibold"
            style={{ backgroundColor: "#166534", color: "#f0fdf4" }}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <h3 className="font-bold text-lg leading-tight">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>
          {description}
        </p>

        {/* Rating & Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {renderStars(rating ?? 0)}
            <span className="text-xs font-medium ml-1" style={{ opacity: 0.6 }}>
              ({rating?.toFixed(1)})
            </span>
          </div>
          {price && (
            <span className="font-bold text-base">{price}</span>
          )}
        </div>

        {/* Enroll Button */}
        {buttonText && (
          <button
            className="w-full mt-1 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: color,
              color: "#f0fdf4",
              border: "none",
              cursor: "pointer",
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
