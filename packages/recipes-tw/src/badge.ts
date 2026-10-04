import { tv, type VariantProps } from "tailwind-variants";

export const badge = tv({
  base: "inline-flex items-center gap-50 rounded-full px-100 py-50 font-sans text-xs font-medium whitespace-nowrap",
  variants: {
    tone: {
      neutral: "bg-neutral-subtle text-fg-neutral",
      accent: "bg-accent-subtle text-fg-accent",
      critical: "bg-critical-subtle text-fg-critical",
      warning: "bg-warning-subtle text-fg-warning",
      success: "bg-success-subtle text-fg-success",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export type BadgeVariants = VariantProps<typeof badge>;
