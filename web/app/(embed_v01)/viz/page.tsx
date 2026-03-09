"use client";
import styles from "./page.module.css";
import { authenticate } from "@/app/utils/auth";
import embedConfig from "@/app/utils/embedConfig";
import { LiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function Viz() {
  return (
    <div className={styles.container}>
      <LiveboardEmbed
        {...embedConfig.globalConfig}
        {...embedConfig.vizConfig}
      />
    </div>
  );
}
