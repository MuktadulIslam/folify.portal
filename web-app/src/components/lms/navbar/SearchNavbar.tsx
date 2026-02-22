"use client";

import type { NavbarProps } from "@/types/components";

const defaultLinks = [
  { label: "Browse", href: "#browse" },
  { label: "My Courses", href: "#courses" },
  { label: "Teach", href: "#teach" },
];

export default function SearchNavbar({
  logoText = "EduSearch",
  links = defaultLinks,
  showSearch = true,
  fontSize,
  color = "#166534",
  backgroundColor = "#f0fdf4",
  fontStyle,
  fontFamily,
  padding = "12px 32px",
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
  };

  return (
    <nav
      style={baseStyle}
      className="flex items-center justify-between w-full gap-6"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full"
          style={{ backgroundColor: "#166534" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f0fdf4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">{logoText}</span>
      </div>

      {/* Links */}
      <ul className="flex items-center gap-6 shrink-0">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              className="font-medium text-sm transition-opacity hover:opacity-70"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Search Bar */}
      {showSearch && (
        <div className="flex-1 max-w-xl">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(22,101,52,0.08)",
              border: "1.5px solid rgba(22,101,52,0.2)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 opacity-60"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search courses, topics, instructors..."
              className="w-full bg-transparent outline-none text-sm placeholder:opacity-50"
              style={{ color: "inherit", border: "none" }}
              readOnly
            />
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
          style={{ backgroundColor: "rgba(22,101,52,0.08)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
        {/* Avatar */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm"
          style={{ backgroundColor: "#166534", color: "#f0fdf4" }}
        >
          U
        </div>
      </div>
    </nav>
  );
}
