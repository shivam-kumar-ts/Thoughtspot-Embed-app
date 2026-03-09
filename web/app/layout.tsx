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
  title: "ThoughtSpot Embed App",
  description: "ThoughtSpot Embed Application",
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
