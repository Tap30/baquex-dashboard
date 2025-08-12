import { Icon, type IconProps } from "@/components";

export type TapsiIconProps = Omit<IconProps, "data">;

export const TapsiIcon: React.FC<TapsiIconProps> = (props): React.ReactNode => {
  const TAPSI_ICON_DATA =
    "M10.5 7.8H19.5V10.5H10.5V7.8ZM5.1 13.5H19.5V16.5H5.1V13.5Z";

  return (
    <Icon
      {...props}
      data={TAPSI_ICON_DATA}
    />
  );
};
