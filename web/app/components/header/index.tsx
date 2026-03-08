"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AppContext from "@/app/contexts/AppContext";
import classes from "./index.module.css";

const navItems = [
  { href: "/liveboard", label: "Liveboard" },
  { href: "/viz", label: "Visualization" },
  { href: "/search", label: "Search" },
  { href: "/spotter", label: "Spotter" },
  { href: "/full_app", label: "Full App" },
];

const Header = () => {
  const pathname = usePathname();
  const { userData } = useContext(AppContext);
  const initials = userData.name
    .split(/[\s_]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.brand}>
        <span className={classes.logoMark}>TS</span>
        <span className={classes.brandText}>
          <span className={classes.brandName}>ThoughtSpot</span>
          <span className={classes.brandTag}>Embed Demo</span>
        </span>
      </Link>

      <nav className={classes.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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
