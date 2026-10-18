"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Blog } from "@prisma/client";

// Alle Beiträge untereinander, mit Anker #beitrag-{id} für Links von der Startseite
const NewsletterListe = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Abrufen der Blogdaten vom Server
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

  // Nach dem Laden zum Beitrag aus dem Link (#beitrag-…) springen
  useEffect(() => {
    if (blogs && window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }
  }, [blogs]);

  if (error) {
    return (
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
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

  if (blogs === null) {
    return (
      <div className="space-y-8">
        {[0, 1].map((i) => (
          <div key={i} className="h-96 animate-pulse rounded-3xl bg-alb-50" />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return <p className="text-lg">Aktuell gibt es noch keine Beiträge.</p>;
  }

  return (
    <div className="space-y-10">
      {blogs.map((blog) => (
        <article
          key={blog.id}
          id={`beitrag-${blog.id}`}
          // overflow-clip statt overflow-hidden, sonst bleibt das Bild beim Scrollen nicht stehen
          className="grid scroll-mt-28 overflow-clip rounded-3xl bg-white ring-1 ring-slate-200 lg:grid-cols-12"
        >
          {/* Bilder sind oft Flyer mit Text – daher nie beschneiden, sondern vollständig zeigen */}
          <div className="bg-alb-50 p-4 sm:p-6 lg:col-span-4">
            <a
              href={blog.img}
              target="_blank"
              rel="noopener noreferrer"
              title="Bild in voller Größe öffnen"
              className="mx-auto block max-w-sm lg:sticky lg:top-28"
            >
              <Image
                src={blog.img}
                alt={blog.title}
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 360px, 384px"
                className="h-auto w-full rounded-xl shadow-sm transition hover:shadow-md"
              />
            </a>
          </div>
          <div className="p-6 sm:p-10 lg:col-span-8">
            <p className="text-sm font-bold text-slate-500">{blog.createdAt}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-alb-900 sm:text-3xl">{blog.title}</h2>
            {/* Wird von React in HTML umgewandelt und in einem Div ausgegeben */}
            <div
              className="blog-content mt-5 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsletterListe;
