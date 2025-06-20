import CustomLayout from "@/components/custom-layout";
import Leaderboard from "@/components/leaderboard";
import {prisma} from "@/prisma/prisma";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const LeaderboardOverview = async () => {
    const rankings = await prisma.ranking.findMany({
        orderBy: {score: "desc"},
        take: 50,
    });

    return (
        <CustomLayout>
            <div className="sticky top-0 left-4 bg-gradient-to-b from-white to-white/0 h-20 pt-4">
                <Link
                    href="/"
                    className={"transition-transform cursor-pointer hover:-translate-x-1 bg-white  rounded-full p-2 mx-2 flex column gap-2"}
                >
                    <img
                        src="/assets/icons/arrow-left.svg"
                        alt="Zurück"
                        className="w-6 h-6"
                    />
                    Zurück
                </Link>
            </div>
            <h4 className="mb-4 text-2xl text-center">Leaderboard</h4>
            <Leaderboard rankings={rankings} includesUser={false}/>
        </CustomLayout>
    );
};

export default LeaderboardOverview;
