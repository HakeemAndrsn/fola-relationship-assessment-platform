"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ---------- Products Configuration and Theme System ---------- */
const PRODUCTS_CONFIG = {
  "swapcards-parenting-deck-digital": {
    id: "swapcards-parenting-deck-digital",
    name: "The Parenting Deck",
    kind: "Swap Cards",
    description: [
      "52 questions to navigate the transition into parenthood, division of labour, early childhood infrastructure, and emotional connection across the generation line.",
      "Print at home or play from your phone."
    ],
    features: [
      "Instant PDF download — play tonight",
      "Covers childcare, division of labour, and intimacy",
      "Includes NLP integration guidelines for parents",
    ],
    priceCents: 20000,
    theme: {
      bg: "#A64516",         // Burnt orange plate/band bg
      accent: "#F5C89E",     // Peach accent
      text: "#FDF3E7",       // Cream text
      textMute: "#FDF3E7/70",
      buttonBg: "#F5C89E",
      buttonText: "#A64516",
    },
    image: "/store/parenting-deck-cover.png",
  },
  "ebook-second-child": {
    id: "ebook-second-child",
    name: "The Second Child",
    kind: "Ebook",
    description: [
      "How your childhood parents your children — and what the work of interrupting it looks like.",
      "There are two children in your house. One of them you can see — you know their shoe size, their cry, their favourite cereal. The other one is you, at seven, still waiting in a kitchen that no longer exists for a sentence nobody said.",
      "Every parent raises both children at once. Most can't tell which one is crying.",
      "The Second Child is the companion to The Parenting Deck — and a book that stands on its own. Written by trauma and hypnotherapy practitioner Hakeem Lesolang, it answers all 52 of the deck's questions through the four engines that drive every inherited pattern: reenactment, overcorrection, the child as audience, and provision as love. The banned sentence that surfaces when you're tired. The gifts addressed to a child who isn't in the room. The rules protecting a door that closed thirty years ago. Each question gets its mechanics — how the pattern was installed, how it runs — and one practical interruption you can use this week, in a real kitchen, on a real Tuesday.",
      "This is not a book about becoming a perfect parent. That parent doesn't exist and never has. It's about becoming an interrupting one — because the difference between the homes that build people and the homes that build patients was never the absence of wounds. It's whether the wounds are still doing the parenting.",
      "You were somebody's child before you were anybody's parent. Start there."
    ],
    features: [
      "67 pages · Delivered instantly · PDF edition",
      "Companion to The Parenting Deck",
      "Practical interruptions for inherited patterns",
    ],
    priceCents: 20000,
    theme: {
      bg: "#33383F",         // Charcoal plate/band bg
      accent: "#E89D66",     // Peach accent
      text: "#FDF3E7",       // Cream text
      textMute: "#FDF3E7/70",
      buttonBg: "#E89D66",
      buttonText: "#33383F",
    },
    image: "/store/second-child-cover.png",
  },
  "swapcards-romantic-couples-digital": {
    id: "swapcards-romantic-couples-digital",
    name: "The Romantic Couples Deck",
    kind: "Swap Cards",
    description: [
      "52 questions in four tiers — from playful to profound. Includes the pass rule, a consent pause before the deep tiers, aftercare, and two write-your-own cards.",
      "Print at home or play from your phone."
    ],
    features: [
      "Instant PDF download — play tonight",
      "Built by a trauma and hypnotherapy practitioner",
      "Story-sized card images included for sharing",
    ],
    priceCents: 20000,
    theme: {
      bg: "#1B1917",         // Near-black plate/band bg
      accent: "#C1795A",     // Coral accent
      text: "#F3EFE6",       // Cream text
      textMute: "#8A8378",
      buttonBg: "#C1795A",
      buttonText: "#1B1917",
    },
    image: "/store/lb-digital-box-deck.png",
  }
};

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
            href="#swapcards-parenting-deck-digital"
            style={{ ...fontUI, backgroundColor: C.charcoal, color: C.ivory }}
            className="px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-90 uppercase tracking-widest text-[0.7rem] font-bold"
          >
            Browse Collection
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ---------- interactive card stack hero ---------- */
function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cards = [
    {
      id: "couples-cover",
      frontImage: "/store/lb-digital-box-deck.png",
      backBg: "#1B1917",
      targetId: "swapcards-romantic-couples-digital",
      label: "Romantic Couples Deck Cover",
      initialRotation: -3,
    },
    {
      id: "parenting-cover",
      frontImage: "/store/parenting-deck-cover.png",
      backBg: "#A64516",
      targetId: "swapcards-parenting-deck-digital",
      label: "The Parenting Deck Cover",
      initialRotation: 3,
      isTop: true,
    }
  ];

  return (
    <section style={{ backgroundColor: C.ivory }} className="relative py-16 overflow-hidden border-b border-[#DDD5C4]">
      <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-12 md:items-center min-h-[480px]">
        {/* Left column: Title & Anchors */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <span style={{ color: "#A64516" }} className="text-xs uppercase tracking-[0.25em] font-sans font-bold">
              The Collection
            </span>
            <h1 style={fontDisplay} className="text-5xl md:text-7xl leading-[1.05] mt-4 text-[#1B1917]">
              The LoveBetter <span style={{ color: "#A64516" }}>Store.</span>
            </h1>
            <p style={fontUI} className="mt-6 text-lg md:text-xl text-[#1B1917]/80 leading-relaxed font-sans max-w-xl">
              Decks, books, and tools for the conversations that change households.
            </p>
          </div>

          {/* Anchor Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#swapcards-parenting-deck-digital"
              className="px-4 py-2.5 rounded-full text-xs font-bold font-sans uppercase tracking-wider border border-[#A64516]/20 text-[#A64516] hover:bg-[#A64516]/5 transition-colors"
            >
              Parenting Deck ↓
            </a>
            <a
              href="#ebook-second-child"
              className="px-4 py-2.5 rounded-full text-xs font-bold font-sans uppercase tracking-wider border border-[#33383F]/20 text-[#33383F] hover:bg-[#33383F]/5 transition-colors"
            >
              The Second Child ↓
            </a>
            <a
              href="#swapcards-romantic-couples-digital"
              className="px-4 py-2.5 rounded-full text-xs font-bold font-sans uppercase tracking-wider border border-[#1B1917]/20 text-[#1B1917] hover:bg-[#1B1917]/5 transition-colors"
            >
              Couples Deck ↓
            </a>
          </div>
        </div>

        {/* Right column: Card fan */}
        <div className="md:col-span-5 flex justify-center items-center relative min-h-[380px] md:min-h-[440px]">
          {shouldReduceMotion ? (
            /* Reduced Motion Fallback */
            <div className="flex -space-x-8 overflow-x-auto py-4 max-w-full justify-center">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="w-36 h-52 shrink-0 bg-[#221F1C] border border-white/10 rounded-lg shadow-xl relative group overflow-hidden"
                  style={{ transform: `rotate(${card.initialRotation}deg)` }}
                >
                  <img src={card.frontImage} alt={card.label} className="w-full h-full object-cover" />
                  <a
                    href={`#${card.targetId}`}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white text-[10px] font-sans font-bold uppercase tracking-widest border border-white px-2 py-1">
                      View product
                    </span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            /* Draggable Card Stack */
            <div className="relative w-60 h-[340px] md:w-64 md:h-[380px]">
              {cards.map((card, index) => {
                const isFlipped = !!flippedCards[card.id];
                const isTop = card.isTop && !isFlipped;

                return (
                  <motion.div
                    key={card.id}
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.05, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                      zIndex: index,
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") toggleFlip(card.id);
                    }}
                    className="absolute inset-0 w-full h-full rounded-xl cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[#A64516] shadow-xl"
                  >
                    <motion.div
                      className="relative w-full h-full rounded-xl"
                      style={{
                        transformStyle: "preserve-3d",
                        width: "100%",
                        height: "100%",
                      }}
                      animate={{
                        rotateY: isFlipped ? 180 : 0,
                        rotateZ: isTop ? [card.initialRotation - 1, card.initialRotation + 1, card.initialRotation - 1] : card.initialRotation,
                      }}
                      transition={isTop && !isFlipped ? {
                        rotateZ: {
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut"
                        }
                      } : { duration: 0.4 }}
                      onClick={() => toggleFlip(card.id)}
                    >
                      {/* Front face */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-xl overflow-hidden backface-hidden bg-[#221F1C] border border-[#DDD5C4]/20"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <img
                          src={card.frontImage}
                          alt={card.label}
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      </div>

                      {/* Back face */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between items-center text-center backface-hidden border border-white/10"
                        style={{
                          backgroundColor: card.backBg,
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <span style={fontUI} className="text-white/40 text-[0.6rem] tracking-[0.3em] uppercase">
                          lovebetter
                        </span>
                        
                        <div className="space-y-1">
                          <p style={fontDisplay} className="text-white text-lg leading-tight">
                            {card.label}
                          </p>
                          <p className="text-white/60 text-[10px] font-sans">
                            Digital edition
                          </p>
                        </div>

                        <a
                          href={`#${card.targetId}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{ borderColor: "rgba(255,255,255,0.3)" }}
                          className="border text-[#FDF3E7] px-3 py-1.5 rounded text-[10px] font-sans uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors"
                        >
                          View product →
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- reusable product section component ---------- */
interface ProductSectionProps {
  product: typeof PRODUCTS_CONFIG[keyof typeof PRODUCTS_CONFIG];
  email: string;
  setEmail: (val: string) => void;
  nickname: string;
  setNickname: (val: string) => void;
  loadingProduct: string | null;
  error: string;
  onCheckout: (productId: string) => void;
  imageLeft: boolean;
}

function ProductSection({
  product,
  email,
  setEmail,
  nickname,
  setNickname,
  loadingProduct,
  error,
  onCheckout,
  imageLeft,
}: ProductSectionProps) {
  const t = product.theme;
  const isSelectedLoading = loadingProduct === product.id;

  return (
    <section id={product.id} style={{ backgroundColor: t.bg, color: t.text }} className="w-full border-b border-[#DDD5C4]/10">
      <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-5 md:items-center">
        {/* Left/Right dynamic order layout */}
        <div className={`md:col-span-2 ${imageLeft ? "md:order-1" : "md:order-2"} flex justify-center`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-[340px] md:max-w-none h-auto rounded-lg shadow-2xl object-cover"
            style={{ border: `1px solid ${t.accent}15` }}
          />
        </div>

        {/* Copy/Form column */}
        <div className={`md:col-span-3 ${imageLeft ? "md:order-2" : "md:order-1"} space-y-6`}>
          <span
            style={{ color: t.accent, borderColor: t.accent }}
            className="inline-block rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em]"
          >
            Available now — Digital {product.kind}
          </span>
          
          <h2 style={fontDisplay} className="text-4xl md:text-5xl leading-tight">
            {product.name}
          </h2>
          
          {/* Multi-paragraph description handler */}
          <div style={fontUI} className="text-base md:text-lg leading-relaxed opacity-90 max-w-xl space-y-4">
            {product.description.map((paragraph, idx) => {
              const isSubheading = product.id === "ebook-second-child" && idx === 0;
              return (
                <p 
                  key={idx} 
                  className={isSubheading ? "text-xl md:text-2xl font-serif italic text-white font-semibold mb-6 block" : ""}
                  style={isSubheading ? fontAccent : {}}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          <ul className="space-y-2.5 max-w-xl">
            {product.features.map((feat) => (
              <li key={feat} className="flex gap-2.5 items-baseline text-sm md:text-base">
                <span style={{ color: t.accent }}>—</span>
                <span style={fontUI} className="opacity-90">{feat}</span>
              </li>
            ))}
          </ul>

          <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }} className="p-6 md:p-8 max-w-xl rounded">
            <p style={{ color: t.accent }} className="text-xs uppercase tracking-[0.3em] font-sans">
              Digital Delivery
            </p>
            <p style={fontDisplay} className="mt-3 text-4xl md:text-5xl">
              R{(product.priceCents / 100).toFixed(0)}{" "}
              <span style={{ color: t.accent }} className="text-xs font-sans block mt-1.5 opacity-70 tracking-normal normal-case font-normal">
                Instant download &middot; Lifetime access
              </span>
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 font-sans">
                  Email Address (For Secure Delivery)
                </label>
                {/* Honeypot */}
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
                  className="w-full bg-black/20 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/20 font-sans"
                  style={{ color: t.text }}
                />
                {email && email.includes("@") && (
                  <div className="text-[11px] text-left leading-relaxed mt-2 flex items-center gap-1.5 opacity-70 transition-opacity">
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: t.accent }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Sent to: <strong className="font-mono break-all" style={{ color: t.text }}>{email}</strong></span>
                  </div>
                )}
              </div>

              {error && <p className="text-xs text-red-400 font-sans">{error}</p>}

              <button
                onClick={() => onCheckout(product.id)}
                disabled={loadingProduct !== null}
                style={{
                  ...fontUI,
                  backgroundColor: t.buttonBg,
                  color: t.buttonText,
                }}
                className="w-full flex items-center justify-center gap-2 py-4 text-xs font-bold tracking-widest transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase rounded"
              >
                {isSelectedLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" style={{ color: t.buttonText }}>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Redirecting to Yoco...
                  </span>
                ) : (
                  `Get the ${product.kind} — R${(product.priceCents / 100).toFixed(0)}`
                )}
              </button>
            </div>
            <p style={{ color: t.accent }} className="mt-4 text-[10px] opacity-70">
              Secure checkout with Yoco &middot; PDF Download &middot; @do.lovebetter
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
    <section style={{ backgroundColor: C.ivory }} className="border-t border-[#DDD5C4]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Pill>On the press</Pill>
        <h2 style={{ ...fontDisplay, color: C.charcoal }} className="mt-6 text-4xl md:text-5xl">
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
  productId: string;
}

function SuccessView({ checkoutId, productId }: SuccessViewProps) {
  const isEbook = productId === "ebook-second-child";
  const isParenting = productId === "swapcards-parenting-deck-digital";
  
  let accentColor = C.terra;
  let titleNoun = "cards";
  let productLabel = "Romantic Couples Deck";
  
  if (isEbook) {
    accentColor = "#E89D66";
    titleNoun = "ebook";
    productLabel = "The Second Child Ebook";
  } else if (isParenting) {
    accentColor = "#F5C89E";
    titleNoun = "parenting cards";
    productLabel = "The Parenting Deck";
  }

  return (
    <section style={{ backgroundColor: C.charcoal }} className="min-h-[80vh] flex items-center justify-center py-20 px-6">
      <div style={{ backgroundColor: C.charcoal2 }} className="p-10 max-w-2xl text-center space-y-6 border border-[#DDD5C4]/10 shadow-2xl rounded">
        <Pill color={C.gold}>Payment Verified</Pill>
        <h2 style={{ ...fontDisplay, color: C.ivory }} className="text-4xl leading-tight">
          Your {titleNoun} are <em style={{ ...fontAccent, color: accentColor }}>ready.</em>
        </h2>
        <p style={{ ...fontUI, color: C.ivory }} className="text-sm opacity-80 max-w-md mx-auto leading-relaxed">
          Thank you for purchasing {productLabel}. Your payment has been verified. Download your files below:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href={`/.netlify/functions/download-product?id=${checkoutId}&file=pdf`}
            style={{ ...fontUI, backgroundColor: accentColor, color: C.charcoal }}
            className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-90 text-center uppercase"
          >
            Download PDF
          </a>
          {!isEbook && (
            <a
              href={`/.netlify/functions/download-product?id=${checkoutId}&file=zip`}
              style={{ ...fontUI, border: `1px solid ${accentColor}`, color: accentColor }}
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-90 text-center uppercase"
            >
              Download Story ZIP
            </a>
          )}
        </div>

        <p style={{ ...fontUI, color: C.mute }} className="text-xs pt-4">
          If you experience any issues downloading your files, please contact us directly at <span style={{ color: C.gold }}>decks@fola.co.za</span>.
        </p>
      </div>
    </section>
  );
}

/* ---------- main store page ---------- */
export default function StorePage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [error, setError] = useState("");
  
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [purchasedProduct, setPurchasedProduct] = useState("");

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
        const validProducts = Object.keys(PRODUCTS_CONFIG);
        if (res.ok && valData.verified && validProducts.includes(valData.productId)) {
          setPurchaseSuccess(true);
          setCheckoutId(id);
          setPurchasedProduct(valData.productId);
          sessionStorage.setItem("lb_store_checkout_id", id);
          sessionStorage.setItem("lb_store_purchased_product", valData.productId);
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
      const savedProd = sessionStorage.getItem("lb_store_purchased_product");
      if (savedCid && savedProd) {
        setPurchaseSuccess(true);
        setCheckoutId(savedCid);
        setPurchasedProduct(savedProd);
      }
    }
  }, []);

  const handleCheckout = async (prodId: string) => {
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

    setLoadingProduct(prodId);
    setError("");

    try {
      const verifyRes = await fetch("/.netlify/functions/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: prodId,
          amountInCents: PRODUCTS_CONFIG[prodId as keyof typeof PRODUCTS_CONFIG].priceCents,
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
        setLoadingProduct(null);
      }
    } catch (err) {
      setError("Payment initiation failed. Please try again.");
      setLoadingProduct(null);
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
    <main className="bg-[#F3EFE6] min-h-screen text-slate-800">
      <StoreHeader />
      {purchaseSuccess && checkoutId ? (
        <SuccessView checkoutId={checkoutId} productId={purchasedProduct} />
      ) : (
        <>
          <HeroSection />
          
          {/* Parenting Deck - Burnt Orange Plate (Image Left) */}
          <ProductSection
            product={PRODUCTS_CONFIG["swapcards-parenting-deck-digital"]}
            email={email}
            setEmail={setEmail}
            nickname={nickname}
            setNickname={setNickname}
            loadingProduct={loadingProduct}
            error={error}
            onCheckout={handleCheckout}
            imageLeft={true}
          />

          {/* The Second Child - Charcoal Plate (Image Right) */}
          <ProductSection
            product={PRODUCTS_CONFIG["ebook-second-child"]}
            email={email}
            setEmail={setEmail}
            nickname={nickname}
            setNickname={setNickname}
            loadingProduct={loadingProduct}
            error={error}
            onCheckout={handleCheckout}
            imageLeft={false}
          />

          {/* Romantic Couples Deck - Near-black Plate (Image Left) */}
          <ProductSection
            product={PRODUCTS_CONFIG["swapcards-romantic-couples-digital"]}
            email={email}
            setEmail={setEmail}
            nickname={nickname}
            setNickname={setNickname}
            loadingProduct={loadingProduct}
            error={error}
            onCheckout={handleCheckout}
            imageLeft={true}
          />
        </>
      )}
      <ComingSoon />
      <StoreFooter />
    </main>
  );
}
