import { useContext } from "react";
import {
  PreRenderedAppEmbed,
  PreRenderedLiveboardEmbed,
} from "@thoughtspot/visual-embed-sdk/react";
import AppContext from "../../contexts/AppContext";
import embedConfig from "../../utils/embedConfig";
import {
  FULL_APP_PRE_RENDER_ID,
  LIVEBOARD_PRE_RENDER_ID,
} from "../../utils/constants";

export default function PreRenderInit() {
  const { isInitialized } = useContext(AppContext);

  if (!isInitialized) return null;

  return (
    <>
      <PreRenderedAppEmbed
        preRenderId={FULL_APP_PRE_RENDER_ID}
        preRenderContainer="#ts-fullapp-pre-render-root"
        {...embedConfig.globalConfig}
        {...embedConfig.fullAppConfig}
      />
      <PreRenderedLiveboardEmbed
        preRenderId={LIVEBOARD_PRE_RENDER_ID}
        preRenderContainer="#ts-liveboard-pre-render-root"
        {...embedConfig.globalConfig}
        {...embedConfig.liveboardConfig}
      />
    </>
  );
}
