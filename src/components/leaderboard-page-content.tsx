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
      <h1 className="text-2xl font-medium mb-4 text-center">
        Dein Score: {score && <NumberTicker value={score} className={"bg-brown-light text-brown-dark rounded-md p-1 text-3xl ml-2 font-extrabold"} />}
      </h1>
      <h4 className="mb-4 text-2xl text-center">Leaderboard</h4>
      <Leaderboard rankings={rankings} />
      <div className="space-y-2 mt-8">
          <form
              onSubmit={(e) => {
                  e.preventDefault();
                  if (isLoading || !userName) return;
                  handlePlayAgain();
              }}
          >
              <Input
                  className="mb-6 placeholder:text-lg h-full p-4"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Gib deinen Namen ein"
              />
          </form>
        <Button
          className="w-full cursor-pointer"
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
