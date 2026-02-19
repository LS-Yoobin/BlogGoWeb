"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Lightbox from "@/components/blog/Lightbox";
import { getBlogBySlug, demoAuthor, Section } from "@/lib/mock-data";

interface Props {
    params: Promise<{ username: string; slug: string }>;
}

function BlogContent({ section }: { section: Section }) {
    switch (section.type) {
        case "heading":
            return (
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">
                    {section.content}
                </h2>
            );
        case "paragraph":
            return (
                <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
                    {section.content}
                </p>
            );
        case "quote":
            return (
                <blockquote className="border-l-4 border-sky-500 pl-5 py-1 my-6 italic text-[var(--text-muted)]">
                    {section.content}
                </blockquote>
            );
        case "code":
            return (
                <div className="my-6 rounded-xl overflow-hidden border border-[var(--border)]">
                    {section.language && (
                        <div className="px-4 py-2 bg-black/5 border-b border-[var(--border)] text-xs text-[var(--text-muted)] font-mono">
                            {section.language}
                        </div>
                    )}
                    <pre className="p-4 overflow-x-auto bg-[var(--bg-card)] text-sm text-sky-300 font-mono leading-relaxed">
                        <code>{section.content}</code>
                    </pre>
                </div>
            );
        case "list":
            return (
                <div className="my-5">
                    {section.content && (
                        <p className="text-[var(--text-secondary)] mb-3">{section.content}</p>
                    )}
                    <ul className="flex flex-col gap-2">
                        {section.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                                <svg
                                    className="w-4 h-4 text-sky-400 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        default:
            return null;
    }
}

export default function BlogPostPage({ params }: Props) {
    const { username, slug } = use(params);
    const post = getBlogBySlug(slug);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (!post || post.author.username !== username) {
        notFound();
    }

    return (
        <>
            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={post.gallery}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}

            {/* Cover */}
            <div className="relative w-full h-72 sm:h-96 overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/30 to-transparent" />
            </div>

            <Container size="md" className="py-12">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link href={`/profile/${username}`} className="hover:text-[var(--text-primary)] transition-colors">
                        @{username}
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-[var(--text-secondary)] truncate max-w-xs">{post.title}</span>
                </nav>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="violet">{tag}</Badge>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-[var(--border)] mb-8">
                    <Link
                        href={`/profile/${username}`}
                        className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
                    >
                        <Image
                            src={demoAuthor.avatar}
                            alt={demoAuthor.name}
                            width={40}
                            height={40}
                            className="rounded-xl"
                        />
                        <div>
                            <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-sky-300 transition-colors">
                                {demoAuthor.name}
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">@{username}</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] ml-auto">
                        <span>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span>·</span>
                        <span>{post.readingTime} min read</span>
                    </div>
                </div>

                {/* Excerpt */}
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 italic border-l-4 border-sky-500/40 pl-4">
                    {post.excerpt}
                </p>

                {/* Content sections */}
                <article aria-label="Blog post content">
                    {post.sections.map((section, i) => (
                        <BlogContent key={i} section={section} />
                    ))}
                </article>

                {/* Image Gallery */}
                {post.gallery.length > 0 && (
                    <section className="mt-16 pt-12 border-t border-[var(--border)]" aria-label="Image gallery">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                            📸 Gallery
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {post.gallery.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setLightboxIndex(i)}
                                    aria-label={`Open image: ${img.caption}`}
                                    className="group relative aspect-video overflow-hidden rounded-xl border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                        <p className="text-xs text-white/80 text-left">{img.caption}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Author card */}
                <section className="mt-16 pt-12 border-t border-[var(--border)]" aria-label="About the author">
                    <div className="flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
                        <Image
                            src={demoAuthor.avatar}
                            alt={demoAuthor.name}
                            width={64}
                            height={64}
                            className="rounded-xl flex-shrink-0"
                        />
                        <div className="flex flex-col gap-2 flex-1">
                            <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Written by</p>
                            <h3 className="font-semibold text-[var(--text-primary)]">{demoAuthor.name}</h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{demoAuthor.bio}</p>
                        </div>
                        <Link href={`/profile/${username}`}>
                            <Button variant="secondary" size="sm">View Profile</Button>
                        </Link>
                    </div>
                </section>
            </Container>
        </>
    );
}
