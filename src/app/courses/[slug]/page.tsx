import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, BarChart3, FolderKanban, Star, CheckCircle2, Award, Briefcase, Users } from "lucide-react";
import { getCourseBySlug, getCourses } from "@/lib/api";
import { EnrollForm } from "@/components/courses/enroll-form";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `/courses/${slug}` },
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const discount = course.originalPrice > course.price
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const highlights = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: BarChart3, label: "Level", value: course.level },
    { icon: FolderKanban, label: "Projects", value: `${course.projects} hands-on projects` },
    { icon: Users, label: "Mentor", value: `${course.mentor} — ${course.mentorRole}` },
  ];

  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-20 bg-section-alt border-b border-border-soft">
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs text-foreground/50 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/courses" className="hover:text-primary">Courses</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-secondary">{course.title}</span>
          </div>

          <span className="text-primary font-semibold text-sm tracking-wide uppercase">
            {course.category}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-secondary max-w-2xl">
            {course.title}
          </h1>
          <p className="mt-4 text-foreground/60 max-w-xl">{course.description}</p>

          <div className="flex items-center gap-1.5 mt-4 text-sm text-secondary font-medium">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {course.rating}
            <span className="text-foreground/40 font-normal">({course.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <span className="text-3xl font-bold text-secondary">₹{course.price.toLocaleString("en-IN")}</span>
            {course.originalPrice > course.price && (
              <>
                <span className="text-base text-foreground/40 line-through">
                  ₹{course.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="rounded-full bg-secondary text-white px-3 py-1 text-xs font-semibold">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-start gap-3 rounded-xl border-2 border-border-soft bg-white p-4">
                  <h.icon className="size-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-foreground/50">{h.label}</p>
                    <p className="text-sm font-medium text-secondary">{h.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-secondary mb-4">Tools & Technologies You&apos;ll Learn</h2>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool) => (
                  <span key={tool} className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-secondary mb-4">What You Get</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Award, label: "Certificate", active: course.certificate },
                  { icon: Briefcase, label: "Internship", active: course.internship },
                  { icon: CheckCircle2, label: "Placement Support", active: course.placementSupport },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex flex-col items-center text-center gap-2 rounded-xl border-2 p-5 ${
                      item.active ? "border-primary/30 bg-primary/5" : "border-border-soft bg-white opacity-50"
                    }`}
                  >
                    <item.icon className="size-6 text-primary" />
                    <span className="text-sm font-medium text-secondary">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <EnrollForm courseTitle={course.title} courseSlug={course.slug} />
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}
