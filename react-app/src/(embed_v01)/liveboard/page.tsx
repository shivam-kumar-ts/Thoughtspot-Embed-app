import styles from "./page.module.css";
import embedConfig from "../../utils/embedConfig";
import {
  LiveboardEmbed,
  RuntimeFilterOp,
} from "@thoughtspot/visual-embed-sdk/react";
import { LIVEBOARD_PRE_RENDER_ID } from "../../utils/constants";

export default function Liveboard() {
  return (
    <div className={styles.container}>
      <LiveboardEmbed
        preRenderId={LIVEBOARD_PRE_RENDER_ID}
        {...embedConfig.globalConfig}
        {...embedConfig.liveboardConfig}
        runtimeFilters={[
          {
            columnName: "Color",
            operator: RuntimeFilterOp.IN,
            values: ["almond"],
          },
        ]}
      />
    </div>
  );
}
