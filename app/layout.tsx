import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IconSprite } from "@/components/Icon";
import "./globals.css";

const barlow = localFont({
  variable: "--font-barlow",
  display: "swap",
  src: [
    { path: "./fonts/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-condensed-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/barlow-condensed-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/barlow-condensed-900.woff2", weight: "900", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [{ path: "./fonts/inter-variable.woff2", weight: "400 700", style: "normal" }],
});

export const metadata: Metadata = {
  title: "Addagudi Exports Pvt. Ltd. (AEPL) | Engineered Components, Hyderabad",
  description:
    "Addagudi Exports Pvt. Ltd. (AEPL) is an engineering and manufacturing company in Hyderabad, India, producing custom-made CNC-turned and machined components since 1997.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Addagudi Exports Pvt. Ltd. (AEPL) | Engineered Components for a Stronger Tomorrow",
    description: "Custom-made engineered components, CNC turning and machining, manufactured in Hyderabad, India since 1997.",
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = { themeColor: "#101519" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* enables reveal-on-scroll styles only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
