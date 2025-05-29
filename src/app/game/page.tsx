"use client";

import InfoButton from "@/components/info-button";
import Lifes from "@/components/lifes";
import TimeBar from "@/components/time-bar";
import NewsSwiper from "@/components/news-swiper";
import { News, useGameStore } from "@/stores/game-store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CustomLayout from "@/components/custom-layout";

const Gamepage = () => {
  const [isGameReady, setIsGameReady] = useState(false);
  const { newGame, unclassifiedNews, currentIndex } = useGameStore();

  const currentItem: News | undefined = unclassifiedNews[currentIndex];

    useEffect(() => {
        const startGame = async () => {
            await newGame();
            setIsGameReady(true);
        };
        startGame();
    }, [newGame]);

  useEffect(() => {
    const nextItem =
      unclassifiedNews.length - 1 > currentIndex + 1
        ? unclassifiedNews[currentIndex + 1]
        : undefined;
    if (nextItem?.type === "image" || nextItem?.type === "text") {
      const img = new Image();
      img.src = nextItem.data.image;
    } else if (nextItem?.type === "video") {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = nextItem.data.video;
      video.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

    if (!isGameReady) {
        return (
            <CustomLayout>
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader2 className="animate-spin"/>
                </div>
            </CustomLayout>
        );
    }
    return (
        <CustomLayout>
            <div className="w-full flex flex-col items-center h-full">
                <div className="w-full max-w-md relative h-full flex flex-col justify-center">
                    <div className="pb-2 text-center">
                        <div className="flex justify-between">
                            <Lifes lifes={2}/>
                            <InfoButton/>
                        </div>
                    </div>
                    <TimeBar/>
                    <div className="mt-4">
                        <NewsSwiper/>
                    </div>
                </div>
            </div>
        </CustomLayout>
    );
};

export default Gamepage;
