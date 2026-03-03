import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/thoughts");

export interface Thought {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface ThoughtWithContent extends Thought {
  content: string;
}

export function getThoughts(): Thought[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getThought(slug: string): ThoughtWithContent | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    description: data.description ?? "",
    content,
  };
}
