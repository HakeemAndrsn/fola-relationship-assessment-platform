"use client";

import { useState, useEffect } from "react";
import YocoButton from "@/components/YocoButton";
import Link from "next/link";

export default function TestPaymentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [testSuccess, setTestSuccess] = useState(false);
  const [paidDetails, setPaidDetails] = useState<{
    email: string;
    name: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const purchaseSuccess = params.get("purchase_success") === "1";
    const productId = params.get("product_id");

    if (purchaseSuccess && productId === "test_payment") {
      const emailParam = params.get("email");
      const nameParam = params.get("name");
      const phoneParam = params.get("phone");

      setPaidDetails({
        email: emailParam ? decodeURIComponent(emailParam) : "",
        name: nameParam ? decodeURIComponent(nameParam) : "",
        phone: phoneParam ? decodeURIComponent(phoneParam) : "",
      });
      setTestSuccess(true);
      
      // Clean up parameters to keep URL clean
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3d] to-[#1a365d] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
        
        {testSuccess && paidDetails ? (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-3xl">
              ✓
            </div>
            
            <h1 className="text-3xl font-bold text-white font-serif leading-tight">Test Payment Successful!</h1>
            <p className="text-[#a0aec0] text-sm font-sans leading-relaxed">
              The R10.00 test transaction cleared successfully using Yoco's redirection API.
            </p>

            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-left space-y-3 font-sans text-xs">
              <h3 className="font-semibold text-[#d4af37] text-sm uppercase tracking-wider">Transaction Metadata</h3>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#718096]">Customer Name:</span>
                <span className="text-white font-medium">{paidDetails.name || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#718096]">Email Address:</span>
                <span className="text-white font-medium">{paidDetails.email || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718096]">Phone Number:</span>
                <span className="text-white font-medium">{paidDetails.phone || "N/A"}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => setTestSuccess(false)}
                className="w-full rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3.5 transition-all text-sm font-sans"
              >
                Run Another Test
              </button>
              <Link
                href="/individual-assessment"
                className="text-[#d4af37] hover:underline font-sans text-sm block"
              >
                Go to Individual Assessment →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-2">
                <span className="text-[#d4af37] text-xs font-bold tracking-wider uppercase font-sans">Payment Sandbox</span>
              </div>
              <h1 className="text-3xl font-bold text-white font-serif leading-tight">Yoco R10.00 Test Page</h1>
              <p className="text-[#a0aec0] text-sm font-sans leading-relaxed">
                Use this page to run a live test of our new Yoco Checkouts integration using a real card charged at exactly R10.00.
              </p>
            </div>

            {/* Input Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#a0aec0] font-sans mb-1.5 font-medium uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vanessa Bukasa"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-sans placeholder:text-[#4a5568] focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a0aec0] font-sans mb-1.5 font-medium uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.co.za"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-sans placeholder:text-[#4a5568] focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a0aec0] font-sans mb-1.5 font-medium uppercase tracking-wider">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 82 123 4567"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-sans placeholder:text-[#4a5568] focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            {/* Test Payment Trigger Button */}
            <div className="pt-2">
              <YocoButton
                customerEmail={email}
                customerPhone={phone}
                customerName={name}
                productDescription="LoveBETTER Sandbox payment test"
                amountInCents={1000} // R10.00
                onSuccess={() => {
                  // Fallback if onSuccess is called locally
                  setPaidDetails({ name, email, phone });
                  setTestSuccess(true);
                }}
              />
            </div>

            <div className="text-center">
              <Link href="/" className="text-xs text-[#718096] hover:text-white font-sans transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
