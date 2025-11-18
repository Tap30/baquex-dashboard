import { Breadcrumb, useBreadcrumb } from "@components/Breadcrumb";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { useDirection } from "@contexts/Direction";
import { mdiMenuClose, mdiMenuOpen } from "@mdi/js";
import { strings } from "@static-content";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

type Props = {
  className?: string;
  isNavOpen: boolean;
  toggleNav: () => void;
};

export const Header: React.FC<Props> = props => {
  const { className, isNavOpen, toggleNav } = props;

  const { crumbs } = useBreadcrumb();
  const dir = useDirection();

  const label = isNavOpen ? strings.navButton.close : strings.navButton.open;

  const icon = isNavOpen
    ? dir === "rtl"
      ? mdiMenuClose
      : mdiMenuOpen
    : dir === "rtl"
      ? mdiMenuOpen
      : mdiMenuClose;

  const handleNavOpenClick = () => {
    toggleNav();
  };

  return (
    <header className={cn(classes["root"], className)}>
      <IconButton
        aria-label={label}
        icon={<Icon data={icon} />}
        variant="ghost"
        color="neutral"
        onClick={handleNavOpenClick}
      />
      <Breadcrumb
        className={classes["breadcrumb"]}
        screenReaderLabel={strings.breadcrumb}
        items={crumbs}
        separatorSymbol={"/"}
      />
    </header>
  );
};
