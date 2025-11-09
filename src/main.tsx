import { grpcDebugLogger } from "@services/grpc";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import "normalize.css";
import "./main.css";

const root = document.getElementById("root");

if (!root) throw new Error("No root element found.");

const initApp = () => {
  grpcDebugLogger.init();
};

initApp();

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
