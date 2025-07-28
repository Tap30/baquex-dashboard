import { DirectionProvider } from "@/contexts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import "normalize.css";
import { PORTALS_SECTION_ID } from "./constants/config.ts";
import "./main.css";

const root = document.getElementById("root");

if (!root) throw new Error("No root element found.");

createRoot(root).render(
  <StrictMode>
    <DirectionProvider>
      <App />
      <div id={PORTALS_SECTION_ID} />
    </DirectionProvider>
  </StrictMode>,
);
