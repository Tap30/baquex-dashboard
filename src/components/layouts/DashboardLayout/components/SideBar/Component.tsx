import { cn } from "@/utils";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const SideBar: React.FC<Props> = props => {
  const { className } = props;

  return <aside className={cn(classes["root"], className)}>SIDEBAR</aside>;
};
