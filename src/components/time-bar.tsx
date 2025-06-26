"use client";

import { cn } from "@/lib/utils";
import { TIME_LIMIT, useGameStore } from "@/stores/game-store";

export default function TimeBar({ className }: { className?: string }) {
  const { timeLeft, unclassifiedNews, currentIndex } = useGameStore();

  const currentNews = unclassifiedNews[currentIndex];
  const limit       = currentNews?.timeLimit ?? TIME_LIMIT;

  const percent = Math.min(100, Math.max(0, (timeLeft / limit) * 100));

  return (
    <div
      className={cn(
        "w-full mt-1 h-4 flex rounded-full overflow-hidden relative",
        className
      )}
    >
      <div
        className="h-full bg-brown-dark rounded-full z-20 absolute"
        style={{ width: `${percent}%`, transition: "width 200ms" }}
      />
      <div className="h-full bg-brown w-full" />
    </div>
  );
}
