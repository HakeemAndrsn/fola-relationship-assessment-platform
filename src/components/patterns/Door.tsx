"use client";

import { BodyText, Eyebrow, Headline, PrimaryButton, ScreenShell, Turn } from "./ui";

export function Door({ onBegin }: { onBegin: () => void }) {
  return (
    <ScreenShell>
      <div className="flex flex-col gap-5">
        <Eyebrow>Free · Seven Minutes</Eyebrow>
        <Headline>Which three patterns are running your love life?</Headline>
        <Turn>Twelve guards. You carry three.</Turn>
        <BodyText>
          Every mind has patterns that bend what it sees — guards built in childhood to keep
          love from hurting. They read rejection into silence. They end things before things
          end. This assessment names yours.
        </BodyText>
        <PrimaryButton onClick={onBegin} className="mt-2 self-start">
          Begin →
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}
