import CustomLayout from "@/components/custom-layout";
import LeaderboardPageContent from "@/components/leaderboard-page-content";
import { prisma } from "@/prisma/prisma";

const LeaderboardPage = async () => {
  const rankings = await prisma.ranking.findMany({
    orderBy: { score: "desc" },
    take: 7,
  });
  return (
    <CustomLayout>
      <LeaderboardPageContent rankings={rankings} />
    </CustomLayout>
  );
};

export default LeaderboardPage;
