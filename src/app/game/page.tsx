"use client";

import InfoButton from "@/components/info-button";
import Lifes from "@/components/lifes";
import TimeBar from "@/components/time-bar";
import NewsSwiper from "@/components/news-swiper";
import {useGameStore} from "@/stores/game-store";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import CustomLayout from "@/components/custom-layout";

const Gamepage = () => {
    const [isGameReady, setIsGameReady] = useState(false);
    const {newGame} = useGameStore();

    useEffect(() => {
        const startGame = async () => {
            await newGame();
            setIsGameReady(true);
        };
        startGame();
    }, [newGame]);

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
