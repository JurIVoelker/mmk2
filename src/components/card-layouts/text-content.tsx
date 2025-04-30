export function TextContent({ src, alt }: { src?: string; alt?: string }) {
    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="pt-4 pb-4 px-6">
                <h2 className="text-xl font-bold">Lorem ipsum dolor sit amet</h2>
            </div>

            <div className="flex-1 pl-0 pr-0 px-6">
                <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden">
                    {src ? (
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200" />
                    )}
                </div>
            </div>
            <div className="pt-4 pb-4 px-6 max-h-[70%] overflow-y-auto">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                    Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
                    ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
                    massa, varius a, semper congue, euismod non, mi.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                    Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
                    ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
                    massa, varius a, semper congue, euismod non, mi.
                </p>
            </div>
        </div>
    );
}
