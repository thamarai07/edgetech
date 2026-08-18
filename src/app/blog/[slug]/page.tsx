import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CalendarDays, User } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 text-xs text-foreground/50 mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-secondary line-clamp-1">{post.title}</span>
        </div>

        {post.category && (
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">{post.category}</span>
        )}
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-secondary">{post.title}</h1>

        <div className="flex items-center gap-4 mt-4 text-xs text-foreground/50">
          <span className="flex items-center gap-1.5">
            <User className="size-3.5" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>

        <div
          className="prose prose-slate max-w-none mt-8 text-foreground/75 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
