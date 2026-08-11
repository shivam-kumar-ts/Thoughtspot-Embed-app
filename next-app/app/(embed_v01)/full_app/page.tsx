"use client";
import styles from "./page.module.css";
import embedConfig from "@/app/utils/embedConfig";
import { AppEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { FULL_APP_PRE_RENDER_ID, FULL_APP_PRE_RENDER_CONTAINER_ID } from "@/app/utils/constants";

export default function FullApp() {
  return (
    <div className={styles.container}>
      <AppEmbed
        preRenderId={FULL_APP_PRE_RENDER_ID}
        preRenderContainer={`#${FULL_APP_PRE_RENDER_CONTAINER_ID}`}
        {...embedConfig.globalConfig}
        {...embedConfig.fullAppConfig}
      />
    </div>
  );
}
