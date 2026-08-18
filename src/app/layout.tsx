import type { Metadata } from "next";
import { Lexend_Deca, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/shared/floating-actions";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.edgetechsolution.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Edge Tech Solution | Job-Ready Tech Courses & Placement Support",
    template: "%s | Edge Tech Solution",
  },
  description:
    "Edge Tech Solution helps students build real, job-ready tech skills through mentor-led, project-based courses in Web Development, Data Science, AI, Cloud, UI/UX, and more — with dedicated placement support.",
  keywords: [
    "Edge Tech Solution",
    "tech courses India",
    "learn web development",
    "data science course",
    "placement guarantee course",
    "IT training institute",
    "full stack development course",
  ],
  authors: [{ name: "Edge Tech Solution" }],
  creator: "Edge Tech Solution",
  publisher: "Edge Tech Solution",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Edge Tech Solution",
    title: "Edge Tech Solution | Job-Ready Tech Courses & Placement Support",
    description:
      "Mentor-led, project-based tech courses with real placement support. Learn Web Development, Data Science, AI, Cloud, UI/UX and more.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Edge Tech Solution" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edge Tech Solution | Job-Ready Tech Courses & Placement Support",
    description:
      "Mentor-led, project-based tech courses with real placement support.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable} ${manrope.variable} antialiased bg-background text-foreground`}>
        <Navbar />
        <main className="pt-[88px]">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
