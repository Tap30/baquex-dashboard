import { cn } from "@/utils";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const Header: React.FC<Props> = props => {
  const { className } = props;

  return (
    <header className={cn(classes["root"], className)}>
      <nav>NAV</nav>
    </header>
  );
};
