"use client";
import { authenticate } from "@/app/utils/auth";
import { embedConfig } from "@/app/utils/constants";
import { LiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function Liveboard() {
  return <LiveboardEmbed {...embedConfig.globalConfig} {...embedConfig.liveboardConfig} />;
}
