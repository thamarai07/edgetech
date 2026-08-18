"use client";

import { motion } from "framer-motion";
import companies from "@/data/companies.json";

export function TrustedBy() {
  const loop = [...companies, ...companies];

  return (
    <section className="py-14 border-y border-border-soft bg-section-alt overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-foreground/50 mb-8">
          Where our students work
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-section-alt to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-section-alt to-transparent z-10" />
        <motion.div
          className="flex gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xl sm:text-2xl font-bold text-secondary/25 font-display whitespace-nowrap hover:text-primary/60 transition-colors"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
