import {
  AlertDialogController,
  PortalConfigProvider,
  Toaster,
} from "@/components";
import { PORTAL_DESTINATION_ID } from "@/constants";
import { DirectionProvider } from "@/contexts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import { QueryClientProvider } from "@/services";
import "normalize.css";
import "./main.css";

const root = document.getElementById("root");

if (!root) throw new Error("No root element found.");

const defaultContainerResolver = (): HTMLElement =>
  document.getElementById(PORTAL_DESTINATION_ID) ?? document.body;

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider>
      <DirectionProvider>
        <PortalConfigProvider
          config={{ resolveContainer: defaultContainerResolver }}
        >
          <App />
          <AlertDialogController />
          <div
            id={PORTAL_DESTINATION_ID}
            data-portal-destination=""
            tabIndex={-1}
          >
            <Toaster />
          </div>
        </PortalConfigProvider>
      </DirectionProvider>
    </QueryClientProvider>
  </StrictMode>,
);
