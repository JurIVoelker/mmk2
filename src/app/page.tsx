"use client";

import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function StartPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full max-h-[100vh] overflow-hidden">
            <div className="flex flex-col w-[350px] h-auto text-center gap-4 items-center justify-center">
                <div className="flex items-center justify-center bg-gray-200 aspect-square w-[120px] rounded-lg">
                    <p>Logo</p>
                </div>
                <Link
                    href="/game"
                    className={cn(buttonVariants({variant: "default"}))}
                >
                    Starten
                </Link>
            </div>
            <div className="absolute bottom-6 w-full flex justify-center gap-16">
                <Link
                    href="/leaderboard-overview"
                    className="flex flex-col items-center gap-2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center hover:bg-brown-light/60">
                            <img src="/assets/icons/trophy.svg" alt="Leaderboard" className="w-6 h-6"/>
                        </div>
                        <span className="text-sm">Leaderboard</span>
                    </div>
                </Link>
                <Link href="/info" className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center hover:bg-brown-light/60">
                            <img src="/assets/icons/info.svg" alt="Info" className="w-6 h-6"/>
                        </div>
                        <span className="text-sm">Info</span>
                    </div>
                </Link>
                {/*TODO: Impressum*/}
                <Link href="/" className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center hover:bg-brown-light/60">
                            <img src="/assets/icons/impressum.svg" alt="Impressum" className="w-6 h-6"/>
                        </div>
                        <span className="text-sm">Impressum</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
