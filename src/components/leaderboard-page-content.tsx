"use client";
import type { Ranking } from "@prisma/client";
import Leaderboard from "./leaderboard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/requestUtils";
import { toast } from "sonner";
import { useGameStore } from "@/stores/game-store";
import { NumberTicker } from "./magicui/number-ticker";

interface LeaderboardPageContentProps {
  rankings: Ranking[]; // Replace 'any' with the actual type of your ranking data
}

const LeaderboardPageContent: React.FC<LeaderboardPageContentProps> = ({
  rankings,
}) => {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const { score } = useGameStore();

  const handlePlayAgain = async () => {
    setLoading(true);
    if (userName) {
      const { error } = await postRequest("/api/ranking", {
        name: userName,
        score,
      });
      if (error) {
        toast("Fehler beim Speichern der Platzierung", {
          description: error[0]?.message ?? "Unbekannter Fehler",
        });
        setLoading(false);
        return;
      }
    }
    push("/");
  };

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-medium mb-8 text-center">
        Score: {score && <NumberTicker value={score} />}
      </h1>
      <h2 className="text-2xl font-medium mb-2 text-center">
        Gebe deinen Namen ein
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isLoading || !userName) return;
          handlePlayAgain();
        }}
      >
        <Input
          className="mb-6"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>

      <h4 className="mb-4 text-xl font-semibold">Leaderboard</h4>
      <Leaderboard rankings={rankings} />
      <div className="space-y-2 mt-8">
        <Button
          className="w-full"
          onClick={handlePlayAgain}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Nochmal Spielen
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardPageContent;
