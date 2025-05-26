"use client";

import {useState} from "react";
import {ImageContent} from "@/components/info-content/image-content";
import {VideoContent} from "@/components/info-content/video-content";
import {TextContent} from "@/components/info-content/text-content";
import InfoActionButtons from "@/components/info-action-buttons";

type ContentType = "image" | "video" | "newspaper";

const Infopage = () => {
    const [currentContent, setCurrentContent] = useState<ContentType>("image");

    const labelMap: { [key in ContentType]: string } = {
        image: "Instagram-Beitrag",
        video: "Tiktok-Beitrag",
        newspaper: "Online Zeitungsartikel",
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
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    };

    const renderContent = () => {
        switch (currentContent) {
            case "image":
                return <ImageContent src="./assets/image/test.jpg"/>;
            case "video":
                return <VideoContent src="./assets/video/test.mp4"/>;
            case "newspaper":
                return <TextContent src="./assets/image/test.jpg"/>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full overflow-hidden">
            <div className="flex flex-col w-[350px] h-[100vh] max-h-full overflow-y-auto text-center justify-between">
                <div>
                    <div className="sticky top-0 bg-white z-10 pt-4 pb-4 gap-1 flex items-center justify-center">
                        <img src="/assets/icons/info.svg" alt="Info" className="w-6 h-6"/>
                        <h2 className="text-xl font-bold">{labelMap[currentContent]}</h2>
                    </div>
                    <div className="flex flex-col gap-4 px-6">
                        <div className={"border border-black rounded-md"}>
                            {renderContent()}
                        </div>
                        <div className="pt-4 pb-4 text-left">
                            <p>
                                {textMap[currentContent]}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 bg-white z-10">
                    <InfoActionButtons
                        currentContent={currentContent}
                        onChangeContent={setCurrentContent}
                    />
                </div>

            </div>
        </div>
    );
};

export default Infopage;
