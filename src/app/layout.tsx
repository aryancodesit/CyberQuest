import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GameProvider } from "@/lib/game-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberQuest",
  description: "Test your cybersecurity knowledge in this interactive game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        <GameProvider>
          <main className="relative flex min-h-screen flex-col overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1120] to-black" />
            <div className="absolute inset-0 -z-10 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            {children}
          </main>
        </GameProvider>
      </body>
    </html>
  );
}
