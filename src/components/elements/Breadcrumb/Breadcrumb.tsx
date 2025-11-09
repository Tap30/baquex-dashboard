import { Text } from "@components/Text";
import type { WithRef } from "@types";
import { cn } from "@utils/cn";
import { Link } from "react-router";
import classes from "./styles.module.css";

export type BreadcrumbItem = {
  /**
   * The title of the item.
   */
  title: string;

  /**
   * The href of the link.
   */
  href: string;
};

export type BreadcrumbProps = WithRef<
  {
    /**
     * The label of the breadcrumb used for screen readers.
     */
    screenReaderLabel: string;

    /**
     * The classnames of the component.
     */
    classNames?: Record<
      "root" | "item" | "itemTitle" | "separator" | "list",
      string
    >;

    /**
     * The className applied to the component.
     */
    className?: string;

    /**
     * The breadcrumb items.
     */
    items: BreadcrumbItem[];

    /**
     * The symbol which is used as separator.
     */
    separatorSymbol: React.JSX.Element | string;
  },
  "nav"
>;

export const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const {
    items,
    screenReaderLabel,
    className,
    classNames,
    ref,
    separatorSymbol,
  } = props;

  const renderItems = () => {
    return items.reduce<React.JSX.Element[]>((result, item, idx) => {
      const key = item.title + item.href + idx;
      const isLast = idx === items.length - 1;

      result.push(
        <li
          key={key}
          className={cn(classes["item"], classNames?.item)}
        >
          <Text
            className={cn(classes["item-title"], classNames?.itemTitle)}
            variant="subheading1"
            as={Link}
            to={item.href}
            aria-current={isLast ? "page" : undefined}
          >
            {item.title}
          </Text>
        </li>,
      );

      if (idx < items.length - 1) {
        result.push(
          <li
            role="separator"
            key={key + "separator"}
            className={cn(classes["separator"], classNames?.separator)}
          >
            {separatorSymbol}
          </li>,
        );
      }

      return result;
    }, []);
  };

  return (
    <nav
      ref={ref}
      className={cn(classes["root"], className, classNames?.root)}
      aria-label={screenReaderLabel}
    >
      <ol
        className={cn(classes["list"], classNames?.list)}
        tabIndex={-1}
      >
        {renderItems()}
      </ol>
    </nav>
  );
};
