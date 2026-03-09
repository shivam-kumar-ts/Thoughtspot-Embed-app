import "./styles/globals.css";
import type { Metadata } from "next";
import Footer from "./components/footer";
import Header from "./components/header";
import { Geist, Geist_Mono } from "next/font/google";
import { AppContextProvider } from "@/app/contexts/AppContext";

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
    default: "ThoughtSpot Embed App",
    template: "%s | ThoughtSpot Embed",
  },
  description:
    "Demo application showcasing ThoughtSpot Embed SDK — interactive liveboards, AI-powered search, and full app analytics embedded into your application.",
  keywords: [
    "ThoughtSpot",
    "Embed SDK",
    "Analytics",
    "Liveboard",
    "Visualization",
    "Search",
    "Spotter",
  ],
  openGraph: {
    title: "ThoughtSpot Embed App",
    description:
      "Explore how ThoughtSpot Embed SDK lets you integrate powerful analytics into any application.",
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
        <AppContextProvider>
          <Header />
          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
