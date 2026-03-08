"use client";
import { authenticate } from "@/app/utils/auth";
import { embedConfig, WORKSHEET_ID } from "@/app/utils/constants";
import { SpotterEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function Spotter() {
  return <SpotterEmbed {...embedConfig.globalConfig} {...embedConfig.worksheetConfig} />;
}
