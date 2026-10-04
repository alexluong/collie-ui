import { tv, type VariantProps } from "tailwind-variants";

export const BORDER =
  "[border-width:var(--collie-border-width)] [border-style:var(--collie-border-style)]";

export const box = tv({
  variants: {
    padding: {
      "0": "p-0",
      "50": "p-50",
      "100": "p-100",
      "150": "p-150",
      "200": "p-200",
      "300": "p-300",
      "400": "p-400",
      "600": "p-600",
    },
    paddingX: {
      "0": "px-0",
      "50": "px-50",
      "100": "px-100",
      "150": "px-150",
      "200": "px-200",
      "300": "px-300",
      "400": "px-400",
      "600": "px-600",
    },
    paddingY: {
      "0": "py-0",
      "50": "py-50",
      "100": "py-100",
      "150": "py-150",
      "200": "py-200",
      "300": "py-300",
      "400": "py-400",
      "600": "py-600",
    },
    background: {
      none: "",
      canvas: "bg-canvas",
      surface: "bg-surface",
      neutral: "bg-neutral-subtle",
      accent: "bg-accent-subtle",
      critical: "bg-critical-subtle",
      warning: "bg-warning-subtle",
      success: "bg-success-subtle",
    },
    border: {
      none: "",
      default: `${BORDER} border-border`,
      subtle: `${BORDER} border-border-subtle`,
      critical: `${BORDER} border-border-critical`,
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      full: "rounded-full",
    },
    shadow: { none: "", raised: "shadow-raised" },
    grow: { true: "min-w-0 flex-1" },
    overflow: { auto: "overflow-x-auto", hidden: "overflow-hidden" },
  },
});

export type BoxVariants = VariantProps<typeof box>;
