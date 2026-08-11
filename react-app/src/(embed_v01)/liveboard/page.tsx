import styles from "./page.module.css";
import embedConfig from "../../utils/embedConfig";
import { LiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { LIVEBOARD_PRE_RENDER_ID } from "../../utils/constants";

export default function Liveboard() {
  return (
    <div className={styles.container}>
      <LiveboardEmbed
        preRenderId={LIVEBOARD_PRE_RENDER_ID}
        preRenderContainer="#ts-liveboard-pre-render-root"
        {...embedConfig.globalConfig}
        {...embedConfig.liveboardConfig}
      />
    </div>
  );
}
