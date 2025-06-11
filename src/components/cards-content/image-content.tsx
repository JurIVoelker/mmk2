import MessageProviderHeader from "@/components/message-provider-header";

export function ImageContent({src, alt, likes, comments}: {
    src: string;
    alt?: string;
    likes: string;
    comments: string
}) {
    return (
        <div className="flex flex-col w-full bg-white rounded-xl h-full">
            <MessageProviderHeader/>
            <div className="flex-1 pl-0 pr-0 px-6">
                <div className="w-full h-full bg-gray-200 overflow-hidden">
                    {src ? (
                        <img src={src} alt={alt} className="w-full h-full object-cover"/>
                    ) : (
                        <div className="w-full h-full bg-gray-200 min-h-[300px]"/>
                    )}
                </div>
            </div>
            <div className={"flex p-2 justify-between"}>
                <div className={"flex gap-4"}>
                    <div className={"flex items-center gap-1"}>
                        <img src="/assets/icons/heart.svg" alt="Like" className={"h-8"}/>
                        <h2 className="text-xl font-bold">{likes}T</h2>
                    </div>
                    <div className={"flex items-center gap-1"}>
                        <img
                            src="/assets/icons/comment.svg"
                            alt="Kommentar"
                            className={"h-8"}
                        />
                        <h2 className="text-xl font-bold">{comments}</h2>
                    </div>
                    <img src="/assets/icons/share.svg" alt="Teilen" className={"h-8"}/>
                </div>
                <img
                    src="/assets/icons/bookmark.svg"
                    alt="Speichern"
                    className={"h-8"}
                />
            </div>
        </div>
    );
}
