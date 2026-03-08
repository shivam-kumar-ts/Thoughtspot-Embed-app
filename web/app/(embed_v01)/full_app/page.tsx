"use client";
import styles from "./page.module.css";
import { authenticate } from "@/app/utils/auth";
import { embedConfig } from "@/app/utils/constants";
import { AppEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function FullApp() {
  return (
    <div className={styles.container}>
      <AppEmbed {...embedConfig.globalConfig} {...embedConfig.fullAppConfig} />
    </div>
  );
}
