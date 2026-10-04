import { tv, type VariantProps } from "tailwind-variants";

const space = {
  "0": "gap-0",
  "50": "gap-50",
  "100": "gap-100",
  "150": "gap-150",
  "200": "gap-200",
  "300": "gap-300",
  "400": "gap-400",
  "600": "gap-600",
};

export const stack = tv({
  base: "flex flex-col",
  variants: {
    space,
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: { space: "200", align: "stretch" },
});

export const inline = tv({
  base: "flex flex-row flex-wrap",
  variants: {
    space,
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    alignY: {
      top: "items-start",
      center: "items-center",
      bottom: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: { space: "100", align: "start", alignY: "center" },
});

export const columns = tv({
  base: "flex flex-row",
  variants: {
    space,
    collapseBelow: { sm: "max-sm:flex-col", md: "max-md:flex-col", never: "" },
    alignY: { top: "items-start", center: "items-center", stretch: "items-stretch" },
  },
  defaultVariants: { space: "200", collapseBelow: "never", alignY: "stretch" },
});

export const column = tv({
  base: "min-w-0",
  variants: {
    width: {
      auto: "flex-1",
      content: "flex-none",
      "1/2": "shrink-0 grow-0 basis-1/2",
      "1/3": "shrink-0 grow-0 basis-1/3",
      "2/3": "shrink-0 grow-0 basis-2/3",
      "1/4": "shrink-0 grow-0 basis-1/4",
      "3/4": "shrink-0 grow-0 basis-3/4",
    },
  },
  defaultVariants: { width: "auto" },
});

export const divider = tv({
  base: "w-full [border-top-width:var(--collie-border-width)] [border-top-style:var(--collie-border-style)]",
  variants: {
    tone: { subtle: "border-border-subtle", default: "border-border" },
  },
  defaultVariants: { tone: "subtle" },
});

export const container = tv({
  base: "mx-auto w-full",
  variants: {
    width: { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl", full: "" },
  },
  defaultVariants: { width: "lg" },
});

export type StackVariants = VariantProps<typeof stack>;
export type InlineVariants = VariantProps<typeof inline>;
export type ColumnsVariants = VariantProps<typeof columns>;
export type ColumnVariants = VariantProps<typeof column>;
export type DividerVariants = VariantProps<typeof divider>;
export type ContainerVariants = VariantProps<typeof container>;
