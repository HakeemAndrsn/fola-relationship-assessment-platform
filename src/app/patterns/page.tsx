"use client";

import { useCallback, useState } from "react";
import { Door } from "@/components/patterns/Door";
import { Gate } from "@/components/patterns/Gate";
import { Inventory } from "@/components/patterns/Inventory";
import { Mirror } from "@/components/patterns/Mirror";
import { Primer } from "@/components/patterns/Primer";
import { GUARDS } from "@/lib/patterns/data";
import { buildShuffledOrder, computeResult, TOTAL_ITEMS } from "@/lib/patterns/scoring";
import type { Answers, PatternResult, ShuffledItem } from "@/lib/patterns/types";
import { useReducedMotion } from "@/lib/patterns/useReducedMotion";

type Screen = "door" | "primer" | "inventory" | "gate" | "mirror";

function emptyAnswers(): Answers {
  return Object.fromEntries(GUARDS.map((g) => [g.id, [undefined, undefined, undefined]]));
}

async function submitLead(name: string, email: string, result: PatternResult) {
  const body = JSON.stringify({
    name,
    email,
    family: result.family.mailerliteFieldValue,
    topGuards: result.topGuards.map((g) => ({ guard: g.guard.name, score: g.score })),
  });
  const attempt = () =>
    fetch("/api/patterns-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

  try {
    const res = await attempt();
    if (!res.ok) throw new Error(`patterns-subscribe responded ${res.status}`);
  } catch (err) {
    console.error("patterns-subscribe failed, retrying once", err);
    try {
      const retry = await attempt();
      if (!retry.ok) throw new Error(`patterns-subscribe retry responded ${retry.status}`);
    } catch (retryErr) {
      console.error("patterns-subscribe retry failed", retryErr);
    }
  }
}

export default function PatternsPage() {
  const [screen, setScreen] = useState<Screen>("door");
  const [shuffledOrder, setShuffledOrder] = useState<ShuffledItem[]>(() => buildShuffledOrder());
  const [answers, setAnswers] = useState<Answers>(() => emptyAnswers());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<PatternResult | null>(null);
  const reducedMotion = useReducedMotion();

  const handleAdvance = useCallback(
    (value: number) => {
      const current = shuffledOrder[currentIndex];
      const nextAnswers: Answers = {
        ...answers,
        [current.guardId]: answers[current.guardId].map((v, i) => (i === current.itemIndex ? value : v)),
      };
      setAnswers(nextAnswers);

      if (currentIndex + 1 < TOTAL_ITEMS) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setResult(computeResult(nextAnswers));
        setScreen("gate");
      }
    },
    [answers, currentIndex, shuffledOrder]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setScreen("primer");
    }
  }, [currentIndex]);

  const handleGateSubmit = useCallback(
    (name: string, email: string) => {
      if (result) submitLead(name, email, result);
      setScreen("mirror");
    },
    [result]
  );

  const handleRetake = useCallback(() => {
    setShuffledOrder(buildShuffledOrder());
    setAnswers(emptyAnswers());
    setCurrentIndex(0);
    setResult(null);
    setScreen("door");
  }, []);

  if (screen === "door") return <Door onBegin={() => setScreen("primer")} />;
  if (screen === "primer") return <Primer onContinue={() => setScreen("inventory")} />;
  if (screen === "inventory") {
    const current = shuffledOrder[currentIndex];
    return (
      <Inventory
        key={current.item.id}
        item={current}
        index={currentIndex}
        total={TOTAL_ITEMS}
        currentAnswer={answers[current.guardId][current.itemIndex]}
        reducedMotion={reducedMotion}
        onAdvance={handleAdvance}
        onBack={handleBack}
      />
    );
  }
  if (screen === "gate") return <Gate onSubmit={handleGateSubmit} />;
  if (screen === "mirror" && result) return <Mirror result={result} onRetake={handleRetake} />;

  return null;
}
