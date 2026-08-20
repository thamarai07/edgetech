import type { Course } from "@/components/shared/course-card";
import coursesData from "@/data/courses.json";
import testimonialsData from "@/data/testimonials.json";

// export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/edgetech-backend/api";

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

async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" , credentials : "omit"});
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Course list — tries the PHP/MySQL API first, falls back to bundled JSON so the
 * site keeps working even if the backend isn't running (e.g. during frontend dev). */
export async function getCourses(): Promise<Course[]> {
  const data = await apiGet<{ success: boolean; courses: Course[] }>("/courses.php");
  if (data?.success && data.courses) return data.courses;
  return coursesData as Course[];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const data = await apiGet<{ success: boolean; course: Course }>(`/courses.php?slug=${encodeURIComponent(slug)}`);
  if (data?.success && data.course) return data.course;
  const fallback = (coursesData as Course[]).find((c) => c.slug === slug);
  return fallback ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await apiGet<{ success: boolean; testimonials: Testimonial[] }>("/testimonials.php");
  if (data?.success && data.testimonials) return data.testimonials;
  return testimonialsData as Testimonial[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await apiGet<{ success: boolean; posts: BlogPost[] }>("/blog.php");
  return data?.success ? data.posts : [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const data = await apiGet<{ success: boolean; post: BlogPost }>(`/blog.php?slug=${encodeURIComponent(slug)}`);
  return data?.success ? data.post : null;
}

export async function getPlacements(): Promise<{ placements: Placement[]; stats: { total: number; avgPackage: number; topPackage: number } }> {
  const data = await apiGet<{ success: boolean; placements: Placement[]; stats: { total: number; avgPackage: number; topPackage: number } }>("/placements.php");
  if (data?.success) return { placements: data.placements, stats: data.stats };
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
    const res = await fetch(`${API_URL}/enquiries.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials : "omit"
    });
    return await res.json();
  } catch {
    return { success: false, error: "Could not reach the server. Please try again in a moment." };
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
    const res = await fetch(`${API_URL}/contact.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: 'omit'
    });
    return await res.json();
  } catch {
    return { success: false, error: "Could not reach the server. Please try again in a moment." };
  }
}
