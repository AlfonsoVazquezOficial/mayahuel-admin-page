import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./common/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethos Jewelry Admin",
  description: "Admin interface for managing jewelry products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="transition-colors duration-3000"
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children} {/* Aquí solo van layouts de grupos */}
        </ThemeProvider>
      </body>
    </html>
  );
}
