"use client";

import { useState } from "react";
import type { NavbarProps } from "@/types/components";

const defaultLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Paths", href: "#paths" },
  { label: "For Business", href: "#business" },
  { label: "Resources", href: "#resources" },
];

const megaMenuItems = [
  {
    heading: "Development",
    items: ["Web Development", "Mobile Apps", "Data Science", "DevOps"],
  },
  {
    heading: "Business",
    items: ["Marketing", "Finance", "Management", "Entrepreneurship"],
  },
  {
    heading: "Design",
    items: ["UI/UX Design", "Graphic Design", "3D Modeling", "Animation"],
  },
  {
    heading: "Personal",
    items: ["Productivity", "Leadership", "Communication", "Wellness"],
  },
];

export default function MegaMenuNavbar({
  logoText = "AcademyPro",
  links = defaultLinks,
  fontSize,
  color = "#166534",
  backgroundColor = "#f0fdf4",
  fontStyle,
  fontFamily,
  padding = "0px",
  margin,
  borderRadius,
}: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

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
    <div style={baseStyle} className="w-full relative">
      {/* Top Bar */}
      <div
        className="flex items-center justify-between w-full"
        style={{ padding: "12px 32px" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: `linear-gradient(135deg, #166534, #15803d)`,
            }}
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
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight">{logoText}</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-1">
          {links.map((link, idx) => (
            <li key={idx} className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                style={{
                  color: "inherit",
                  backgroundColor:
                    activeMenu === idx ? "rgba(22,101,52,0.1)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setActiveMenu(idx)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {link.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform:
                      activeMenu === idx ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
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
            className="px-5 py-2 rounded-lg font-medium text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: color,
              color: backgroundColor,
              border: "none",
            }}
          >
            Start Learning
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown (always visible as preview) */}
      <div
        className="w-full"
        style={{
          borderTop: "1px solid rgba(22,101,52,0.12)",
          padding: "20px 32px",
          backgroundColor: "rgba(22,101,52,0.03)",
        }}
        onMouseEnter={() => setActiveMenu(0)}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="grid grid-cols-4 gap-8">
          {megaMenuItems.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h3
                className="font-semibold text-sm uppercase tracking-wider opacity-70"
                style={{ color: "inherit" }}
              >
                {section.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        opacity: 0.85,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#15803d" }}
                      />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom CTA */}
        <div
          className="flex items-center justify-between mt-5 pt-4"
          style={{ borderTop: "1px solid rgba(22,101,52,0.1)" }}
        >
          <span className="text-sm opacity-60">
            Explore all 500+ courses across 12 categories
          </span>
          <a
            href="#"
            className="text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            View All Categories
          </a>
        </div>
      </div>
    </div>
  );
}
