import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicProvider, DynamicWidget } from "@/components";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EthEstates",
  description: "A Web3 Real Estate Marketplace",
};

const Header = () => {
  return (
    <div className="flex m-5 items-center gap-x-6 rounded-lg p-6 justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
      <p>
        <span className="font-bold">EthEstates</span>
      </p>
      <DynamicWidget />
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="flex w-full justify-center p-8 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:bg-none">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} EthEstates. All rights reserved.
      </p>
    </footer>
  )
}

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
    return (
        <html lang="en">
          <body className={inter.className}>
            <DynamicProvider>
              <div className="flex min-h-screen flex-col items-center justify-between">
              <Header />
              {children}
              <Footer />
              </div>
            </DynamicProvider>
        </body>
        </html>
    );
}