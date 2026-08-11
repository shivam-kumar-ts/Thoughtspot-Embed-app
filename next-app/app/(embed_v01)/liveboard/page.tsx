"use client";
import styles from "./page.module.css";
import embedConfig from "@/app/utils/embedConfig";
import { LiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { LIVEBOARD_PRE_RENDER_ID, LIVEBOARD_PRE_RENDER_CONTAINER_ID } from "@/app/utils/constants";

export default function Liveboard() {
  return (
    <div className={styles.container}>
      <LiveboardEmbed
        preRenderId={LIVEBOARD_PRE_RENDER_ID}
        preRenderContainer={`#${LIVEBOARD_PRE_RENDER_CONTAINER_ID}`}
        {...embedConfig.globalConfig}
        {...embedConfig.liveboardConfig}
      />
    </div>
  );
}
