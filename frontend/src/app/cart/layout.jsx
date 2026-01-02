'use client';

import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

/* ---------- CONTEXT ---------- */
const CheckoutContext = createContext(null);
export const useCheckout = () => useContext(CheckoutContext);

/* ---------- STEPS ---------- */
const steps = ["BAG", "ADDRESS", "PAYMENT"];

export default function CartLayout({ children }) {
  const pathname = usePathname();

  // base step from URL
  const baseStep =
    pathname === "/cart" ? 0 :
    pathname === "/cart/address" ? 1 : 1;

  // virtual step (for Razorpay)
  const [paymentActive, setPaymentActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentStepIndex = completed
    ? 2
    : paymentActive
    ? 2
    : baseStep;

  return (
    <CheckoutContext.Provider
      value={{ setPaymentActive, setCompleted }}
    >
      <div className="min-h-screen bg-white">

        {/* Stepper */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-center gap-8 md:gap-16">
              {steps.map((label, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                  <div key={label} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center
                        text-sm font-bold
                        ${isCompleted
                          ? "bg-green-600 text-white"
                          : isActive
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-500"}`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>

                    <span
                      className={`ml-3 text-sm font-semibold tracking-wide
                        ${isActive ? "text-black" : "text-gray-500"}`}
                    >
                      {label}
                    </span>

                    {index < steps.length - 1 && (
                      <div className="hidden md:block w-16 lg:w-24 h-[2px] bg-gray-200 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </CheckoutContext.Provider>
  );
}
