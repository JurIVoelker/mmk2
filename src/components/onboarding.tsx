import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CustomLayout from "@/components/custom-layout";

export default function Onboarding() {
    const [step, setStep] = useState<"hello" | "onBoarding" |"selection">("hello");
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
                <div
                >
                    <video
                        className="p-2 h-full w-full"
                        src="/assets/asisstant/Hello.mp4"
                        autoPlay
                        loop
                        onClick={() => setStep("selection")}
                    ></video>
                </div>
            )}
            {step === "onBoarding" && (
                <></>
            )}
            {step === "selection" && (
                <motion.div
                    key="selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <h2 className="text-xl font-semibold mb-2">Wähle deinen Spielmodus:</h2>
                    <div className="flex gap-1">
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
                </motion.div>
            )}
        </CustomLayout>
    );
}
