import Link from "next/link";
import classes from "./index.module.css";
import { LINKS, FEATURES, PAGE_TEXT } from "@/app/utils/constants";

const Intro = () => {
  return (
    <div className={classes.container}>
      <section className={classes.hero}>
        <span className={classes.badge}>
          <span className={classes.badgeDot} />
          {PAGE_TEXT.HERO.BADGE}
        </span>
        <h1 className={classes.title}>
          {PAGE_TEXT.HERO.TITLE}{" "}
          <span className={classes.titleHighlight}>
            {PAGE_TEXT.HERO.TITLE_HIGHLIGHT}
          </span>
        </h1>
        <p className={classes.subtitle}>{PAGE_TEXT.HERO.SUBTITLE}</p>
        <div className={classes.heroActions}>
          <Link href="/liveboard" className={classes.btnPrimary}>
            {PAGE_TEXT.HERO.CTA_PRIMARY}{" "}
            <span className={classes.arrow}>&rarr;</span>
          </Link>
          <a
            href={LINKS.READ_TUTORIAL.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnSecondary}
          >
            {LINKS.READ_TUTORIAL.label}
          </a>
        </div>
      </section>

      <section className={classes.features}>
        {FEATURES.map((f) => (
          <Link key={f.href} href={f.href} className={classes.card}>
            <span
              className={`${classes.cardIcon} ${
                classes[f.iconClass as keyof typeof classes]
              }`}
            >
              {f.icon}
            </span>
            <h3 className={classes.cardTitle}>{f.title}</h3>
            <p className={classes.cardDesc}>{f.desc}</p>
            <span className={classes.cardFooter}>
              {PAGE_TEXT.HERO.CTA_EXPLORE} <span>&rarr;</span>
            </span>
          </Link>
        ))}
      </section>

      <div className={classes.banner}>
        <div className={classes.bannerInner}>
          <div className={classes.bannerText}>
            <span className={classes.bannerTitle}>
              {PAGE_TEXT.BANNER.TITLE}
            </span>
            <span className={classes.bannerSub}>
              {PAGE_TEXT.BANNER.SUBTITLE}
            </span>
          </div>
          <a
            href={LINKS.GET_STARTED.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.bannerBtn}
          >
            {LINKS.GET_STARTED.label} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Intro;
