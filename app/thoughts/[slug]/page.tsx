import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { getThought, getThoughts } from "@/lib/thoughts";
import type { MDXComponents } from "mdx/types";

const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-2xl font-semibold text-foreground tracking-tight mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-xl font-semibold text-foreground tracking-tight mt-10 mb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-lg font-semibold text-foreground mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-base text-foreground/85 leading-relaxed mb-5" {...props} />
  ),
  a: (props) => (
    <a
      className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-5 space-y-1 text-foreground/85" {...props} />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-6 mb-5 space-y-1 text-foreground/85"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-border pl-4 my-6 text-muted-foreground italic"
      {...props}
    />
  ),
  code: (props) => {
    // rehype-pretty-code adds data-theme to code blocks - leave those alone
    if ("data-theme" in props) {
      return <code className="font-mono text-sm" {...props} />;
    }
    return (
      <code
        className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono"
        {...props}
      />
    );
  },
  pre: (props) => (
    <pre
      className="bg-muted rounded-md p-4 mb-5 overflow-x-auto text-sm font-mono [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
};

export async function generateStaticParams() {
  return getThoughts().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = getThought(slug);
  if (!thought) return {};
  return {
    title: `${thought.title} | Maxime Logé`,
    description: thought.description,
  };
}

export default async function ThoughtPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = getThought(slug);
  if (!thought) notFound();

  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <article className="max-w-xl mx-auto">
        <Link
          href="/thoughts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Thoughts
        </Link>

        <header className="mb-10">
          <time className="text-xs text-muted-foreground/70">
            {new Date(thought.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mt-2">
            {thought.title}
          </h1>
        </header>

        <MDXRemote
          source={thought.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeKatex,
                [rehypePrettyCode, { theme: "github-light", keepBackground: false }],
              ],
            },
          }}
        />
      </article>
    </main>
  );
}
