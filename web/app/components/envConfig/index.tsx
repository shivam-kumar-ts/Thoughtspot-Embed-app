"use client";
import { useContext, useEffect, useState } from "react";
import classes from "./index.module.css";
import { PAGE_TEXT } from "@/app/utils/constants";
import { NOTIFICATION_TYPE } from "@/app/types";
import { getEmbedEnv, saveEmbedEnv, clearEmbedEnv } from "@/app/utils/embedEnv";
import NotificationContext from "@/app/contexts/NotificationContext";

const TEXT = PAGE_TEXT.ENV_FORM;

const EnvConfig = () => {
  const { notify } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [host, setHost] = useState("");
  const [password, setPassword] = useState("");
  const [liveboardId, setLiveboardId] = useState("");
  const [vizId, setVizId] = useState("");
  const [worksheetId, setWorksheetId] = useState("");

  const syncFromStore = () => {
    const env = getEmbedEnv();
    setUsername(env.username);
    setHost(env.host);
    setPassword(env.password);
    setLiveboardId(env.liveboardId);
    setVizId(env.vizId);
    setWorksheetId(env.worksheetId);
  };

  useEffect(() => {
    syncFromStore();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    // Refresh fields from storage whenever the modal opens.
    syncFromStore();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmbedEnv({
      username,
      host,
      password,
      liveboardId,
      vizId,
      worksheetId,
    });
    notify(NOTIFICATION_TYPE.SUCCESS, TEXT.SUCCESS_TITLE, TEXT.SUCCESS_MESSAGE);
    setOpen(false);
  };

  const handleReset = () => {
    clearEmbedEnv();
    syncFromStore();
    notify(NOTIFICATION_TYPE.INFO, TEXT.RESET_TITLE, TEXT.RESET_MESSAGE);
  };

  return (
    <>
      <button
        type="button"
        className={classes.fab}
        onClick={() => setOpen(true)}
        aria-label={TEXT.TITLE}
        title={TEXT.BADGE}
      >
        <span className={classes.fabIcon} aria-hidden="true">
          &#9881;
        </span>
      </button>

      {open && (
        <div
          className={classes.overlay}
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className={classes.modal}
            role="dialog"
            aria-modal="true"
            aria-label={TEXT.TITLE}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={classes.close}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <span className={classes.badge}>
              <span className={classes.badgeDot} />
              {TEXT.BADGE}
            </span>
            <h2 className={classes.title}>{TEXT.TITLE}</h2>
            <p className={classes.subtitle}>{TEXT.SUBTITLE}</p>

            <form className={classes.form} onSubmit={handleSave}>
              <label className={classes.field}>
                <span className={classes.label}>
                  {TEXT.FIELDS.USERNAME.label}
                </span>
                <input
                  type="text"
                  className={classes.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={TEXT.FIELDS.USERNAME.placeholder}
                  autoComplete="username"
                />
              </label>

              <label className={classes.field}>
                <span className={classes.label}>{TEXT.FIELDS.HOST.label}</span>
                <input
                  type="text"
                  className={classes.input}
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder={TEXT.FIELDS.HOST.placeholder}
                />
              </label>

              <label className={classes.field}>
                <span className={classes.label}>
                  {TEXT.FIELDS.PASSWORD.label}
                </span>
                <input
                  type="password"
                  className={classes.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={TEXT.FIELDS.PASSWORD.placeholder}
                  autoComplete="current-password"
                />
              </label>

              <label className={classes.field}>
                <span className={classes.label}>
                  {TEXT.FIELDS.LIVEBOARD_ID.label}
                </span>
                <input
                  type="text"
                  className={classes.input}
                  value={liveboardId}
                  onChange={(e) => setLiveboardId(e.target.value)}
                  placeholder={TEXT.FIELDS.LIVEBOARD_ID.placeholder}
                />
              </label>

              <label className={classes.field}>
                <span className={classes.label}>
                  {TEXT.FIELDS.VIZ_ID.label}
                </span>
                <input
                  type="text"
                  className={classes.input}
                  value={vizId}
                  onChange={(e) => setVizId(e.target.value)}
                  placeholder={TEXT.FIELDS.VIZ_ID.placeholder}
                />
              </label>

              <label className={classes.field}>
                <span className={classes.label}>
                  {TEXT.FIELDS.WORKSHEET_ID.label}
                </span>
                <input
                  type="text"
                  className={classes.input}
                  value={worksheetId}
                  onChange={(e) => setWorksheetId(e.target.value)}
                  placeholder={TEXT.FIELDS.WORKSHEET_ID.placeholder}
                />
              </label>

              <div className={classes.actions}>
                <button type="submit" className={classes.btnPrimary}>
                  {TEXT.SAVE}
                </button>
                <button
                  type="button"
                  className={classes.btnSecondary}
                  onClick={handleReset}
                >
                  {TEXT.RESET}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EnvConfig;
