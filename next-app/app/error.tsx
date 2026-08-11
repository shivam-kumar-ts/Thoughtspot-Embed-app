"use client";
import Link from "next/link";
import classes from "./styles/page.module.css";
import { PAGE_TEXT } from "@/app/utils/constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={classes.error}>
      <div className={classes.errorIconWrap}>
        <div className={classes.errorRing} />
        <div className={classes.errorRingInner}>
          <span className={classes.errorIcon}>&#9888;</span>
        </div>
      </div>

      <h1 className={classes.errorTitle}>{PAGE_TEXT.ERROR.TITLE}</h1>
      <p className={classes.errorDesc}>{PAGE_TEXT.ERROR.DESCRIPTION}</p>

      {error.message && (
        <span className={classes.errorDetail}>{error.message}</span>
      )}

      <div className={classes.errorActions}>
        <button onClick={reset} className={classes.errorBtnRetry}>
          &#8635; {PAGE_TEXT.ERROR.RETRY}
        </button>
        <Link href="/" className={classes.errorBtnHome}>
          {PAGE_TEXT.ERROR.BACK_HOME}
        </Link>
      </div>
    </div>
  );
}
