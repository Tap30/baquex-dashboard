import { Paginator } from "@components/Paginator";
import { Text } from "@components/Text";
import { strings } from "@static-content";
import {
  getCoreRowModel,
  getFacetedRowModel,
  useReactTable,
  type ColumnDef,
  type CoreOptions,
  type RowData,
  type Table,
  type TableOptions,
  type TableState,
} from "@tanstack/react-table";
import type { WithRef } from "@types";
import { cn } from "@utils/cn";
import { useControllableProp } from "@utils/use-controllable-prop";
import { useImperativeHandle } from "react";
import { Cell, HeadCell } from "./components/index.internal.ts";
import classes from "./styles.module.css";

export type DataTableState = TableState;

export type DataTableColumnDef<
  Data extends RowData,
  Value = unknown,
> = ColumnDef<Data, Value>;

export type DataTableInstance<Data extends RowData> = Table<Data>;

export type DataTableProps<Data extends RowData, Value = unknown> = WithRef<
  {
    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * The classnames of the component.
     */
    classNames?: Partial<
      Record<
        | "root"
        | "table"
        | "caption"
        | "heading"
        | "body"
        | "row"
        | "headCell"
        | "cell"
        | "paginator"
        | "emptyStatement",
        string
      >
    >;

    /**
     * The caption of the table.
     */
    caption: string;

    /**
     * The instance of the table to access the imperative api.
     */
    dataTableInstanceRef?: React.RefObject<DataTableInstance<Data>>;

    /**
     * The array of column defs to use for the table.
     */
    columnsDef: ColumnDef<Data, Value>[];

    /**
     * The data for the table to display.
     */
    data: Data[];

    /**
     * The total pages to paginate.
     */
    pageCount: number;

    /**
     * The default state to set part or all of the table state.
     * Use when you do not need to control table state.
     */
    defaultState?: Partial<TableState>;

    /**
     * The state to control part or all of the table state.
     */
    state?: Partial<TableState>;

    /**
     * This optional function is used to listen to state changes within the table.
     */
    onStateChange?: (state: TableState) => void;

    /**
     * This optional function is used to listen to pagination state changes
     * within the table.
     */
    onPaginationChange?: (state: TableState["pagination"]) => void;

    /**
     * This optional function is used to listen to row selection state changes
     * within the table.
     */
    onRowSelectionChange?: (state: TableState["rowSelection"]) => void;

    /**
     * This optional function is used to listen to sorting state changes within
     * the table.
     */
    onSortingChange?: (state: TableState["sorting"]) => void;

    /**
     * This optional function is used to derive a unique ID for any given row.
     * If not provided the rows index is used (nested rows join together with `.`
     * using their grandparents' index eg. `index.index.index`)
     */
    rowIdGenerator?: CoreOptions<Data>["getRowId"];

    /**
     * Enables/disables row selection for all rows in the table.
     *
     * @default false
     */
    enableRowSelection?: boolean;

    /**
     * Enables/disables multiple row selection for all rows in the table.
     *
     * @default false
     */
    enableMultiRowSelection?: boolean;

    /**
     * Enables/disables pagination for the table.
     * Will render nothing when `pageCount` is `1` or `0`.
     *
     * @default true
     */
    enablePagination?: boolean;

    /**
     * Whether to disable the table interactions.
     *
     * @default false
     */
    disabled?: boolean;
  },
  "table"
>;

