# Edge Tech Solution — Website

A premium EdTech marketing site built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer
Motion. This first delivery includes the Home, About, Courses, and Contact pages, fully wired
with working navigation, forms, animations, and SEO — plus the shared layout (Navbar/Footer) used
across every future page.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (scroll/hover animations)
- Swiper JS (testimonials carousel)
- React Hook Form + Zod (contact form validation)
- Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The Google Fonts (Inter, Space Grotesk) are fetched automatically the
first time you run this with an internet connection — no setup needed.

## Project Structure

```
src/
  app/                  Routes (App Router). Each folder = a page.
    about/page.tsx
    courses/page.tsx
    contact/page.tsx
    page.tsx            Home page
    layout.tsx          Root layout: fonts, SEO metadata, Navbar/Footer
    sitemap.ts           Auto-generated sitemap.xml
    robots.ts             Auto-generated robots.txt
  components/
    layout/             Navbar, Footer
    home/                Home page sections (hero, stats, courses, testimonials...)
    about/               About page sections
    courses/             Courses grid + filtering
    contact/             Contact form + section
    shared/              Reusable pieces (CourseCard, Counter, PageHero, FloatingActions)
    ui/                  Base UI primitives (Button)
  data/                  All editable content lives here as JSON
    courses.json         Add/edit/remove courses — the site updates automatically
    testimonials.json
    mentors.json
    companies.json        Recruiter logos strip
    stats.json             Homepage stat counters
    company.json           Contact info, address, socials
public/
  images/
    logo.png              Your logo (transparent), used in the navbar
    logo-white.png         White variant, used in the dark footer
    og-image.jpg            Auto-generated social share image
```

### Editing content (no code required)

Everything in `src/data/*.json` drives the site. For example, to add a new course, just add a new
object to `src/data/courses.json` following the same shape as the existing entries — it will
automatically appear on the Home and Courses pages with filtering already working.

## What's included in this pass

- Home: hero (typewriter + animated counters + floating cards), trusted-by marquee, student
  journey timeline, featured courses, testimonials carousel, placement CTA band
- About: story/mission/vision, values grid, company timeline, mentors grid, why-choose-us table
- Courses: full listing with live search + category filtering
- Contact: validated form (name, email, phone, course, message), office details, embedded map
- Global: blur navbar, gradient/glass buttons with ripple effect, WhatsApp + scroll-to-top
  floating buttons, full SEO metadata, sitemap.xml, robots.txt

## Still to come (next pass)

Course Detail, Live Classes, Placements, Success Stories, Career Guidance, Resources, Blog, FAQ,
Careers, Privacy Policy, Terms & Conditions, Refund Policy, and the 404 page — plus dark mode.

## Deployment

This repo is Vercel-ready out of the box. To deploy:

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Edge Tech Solution website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repository, and click Deploy — no configuration
   needed, Vercel auto-detects Next.js.

I can't push to your GitHub or deploy to your Vercel account directly since I don't have your
credentials, but the two steps above take about two minutes.
