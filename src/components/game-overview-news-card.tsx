"use client"

import {News} from "@/stores/game-store";
import {Card} from "@/components/ui/card";

interface GameOverviewNewsCardProps {
    news: News;
}

const GameOverviewNewsCard = ({
    news
}: GameOverviewNewsCardProps) => {
    return <Card>
    <div className="flex items-center justify-between gap-4 pr-4">
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
                {news.data.content}
            </div>
        </>
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
    </div>
    </Card>
}

export default GameOverviewNewsCard;