"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InfoButton from "@/components/info-button";
import CustomLayout from "@/components/custom-layout";
import { useGameStore } from "@/stores/game-store";

export default function StartPage() {
  const { isControlled, setIsControlled } = useGameStore();

  return (
    <CustomLayout className="flex flex-col">
      <div className="flex flex-col gap-4 items-center justify-center absolute top-0 bottom-0 h-fit self-center">
        <div className="flex items-center justify-center bg-gray-200 aspect-square w-[120px] rounded-lg">
          <p>Logo</p>
        </div>
        <Link
          href="/game"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Starten
        </Link>
        <Button onClick={() => setIsControlled(!isControlled)}>
          Spiel Kontrolliert? {isControlled ? "Ja" : "Nein"}
        </Button>
      </div>
      <div className="w-full flex justify-center gap-16 h-full items-end">
        <Link
          href="/leaderboard-overview"
          className="flex flex-col items-center gap-2"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center hover:bg-brown-light/60">
              <img
                src="/assets/icons/trophy.svg"
                alt="Leaderboard"
                className="size-8"
              />
            </div>
            <span className="text-sm">Leaderboard</span>
          </div>
        </Link>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center hover:bg-brown-light/60">
              <InfoButton disableHover={true} />
            </div>
            <span className="text-sm">Info</span>
          </div>
        </div>
        <Link href="/impressum" className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center hover:bg-brown-light/60">
              <img
                src="/assets/icons/impressum.svg"
                alt="Impressum"
                className="size-8"
              />
            </div>
            <span className="text-sm">Impressum</span>
          </div>
        </Link>
      </div>
    </CustomLayout>
  );
}
