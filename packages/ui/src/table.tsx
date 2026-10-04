import { table } from "@collie/recipes-tw";
import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

const slots = table();

export function Table({ children }: { children: ReactNode }) {
  return <table className={slots.root()}>{children}</table>;
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className={slots.head()}>
      <tr>{children}</tr>
    </thead>
  );
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className={slots.row()}>{children}</tr>;
}

export type TableCellProps = { align?: "start" | "end" } & Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "align"
>;

export function TableCell({ align = "start", children, ...props }: TableCellProps) {
  return (
    <td {...props} className={table({ align }).cell()}>
      {children}
    </td>
  );
}

export type TableHeaderCellProps = { align?: "start" | "end" } & Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  "align"
>;

export function TableHeaderCell({ align = "start", children, ...props }: TableHeaderCellProps) {
  return (
    <th {...props} className={table({ align }).headCell()}>
      {children}
    </th>
  );
}
