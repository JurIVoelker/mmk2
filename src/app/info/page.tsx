"use client";

import {useState} from "react";
import {ImageContent} from "@/components/cards-content/image-content";
import {VideoContent} from "@/components/cards-content/video-content";
import {TextContent} from "@/components/cards-content/text-content";
import CustomLayout from "@/components/custom-layout";
import {cn} from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


type ContentType = "image" | "video" | "newspaper";

const Infopage = () => {
    const [currentContent, setCurrentContent] = useState<ContentType>("image");

    const flow: ContentType[] = ["image", "video", "newspaper"];

    const labelMap: { [key in ContentType]: string } = {
        image: "Instagram",
        video: "Tiktok",
        newspaper: "Zeitungsartikel",
    };

    const textMap: { [key in ContentType]: string } = {
        image: "Das ist eine Beschreibung zum Bild. Lorem ipsum dolor sit amet. " +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
        video: "Hier geht es um ein Video. Lorem ipsum dolor sit amet." +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
        newspaper: "Das ist ein Zeitungstext. Lorem ipsum dolor sit amet." +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.\n" +
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    };

    return (
        <CustomLayout>
            <Carousel opts={{loop: true}}
                      setApi={(api) => {
                          api.on("select", () => {
                              const index = api.selectedScrollSnap()
                              const newContent = ["image", "video", "newspaper"][index] as ContentType
                              setCurrentContent(newContent)
                          })
                      }}
            >
                <div className="flex flex-col w-full h-full text-center justify-between">
                    <CarouselContent>
                        <CarouselItem>
                            {/*Carousel Item*/}
                            <div className={"overflow-y-auto"}>
                                <div
                                    className="sticky top-0 bg-white z-10 pt-4 pb-4 gap-1 flex items-center justify-center">
                                    <img src="/assets/icons/info.svg" alt="Info" className="w-6 h-6"/>
                                    <h2 className="text-xl font-bold">Instagram-Beitrag</h2>
                                </div>
                                <div className="flex flex-col gap-4 overflow-y-auto ">
                                    <div className={"p-1"}>
                                        <div className={"border border-black rounded-md h-[65vh]"}>
                                            <ImageContent src="./assets/image/test.jpg"/></div>
                                    </div>
                                    <div className="pt-4 pb-4 text-left">
                                        <p>
                                            {textMap["image"]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            {/*Carousel Item*/}
                            <div className={"overflow-y-auto"}>
                                <div
                                    className="sticky top-0 bg-white z-10 pt-4 pb-4 gap-1 flex items-center justify-center">
                                    <img src="/assets/icons/info.svg" alt="Info" className="w-6 h-6"/>
                                    <h2 className="text-xl font-bold">Tiktok-Beitrag</h2>
                                </div>
                                <div className="flex flex-col gap-4 overflow-y-auto ">
                                    <div className={"p-1"}>
                                        <div className={"border border-black rounded-md h-[65vh]"}>
                                            <VideoContent src="./assets/video/test.mp4"/></div>
                                    </div>
                                    <div className="pt-4 pb-4 text-left">
                                        <p>
                                            {textMap["video"]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            {/*Carousel Item*/}
                            <div className={"overflow-y-auto"}>
                                <div
                                    className="sticky top-0 bg-white z-10 pt-4 pb-4 gap-1 flex items-center justify-center">
                                    <img src="/assets/icons/info.svg" alt="Info" className="w-6 h-6"/>
                                    <h2 className="text-xl font-bold">Online Zeitungsartikel</h2>
                                </div>
                                <div className="flex flex-col gap-4 overflow-y-auto ">
                                    <div className={"p-1"}>
                                        <div className={"border border-black rounded-md h-[65vh]"}>
                                            <TextContent src="./assets/image/test.jpg" content={"Test"}
                                                         date={new Date()} category={"Test"}
                                                         title={"Test"}/></div>
                                    </div>
                                    <div className="pt-4 pb-4 text-left">
                                        <p>
                                            {textMap["newspaper"]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </div>
                <div className="sticky bottom-0 bg-white z-10">
                    <div className="flex justify-between w-full p-4 w-full">
                        <div className="flex-1 flex justify-center">
                            <CarouselPrevious
                                currentContent={currentContent}
                                contentOrder={["image", "video", "newspaper"]}
                                labelMap={labelMap}
                            />
                        </div>
                        <div className="flex-1 flex gap-2 items-center justify-center">
                            {flow.map((item) => (
                                <div
                                    key={item}
                                    className={cn(
                                        "w-5 h-5 rounded-full transition-colors duration-300",
                                        item === currentContent ? "bg-brown" : "bg-brown-light"
                                    )}
                                />
                            ))}
                        </div>
                        <div className="flex-1 flex justify-center">
                            <CarouselNext
                                currentContent={currentContent}
                                contentOrder={["image", "video", "newspaper"]}
                                labelMap={labelMap}
                            />
                        </div>
                    </div>
                </div>
            </Carousel>
        </CustomLayout>
    );
};

export default Infopage;
