"use client";

import type { CheckoutProps } from "@/types/components";
import { useState } from "react";

const defaultItems = [
  { name: "Introduction to Web Development", price: "$49.99", quantity: 1 },
  { name: "Advanced React Patterns", price: "$79.99", quantity: 1 },
  { name: "Node.js Masterclass", price: "$59.99", quantity: 2 },
];

const steps = ["Cart", "Billing", "Payment"];

export default function MultiStepCheckout({
  heading = "Checkout",
  items = defaultItems,
  totalLabel = "Total",
  buttonText = "Place Order",
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
  const [currentStep, setCurrentStep] = useState(0);

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

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div style={baseStyle} className="w-full max-w-2xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-8">{heading}</h2>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                style={{
                  backgroundColor:
                    idx <= currentStep ? color : "#dcfce7",
                  color: idx <= currentStep ? "#ffffff" : color,
                }}
              >
                {idx < currentStep ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className="text-xs font-semibold"
                style={{
                  color: idx <= currentStep ? color : "#86efac",
                }}
              >
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-4 mt-[-20px]"
                style={{
                  backgroundColor:
                    idx < currentStep ? color : "#dcfce7",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ backgroundColor: "#f0fdf4" }}
      >
        {/* Step 0: Cart */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg mb-2">Your Items</h3>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 px-4 rounded-lg"
                style={{ backgroundColor: "#ffffff" }}
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
            {showCouponField && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 px-4 py-2 rounded-lg text-sm outline-none"
                  style={{
                    border: "1.5px solid #bbf7d0",
                    backgroundColor: "#ffffff",
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
            <div className="flex items-center justify-between mt-2 pt-3" style={{ borderTop: "1px solid #bbf7d0" }}>
              <span className="font-bold">{totalLabel}</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Step 1: Billing */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg mb-2">Billing Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "First Name", placeholder: "John" },
                { label: "Last Name", placeholder: "Doe" },
                { label: "Email", placeholder: "john@example.com" },
                { label: "Phone", placeholder: "+1 (555) 000-0000" },
              ].map((field, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="px-4 py-2 rounded-lg text-sm outline-none"
                    style={{
                      border: "1.5px solid #bbf7d0",
                      backgroundColor: "#ffffff",
                      color: "#166534",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Address</label>
              <input
                type="text"
                placeholder="123 Main Street"
                className="px-4 py-2 rounded-lg text-sm outline-none"
                style={{
                  border: "1.5px solid #bbf7d0",
                  backgroundColor: "#ffffff",
                  color: "#166534",
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "City", placeholder: "New York" },
                { label: "State", placeholder: "NY" },
                { label: "Zip Code", placeholder: "10001" },
              ].map((field, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="px-4 py-2 rounded-lg text-sm outline-none"
                    style={{
                      border: "1.5px solid #bbf7d0",
                      backgroundColor: "#ffffff",
                      color: "#166534",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg mb-2">Payment Details</h3>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="px-4 py-2 rounded-lg text-sm outline-none"
                style={{
                  border: "1.5px solid #bbf7d0",
                  backgroundColor: "#ffffff",
                  color: "#166534",
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                className="px-4 py-2 rounded-lg text-sm outline-none"
                style={{
                  border: "1.5px solid #bbf7d0",
                  backgroundColor: "#ffffff",
                  color: "#166534",
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-4 py-2 rounded-lg text-sm outline-none"
                  style={{
                    border: "1.5px solid #bbf7d0",
                    backgroundColor: "#ffffff",
                    color: "#166534",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="px-4 py-2 rounded-lg text-sm outline-none"
                  style={{
                    border: "1.5px solid #bbf7d0",
                    backgroundColor: "#ffffff",
                    color: "#166534",
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-3" style={{ borderTop: "1px solid #bbf7d0" }}>
              <span className="font-bold">{totalLabel}</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "transparent",
            color: currentStep > 0 ? color : "#bbf7d0",
            border: `1.5px solid ${currentStep > 0 ? color : "#bbf7d0"}`,
            cursor: currentStep > 0 ? "pointer" : "default",
          }}
        >
          Back
        </button>
        <button
          onClick={goNext}
          className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
          style={{
            backgroundColor: color,
            color: "#ffffff",
            border: "none",
          }}
        >
          {currentStep === steps.length - 1 ? buttonText : "Continue"}
        </button>
      </div>
    </div>
  );
}
