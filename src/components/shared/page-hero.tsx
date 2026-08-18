"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: string;
}) {
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
