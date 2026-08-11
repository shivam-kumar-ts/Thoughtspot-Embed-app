import { useContext, useEffect } from "react";
import App from "./App";
import Footer from "./components/footer/index";
import Header from "./components/header/index";
import NotificationStack from "./components/notification/index";
import NotificationContext from "./contexts/NotificationContext";
import { authenticate } from "./utils/auth";
import { NOTIFICATION_TYPE } from "./types/index";
import { NOTIFICATION_MESSAGES } from "./utils/constants";

export default function AppInit() {
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
