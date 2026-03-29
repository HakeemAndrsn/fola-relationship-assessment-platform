"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

function parseDate(dateStr: string): number {
  return new Date(dateStr).getTime();
}

export default function BlogList() {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sorted = [...blogPosts].sort((a, b) =>
    sortOrder === "newest"
      ? parseDate(b.date) - parseDate(a.date)
      : parseDate(a.date) - parseDate(b.date)
  );

  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <>
      {/* Sort toggle */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
          <button
            onClick={() => setSortOrder("newest")}
            className={`px-4 py-1.5 rounded-md text-xs font-sans font-semibold transition-all ${
              sortOrder === "newest"
                ? "bg-[#d4af37] text-[#1a365d]"
                : "text-[#a0aec0] hover:text-white"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-4 py-1.5 rounded-md text-xs font-sans font-semibold transition-all ${
              sortOrder === "oldest"
                ? "bg-[#d4af37] text-[#1a365d]"
                : "text-[#a0aec0] hover:text-white"
            }`}
          >
            Oldest
          </button>
        </div>
      </div>

      {/* Featured post */}
      <Link
        href={`/the-uncommon-practice/${featured.slug}`}
        className="block group mb-12"
      >
        <article className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-8 sm:p-10 hover:border-[#d4af37]/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-full font-sans">
              {featured.category}
            </span>
            <span className="text-xs text-[#718096] font-sans">
              {featured.date}
            </span>
            <span className="text-xs text-[#718096] font-sans">
              {featured.readTime}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif group-hover:text-[#d4af37] transition-colors">
            {featured.title}
          </h3>
          <p className="mt-1 text-base text-[#d4af37]/70 font-serif italic">
            {featured.subtitle}
          </p>
          <p className="mt-4 text-[#cbd5e0] font-sans leading-relaxed">
            {featured.excerpt}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[#d4af37] text-sm font-semibold font-sans group-hover:gap-3 transition-all">
            Read Article
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </article>
      </Link>

      {/* Post grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/the-uncommon-practice/${post.slug}`}
            className="group"
          >
            <article className="h-full rounded-xl border border-white/10 bg-white/5 p-6 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-semibold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-[10px] text-[#718096] font-sans">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#d4af37] transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-[#d4af37]/60 font-serif italic">
                {post.subtitle}
              </p>
              <p className="mt-3 text-sm text-[#a0aec0] font-sans leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-4 text-xs text-[#718096] font-sans">
                {post.date}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
      }
