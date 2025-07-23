import { cn } from "@/utils";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = props => {
  const { className } = props;

  return <footer className={cn(classes["root"], className)}>FOOTER</footer>;
};
