"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

// Locked "Deep Teal & Copper" palette (LOVEBETTER PATTERN ASSESSMENT brief §3).
// Kept as literal hex utility classes so this page stays self-contained and
// never depends on the site-wide theme in globals.css.
export const PALETTE = {
  tealDeep: "#0D2B2A",
  teal: "#17403C",
  tealDark: "#092020",
  copper: "#C67B4F",
  seafoam: "#8FB5A6",
  mist: "#E9F2EE",
  bodySoft: "#B9CFC6",
} as const;

const GLOOCK = "var(--font-gloock)";
const ISERIF = "var(--font-iserif)";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.16em] text-[#8FB5A6]">
      {children}
    </p>
  );
}

export function Headline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1
      style={{ fontFamily: GLOOCK, fontWeight: 400 }}
      className={`text-[#E9F2EE] text-[28px] leading-[1.25] sm:text-[34px] ${className}`}
    >
      {children}
    </h1>
  );
}

export function Turn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      style={{ fontFamily: ISERIF, fontStyle: "italic" }}
      className={`text-[#C67B4F] text-xl sm:text-2xl ${className}`}
    >
      {children}
    </p>
  );
}

export function BodyText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[#B9CFC6] text-[15px] leading-relaxed ${className}`}>{children}</p>;
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#C67B4F] px-6 py-3.5 text-[15px] font-medium text-[#0D2B2A] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67B4F] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function QuietLink({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className="text-[13px] text-[#8FB5A6] underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67B4F]"
    >
      {children}
    </button>
  );
}

export function ScreenShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ fontFamily: "var(--font-isans)" }}
      className="flex min-h-dvh flex-col items-center justify-center bg-[#0D2B2A] px-6 py-16"
    >
      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  );
}
