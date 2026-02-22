"use client";

import type { CardProps } from "@/types/components";

export default function TestimonialCard({
  title = "Alex Johnson",
  description = "This course completely transformed my career. The instructor explained complex concepts in a way that was easy to understand. I landed my first developer job within 3 months!",
  imageUrl,
  badgeText = "Web Development Bootcamp",
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
      className="flex flex-col w-full max-w-sm"
    >
      {/* Quote Icon */}
      <div className="flex items-start">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="#dcfce7"
          stroke="#166534"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </div>

      {/* Testimonial Text */}
      <p
        className="text-sm leading-relaxed mt-4"
        style={{ fontStyle: "italic", opacity: 0.85 }}
      >
        &ldquo;{description}&rdquo;
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">
        {renderStars(rating ?? 0)}
      </div>

      {/* Divider */}
      <div className="mt-4 pt-4" style={{ borderTop: "1px solid #dcfce7" }}>
        <div className="flex items-center gap-3">
          {/* Student Avatar */}
          <div
            className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#f0fdf4",
              border: "2px solid #bbf7d0",
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
                width="18"
                height="18"
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

          {/* Student Name & Course */}
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{title}</span>
            {badgeText && (
              <span className="text-xs" style={{ opacity: 0.6 }}>
                {badgeText}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
