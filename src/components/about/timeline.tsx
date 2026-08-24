"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  { year: "Phase 01", title: "The Idea", desc: "Founders who'd hired and been hired kept seeing the same gap — course-complete, but not job-ready. We set out to fix that." },
  { year: "Phase 02", title: "Building The Program", desc: "Curriculum, projects, and a mentor network built from scratch — designed backward from what hiring managers actually screen for." },
  { year: "Phase 03", title: "First Cohort", desc: "A small, mentor-led batch to pressure-test every project and every review — before we ever tried to scale." },
  { year: "Today", title: "Growing, Mentor By Mentor", desc: "Every new student and hiring partner shapes the program further. We're early — and building it in the open, one outcome at a time." },
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
            Early Days, Built The Right Way
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
