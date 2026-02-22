"use client";

import type { NavbarProps } from "@/types/components";

const defaultLinks = [
  { label: "Courses", href: "#courses" },
  { label: "My Learning", href: "#learning" },
  { label: "Certificates", href: "#certificates" },
  { label: "Community", href: "#community" },
];

export default function SimpleNavbar({
  logoText = "LearnHub",
  links = defaultLinks,
  fontSize,
  color = "#166534",
  backgroundColor = "#f0fdf4",
  fontStyle,
  fontFamily,
  padding = "16px 32px",
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
    <nav style={baseStyle} className="flex items-center justify-between w-full">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ backgroundColor: "#166534" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f0fdf4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight">{logoText}</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-8">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              className="font-medium transition-opacity hover:opacity-70"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 rounded-lg font-medium text-sm transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "transparent",
            color: "inherit",
            border: `1.5px solid ${color}`,
          }}
        >
          Log In
        </button>
        <button
          className="px-4 py-2 rounded-lg font-medium text-sm transition-opacity hover:opacity-90"
          style={{
            backgroundColor: color,
            color: backgroundColor,
            border: "none",
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
