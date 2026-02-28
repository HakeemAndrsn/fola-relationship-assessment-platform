"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

declare global {
  interface Window {
    YocoSDK: new (config: { publicKey: string }) => {
      showPopup(options: {
        amountInCents: number;
        currency: string;
        name: string;
        description: string;
        callback: (result: {
          error?: { message: string; type?: string };
          id?: string;
        }) => void;
      }): void;
    };
  }
}

type ButtonState = "idle" | "loading" | "error";

export default function YocoButton() {
  const router = useRouter();
  const [state, setState] = useState<ButtonState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setState("loading");
    setErrorMessage("");

    const yoco = new window.YocoSDK({
      publicKey: process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY!,
    });

    yoco.showPopup({
      amountInCents: 60000,
      currency: "ZAR",
      name: "Love Better",
      description: "Relationship Growth Assessment — R600",
      callback: async (result) => {
        if (result.error) {
          if (result.error.type === "CANCELLED") {
            setState("idle");
          } else {
            setErrorMessage(
              result.error.message || "Payment failed. Please try again."
            );
            setState("error");
          }
          return;
        }

        try {
          const res = await fetch("/.netlify/functions/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: result.id }),
          });

          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setErrorMessage(
              (data as { error?: string }).error ||
                "Payment could not be verified. Please try again."
            );
            setState("error");
            return;
          }

          sessionStorage.setItem("lb_payment_verified", "true");
          router.push("/assessment");
        } catch {
          setErrorMessage("A network error occurred. Please try again.");
          setState("error");
        }
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleClick}
        disabled={state === "loading"}
        className="group relative inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-xl hover:shadow-[#d4af37]/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {state === "loading" ? (
          "Opening payment\u2026"
        ) : (
          <>
            Begin Assessment \u2014 R600
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </>
        )}
      </button>
      {state === "error" && (
        <p className="text-sm text-red-400 text-center max-w-xs">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
