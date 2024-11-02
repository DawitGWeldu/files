import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { SessionProvider } from 'next-auth/react'
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { cn } from "@/lib/utils"



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "ITTIHAD",
  description: "Made by Dawit Getachew +251994697123",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html suppressHydrationWarning lang="en">
        {/* pattern-tic-tac-toe-gray-200/10 pattern-tic-tac-toe-scale-100 */}
        <body
          className={cn(
            "min-h-screen font-sans antialiased ",
            fontSans.variable,
            fontHeading.variable
          )}>
          <ConfettiProvider />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ToastProvider />
            {children}
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
