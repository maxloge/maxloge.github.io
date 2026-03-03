import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-xl w-full py-20">
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
          Maxime Logé
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Software engineer building infrastructure for ML and AI systems.
        </p>

        <nav className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="/thoughts"
            className="group inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors"
          >
            Thoughts
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          <a
            href="https://github.com/maxloge"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/maxloge"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors"
          >
            LinkedIn
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </nav>

        <blockquote className="mt-16 border-l-2 border-border pl-4">
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            « La perfection est atteinte, non pas lorsqu'il
            n'y a plus rien à ajouter, mais lorsqu'il n'y
            a plus rien à retirer. »
          </p>
          <footer className="mt-2 text-xs text-muted-foreground/70">
            Antoine de Saint-Exupéry
          </footer>
        </blockquote>
      </div>
    </main>
  );
}
