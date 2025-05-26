export function VideoContent({src}: { src?: string }) {
    return (
        <div className="flex flex-col h-full w-full justify-between relative">
            <div className={"absolute flex flex-col right-4 gap-4 items-center bottom-[20%]"}>
                <div className={"relative"}>
                    <img
                        src="/assets/message-provider-images/echo24.png"
                        alt="Nachrichtenkanal"
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <img
                        src="/assets/icons/plus.svg"
                        alt="Abonieren"
                        className="w-5 h-5 absolute -bottom-2 left-0 right-0 justify-self-center"
                    />
                </div>
                <div className={"justify-center"}>
                    <img
                        src="/assets/icons/heart-filled.svg"
                        alt="Like"
                        className="w-10 h-9"
                    />
                    <p className={"text-white text-xs"}>328.7K</p>
                </div>
                <div className={"justify-items-center"}>
                    <img
                        src="/assets/icons/comment-filled.svg"
                        alt="Kommentare"
                        className="w-10 h-9"
                    />
                    <p className={"text-white text-xs"}>578</p>
                </div>
                <div className={"justify-items-center"}>
                    <img
                        src="/assets/icons/share-tik-tok.svg"
                        alt="Teilen"
                        className="w-10 h-9"
                    />
                    <p className={"text-white text-xs"}>Share</p>
                </div>
            </div>
            <div className={"absolute bottom-0 flex p-4 justify-between w-full"}>
                <div className={"w-full"}>
                    <h2 className={"text-white text-xl"}>@Tages.Echo</h2>
                    <p className={"text-white text-base"}>#news #brandnew #important</p>
                    <div className={"flex items-center overflow-hidden w-full"}>
                        <img
                            src="/assets/icons/music.svg"
                            alt="Musik"
                            className="w-3 h-3"
                        />
                        <div className="relative overflow-hidden fade-mask w-50">
                            <p className="text-white text-base marquee">Original Sound</p>
                        </div>
                    </div>
                </div>
                <img
                    src="/assets/icons/disc.svg"
                    alt="Musik"
                    className="w-14 h-14"
                />
            </div>
            <div className="w-full h-full rounded-xl overflow-hidden">
                <video
                    src={src}
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
