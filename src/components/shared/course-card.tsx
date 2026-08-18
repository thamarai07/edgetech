"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BarChart3, FolderKanban, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Course = {
  slug: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  projects: number;
  mentor: string;
  mentorRole: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  tools: string[];
  description: string;
  certificate?: boolean;
  internship?: boolean;
  placementSupport?: boolean;
};

const GRADIENTS = [
  "from-blue-50 via-white to-indigo-50",
  "from-purple-50 via-white to-blue-50",
  "from-amber-50 via-white to-rose-50",
];

const BORDER_HOVER = [
  "hover:border-blue-200",
  "hover:border-purple-200",
  "hover:border-amber-200",
];

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const borderHover = BORDER_HOVER[index % BORDER_HOVER.length];
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group flex flex-col rounded-xl border-2 border-border-soft bg-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${borderHover}`}
    >
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-4xl font-bold text-secondary/15 group-hover:scale-110 transition-transform duration-500 font-display">
          {course.category}
        </span>
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          {course.category}
        </span>
        {discount > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-secondary text-white px-3 py-1 text-xs font-semibold">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-lg text-secondary leading-snug">
          {course.title}
        </h3>
        <p className="text-sm text-foreground/60 mt-1.5 line-clamp-2">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-xs text-foreground/60">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5 text-primary" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="size-3.5 text-primary" /> {course.level}
          </span>
          <span className="flex items-center gap-1">
            <FolderKanban className="size-3.5 text-primary" /> {course.projects} Projects
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3 text-xs text-foreground/60">
          <div className="size-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[10px] font-bold">
            {course.mentor.split(" ").map((n) => n[0]).join("")}
          </div>
          <span>{course.mentor}</span>
          <span className="flex items-center gap-0.5 ml-auto text-secondary font-medium">
            <Star className="size-3.5 fill-amber-400 text-amber-400" /> {course.rating}
            <span className="text-foreground/40">({course.reviews})</span>
          </span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-xl font-bold text-secondary">₹{course.price.toLocaleString("en-IN")}</span>
          {course.originalPrice > course.price && (
            <span className="text-sm text-foreground/40 line-through">
              ₹{course.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button href={`/courses/${course.slug}`} variant="primary" size="sm" className="flex-1 justify-center">
            Enroll Now <ArrowRight className="size-4" />
          </Button>
          <Button href="/contact" variant="outline" size="sm" className="flex-1 justify-center">
            Free Demo
          </Button>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className="mt-3 text-xs text-center text-foreground/40 hover:text-primary transition-colors"
        >
          View full curriculum
        </Link>
      </div>
    </motion.div>
  );
}
