import { prisma } from "@/prisma/prisma";

const LeaderboardPage = async () => {
  const leaderBoard = await prisma.ranking.findMany();
  return <div>{JSON.stringify(leaderBoard)}</div>;
};

export default LeaderboardPage;
