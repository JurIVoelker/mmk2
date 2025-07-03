"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import InfoContent from "./info-content";
import { useGameStore } from "@/stores/game-store";
import { cn } from "@/lib/utils";

export default function InfoButton({
  disableHover = false,
  className,
}: {
  disableHover?: boolean;
  className?: string;
}) {
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(false);
  const { pause } = useGameStore();

  return (
    <div className={`${className}`}>
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
        <div className="absolute top-0 right-0 w-full z-30 bg-white h-[100svh] flex justify-center">
          <div className="max-w-md px-8 min-h-[100svh] h-full overflow-unset bg-white">
            <InfoContent
              onClose={() => {
                setIsInfoOverlayOpen(false);
                pause(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
