import CustomLayout from "@/components/custom-layout";
import Leaderboard from "@/components/leaderboard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const LeaderboardOverview = async () => {
  const rankings = await prisma.ranking.findMany({
    orderBy: { score: "desc" },
    take: 50,
  });

  return (
    <CustomLayout>
      <div className="sticky top-0 left-4 bg-gradient-to-b from-white to-white/0 h-20 pt-4">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "")}
        >
          <ArrowLeft />
          Zurück
        </Link>
      </div>
      <Leaderboard rankings={rankings} includesUser={false} />
    </CustomLayout>
  );
};

export default LeaderboardOverview;
