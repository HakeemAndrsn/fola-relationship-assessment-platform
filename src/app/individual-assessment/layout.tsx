import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unlock Individual Growth Assessment | LOVEBETTER by FOLA",
  description: "Identify your childhood attachment styles, trauma loops, neurodivergence traits, and self-worth templates to transform how you show up in your relationships.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Unlock Individual Growth Assessment | LOVEBETTER by FOLA",
    description: "Identify your childhood attachment styles, trauma loops, neurodivergence traits, and self-worth templates to transform how you show up in your relationships.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock Individual Growth Assessment | LOVEBETTER by FOLA",
    description: "Identify your childhood attachment styles, trauma loops, neurodivergence traits, and self-worth templates to transform how you show up in your relationships.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
};

export default function IndividualLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
