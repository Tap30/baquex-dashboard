import { useEffect, useState } from "react";

const handoff = { isComplete: false };

export const useIsServerHandoffComplete = (): boolean => {
  const [isComplete, setIsComplete] = useState(handoff.isComplete);

  useEffect(() => void (!isComplete && setIsComplete(true)), [isComplete]);

  useEffect(() => {
    if (!handoff.isComplete) handoff.isComplete = true;
  }, []);

  return isComplete;
};
