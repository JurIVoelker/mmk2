"use client";

import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import InfoContent from "./info-content";
import { useGameStore } from "@/stores/game-store";

export default function InfoButton() {
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(false);
  const { pause } = useGameStore();

  return (
    <>
      <Button
        aria-label="Info"
        variant="ghost"
        size="icon"
        onClick={() => {
          setIsInfoOverlayOpen(true);
          pause(true);
        }}
      >
        <InfoIcon className="size-8 text-brown-dark" />
      </Button>
      {isInfoOverlayOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen z-30 bg-white">
          <div className="max-w-md p-8 min-h-screen h-full overflow-hidden">
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
