import {
  box,
  column,
  columns,
  container,
  divider,
  inline,
  stack,
  type BoxVariants,
  type ColumnVariants,
  type ColumnsVariants,
  type ContainerVariants,
  type DividerVariants,
  type InlineVariants,
  type StackVariants,
} from "@collie/recipes-tw";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

type Common = { as?: ElementType; children?: ReactNode } & Omit<
  HTMLAttributes<HTMLElement>,
  "color"
>;

export type BoxProps = Common & BoxVariants;

export function Box({
  as: Tag = "div",
  padding,
  paddingX,
  paddingY,
  background,
  border,
  radius,
  shadow,
  grow,
  overflow,
  className,
  ...props
}: BoxProps) {
  return (
    <Tag
      {...props}
      className={box({
        padding,
        paddingX,
        paddingY,
        background,
        border,
        radius,
        shadow,
        grow,
        overflow,
        className,
      })}
    />
  );
}

export type StackProps = Common & StackVariants;

export function Stack({ as: Tag = "div", space, align, className, ...props }: StackProps) {
  return <Tag {...props} className={stack({ space, align, className })} />;
}

export type InlineProps = Common & InlineVariants;

export function Inline({
  as: Tag = "div",
  space,
  align,
  alignY,
  className,
  ...props
}: InlineProps) {
  return <Tag {...props} className={inline({ space, align, alignY, className })} />;
}

export type ColumnsProps = Common & ColumnsVariants;

export function Columns({
  as: Tag = "div",
  space,
  collapseBelow,
  alignY,
  className,
  ...props
}: ColumnsProps) {
  return <Tag {...props} className={columns({ space, collapseBelow, alignY, className })} />;
}

export type ColumnProps = Common & ColumnVariants;

export function Column({ as: Tag = "div", width, className, ...props }: ColumnProps) {
  return <Tag {...props} className={column({ width, className })} />;
}

export type ContainerProps = Common & ContainerVariants;

export function Container({ as: Tag = "div", width, className, ...props }: ContainerProps) {
  return <Tag {...props} className={container({ width, className })} />;
}

export type DividerProps = Omit<HTMLAttributes<HTMLHRElement>, "color"> & DividerVariants;

export function Divider({ tone, className, ...props }: DividerProps) {
  return <hr {...props} className={divider({ tone, className })} />;
}
