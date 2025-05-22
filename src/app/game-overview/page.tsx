"use client";

import CustomLayout from "@/components/custom-layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { News, useGameStore } from "@/stores/game-store";
import { TabsContent } from "@radix-ui/react-tabs";
import Link from "next/link";
import { useState } from "react";

const GameOverviewPage = () => {
  const [activeTab, setActiveTab] = useState("fake");
  const { classifiedAsFakeNews, classifiedAsRealNews } = useGameStore();
  const renderNewsList = (items: News[]) => {
    return items.length > 0 ? (
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.data.id} className="overflow-hidden">
            <CardContent className="p-4">
              {item.type === "text" && item.data.explaination}
              {item.type === "image" && item.data.explaination}
              {item.type === "video" && item.data.explaination}
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <p className="text-center text-muted-foreground py-8">No items yet</p>
    );
  };
  return (
    <>
      <CustomLayout>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fake">
              Fake News ({classifiedAsFakeNews.length})
            </TabsTrigger>
            <TabsTrigger value="real">
              Echte News ({classifiedAsRealNews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="fake" className="mt-4">
            {renderNewsList(classifiedAsFakeNews)}
          </TabsContent>
          <TabsContent value="real" className="mt-4">
            {renderNewsList(classifiedAsRealNews)}
          </TabsContent>
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
