import {useState} from "react";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import CustomLayout from "@/components/custom-layout";
import SpeechBubble from "./speech-bubble";

type Step =
    | "hello"
    | "talk"
    | "talk2"
    | "pope"
    | "pope2"
    | "sip"
    | "skipped"
    | "text"
    | "image"
    | "video"
    | "selection";
type Mode = "text" | "image" | "video" | null;

interface StepContentProps {
    videoSrc: string;
    onVideoClick: () => void;
    speechText?: string;
    onSkip: () => void;
}

function StepContent({
                         videoSrc,
                         onVideoClick,
                         speechText,
                         onSkip,
                     }: StepContentProps) {
    return (
        <div className="flex flex-col">
            <Button
                className={cn(
                    buttonVariants({variant: "default"}),
                    "self-end"
                )}
                onClick={onSkip}
            >
                SKIP
            </Button>
            <video
                className="p-2 h-full w-full"
                src={videoSrc}
                autoPlay
                loop
                onClick={onVideoClick}
            ></video>
            {speechText && <SpeechBubble text={speechText}/>}
        </div>
    );
}

export default function Onboarding() {
    const [step, setStep] = useState<Step>("hello");
    const [mode, setMode] = useState<Mode>(null);
    const router = useRouter();

    const handleStart = () => {
        if (mode) {
            router.push(`/game?newsType=${mode}`);
        }
    };

    function renderStepContent() {
        switch (step) {
            case "hello":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/wave.mp4"
                        onVideoClick={() => setStep("talk")}
                        onSkip={() => setStep("selection")}
                    />
                );
            case "talk":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("talk2")}
                        speechText="Hallo! Wie geht es Ihnen?"
                        onSkip={() => setStep("selection")}
                    />
                );
            case "talk2":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("sip")}
                        speechText="Setzten Sie sich doch. Ich würde mich gerne mit Ihnen über die neusten Nachrichten, bei einer Tasse Tee, unterhalten."
                        onSkip={() => setStep("selection")}
                    />
                );
            case "sip":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/sip.mp4"
                        onVideoClick={() => setStep("pope")}
                        speechText="Haben Sie es schon gehört?!"
                        onSkip={() => setStep("selection")}
                    />
                );
            case "pope":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("pope2")}
                        speechText="Präsident Trump will Papst werden. Unglaublich oder?!"
                        onSkip={() => setStep("selection")}
                    />
                );
            case "pope2":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("selection")}
                        speechText="Nein?! Über welchen Kanal beziehen Sie denn Ihre Nachrichten?"
                        onSkip={() => setStep("selection")}
                    />
                );
                case "selection":
                    return (  <motion.div
                            key="selection"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="flex flex-col gap-2">
                                <button
                                    className={cn(
                                        buttonVariants({
                                            variant: mode === "text" ? "default" : "outline",
                                        }),
                                        "w-36 h-12"
                                    )}
                                    onClick={() => setStep("text")}
                                >
                                    Online Zeitung
                                </button>
                                <button
                                    className={cn(
                                        buttonVariants({
                                            variant: mode === "image" ? "default" : "outline",
                                        }),
                                        "w-36 h-12"
                                    )}
                                    onClick={() => setStep("image")}
                                >
                                    Instagram
                                </button>
                                <button
                                    className={cn(
                                        buttonVariants({
                                            variant: mode === "video" ? "default" : "outline",
                                        }),
                                        "w-36 h-12"
                                    )}
                                    onClick={() => setStep("video")}
                                >
                                    Tik Tok
                                </button>
                            </div>
                            <SpeechBubble text="Wähle den Nachrichtenkanal aus, mit dem du am meisten Vertraut bist."/>
                            <video
                                className="p-2 h-1/2 w-1/2 self-end"
                                src="/assets/asisstant/sip.mp4"
                                autoPlay
                                loop
                            ></video>
                        </motion.div>
                    );
            case "skipped":
                return (
                    <motion.div
                        key="skipped"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="flex flex-col gap-2">
                            <button
                                className={cn(
                                    buttonVariants({
                                        variant: mode === "text" ? "default" : "outline",
                                    }),
                                    "w-36 h-12"
                                )}
                                onClick={() => setMode("text")}
                            >
                                Online Zeitung
                            </button>
                            <button
                                className={cn(
                                    buttonVariants({
                                        variant: mode === "image" ? "default" : "outline",
                                    }),
                                    "w-36 h-12"
                                )}
                                onClick={() => setMode("image")}
                            >
                                Instagram
                            </button>
                            <button
                                className={cn(
                                    buttonVariants({
                                        variant: mode === "video" ? "default" : "outline",
                                    }),
                                    "w-36 h-12"
                                )}
                                onClick={() => setMode("video")}
                            >
                                Tik Tok
                            </button>
                        </div>
                        <Button
                            className="mt-6 px-4 py-2 rounded disabled:opacity-50"
                            onClick={handleStart}
                            disabled={!mode}
                        >
                            Spiel starten
                        </Button>
                        <SpeechBubble text="Wähle den Nachrichtenkanal aus, mit dem du am meisten Vertraut bist."/>
                        <video
                            className="p-2 h-1/2 w-1/2 self-end"
                            src="/assets/asisstant/sip.mp4"
                            autoPlay
                            loop
                        ></video>
                    </motion.div>
                );
                case "text":
                    return (<motion.div>
                        hahahah
                    </motion.div>)
            default:
                return null;
        }
    }

    return (
        <CustomLayout className="w-full h-screen flex flex-col items-center justify-center">
            {renderStepContent()}
        </CustomLayout>
    );
}