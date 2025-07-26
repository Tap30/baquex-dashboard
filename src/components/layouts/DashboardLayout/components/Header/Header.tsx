import { Breadcrumb, Icon, IconButton } from "@/components";
import { strings } from "@/static-content";
import { cn } from "@/utils";
import { mdiMenuClose, mdiMenuOpen } from "@mdi/js";
import { useBreadcrumb } from "../../BreadcrumbContext/index.ts";
import classes from "./styles.module.css";

type Props = {
  className?: string;
  isNavOpen: boolean;
  toggleNav: () => void;
};

export const Header: React.FC<Props> = props => {
  const { className, isNavOpen, toggleNav } = props;

  const { crumbs } = useBreadcrumb();

  const label = isNavOpen ? strings.navButton.close : strings.navButton.open;
  const icon = isNavOpen ? mdiMenuClose : mdiMenuOpen;

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
