export function VideoContent({ src }: { src?: string}) {
    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex-1 pl-0 pr-0 px-6">
                <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden">
                    {src ? (
                        <video
                            src={src}
                            autoPlay={true}
                            loop={true}
                            className="w-full h-full object-cover"
                        >
                        </video>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500" >
                            <p>Kein Video verfügbar</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="pt-4 pb-4 px-6 overflow-y-auto">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                </p>
            </div>
        </div>
    );
}
