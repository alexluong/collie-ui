import { button, type ButtonVariants } from "@collie/recipes-tw";
import type { ComponentPropsWithRef, ReactNode } from "react";

export type ButtonProps = ButtonVariants &
  Omit<ComponentPropsWithRef<"button">, "color"> & {
    leading?: ReactNode;
    trailing?: ReactNode;
    loading?: boolean;
  };

export function Button({
  emphasis,
  tone,
  size,
  leading,
  trailing,
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const slots = button({ emphasis, tone, size });

  return (
    <button
      {...props}
      className={slots.root({ className })}
      disabled={disabled ?? loading}
      data-loading={loading ? "" : undefined}
    >
      {leading ? <span className={slots.icon()}>{leading}</span> : null}
      {children}
      {trailing ? <span className={slots.icon()}>{trailing}</span> : null}
    </button>
  );
}
