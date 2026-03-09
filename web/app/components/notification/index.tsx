"use client";
import classes from "./index.module.css";
import NotificationContext, {
  type Notification,
} from "@/app/contexts/NotificationContext";
import { NotificationType } from "@/app/types";
import { useContext, useEffect, useRef, useCallback } from "react";

const ICONS: Record<NotificationType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const TYPE_LABELS: Record<NotificationType, string> = {
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

type ToastProps = {
  notification: Notification;
  onDismiss: (id: string) => void;
};

const Toast = ({ notification: n, onDismiss }: ToastProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(n.duration ?? 0);
  const startedAtRef = useRef<number>(new Date().getTime());

  const startTimer = useCallback(() => {
    if (remainingRef.current <= 0) return;
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => onDismiss(n.id), remainingRef.current);
  }, [n.id, onDismiss]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      remainingRef.current -= Date.now() - startedAtRef.current;
      if (remainingRef.current < 0) remainingRef.current = 0;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTimer]);

  return (
    <div
      className={`${classes.toast} ${classes[n.type]}`}
      role="alert"
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      <span className={classes.icon}>{ICONS[n.type]}</span>
      <div className={classes.body}>
        <div className={classes.titleRow}>
          <span className={classes.title}>{n.title}</span>
          <span className={classes.typeLabel}>{TYPE_LABELS[n.type]}</span>
        </div>
        {n.message && <span className={classes.message}>{n.message}</span>}
      </div>
      <button
        className={classes.close}
        onClick={() => onDismiss(n.id)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
      {n.duration && n.duration > 0 && (
        <span
          className={classes.progress}
          style={{ animationDuration: `${n.duration}ms` }}
        />
      )}
    </div>
  );
};

const NotificationStack = () => {
  const { notifications, dismiss } = useContext(NotificationContext);

  if (notifications.length === 0) return null;

  return (
    <div className={classes.container} aria-live="polite">
      {notifications.map((n) => (
        <Toast key={n.id} notification={n} onDismiss={dismiss} />
      ))}
    </div>
  );
};

export default NotificationStack;
