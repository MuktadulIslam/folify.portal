"use client";

import type { FooterProps } from "@/types/components";

const defaultColumns = [
  {
    heading: "Courses",
    links: [
      { label: "Browse Courses", href: "#" },
      { label: "Popular Courses", href: "#" },
      { label: "New Releases", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
];

export default function SimpleFooter({
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

  return (
    <footer style={baseStyle} className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Company Name */}
        <div className="mb-6">
          <h3 className="text-xl font-bold">{companyName}</h3>
          <p className="text-sm mt-1 opacity-75">
            Empowering learners worldwide with quality education.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
          {columns.map((column) =>
            column.links.map((link) => (
              <a
                key={`${column.heading}-${link.label}`}
                href={link.href}
                className="text-sm hover:underline opacity-80 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            ))
          )}
        </div>

        {/* Divider and Copyright */}
        <div
          className="border-t pt-4"
          style={{ borderColor: `${color}22` }}
        >
          <p className="text-xs opacity-60">&copy; {copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
