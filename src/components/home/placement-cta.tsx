"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/shared/counter";

const HIGHLIGHTS = [
  { icon: Building2, value: 200, suffix: "+", label: "Hiring Partners" },
  { icon: Award, value: 7, suffix: " LPA", label: "Highest Package" },
  { icon: TrendingUp, value: 95, suffix: "%", label: "Placement Support" },
];

export function PlacementCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary px-6 py-16 md:px-16 md:py-20 text-white">
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 size-80 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-accent font-semibold text-sm tracking-wide uppercase">
                Placements
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">
                We Don&apos;t Stop Teaching At &ldquo;Course Complete&rdquo;
              </h2>
              <p className="mt-4 text-white/60 max-w-lg">
                100% Placement Assist.
              </p>
              <Button href="/placements" variant="primary" size="lg" className="mt-8">
                See Placement Stories <ArrowRight className="size-5" />
              </Button>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-dark rounded-xl p-6 text-center"
                >
                  <h.icon className="size-6 text-accent mx-auto mb-3" />
                  <p className="text-2xl font-bold font-display">
                    <Counter value={h.value} suffix={h.suffix} />
                  </p>
                  <p className="text-xs text-white/50 mt-1">{h.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
