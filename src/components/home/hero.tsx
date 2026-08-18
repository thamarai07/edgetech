"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, CalendarCheck, Code2, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/shared/counter";
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
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-24 size-96 rounded-full bg-primary/10 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-24 size-96 rounded-full bg-accent/10 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white px-4 py-1.5 text-xs font-medium text-secondary shadow-sm"
          >
            <Sparkles className="size-3.5 text-primary" />
            Admissions open for the next mentor-led batch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] text-secondary"
          >
            Helping You Build A{" "}
            <span className="text-gradient">Successful Career</span> In Tech
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-lg text-foreground/60 h-8"
          >
            We train <span className="text-primary font-semibold">{typed}</span>
            <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle animate-pulse" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-2 text-foreground/60 max-w-lg"
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
            <Button href="/contact" variant="outline" size="lg">
              <CalendarCheck className="size-5" /> Book Free Demo
            </Button>
            <Button href="/success-stories" variant="ghost" size="lg">
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
                <p className="text-2xl sm:text-3xl font-bold text-secondary font-display">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="text-xs text-foreground/50 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[420px] sm:h-[480px] hidden sm:block"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary to-secondary/90 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,var(--accent),transparent_55%)]" />
            <div className="absolute top-6 left-6 right-6 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs text-white/40 font-mono">student-dashboard.tsx</span>
            </div>
            <div className="absolute top-16 left-6 right-6 font-mono text-xs text-white/70 leading-relaxed space-y-1">
              <p><span className="text-accent">const</span> career = <span className="text-accent">launch</span>(you);</p>
              <p className="text-white/40">{"// mentor-reviewed, project by project"}</p>
              <p><span className="text-accent">await</span> placementSupport.stayWithYou();</p>
            </div>
          </div>

          <motion.div
            className="absolute top-8 -left-4 glass rounded-xl p-4 shadow-xl animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <Code2 className="size-6 text-primary" />
            <p className="text-xs font-semibold mt-2 text-secondary">8 Live Projects</p>
          </motion.div>

          <motion.div
            className="absolute bottom-24 -right-6 glass rounded-xl p-4 shadow-xl animate-float"
          >
            <Trophy className="size-6 text-primary" />
            <p className="text-xs font-semibold mt-2 text-secondary">₹15 LPA Highest CTC</p>
          </motion.div>

          <motion.div
            className="absolute bottom-4 left-10 glass rounded-xl px-4 py-3 shadow-xl animate-float"
            style={{ animationDelay: "1s" }}
          >
            <p className="text-xs text-foreground/60">Placement Rate</p>
            <p className="text-lg font-bold text-primary">95%</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
