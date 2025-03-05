// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";

const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
} );

const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
} );

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Portfolio website showcasing developer projects and skills",
};

export default function RootLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Global Header */}
            <header className="w-full py-6 px-8 sm:px-20 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <ThemeToggle />
              </div>
              <Navbar />
            </header>

            {/* Main Content */}
            <main className="flex-grow">
              {children}
            </main>

            {/* Global Footer */}
            <footer className="w-full px-8 sm:px-20 py-6 flex gap-6 flex-wrap items-center justify-center text-black dark:text-white border-t border-gray-200 dark:border-gray-800">
              {/* Footer content here */}
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}