"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { UserRoundCheck, NotebookPen, Rocket, MessagesSquare, Handshake, LineChart } from "lucide-react";

const STEPS = [
  {
    icon: UserRoundCheck,
    title: "Enroll",
    desc: "Pick a track and talk to a mentor about your goals.",
    iconAnimate: { y: [0, -5, 0] },
    iconTransition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    icon: NotebookPen,
    title: "Learn",
    desc: "Structured, mentor-led sessions at your pace.",
    iconAnimate: { rotate: [0, -10, 10, 0] },
    iconTransition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    icon: Rocket,
    title: "Build Projects",
    desc: "Apply every concept to real, portfolio-worthy work.",
    iconAnimate: { y: [0, -6, 0], rotate: [0, -6, 0] },
    iconTransition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    icon: MessagesSquare,
    title: "Interview Prep",
    desc: "Mock interviews, resume reviews, and mentor feedback.",
    iconAnimate: { rotate: [0, 12, -12, 0] },
    iconTransition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    icon: Handshake,
    title: "Placement",
    desc: "Dedicated support until you receive an offer.",
    iconAnimate: { scale: [1, 1.14, 1] },
    iconTransition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    icon: LineChart,
    title: "Career Growth",
    desc: "Alumni network and continued mentorship.",
    iconAnimate: { y: [0, -7, 0], scale: [1, 1.06, 1] },
    iconTransition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
];

const pulseRing: Variants = {
  animate: {
    scale: [1, 1.35, 1],
    opacity: [0.5, 0, 0.5],
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
};

export function Journey() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            Your Journey With Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">
            From First Line Of Code To Your First Offer
          </h2>
          <p className="mt-3 text-foreground/60">
            A guided path, one step at a time — you&apos;re never figuring it out alone.
          </p>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border-soft -translate-y-1/2 -z-10" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative rounded-xl border-2 border-border-soft bg-white p-6 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative size-11 shrink-0">
                  <motion.span
                    variants={pulseRing}
                    animate="animate"
                    className="absolute inset-0 rounded-full bg-primary/40"
                  />
                  <div className="relative size-11 rounded-full btn-gradient flex items-center justify-center text-white shadow-md">
                    <motion.span
                      animate={step.iconAnimate}
                      transition={step.iconTransition}
                      className="flex"
                    >
                      <step.icon className="size-5" />
                    </motion.span>
                  </div>
                </div>
                <span className="text-xs font-mono text-foreground/30">0{i + 1}</span>
              </div>
              <h3 className="font-semibold text-secondary">{step.title}</h3>
              <p className="text-sm text-foreground/55 mt-1.5">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
