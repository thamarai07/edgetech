import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { AboutStory } from "@/components/about/story";
import { AboutValues } from "@/components/about/values";
import { AboutTimeline } from "@/components/about/timeline";
import { AboutMentors } from "@/components/about/mentors";
import { WhyChooseUs } from "@/components/about/why-choose-us";
import { getMentors } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Edge Tech Solution's mission, mentors, and the story behind our mentor-led, project-based approach to tech education.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const mentors = await getMentors();

  return (
    <>
      <PageHero
        dark
        eyebrow="About Edge Tech Solution"
        title="We Built The Program We Wished We Had"
        description="A mentor-led, project-first approach to learning tech — built by people who've hired, been hired, and know exactly what the gap between 'learning to code' and 'getting hired' actually looks like."
        breadcrumb="About"
      />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutMentors mentors={mentors} />
      <WhyChooseUs />
    </>
  );
}
