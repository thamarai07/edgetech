"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeroBackgroundFx } from "@/components/shared/hero-fx";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: string;
  /** Premium dark-gradient treatment with vertical lines + drifting dust, matching the home hero. */
  dark?: boolean;
}) {
  if (dark) {
    return (
      <section className="hero-gradient relative overflow-hidden py-20 md:py-28">
        <HeroBackgroundFx dustCount={24} />
        <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary/25 blur-3xl animate-blob" />
        <div
          className="pointer-events-none absolute bottom-0 left-10 size-72 rounded-full bg-accent/20 blur-3xl animate-blob"
          style={{ animationDelay: "3s" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-white/80">{breadcrumb}</span>
          </div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-accent font-semibold text-sm tracking-wide uppercase"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-white/65 max-w-xl"
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-section-alt border-b border-border-soft">
      <div className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 text-xs text-foreground/50 mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-secondary">{breadcrumb}</span>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-primary font-semibold text-sm tracking-wide uppercase"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-secondary max-w-2xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-foreground/60 max-w-xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
