import { badge, type BadgeVariants } from "@collie/recipes-tw";
import type { HTMLAttributes } from "react";

export type BadgeProps = BadgeVariants & Omit<HTMLAttributes<HTMLSpanElement>, "color">;

export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span {...props} className={badge({ tone, className })} />;
}
