import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ContactSection } from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Edge Tech Solution. Book a free demo class, ask about a course, or visit us in Chennai.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Talk About Where You Want To Go"
        description="Have a question about a course, or want to book a free demo class? Send us a message — a mentor will get back to you within 24 hours."
        breadcrumb="Contact"
      />
      <ContactSection />
    </>
  );
}
