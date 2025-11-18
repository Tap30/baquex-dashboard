import { useCallback, useRef, useState } from "react";

const isUndefined = <T>(value: T | undefined): value is undefined => {
  return typeof value === "undefined";
};

export const useControllableProp = <T>(props: {
  controlledPropValue?: T;
  uncontrolledDefaultValueProp?: T;
  fallbackValue: T;
}): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const { fallbackValue, controlledPropValue, uncontrolledDefaultValueProp } =
    props;

  const { current: isControlled } = useRef(!isUndefined(controlledPropValue));

  const { current: defaultValue } = useRef(
    isUndefined(uncontrolledDefaultValueProp)
      ? fallbackValue
      : uncontrolledDefaultValueProp,
  );

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = (isControlled ? controlledPropValue : uncontrolledValue) as T;

  const setValue = useCallback<React.Dispatch<React.SetStateAction<T>>>(
    valueOrSetter => {
      if (isControlled) return;

      setUncontrolledValue(valueOrSetter);
    },
    [isControlled],
  );

  return [value, setValue] as const;
};
