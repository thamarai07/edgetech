"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard, type Course } from "@/components/shared/course-card";

export function FeaturedCourses({ courses }: { courses: Course[] }) {
  const featured = courses.slice(0, 3);
  return (
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-semibold text-sm tracking-wide uppercase">
              Featured Courses
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary max-w-lg">
              Courses Built Around What Companies Are Hiring For
            </h2>
          </div>
          <Button href="/courses" variant="outline">
            View All Courses <ArrowRight className="size-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
