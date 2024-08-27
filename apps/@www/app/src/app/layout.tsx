import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import dynamic from 'next/dynamic'


const PostHogPageView = dynamic(() => import('./posthog-pageview'), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pkg Tools",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogPageView />
        {children}
      </body>
    </html>
  );
}
