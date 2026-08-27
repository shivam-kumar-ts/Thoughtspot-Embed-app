import { useContext } from "react";
import { PreRenderedLiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";
import AppContext from "../../contexts/AppContext";
import embedConfig from "../../utils/embedConfig";
import { LIVEBOARD_PRE_RENDER_ID } from "../../utils/constants";

export default function PreRenderInit() {
  const { isInitialized } = useContext(AppContext);

  if (!isInitialized) return null;

  return (
    <>
      <PreRenderedLiveboardEmbed
        preRenderId={LIVEBOARD_PRE_RENDER_ID}
        {...embedConfig.globalConfig}
        {...embedConfig.liveboardConfig}
      />
    </>
  );
}
