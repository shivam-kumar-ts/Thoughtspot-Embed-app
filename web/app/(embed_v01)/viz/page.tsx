"use client";
import { authenticate } from "@/app/utils/auth";
import { LiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { embedConfig, LIVEBOARD_ID, VIZ_ID } from "@/app/utils/constants";

authenticate();

export default function Viz() {
  return (
    <LiveboardEmbed
      {...embedConfig.globalConfig}
      {...embedConfig.vizConfig}
    />
  );
}
