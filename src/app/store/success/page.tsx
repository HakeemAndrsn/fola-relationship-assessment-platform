"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

/* ---------- Google Drive product links (Swap cards) ---------- */
// HAKEEM: Replace these with your actual Google Drive download URLs
const GOOGLE_DRIVE_PDF_LINK = "https://drive.google.com/file/d/1Xg_placeholder_pdf/view?usp=sharing";
const GOOGLE_DRIVE_ZIP_LINK = "https://drive.google.com/file/d/1Yg_placeholder_zip/view?usp=sharing";

const PRODUCT_ID = "swapcards-romantic-couples-digital";

/* ---------- palette (plate ID) ---------- */
const C = {
  charcoal: "#1B1917",
  charcoal2: "#221F1C",
  ivory: "#F3EFE6",
  sand: "#EAE2D2",
  terra: "#C1795A",
  terraDeep: "#B4531F",
  burgundy: "#4A2028",
  gold: "#C6A15B",
  mute: "#8A8378",
};

const fontDisplay = { fontFamily: "var(--font-gloock), Georgia, serif" };
const fontAccent = { fontFamily: "var(--font-iserif), Georgia, serif", fontStyle: "italic" as const };
const fontUI = { fontFamily: "var(--font-isans), system-ui, sans-serif" };

const Pill = ({ children, color = C.terra }: { children: React.ReactNode; color?: string }) => (
  <span
    style={{ ...fontUI, color, borderColor: color }}
    className="inline-block rounded-full border px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em]"
  >
    {children}
  </span>
);

export default function StoreSuccessPage() {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  
  const mailerliteFired = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cid = params.get("id");

    const verifySuccess = async (id: string) => {
      try {
        const res = await fetch("/.netlify/functions/validate-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutId: id }),
        });
        const valData = await res.json();
        
        if (res.ok && valData.verified && valData.productId === PRODUCT_ID) {
          setVerified(true);
          setCheckoutId(id);
          if (valData.email) {
            setCustomerEmail(valData.email);
            // Trigger MailerLite automatically to send receipt/confirmation email
            if (!mailerliteFired.current) {
              mailerliteFired.current = true;
              fetch("/.netlify/functions/mailerlite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: valData.email,
                  name: valData.name || "Store Customer",
                  phone: valData.phone || "",
                  fields: {
                    product_purchased: "swapcards_romantic_couples",
                    purchase_amount: "R10"
                  }
                }),
              }).catch(e => console.error("MailerLite subscribe error:", e));
            }
          }
        } else {
          setError(valData.error || "Payment verification failed. Please check your transaction.");
        }
      } catch (err) {
        console.error("Verification failed", err);
        setError("Unable to connect to verification servers. Please check your network.");
      } finally {
        setVerifying(false);
      }
    };

    if (cid) {
      verifySuccess(cid);
    } else {
      setError("No checkout session found. Please make a purchase through the store.");
      setVerifying(false);
    }
  }, []);

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#1B1917] flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-[#C1795A] mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p style={{ ...fontUI, color: "#EDE5D4" }} className="text-sm font-sans">Verifying transaction details with Yoco...</p>
        </div>
      </div>
    );
  }

  if (error || !verified) {
    return (
      <main style={{ backgroundColor: C.charcoal }} className="min-h-screen flex items-center justify-center px-6">
        <div style={{ backgroundColor: C.charcoal2 }} className="p-10 max-w-md text-center space-y-6 border border-[#DDD5C4]/10 shadow-2xl">
          <Pill color="#E11D48">Verification Failure</Pill>
          <h2 style={{ ...fontDisplay, color: C.ivory }} className="text-3xl leading-tight">
            Checkout was <em style={{ ...fontAccent, color: C.terra }}>unconfirmed.</em>
          </h2>
          <p style={{ ...fontUI, color: C.ivory }} className="text-sm opacity-80 leading-relaxed">
            {error || "We could not verify your payment. Please try again or contact support."}
          </p>
          <div className="pt-4">
            <Link
              href="/store"
              style={{ ...fontUI, backgroundColor: C.terraDeep, color: C.ivory }}
              className="px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-90 inline-block text-center"
            >
              Return to Store
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: C.charcoal }} className="min-h-screen flex items-center justify-center py-20 px-6">
      <div style={{ backgroundColor: C.charcoal2 }} className="p-10 max-w-2xl text-center space-y-6 border border-[#DDD5C4]/10 shadow-2xl">
        <Pill color={C.gold}>Payment Successful</Pill>
        <h2 style={{ ...fontDisplay, color: C.ivory }} className="text-4xl leading-tight">
          Your cards are <em style={{ ...fontAccent, color: C.terra }}>ready.</em>
        </h2>
        <p style={{ ...fontUI, color: C.ivory }} className="text-sm opacity-80 max-w-md mx-auto leading-relaxed">
          Thank you for your purchase! A confirmation email has been sent to <span className="text-[#C6A15B]">{customerEmail}</span>. You can download your files directly from Google Drive below:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href={GOOGLE_DRIVE_PDF_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...fontUI, backgroundColor: C.terraDeep, color: C.ivory }}
            className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-90 text-center"
          >
            Download Deck PDF (Google Drive)
          </a>
          <a
            href={GOOGLE_DRIVE_ZIP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...fontUI, border: `1px solid ${C.terra}`, color: C.terra }}
            className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-90 text-center"
          >
            Download Story ZIP (Google Drive)
          </a>
        </div>

        <div className="pt-6 border-t border-[#8A8378]/25 space-y-3">
          <p style={{ ...fontUI, color: C.mute }} className="text-xs">
            Direct download links will also remain available in your email inbox receipt.
          </p>
          <p style={{ ...fontUI, color: C.mute }} className="text-xs">
            Need support? Contact us at <span style={{ color: C.gold }}>fola@fola.co.za</span>
          </p>
        </div>
      </div>
    </main>
  );
}
