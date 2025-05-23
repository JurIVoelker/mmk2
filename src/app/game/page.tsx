"use client";

import InfoButton from "@/components/info-button";
import Lifes from "@/components/lifes";
import TimeBar from "@/components/time-bar";
import NewsSwiper from "@/components/news-swiper";
import { News, useGameStore } from "@/stores/game-store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Gamepage = () => {
  const [isGameReady, setIsGameReady] = useState(false);
  const { newGame, unclassifiedNews, currentIndex, score } = useGameStore();

  const currentItem: News | undefined = unclassifiedNews[currentIndex];

  useEffect(() => {
    const startGame = async () => {
      await newGame();
      setIsGameReady(true);
    };
    startGame();
  }, [newGame]);

  if (!isGameReady) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden">
      <div className="w-full max-w-md relative">
        <div className="pt-14 pb-2 text-center">
          <div className="grid grid-cols-3">
            <div>{score}</div>
            <span className="text-2xl font-semibold block">
              #
              {currentItem &&
                currentItem.data.id.substring(currentItem.data.id.length - 10)}
            </span>
            <div className="flex justify-end">
              <InfoButton />
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 flex justify-between items-center px-4">
          <Lifes lifes={2} />
          <TimeBar />
        </div>
        <div className="mt-4">
          <NewsSwiper />
        </div>
      </div>
    </div>
  );
};

export default Gamepage;
