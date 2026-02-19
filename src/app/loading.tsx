import Container from "@/components/ui/Container";

export default function Loading() {
    return (
        <Container className="py-24">
            <div className="flex flex-col gap-8 animate-pulse">
                {/* Hero skeleton */}
                <div className="flex flex-col items-center gap-4 py-16">
                    <div className="h-4 w-24 rounded-full bg-black/5" />
                    <div className="h-12 w-2/3 rounded-xl bg-black/5" />
                    <div className="h-12 w-1/2 rounded-xl bg-black/5" />
                    <div className="h-5 w-1/3 rounded-lg bg-black/5" />
                    <div className="flex gap-3 mt-4">
                        <div className="h-11 w-36 rounded-xl bg-black/5" />
                        <div className="h-11 w-36 rounded-xl bg-black/5" />
                    </div>
                </div>
                {/* Card skeletons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex flex-col gap-3"
                        >
                            <div className="h-40 rounded-xl bg-black/5" />
                            <div className="h-4 w-3/4 rounded-lg bg-black/5" />
                            <div className="h-3 w-full rounded-lg bg-black/5" />
                            <div className="h-3 w-2/3 rounded-lg bg-black/5" />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
