'use client';

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Description() {
  return (
    <section className="px-6 py-15">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 rounded-3xl overflow-hidden bg-neutral-100">

        {/* LEFT: WHY FALTU */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative p-12 flex flex-col justify-center"
        >
          {/* decorative circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-rose-200 rounded-full opacity-30" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-200 rounded-full opacity-30" />

          <span className="text-sm uppercase tracking-widest text-neutral-500 mb-3">
            Why Faltu Fashion
          </span>

          <h2 className="text-4xl font-bold text-neutral-900 leading-tight mb-5">
            Everyday fashion,
            <br />
            done honestly.
          </h2>

          <p className="text-neutral-700 max-w-md mb-8">
            Comfortable daily wear, breathable fabrics, and pricing that makes
            sense. No hype. No fake discounts.
          </p>

          <button className="w-fit px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition">
            Explore Collection
          </button>
        </motion.div>

        {/* RIGHT: CUSTOMER LOVE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-12 flex flex-col justify-center gap-6"
        >
          <h3 className="text-2xl font-semibold text-neutral-900">
            Loved by our customers
          </h3>

          {/* Rating summary */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-neutral-900">4.8</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>

          <p className="text-neutral-600 text-sm">
            Based on 1,200+ verified customer reviews across India
          </p>

          {/* Mini reviews */}
          <div className="space-y-4 mt-4">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-700"
              >
                “{r}”
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const reviews = [
  "Comfortable fabric, perfect for daily wear.",
  "Quality is better than expected for the price.",
  "Simple designs and very breathable material.",
];
