"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/api";

import "swiper/css";
import "swiper/css/pagination";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            Student Reviews
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">
            Don&apos;t Take Our Word For It
          </h2>
          <p className="mt-3 text-foreground/60">
            Real students, real mentors, real career changes.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id ?? t.name}>
                <div className="h-full rounded-xl border-2 border-border-soft bg-white p-6 flex flex-col shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                  <Quote className="size-8 text-primary/20" />
                  <p className="text-sm text-foreground/70 mt-3 flex-1 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-border-soft"}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary">{t.name}</p>
                      <p className="text-xs text-foreground/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
