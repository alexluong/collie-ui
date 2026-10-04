import { tv, type VariantProps } from "tailwind-variants";
import { BORDER } from "./box.js";

export const field = tv({
  slots: {
    root: "flex flex-col gap-50",
    label: "font-sans text-sm font-medium text-fg",
    description: "font-sans text-xs text-fg-muted",
    error: "font-sans text-xs text-fg-critical",
  },
  variants: {
    hideLabel: { true: { label: "sr-only" } },
  },
});

const control = [
  "w-full font-sans text-sm text-fg bg-canvas rounded-md",
  BORDER,
  "outline-none transition-colors",
  "placeholder:text-fg-muted",
  "focus-visible:outline-2 focus-visible:outline-offset-1",
  "disabled:opacity-50 disabled:pointer-events-none",
].join(" ");

const controlTone = {
  default: "border-border hover:border-border-hover focus-visible:outline-border-accent",
  critical: "border-border-critical focus-visible:outline-border-critical",
};

export const input = tv({
  base: `${control} px-150 py-100`,
  variants: { tone: controlTone },
  defaultVariants: { tone: "default" },
});

export const textarea = tv({
  base: `${control} min-h-[6rem] resize-y px-150 py-100`,
  variants: { tone: controlTone },
  defaultVariants: { tone: "default" },
});

export const select = tv({
  base: `${control} cursor-pointer appearance-none px-150 py-100 pr-300`,
  variants: { tone: controlTone },
  defaultVariants: { tone: "default" },
});

export const checkbox = tv({
  slots: {
    root: "flex items-start gap-150",
    control: "size-200 shrink-0 cursor-pointer accent-[var(--collie-color-accent-solid)]",
    text: "flex flex-col gap-50",
  },
});

export type FieldVariants = VariantProps<typeof field>;
export type InputVariants = VariantProps<typeof input>;
