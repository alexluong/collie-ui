import { dialog, drawer, type DialogVariants } from "@collie/recipes-tw";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactNode } from "react";

type Root = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
};

type Panel = {
  title: string;
  description?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function Dialog({ children, ...props }: Root) {
  return <BaseDialog.Root {...props}>{children}</BaseDialog.Root>;
}

export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

export type DialogPanelProps = Panel & DialogVariants;

export function DialogPanel({ title, description, footer, size, children }: DialogPanelProps) {
  const slots = dialog({ size });
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={slots.backdrop()} />
      <BaseDialog.Popup className={slots.popup()}>
        <div className={slots.header()}>
          <BaseDialog.Title className={slots.title()}>{title}</BaseDialog.Title>
          {description ? (
            <BaseDialog.Description className={slots.description()}>
              {description}
            </BaseDialog.Description>
          ) : null}
        </div>
        <div className={slots.body()}>{children}</div>
        {footer ? <div className={slots.footer()}>{footer}</div> : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

// A side panel is a Dialog anchored to an edge. Base UI ships a swipeable
// Drawer as well; that one is built for mobile sheets, not desk-bound panels.
export function Drawer({ children, ...props }: Root) {
  return <BaseDialog.Root {...props}>{children}</BaseDialog.Root>;
}

export const DrawerTrigger = BaseDialog.Trigger;
export const DrawerClose = BaseDialog.Close;

export function DrawerPanel({ title, description, footer, children }: Panel) {
  const slots = drawer();
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={slots.backdrop()} />
      <BaseDialog.Popup className={slots.popup()}>
        <div className={slots.header()}>
          <BaseDialog.Title className={slots.title()}>{title}</BaseDialog.Title>
          {description ? (
            <BaseDialog.Description className={slots.description()}>
              {description}
            </BaseDialog.Description>
          ) : null}
        </div>
        <div className={slots.body()}>{children}</div>
        {footer ? <div className={slots.footer()}>{footer}</div> : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}
