import { DEFAULT_LANGUAGE, Languages } from "@/constants";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";

const dir: "ltr" | "rtl" = DEFAULT_LANGUAGE === Languages.FA ? "rtl" : "ltr";

export const DirectionProvider: React.FC<{
  children: React.ReactNode;
}> = props => {
  const { children } = props;

  return (
    <div
      dir={dir}
      data-direction-provider=""
    >
      <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>
    </div>
  );
};
