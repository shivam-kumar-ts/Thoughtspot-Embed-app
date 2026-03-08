"use client";
import { authenticate } from "@/app/utils/auth";
import { embedConfig } from "@/app/utils/constants";
import { SpotterEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function Spotter() {
  return (
    <SpotterEmbed
      {...embedConfig.globalConfig}
      {...embedConfig.spotterConfig}
    />
  );
}
