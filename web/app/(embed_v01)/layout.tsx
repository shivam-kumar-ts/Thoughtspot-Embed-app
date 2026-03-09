"use client";
import { NOTIFICATION_TYPE } from "../types";
import { authenticate } from "@/app/utils/auth";
import { useContext, useEffect, useRef } from "react";
import { NOTIFICATION_MESSAGES } from "../utils/constants";
import NotificationContext from "@/app/contexts/NotificationContext";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const attempted = useRef(false);
  const { notify } = useContext(NotificationContext);

  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;
    authenticate((err) => {
      notify(
        NOTIFICATION_TYPE.ERROR,
        NOTIFICATION_MESSAGES.auth.failed,
        err.message || NOTIFICATION_MESSAGES.auth.message,
      );
    });
  }, [notify]);

  return <>{children}</>;
}
