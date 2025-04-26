"use client";
import { Ranking } from "@prisma/client";
import RankingComponent from "./ranking";
import { useEffect, useState } from "react";
import { getRequest } from "@/lib/requestUtils";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

interface LeaderboardProps {
  rankings: Ranking[]; // Replace 'any' with the actual type of your ranking data
  userScore: number; // Optional user score prop
}

const Leaderboard: React.FC<LeaderboardProps> = ({ rankings, userScore }) => {
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserPosition = async () => {
      const { data, error } = (await getRequest(
        `/api/ranking/position?score=${userScore}`
      )) as {
        data?: { position: number; total: number };
        error?: { message: string }[];
      };
      if (error) {
        toast("Fehler beim Abrufen der Rangliste", {
          description: error[0]?.message ?? "Unbekannter Fehler",
        });
      } else {
        setUserPosition(data?.position as number);
        setTotal(data?.total as number);
      }
    };
    fetchUserPosition();
  }, [userScore]);

  if (userPosition === null) {
    return <Skeleton className="w-full h-[36.74rem]" />;
  }

  const userRanking = {
    name: "Du",
    id: "user",
    score: userScore,
    createdAt: new Date(),
  };

  const rankingsWithUser = [...rankings, userRanking].sort((a, b) => {
    if (a.score === b.score) {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    return b.score - a.score;
  });

  return (
    <div className="space-y-2">
      {rankingsWithUser.map((ranking, i) => {
        const position = ranking.id === "user" ? userPosition : i + 1;
        return (
          <>
            {position > rankings.length && position === userPosition && (
              <div
                className=" w-full h-13 bg-slate-100 rounded-md p-3 text-center"
                key={"divider-" + i}
              >
                ...
              </div>
            )}
            <RankingComponent
              key={ranking.id}
              ranking={ranking}
              position={position}
            />
          </>
        );
      })}
      {total && (
        <div className=" w-full rounded-md p-3 text-center text-muted-foreground">
          Insgesamt {total} Spieler
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
