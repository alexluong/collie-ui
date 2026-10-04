import { tv, type VariantProps } from "tailwind-variants";

export const tiles = tv({
  base: "grid",
  variants: {
    space: {
      "0": "gap-0",
      "100": "gap-100",
      "150": "gap-150",
      "200": "gap-200",
      "300": "gap-300",
    },
    columns: {
      "1": "grid-cols-1",
      "2": "sm:grid-cols-2 grid-cols-1",
      "3": "sm:grid-cols-2 lg:grid-cols-3 grid-cols-1",
      "4": "lg:grid-cols-4 grid-cols-2",
    },
  },
  defaultVariants: { space: "200", columns: "3" },
});

export const avatar = tv({
  base: "inline-flex shrink-0 items-center justify-center rounded-full font-sans font-medium select-none",
  variants: {
    size: {
      sm: "size-200 text-xs",
      md: "size-300 text-xs",
      lg: "size-400 text-sm",
    },
    tone: {
      neutral: "bg-neutral-subtle text-fg-neutral",
      accent: "bg-accent-subtle text-fg-accent",
      success: "bg-success-subtle text-fg-success",
      warning: "bg-warning-subtle text-fg-warning",
    },
  },
  defaultVariants: { size: "md", tone: "neutral" },
});

export type TilesVariants = VariantProps<typeof tiles>;
export type AvatarVariants = VariantProps<typeof avatar>;
