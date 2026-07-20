"use client";

import { useEffect, useRef, useState } from "react";
import { RESPONSE_SCALE } from "@/lib/patterns/data";
import type { ShuffledItem } from "@/lib/patterns/types";

interface InventoryProps {
  item: ShuffledItem;
  index: number;
  total: number;
  currentAnswer: number | undefined;
  reducedMotion: boolean;
  onAdvance: (value: number) => void;
  onBack: () => void;
}

export function Inventory({ item, index, total, currentAnswer, reducedMotion, onAdvance, onBack }: InventoryProps) {
  const [selected, setSelected] = useState<number | undefined>(currentAnswer);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleSelect(value: number) {
    setSelected(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (reducedMotion) {
      onAdvance(value);
      return;
    }
    timerRef.current = setTimeout(() => onAdvance(value), 250);
  }

  const progressPercent = ((index + 1) / total) * 100;

  return (
    <div
      style={{ fontFamily: "var(--font-isans)" }}
      className="flex min-h-dvh flex-col bg-[#0D2B2A] px-6 py-8"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back to the previous question"
            className="rounded-[2px] p-2 text-[#8FB5A6] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67B4F]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p aria-live="polite" className="text-[13px] text-[#8FB5A6]">
            {index + 1} / {total}
          </p>
        </div>

        <div className="mt-4 h-[3px] w-full rounded-full bg-[#17403C]">
          <div
            className="h-full rounded-full bg-[#C67B4F] transition-[width] duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-8 py-10">
          <h1
            style={{ fontFamily: "var(--font-gloock)", fontWeight: 400 }}
            className="text-[22px] leading-[1.35] text-[#E9F2EE] sm:text-[26px]"
          >
            {item.item.prompt}
          </h1>

          <div className="flex flex-col gap-2.5" role="group" aria-label="How often does this sound like you?">
            {RESPONSE_SCALE.map((option) => {
              const isSelected = selected === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  aria-pressed={isSelected}
                  className={`rounded-[2px] px-5 py-3.5 text-left text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67B4F] ${
                    isSelected
                      ? "bg-[#C67B4F] text-[#0D2B2A] font-medium"
                      : "bg-[#17403C] text-[#E9F2EE] hover:bg-[#1c4a45]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
