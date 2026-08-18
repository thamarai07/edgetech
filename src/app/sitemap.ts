import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/api";

const SITE_URL = "https://www.edgetechsolution.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCourses();
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/contact",
    "/placements",
    "/success-stories",
    "/blog",
    "/careers",
    "/faq",
    "/career-guidance",
    "/resources",
    "/reviews",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const courseRoutes = courses.map((c) => ({
    url: `${SITE_URL}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];
}
