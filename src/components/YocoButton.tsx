"use client";

import { useState } from "react";

interface YocoButtonProps {
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  productDescription?: string;
  amountInCents?: number;
  onSuccess?: () => void;
}

export default function YocoButton({
  customerEmail = "",
  customerPhone = "",
  customerName = "",
  productDescription = "LoveBETTER Individual Assessment",
  amountInCents = 60000,
  onSuccess,
}: YocoButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState("");

  const handlePayment = async () => {
    if (nickname) {
      console.warn("Bot detected via honeypot.");
      return;
    }

    if (!customerEmail || !customerEmail.includes("@")) {
      setError("Please enter a valid email address before proceeding.");
      return;
    }

    if (customerEmail.length > 100) {
      setError("Email address is too long.");
      return;
    }

    if (customerPhone && customerPhone.length > 30) {
      setError("Phone number is too long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const verifyRes = await fetch("/.netlify/functions/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "lovebetter_assessment",
          amountInCents: amountInCents,
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
          path: window.location.pathname
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.redirectUrl) {
        // Redirect client to Yoco's hosted secure checkout screen
        window.location.href = verifyData.redirectUrl;
      } else {
        setError(verifyData.error || "Failed to initiate payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Payment initiation failed. Please check your connection and try again.");
      setLoading(false);
      console.error("Yoco checkout initiation error:", err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Honeypot field hidden from users */}
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

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c4a030] px-8 py-4 text-lg font-bold text-[#0a1628] shadow-lg shadow-[#d4af37]/20 transition-all hover:shadow-xl hover:shadow-[#d4af37]/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay R${(amountInCents / 100).toFixed(0)} — Unlock Assessment`
        )}
      </button>
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}
    </div>
  );
}