export const DataTable = <Data extends RowData, Value = unknown>(
  props: DataTableProps<Data, Value>,
) => {
  const {
    className,
    classNames,
    dataTableInstanceRef,
    columnsDef,
    data,
    defaultState,
    pageCount,
    caption,
    state: controlledState,
    enableRowSelection = false,
    enableMultiRowSelection = false,
    enablePagination = true,
    disabled = false,
    onStateChange,
    onPaginationChange,
    onRowSelectionChange,
    onSortingChange,
    rowIdGenerator,
  } = props;

  const handleTableStateChange: TableOptions<Data>["onStateChange"] =
    updater => {
      const newState =
        updater instanceof Function ? updater(tableState) : updater;

      onStateChange?.(newState);
      setUncontrolledTableState(newState);
    };

  const handleTablePaginationChange: TableOptions<Data>["onPaginationChange"] =
    updater => {
      const newState =
        updater instanceof Function ? updater(tableState.pagination) : updater;

      onPaginationChange?.(newState);
      setUncontrolledTableState(s => ({ ...s, pagination: newState }));
    };

  const handleTableSelectionChange: TableOptions<Data>["onRowSelectionChange"] =
    updater => {
      const newState =
        updater instanceof Function
          ? updater(tableState.rowSelection)
          : updater;

      onRowSelectionChange?.(newState);
      setUncontrolledTableState(s => ({ ...s, rowSelection: newState }));
    };

  const handleTableSortingChange: TableOptions<Data>["onSortingChange"] =
    updater => {
      const newState =
        updater instanceof Function ? updater(tableState.sorting) : updater;

      onSortingChange?.(newState);
      setUncontrolledTableState(s => ({ ...s, sorting: newState }));
    };

  const table = useReactTable<Data>({
    columns: columnsDef,
    data,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    pageCount,
    enableRowSelection,
    enableMultiRowSelection,
    onPaginationChange: handleTablePaginationChange,
    onRowSelectionChange: handleTableSelectionChange,
    onSortingChange: handleTableSortingChange,
    onStateChange: handleTableStateChange,
    getRowId: rowIdGenerator,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  useImperativeHandle(dataTableInstanceRef, () => table, [table]);

  const handlePageChange = (pageNumber: number) => {
    table.setPageIndex(pageNumber - 1);
  };

  const [tableState, setUncontrolledTableState] =
    useControllableProp<TableState>({
      controlledPropValue: controlledState
        ? { ...table.initialState, ...controlledState }
        : undefined,
      uncontrolledDefaultValueProp: defaultState
        ? { ...table.initialState, ...defaultState }
        : undefined,
      fallbackValue: table.initialState,
    });

  table.setOptions(prev => ({
    ...prev,
    state: tableState,
  }));

  const renderHeading = () => {
    return table.getHeaderGroups().map(headerGroup => {
      const headerCells = headerGroup.headers.map(header => (
        <HeadCell
          key={header.id}
          header={header}
          table={table}
          className={cn(classes["head-cell"], classNames?.headCell)}
        />
      ));

      return (
        <tr
          key={headerGroup.id}
          className={cn(classes["row"], classNames?.row)}
        >
          {headerCells}
        </tr>
      );
    });
  };

  const renderBody = () => {
    return table.getRowModel().rows.map(row => {
      const cells = row.getVisibleCells().map(cell => (
        <Cell
          key={cell.id}
          cell={cell}
          table={table}
          className={cn(classes["cell"], classNames?.cell)}
        />
      ));

      return (
        <tr
          key={row.id}
          className={cn(classes["row"], classNames?.row)}
          data-state={row.getIsSelected() ? "selected" : "unselected"}
        >
          {cells}
        </tr>
      );
    });
  };

  if (data.length === 0) {
    return (
      <Text
        variant="body2"
        as="p"
        align="center"
        color="tertiary"
        className={cn(classes["empty-statement"], classNames?.emptyStatement)}
      >
        {strings.emptyStatement.table}
      </Text>
    );
  }

  return (
    <div
      className={cn(classes["root"], className, classNames?.root, {
        [classes["disabled"]!]: disabled,
      })}
      inert={disabled}
      data-rows-count={data.length}
      data-page-count={pageCount}
      data-pagination-enabled={enablePagination}
      data-row-selection-enabled={enableRowSelection}
      data-disabled={disabled}
    >
      <table className={cn(classes["table"], classNames?.table)}>
        <Text
          as="caption"
          variant="body2"
          color="tertiary"
          className={cn(classes["caption"], classNames?.caption)}
        >
          {caption}
        </Text>
        <thead className={cn(classes["heading"], classNames?.heading)}>
          {renderHeading()}
        </thead>
        <tbody className={cn(classes["body"], classNames?.body)}>
          {renderBody()}
        </tbody>
      </table>
      <Paginator
        pageCount={pageCount}
        screenReaderLabel="Table pagination"
        className={cn(classes["paginator"], classNames?.paginator)}
        onPageChange={handlePageChange}
        disabled={!enablePagination}
        page={tableState.pagination.pageIndex + 1}
      />
    </div>
  );
};
