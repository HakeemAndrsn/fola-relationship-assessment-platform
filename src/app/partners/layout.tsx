import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Mental Health Professionals | LOVEBETTER by FOLA",
  description: "A clinical screening tool for your practice — pre-intake triage, referral pathways, and progress re-measurement, built on Attachment Theory, the Gottman Method, and EFT.",
  openGraph: {
    title: "For Mental Health Professionals | LOVEBETTER by FOLA",
    description: "A clinical screening tool for your practice — pre-intake triage, referral pathways, and progress re-measurement, built on Attachment Theory, the Gottman Method, and EFT.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Mental Health Professionals | LOVEBETTER by FOLA",
    description: "A clinical screening tool for your practice — pre-intake triage, referral pathways, and progress re-measurement, built on Attachment Theory, the Gottman Method, and EFT.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
