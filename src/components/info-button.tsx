"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import InfoContent from "./info-content";
import { useGameStore } from "@/stores/game-store";
import {cn} from "@/lib/utils";

export default function InfoButton({ disableHover = false }: { disableHover?: boolean }) {
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(false);
  const { pause } = useGameStore();

  return (
    <>
      <button
        onClick={() => {
          setIsInfoOverlayOpen(true);
          pause(true);
        }}
        className={cn(
            "cursor-pointer rounded-full p-2 transition-colors",
            !disableHover && "hover:bg-brown-light"
        )}
      >
        <InfoIcon className="size-8 text-brown-dark" />
      </button>
      {isInfoOverlayOpen && (
        <div className="absolute top-0 left-0 w-full z-30 bg-white h-full justify-items-center">
          <div className="max-w-md px-8 min-h-screen h-full overflow-unset">
            <InfoContent
              onClose={() => {
                setIsInfoOverlayOpen(false);
                pause(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
