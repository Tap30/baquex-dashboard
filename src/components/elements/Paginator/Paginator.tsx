import { Button } from "@components/Button";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { useDirection } from "@contexts/Direction";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { strings } from "@static-content";
import type { WithRef } from "@types";
import { cn } from "@utils/cn";
import { clamp } from "@utils/math";
import { formatNumber } from "@utils/numbers";
import { useControllableProp } from "@utils/use-controllable-prop";
import { PaginatorActionTypes } from "./constants.ts";
import classes from "./styles.module.css";
import { generatePages } from "./utils.ts";

type ActionType =
  (typeof PaginatorActionTypes)[keyof typeof PaginatorActionTypes];

export type PaginatorProps = WithRef<
  {
    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * The classnames of the component.
     */
    classNames?: Partial<Record<"root" | "page" | "dot", string>>;

    /**
     * The total number of pages.
     */
    pageCount: number;

    /**
     * The page selected by default when the component's `page` prop is uncontrolled.
     */
    defaultPage?: number;

    /**
     * The current page.
     */
    page?: number;

    /**
     * The label of the paginator used for screen readers.
     */
    screenReaderLabel: string;

    /**
     * If `true`, the component will be disabled.
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * A function which returns a string value that provides a user-friendly
     * name for the page action. This is important for screen reader users.
     */
    overridePageLabel?: (page: number, selected: boolean) => string;

    /**
     * A function which returns a string value that provides a user-friendly
     * name for the action. This is important for screen reader users.
     */
    overrideActionLabel?: (type: ActionType) => string;

    /**
     * Callback fired when the page is changed.
     */
    onPageChange?: (page: number) => void;
  },
  "nav"
>;

export const Paginator: React.FC<PaginatorProps> = props => {
  const {
    ref,
    className,
    classNames,
    pageCount,
    screenReaderLabel,
    page: controlledPage,
    defaultPage,
    onPageChange,
    overrideActionLabel,
    overridePageLabel,
    disabled = false,
  } = props;

  const [page, setPage] = useControllableProp({
    controlledPropValue: controlledPage,
    uncontrolledDefaultValueProp: defaultPage,
    fallbackValue: 1,
  });

  const direction = useDirection();

  const isPageSelected = (targetPage: number) => page === targetPage;

  const updatePage = (page: number) => {
    if (disabled) return;

    const newPage = clamp(page, 1, pageCount);

    setPage(newPage);
    onPageChange?.(newPage);
  };

  const renderGoNext = () => {
    const label =
      overrideActionLabel?.(PaginatorActionTypes.NEXT) ??
      strings.components.paginator.nextPage;

    const isDisabled = disabled || page === pageCount;
    const icon =
      direction === "ltr" ? (
        <Icon data={mdiChevronRight} />
      ) : (
        <Icon data={mdiChevronLeft} />
      );

    return (
      <IconButton
        variant="ghost"
        disabled={isDisabled}
        color="neutral"
        icon={icon}
        aria-label={label}
        onClick={() => updatePage(page + 1)}
      />
    );
  };

  const renderGoPrevious = () => {
    const label =
      overrideActionLabel?.(PaginatorActionTypes.PREVIOUS) ??
      strings.components.paginator.prevPage;

    const isDisabled = disabled || page === 1;
    const icon =
      direction === "ltr" ? (
        <Icon data={mdiChevronLeft} />
      ) : (
        <Icon data={mdiChevronRight} />
      );

    return (
      <IconButton
        variant="ghost"
        color="neutral"
        disabled={isDisabled}
        icon={icon}
        aria-label={label}
        onClick={() => updatePage(page - 1)}
      />
    );
  };

  const renderPages = () => {
    const next5Label =
      overrideActionLabel?.(PaginatorActionTypes.NEXT_5) ??
      strings.components.paginator.next5Pages;

    const prev5Label =
      overrideActionLabel?.(PaginatorActionTypes.PREVIOUS_5) ??
      strings.components.paginator.prev5Pages;

    const pages = generatePages({ page, pageCount });

    return pages.map((pageInfo, idx) => {
      const pageNumber = Math.abs(pageInfo);
      const isDots = pageInfo < 0;

      if (isDots) {
        const isPrevDots = idx === 2;

        return (
          <Button
            key={String(pageInfo) + String(idx)}
            variant="ghost"
            color="neutral"
            disabled={disabled}
            text={"..."}
            className={cn(classes["dot"], classNames?.dot)}
            aria-label={isPrevDots ? prev5Label : next5Label}
            onClick={() => updatePage(pageNumber)}
          />
        );
      }

      const isSelected = isPageSelected(pageNumber);
      const pageNumberDisplay = formatNumber(pageNumber);

      const pageLabel =
        overridePageLabel?.(pageNumber, isSelected) ??
        (strings.formatString(
          strings.components.paginator.goToPage,
          pageNumberDisplay,
        ) as string);

      return (
        <Button
          {...(isSelected
            ? { variant: "filled", color: "brand" }
            : { variant: "ghost", color: "neutral" })}
          className={cn(classes["page"], classNames?.page)}
          key={String(pageInfo) + String(idx)}
          aria-current={isSelected ? "true" : undefined}
          disabled={disabled}
          text={pageNumberDisplay}
          aria-label={pageLabel}
          onClick={() => updatePage(pageNumber)}
        />
      );
    });
  };

  if (pageCount <= 1) return null;

  return (
    <nav
      ref={ref}
      inert={disabled}
      aria-disabled={disabled}
      aria-label={screenReaderLabel}
      className={cn(className, classes["root"], classNames?.root, {
        [classes["disabled"]!]: disabled,
      })}
      data-page={page}
      data-page-count={pageCount}
      data-disabled={disabled}
    >
      {renderGoPrevious()}
      {renderPages()}
      {renderGoNext()}
    </nav>
  );
};
