import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicProvider, Footer, Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EthEstates",
  description: "A Web3 Real Estate Marketplace",
};

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