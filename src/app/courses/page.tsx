import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CoursesGrid } from "@/components/courses/courses-grid";
import { getCourses } from "@/lib/api";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse job-ready tech courses at Edge Tech Solution — Web Development, Data Science, AI, Cloud, DevOps, UI/UX, Cyber Security, and more. Mentor-led, project-based, with placement support.",
  alternates: { canonical: "/courses" },
};

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <>
      <PageHero
        eyebrow="Our Courses"
        title="Find The Track That Matches Where You Want To Go"
        description="Every course is mentor-led, project-based, and built around what companies are actually hiring for right now."
        breadcrumb="Courses"
      />
      <CoursesGrid courses={courses} />
    </>
  );
}
