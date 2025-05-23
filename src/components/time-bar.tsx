"use client";

import { TIME_LIMIT, useGameStore } from "@/stores/game-store";

export default function TimeBar() {
  const { timeLeft } = useGameStore();

  const percent = Math.min(100, Math.max(0, (timeLeft / TIME_LIMIT) * 100));

  return (
    <div className="w-32 h-4 flex rounded-full overflow-hidden">
      <div
        className="h-full bg-red-700"
        style={{ width: `${percent}%`, transition: "width 200ms" }}
      />
      <div
        className="h-full bg-gray-200"
        style={{ width: `${100 - percent}%` }}
      />
    </div>
  );
}
