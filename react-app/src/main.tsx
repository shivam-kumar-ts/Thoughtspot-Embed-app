import { StrictMode, useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/globals.css";
import App from "./App.tsx";
import Footer from "./components/footer/index.tsx";
import Header from "./components/header/index.tsx";
import NotificationStack from "./components/notification/index.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import NotificationContext from "./contexts/NotificationContext.tsx";
import { authenticate } from "./utils/auth.ts";
import { NOTIFICATION_TYPE } from "./types/index.ts";
import { NOTIFICATION_MESSAGES } from "./utils/constants.ts";

function AppInit() {
  const { notify } = useContext(NotificationContext);

  useEffect(() => {
    authenticate((err) => {
      notify(
        NOTIFICATION_TYPE.ERROR,
        NOTIFICATION_MESSAGES.auth.failed,
        err.message || NOTIFICATION_MESSAGES.auth.message,
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NotificationStack />
      <Header />
      <App />
      <Footer />
    </>
  );
}

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
