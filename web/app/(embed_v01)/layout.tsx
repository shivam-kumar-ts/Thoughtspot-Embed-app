"use client";
import { authenticate } from "@/app/utils/auth";

authenticate();

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
