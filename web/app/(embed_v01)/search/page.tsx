"use client";
import { authenticate } from "@/app/utils/auth";
import { embedConfig } from "@/app/utils/constants";
import { SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";

authenticate();

export default function Search() {
  return <SearchEmbed {...embedConfig.globalConfig} {...embedConfig.searchConfig} />;
}
