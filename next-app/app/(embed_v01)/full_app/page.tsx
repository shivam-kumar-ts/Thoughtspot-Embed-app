"use client";
import styles from "./page.module.css";
import embedConfig from "@/app/utils/embedConfig";
import { AppEmbed } from "@thoughtspot/visual-embed-sdk/react";

export default function FullApp() {
  return (
    <div className={styles.container}>
      <AppEmbed {...embedConfig.globalConfig} {...embedConfig.fullAppConfig} />
    </div>
  );
}
