"use client";

import { TIME_LIMIT, useGameStore } from "@/stores/game-store";

export default function TimeBar() {
  const { timeLeft } = useGameStore();

  const percent = Math.min(100, Math.max(0, (timeLeft / TIME_LIMIT) * 100));

  return (
    <div className="w-full mt-2 h-5 flex rounded-full overflow-hidden">
      <div
        className="h-full bg-brown-light"
        style={{ width: `${percent}%`, transition: "width 200ms" }}
      />
      <div
        className="h-full bg-brown"
        style={{ width: `${100 - percent}%` }}
      />
    </div>
  );
}
