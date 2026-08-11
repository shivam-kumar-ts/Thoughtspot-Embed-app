"use client";
import { NOTIFICATION_TYPE } from "../types";
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/app/utils/auth";
import { NOTIFICATION_MESSAGES } from "../utils/constants";
import NotificationContext from "@/app/contexts/NotificationContext";
import LoadingComponent from "@/app/components/loading";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { notify } = useContext(NotificationContext);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    authenticate((err) => {
      notify(
        NOTIFICATION_TYPE.ERROR,
        NOTIFICATION_MESSAGES.auth.failed,
        err.message || NOTIFICATION_MESSAGES.auth.message,
      );
    })
      .then(() => setIsInitialized(true))
      .catch(() => setIsInitialized(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isInitialized ? <>{children}</> : <LoadingComponent />;
}
