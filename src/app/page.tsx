import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { Journey } from "@/components/home/journey";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { Testimonials } from "@/components/home/testimonials";
import { PlacementCta } from "@/components/home/placement-cta";
import { getCourses, getTestimonials } from "@/lib/api";

export const metadata: Metadata = {
  title: "Edge Tech Solution | Job-Ready Tech Courses & Placement Support",
  description:
    "Learn job-ready tech skills from industry experts. Mentor-led courses in Web Development, Data Science, AI, Cloud, and more — with real placement support.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [courses, testimonials] = await Promise.all([getCourses(), getTestimonials()]);

  return (
    <>
      <Hero />
      <TrustedBy />
      <Journey />
      <FeaturedCourses courses={courses} />
      <Testimonials testimonials={testimonials} />
      <PlacementCta />
    </>
  );
}
