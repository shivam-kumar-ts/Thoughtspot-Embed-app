import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";
import Footer from "./components/footer/index.tsx";
import Header from "./components/header/index.tsx";
import NotificationStack from "./components/notification/index.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <AppContextProvider>
        <NotificationStack />
        <Header />
        <App />
        <Footer />
      </AppContextProvider>
    </NotificationProvider>
  </StrictMode>,
);
