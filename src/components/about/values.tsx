"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Rocket, ShieldCheck, Users } from "lucide-react";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Student First",
    desc: "Every decision, from syllabus to scheduling, is made around what actually helps students learn and get hired.",
  },
  {
    icon: Rocket,
    title: "Learn By Building",
    desc: "We believe projects teach faster than lectures. Every course is structured around things you actually build.",
  },
  {
    icon: ShieldCheck,
    title: "Honesty Over Hype",
    desc: "We don't promise guarantees we can't back. We promise real effort, real mentorship, and real support.",
  },
  {
    icon: Users,
    title: "Mentors, Not Just Instructors",
    desc: "Our mentors have shipped real products and hired real engineers — they teach from experience, not slides alone.",
  },
];

export function AboutValues() {
  return (
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            What We Stand For
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">Our Values</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-xl bg-white border-2 border-border-soft p-6 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="size-12 rounded-xl btn-gradient flex items-center justify-center text-white mb-4">
                <v.icon className="size-6" />
              </div>
              <h3 className="font-semibold text-secondary">{v.title}</h3>
              <p className="text-sm text-foreground/60 mt-2 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
