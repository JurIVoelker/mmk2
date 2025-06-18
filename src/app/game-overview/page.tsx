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
import GameOverviewNewsCard from "@/components/game-overview-news-card";

const GameOverviewPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { classifiedAsFakeNews, classifiedAsRealNews } = useGameStore();
  const classifiedNews = [...classifiedAsRealNews, ...classifiedAsFakeNews ];
  const fakeNews = [...classifiedNews.filter((item) => item.data.isFake)]
  const realNews = [...classifiedNews.filter((item) => !item.data.isFake)]

  const amountOfCorrectIdentifications =
    classifiedAsFakeNews.filter((item) => item.data.isFake).length +
    classifiedAsRealNews.filter((item) => !item.data.isFake).length;

  const renderNewsList = (items: News[]) => {
    return <div className="space-y-4">
      {items.map((item) => (
          <GameOverviewNewsCard
          key={item.data.id}
          news={item}>
          </GameOverviewNewsCard>
      ))}
    </div>
  }

  const renderClassifiedNewsList = (items: News[], classifiedAsFake: boolean) => {
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
      <div className="h-screen flex flex-col">
        <CustomLayout className="flex flex-col flex-grow min-h-0">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center md:text-left">
              Spielübersicht
            </h1>
            <p className="text-muted-foreground mb-4 text-center md:text-left">
              Du hast {amountOfCorrectIdentifications} Nachrichten richtig identifiziert.
            </p>
          </div>

          {/* Tabs mit scrollbarem Content */}
          <div className="flex flex-col flex-grow min-h-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-grow min-h-0">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fake">Fake ({fakeNews.length})</TabsTrigger>
                <TabsTrigger value="all">Alle ({classifiedNews.length})</TabsTrigger>
                <TabsTrigger value="real">Real ({realNews.length})</TabsTrigger>
              </TabsList>

              {/* Nur dieser Bereich ist scrollbar */}
              <div className="flex-grow overflow-y-auto mt-4 min-h-0">
                <TabsContent value="all">
                  {renderClassifiedNewsList(classifiedAsFakeNews, true)}
                  <div className="pb-5"></div>
                  {renderClassifiedNewsList(classifiedAsRealNews, false)}
                </TabsContent>
                <TabsContent value="fake">{renderNewsList(fakeNews)}</TabsContent>
                <TabsContent value="real">{renderNewsList(realNews)}</TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Fester Button am unteren Rand */}
          <div className="mt-4">
            <Link
                href="/leaderboard"
                className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full mb-4"
                )}
            >
              Weiter zum Leaderboard
            </Link>
          </div>
        </CustomLayout>
      </div>

  );
};

export default GameOverviewPage;
