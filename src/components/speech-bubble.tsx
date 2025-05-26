type SpeechBubbleProps = {
    speaker?: string;
    text: string;
};

export default function speechBubble({ speaker = "KI-Assistent:", text }: SpeechBubbleProps) {
    return (
        <div className={"flex items-center py-4 justify-end"}>
            <div className="bg-brown-light text-black px-4 py-2 rounded-lg max-w-xs shadow-md">
                <p className={"text-brown-dark"}>{speaker}</p>
                <p>{text}</p>
            </div>
            <div className="translate-y-1/2 border-t-10 border-b-10 border-l-20 border-t-transparent border-b-transparent border-l-brown-light"></div>
        </div>
    );
}
