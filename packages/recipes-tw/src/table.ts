import { tv } from "tailwind-variants";
import { BORDER } from "./box.js";

export const table = tv({
  slots: {
    root: "w-full border-collapse font-sans text-sm text-fg",
    head: "text-left",
    headCell: `px-200 py-150 text-xs font-medium whitespace-nowrap text-fg-muted ${BORDER} border-x-0 border-t-0 border-border-subtle`,
    row: `${BORDER} border-x-0 border-t-0 border-border-subtle`,
    cell: "px-200 py-150 align-middle",
  },
  variants: {
    align: {
      start: { headCell: "text-left", cell: "text-left" },
      end: { headCell: "text-right", cell: "text-right" },
    },
  },
});
