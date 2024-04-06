import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import AuthXProvider from "@/authX/Provider/AuthXProvider";
import { authX } from "@/authX";
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinic",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authX();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon shortcut"
          href="favicon.ico"
          type="image/x-icon"
        />

      </head>
      <body className={inter.className}>
        <TooltipProvider>
          <AuthXProvider session={session}>

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />

              {children}
            </ThemeProvider>
          </AuthXProvider>
        </TooltipProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
