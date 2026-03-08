import Link from "next/link";
import classes from "./index.module.css";
import { DOCS_URL, GET_STARTED_URL } from "@/app/utils/constants";

const features = [
  {
    href: "/liveboard",
    icon: "📊",
    iconClass: "cardIconLiveboard",
    title: "Liveboard Embed",
    desc: "Embed interactive liveboards with real-time data visualizations directly into your application.",
  },
  {
    href: "/viz",
    icon: "📈",
    iconClass: "cardIconViz",
    title: "Visualization Embed",
    desc: "Embed individual chart visualizations for focused, contextual data insights.",
  },
  {
    href: "/search",
    icon: "🔍",
    iconClass: "cardIconSearch",
    title: "Search Embed",
    desc: "Give users the power to ask questions of their data using natural language search.",
  },
  {
    href: "/spotter",
    icon: "🤖",
    iconClass: "cardIconSpotter",
    title: "Spotter (AI)",
    desc: "AI-powered analytics assistant that helps users discover insights conversationally.",
  },
  {
    href: "/full_app",
    icon: "🚀",
    iconClass: "cardIconFullApp",
    title: "Full App Embed",
    desc: "Embed the complete ThoughtSpot experience with full navigation and discovery.",
  },
];

const Intro = () => {
  return (
    <div className={classes.container}>
      <section className={classes.hero}>
        <span className={classes.badge}>
          <span className={classes.badgeDot} />
          Live Demo Environment
        </span>
        <h1 className={classes.title}>
          Analytics That Live{" "}
          <span className={classes.titleHighlight}>Inside Your App</span>
        </h1>
        <p className={classes.subtitle}>
          Explore how ThoughtSpot Embed SDK lets you integrate powerful
          analytics, AI-driven search, and interactive dashboards seamlessly
          into any application.
        </p>
        <div className={classes.heroActions}>
          <Link href="/liveboard" className={classes.btnPrimary}>
            Try Liveboard <span className={classes.arrow}>&rarr;</span>
          </Link>
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnSecondary}
          >
            Read the Docs
          </a>
        </div>
      </section>

      <section className={classes.features}>
        {features.map((f) => (
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
              Explore <span>&rarr;</span>
            </span>
          </Link>
        ))}
      </section>

      <div className={classes.banner}>
        <div className={classes.bannerInner}>
          <div className={classes.bannerText}>
            <span className={classes.bannerTitle}>
              Ready to embed analytics?
            </span>
            <span className={classes.bannerSub}>
              Get started with the ThoughtSpot Visual Embed SDK in minutes.
            </span>
          </div>
          <a
            href={GET_STARTED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.bannerBtn}
          >
            Get Started &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Intro;
