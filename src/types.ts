export type Overwrite<T, U> = Omit<T, keyof U> & U;

export type MergeElementProps<
  E extends React.ElementType,
  P = object,
> = Overwrite<React.ComponentPropsWithRef<E>, P>;

export type PolymorphicProps<
  E extends React.ElementType,
  P = object,
> = MergeElementProps<
  E,
  P & {
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    as?: E;
  }
>;

export type WithBaseProps<P extends object> = P & {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * The classname of the component's root.
   */
  className?: string;
};

export type BreakpointStops = "xs" | "sm" | "md" | "lg" | "xl" | "fallback";

export type ExcludeUndefined<T> = Exclude<T, undefined>;

export type PropValueWithBreakpoints<T> = T | { [P in BreakpointStops]?: T };
