"use client";

import React, { useState } from "react";
import { ImageContent } from "@/components/cards-content/image-content";
import { VideoContent } from "@/components/cards-content/video-content";
import { TextContent } from "@/components/cards-content/text-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselSlideContent } from "@/components/carousel-slide-content";
import { cn } from "@/lib/utils";

type ContentType = "image" | "video" | "newspaper";

const InfoContent = ({ onClose }: { onClose?: () => void }) => {
  const [currentContent, setCurrentContent] = useState<ContentType>("image");

  const labelMap: { [key in ContentType]: string } = {
    image: "Instagram",
    video: "Tiktok",
    newspaper: "Zeitungsartikel",
  };

  const infoOrder: ContentType[] = ["image", "video", "newspaper"];

  const textMap: { [key in ContentType]: string } = {
    image:
      "Das ist eine Beschreibung zum Bild. Lorem ipsum dolor sit amet. " +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    video:
      "Hier geht es um ein Video. Lorem ipsum dolor sit amet." +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    newspaper:
      "Das ist ein Zeitungstext. Lorem ipsum dolor sit amet." +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
      "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  };

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={(api) => {
        if (!api) return;
        api.on("select", () => {
          const index = api.selectedScrollSnap();
          const newContent = ["image", "video", "newspaper"][
            index
          ] as ContentType;
          setCurrentContent(newContent);
        });
      }}
    >
      <div className="flex flex-col w-full h-full text-center justify-between relative">
        <div className="absolute top-0 z-20 flex items-center p-2">
          {onClose && (
            <button
              onClick={onClose}
              className="transition-transform cursor-pointer hover:-translate-x-1 bg-white  rounded-full p-2 mx-2"
            >
              <img
                src="/assets/icons/arrow-left.svg"
                alt="Zurück"
                className="w-6 h-6"
              />
            </button>
          )}
        </div>
        <CarouselContent>
          {infoOrder.map((type) => (
            <CarouselItem key={type}>
              <CarouselSlideContent
                title={
                  labelMap[type] + (type === "newspaper" ? "" : "-Beitrag")
                }
                content={
                  type === "image" ? (
                    <ImageContent src="./assets/image/test.jpg" />
                  ) : type === "video" ? (
                    <VideoContent src="./assets/video/test.mp4" />
                  ) : (
                    <TextContent
                      src="./assets/image/test.jpg"
                      content="Test"
                      date={new Date()}
                      category="Test"
                      title="Test"
                    />
                  )
                }
                text={textMap[type]}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <div className="sticky bottom-0 bg-white z-10">
        <div className="flex justify-between p-4 w-full">
          <div className="flex-1 flex justify-center">
            <CarouselPrevious
              currentContent={currentContent}
              contentOrder={infoOrder}
              labelMap={labelMap}
            />
          </div>
          <div className="flex-1 flex gap-2 items-center justify-center">
            {infoOrder.map((item) => (
              <div
                key={item}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors duration-300",
                  item === currentContent ? "bg-brown" : "bg-brown-light"
                )}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center">
            <CarouselNext
              currentContent={currentContent}
              contentOrder={infoOrder}
              labelMap={labelMap}
            />
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default InfoContent;
