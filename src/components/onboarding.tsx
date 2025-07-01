import React, {useState} from "react";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import CustomLayout from "@/components/custom-layout";
import SpeechBubble from "./speech-bubble";
import Lifes from "@/components/lifes";
import InfoButton from "@/components/info-button";
import TimeBar from "@/components/time-bar";
import {TextContent} from "@/components/cards-content/text-content";
import GameActionButtons from "@/components/game-action-buttons";

type Step =
    | "hello"
    | "talk"
    | "talk2"
    | "pope"
    | "pope2"
    | "sip"
    | "skipped"
    | "text"
    | "text2"
    | "text3"
    | "text4"
    | "text5"
    | "text6"
    | "text7"
    | "text8"
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
                        showFinger,
                     }: StepContentProps & { showFinger?: boolean })
{
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
            <div className="relative flex ">
                {showFinger &&<img height="48" width="48" alt="touchFingerIcon" src="/assets/onboarding/double-tap_11441390.png" className="right-1 self-center animate-pulse absolute z-10"/>}
                <video
                    className="p-2 h-full w-full"
                    src={videoSrc}
                    autoPlay
                    loop
                    onClick={onVideoClick}
                ></video>
            </div>
            {speechText && <SpeechBubble text={speechText}/>}
        </div>
    );
}

