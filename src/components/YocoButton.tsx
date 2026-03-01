"use client";

import { useState } from "react";

type ButtonState = "idle" | "loading" | "error";

export default function YocoButton() {
  const [state, setState] = useState<ButtonState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    setState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/.netlify/functions/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !(data as { redirectUrl?: string }).redirectUrl) {
        setErrorMessage(
          (data as { error?: string }).error ||
            "Payment could not be initiated. Please try again."
        );
        setState("error");
        return;
      }

      window.location.href = (data as { redirectUrl: string }).redirectUrl;
    } catch {
      setErrorMessage("A network error occurred. Please try again.");
      setState("error");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleClick}
        disabled={state === "loading"}
        className="group relative inline-flex items-center gap-2 bg-[#d4af37] text-[#1a365d] px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-[#e4bf47] transition-all hover:shadow-xl hover:shadow-[#d4af37]/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {state === "loading" ? (
          "Redirecting to payment\u2026"
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
