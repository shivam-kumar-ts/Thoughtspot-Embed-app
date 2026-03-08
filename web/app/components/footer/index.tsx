import classes from "./index.module.css";
import { DOCS_URL, GITHUB_URL, REPO_OWNER_URL } from "@/app/utils/constants";

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
          href={DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
        <span className={classes.dot} />
        <a
          className={classes.link}
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span className={classes.dot} />
        <a
          className={classes.link}
          href={REPO_OWNER_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by shivam6862
        </a>
      </div>
    </footer>
  );
};

export default Footer;
