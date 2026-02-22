"use client";

import type { NavbarProps } from "@/types/components";

const defaultLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Courses", href: "#courses" },
  { label: "Progress", href: "#progress" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Help", href: "#help" },
];

export default function StickyNavbar({
  logoText = "StickEd",
  links = defaultLinks,
  sticky = true,
  fontSize,
  color = "#166534",
  backgroundColor = "#f0fdf4",
  fontStyle,
  fontFamily,
  padding = "10px 32px",
  margin,
  borderRadius,
}: NavbarProps) {
  const baseStyle: React.CSSProperties = {
    fontSize,
    color,
    backgroundColor,
    fontStyle,
    fontFamily,
    padding,
    margin,
    borderRadius,
    ...(sticky
      ? {
          position: "sticky" as const,
          top: 0,
          zIndex: 50,
          boxShadow: "0 2px 12px rgba(22,101,52,0.08)",
        }
      : {}),
  };

  return (
    <nav style={baseStyle} className="flex items-center justify-between w-full">
      {/* Left: Logo + Sticky Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-md"
            style={{
              background: "linear-gradient(135deg, #166534, #22c55e)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f0fdf4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">{logoText}</span>
        </div>

        {/* Sticky Badge */}
        {sticky && (
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: "rgba(22,101,52,0.12)",
              color: "#166534",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Sticky
          </span>
        )}
      </div>

      {/* Center: Navigation Links in a pill container */}
      <div
        className="flex items-center gap-1 px-2 py-1 rounded-full"
        style={{ backgroundColor: "rgba(22,101,52,0.06)" }}
      >
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              color: idx === 0 ? backgroundColor : "inherit",
              backgroundColor: idx === 0 ? color : "transparent",
              textDecoration: "none",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Streak Counter */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: "rgba(22,101,52,0.08)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#f59e0b"
            stroke="none"
          >
            <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" />
          </svg>
          <span>7 day streak</span>
        </div>

        {/* Avatar with status indicator */}
        <div className="relative">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm"
            style={{ backgroundColor: "#166534", color: "#f0fdf4" }}
          >
            JD
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
            style={{
              backgroundColor: "#22c55e",
              border: `2px solid ${backgroundColor}`,
            }}
          />
        </div>
      </div>
    </nav>
  );
}
