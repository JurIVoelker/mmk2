"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { ImageContent } from "@/components/info-content/image-content";
import { VideoContent } from "@/components/info-content/video-content";
import { TextContent } from "@/components/info-content/text-content";
import InfoActionButtons from "@/components/info-action-buttons";

type ContentType = "image" | "video" | "newspaper";

const Infopage = () => {
    const [currentContent, setCurrentContent] = useState<ContentType>("image");

    const labelMap: { [key in ContentType]: string } = {
        image: "Bild",
        video: "Video",
        newspaper: "Zeitung",
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
                return <ImageContent />;
            case "video":
                return <VideoContent />;
            case "newspaper":
                return <TextContent />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full max-h-[100vh] overflow-hidden">
            <div className="flex flex-col w-[350px] h-auto max-h-full overflow-y-auto text-center">
                <div className="sticky top-0 bg-white z-10 pt-4 pb-4 gap-3 flex items-center justify-center">
                    <Info size={24} />
                    <h2 className="text-xl font-bold">{labelMap[currentContent]}</h2>
                </div>
                <div className="flex flex-col gap-4 px-6">
                    {renderContent()}
                    <div className="pt-4 pb-4 text-left">
                        <p>
                            {textMap[currentContent]}
                        </p>
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
