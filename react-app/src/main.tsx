import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/globals.css";
import { AppContextProvider } from "./contexts/AppContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AppInit from "./AppInit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AppContextProvider>
          <AppInit />
        </AppContextProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
);
