"use client";

import type { CheckoutProps } from "@/types/components";
import { useState } from "react";

const defaultItems = [
  { name: "Introduction to Web Development", price: "$49.99", quantity: 1 },
  { name: "Advanced React Patterns", price: "$79.99", quantity: 1 },
  { name: "Node.js Masterclass", price: "$59.99", quantity: 2 },
];

export default function SimpleCheckout({
  heading = "Your Cart",
  items = defaultItems,
  totalLabel = "Total",
  buttonText = "Proceed to Checkout",
  showCouponField = true,
  fontSize,
  color = "#166534",
  backgroundColor = "#ffffff",
  fontStyle,
  fontFamily,
  padding = "32px",
  margin,
  borderRadius = "16px",
}: CheckoutProps) {
  const [coupon, setCoupon] = useState("");

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

  const parsePrice = (price: string) => {
    const num = parseFloat(price.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const total = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <div style={baseStyle} className="w-full max-w-2xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">{heading}</h2>

      {/* Items List */}
      <div className="flex flex-col gap-4 mb-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-4 px-4 rounded-lg"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm">{item.name}</span>
              <span className="text-xs" style={{ color: "#4ade80" }}>
                Qty: {item.quantity}
              </span>
            </div>
            <span className="font-bold text-sm">{item.price}</span>
          </div>
        ))}
      </div>

      {/* Coupon Field */}
      {showCouponField && (
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 rounded-lg text-sm outline-none"
            style={{
              border: "1.5px solid #bbf7d0",
              backgroundColor: "#fafffe",
              color: "#166534",
            }}
          />
          <button
            className="px-4 py-2 rounded-lg font-medium text-sm transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "transparent",
              color,
              border: `1.5px solid ${color}`,
            }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="w-full h-px mb-4" style={{ backgroundColor: "#bbf7d0" }} />

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-bold">{totalLabel}</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full py-3 rounded-lg font-semibold text-base transition-opacity hover:opacity-90"
        style={{
          backgroundColor: color,
          color: "#ffffff",
          border: "none",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
