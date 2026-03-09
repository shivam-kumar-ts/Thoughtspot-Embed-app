"use client";
import { NotificationType } from "@/app/types";
import React, { useState, useCallback } from "react";
import { generateNotificationId } from "../utils/utils";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
};

type NotificationContextType = {
  notifications: Notification[];
  notify: (
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number,
  ) => void;
  dismiss: (id: string) => void;
};

const NotificationContext = React.createContext<NotificationContextType>({
  notifications: [],
  notify: () => {},
  dismiss: () => {},
});

type Props = {
  children: React.ReactNode;
};

const DEFAULT_DURATION: Record<NotificationType, number> = {
  success: 4000,
  info: 5000,
  warning: 6000,
  error: 8000,
};

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (
      type: NotificationType,
      title: string,
      message?: string,
      duration?: number,
    ) => {
      const id = generateNotificationId();
      const ttl = duration ?? DEFAULT_DURATION[type];

      const notification: Notification = {
        id,
        type,
        title,
        message,
        duration: ttl,
      };
      setNotifications((prev) => [...prev, notification]);
    },
    [dismiss],
  );

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
