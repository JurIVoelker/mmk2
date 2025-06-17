"use client";

import {
    motion,
    type PanInfo,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion";
import {Check, Loader2, X} from "lucide-react";
import {TextContent} from "@/components/cards-content/text-content";
import GameActionButtons from "@/components/game-action-buttons";
import {useGameStore} from "@/stores/game-store";
import {ImageContent} from "@/components/cards-content/image-content";
import {VideoContent} from "@/components/cards-content/video-content";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

export default function NewsSwiper({className}: { className?: string }) {
    const {
        unclassifiedNews,
        currentIndex,
        classifyAsFakeNews,
        classifyAsRealNews,
        setCurrentIndex,
        timeLeft,
        failNews,
    } = useGameStore();

    const currentItem = unclassifiedNews[currentIndex];
    const [isTransitioning, setIsTransitioning] = useState(false);

    const controls = useAnimation();
    const x = useMotionValue(0);
    const xInput = [-100, 0, 100];
    const opacityLeft = useTransform(x, xInput, [1, 0, 0]);
    const opacityRight = useTransform(x, xInput, [0, 0, 1]);

    const newsNotEmpty = currentIndex < unclassifiedNews.length;
    const {push} = useRouter();

    useEffect(() => {
        if (typeof localStorage === "undefined") return;
        else if (!newsNotEmpty) {
            push("/game-overview");
        }
    }, [newsNotEmpty, push]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
            failNews();
        }
    }, [timeLeft, failNews]);

    const handleSwipe = async (direction: "left" | "right") => {
        if (direction === "right") {
            await controls.start({
                x: "100%",
                opacity: 0,
                transition: {duration: 0.3},
            });
            setIsTransitioning(true);
            classifyAsRealNews();
            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
        } else {
            await controls.start({
                x: "-100%",
                opacity: 0,
                transition: {duration: 0.3},
            });
            setIsTransitioning(true);
            classifyAsFakeNews();
            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
        }

        setCurrentIndex(currentIndex + 1);
        controls.set({x: 0, opacity: 1});
        x.set(0);
    };

    const handleDragEnd = (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            void handleSwipe("right");
        } else if (info.offset.x < -threshold) {
            void handleSwipe("left");
        } else {
            void controls.start({
                x: 0,
                transition: {type: "spring", stiffness: 300, damping: 20},
            });
        }
    };

    if (!newsNotEmpty) {
        return (
            <div
                className={cn(
                    "w-full h-screen flex items-center justify-center",
                    className
                )}
            >
                <Loader2 className="animate-spin"/>
            </div>
        );
    }

    if (isTransitioning) {
        return <></>;
    }

    return (
        <>
            <div
                className={cn(
                    "relative w-full min-h-screen flex flex-col justify-center items-center pt-[72px] pb-[64px]",
                    className
                )}
            >
                <motion.div
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    style={{x}}
                    className="w-full"
                >
                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.15, ease: "easeOut"}}
                        className="rounded-2xl h-full w-full border-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 p-[8px]"
                    >
                        {currentItem.type === "text" && (
                            <TextContent
                                provider={currentItem.data.provider}
                                src={currentItem.data.image}
                                title={currentItem.data.title}
                                content={currentItem.data.content}
                                category={currentItem.data.category}
                                date={currentItem.data.date}
                                className="bg-white"
                            />
                        )}
                        {currentItem.type === "image" && (
                            <ImageContent src={currentItem.data.image}
                                          likes={currentItem.stats?.likes ?? "0"}
                                          comments={currentItem.stats?.comments ?? "0"}
                                          provider={currentItem.data.provider}
                            />
                        )}
                        {currentItem.type === "video" && (
                            <VideoContent src={currentItem.data.video}
                                          likes={currentItem.stats?.likes ?? "0"}
                                          comments={currentItem.stats?.comments ?? "0"}
                                          provider={currentItem.data.provider}
                            />
                        )}
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-between pointer-events-auto">
                        <motion.div
                            className="bg-red-500/80 text-white p-3 rounded-full transition-opacity duration-200"
                            style={{opacity: opacityLeft}}
                        >
                            <X size={24}/>
                        </motion.div>
                        <motion.div
                            className="bg-green-500/80 text-white p-3 rounded-full transition-opacity duration-200"
                            style={{opacity: opacityRight}}
                        >
                            <Check size={24}/>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            {/* <SpeechBubble text="You’re a wizard Harry! I’m a what?" /> */}
            <div className="flex justify-between mt-4 fixed bottom-0 bg-white pb-2 game-content-width ml-4">
                <GameActionButtons
                    onClickFake={() => handleSwipe("left")}
                    onClickReal={() => handleSwipe("right")}
                />
            </div>
        </>
    );
}
