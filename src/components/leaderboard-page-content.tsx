"use client";
import { Ranking } from "@prisma/client";
import Leaderboard from "./leaderboard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/requestUtils";

interface LeaderboardPageContentProps {
  rankings: Ranking[]; // Replace 'any' with the actual type of your ranking data
}

const LeaderboardPageContent: React.FC<LeaderboardPageContentProps> = ({
  rankings,
}) => {
  const [userName, setUserName] = useState<string>("");
  const { push } = useRouter();
  const score = 738; // get from store

  const handlePlayAgain = async () => {
    if (!userName) return;
    await postRequest("/api/ranking", {
      name: userName,
      score,
    });
    push("/");
  };

  return (
    <>
      <h1 className="text-2xl font-medium mb-8 text-center">Score: {score}</h1>
      <h2 className="text-2xl font-medium mb-2 text-center">
        Gebe deinen Namen ein
      </h2>
      <Input
        className="mb-6"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <h4 className="mb-4 text-xl font-semibold">Leaderboard</h4>
      <Leaderboard rankings={rankings} userScore={score} />
      <div className="space-y-2 mt-8">
        <Button className="w-full" onClick={handlePlayAgain}>
          Nochmal Spielen
        </Button>
        <Button className="w-full">Home</Button>
      </div>
    </>
  );
};

export default LeaderboardPageContent;
