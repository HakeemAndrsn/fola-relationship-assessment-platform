"use client";

import type { PatternResult } from "@/lib/patterns/types";
import { Eyebrow, PrimaryButton, QuietLink, ScreenShell, Turn } from "./ui";

const DISCOVERY_CALL_URL = "https://calendly.com/folasessions/discovery-call";

export function Mirror({ result, onRetake }: { result: PatternResult; onRetake: () => void }) {
  const { topGuards, family } = result;

  return (
    <ScreenShell>
      <div className="flex flex-col gap-6">
        <Eyebrow>Your Signature Patterns</Eyebrow>

        <h1
          style={{ fontFamily: "var(--font-gloock)", fontWeight: 400 }}
          className="text-[28px] leading-[1.25] text-[#E9F2EE] sm:text-[34px]"
        >
          You are <span className="text-[#C67B4F]">{family.name}</span>.
        </h1>

        <div className="flex flex-col gap-3">
          {topGuards.map((scored, i) => {
            const rank = i + 1;
            return (
              <div
                key={scored.guardId}
                className={`rounded-[4px] bg-[#17403C] p-5 ${rank === 1 ? "border-l-[3px] border-[#C67B4F]" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[16px] font-medium text-[#E9F2EE]">
                    <span className="text-[#8FB5A6]">{rank}. </span>
                    {scored.guard.name}
                  </p>
                  <p className={`text-[13px] ${rank === 1 ? "text-[#C67B4F]" : "text-[#8FB5A6]"}`}>
                    {scored.score}/12
                  </p>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#B9CFC6]">
                  {scored.guard.description}
                </p>
              </div>
            );
          })}
        </div>

        <Turn>You know the pattern now. The next question is where it was installed.</Turn>

        <div className="flex flex-col items-start gap-3">
          <PrimaryButton
            onClick={() => window.open(DISCOVERY_CALL_URL, "_blank", "noopener,noreferrer")}
          >
            Book your free discovery call →
          </PrimaryButton>
          <QuietLink onClick={onRetake}>Retake the assessment</QuietLink>
        </div>
      </div>
    </ScreenShell>
  );
}
