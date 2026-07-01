import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unlock Couples Relational Assessment | LOVEBETTER by FOLA",
  description: "Comprehensive relationship readiness and alignment assessment for couples. Evaluates attachment styles, trauma triggers, communication, and values.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Unlock Couples Relational Assessment | LOVEBETTER by FOLA",
    description: "Comprehensive relationship readiness and alignment assessment for couples. Evaluates attachment styles, trauma triggers, communication, and values.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock Couples Relational Assessment | LOVEBETTER by FOLA",
    description: "Comprehensive relationship readiness and alignment assessment for couples. Evaluates attachment styles, trauma triggers, communication, and values.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
};

export default function CouplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
