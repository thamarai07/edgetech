"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";
import company from "@/data/company.json";

const FOOTER_LINKS = {
  Courses: [
    { label: "Full Stack Web Development", href: "/courses/full-stack-web-development" },
    { label: "Data Science & ML", href: "/courses/data-science-machine-learning" },
    { label: "AI & Generative AI", href: "/courses/ai-generative-ai-engineering" },
    { label: "UI/UX Design", href: "/courses/ui-ux-product-design" },
    { label: "View All Courses", href: "/courses" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Placements", href: "/placements" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Career Guidance", href: "/career-guidance" },
    { label: "Resources", href: "/resources" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

const SOCIALS = [
  { icon: Instagram, href: company.social.instagram, label: "Instagram" },
  { icon: Youtube, href: company.social.youtube, label: "YouTube" },
  { icon: Linkedin, href: company.social.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: company.social.twitter, label: "Twitter" },
  { icon: Facebook, href: company.social.facebook, label: "Facebook" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Newsletter */}
        <div className="mb-16 rounded-xl bg-gradient-to-r from-primary/20 to-accent/10 border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Stay in the loop</h3>
            <p className="text-white/60 mt-1 text-sm md:text-base">
              New courses, free workshops, and placement tips — straight to your inbox, no spam.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 md:w-72 rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="btn-gradient rounded-lg px-5 py-3 flex items-center gap-1 text-sm font-semibold shrink-0 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
            >
              {submitted ? "Subscribed" : "Subscribe"}
              {!submitted && <Send className="size-4" />}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Image
              src="/images/logo-white.png"
              alt="Edge Tech Solution"
              width={170}
              height={50}
              className="h-11 w-auto mb-4"
            />
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              We help students build real, job-ready tech skills through mentor-led, project-based
              learning — with placement support that doesn&apos;t stop until you&apos;re hired.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-white/90">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/55 text-sm hover:text-accent transition-colors inline-flex items-center gap-1 group"
                    >
                      {l.label}
                      <ArrowRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 border-t border-white/10 pt-8 text-sm text-white/60">
          <div className="flex items-start gap-2">
            <MapPin className="size-4 mt-0.5 text-primary shrink-0" />
            {company.address}
          </div>
          <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-accent">
            <Phone className="size-4 text-primary" /> {company.phone}
          </a>
          <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-accent">
            <Mail className="size-4 text-primary" /> {company.email}
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Edge Tech Solution. All rights reserved.</p>
          <p>Made with care, in Chennai.</p>
        </div>
      </div>
    </footer>
  );
}
