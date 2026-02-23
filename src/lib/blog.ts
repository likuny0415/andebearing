import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/**
 * Get all blog post slugs (shared across locales — same filename per locale).
 */
export function getBlogSlugs(): string[] {
  const enDir = path.join(BLOG_DIR, "en");
  if (!fs.existsSync(enDir)) return [];
  return fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Get all blog posts for a given locale, sorted by date descending.
 */
export function getAllBlogPosts(locale: string): BlogPostMeta[] {
  const slugs = getBlogSlugs();
  const posts = slugs.map((slug) => getBlogPostMeta(slug, locale));
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get metadata only (no content) for a single blog post.
 */
export function getBlogPostMeta(slug: string, locale: string): BlogPostMeta {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.md`);
  // Fallback to English if locale file doesn't exist
  const actualPath = fs.existsSync(filePath)
    ? filePath
    : path.join(BLOG_DIR, "en", `${slug}.md`);
  const raw = fs.readFileSync(actualPath, "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    author: data.author ?? "",
    category: data.category ?? "general",
    readTime: data.readTime ?? 5,
  };
}

/**
 * Get full blog post including markdown content.
 */
export function getBlogPost(slug: string, locale: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.md`);
  const actualPath = fs.existsSync(filePath)
    ? filePath
    : path.join(BLOG_DIR, "en", `${slug}.md`);
  if (!fs.existsSync(actualPath)) return null;
  const raw = fs.readFileSync(actualPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    author: data.author ?? "",
    category: data.category ?? "general",
    readTime: data.readTime ?? 5,
    content,
  };
}

/** Export slugs for sitemap */
export const BLOG_SLUGS = getBlogSlugs();