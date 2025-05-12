"use client";

import InfoButton from "@/components/info-button";
import Lifes from "@/components/lifes";
import TimeBar from "@/components/time-bar";
import NewsSwiper from "@/components/news-swiper";

const Gamepage = () => {

    const elapsed = 10;
    const total = 60;
    const cardId = 1234;

    return (
        <div className="w-full h-full max-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
            <div className="w-1/4">
                <div className="w-full flex flex-row items-center">
                    <span className="text-2xl">#{cardId}</span>
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                    <div className="w-full flex flex-row justify-end">
                        <InfoButton/>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <Lifes lifes={2}/>
                        <TimeBar elapsed={elapsed} total={total}/>
                    </div>
                </div>
                <div className="w-full">
                    <NewsSwiper/>
                </div>
            </div>
        </div>
    );
};

export default Gamepage;