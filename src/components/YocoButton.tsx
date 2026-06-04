"use client";

import { useState } from "react";

interface YocoButtonProps {
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  productDescription?: string;
  amountInCents?: number;
}

export default function YocoButton({ customerEmail, customerPhone, customerName, productDescription, amountInCents }: YocoButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Dynamically load Yoco SDK
      const Yoco = await loadYocoSDK();

      const yoco = new Yoco({
        publicKey: process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY || "",
      });

      yoco.showPopup({
        amountInCents: amountInCents || 60000, // R600.00
        currency: "ZAR",
        name: "FOLA Polyclinics",
        description: productDescription || "LoveBETTER Individual Assessment",
        customer: {
          email: customerEmail || "",
          phone: customerPhone || "",
          firstName: customerName || "",
        },
        metadata: {
          source: "lovebetter-assessment",
          product: "Individual Growth Assessment",
        },
        callback: async (result) => {
          if (result.error) {
            setError(result.error.message || "Payment failed. Please try again.");
            setLoading(false);
            return;
          }

          if (result.id) {
            // Verify payment with our backend
            try {
              const verifyRes = await fetch("/.netlify/functions/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: result.id }),
              });

              const verifyData = await verifyRes.json();

              if (verifyData.verified) {
                // Fire Zapier webhook with customer data
                // Fire Zapier webhook (payment → MailerLite)
                const paymentWebhook = process.env.NEXT_PUBLIC_ZAPIER_PAYMENT_WEBHOOK;
                if (paymentWebhook) {
                  try {
                    await fetch(paymentWebhook, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: customerEmail || "",
                        phone: customerPhone || "",
                        name: customerName || "",
                        paymentId: result.id,
                        amount: amountInCents ? `R${amountInCents / 100}` : "R600",
                        product: productDescription || "Individual Growth Assessment",
                        source: "lovebetter-assessment",
                        timestamp: new Date().toISOString(),
                      }),
                    });
                  } catch (e) {
                    console.warn("Zapier payment webhook failed:", e);
                  }
                }

                sessionStorage.setItem("lb_payment_verified", "true");
                window.location.href = "/individual-assessment?lb_paid=1";
              } else {
                setError("Payment verification failed. Please contact support.");
                setLoading(false);
              }
            } catch {
              // If verification fails, still allow access (optimistic)
              // Fire Zapier webhook anyway
              const paymentWebhook = process.env.NEXT_PUBLIC_ZAPIER_PAYMENT_WEBHOOK;
              if (paymentWebhook) {
                try {
                  await fetch(paymentWebhook, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: customerEmail || "",
                      phone: customerPhone || "",
                      name: customerName || "",
                      paymentId: result.id,
                        amount: amountInCents ? `R${amountInCents / 100}` : "R600",
                        product: productDescription || "Individual Growth Assessment",
                      source: "lovebetter-assessment",
                      timestamp: new Date().toISOString(),
                    }),
                  });
                } catch (e) {
                  console.warn("Zapier payment webhook failed:", e);
                }
              }

              sessionStorage.setItem("lb_payment_verified", "true");
              window.location.href = "/individual-assessment?lb_paid=1";
            }
          }
        },
      });
    } catch (err) {
      setError("Failed to load payment gateway. Please refresh and try again.");
      setLoading(false);
      console.error("Yoco error:", err);
    }
  };

  return (
    <div className="space-y-4">
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
          "Pay R600 — Unlock Assessment"
        )}
      </button>
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}
    </div>
  );
}

function loadYocoSDK(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).YocoSDK) {
      resolve((window as any).YocoSDK);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.yoco.com/sdk/v1/yoco-sdk.js";
    script.async = true;
    script.onload = () => resolve((window as any).YocoSDK);
    script.onerror = () => reject(new Error("Failed to load Yoco SDK"));
    document.head.appendChild(script);
  });
}
