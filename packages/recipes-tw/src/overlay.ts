import { tv, type VariantProps } from "tailwind-variants";
import { BORDER } from "./box.js";

const backdrop = [
  "fixed inset-0 bg-overlay",
  "transition-opacity duration-150",
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
].join(" ");

export const dialog = tv({
  slots: {
    backdrop,
    popup: [
      "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "max-h-[90dvh] w-full overflow-y-auto",
      "rounded-md bg-surface font-sans text-fg shadow-overlay",
      BORDER,
      "border-border-subtle outline-none",
      "transition-[opacity,transform] duration-150",
      "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[starting-style]:scale-95",
    ],
    header: "flex flex-col gap-50 p-300 pb-0",
    body: "p-300",
    footer: "flex flex-row flex-wrap justify-end gap-100 p-300 pt-0",
    title: "font-sans text-lg leading-tight font-medium text-fg",
    description: "font-sans text-sm text-fg-muted",
  },
  variants: {
    size: {
      sm: { popup: "max-w-sm" },
      md: { popup: "max-w-md" },
      lg: { popup: "max-w-lg" },
    },
  },
  defaultVariants: { size: "md" },
});

export const drawer = tv({
  slots: {
    backdrop,
    popup: [
      "fixed inset-y-0 right-0 w-full max-w-md",
      "flex flex-col overflow-y-auto",
      "bg-surface font-sans text-fg shadow-overlay",
      BORDER,
      "border-y-0 border-r-0 border-border-subtle outline-none",
      "transition-transform duration-200",
      "data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
    ],
    header: "flex flex-col gap-50 p-300",
    body: "flex-1 p-300 pt-0",
    footer: "flex flex-row flex-wrap justify-end gap-100 p-300 pt-0",
    title: "font-sans text-lg leading-tight font-medium text-fg",
    description: "font-sans text-sm text-fg-muted",
  },
});

export type DialogVariants = VariantProps<typeof dialog>;
