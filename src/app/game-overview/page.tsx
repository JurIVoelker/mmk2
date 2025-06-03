"use client";

import CustomLayout from "@/components/custom-layout";
import GameOverviewCard from "@/components/game-overview-card";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { News, useGameStore } from "@/stores/game-store";
import { TabsContent } from "@radix-ui/react-tabs";
import Link from "next/link";
import { useState } from "react";

const GameOverviewPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { classifiedAsFakeNews, classifiedAsRealNews } = useGameStore();

  const amountOfCorrectIdentifications =
    classifiedAsFakeNews.filter((item) => item.data.isFake).length +
    classifiedAsRealNews.filter((item) => !item.data.isFake).length;

  const renderNewsList = (items: News[], classifiedAsFake: boolean) => {
    return <div className="space-y-4">
        {items.map((item) => (
          <GameOverviewCard
            key={item.data.id}
            news={item}
            isCorrect={
              (classifiedAsFake && item.data.isFake) ||
              (!classifiedAsFake && !item.data.isFake)
            }
          />
        ))}
    </div>
  };
  return (
    <>
      <CustomLayout>
        <h1 className="text-2xl font-bold mb-2 text-center md:text-left">
          Spielübersicht
        </h1>
        <p className="text-muted-foreground mb-10 text-center md:text-left">
          Du hast {amountOfCorrectIdentifications} Nachrichten richtig
          identifiziert.
        </p>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="all">
              News ({classifiedAsFakeNews.length + classifiedAsRealNews.length})
            </TabsTrigger>
          </TabsList>
          <div className="max-h-[400px] overflow-y-scroll">
            <TabsContent value="all" className="mt-4">
              {renderNewsList(classifiedAsFakeNews,true)}
              {renderNewsList(classifiedAsRealNews, false)}
            </TabsContent>
          </div>
        </Tabs>
        <Link
          href="/leaderboard"
          className={cn(
            buttonVariants({ variant: "default" }),
            "mt-6 w-full mb-8"
          )}
        >
          Weiter zum Leaderboard
        </Link>
      </CustomLayout>
    </>
  );
};

export default GameOverviewPage;
