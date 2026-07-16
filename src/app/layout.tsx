import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { Libre_Baskerville, Montserrat, Gloock, Instrument_Serif, Instrument_Sans } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
  display: "swap",
});

const iserif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-iserif",
  display: "swap",
});

const isans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-isans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FOLA Relational Assessment | LOVEBETTER by FOLA",
  description: "Comprehensive relationship diagnostic assessment for couples. Evaluates attachment, trauma, neurodivergence, values, communication, and more.",
  openGraph: {
    title: "FOLA Relational Assessment | LOVEBETTER by FOLA",
    description: "Comprehensive relationship diagnostic assessment for couples. Evaluates attachment, trauma, neurodivergence, values, communication, and more.",
    type: "website",
    url: "https://lovebetter.co.za",
    siteName: "LOVEBETTER by FOLA",
    images: [{ url: "https://lovebetter.co.za/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOLA Relational Assessment | LOVEBETTER by FOLA",
    description: "Comprehensive relationship diagnostic assessment for couples. Evaluates attachment, trauma, neurodivergence, values, communication, and more.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/logo-transparent.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${montserrat.variable} ${gloock.variable} ${iserif.variable} ${isans.variable}`}>
      <body className="antialiased font-sans">
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}
