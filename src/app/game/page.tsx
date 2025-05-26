"use client";

import InfoButton from "@/components/info-button";
import Lifes from "@/components/lifes";
import TimeBar from "@/components/time-bar";
import NewsSwiper from "@/components/news-swiper";
import {News, useGameStore} from "@/stores/game-store";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";

const Gamepage = () => {
    const [isGameReady, setIsGameReady] = useState(false);
    const {newGame, unclassifiedNews, currentIndex} = useGameStore();

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
                <Loader2 className="animate-spin"/>
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col items-center overflow-y-scroll overflow-x-hidden">
            <div className="w-full max-w-md relative h-full">
                <div className="pt-14 pb-2 text-center">
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
    );
};

export default Gamepage;
