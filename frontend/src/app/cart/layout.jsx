'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

const steps = [
  { key: "bag", label: "BAG", href: "/cart" },
  { key: "address", label: "ADDRESS", href: "/cart/address" },
  { key: "payment", label: "PAYMENT", href: "/cart/payment" },
];

export default function CartLayout({ children }) {
  const pathname = usePathname();

  const currentStepIndex = steps.findIndex(step => pathname === step.href);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Stepper Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={step.key} className="flex items-center">
                  <Link 
                    href={step.href}
                    className="flex items-center gap-3 group"
                  >
                    {/* Circle Number */}
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        text-sm font-bold transition-all
                        ${isActive 
                          ? 'bg-black text-white' 
                          : isCompleted 
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                        }
                        ${!isActive && 'group-hover:scale-105'}
                      `}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    
                    {/* Label */}
                    <span
                      className={`
                        text-sm font-semibold tracking-wide
                        ${isActive 
                          ? 'text-black' 
                          : 'text-gray-500'
                        }
                        ${!isActive && 'group-hover:text-gray-700'}
                      `}
                    >
                      {step.label}
                    </span>
                  </Link>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block w-16 lg:w-24 h-[2px] bg-gray-200 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}