import { Text } from "@components/Text";
import {
  type Cell as CellType,
  type RowData,
  type Table,
  flexRender,
} from "@tanstack/react-table";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type CellProps<Data extends RowData, Value = unknown> = {
  /**
   * The className applied to the component.
   */
  className?: string;

  /**
   * The classnames of the component.
   */
  classNames?: Partial<Record<"root" | "text", string>>;

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
  const { className, classNames, cell } = props;

  const { meta } = cell.column.columnDef;
  const { center = false } = meta ?? {};

  return (
    <td
      className={cn(classes["root"], className, classNames?.root, {
        [classes["center"]!]: center,
      })}
      data-center={center}
      data-column-id={cell.column.id}
    >
      <Text
        variant="body2"
        color="secondary"
        className={classNames?.text}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Text>
    </td>
  );
};
