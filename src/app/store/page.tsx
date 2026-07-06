"use client";

import { useState, useEffect } from "react";

/* ---------- price & product metadata ---------- */
const PRICE_CENTS = 1000; // Founding 100 price (R200). Change to 25000 (R250) after 100 sales.
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

/* ---------- shared bits ---------- */
const Pill = ({ children, color = C.terra }: { children: React.ReactNode; color?: string }) => (
  <span
    style={{ ...fontUI, color, borderColor: color }}
    className="inline-block rounded-full border px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em]"
  >
    {children}
  </span>
);

const Rule = ({ color = C.terra }: { color?: string }) => (
  <div style={{ borderColor: color }} className="w-12 border-t-2 mb-6" />
);

/* ---------- header ---------- */
function StoreHeader() {
  return (
    <header>
      {/* Announcement bar */}
      <div style={{ backgroundColor: C.charcoal }} className="text-center py-2.5 px-4">
        <p style={{ ...fontUI, color: C.ivory }} className="text-xs tracking-[0.18em] uppercase">
          The Founding 100 — first 100 couples get the deck at{" "}
          <span style={{ color: C.gold }}>R200</span>
        </p>
      </div>

      {/* Nav */}
      <nav
        style={{ backgroundColor: C.ivory, borderColor: "#DDD5C4" }}
        className="sticky top-0 z-50 border-b"
      >
        <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            {/* Heart mark — transparent background ribbon-heart */}
            <img src="/logo-heart.png" alt="LoveBetter" className="h-8 w-8" />
            <span style={{ ...fontUI, color: C.charcoal }} className="font-bold text-lg tracking-tight">
              lovebetter
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {[
              ["Store", "/store"],
              ["The Assessment", "/"],
              ["About", "/#about"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{ ...fontUI, color: C.charcoal }}
                className="text-sm tracking-wide opacity-80 hover:opacity-100 transition-opacity"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="#deck"
            style={{ ...fontUI, backgroundColor: C.charcoal, color: C.ivory }}
            className="px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-90"
          >
            Get the deck
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section style={{ backgroundColor: C.ivory }}>
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-20 grid gap-16 md:grid-cols-2 md:items-center">
        <div>
          <Pill>The LoveBetter Store</Pill>
          <h1 style={{ ...fontDisplay, color: C.charcoal }} className="mt-8 text-6xl md:text-7xl leading-[1.05]">
            Questions that do what small talk{" "}
            <em style={{ ...fontAccent, color: C.terraDeep }}>can&rsquo;t.</em>
          </h1>
          <p style={{ ...fontAccent, color: C.charcoal }} className="mt-6 text-2xl opacity-75">
            Tools for couples who are done guessing.
          </p>
        </div>

        {/* Hero card — a live rendition of card 52 */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative w-72"
            style={{ aspectRatio: "70/110", backgroundColor: C.charcoal, boxShadow: "0 32px 64px -16px rgba(27,25,23,0.5)" }}
          >
            <div className="absolute inset-0 flex flex-col justify-between p-7">
              <div className="flex justify-end">
                <Pill color={C.terra}>04 — Where We&rsquo;re Going</Pill>
              </div>
              <div>
                <Rule />
                <p style={{ ...fontDisplay, color: C.ivory }} className="text-4xl leading-tight">
                  Why do you <em style={{ ...fontAccent, color: C.terra }}>stay?</em>
                </p>
              </div>
              <div
                style={{ borderColor: C.mute }}
                className="border-t pt-3 flex justify-between"
              >
                <span style={{ ...fontUI, color: C.mute }} className="text-[0.6rem] tracking-[0.15em]">
                  The Romantic Couples Deck
                </span>
                <span style={{ ...fontUI, color: C.mute }} className="text-[0.6rem] tracking-[0.15em]">
                  52 / 52
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- featured product ---------- */
interface FeaturedDeckProps {
  email: string;
  setEmail: (val: string) => void;
  nickname: string;
  setNickname: (val: string) => void;
  loading: boolean;
  error: string;
  onCheckout: () => void;
}

function FeaturedDeck({ email, setEmail, nickname, setNickname, loading, error, onCheckout }: FeaturedDeckProps) {
  const tiers = [
    ["01 — Warm Up", C.terra, C.ivory, C.charcoal],
    ["02 — How We Work", C.terraDeep, C.sand, C.charcoal],
    ["03 — The Inner Rooms", "#D9A38A", C.burgundy, C.ivory],
    ["04 — Where We're Going", C.terra, C.charcoal, C.ivory],
  ];

  return (
    <section id="deck" style={{ backgroundColor: C.charcoal }}>
      <div className="mx-auto max-w-6xl px-6 py-24 grid gap-16 md:grid-cols-5">
        {/* Left: tier strip */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {tiers.map(([label, accent, bg, txt]) => (
            <div
              key={label}
              style={{ backgroundColor: bg }}
              className="p-6 flex items-center justify-between"
            >
              <span style={{ ...fontUI, color: accent }} className="text-[0.65rem] uppercase tracking-[0.25em]">
                {label}
              </span>
              <span style={{ ...fontAccent, color: txt }} className="text-sm opacity-70">
                13 cards
              </span>
            </div>
          ))}
          <p style={{ ...fontAccent, color: C.mute }} className="mt-3 text-base">
            The colours deepen as the questions do.
          </p>
        </div>

        {/* Right: offer */}
        <div className="md:col-span-3">
          <Pill color={C.gold}>Available now — Digital deck</Pill>
          <h2 style={{ ...fontDisplay, color: C.ivory }} className="mt-6 text-5xl leading-tight">
            The Romantic Couples <em style={{ ...fontAccent, color: C.terra }}>Deck.</em>
          </h2>
          <p style={{ ...fontUI, color: C.ivory }} className="mt-6 text-lg leading-relaxed opacity-85 max-w-xl">
            52 questions in four tiers — from playful to profound. Includes the
            pass rule, a consent pause before the deep tiers, aftercare, and two
            write-your-own cards. Print at home or play from your phone.
          </p>

          <ul className="mt-8 space-y-3 max-w-xl">
            {[
              "Instant PDF download — play tonight",
              "Built by a trauma and hypnotherapy practitioner",
              "Story-sized card images included for sharing",
            ].map((t) => (
              <li key={t} className="flex gap-3 items-baseline">
                <span style={{ color: C.terra }}>—</span>
                <span style={{ ...fontUI, color: C.ivory }} className="opacity-85">{t}</span>
              </li>
            ))}
          </ul>

          <div style={{ backgroundColor: C.charcoal2 }} className="mt-10 p-8 max-w-xl">
            <p style={{ ...fontUI, color: C.gold }} className="text-xs uppercase tracking-[0.3em]">
              The Founding 100
            </p>
            <p style={{ ...fontDisplay, color: C.ivory }} className="mt-3 text-5xl">
              R{(PRICE_CENTS / 100).toFixed(0)}{" "}
              <span style={{ ...fontAccent, color: C.mute }} className="text-xl">
                first 100 couples · R250 thereafter
              </span>
            </p>

            {/* Email form to deliver the deck */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8378] mb-2" style={fontUI}>
                  Email Address (For Secure Deck Delivery)
                </label>
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="username_hp"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={100}
                  autoComplete="email"
                  className="w-full bg-[#1B1917] border border-[#8A8378]/30 px-4 py-3.5 text-[#F3EFE6] text-sm focus:outline-none focus:border-[#C6A15B] font-sans"
                />
                {email && email.includes("@") && (
                  <div style={{ ...fontUI, color: C.mute }} className="text-xs text-left leading-relaxed mt-2 flex items-center gap-1.5 opacity-90 transition-opacity">
                    <svg className="h-3.5 w-3.5 text-[#C6A15B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2.5} />
                    </svg>
                    <span>Files will be delivered to: <strong className="text-[#F3EFE6] font-mono break-all">{email}</strong></span>
                  </div>
                )}
              </div>

              {error && <p className="text-sm text-red-400 font-sans">{error}</p>}

              {/* YOCO CHECKOUT — wired to site's existing Yoco flow */}
              <button
                onClick={onCheckout}
                disabled={loading}
                style={{ ...fontUI, backgroundColor: C.terraDeep, color: C.ivory }}
                className="w-full flex items-center justify-center gap-2 py-4 text-base tracking-wide transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Redirecting to Yoco...
                  </span>
                ) : (
                  `Get the deck — R${(PRICE_CENTS / 100).toFixed(0)}`
                )}
              </button>
            </div>
            <p style={{ ...fontUI, color: C.mute }} className="mt-4 text-sm">
              Secure checkout with Yoco · Instant download · @do.lovebetter
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- coming soon ---------- */
function ComingSoon() {
  const products = [
    { name: "The Friends Deck", kind: "Swap Cards", note: "For the friendships that raised you." },
    { name: "The Parent–Child Deck", kind: "Swap Cards", note: "Questions across the generation line." },
    { name: "The Co-Parents Deck", kind: "Swap Cards", note: "For the team the children depend on." },
    { name: "The Couples Journal", kind: "Journal", note: "Where the answers go to live." },
    { name: "The LoveBetter Workbook", kind: "Workbook", note: "The assessment, worked by hand." },
    { name: "The Quiet Load", kind: "Ebook", note: "A field guide to male vulnerability." },
  ];

  return (
    <section style={{ backgroundColor: C.ivory }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Pill>On the press</Pill>
        <h2 style={{ ...fontDisplay, color: C.charcoal }} className="mt-6 text-5xl">
          More is <em style={{ ...fontAccent, color: C.terraDeep }}>coming.</em>
        </h2>

        <div className="mt-12 grid gap-px md:grid-cols-3" style={{ backgroundColor: "#DDD5C4" }}>
          {products.map((p) => (
            <div key={p.name} style={{ backgroundColor: C.ivory }} className="p-8">
              <p style={{ ...fontUI, color: C.terraDeep }} className="text-[0.65rem] uppercase tracking-[0.25em]">
                {p.kind}
              </p>
              <h3 style={{ ...fontDisplay, color: C.charcoal }} className="mt-4 text-2xl">
                {p.name}
              </h3>
              <p style={{ ...fontAccent, color: C.charcoal }} className="mt-3 opacity-70">
                {p.note}
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...fontUI, color: C.mute }} className="mt-8 text-sm">
          Follow{" "}
          <a href="https://instagram.com/do.lovebetter" style={{ color: C.terraDeep }} className="underline">
            @do.lovebetter
          </a>{" "}
          to hear when each one lands.
        </p>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function StoreFooter() {
  return (
    <footer style={{ backgroundColor: C.charcoal }}>
      <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img src="/logo-heart.png" alt="LoveBetter" className="h-7 w-7" />
          <span style={{ ...fontUI, color: C.ivory }} className="font-bold tracking-tight">lovebetter</span>
        </div>
        <p style={{ ...fontAccent, color: C.mute }}>
          Some cards open rooms that need more than a game.
        </p>
        <a
          href="https://calendly.com/folasessions/discovery-call"
          style={{ ...fontUI, color: C.gold, borderColor: C.gold }}
          className="rounded-full border px-5 py-2 text-xs uppercase tracking-[0.25em]"
        >
          Free 30-min discovery call
        </a>
      </div>
    </footer>
  );
}

/* ---------- success screen ---------- */
interface SuccessViewProps {
  checkoutId: string;
}

function SuccessView({ checkoutId }: SuccessViewProps) {
  return (
    <section style={{ backgroundColor: C.charcoal }} className="min-h-[80vh] flex items-center justify-center py-20 px-6">
      <div style={{ backgroundColor: C.charcoal2 }} className="p-10 max-w-2xl text-center space-y-6 border border-[#DDD5C4]/10 shadow-2xl">
        <Pill color={C.gold}>Payment Verified</Pill>
        <h2 style={{ ...fontDisplay, color: C.ivory }} className="text-4xl leading-tight">
          Your cards are <em style={{ ...fontAccent, color: C.terra }}>ready.</em>
        </h2>
        <p style={{ ...fontUI, color: C.ivory }} className="text-sm opacity-80 max-w-md mx-auto leading-relaxed">
          Thank you for purchasing the Romantic Couples Deck. Your payment has been verified. Download your files below:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href={`/.netlify/functions/download-product?id=${checkoutId}&file=pdf`}
            style={{ ...fontUI, backgroundColor: C.terraDeep, color: C.ivory }}
            className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-90 text-center"
          >
            Download Deck PDF
          </a>
          <a
            href={`/.netlify/functions/download-product?id=${checkoutId}&file=zip`}
            style={{ ...fontUI, border: `1px solid ${C.terra}`, color: C.terra }}
            className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-90 text-center"
          >
            Download Story ZIP
          </a>
        </div>

        <p style={{ ...fontUI, color: C.mute }} className="text-xs pt-4">
          If you experience any issues downloading your files, please contact us directly at <span style={{ color: C.gold }}>fola@fola.co.za</span>.
        </p>
      </div>
    </section>
  );
}

/* ---------- main page ---------- */
export default function StorePage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cid = params.get("id");

    const verifySuccess = async (id: string) => {
      setVerifying(true);
      try {
        const res = await fetch("/.netlify/functions/validate-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutId: id }),
        });
        const valData = await res.json();
        if (res.ok && valData.verified && valData.productId === PRODUCT_ID) {
          setPurchaseSuccess(true);
          setCheckoutId(id);
          sessionStorage.setItem("lb_store_checkout_id", id);
        }
      } catch (err) {
        console.error("Verification failed", err);
      } finally {
        setVerifying(false);
        // Clean URL query parameters
        window.history.replaceState({}, "", window.location.pathname);
      }
    };

    if (cid) {
      verifySuccess(cid);
    } else {
      const savedCid = sessionStorage.getItem("lb_store_checkout_id");
      if (savedCid) {
        setPurchaseSuccess(true);
        setCheckoutId(savedCid);
      }
    }
  }, []);

  const handleCheckout = async () => {
    if (nickname) {
      console.warn("Honeypot filled.");
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address to deliver your files.");
      return;
    }

    if (email.length > 100) {
      setError("Email address is too long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const verifyRes = await fetch("/.netlify/functions/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: PRODUCT_ID,
          amountInCents: PRICE_CENTS,
          email: email,
          name: "Store Customer",
          phone: "",
          path: "/store/delivery-x7k2m9/"
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.redirectUrl) {
        if (verifyData.checkoutId) {
          localStorage.setItem("active_checkout_id", verifyData.checkoutId);
        }
        window.location.href = verifyData.redirectUrl;
      } else {
        setError(verifyData.error || "Failed to initiate payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Payment initiation failed. Please try again.");
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#1B1917] flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-[#C1795A] mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p style={{ ...fontUI, color: "#EDE5D4" }} className="text-sm font-sans">Verifying payment status with Yoco...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <StoreHeader />
      {purchaseSuccess && checkoutId ? (
        <SuccessView checkoutId={checkoutId} />
      ) : (
        <>
          <Hero />
          <FeaturedDeck 
            email={email}
            setEmail={setEmail}
            nickname={nickname}
            setNickname={setNickname}
            loading={loading}
            error={error}
            onCheckout={handleCheckout}
          />
        </>
      )}
      <ComingSoon />
      <StoreFooter />
    </main>
  );
}
