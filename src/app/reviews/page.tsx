import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { getTestimonials } from "@/lib/api";
import { Star, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Reviews",
  description:
    "Read real reviews from Edge Tech Solution students who went from learning fundamentals to landing tech roles at companies like Infosys, Wipro, TCS, and IBM.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        eyebrow="Student Reviews"
        title="Don't Take Our Word For It"
        description="Real students, real mentors, real career changes — in their own words."
        breadcrumb="Reviews"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <p className="text-center text-foreground/50 py-16">No reviews published yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id ?? t.name}
                  className="h-full rounded-xl border-2 border-border-soft bg-white p-6 flex flex-col shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
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
                      <p className="text-xs text-foreground/50">{t.role}{t.course ? ` · ${t.course}` : ""}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
