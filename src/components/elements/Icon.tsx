import { BaseSvg, type BaseSvgProps } from "../internals/index.internal.ts";

export type IconProps = Omit<BaseSvgProps, "children"> & {
  /**
   * The data attribute of the icon path.
   */
  data: string;
};

export const Icon: React.FC<IconProps> = (props): React.ReactNode => {
  const { data, ...otherProps } = props;

  return (
    <BaseSvg {...otherProps}>
      <path d={data} />
    </BaseSvg>
  );
};
