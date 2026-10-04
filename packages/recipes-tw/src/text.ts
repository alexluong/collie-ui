import { tv, type VariantProps } from "tailwind-variants";

const tone = {
  default: "text-fg",
  muted: "text-fg-muted",
  accent: "text-fg-accent",
  critical: "text-fg-critical",
  warning: "text-fg-warning",
  success: "text-fg-success",
};

const weight = {
  regular: "font-regular",
  medium: "font-medium",
  strong: "font-strong",
};

export const text = tv({
  base: "font-sans leading-normal",
  variants: {
    size: { xs: "text-xs", sm: "text-sm", md: "text-md", lg: "text-lg" },
    tone,
    weight,
    align: { start: "text-left", center: "text-center", end: "text-right" },
    truncate: { true: "truncate" },
  },
  defaultVariants: { size: "sm", tone: "default", weight: "regular" },
});

export const heading = tv({
  base: "font-sans leading-tight text-fg",
  variants: {
    level: {
      1: "text-2xl font-strong",
      2: "text-xl font-strong",
      3: "text-lg font-medium",
      4: "text-md font-medium",
    },
    tone,
  },
  defaultVariants: { level: 2, tone: "default" },
});

export type TextVariants = VariantProps<typeof text>;
export type HeadingVariants = VariantProps<typeof heading>;