export default function Onboarding() {

    const date = new Date();

    const [step, setStep] = useState<Step>("talk");
    const [mode, setMode] = useState<Mode>(null);
    const router = useRouter();

    const handleStart = () => {
        if (mode) {
            router.push(`/game?newsType=${mode}`);
        }
    };

    function renderStepContent() {
        switch (step) {
            case "talk":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("talk2")}
                        speechText="Hallo! Wie geht es Ihnen?"
                        onSkip={() => setStep("skipped")}
                        showFinger={true}
                    />
                );
            case "talk2":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("sip")}
                        speechText="Setzten Sie sich doch. Ich würde mich gerne mit Ihnen über die neusten Nachrichten, bei einer Tasse Tee, unterhalten."
                        onSkip={() => setStep("skipped")}
                        showFinger={true}
                    />
                );
            case "sip":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/sip.mp4"
                        onVideoClick={() => setStep("pope")}
                        speechText="Haben Sie es schon gehört?!"
                        onSkip={() => setStep("skipped")}
                    />
                );
            case "pope":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("pope2")}
                        speechText="Präsident Trump will Papst werden. Unglaublich oder?!"
                        onSkip={() => setStep("skipped")}
                    />
                );
            case "pope2":
                return (
                    <StepContent
                        videoSrc="/assets/asisstant/talk.mp4"
                        onVideoClick={() => setStep("text")}
                        speechText="Nein?! Ich erkläre Ihnen kurz die Anwendung?"
                        onSkip={() => setStep("skipped")}
                    />
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
                                TikTok
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
            case "text2":
                return (
                        <div className="h-full w-full overflow-x-hidden"
                             onClick={() => setStep("text3")}
                        >
                            <div className="flex justify-between w-full items-center game-content-width z-0 relative">
                                <Lifes lifes={3} className="border-4 border-red-500 rounded animate-pulse"/>
                                <InfoButton></InfoButton>
                            </div>
                            <TimeBar></TimeBar>
                            <div className="absolute z-20">
                                <SpeechBubble
                                    text="Hier wird Ihr Leben angezeigt, welches sich bei Fehlern verringert."></SpeechBubble>
                            </div>
                            <motion.div
                                className="rounded-2xl w-full border-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 p-[10px]"
                            >
                                <TextContent
                                    src="/assets/onboarding/Bargeld.png"
                                    title="Bargeld wird abgeschafft"
                                    content="Die Bundesregierung beschließt Abschaffung zum Jahr 2026"
                                    category="Politik"
                                    className="bg-white"
                                    date={date}
                                />
                            </motion.div>
                            <GameActionButtons
                                onClickFake={() => {
                                }}
                                onClickReal={() => {
                                }}
                            />
                        </div>
                )
            case"text":
                return (
                    <div className="h-full w-full overflow-x-hidden"
                         onClick={() => setStep("text2")}
                    >
                        <div className="flex justify-between w-full items-center game-content-width z-0 relative">
                            <Lifes lifes={3}/>
                            <InfoButton></InfoButton>
                        </div>
                        <TimeBar></TimeBar>
                        <motion.div
                            className="rounded-2xl w-full border-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 p-[10px]"
                        >
                            <TextContent
                                src="/assets/onboarding/Bargeld.png"
                                title="Bargeld wird abgeschafft"
                                content="Die Bundesregierung beschließt Abschaffung zum Jahr 2026"
                                category="Politik"
                                className="bg-white"
                                date={date}
                            />
                        </motion.div>
                        <div className="absolute top-120 z-20">
                            <SpeechBubble text="Glauben Sie diese Nachricht ist echt?"></SpeechBubble>
                            <SpeechBubble text="Wenn JA: Wischen Sie den Beitrag nach rechts.
                                                Wenn NEIN: Wischen Sie den Beitrag nach links.
                                                Oder nutzen Sie die Buttons unter dem Beitrag."
                            >
                            </SpeechBubble>
                        </div>
                        <GameActionButtons
                            className="border-4 border-red-500 rounded animate-pulse"
                            onClickFake={() => {
                            }}
                            onClickReal={() => {
                            }}
                        />
                    </div>
                )
            case"text3":
                return (
                    <div className="h-full w-full overflow-x-hidden"
                         onClick={() => setStep("text4")}
                    >
                        <div className="flex justify-between w-full items-center game-content-width z-0 relative">
                            <Lifes lifes={3}/>
                            <InfoButton></InfoButton>
                        </div>
                        <TimeBar className="border-4 border-red-500 rounded animate-pulse"></TimeBar>
                        <div className="absolute  z-20">
                            <SpeechBubble text="Das hier zeigt an wie viel Zeit Sie noch haben, um sich zu entscheiden."></SpeechBubble>
                        </div>
                        <motion.div
                            className="rounded-2xl w-full border-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 p-[10px]"
                        >
                            <TextContent
                                src="/assets/onboarding/Bargeld.png"
                                title="Bargeld wird abgeschafft"
                                content="Die Bundesregierung beschließt Abschaffung zum Jahr 2026"
                                category="Politik"
                                className="bg-white"
                                date={date}
                            />
                        </motion.div>
                        <GameActionButtons
                            onClickFake={() => {
                            }}
                            onClickReal={() => {
                            }}
                        />
                    </div>
                )
            case"text4":
                return (
                    <div className="h-full w-full overflow-x-hidden"
                         onClick={() => setStep("text5")}
                    >
                        <div className="flex justify-between w-full items-center game-content-width z-0 relative">
                            <Lifes lifes={3}/>
                            <InfoButton className="border-4 border-red-500 rounded animate-pulse"></InfoButton>
                        </div>
                        <TimeBar></TimeBar>
                        <div className="absolute  z-20">
                            <SpeechBubble text="Hier gelangen Sie zu unserer Info-Seite, da können Sie nachlesen wie man Falschinformationen erkennen kann."></SpeechBubble>
                        </div>
                        <motion.div
                            className="rounded-2xl w-full border-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 p-[10px]"
                        >
                            <TextContent
                                src="/assets/onboarding/Bargeld.png"
                                title="Bargeld wird abgeschafft"
                                content="Die Bundesregierung beschließt Abschaffung zum Jahr 2026"
                                category="Politik"
                                className="bg-white"
                                date={date}
                            />
                        </motion.div>
                        <GameActionButtons
                            onClickFake={() => {
                            }}
                            onClickReal={() => {
                            }}
                        />
                    </div>
                )
            case"text5":
                return (
                    <div className="h-full w-full overflow-x-hidden"
                         onClick={() => setStep("skipped")}
                    >
                        <div className="flex justify-between w-full items-center game-content-width z-0 relative">
                            <Lifes lifes={3}/>
                            <InfoButton></InfoButton>
                        </div>
                        <TimeBar></TimeBar>
                        <div className="absolute  z-20">
                            <SpeechBubble text="Dann Kann es auch schon los gehen.
                                                Viel Spaß!"></SpeechBubble>
                        </div>
                        <motion.div
                            className="rounded-2xl w-full border-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 p-[10px]"
                        >
                            <TextContent
                                src="/assets/onboarding/Bargeld.png"
                                title="Bargeld wird abgeschafft"
                                content="Die Bundesregierung beschließt Abschaffung zum Jahr 2026"
                                category="Politik"
                                className="bg-white"
                                date={date}
                            />
                        </motion.div>
                        <GameActionButtons
                            onClickFake={() => {
                            }}
                            onClickReal={() => {
                            }}
                        />
                    </div>
                )
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