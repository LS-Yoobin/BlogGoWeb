"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Container className="py-32 flex flex-col items-center text-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30">
                <svg
                    className="w-8 h-8 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                Something went wrong
            </h1>
            <p className="text-[var(--text-secondary)] max-w-md">
                An unexpected error occurred. Our team has been notified. Please try
                again or contact support if the problem persists.
            </p>
            {error.digest && (
                <p className="text-xs text-[var(--text-muted)] font-mono">
                    Error ID: {error.digest}
                </p>
            )}
            <div className="flex gap-3">
                <Button variant="primary" onClick={reset}>
                    Try Again
                </Button>
                <a href="/support">
                    <Button variant="secondary">Contact Support</Button>
                </a>
            </div>
        </Container>
    );
}
