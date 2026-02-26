import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "EquiPath | Your CS Career Launchpad",
  description: "Your one-stop career launchpad for CS students. 100% Free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.variable} ${bricolage.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
