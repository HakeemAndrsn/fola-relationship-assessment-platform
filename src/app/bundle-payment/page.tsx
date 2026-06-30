"use client";

import Link from "next/link";
import { useState } from "react";
import YocoButton from "@/components/YocoButton";

export default function BundlePaymentPage() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");

  return (
    <div className="min-h-screen bg-background text-card-foreground texture-paper flex items-center justify-center px-6 py-12" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184, 101, 74, 0.1) 0%, rgba(124, 134, 115, 0.05) 50%, transparent 70%)" }}>
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border rounded-3xl p-8 shadow-xl backdrop-blur-md">
        <Link href="/" className="text-xs text-[#B8654A] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity inline-block mb-2">
          &larr; Back to Home
        </Link>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8654A]/30 bg-[#121212]/10">
          <span className="text-[#B8654A] text-sm">🔒</span>
          <span className="text-[#B8654A] text-xs font-semibold tracking-wider uppercase font-sans">Secure Checkout</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground font-serif leading-tight">The Complete Growth Bundle</h1>
        <p className="text-card-foreground/80 font-sans text-sm leading-relaxed">
          Unlock both the <strong>Individual Assessment</strong> (to understand your core wiring) and the <strong>Couples Assessment</strong> (to align with your partner).
        </p>

        <div className="bg-[#B8654A]/5 border border-[#B8654A]/10 rounded-2xl p-4 text-left">
          <div className="flex justify-between items-center font-serif text-lg font-bold text-foreground mb-1">
            <span>Bundle Package Price</span>
            <span className="text-[#B8654A]">R1,000</span>
          </div>
          <div className="flex justify-between text-xs text-card-foreground/60 font-sans">
            <span>Individual (R600) + Couples (R600)</span>
            <span className="line-through">R1,200</span>
          </div>
          <p className="text-[10px] text-green-700 font-semibold font-sans mt-2">✓ You save R200 today</p>
        </div>

        {/* Customer details form */}
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs text-card-foreground/80 font-sans mb-1.5 font-medium uppercase tracking-wider">Your Full Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Thabo Khumalo"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-sans placeholder:text-card-foreground/75 focus:outline-none focus:border-[#B8654A]/50 focus:bg-card transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-card-foreground/80 font-sans mb-1.5 font-medium uppercase tracking-wider">Email address *</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-sans placeholder:text-card-foreground/75 focus:outline-none focus:border-[#B8654A]/50 focus:bg-card transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-card-foreground/80 font-sans mb-1.5 font-medium uppercase tracking-wider">Phone number (optional)</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+27 12 345 6789"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-sans placeholder:text-card-foreground/75 focus:outline-none focus:border-[#B8654A]/50 focus:bg-card transition-all"
            />
          </div>
        </div>

        <YocoButton
          customerEmail={customerEmail}
          customerPhone={customerPhone}
          customerName={customerName}
          productDescription="LOVEBETTER Complete Growth Bundle"
          amountInCents={100000}
          productId="lovebetter_bundle"
        />

        <div className="space-y-2 pt-2 border-t border-border">
          <p className="text-[11px] text-card-foreground/60 font-sans">🔒 POPIA Compliant. Your assessment data is fully encrypted and never stored on public web servers.</p>
          <p className="text-[11px] text-card-foreground/60 font-sans">💳 Secure payments processed via Yoco (Visa, Mastercard, Instant EFT)</p>
        </div>
      </div>
    </div>
  );
}
