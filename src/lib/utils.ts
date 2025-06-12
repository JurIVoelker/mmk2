import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import confetti from "canvas-confetti";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const highscoreFireworks = (color: "bronze" | "silver" | "gold") => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  // Define color palettes for each medal
  const colorMap: Record<typeof color, string[]> = {
    bronze: ["#a86b2c", "#8c5a26", "#7a4d20"],
    silver: ["#8c8c8c", "#b0b0b0", "#6e6e6e"],
    gold: ["#bfa100", "#b3a86c", "#a68c1a"],
  };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      colors: colorMap[color],
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      colors: colorMap[color],
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

export type ControlEvent = "left" | "right";

export const events: ControlEvent[] = [];
