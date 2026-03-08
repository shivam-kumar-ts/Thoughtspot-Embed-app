"use client";
import Link from "next/link";
import classes from "./styles/page.module.css";

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

      <h1 className={classes.errorTitle}>Something went wrong</h1>
      <p className={classes.errorDesc}>
        An unexpected error occurred while loading this page. You can try again
        or head back to the home page.
      </p>

      {error.message && (
        <span className={classes.errorDetail}>{error.message}</span>
      )}

      <div className={classes.errorActions}>
        <button onClick={reset} className={classes.errorBtnRetry}>
          &#8635; Try Again
        </button>
        <Link href="/" className={classes.errorBtnHome}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
