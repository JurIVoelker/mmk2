export function VideoContent({src, alt}: { src?: string; alt?: string }) {
    return (
        <div className="flex flex-col rounded-xl border shadow-sm h-[50vh]">
            <div className="flex flex-col h-full w-full justify-between">
                <div className="pt-4 pb-4 px-6 text-left">
                    <h2 className="text-xl font-bold">Lorem ipsum dolor sit amet</h2>
                </div>

                <div className="flex-1 pl-0 pr-0 px-6">
                    <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden">
                        {src ? (
                            <video
                                src={src}
                                controls
                                className="w-full h-full object-cover"
                            >
                            </video>
                        ) : (
                            /*TODO: error handling?*/
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500" >
                                <p>Kein Video verfügbar</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="pt-4 pb-4 px-6 max-h-[30%] overflow-y-auto text-left">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                    </p>
                </div>
            </div>
        </div>
    );
}
