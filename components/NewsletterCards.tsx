"use client";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@prisma/client";
import React, { useEffect, useState } from "react";

// Entfernt HTML aus dem Tiptap-Inhalt für die Kurzvorschau
const teaser = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const NewsletterCards: React.FC = () => {
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error(String(response.status));
        setBlogs(await response.json());
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(true);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return (
      <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-6">
        <p>Beiträge konnten nicht geladen werden.</p>
        <button
          onClick={() => location.reload()}
          className="rounded-full bg-brand-500 px-5 py-2 font-bold text-white hover:bg-brand-600"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs === null
        ? [0, 1, 2].map((i) => (
            <div key={i} className="h-[30rem] animate-pulse rounded-2xl bg-white" />
          ))
        : blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog.id}
              href={`/newsletter#beitrag-${blog.id}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* Hochformat-Feld, Bild vollständig – die Bilder sind oft Flyer mit Text */}
              <div className="relative aspect-[4/5] overflow-hidden bg-alb-50">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-slate-500">{blog.createdAt}</p>
                <h3 className="mt-1 text-lg font-extrabold text-alb-900 group-hover:text-brand-600">
                  {blog.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm">{teaser(blog.content)}</p>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default NewsletterCards;
