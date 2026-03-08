import Link from "next/link";
import classes from "./styles/page.module.css";

const pages = [
  { href: "/liveboard", label: "Liveboard" },
  { href: "/viz", label: "Visualization" },
  { href: "/search", label: "Search" },
  { href: "/spotter", label: "Spotter" },
  { href: "/full_app", label: "Full App" },
];

export default function NotFound() {
  return (
    <div className={classes.notFound}>
      <span className={classes.notFoundCode}>404</span>
      <h1 className={classes.notFoundTitle}>Page not found</h1>
      <p className={classes.notFoundDesc}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try one of the links below to get back on track.
      </p>

      <div className={classes.notFoundActions}>
        <Link href="/" className={classes.notFoundBtn}>
          Back to Home
        </Link>
        <Link href="/liveboard" className={classes.notFoundBtnSecondary}>
          Try Liveboard
        </Link>
      </div>

      <div className={classes.notFoundLinks}>
        {pages.map((p) => (
          <Link key={p.href} href={p.href} className={classes.notFoundChip}>
            {p.label} &rarr;
          </Link>
        ))}
      </div>
    </div>
  );
}
