"use client";
import {
  PreRenderedAppEmbed,
  PreRenderedLiveboardEmbed,
} from "@thoughtspot/visual-embed-sdk/react";
import embedConfig from "@/app/utils/embedConfig";
import {
  FULL_APP_PRE_RENDER_ID,
  LIVEBOARD_PRE_RENDER_ID,
} from "@/app/utils/constants";

export default function PreRenderInit() {
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
