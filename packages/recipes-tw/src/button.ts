import { tv, type VariantProps } from "tailwind-variants";
import { BORDER } from "./box.js";

// Tone sets component-tier variables; emphasis reads them, so the two axes stay
// independent. Every class is written out: Tailwind scans source text, so a
// class built by interpolation never gets generated.
export const button = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center gap-100 font-sans font-medium whitespace-nowrap",
      "cursor-pointer rounded-md transition-colors select-none",
      BORDER,
      "outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
      "focus-visible:outline-[var(--btn-border)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[loading]:cursor-progress data-[loading]:opacity-70",
    ],
    icon: "shrink-0",
  },
  variants: {
    tone: {
      neutral: {
        root: [
          "[--btn-solid:var(--collie-color-neutral-solid)]",
          "[--btn-solid-hover:var(--collie-color-neutral-solid-hover)]",
          "[--btn-subtle:var(--collie-color-neutral-subtle)]",
          "[--btn-subtle-active:var(--collie-color-neutral-subtle-active)]",
          "[--btn-border:var(--collie-color-border-neutral)]",
          "[--btn-fg:var(--collie-color-fg)]",
          "[--btn-on:var(--collie-color-fg-on-neutral)]",
        ],
      },
      accent: {
        root: [
          "[--btn-solid:var(--collie-color-accent-solid)]",
          "[--btn-solid-hover:var(--collie-color-accent-solid-hover)]",
          "[--btn-subtle:var(--collie-color-accent-subtle)]",
          "[--btn-subtle-active:var(--collie-color-accent-subtle-active)]",
          "[--btn-border:var(--collie-color-border-accent)]",
          "[--btn-fg:var(--collie-color-fg-accent)]",
          "[--btn-on:var(--collie-color-fg-on-accent)]",
        ],
      },
      critical: {
        root: [
          "[--btn-solid:var(--collie-color-critical-solid)]",
          "[--btn-solid-hover:var(--collie-color-critical-solid-hover)]",
          "[--btn-subtle:var(--collie-color-critical-subtle)]",
          "[--btn-subtle-active:var(--collie-color-critical-subtle-active)]",
          "[--btn-border:var(--collie-color-border-critical)]",
          "[--btn-fg:var(--collie-color-fg-critical)]",
          "[--btn-on:var(--collie-color-fg-on-critical)]",
        ],
      },
    },
    emphasis: {
      primary: {
        root: [
          "border-transparent shadow-raised",
          "bg-[var(--btn-solid)] text-[var(--btn-on)]",
          "hover:bg-[var(--btn-solid-hover)]",
        ],
      },
      // Reads component-tier tokens rather than naming colours directly, so a
      // theme can turn the outline into a tonal fill without a second recipe.
      secondary: {
        root: [
          "bg-[var(--collie-button-secondary-bg)]",
          "shadow-[var(--collie-button-secondary-shadow)]",
          "border-[var(--collie-button-secondary-border)]",
          "text-[var(--collie-button-secondary-fg)]",
          "hover:bg-[var(--btn-subtle)]",
        ],
      },
      tertiary: {
        root: [
          "border-transparent bg-transparent text-[var(--btn-fg)]",
          "hover:bg-[var(--btn-subtle)] active:bg-[var(--btn-subtle-active)]",
        ],
      },
    },
    size: {
      sm: { root: "px-100 py-50 text-xs", icon: "size-150" },
      md: { root: "px-200 py-100 text-sm", icon: "size-200" },
      lg: { root: "px-300 py-150 text-md", icon: "size-200" },
    },
  },
  defaultVariants: { emphasis: "primary", tone: "accent", size: "md" },
});

export type ButtonVariants = VariantProps<typeof button>;
