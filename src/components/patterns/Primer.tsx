"use client";

import { BodyText, Eyebrow, Headline, PrimaryButton, ScreenShell } from "./ui";

export function Primer({ onContinue }: { onContinue: () => void }) {
  return (
    <ScreenShell>
      <div className="flex flex-col gap-5">
        <Eyebrow>Before You Begin</Eyebrow>
        <Headline>The guards were never the enemy.</Headline>
        <BodyText>
          A guard is a habit of thinking your mind built when love felt dangerous. It bends
          what you see — always toward threat, always toward blame. It was the best a younger
          you could do, and it worked. The problem is that it never learned the war ended.
        </BodyText>
        <PrimaryButton onClick={onContinue} className="mt-2 self-start">
          I&rsquo;m ready →
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}
