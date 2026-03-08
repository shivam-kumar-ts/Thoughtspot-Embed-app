"use client";
import { authenticate } from "@/app/utils/auth";
import { embedConfig } from "@/app/utils/constants";
import { AppEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function FullApp() {
  return (
    <AppEmbed {...embedConfig.globalConfig} {...embedConfig.fullAppConfig} />
  );
}
