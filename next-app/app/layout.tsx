import "./styles/globals.css";
import type { Metadata } from "next";
import Footer from "./components/footer";
import Header from "./components/header";
import { Geist, Geist_Mono } from "next/font/google";
import NotificationStack from "./components/notification";
import { AppContextProvider } from "@/app/contexts/AppContext";
import { BRAND, METADATA as META } from "@/app/utils/constants";
import { NotificationProvider } from "@/app/contexts/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: BRAND.FULL_NAME,
    template: BRAND.TEMPLATE,
  },
  description: META.DESCRIPTION,
  keywords: META.KEYWORDS,
  openGraph: {
    title: BRAND.FULL_NAME,
    description: META.OG_DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <AppContextProvider>
            <NotificationStack />
            <Header />
            {children}
            <Footer />
          </AppContextProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
