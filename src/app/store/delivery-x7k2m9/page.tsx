"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


/* ---------- Google Drive product links (Swap cards) ---------- */
const GOOGLE_DRIVE_PDF_LINK = "https://drive.google.com/file/d/1McpGsEWIRys5e7sPcXDRcl7vwLs0OvJD/view?usp=drive_link";
const GOOGLE_DRIVE_PARENTING_DECK = "https://drive.google.com/file/d/1MeaeyBnAKoN7wdhlebiDu4zOEb8x3Vci/view?usp=drive_link";
const GOOGLE_DRIVE_SECOND_CHILD_EBOOK = "https://drive.google.com/file/d/1hFJl3X291e9z_iLkIJCxLfeAwELOJOKl/view?usp=drive_link";

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

function DeliveryPageContent() {
  const searchParams = useSearchParams();
  const cid = searchParams.get("id");
  
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [purchasedProduct, setPurchasedProduct] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  
  const mailerliteFired = useRef(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);

    const activeCid = cid || (typeof window !== "undefined" ? localStorage.getItem("active_checkout_id") : null);

    const verifySuccess = async (id: string) => {
      setVerifying(true);
      try {
        const res = await fetch("/.netlify/functions/validate-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutId: id }),
        });
        const valData = await res.json();
        
        const validProducts = [
          PRODUCT_ID,
          "swapcards-parenting-deck-digital",
          "ebook-second-child"
        ];

        if (res.ok && valData.verified && validProducts.includes(valData.productId)) {
          setVerified(true);
          setCheckoutId(id);
          setPurchasedProduct(valData.productId);
          
          if (valData.email) {
            setCustomerEmail(valData.email);
            
            // Trigger Brevo automatically to send delivery email
            fetch("/.netlify/functions/send-brevo-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ checkoutId: id }),
            }).catch(e => console.error("Brevo email send error:", e));

            // Trigger MailerLite automatically to send receipt/confirmation email
            if (!mailerliteFired.current) {
              mailerliteFired.current = true;
              
              let productLabel = "swapcards_romantic_couples";
              if (valData.productId === "swapcards-parenting-deck-digital") {
                productLabel = "swapcards_parenting_deck";
              } else if (valData.productId === "ebook-second-child") {
                productLabel = "ebook_second_child";
              }

              fetch("/.netlify/functions/mailerlite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: valData.email,
                  name: valData.name || "Store Customer",
                  phone: valData.phone || "",
                  fields: {
                    product_purchased: productLabel,
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

    if (activeCid) {
      verifySuccess(activeCid);
    } else {
      // Wait slightly for hydration to complete or report missing ID
      const timer = setTimeout(() => {
        const fallbackCid = searchParams.get("id") || (typeof window !== "undefined" ? localStorage.getItem("active_checkout_id") : null);
        if (fallbackCid) {
          verifySuccess(fallbackCid);
        } else {
          setError("No checkout session found. Please make a purchase through the store.");
          setVerifying(false);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cid, searchParams]);

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
          <div className="pt-2 text-xs text-left font-mono text-[#8A8378] bg-[#1B1917]/50 p-3 overflow-x-auto rounded">
            <p className="text-[#C1795A]">Debug Info:</p>
            <p className="mt-1">URL: {currentUrl}</p>
          </div>
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
          Your files are <em style={{ ...fontAccent, color: C.terra }}>ready.</em>
        </h2>
        <p style={{ ...fontUI, color: C.ivory }} className="text-sm opacity-80 max-w-md mx-auto leading-relaxed">
          Thank you for your purchase! A confirmation email has been sent to <span className="text-[#C6A15B]">{customerEmail}</span>. You can download your files directly from Google Drive below:
        </p>

        <div className="flex justify-center pt-4">
          {purchasedProduct === PRODUCT_ID && (
            <a
              href={GOOGLE_DRIVE_PDF_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...fontUI, backgroundColor: C.terraDeep, color: C.ivory }}
              className="w-full sm:w-auto px-10 py-4 text-base font-bold tracking-wide transition-opacity hover:opacity-90 text-center rounded-sm"
            >
              Download Romantic Couples Deck (Google Drive)
            </a>
          )}
          {purchasedProduct === "swapcards-parenting-deck-digital" && (
            <a
              href={GOOGLE_DRIVE_PARENTING_DECK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...fontUI, backgroundColor: C.terraDeep, color: C.ivory }}
              className="w-full sm:w-auto px-10 py-4 text-base font-bold tracking-wide transition-opacity hover:opacity-90 text-center rounded-sm"
            >
              Download The Parenting Deck (Google Drive)
            </a>
          )}
          {purchasedProduct === "ebook-second-child" && (
            <a
              href={GOOGLE_DRIVE_SECOND_CHILD_EBOOK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...fontUI, backgroundColor: C.terraDeep, color: C.ivory }}
              className="w-full sm:w-auto px-10 py-4 text-base font-bold tracking-wide transition-opacity hover:opacity-90 text-center rounded-sm"
            >
              Download The Second Child Ebook (Google Drive)
            </a>
          )}
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

export default function StoreSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1B1917] flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-[#C1795A] mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p style={{ ...fontUI, color: "#EDE5D4" }} className="text-sm font-sans">Loading delivery page...</p>
        </div>
      </div>
    }>
      <DeliveryPageContent />
    </Suspense>
  );
}
