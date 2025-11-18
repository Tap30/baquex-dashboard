import type {
  BreakpointStops,
  ExcludeUndefined,
  PropValueWithBreakpoints,
} from "@types";

const isBreakpointStopsMap = <T>(
  o: unknown,
): o is Partial<Record<BreakpointStops, T>> => {
  if (typeof o !== "object") return false;

  const breakpointSteps = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "fallback",
  ] as const satisfies BreakpointStops[];

  return Object.keys(o as object).some(k =>
    breakpointSteps.includes(k as BreakpointStops),
  );
};

export const generateTailwindClassesWithBreakpoints = <T>(
  tailwindBaseClass: string,
  propValueWithBreakpoints: PropValueWithBreakpoints<T>,
  valueMapper?: (value: ExcludeUndefined<T>) => string | undefined,
) => {
  const classes: string[] = [];

  const mapper =
    valueMapper ??
    ((v: T) => (typeof v === "undefined" ? undefined : String(v)));

  if (isBreakpointStopsMap(propValueWithBreakpoints)) {
    Object.entries(propValueWithBreakpoints).forEach(([stepKey, value]) => {
      const v = mapper(value as ExcludeUndefined<T>);

      if (typeof v !== "undefined") {
        const twSuffix = `${tailwindBaseClass}-${v}`;

        if ((stepKey as BreakpointStops) === "fallback") {
          classes.push(twSuffix);
        } else {
          classes.push(`${stepKey}:${twSuffix}`);
        }
      }
    });
  } else {
    const v = mapper(propValueWithBreakpoints as ExcludeUndefined<T>);

    if (typeof v !== "undefined") {
      classes.push(`${tailwindBaseClass}-${v}`);
    }
  }

  return classes.join(" ");
};
