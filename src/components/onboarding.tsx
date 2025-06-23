// components/Onboarding.tsx

import { useState } from "react";
import { motion } from "framer-motion";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";

export default function Onboarding() {
    const [step, setStep] = useState<"intro" | "selection">("intro");

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            {step === "intro" && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center max-w-xl"
                >
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                        onClick={() => setStep("selection")}
                    >
                        Weiter
                    </button>
                </motion.div>
            )}

            {step === "selection" && (
                <motion.div
                    key="selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-4"
                >
                    <Link
                        href="/game"
                        className={cn(buttonVariants({ variant: "default" }))}
                    >
                        Online Zeitung
                    </Link>
                    <Link
                        href="/game"
                        className={cn(buttonVariants({ variant: "default" }))}
                    >
                        Instagram
                    </Link><Link
                    href="/game"
                    className={cn(buttonVariants({ variant: "default" }))}
                >
                    Tik Tok
                </Link>
                </motion.div>
            )}
        </div>
    );
}