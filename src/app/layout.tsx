import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/ui/Providers";
import BackgroundOrbs from "@/components/ui/BackgroundOrbs";

export const metadata: Metadata = {
  title: "Faisal Ramdhani — Full-Stack Developer",
  description: "Portfolio of Faisal Ramdhani, a Full-Stack Developer specializing in building modern, high-performance web applications.",
  keywords: ["Faisal Ramdhani", "portfolio", "full-stack developer", "web developer", "Next.js"],
  authors: [{ name: "Faisal Ramdhani" }],
  openGraph: {
    title: "Faisal Ramdhani — Full-Stack Developer",
    description: "Portfolio of Faisal Ramdhani, a Full-Stack Developer.",
    type: "website",
  },
};

import PageTransition from "@/components/ui/PageTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <BackgroundOrbs />
        <ScrollToTop />
        <Providers>
          <PageTransition>
            {children}
          </PageTransition>
        </Providers>
      </body>
    </html>
  );
}
