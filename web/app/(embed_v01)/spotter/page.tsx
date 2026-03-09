"use client";
import styles from "./page.module.css";
import embedConfig from "@/app/utils/embedConfig";
import { SpotterEmbed } from "@thoughtspot/visual-embed-sdk/react";

export default function Spotter() {
  return (
    <div className={styles.container}>
      <SpotterEmbed
        {...embedConfig.globalConfig}
        {...embedConfig.spotterConfig}
      />
    </div>
  );
}
