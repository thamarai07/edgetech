import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { getBlogPosts } from "@/lib/api";
import { ArrowRight, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Career guidance, placement preparation tips, and tech learning resources from the Edge Tech Solution team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Career Guidance & Learning Resources"
        description="Practical advice on choosing courses, prepping for placements, and building a career in tech."
        breadcrumb="Blog"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-foreground/50 py-16">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border-2 border-border-soft bg-white overflow-hidden shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col"
                >
                  <div className="h-36 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary bg-white/90 px-3 py-1 rounded-full">
                      {post.category || "Guide"}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-secondary leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-2 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 text-xs text-foreground/45">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        Read <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
