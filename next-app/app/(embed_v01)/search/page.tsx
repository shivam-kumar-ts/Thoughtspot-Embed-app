"use client";
import styles from "./page.module.css";
import embedConfig from "@/app/utils/embedConfig";
import { SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";

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
