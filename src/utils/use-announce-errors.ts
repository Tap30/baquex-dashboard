import { dismissToast, toast } from "@components/Toaster";
import { strings } from "@static-content";
import { extractErrorMessage } from "@utils/extract-error-message";
import { useEffect } from "react";

export const useAnnounceErrors = (errors: Array<Error | null>) => {
  const errorMessages = errors
    .filter(err => err !== null)
    .map(err => extractErrorMessage(err));

  const cacheKey = errorMessages.join("#");

  useEffect(() => {
    if (errorMessages.length === 0) return;

    const toasts: Array<string | number> = [];

    errorMessages.forEach(errMsg => {
      // eslint-disable-next-line no-console
      console.error(errMsg);

      const id = toast({
        title: strings.error,
        description: errMsg,
        color: "negative",
      });

      toasts.push(id);
    });

    return () => {
      toasts.forEach(dismissToast);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);
};
