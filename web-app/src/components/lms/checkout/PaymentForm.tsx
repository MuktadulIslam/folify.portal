"use client";

import type { CheckoutProps } from "@/types/components";
import { useState } from "react";

const defaultItems = [
  { name: "Introduction to Web Development", price: "$49.99", quantity: 1 },
  { name: "Advanced React Patterns", price: "$79.99", quantity: 1 },
];

export default function PaymentForm({
  heading = "Payment Details",
  items = defaultItems,
  totalLabel = "Total",
  buttonText = "Pay Now",
  showCouponField = false,
  fontSize,
  color = "#166534",
  backgroundColor = "#ffffff",
  fontStyle,
  fontFamily,
  padding = "32px",
  margin,
  borderRadius = "16px",
}: CheckoutProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

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

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const inputStyle: React.CSSProperties = {
    border: "1.5px solid #bbf7d0",
    backgroundColor: "#fafffe",
    color: "#166534",
  };

  const inputFocusStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: color,
  };

  return (
    <div style={baseStyle} className="w-full max-w-md mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "#dcfce7" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">{heading}</h2>
      </div>

      {/* Card Preview */}
      <div
        className="rounded-xl p-5 mb-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, #22c55e 100%)`,
          color: "#ffffff",
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            transform: "translate(-30%, 30%)",
          }}
        />
        <div className="flex items-center justify-between mb-8">
          <svg
            width="36"
            height="28"
            viewBox="0 0 36 28"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="35"
              height="27"
              rx="3.5"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.3)"
            />
            <rect x="4" y="8" width="10" height="8" rx="1" fill="rgba(255,255,255,0.5)" />
          </svg>
          <span className="text-xs font-medium" style={{ opacity: 0.8 }}>
            CREDIT CARD
          </span>
        </div>
        <div className="text-lg font-mono tracking-widest mb-4">
          {cardNumber || "---- ---- ---- ----"}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase" style={{ opacity: 0.7 }}>
              Card Holder
            </span>
            <span className="text-sm font-medium">
              {nameOnCard || "YOUR NAME"}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase" style={{ opacity: 0.7 }}>
              Expires
            </span>
            <span className="text-sm font-medium">
              {expiry || "MM/YY"}
            </span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold">Name on Card</label>
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            placeholder="John Doe"
            className="px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) =>
                setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="123"
              maxLength={4}
              className="px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>
        </div>
      </div>

      {/* Coupon Field */}
      {showCouponField && (
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Coupon code"
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
            style={inputStyle}
          />
          <button
            className="px-3 py-2 rounded-lg font-medium text-xs transition-opacity hover:opacity-80"
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

      {/* Total */}
      <div
        className="flex items-center justify-between py-4 px-4 rounded-lg mb-6"
        style={{ backgroundColor: "#f0fdf4" }}
      >
        <span className="font-bold">{totalLabel}</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>

      {/* Pay Button */}
      <button
        className="w-full py-3 rounded-lg font-semibold text-base transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
        style={{
          backgroundColor: color,
          color: "#ffffff",
          border: "none",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        {buttonText}
      </button>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#86efac"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-xs" style={{ color: "#86efac" }}>
          256-bit SSL encrypted payment
        </span>
      </div>
    </div>
  );
}
