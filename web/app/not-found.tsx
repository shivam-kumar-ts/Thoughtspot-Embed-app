import Link from "next/link";
import classes from "./styles/page.module.css";
import { NAV_ITEMS, PAGE_TEXT } from "@/app/utils/constants";

export default function NotFound() {
  return (
    <div className={classes.notFound}>
      <span className={classes.notFoundCode}>{PAGE_TEXT.NOT_FOUND.CODE}</span>
      <h1 className={classes.notFoundTitle}>{PAGE_TEXT.NOT_FOUND.TITLE}</h1>
      <p className={classes.notFoundDesc}>{PAGE_TEXT.NOT_FOUND.DESCRIPTION}</p>

      <div className={classes.notFoundActions}>
        <Link href="/" className={classes.notFoundBtn}>
          {PAGE_TEXT.NOT_FOUND.BACK_HOME}
        </Link>
        <Link href="/liveboard" className={classes.notFoundBtnSecondary}>
          {PAGE_TEXT.NOT_FOUND.TRY_LIVEBOARD}
        </Link>
      </div>

      <div className={classes.notFoundLinks}>
        {NAV_ITEMS.map((p) => (
          <Link key={p.href} href={p.href} className={classes.notFoundChip}>
            {p.label} &rarr;
          </Link>
        ))}
      </div>
    </div>
  );
}
