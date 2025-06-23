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
                <div
                    className={cn(
                        "flex items-center justify-between gap-4 pr-4",
                        !isFlipped && animated === "backward" && "rotate-y-[-180deg]"
                    )}
                >
                    {news.type === "text" && (
                        <>
                            <img
                                src={news.data.image}
                                alt="News Image"
                                className="size-30 object-cover rounded-l-lg"
                                width={120}
                                height={120}
                            />

                            <div>
                                {news.data.title}
                            </div>
                        </>
                    )
                    }
                    {
                        news.type === "image" && (
                            <img
                                src={news.data.image || "/placeholder.svg"}
                                alt="News Image"
                                className="w-30 h-30 object-cover rounded-l-lg"
                            />
                        )
                    }
                    {
                        news.type === "video" && (
                            <video
                                src={news.data.video}
                                className="size-30 object-cover rounded-l-lg shrink-0"
                            />
                        )
                    }
                </div>
            )}
            {isFlipped && (
                <CardContent
                    className={cn(
                        "p-4 min-h-30",
                        isFlipped && animated === "forward" && "rotate-y-180"
                    )}
                >
                    {news.type === "text" && (
                        <p className="mb-2">
                            {news.data.content}
                        </p>
                    )}

                </CardContent>
            )}

        </Card>
    )
}

export default GameOverviewNewsCard;