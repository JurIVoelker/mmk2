import MessageProviderHeader from "@/components/message-provider-header";

export function ImageContent({ src, alt }: { src?: string; alt?: string }) {
    return (
        <div className="flex flex-col w-full bg-white rounded-xl h-full">
            <MessageProviderHeader/>
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
            <div className="pt-4 pb-4 px-6 max-h-[30%] overflow-y-auto">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                </p>
            </div>
        </div>
    );
}
