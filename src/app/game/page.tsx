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
        <div className="w-full flex flex-col items-center justify-center overflow-scroll">
            <div className="w-full max-w-md relative">
                <div className="pt-14 pb-2 text-center">
                    <div className="grid grid-cols-3">
                        <div></div>
                        <span className="text-2xl font-semibold block">#{cardId}</span>
                        <div className="flex justify-end"><InfoButton /></div>
                    </div>
                </div>

                <div className="absolute left-0 right-0 flex justify-between items-center px-4">
                    <Lifes lifes={2} />
                    <TimeBar elapsed={elapsed} total={total} />
                </div>
                <div className="mt-4">
                    <NewsSwiper />
                </div>
            </div>
        </div>

    );
};

export default Gamepage;