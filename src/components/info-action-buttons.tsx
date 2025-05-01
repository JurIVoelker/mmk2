import { ArrowLeft, ArrowRight } from "lucide-react";

type ContentType = "image" | "video" | "newspaper";
export default function InfoActionButtons({
                                              currentContent,
                                              onChangeContent,
                                          }: {
    currentContent: ContentType;
    onChangeContent: (content: ContentType) => void;
}) {
    const flow: ContentType[] = ["image", "video", "newspaper"];

    const currentIndex = flow.indexOf(currentContent);
    const leftContent = flow[(currentIndex - 1 + flow.length) % flow.length];
    const rightContent = flow[(currentIndex + 1) % flow.length];

    const labelMap: { [key in ContentType]: string } = {
        image: "Bild",
        video: "Video",
        newspaper: "Zeitung",
    };

    return (
        <div className="flex justify-between w-full pt-2 pb-2 px-4">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => onChangeContent(leftContent)}>
                <button
                    className="cursor-pointer w-12 h-12 border-4 border-gray-600 rounded-full flex items-center justify-center"
                    aria-label={labelMap[leftContent]}
                >
                    <ArrowLeft className="text-gray-600" size={32} />
                </button>
                <span className="w-16">{labelMap[leftContent]}</span>
            </div>
            <div className="flex gap-2 items-center">
                {flow.map((item) => (
                    <div
                        key={item}
                        className={`w-2 h-2 rounded-full ${item === currentContent ? "bg-black" : "bg-gray-400"}`}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => onChangeContent(rightContent)}>
                <button
                    className="cursor-pointer w-12 h-12 border-4 border-gray-600 rounded-full flex items-center justify-center"
                    aria-label={labelMap[rightContent]}
                >
                    <ArrowRight className="text-gray-600" size={32} />
                </button>
                <span className="w-16">{labelMap[rightContent]}</span>
            </div>
        </div>
    );
}
