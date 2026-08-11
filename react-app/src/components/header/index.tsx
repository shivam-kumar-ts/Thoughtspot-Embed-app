"use client";
import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./index.module.css";
import { useLocation } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import { NAV_ITEMS, BRAND } from "../../utils/constants";

const Header = () => {
  const { pathname } = useLocation();
  const { userData } = useContext(AppContext);
  const initials = userData.name
    .split(/[\s_]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.brand}>
        <span className={classes.logoMark}>{BRAND.LOGO_MARK}</span>
        <span className={classes.brandText}>
          <span className={classes.brandName}>{BRAND.NAME}</span>
          <span className={classes.brandTag}>{BRAND.TAG}</span>
        </span>
      </Link>

      <nav className={classes.nav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`${classes.navLink} ${
              pathname === item.href ? classes.navLinkActive : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={classes.actions}>
        <span className={classes.statusDot} title="Connected" />
        <div className={classes.userBadge}>
          <span className={classes.avatar}>{initials}</span>
          {userData.name}
        </div>
      </div>
    </header>
  );
};

export default Header;
