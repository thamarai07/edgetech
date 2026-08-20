import type { Course } from "@/components/shared/course-card";
import coursesData from "@/data/courses.json";
import testimonialsData from "@/data/testimonials.json";

export const API_URL = "https://edgetech.infinityfreeapp.com/api";

export type Testimonial = {
  id?: number;
  name: string;
  role: string;
  course: string;
  rating: number;
  image: string;
  quote: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  cover_image: string;
  author: string;
  category: string;
  published_at: string;
};

export type Placement = {
  id: number;
  student_name: string;
  company: string;
  role: string;
  course: string;
  package_lpa: number;
  photo: string;
  placed_on: string;
};

// Utility function for API requests with timeout and error handling
async function apiGet<T>(path: string, retries = 1): Promise<T | null> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch(`${API_URL}${path}`, {
        cache: "no-store",
        credentials: "omit",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(`API error for ${path}: ${res.status}`);
        return null;
      }

      return (await res.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`Attempt ${attempt + 1} failed for ${path}:`, lastError.message);

      if (attempt < retries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  console.error(`Failed to fetch ${path} after ${retries} attempts:`, lastError);
  return null;
}

/** Course list — tries the PHP/MySQL API first, falls back to bundled JSON */
export async function getCourses(): Promise<Course[]> {
  const data = await apiGet<{ success: boolean; courses: Course[] }>("/courses.php", 2);
  if (data?.success && data.courses) return data.courses;
  return coursesData as Course[];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const data = await apiGet<{ success: boolean; course: Course }>(
    `/courses.php?slug=${encodeURIComponent(slug)}`,
    1
  );
  if (data?.success && data.course) return data.course;
  const fallback = (coursesData as Course[]).find((c) => c.slug === slug);
  return fallback ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await apiGet<{ success: boolean; testimonials: Testimonial[] }>(
    "/testimonials.php",
    1
  );
  if (data?.success && data.testimonials) return data.testimonials;
  return testimonialsData as Testimonial[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await apiGet<{ success: boolean; posts: BlogPost[] }>("/blog.php", 1);
  return data?.success ? data.posts : [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const data = await apiGet<{ success: boolean; post: BlogPost }>(
    `/blog.php?slug=${encodeURIComponent(slug)}`,
    1
  );
  return data?.success ? data.post : null;
}

export async function getPlacements(): Promise<{
  placements: Placement[];
  stats: { total: number; avgPackage: number; topPackage: number };
}> {
  const data = await apiGet<{
    success: boolean;
    placements: Placement[];
    stats: { total: number; avgPackage: number; topPackage: number };
  }>("/placements.php", 1);

  if (data?.success) {
    return { placements: data.placements, stats: data.stats };
  }
  return { placements: [], stats: { total: 0, avgPackage: 0, topPackage: 0 } };
}

export async function submitEnquiry(payload: {
  name: string;
  email: string;
  phone: string;
  courseTitle: string;
  courseSlug?: string;
  city?: string;
  qualification?: string;
  message?: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const res = await fetch(`${API_URL}/enquiries.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return await res.json();
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return {
      success: false,
      error:
        error instanceof Error && error.name === "AbortError"
          ? "Request timeout. Please try again."
          : "Could not reach the server. Please try again in a moment.",
    };
  }
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone: string;
  course?: string;
  message: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const res = await fetch(`${API_URL}/contact.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`Contact submission failed with status ${res.status}`);
      return {
        success: false,
        error: `Server error (${res.status}). Please try again later.`,
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Contact submission error:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return {
        success: false,
        error: "Request timeout. Please check your internet connection and try again.",
      };
    }

    return {
      success: false,
      error: "Could not reach the server. Please try again in a moment.",
    };
  }
}