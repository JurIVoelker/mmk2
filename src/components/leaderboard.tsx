"use client";
import { Ranking } from "@prisma/client";
import RankingComponent from "./ranking";
import { useEffect, useState } from "react";
import { getRequest } from "@/lib/requestUtils";
import { Skeleton } from "./ui/skeleton";

interface LeaderboardProps {
  rankings: Ranking[]; // Replace 'any' with the actual type of your ranking data
  userScore: number; // Optional user score prop
}

const Leaderboard: React.FC<LeaderboardProps> = ({ rankings, userScore }) => {
  const [userPosition, setUserPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserPosition = async () => {
      const { data, error } = (await getRequest(
        `/api/ranking/position?score=${userScore}`
      )) as { data?: { position: number }; error?: Error };
      if (error) {
      } else {
        setUserPosition(data?.position as number);
      }
    };
    fetchUserPosition();
  }, [userScore]);

  if (!userPosition) {
    return <Skeleton className="w-full h-[56rem]" />;
  }

  const userRanking = {
    name: "Du",
    id: "user",
    score: userScore,
    createdAt: new Date(),
  };

  const rankingsWithUser =
    userScore < rankings[rankings.length - 1].score
      ? [...rankings, userRanking]
      : rankings.reduce(
          (acc: Ranking[], ranking) =>
            userScore >= ranking.score
              ? [...acc, userRanking, ranking]
              : [...acc, ranking],
          []
        );

  return (
    <div className="space-y-2">
      {rankingsWithUser.map((ranking, i) => {
        const position = ranking.id === "user" ? userPosition : i + 1;
        return (
          <>
            {position > rankings.length && (
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
    </div>
  );
};

export default Leaderboard;
