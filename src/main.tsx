import { AlertDialogController } from "@components/AlertDialogController";
import { PortalConfigProvider } from "@components/Portal";
import { Toaster } from "@components/Toaster";
import appConfig from "@config";
import { PORTAL_DESTINATION_ID } from "@constants/config";
import { DirectionProvider } from "@contexts/Direction";
import { QueryClientProvider } from "@services/query-client";
import { strings } from "@static-content";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import "normalize.css";
import "./main.css";

strings.setLanguage(appConfig.language);

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
