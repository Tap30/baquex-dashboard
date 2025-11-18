import type { RowData } from "@tanstack/react-table";

export * from "./DataTable.tsx";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    center: boolean;
  }
}
