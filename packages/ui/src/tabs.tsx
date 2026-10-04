import { tabs } from "@collie/recipes-tw";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";

const slots = tabs();

export type TabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

export function Tabs({ children, ...props }: TabsProps) {
  return (
    <BaseTabs.Root {...props} className={slots.root()}>
      {children}
    </BaseTabs.Root>
  );
}

export function TabList({ children }: { children: ReactNode }) {
  return (
    <BaseTabs.List className={slots.list()}>
      {children}
      <BaseTabs.Indicator className={slots.indicator()} />
    </BaseTabs.List>
  );
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  return (
    <BaseTabs.Tab value={value} className={slots.tab()}>
      {children}
    </BaseTabs.Tab>
  );
}

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  return (
    <BaseTabs.Panel value={value} className={slots.panel()}>
      {children}
    </BaseTabs.Panel>
  );
}
