import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CustomLayout from "@/components/custom-layout";
import SpeechBubble from "./speech-bubble"
export default function Onboarding() {
    const [step, setStep] = useState<"hello" | "talk" | "talk2" | "pope" | "pope2" | "sip" |"selection">("hello");
    const [mode, setMode] = useState<"text" | "image" | "video" | null>(null);
    const router = useRouter();

    const handleStart = () => {
        if (mode) {
            router.push(`/game?newsType=${mode}`);
        }
    };

    return (
        <CustomLayout className="w-full h-screen flex flex-col items-center justify-center">
            {step === "hello" && (
                <div className="flex flex-col">
                    <Button
                        className={cn(buttonVariants({ variant: "default" }),
                        "self-end")}
                        onClick={() => setStep("selection")}>
                            SKIP
                    </Button>
                    <video
                        className="p-2 h-full w-full"
                        src="/assets/asisstant/wave.mp4"
                        autoPlay
                        loop
                        onClick={() => setStep("talk")}
                    ></video>
                </div>
            )}
            {step === "talk" && (
                <div className="flex flex-col">
                    <Button
                        className={cn(buttonVariants({ variant: "default" }),
                            "self-end")}
                        onClick={() => setStep("selection")}>
                        SKIP
                    </Button>
                    <video
                        className="p-2 h-full w-full"
                        src="/assets/asisstant/talk.mp4"
                        autoPlay
                        loop
                        onClick={() => setStep("talk2")}
                    ></video>
                    <SpeechBubble text="Hallo! Wie geht es Ihnen?" />
                </div>
            )}{step === "talk2" && (
                <div className="flex flex-col">
                    <Button
                        className={cn(buttonVariants({ variant: "default" }),
                            "self-end")}
                        onClick={() => setStep("selection")}>
                        SKIP
                    </Button>
                    <video
                        className="p-2 h-full w-full"
                        src="/assets/asisstant/talk.mp4"
                        autoPlay
                        loop
                        onClick={() => setStep("sip")}
                    ></video>
                    <SpeechBubble text="Setzten Sie sich doch. Ich würde mich gerne mit Ihnen über die neusten Nachrichten, bei einer Tasse Tee, unterhalten." />
                </div>
            )}{step === "sip" && (
                <div className="flex flex-col">
                    <Button
                        className={cn(buttonVariants({ variant: "default" }),
                            "self-end")}
                        onClick={() => setStep("selection")}>
                        SKIP
                    </Button>
                    <video
                        className="p-2 h-full w-full"
                        src="/assets/asisstant/sip.mp4"
                        autoPlay
                        loop
                        onClick={() => setStep("pope")}
                    ></video>
                    <SpeechBubble text="Haben Sie es schon gehört?!" />
                </div>
            )}{step === "pope" && (
                <div className="flex flex-col">
                    <Button
                        className={cn(buttonVariants({ variant: "default" }),
                            "self-end")}
                        onClick={() => setStep("selection")}>
                        SKIP
                    </Button>
                    <video
                        className="p-2 h-full w-full"
                        src="/assets/asisstant/talk.mp4"
                        autoPlay
                        loop
                        onClick={() => setStep("pope2")}
                    ></video>
                    <SpeechBubble text="Präsident Trump will Papst werden. Unglaublich oder?!" />
                </div>
            )}{step === "pope2" && (
                <div className="flex flex-col">
                    <Button
                        className={cn(buttonVariants({ variant: "default" }),
                            "self-end")}
                        onClick={() => setStep("selection")}>
                        SKIP
                    </Button>
                    <video
                        className="p-2 h-full w-full"
                        src="/assets/asisstant/talk.mp4"
                        autoPlay
                        loop
                        onClick={() => setStep("selection")}
                    ></video>
                    <SpeechBubble text="Nein?! Über welchen Kanal beziehen Sie denn Ihre Nachrichten?" />
                </div>
            )}
            {step === "selection" && (
                <motion.div
                    key="selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <button
                            className={cn(buttonVariants({ variant: mode === "text" ? "default" : "outline" }),
                                "w-36 h-12"
                            )}
                            onClick={() => setMode("text")}
                        >
                            Online Zeitung
                        </button>
                        <button
                            className={cn(buttonVariants({ variant: mode === "image" ? "default" : "outline" }),
                                "w-36 h-12"
                            )}
                            onClick={() => setMode("image")}
                        >
                            Instagram
                        </button>
                        <button
                            className={cn(buttonVariants({ variant: mode === "video" ? "default" : "outline" }),
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
                    <SpeechBubble text="Wähle den Nachrichtenkanal aus, mit dem du am meisten Vertraut bist." />
                    <video
                        className="p-2 h-1/2 w-1/2 self-end"
                        src="/assets/asisstant/sip.mp4"
                        autoPlay
                        loop
                    ></video>
                </motion.div>
            )}
        </CustomLayout>
    );
}
