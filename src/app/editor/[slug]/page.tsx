"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { getBlogBySlug } from "@/lib/mock-data";

interface EditorState {
    title: string;
    content: string;
    tags: string;
    lastSaved: string | null;
}

const DEFAULT_CONTENT = `## Introduction

Start writing your post here. This editor supports **markdown-style** formatting.

## Main Section

Add your main content here. You can write about anything!

> Add a blockquote to highlight important information.

## Conclusion

Wrap up your thoughts and add a call to action.
`;

export default function EditorPage() {
    const params = useParams();
    const slug = params.slug as string;
    const storageKey = `bloggo-draft-${slug}`;

    const [state, setState] = useState<EditorState>(() => {
        // Lazy initializer: runs once on mount (client-side only)
        const defaults: EditorState = {
            title: "",
            content: DEFAULT_CONTENT,
            tags: "",
            lastSaved: null,
        };
        if (typeof window === "undefined") return defaults;

        const saved = localStorage.getItem(`bloggo-draft-${slug}`);
        if (saved) {
            try {
                return JSON.parse(saved) as EditorState;
            } catch {
                // ignore
            }
        }

        const mockPost = getBlogBySlug(slug);
        if (mockPost) {
            return {
                ...defaults,
                title: mockPost.title,
                tags: mockPost.tags.join(", "),
                content: mockPost.sections
                    .map((sec) => {
                        if (sec.type === "heading") return `## ${sec.content}`;
                        if (sec.type === "paragraph") return sec.content;
                        if (sec.type === "quote") return `> ${sec.content}`;
                        if (sec.type === "code")
                            return `\`\`\`${sec.language || ""}\n${sec.content}\n\`\`\``;
                        if (sec.type === "list")
                            return `${sec.content}\n${sec.items?.map((i) => `- ${i}`).join("\n") || ""}`;
                        return "";
                    })
                    .join("\n\n"),
            };
        }

        return defaults;
    });
    const [saving, setSaving] = useState(false);
    const [published, setPublished] = useState(false);
    const [preview, setPreview] = useState(false);
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Auto-save to localStorage
    const saveToLocal = (newState: EditorState) => {
        if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
        autoSaveTimer.current = setTimeout(() => {
            setSaving(true);
            const withTimestamp = { ...newState, lastSaved: new Date().toISOString() };
            localStorage.setItem(storageKey, JSON.stringify(withTimestamp));
            setState(withTimestamp);
            setTimeout(() => setSaving(false), 600);
        }, 1000);
    };

    const update = (field: keyof EditorState, value: string) => {
        const newState = { ...state, [field]: value };
        setState(newState);
        saveToLocal(newState);
    };

    const handlePublish = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setPublished(true);
        }, 1500);
    };

    const wordCount = state.content.trim().split(/\s+/).filter(Boolean).length;

    if (published) {
        return (
            <Container size="sm" className="py-32 flex flex-col items-center text-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-4xl">
                    🎉
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                    Post Published!
                </h1>
                <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">{state.title || "Your post"}</strong> is now live.
                    (This is a demo — no real publishing happens.)
                </p>
                <div className="flex gap-3">
                    <Link href="/profile/demo">
                        <Button variant="primary">View Profile</Button>
                    </Link>
                    <Button variant="secondary" onClick={() => setPublished(false)}>
                        Keep Editing
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Editor Toolbar */}
            <div className="sticky top-16 z-30 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
                <Container className="flex items-center justify-between h-14 gap-4">
                    <div className="flex items-center gap-3">
                        <Link href="/profile/demo" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            ← Back
                        </Link>
                        <span className="text-[var(--border)]">|</span>
                        <span className="text-xs text-[var(--text-muted)]">
                            {saving ? (
                                <span className="text-amber-400">Saving…</span>
                            ) : state.lastSaved ? (
                                <span className="text-emerald-400">
                                    Saved {new Date(state.lastSaved).toLocaleTimeString()}
                                </span>
                            ) : (
                                "Draft"
                            )}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] hidden sm:block">
                            {wordCount} words
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPreview((v) => !v)}
                        >
                            {preview ? "✏️ Edit" : "👁 Preview"}
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handlePublish}
                            loading={saving}
                            disabled={!state.title || !state.content}
                        >
                            Publish
                        </Button>
                    </div>
                </Container>
            </div>

            <Container size="md" className="py-10">
                {preview ? (
                    /* Preview Mode */
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <Badge variant="yellow">Preview Mode</Badge>
                            <span className="text-xs text-[var(--text-muted)]">
                                This is how your post will look
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-[var(--text-primary)]">
                            {state.title || "Untitled Post"}
                        </h1>
                        {state.tags && (
                            <div className="flex flex-wrap gap-2">
                                {state.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                                    <Badge key={tag} variant="violet">{tag}</Badge>
                                ))}
                            </div>
                        )}
                        <div className="prose-bloggo whitespace-pre-wrap border-t border-[var(--border)] pt-8">
                            {state.content}
                        </div>
                    </div>
                ) : (
                    /* Edit Mode */
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="violet">✍️ Editor</Badge>
                            <span className="text-xs text-[var(--text-muted)]">
                                Draft auto-saved to localStorage
                            </span>
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="editor-title" className="sr-only">
                                Post title
                            </label>
                            <textarea
                                id="editor-title"
                                rows={2}
                                placeholder="Your post title…"
                                value={state.title}
                                onChange={(e) => update("title", e.target.value)}
                                className="w-full bg-transparent text-3xl sm:text-4xl font-black text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none focus:outline-none border-b border-[var(--border)] pb-4 leading-tight"
                            />
                        </div>

                        {/* Tags */}
                        <Input
                            label="Tags"
                            id="editor-tags"
                            type="text"
                            placeholder="Next.js, TypeScript, Web Dev (comma separated)"
                            value={state.tags}
                            onChange={(e) => update("tags", e.target.value)}
                            hint="Separate tags with commas"
                        />

                        {/* Content */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="editor-content"
                                className="text-sm font-medium text-[var(--text-secondary)]"
                            >
                                Content
                            </label>
                            <textarea
                                id="editor-content"
                                rows={28}
                                placeholder="Start writing your post…"
                                value={state.content}
                                onChange={(e) => update("content", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500/50 transition-all"
                            />
                        </div>

                        {/* Toolbar hint */}
                        <div className="flex flex-wrap gap-3 text-xs text-[var(--text-muted)]">
                            <span>## Heading</span>
                            <span>**bold**</span>
                            <span>*italic*</span>
                            <span>&gt; Quote</span>
                            <span>```code```</span>
                            <span>- List item</span>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
