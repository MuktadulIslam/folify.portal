"use client";

import type { FooterProps } from "@/types/components";

const defaultColumns = [
  {
    heading: "Learning",
    links: [
      { label: "All Courses", href: "#" },
      { label: "Learning Paths", href: "#" },
      { label: "Certifications", href: "#" },
      { label: "Skill Assessments", href: "#" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discussion Forums", href: "#" },
      { label: "Study Groups", href: "#" },
      { label: "Mentorship", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "eBooks", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function MultiColumnFooter({
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top Section: Brand + Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-3">{companyName}</h3>
            <p className="text-sm opacity-75 leading-relaxed">
              Your gateway to knowledge. Learn anytime, anywhere with
              expert-led courses.
            </p>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-90">
                {column.heading}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm opacity-70 hover:opacity-100 hover:underline transition-opacity"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: `${color}22` }}
        >
          <p className="text-xs opacity-60">&copy; {copyrightText}</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs opacity-60 hover:opacity-100 hover:underline transition-opacity"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs opacity-60 hover:opacity-100 hover:underline transition-opacity"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-xs opacity-60 hover:opacity-100 hover:underline transition-opacity"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
