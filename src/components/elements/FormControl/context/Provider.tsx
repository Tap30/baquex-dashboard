import { FormControlContext, type FormControlContextValue } from "./Context.ts";

export type FormControlProviderProps = {
  children: React.ReactNode;
  context: FormControlContextValue;
};

export const FormControlProvider: React.FC<
  FormControlProviderProps
> = props => {
  const { children, context } = props;

  return (
    <FormControlContext.Provider value={context}>
      {children}
    </FormControlContext.Provider>
  );
};
