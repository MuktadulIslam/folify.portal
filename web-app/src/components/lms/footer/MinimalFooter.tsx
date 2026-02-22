"use client";

import type { FooterProps } from "@/types/components";

const defaultColumns = [
  {
    heading: "Links",
    links: [
      { label: "Courses", href: "#" },
      { label: "About", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function MinimalFooter({
  companyName = "LearnHub Academy",
  columns = defaultColumns,
  copyrightText = "2026 LearnHub Academy. All rights reserved.",
  fontSize,
  color = "#166534",
  backgroundColor = "#f0fdf4",
  fontStyle,
  fontFamily,
  padding,
  margin,
  borderRadius,
}: FooterProps) {
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

  const allLinks = columns.flatMap((col) => col.links);

  return (
    <footer style={baseStyle} className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-xs opacity-60">
          &copy; {copyrightText}
        </p>

        {/* Links */}
        <nav className="flex flex-wrap items-center gap-4">
          {allLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs opacity-60 hover:opacity-100 hover:underline transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
