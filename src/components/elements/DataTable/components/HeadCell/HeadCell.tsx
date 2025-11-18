import { ClickableArea } from "@components/ClickableArea";
import { Flex } from "@components/Flex";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import { mdiArrowDown, mdiArrowUp, mdiSwapVertical } from "@mdi/js";
import { strings } from "@static-content";
import {
  flexRender,
  type Header,
  type RowData,
  type Table,
} from "@tanstack/react-table";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type HeadCellProps<Data extends RowData, Value = unknown> = {
  /**
   * The className applied to the component.
   */
  className?: string;

  /**
   * The classnames of the component.
   */
  classNames?: Partial<
    Record<"root" | "content" | "button" | "text" | "icon", string>
  >;

  /**
   * The table header reference.
   */
  header: Header<Data, Value>;

  /**
   * The table reference.
   */
  table: Table<Data>;
};

export const HeadCell = <Data extends RowData, Value = unknown>(
  props: HeadCellProps<Data, Value>,
) => {
  const { className, classNames, header, table } = props;

  const { meta } = header.column.columnDef;
  const { center = false } = meta ?? {};

  const isSortable = header.column.getCanSort();
  const nextSortingOrder = header.column.getNextSortingOrder();
  const sortDir = header.column.getIsSorted();

  const ariaSort = sortDir
    ? sortDir === "asc"
      ? "ascending"
      : "descending"
    : "none";

  const getTitle = () => {
    if (!isSortable) return undefined;

    if (nextSortingOrder === "desc") {
      return strings.sorting.descending;
    } else if (nextSortingOrder === "asc") {
      return strings.sorting.ascending;
    }

    return strings.sorting.clear;
  };

  const handleClick = () => {
    const colId = header.column.id;

    if (!nextSortingOrder) table.setSorting([]);
    else {
      table.setSorting([{ id: colId, desc: nextSortingOrder === "desc" }]);
    }
  };

  const renderContent = () => {
    if (header.isPlaceholder) return null;

    const iconData = !isSortable
      ? null
      : sortDir === "desc"
        ? mdiArrowDown
        : sortDir === "asc"
          ? mdiArrowUp
          : mdiSwapVertical;

    const content = (
      <Flex
        gap="sm"
        alignItems="center"
        justifyContent={center ? "center" : undefined}
        className={cn(classes["content"], classNames?.content)}
        data-state={sortDir ? "sorted" : "unsorted"}
      >
        <Text
          variant="subheading2"
          weight={700}
          className={classNames?.text}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Text>
        {iconData && (
          <Icon
            data={iconData}
            size={18}
            className={classNames?.icon}
          />
        )}
      </Flex>
    );

    if (isSortable) {
      return (
        <ClickableArea
          className={cn(classes["button"], classNames?.button)}
          title={getTitle()}
          onClick={handleClick}
        >
          {content}
        </ClickableArea>
      );
    }

    return content;
  };

  return (
    <th
      className={cn(classes["root"], className, classNames?.root, {
        [classes["center"]!]: center,
      })}
      aria-sort={ariaSort}
      data-sortable={isSortable}
      data-sort-direction={sortDir || "none"}
      data-center={center}
    >
      {renderContent()}
    </th>
  );
};
