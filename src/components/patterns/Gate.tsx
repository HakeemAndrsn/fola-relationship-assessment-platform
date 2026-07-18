"use client";

import { FormEvent, useState } from "react";
import { BodyText, Eyebrow, Headline, PrimaryButton, ScreenShell } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Gate({ onSubmit }: { onSubmit: (name: string, email: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const nameError = touched && !name.trim() ? "First name is required." : null;
  const emailError = touched && !EMAIL_RE.test(email) ? "Enter a valid email address." : null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || !EMAIL_RE.test(email)) return;
    onSubmit(name.trim(), email.trim());
  }

  return (
    <ScreenShell>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Eyebrow>One Last Thing</Eyebrow>
        <Headline>Your three guards are ready.</Headline>
        <BodyText>
          Tell us where to send your full profile — what each guard sounds like, where it
          usually gets installed, and the first step to loosening its grip.
        </BodyText>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="patterns-name" className="mb-1.5 block text-[13px] text-[#8FB5A6]">
              First name
            </label>
            <input
              id="patterns-name"
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? "patterns-name-error" : undefined}
              className="w-full rounded-[2px] border border-[#17403C] bg-[#17403C] px-4 py-3 text-[15px] text-[#E9F2EE] outline-none placeholder:text-[#8FB5A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67B4F]"
            />
            {nameError && (
              <p id="patterns-name-error" className="mt-1 text-[13px] text-[#C67B4F]">
                {nameError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="patterns-email" className="mb-1.5 block text-[13px] text-[#8FB5A6]">
              Email
            </label>
            <input
              id="patterns-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "patterns-email-error" : undefined}
              className="w-full rounded-[2px] border border-[#17403C] bg-[#17403C] px-4 py-3 text-[15px] text-[#E9F2EE] outline-none placeholder:text-[#8FB5A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67B4F]"
            />
            {emailError && (
              <p id="patterns-email-error" className="mt-1 text-[13px] text-[#C67B4F]">
                {emailError}
              </p>
            )}
          </div>
        </div>

        <div className="mt-1 flex flex-col items-start gap-2">
          <PrimaryButton type="submit">Show me my patterns →</PrimaryButton>
          <p className="text-[12px] text-[#8FB5A6]">Free. No spam. Unsubscribe anytime.</p>
        </div>
      </form>
    </ScreenShell>
  );
}
