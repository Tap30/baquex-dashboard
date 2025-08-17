import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";
import {
  type Cell as CellType,
  type RowData,
  type Table,
  flexRender,
} from "@tanstack/react-table";
import classes from "./styles.module.css";

export type CellProps<Data extends RowData, Value = unknown> = {
  /**
   * The className applied to the component.
   */
  className?: string;

  /**
   * The table cell reference.
   */
  cell: CellType<Data, Value>;

  /**
   * The table reference.
   */
  table: Table<Data>;
};

export const Cell = <Data extends RowData, Value = unknown>(
  props: CellProps<Data, Value>,
) => {
  const { className, cell } = props;

  return (
    <td className={cn(classes["root"], className)}>
      <Text
        variant="body2"
        color="secondary"
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Text>
    </td>
  );
};
