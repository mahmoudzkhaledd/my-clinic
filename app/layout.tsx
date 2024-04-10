import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/animations.css";
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
const websiteName = 'MyClinix - Clinics management system';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
  openGraph: {
    images: [
      {
        url: "/images/opengraph-image.jpg",
      }
    ],
  },
  title: {
    default: websiteName,
    template: `%s | ${websiteName}`,
  },
  twitter: {
    card: "summary_large_image",
  },
  description: "Revolutionize clinic management with our all-in-one platform. Our website offers seamless online appointment scheduling, multi-clinic management, and customizable access controls for doctors and secretaries. Subscribe monthly to unlock comprehensive clinic management tools tailored to your needs. Join us today and streamline your clinic operations with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authX();
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={inter.className}>

        <TooltipProvider>
          <AuthXProvider session={session}>

            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
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
