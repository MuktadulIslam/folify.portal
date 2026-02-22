"use client";

import { useState } from "react";
import type { FooterProps } from "@/types/components";

const defaultColumns = [
  {
    heading: "Platform",
    links: [
      { label: "Course Catalog", href: "#" },
      { label: "Learning Paths", href: "#" },
      { label: "Instructors", href: "#" },
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

export default function NewsletterFooter({
  companyName = "LearnHub Academy",
  columns = defaultColumns,
  copyrightText = "2026 LearnHub Academy. All rights reserved.",
  showNewsletter = true,
  fontSize,
  color = "#166534",
  backgroundColor = "#f0fdf4",
  fontStyle,
  fontFamily,
  padding,
  margin,
  borderRadius,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={baseStyle} className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Newsletter Section */}
        {showNewsletter && (
          <div
            className="rounded-lg px-6 py-8 mb-10 text-center"
            style={{ backgroundColor: `${color}11` }}
          >
            <h3 className="text-lg font-bold mb-2">
              Stay Updated with New Courses
            </h3>
            <p className="text-sm opacity-75 mb-5 max-w-md mx-auto">
              Subscribe to our newsletter and never miss a new course launch,
              learning tip, or exclusive discount.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium opacity-90">
                Thank you for subscribing! Check your inbox for a confirmation.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 rounded-md text-sm border outline-none focus:ring-2 focus:ring-offset-1"
                  style={{
                    borderColor: `${color}33`,
                    color,
                    backgroundColor: "#ffffff",
                  }}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-md text-sm font-medium transition-opacity hover:opacity-90 shrink-0"
                  style={{
                    backgroundColor: color,
                    color: backgroundColor,
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        )}

        {/* Columns and Brand */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-3">{companyName}</h3>
            <p className="text-sm opacity-75 leading-relaxed">
              Unlock your potential with expert-crafted courses designed for
              every skill level.
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

        {/* Copyright */}
        <div
          className="border-t pt-5 text-center"
          style={{ borderColor: `${color}22` }}
        >
          <p className="text-xs opacity-60">&copy; {copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
