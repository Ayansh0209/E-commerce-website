'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

const steps = [
  { key: "bag", label: "Bag", href: "/cart" },
  { key: "address", label: "Address", href: "/cart/address" },
  { key: "payment", label: "Payment", href: "/cart/payment" },
];

export default function CartLayout({ children }) {
  const pathname = usePathname();

  // FIX: exact match instead of startsWith
  const currentStepIndex = steps.findIndex(step =>
    pathname === step.href
  );

  return (
    <div className="px-6 lg:px-16 py-6">

      {/* Stepper (centered) */}
      <div className="flex items-center justify-center gap-10 mb-10">
        {steps.map((s, i) => {
          const isActive = i === currentStepIndex;
          const isDone = i < currentStepIndex;

          return (
            <Link key={s.key} href={s.href} className="flex items-center gap-3">

              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                  ${isActive ? "bg-black text-white" :
                    isDone ? "bg-green-600 text-white" :
                    "bg-gray-300 text-black"}`}
              >
                {i + 1}
              </div>

              <span
                className={`text-base font-semibold
                  ${isActive ? "text-black" : "text-gray-600"}`}
              >
                {s.label}
              </span>

            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
