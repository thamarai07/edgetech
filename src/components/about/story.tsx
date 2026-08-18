"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export function AboutStory() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            Our Story
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">
            Started By People Who Felt The Gap Themselves
          </h2>
          <div className="mt-5 space-y-4 text-foreground/65 leading-relaxed">
            <p>
              Edge Tech Solution began with a simple frustration: too many talented students were
              finishing courses full of certificates but still unsure how to build something real,
              or explain their skills in an interview.
            </p>
            <p>
              We started small — a handful of mentors, a few dozen students, and a stubborn belief
              that learning should happen through building, not just watching videos. That belief is
              still the core of everything we do today.
            </p>
            <p>
              Every course we design starts with one question: what would actually help a student
              get hired&#63; The syllabus, the projects, and the mentor support all follow from that
              answer.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-5"
        >
          <div className="rounded-xl border-2 border-border-soft bg-white p-7 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <div className="size-12 rounded-xl btn-gradient flex items-center justify-center text-white mb-4">
              <Target className="size-6" />
            </div>
            <h3 className="font-semibold text-lg text-secondary">Our Mission</h3>
            <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
              To make high-quality, mentor-led tech education accessible to every student who is
              willing to put in the work — and to stand beside them until they&apos;re hired, not just
              until the course ends.
            </p>
          </div>
          <div className="rounded-xl border-2 border-border-soft bg-white p-7 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <div className="size-12 rounded-xl bg-secondary flex items-center justify-center text-white mb-4">
              <Eye className="size-6" />
            </div>
            <h3 className="font-semibold text-lg text-secondary">Our Vision</h3>
            <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
              To become the training partner students trust first when they decide to build a career
              in tech — known for outcomes, not just content.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
