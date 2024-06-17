import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import {Layout} from "@/components";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrontProject",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={leagueSpartan.className}>
      <Layout/>
      <div>
        {children}
      </div>
      </body>
    </html>
  );
}
