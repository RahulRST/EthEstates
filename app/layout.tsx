import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import { DynamicProvider } from "@/lib";

const rubik = Rubik({ subsets: ["latin"], weight: "400" });

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
          <body className={rubik.className}>
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