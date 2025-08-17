import { BREAKPOINT_KEYS, BreakpointStopValue } from "@/constants/breakpoints";

const convertValueToUnit = (valueInPx: number, unit: "px" | "rem") =>
  valueInPx / (unit === "px" ? 1 : 16);

const MEDIAQUERY_UNIT: "px" | "rem" = "px";
const MEDIAQUERY_STEP_PERCENTILE = 5;

type Options = {
  excludeAtMedia?: boolean;
};

type Keys = keyof typeof BreakpointStopValue;

export const mediaQueryUp = (key: Keys | number, options?: Options) => {
  const { excludeAtMedia = false } = options ?? {};
  const valueInPx = typeof key === "number" ? key : BreakpointStopValue[key];

  let atMedia: string = "";

  if (!excludeAtMedia) atMedia = "@media";

  const value = convertValueToUnit(valueInPx, MEDIAQUERY_UNIT);

  return [atMedia, `(min-width:${value}${MEDIAQUERY_UNIT})`].join(" ");
};

export const mediaQueryDown = (key: Keys | number, options?: Options) => {
  const { excludeAtMedia = false } = options ?? {};

  if (
    typeof key !== "number" &&
    BREAKPOINT_KEYS.indexOf(key) === BREAKPOINT_KEYS.length - 1
  ) {
    return mediaQueryUp(BREAKPOINT_KEYS[0], options);
  }

  let atMedia: string = "";

  if (!excludeAtMedia) atMedia = "@media";

  const stopValueInPx =
    typeof key === "number" ? key : BreakpointStopValue[key];

  const valueInPx = stopValueInPx - MEDIAQUERY_STEP_PERCENTILE / 100;
  const value = convertValueToUnit(valueInPx, MEDIAQUERY_UNIT);

  return [atMedia, `(max-width:${value}${MEDIAQUERY_UNIT})`].join(" ");
};

export const mediaQueryBetween = (
  startKey: Keys | number,
  endKey: Keys | number,
  options?: Options,
) => {
  const { excludeAtMedia = false } = options ?? {};

  const endIndex =
    typeof endKey !== "number" ? BREAKPOINT_KEYS.indexOf(endKey) : -1;

  if (endIndex === BREAKPOINT_KEYS.length - 1)
    return mediaQueryUp(startKey, options);

  const minValInPx =
    typeof startKey === "number" ? startKey : BreakpointStopValue[startKey];

  let maxValInPx: number;

  if (endIndex === -1) maxValInPx = endKey as number;
  else maxValInPx = BreakpointStopValue[BREAKPOINT_KEYS[endIndex]!];

  let atMedia: string = "";

  if (!excludeAtMedia) atMedia = "@media";

  const minVal = convertValueToUnit(minValInPx, MEDIAQUERY_UNIT);
  const maxVal = convertValueToUnit(
    maxValInPx - MEDIAQUERY_STEP_PERCENTILE / 100,
    MEDIAQUERY_UNIT,
  );

  return [
    atMedia,
    `(min-width:${minVal}${MEDIAQUERY_UNIT})`,
    "and",
    `(max-width:${maxVal}${MEDIAQUERY_UNIT})`,
  ].join(" ");
};

export const getBreakpointWidth = (key: Keys) => BreakpointStopValue[key];
