"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import mentors from "@/data/mentors.json";

export function AboutMentors() {
  return (
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            Our Mentors
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">
            Taught By People Who&apos;ve Actually Done The Job
          </h2>
          <p className="mt-3 text-foreground/60">
            Every mentor has shipped real products at real companies before teaching here.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="rounded-xl bg-white border-2 border-border-soft p-6 text-center shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="size-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-semibold text-secondary mt-4">{m.name}</h3>
              <p className="text-sm text-primary">{m.role}</p>
              <p className="text-xs text-foreground/50 mt-1">{m.company}</p>
              <div className="flex justify-center mt-3">
                <span className="size-8 rounded-full bg-section-alt flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                  <Linkedin className="size-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
