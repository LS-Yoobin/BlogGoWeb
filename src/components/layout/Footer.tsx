import Link from "next/link";

const footerLinks = {
    Product: [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/editor/my-first-post", label: "Editor Demo" },
    ],
    Company: [
        { href: "/support", label: "Support" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
    ],
    Demo: [
        { href: "/profile/demo", label: "Demo Profile" },
        { href: "/profile/demo/blog/getting-started-with-nextjs-14", label: "Sample Post" },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--bg-card)]/50 mt-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl w-fit">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/icon.png" alt="BlogGo logo" width={36} height={36} className="rounded-xl" style={{ width: 36, height: 36 }} />
                            <span className="gradient-text">BlogGo</span>
                        </Link>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                            BlogGo is the fastest way to turn photos into blogs. Turn your camera roll into a blog draft in seconds.
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                            Support:{" "}
                            <a
                                href="mailto:contactbloggo@linkedspaces.com"
                                className="text-sky-400 hover:text-sky-300 transition-colors"
                            >
                                contactbloggo@linkedspaces.com
                            </a>
                        </p>
                    </div>

                    {/* Link groups */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group} className="flex flex-col gap-3">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                                {group}
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--text-muted)]">
                        © {new Date().getFullYear()} BlogGo. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            Terms
                        </Link>
                        <Link href="/support" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
