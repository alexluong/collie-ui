import { avatar, tiles, type AvatarVariants, type TilesVariants } from "@collie/recipes-tw";
import type { ElementType, HTMLAttributes } from "react";

export type TilesProps = TilesVariants & { as?: ElementType } & HTMLAttributes<HTMLElement>;

export function Tiles({ as: Tag = "div", space, columns, className, ...props }: TilesProps) {
  return <Tag {...props} className={tiles({ space, columns, className })} />;
}

export type AvatarProps = AvatarVariants & {
  name: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, "color" | "children">;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ name, size, tone, className, ...props }: AvatarProps) {
  return (
    <span {...props} aria-label={name} className={avatar({ size, tone, className })}>
      {initials(name)}
    </span>
  );
}
