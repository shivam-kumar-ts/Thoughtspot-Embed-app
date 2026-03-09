import classes from "./index.module.css";
import { LINKS } from "@/app/utils/constants";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.left}>
        <span>Built with</span>
        <span className={classes.heart}>&#9829;</span>
        <span>using ThoughtSpot Embed SDK</span>
      </div>

      <div className={classes.links}>
        <a
          className={classes.link}
          href={LINKS.DOCS.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {LINKS.DOCS.label}
        </a>
        <span className={classes.dot} />
        <a
          className={classes.link}
          href={LINKS.GITHUB.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {LINKS.GITHUB.label}
        </a>
        <span className={classes.dot} />
        <a
          className={classes.link}
          href={LINKS.REPO_OWNER.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {LINKS.REPO_OWNER.label}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
