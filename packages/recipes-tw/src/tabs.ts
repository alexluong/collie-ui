import { tv } from "tailwind-variants";
import { BORDER } from "./box.js";

export const tabs = tv({
  slots: {
    root: "flex flex-col gap-300",
    list: `relative flex flex-row gap-200 ${BORDER} border-x-0 border-t-0 border-border-subtle`,
    tab: [
      "relative -mb-px cursor-pointer bg-transparent px-0 py-150 whitespace-nowrap",
      "font-sans text-sm font-medium text-fg-muted transition-colors",
      "outline-none hover:text-fg",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent",
      "data-[selected]:text-fg-accent",
    ],
    indicator: [
      "absolute bottom-0 left-0 h-[2px] bg-accent-solid",
      "w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)]",
      "transition-[translate,width] duration-200",
    ],
    panel: "outline-none",
  },
});
