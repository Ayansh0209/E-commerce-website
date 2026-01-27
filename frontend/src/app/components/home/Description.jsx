'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Description() {
  const [index, setIndex] = useState(0);

  /* ✅ AUTO CHANGE REVIEWS ON DESKTOP */
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-2 sm:px-4 md:px-4 pt-2 md:py-4">
      <div
        className="
          w-full
          lg:max-w-none            /* FULL WIDTH ON LAPTOP */
          mx-auto
          grid grid-cols-[1.3fr_0.7fr]
          md:grid-cols-[1.1fr_0.9fr]
          rounded-2xl md:rounded-3xl
          overflow-hidden
          bg-neutral-100
        "
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="
            relative
            px-4 py-6
            sm:px-6 sm:py-8
            md:px-10 md:py-14     /* ⬅ MORE HEIGHT ON DESKTOP */
            flex flex-col justify-center
          "
        >
          {/* Decorative */}
          <div className="absolute -top-8 -left-8 w-32 h-32 md:w-56 md:h-56 bg-rose-200 rounded-full opacity-25" />
          <div className="absolute bottom-4 right-4 w-20 h-20 md:w-36 md:h-36 bg-amber-200 rounded-full opacity-25" />

          <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
            Why Faltu Fashion
          </span>

          <h2 className="text-base sm:text-xl md:text-4xl font-bold text-neutral-900 leading-tight mb-2 md:mb-5">
            Everyday fashion,
            <br className="hidden sm:block" />
            done honestly.
          </h2>

          <p className="text-[11px] sm:text-sm md:text-base text-neutral-700 max-w-sm mb-3 md:mb-8">
            Comfortable daily wear with breathable fabrics and honest pricing.
          </p>

          <button className="w-fit px-4 py-2 md:px-6 md:py-3 bg-neutral-900 text-white text-[11px] sm:text-sm rounded-full hover:bg-neutral-800 transition">
            Explore Collection
          </button>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="
            bg-white
            px-3 py-6
            sm:px-5 sm:py-8
            md:px-10 md:py-14   /* ⬅ MATCH HEIGHT */
            flex flex-col justify-center gap-3
          "
        >
          <h3 className="text-xs sm:text-lg md:text-2xl font-semibold text-neutral-900">
            Loved by customers
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-3xl md:text-4xl font-bold">
              4.8
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>

          <p className="text-[10px] sm:text-xs md:text-sm text-neutral-600">
            Based on 1,200+ verified reviews
          </p>

          {/* REVIEWS */}
          <div className="relative overflow-hidden mt-2">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50 && index < reviews.length - 1) {
                  setIndex(index + 1);
                }
                if (info.offset.x > 50 && index > 0) {
                  setIndex(index - 1);
                }
              }}
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="
                    min-w-full
                    bg-neutral-50
                    rounded-lg md:rounded-xl
                    p-3 sm:p-4
                    text-[10px] sm:text-xs md:text-sm
                    text-neutral-700
                  "
                >
                  “{r}”
                </div>
              ))}
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-2">
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === index ? "bg-neutral-900" : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>
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
