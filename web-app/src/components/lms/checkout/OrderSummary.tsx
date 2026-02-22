"use client";

import type { CheckoutProps } from "@/types/components";

const defaultItems = [
  { name: "Introduction to Web Development", price: "$49.99", quantity: 1 },
  { name: "Advanced React Patterns", price: "$79.99", quantity: 1 },
  { name: "Node.js Masterclass", price: "$59.99", quantity: 2 },
];

export default function OrderSummary({
  heading = "Order Summary",
  items = defaultItems,
  totalLabel = "Total",
  buttonText = "Confirm Order",
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

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

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
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">{heading}</h2>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "#f0fdf4" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-sm">{item.name}</span>
                <span className="text-xs" style={{ color: "#86efac" }}>
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
            <span className="font-semibold text-sm flex-shrink-0">
              ${(parsePrice(item.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-4" style={{ backgroundColor: "#dcfce7" }} />

      {/* Coupon Field */}
      {showCouponField && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Coupon code"
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              border: "1.5px solid #bbf7d0",
              backgroundColor: "#fafffe",
              color: "#166534",
            }}
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

      {/* Subtotal, Tax, Total */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "#4ade80" }}>
            Subtotal
          </span>
          <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "#4ade80" }}>
            Tax ({(taxRate * 100).toFixed(0)}%)
          </span>
          <span className="text-sm font-medium">${tax.toFixed(2)}</span>
        </div>
        <div
          className="w-full h-px"
          style={{ backgroundColor: "#dcfce7" }}
        />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold">{totalLabel}</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        className="w-full py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
        style={{
          backgroundColor: color,
          color: "#ffffff",
          border: "none",
        }}
      >
        {buttonText}
      </button>

      {/* Secure Checkout Badge */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#86efac"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="text-xs" style={{ color: "#86efac" }}>
          Secure checkout powered by SSL encryption
        </span>
      </div>
    </div>
  );
}
