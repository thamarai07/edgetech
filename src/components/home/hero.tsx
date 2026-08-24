"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, CalendarCheck, Code2, Sparkles, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/shared/counter";
import { HeroBackgroundFx } from "@/components/shared/hero-fx";
import stats from "@/data/stats.json";

const ROLES = ["Full Stack Developers", "Data Scientists", "AI Engineers", "Cloud Engineers", "Product Designers"];

function useTypewriter(words: string[], speed = 70, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 1.6);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

const STAT_ITEMS = [
  { value: stats.studentsTrained, suffix: "+", label: "Students Trained" },
  { value: stats.placementSupportPercent, suffix: "%", label: "Placement Support" },
  { value: stats.highestPackageLPA, suffix: " LPA", label: "Highest Package" },
  { value: stats.studentRating, suffix: "★", label: "Student Rating", decimals: 1 },
];

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section className="hero-gradient relative overflow-hidden pt-14 pb-24 md:pt-24 md:pb-32">
      <HeroBackgroundFx dustCount={34} />

      {/* Soft ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 size-96 rounded-full bg-accent/20 blur-3xl animate-blob" />
      <div
        className="pointer-events-none absolute top-24 -right-24 size-96 rounded-full bg-primary/25 blur-3xl animate-blob"
        style={{ animationDelay: "3s" }}
      />

      {/* Fade to page background at the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/90 shadow-sm"
          >
            <Sparkles className="size-3.5 text-accent" />
            Admissions open for the next mentor-led batch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] text-white"
          >
            Helping You Build A{" "}
            <span className="text-gradient">Successful Career</span> In Tech
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-lg text-white/70 h-8"
          >
            We train <span className="text-accent font-semibold">{typed}</span>
            <span className="inline-block w-0.5 h-5 bg-accent ml-0.5 align-middle animate-pulse" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-2 text-white/60 max-w-lg"
          >
            Learn job-ready skills from industry experts — with real mentors, real projects, and
            placement support that stays with you until you&apos;re hired.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/courses" variant="primary" size="lg">
              Explore Courses <ArrowRight className="size-5" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <CalendarCheck className="size-5" /> Book Free Demo
            </Button>
            <Button
              href="/success-stories"
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white"
            >
              <PlayCircle className="size-5" /> Watch Success Stories
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {STAT_ITEMS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-white font-display">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="text-xs text-white/50 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual — orbit dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[420px] sm:h-[480px] hidden sm:flex items-center justify-center"
        >
          {/* Rotating dashed orbit ring */}
          <div className="absolute size-[340px] sm:size-[380px] rounded-full border border-dashed border-white/20 animate-spin-slow" />
          <div className="absolute size-[260px] sm:size-[290px] rounded-full border border-white/10" />

          {/* Center glass panel with placement-rate progress ring */}
          <div className="glass-dark relative flex size-[220px] sm:size-[240px] flex-col items-center justify-center rounded-full shadow-2xl">
            <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - 0.95) }}
                transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
            <p className="text-4xl font-bold text-white font-display">95%</p>
            <p className="mt-1 text-xs text-white/60">Placement Rate</p>
          </div>

          {/* Orbiting info chips */}
          <motion.div
            className="glass-dark absolute top-4 left-2 sm:left-0 rounded-xl p-4 shadow-xl animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <Code2 className="size-6 text-accent" />
            <p className="text-xs font-semibold mt-2 text-white">8 Live Projects</p>
          </motion.div>

          <motion.div
            className="glass-dark absolute bottom-8 right-0 sm:-right-4 rounded-xl p-4 shadow-xl animate-float"
          >
            <Trophy className="size-6 text-accent" />
            <p className="text-xs font-semibold mt-2 text-white">₹7 LPA Highest CTC</p>
          </motion.div>

          <motion.div
            className="glass-dark absolute top-10 right-2 sm:right-4 rounded-xl px-4 py-3 shadow-xl animate-float"
            style={{ animationDelay: "1s" }}
          >
            <Users className="size-6 text-accent" />
            <p className="text-xs font-semibold mt-2 text-white">500+ Hiring Partners</p>
          </motion.div>

          <motion.div
            className="glass-dark absolute bottom-2 left-4 sm:left-6 rounded-xl px-4 py-3 shadow-xl animate-float"
            style={{ animationDelay: "1.6s" }}
          >
            <p className="text-xs text-white/60">Student Rating</p>
            <p className="text-lg font-bold text-accent">4.9★</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
