"use client";

import {
  motion,
  type PanInfo,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Check, Loader2, X } from "lucide-react";
import { TextContent } from "@/components/card-layouts/text-content";
import GameActionButtons from "@/components/game-action-buttons";
import { useGameStore } from "@/stores/game-store";
import { ImageContent } from "./info-content/image-content";
import { VideoContent } from "./info-content/video-content";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewsSwiper() {
  const {
    unclassifiedNews,
    currentIndex,
    classifyAsFakeNews,
    classifyAsRealNews,
    setCurrentIndex,
  } = useGameStore();

  const currentItem = unclassifiedNews[currentIndex];
  const [isTransitioning, setIsTransitioning] = useState(false);

  const controls = useAnimation();
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const opacityLeft = useTransform(x, xInput, [1, 0, 0]);
  const opacityRight = useTransform(x, xInput, [0, 0, 1]);

  const newsNotEmpty = currentIndex < unclassifiedNews.length;
  const { push } = useRouter();

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    else if (!newsNotEmpty) {
      push("/game-overview");
    }
  }, [newsNotEmpty, push]);

  const handleSwipe = async (direction: "left" | "right") => {
    if (direction === "right") {
      await controls.start({
        x: "100%",
        opacity: 0,
        transition: { duration: 0.3 },
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
        transition: { duration: 0.3 },
      });
      setIsTransitioning(true);
      classifyAsFakeNews();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }

    setCurrentIndex(currentIndex + 1);
    controls.set({ x: 0, opacity: 1 });
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
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  if (!newsNotEmpty) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isTransitioning) {
    return <></>;
  }

  return (
    <div className="w-full max-w-xl mx-auto pt-5">
      <div className="relative h-[400px] w-full">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          className="absolute w-full h-full"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-full w-full"
          >
            {currentItem.type === "text" && (
              <TextContent
                src={`https://s3.voelkerlabs.de/${currentItem.data.image}`}
                title={currentItem.data.title}
                content={currentItem.data.content}
                category={currentItem.data.category}
                date={currentItem.data.date}
                className=""
              />
            )}
            {currentItem.type === "image" && <ImageContent />}
            {currentItem.type === "video" && <VideoContent />}
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-between pointer-events-auto px-4">
            <motion.div
              className="bg-red-500/80 text-white p-3 rounded-full transition-opacity duration-200"
              style={{ opacity: opacityLeft }}
            >
              <X size={24} />
            </motion.div>
            <motion.div
              className="bg-green-500/80 text-white p-3 rounded-full transition-opacity duration-200"
              style={{ opacity: opacityRight }}
            >
              <Check size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-around mt-4">
        <GameActionButtons
          onClickFake={() => handleSwipe("left")}
          onClickReal={() => handleSwipe("right")}
        />
      </div>
    </div>
  );
}
