"use client";
import {
  PreRenderedAppEmbed,
  PreRenderedLiveboardEmbed,
} from "@thoughtspot/visual-embed-sdk/react";
import embedConfig from "@/app/utils/embedConfig";
import {
  FULL_APP_PRE_RENDER_ID,
  LIVEBOARD_PRE_RENDER_ID,
  FULL_APP_PRE_RENDER_CONTAINER_ID,
  LIVEBOARD_PRE_RENDER_CONTAINER_ID,
} from "@/app/utils/constants";

export default function PreRenderInit() {
  return (
    <>
      <PreRenderedAppEmbed
        preRenderId={FULL_APP_PRE_RENDER_ID}
        preRenderContainer={`#${FULL_APP_PRE_RENDER_CONTAINER_ID}`}
        {...embedConfig.globalConfig}
        {...embedConfig.fullAppConfig}
      />
      <PreRenderedLiveboardEmbed
        preRenderId={LIVEBOARD_PRE_RENDER_ID}
        preRenderContainer={`#${LIVEBOARD_PRE_RENDER_CONTAINER_ID}`}
        {...embedConfig.globalConfig}
        {...embedConfig.liveboardConfig}
      />
    </>
  );
}
