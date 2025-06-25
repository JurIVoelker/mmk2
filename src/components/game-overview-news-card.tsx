"use client"

import {News} from "@/stores/game-store";
import {Card, CardContent} from "@/components/ui/card";
import {useState} from "react";
import {cn} from "@/lib/utils";

interface GameOverviewNewsCardProps {
    news: News;
    className?: string;
}

const GameOverviewNewsCard = ({
                                  news,
                                  className,
                                  ...props
                              }: GameOverviewNewsCardProps) => {

    const [animated, setAnimated] = useState<"forward" | "backward" | null>(null);
    const [isFlipped, setFlipped] = useState(false);

    return (
        <Card
            className={cn(
                className,
                "text-sm md:text-base select-none",
                news.type === "text" && "cursor-pointer",
                news.type === "text" && animated ? "flip-animation" : ""
            )}
            {...props}
            onClick={() => {
                if (news.type !== "text") return;
                if (animated) return;
                if (!isFlipped) {
                    setAnimated("forward");
                    setTimeout(() => setFlipped(true), 180);
                    setTimeout(() => setAnimated(null), 400);
                } else {
                    setAnimated("backward");
                    setTimeout(() => setFlipped(false), 200);
                    setTimeout(() => setAnimated(null), 400);
                }
            }}
        >
            {/* Vorderseite */}
            {!isFlipped && (
                <>
                    {news.type === "text" && (
                        <div className="flex items-center justify-between gap-4 pr-4">
                            <img
                                src={news.data.image}
                                alt="News Image"
                                className="size-30 object-cover rounded-l-lg"
                                width={120}
                                height={120}
                            />
                            <div>{news.data.title}</div>
                        </div>
                    )}
                    {news.type === "image" && (
                        <img
                            src={news.data.image || "/placeholder.svg"}
                            alt="News Image"
                            className="w-full h-full object-cover rounded-lg"
                            style={{ width: "100%", height: "100%", aspectRatio: "1/1" }}
                        />
                    )}
                    {news.type === "video" && (
                        <video
                            src={news.data.video}
                            className="w-full h-full object-cover rounded-lg"
                            style={{ width: "100%", height: "100%", aspectRatio: "1/1" }}
                            controls
                        />
                    )}
                </>
            )}

            {/* Rückseite: Nur bei text */}
            {news.type === "text" && isFlipped && (
                <CardContent
                    className={cn(
                        "p-4 min-h-30",
                        isFlipped && animated === "forward" && "rotate-y-180"
                    )}
                >
                    <p className="mb-2">
                        {news.data.content}
                    </p>
                </CardContent>
            )}
        </Card>
    )
}

export default GameOverviewNewsCard;