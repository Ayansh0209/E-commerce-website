'use client';

import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

/* ---------- CONTEXT ---------- */
const CheckoutContext = createContext(null);
export const useCheckout = () => useContext(CheckoutContext);

/* ---------- STEPS ---------- */
const steps = ["BAG", "ADDRESS", "PAYMENT"];
function CartNavbar() {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-4">
      <span className="text-lg font-bold tracking-wide">FF</span>
    </div>
  );
}

export default function CartLayout({ children }) {
  const pathname = usePathname();
const { cart } = useSelector(state => state.cart);
const isCartEmpty = !cart || cart.items?.length === 0;

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
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex items-start justify-center gap-6 sm:gap-8 md:gap-16">


              {steps.map((label, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                  <div
                    key={label}
                    className="flex flex-col sm:flex-row items-center
             min-w-[64px] sm:min-w-0"
                  >

                    {/* Circle */}
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full
                flex items-center justify-center
                text-xs sm:text-sm font-bold
                ${isCompleted
                          ? "bg-green-600 text-white"
                          : isActive
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-500"}`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>

                    {/* Label */}
                    <span
                      className={`
    mt-1 sm:mt-0
    sm:ml-3
    text-[11px] sm:text-sm
    font-semibold tracking-wide
    text-center sm:text-left
    leading-tight
    ${isActive ? "text-black" : "text-gray-500"}
  `}
                    >
                      {label}
                    </span>



                    {/* Divider */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block w-12 lg:w-24 h-[2px] bg-gray-200 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-3 py-8">
          {children}
        </div>
      </div>
    </CheckoutContext.Provider>
  );
}
