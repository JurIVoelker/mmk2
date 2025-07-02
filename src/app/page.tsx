"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InfoButton from "@/components/info-button";
import CustomLayout from "@/components/custom-layout";

export default function StartPage() {
  return (
    <CustomLayout className="flex flex-col justify-between gap-4">
      <img src="/assets/Header/Header.png" alt="Tea-nder" className="top-0" />
      <div className="space-y-4 flex flex-col items-center justify-center">
        <video
          src="/assets/asisstant/Hello.mp4"
          className="object-contain rounded-lg grow size-100"
          autoPlay
          loop
          muted
        />
        <div className="flex flex-col items-center justify-center self-center">
          <Link
            href="/onboarding"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Starten
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-center gap-16 pt-4 items-end grow-0">
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
