"use client";
import styles from "./page.module.css";
import { authenticate } from "@/app/utils/auth";
import embedConfig from "@/app/utils/embedConfig";
import { SpotterEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

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
