import { Icon, type IconProps } from "@/components";

export type TapsiIconProps = Omit<IconProps, "data">;

export const TapsiIcon: React.FC<TapsiIconProps> = (props): React.ReactNode => {
  const TAPSI_ICON_DATA =
    "M10.75 8.25H18.25V10.75H10.75V8.25ZM5.75 13.25H18.25V15.75H5.75V13.25Z";

  return (
    <Icon
      {...props}
      data={TAPSI_ICON_DATA}
    />
  );
};
