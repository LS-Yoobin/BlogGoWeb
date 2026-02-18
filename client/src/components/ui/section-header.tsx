import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col gap-4 mb-12",
      align === "center" ? "items-center text-center" : "items-start text-left",
      className
    )}>
      <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
