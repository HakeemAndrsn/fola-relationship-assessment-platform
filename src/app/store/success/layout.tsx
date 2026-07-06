import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Successful | LOVEBETTER by FOLA",
  description: "Your purchase of the Romantic Couples Deck was verified. Download your products directly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StoreSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
