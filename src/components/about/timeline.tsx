"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  { year: "2021", title: "Edge Tech Solution Founded", desc: "Started with 2 courses and a small batch of 40 students in Chennai." },
  { year: "2022", title: "First Placement Partnerships", desc: "Signed our first hiring partnerships and placed our first 200 students." },
  { year: "2023", title: "Crossed 2,000 Students", desc: "Expanded into Data Science, Cloud, and UI/UX tracks based on hiring demand." },
  { year: "2024", title: "Launched AI & GenAI Track", desc: "Introduced applied AI courses as industry demand shifted rapidly." },
  { year: "2025", title: "5,000+ Students Trained", desc: "Reached 200+ hiring partners and an average placement package growth of 40%." },
];

export function AboutTimeline() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            Our Journey
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">
            A Timeline Of Growth, Built On Outcomes
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-soft md:-translate-x-1/2" />
          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`relative flex md:items-center gap-6 md:gap-10 pl-12 md:pl-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 md:left-1/2 top-1 md:top-1/2 size-3 rounded-full btn-gradient -translate-x-1/2 md:-translate-y-1/2 ring-4 ring-white" />
                <div className="md:w-1/2" />
                <div
                  className={`md:w-1/2 rounded-xl border-2 border-border-soft bg-white p-6 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300 ${
                    i % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <span className="text-primary font-bold font-display text-lg">{m.year}</span>
                  <h3 className="font-semibold text-secondary mt-1">{m.title}</h3>
                  <p className="text-sm text-foreground/60 mt-1.5">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
