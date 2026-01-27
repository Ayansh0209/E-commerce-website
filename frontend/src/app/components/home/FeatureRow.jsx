import { Truck, ShieldCheck, RotateCcw, Wallet } from "lucide-react";
import React from "react";

const features = [
  { icon: Truck, title: "Quick Delivery" },
  { icon: ShieldCheck, title: "Best Quality" },
  { icon: RotateCcw, title: "Return Guarantee" },
  { icon: Wallet, title: "Cash On Delivery" },
];

export default function FeatureRow() {
  return (
    <div className="w-full px-4 pt-9">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className="
                flex items-center justify-center gap-2
                px-3 py-3
                rounded-xl bg-white shadow-sm
                text-gray-800
              "
            >
              {/* Icon */}
              <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />

              {/* Text */}
              <span
                className="
                  text-[15px]
                  sm:text-base
                  md:text-sm
                  font-semibold
                  leading-tight
                  text-center
                  whitespace-nowrap
                "
              >
                {f.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
