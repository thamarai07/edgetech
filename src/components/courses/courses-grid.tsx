"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { CourseCard, type Course } from "@/components/shared/course-card";
import { cn } from "@/lib/utils";

export function CoursesGrid({ courses }: { courses: Course[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const CATEGORIES = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.category)))],
    [courses]
  );

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCategory = activeCategory === "All" || c.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, courses]);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search + filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-full border border-border-soft bg-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-foreground/50 md:ml-auto">
            <SlidersHorizontal className="size-4" />
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                activeCategory === cat
                  ? "btn-gradient text-white border-transparent shadow-md"
                  : "bg-white text-foreground/60 border-border-soft hover:border-primary hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((course, i) => (
                <CourseCard key={course.slug} course={course} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-foreground/50"
            >
              No courses match your search. Try a different keyword or category.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
