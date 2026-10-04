import { tv } from "tailwind-variants";
import { BORDER } from "./box.js";

export const popover = tv({
  slots: {
    positioner: "z-10",
    popup: [
      "w-[min(28rem,calc(100vw-2rem))] origin-[var(--transform-origin)]",
      "rounded-md bg-surface font-sans text-fg shadow-overlay outline-none",
      BORDER,
      "border-border-subtle",
      "transition-[opacity,transform] duration-150",
      "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[starting-style]:scale-95",
    ],
    section: "p-200",
    footer: `flex flex-row flex-wrap items-center justify-between gap-100 p-200 ${BORDER} border-x-0 border-b-0 border-border-subtle`,
    option: [
      "flex w-full cursor-pointer items-center justify-between gap-100 rounded-sm px-150 py-100",
      "border-none bg-transparent text-left font-sans text-sm text-fg",
      "outline-none hover:bg-neutral-subtle",
      "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-accent",
      "data-[selected]:bg-accent-subtle data-[selected]:font-medium data-[selected]:text-fg-accent",
    ],
  },
});
