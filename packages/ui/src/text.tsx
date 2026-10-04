import { heading, text, type HeadingVariants, type TextVariants } from "@collie/recipes-tw";
import type { ElementType, HTMLAttributes } from "react";

type Common = { as?: ElementType } & Omit<HTMLAttributes<HTMLElement>, "color">;

export type TextProps = Common & TextVariants;

export function Text({
  as: Tag = "p",
  size,
  tone,
  weight,
  align,
  truncate,
  className,
  ...props
}: TextProps) {
  return <Tag {...props} className={text({ size, tone, weight, align, truncate, className })} />;
}

export type HeadingProps = Common & HeadingVariants;

export function Heading({ as, level = 2, tone, className, ...props }: HeadingProps) {
  const Tag = as ?? (`h${level}` as ElementType);
  return <Tag {...props} className={heading({ level, tone, className })} />;
}
