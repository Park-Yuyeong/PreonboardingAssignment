import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./instrument.ts";
import ModalProvider from "./providers/ModalProvider.tsx";
import QueryProvider from "./providers/QueryProvider.tsx";
import ToastProvider from "./providers/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ToastProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ToastProvider>
    </QueryProvider>
  </StrictMode>
);
