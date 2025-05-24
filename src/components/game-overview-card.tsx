"use client";
import { cn } from "@/lib/utils";
import { News } from "@/stores/game-store";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, CircleX } from "lucide-react";

interface GameOverviewCardProps {
  news: News;
  isCorrect: boolean;
  className?: string;
}

const GameOverviewCard = ({
  news,
  isCorrect,
  className,
  ...props
}: GameOverviewCardProps) => {
  const [animated, setAnimated] = useState<"forward" | "backward" | null>(null);
  const [isFlipped, setFlipped] = useState(false);

  const { isFake } = news.data;

  return (
    <Card
      className={cn(
        className,
        "text-sm md:text-base select-none cursor-pointer",
        animated ? "flip-animation" : ""
      )}
      {...props}
      onClick={() => {
        if (animated) return;
        if (!isFlipped) {
          setAnimated("forward");
          setTimeout(() => {
            setFlipped(true);
          }, 180);

          setTimeout(() => {
            setAnimated(null);
          }, 400);
        } else {
          setAnimated("backward");
          setTimeout(() => {
            setFlipped(false);
          }, 200);

          setTimeout(() => {
            setAnimated(null);
          }, 400);
        }
      }}
    >
      {!isFlipped && (
        // Front side of the card
        <div
          className={cn(
            "flex items-center justify-between gap-4 pr-4",
            !isFlipped && animated === "backward" && "rotate-y-[-180deg]"
          )}
        >
          {news.type === "text" && (
            <img
              src={news.data.image}
              alt="News Image"
              className="size-30 object-cover rounded-l-lg"
              width={120}
              height={120}
            />
          )}
          {news.type === "image" && (
            <img
              src={news.data.image || "/placeholder.svg"}
              alt="News Image"
              className="w-30 h-30 object-cover rounded-l-lg"
            />
          )}
          {news.type === "video" && (
            <video
              src={news.data.video}
              className="size-30 object-cover rounded-l-lg shrink-0"
            />
          )}
          {isCorrect && (
            <>
              <div>
                {isFake
                  ? "Du hast die Falschnachricht richtig identifiziert!"
                  : "Du hast die wahre Nachricht richtig identifiziert!"}
              </div>
              <CheckCircle className="text-green-500 size-6 shrink-0" />
            </>
          )}
          {!isCorrect && (
            <>
              <div>
                {isFake
                  ? "Das war eine Falschnachricht, die du nicht erkannt hast!"
                  : "Das war eine wahre Nachricht, die du fälschlicherweise als Falschnachricht identifiziert hast!"}
              </div>
              <CircleX className="text-red-500 size-6 shrink-0" />
            </>
          )}
        </div>
      )}
      {isFlipped && (
        // Back side of the card
        <CardContent
          className={cn(
            "p-4 min-h-30",
            isFlipped && animated === "forward" && "rotate-y-180"
          )}
        >
          {news.type === "text" && (
            <h3 className="text-base md:text-lg leading-6 font-semibold mb-2">
              {news.data.title}
            </h3>
          )}
          {news.data.explaination}
        </CardContent>
      )}
    </Card>
  );
};

export default GameOverviewCard;
