import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, id, className = "", ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-[var(--text-secondary)]"
                    >
                        {label}
                        {props.required && (
                            <span className="text-red-400 ml-1" aria-hidden="true">
                                *
                            </span>
                        )}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
                    }
                    className={[
                        "w-full px-4 py-2.5 rounded-xl text-sm",
                        "bg-[var(--bg-card)] border text-[var(--text-primary)]",
                        "placeholder:text-[var(--text-muted)]",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-[var(--bg)]",
                        error
                            ? "border-red-500/50 focus:ring-red-500"
                            : "border-[var(--border)] hover:border-sky-500/30 focus:border-sky-500/50",
                        className,
                    ].join(" ")}
                    {...props}
                />
                {error && (
                    <p
                        id={`${inputId}-error`}
                        role="alert"
                        className="text-xs text-red-400"
                    >
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${inputId}-hint`} className="text-xs text-[var(--text-muted)]">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;
