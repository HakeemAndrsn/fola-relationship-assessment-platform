import type { Metadata } from "next";

const TITLE = "The Pattern Assessment — LoveBetter";
const DESCRIPTION =
  "Twelve guards. You carry three. A free 7-minute assessment that names the patterns running your love life.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://lovebetter.co.za/patterns" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://lovebetter.co.za/patterns",
    siteName: "LoveBetter",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PatternsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
