import { Truck, ShieldCheck, RotateCcw, Wallet } from "lucide-react";

const features = [
  { icon: <Truck size={40} />, title: "Quick Delivery" },
  { icon: <ShieldCheck size={40} />, title: "Best Quality" },
  { icon: <RotateCcw size={40} />, title: "Return Guarantee" },
  { icon: <Wallet size={40} />, title: "Cash On Delivery" },
];

export default function FeatureRow() {
  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-20 py-6 ">
      {features.map((f, idx) => (
        <div
          key={idx}
          className="flex justify-center items-center h-18 w-70 gap-3 px-4 py-2 rounded-xl shadow-sm bg-white hover:bg-gray-100 transition"
        >
          <span className="text-gray-700">{f.icon}</span>
          <span className="font-semibold text-xl  sm:text-xl">{f.title}</span>
        </div>
      ))}
    </div>
  );
}
