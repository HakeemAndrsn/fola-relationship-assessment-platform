import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get The Complete Growth Bundle | LOVEBETTER by FOLA",
  description: "Purchase both the Individual and Couples assessments, unlock both paths, and save R200 today.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Get The Complete Growth Bundle | LOVEBETTER by FOLA",
    description: "Purchase both the Individual and Couples assessments, unlock both paths, and save R200 today.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get The Complete Growth Bundle | LOVEBETTER by FOLA",
    description: "Purchase both the Individual and Couples assessments, unlock both paths, and save R200 today.",
    images: ["https://lovebetter.co.za/og-image.png"],
  },
};

export default function BundlePaymentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
