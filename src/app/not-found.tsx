import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
    return (
        <Container className="py-32 flex flex-col items-center text-center gap-6">
            <div className="text-8xl font-black gradient-text">404</div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                Page Not Found
            </h1>
            <p className="text-[var(--text-secondary)] max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back on track.
            </p>
            <div className="flex gap-3">
                <Link href="/">
                    <Button variant="primary">Go Home</Button>
                </Link>
                <Link href="/support">
                    <Button variant="secondary">Get Support</Button>
                </Link>
            </div>
        </Container>
    );
}
