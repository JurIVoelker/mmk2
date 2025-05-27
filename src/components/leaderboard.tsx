"use client";
import type { Ranking } from "@prisma/client";
import RankingComponent from "./ranking";
import React, { useEffect, useState } from "react";
import { getRequest } from "@/lib/requestUtils";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { useGameStore } from "@/stores/game-store";
import { highscoreFireworks } from "@/lib/utils";

interface LeaderboardProps {
  rankings: Ranking[]; // Replace 'any' with the actual type of your ranking data
  includesUser?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  rankings,
  includesUser = true,
}) => {
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const { score } = useGameStore();

  useEffect(() => {
    const fetchUserPosition = async () => {
      const { data, error } = (await getRequest(
        `/api/ranking/position?score=${score}`
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
        if (data?.position && data.position <= 3) {
          highscoreFireworks(
            data.position === 1
              ? "gold"
              : data.position === 2
              ? "silver"
              : "bronze"
          );
        }
      }
    };
    fetchUserPosition();
  }, [score]);

  if (userPosition === null) {
    return <Skeleton className="w-full h-[36.74rem]" />;
  }

  const userRanking = {
    name: "Du",
    id: "user",
    score: score,
    createdAt: new Date(),
  };

  const scoresWithUser = (
    includesUser ? [...rankings, userRanking] : [...rankings]
  ).sort((a, b) => {
    if (a.score === b.score) {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    return b.score - a.score;
  });

  const rankingPositions: (Ranking & { position: number })[] = [];

  for (let i = 0; i < scoresWithUser.length; i++) {
    const ranking = scoresWithUser[i];
    if (i === 0) {
      rankingPositions.push({ ...ranking, position: 1 });
      continue;
    }
    const prev = rankingPositions[i - 1];
    if (prev.score === ranking.score) {
      rankingPositions.push({ ...ranking, position: prev.position });
    } else {
      rankingPositions.push({ ...ranking, position: prev.position + 1 });
    }
  }

  return (
    <div className="space-y-2">
      {rankingPositions.map((ranking, i) => {
        const position =
          ranking.id === "user" ? userPosition : ranking.position;
        return (
          <React.Fragment key={ranking.id}>
            {position > rankings.length && position === userPosition && (
              <div
                className=" w-full h-13 bg-slate-100 rounded-md p-3 text-center"
                key={"divider-" + i}
              >
                ...
              </div>
            )}
            <RankingComponent ranking={ranking} position={position} />
          </React.Fragment>
        );
      })}
      {total && (
        <div className=" w-full rounded-md p-3 text-center text-muted-foreground">
          Insgesamt {total + 1} Spieler
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
