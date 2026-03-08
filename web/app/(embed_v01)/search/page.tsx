"use client";
import styles from "./page.module.css";
import { authenticate } from "@/app/utils/auth";
import { embedConfig } from "@/app/utils/constants";
import { SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function Search() {
  return (
    <div className={styles.container}>
      <SearchEmbed
        {...embedConfig.globalConfig}
        {...embedConfig.searchConfig}
      />
    </div>
  );
}
