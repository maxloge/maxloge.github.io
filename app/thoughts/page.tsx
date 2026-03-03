import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getThoughts } from "@/lib/thoughts";

export const metadata = {
  title: "Thoughts | Maxime Logé",
  description: "Notes on infrastructure, physics, and engineering.",
};

export default function ThoughtsPage() {
  const thoughts = getThoughts();

  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <div className="max-w-xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Home
        </Link>

        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-12">
          Thoughts
        </h1>

        {thoughts.length === 0 ? (
          <p className="text-muted-foreground">Nothing yet.</p>
        ) : (
          <div className="space-y-8">
            {thoughts.map((thought) => (
              <Link
                key={thought.slug}
                href={`/thoughts/${thought.slug}`}
                className="group block"
              >
                <time className="text-xs text-muted-foreground/70">
                  {new Date(thought.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-base font-medium text-foreground group-hover:text-primary transition-colors mt-1">
                  {thought.title}
                </h2>
                {thought.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {thought.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
