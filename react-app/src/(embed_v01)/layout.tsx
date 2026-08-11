"use client";
import { NOTIFICATION_TYPE } from "../types";
import { useContext, useEffect } from "react";
import { authenticate } from "@/app/utils/auth";
import { NOTIFICATION_MESSAGES } from "../utils/constants";
import NotificationContext from "@/app/contexts/NotificationContext";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <>{children}</>;
}
