import { useContext } from "react";
import { SelectControlContext } from "../Context.ts";
import type { SelectControlRenderProps } from "../SelectControl.tsx";

export type SelectControlItemProps = {
  children: (renderProps: SelectControlRenderProps) => React.ReactNode;
};

export const SelectControlItem: React.FC<SelectControlItemProps> = props => {
  const { children: childrenProp } = props;

  const renderProps = useContext(SelectControlContext);

  if (!renderProps) {
    // eslint-disable-next-line no-console
    console.error("SelectControlItem must be used within a SelectControl.");

    return null;
  }

  const getChildren = (): React.ReactNode => {
    if (childrenProp) return childrenProp(renderProps);

    return null;
  };

  const children = getChildren();

  return <>{children}</>;
};
