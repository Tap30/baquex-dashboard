import { useEffect, useState } from "react";

const SERVER_HANDOFF = { isCompleted: false };

export const useIsServerHandoffCompleted = (): boolean => {
  const [isCompleted, setIsCompleted] = useState(SERVER_HANDOFF.isCompleted);

  useEffect(() => {
    if (SERVER_HANDOFF.isCompleted) return;

    SERVER_HANDOFF.isCompleted = true;
  }, []);

  useEffect(() => {
    if (isCompleted) return;

    setIsCompleted(true);
  }, [isCompleted]);

  return isCompleted;
};
