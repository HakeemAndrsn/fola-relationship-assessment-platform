import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LoveBetter Store — The Romantic Couples Deck | LOVEBETTER by FOLA",
  description: "Questions that do what small talk can't. 52 questions in four tiers to map attachment, trauma, and communication.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "LoveBetter Store — The Romantic Couples Deck | LOVEBETTER by FOLA",
    description: "Questions that do what small talk can't. 52 questions in four tiers to map attachment, trauma, and communication.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoveBetter Store — The Romantic Couples Deck | LOVEBETTER by FOLA",
    description: "Questions that do what small talk can't. 52 questions in four tiers to map attachment, trauma, and communication.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
