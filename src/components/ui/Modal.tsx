"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Close on ESC
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // Focus trap
    useEffect(() => {
        if (isOpen) {
            closeButtonRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={title || "Dialog"}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                ref={dialogRef}
                className={[
                    "relative w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl",
                    "animate-in fade-in zoom-in-95 duration-200",
                    sizeClasses[size],
                ].join(" ")}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                    {title && (
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            {title}
                        </h2>
                    )}
                    <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="ml-auto p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
