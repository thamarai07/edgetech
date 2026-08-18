"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const ROWS = [
  { point: "Live mentor feedback on every project", us: true, typical: false },
  { point: "Placement support continues after the course ends", us: true, typical: false },
  { point: "Small batch sizes for real doubt-solving", us: true, typical: false },
  { point: "Curriculum updated with hiring trends", us: true, typical: false },
  { point: "Pre-recorded videos with no live interaction", us: false, typical: true },
  { point: "One-time certificate with no follow-up support", us: false, typical: true },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">
            The Difference Is In What Happens After Class
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border-2 border-border-soft overflow-hidden shadow-md"
        >
          <div className="grid grid-cols-3 bg-secondary text-white text-sm font-semibold">
            <div className="p-4">What Matters</div>
            <div className="p-4 text-center bg-primary">Edge Tech Solution</div>
            <div className="p-4 text-center text-white/50">Typical Courses</div>
          </div>
          {ROWS.map((row, i) => (
            <div
              key={row.point}
              className={`grid grid-cols-3 text-sm items-center ${i % 2 === 0 ? "bg-white" : "bg-section-alt"}`}
            >
              <div className="p-4 text-foreground/70">{row.point}</div>
              <div className="p-4 flex justify-center">
                {row.us ? (
                  <Check className="size-5 text-primary" />
                ) : (
                  <X className="size-5 text-foreground/25" />
                )}
              </div>
              <div className="p-4 flex justify-center">
                {row.typical ? (
                  <Check className="size-5 text-foreground/40" />
                ) : (
                  <X className="size-5 text-foreground/25" />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
