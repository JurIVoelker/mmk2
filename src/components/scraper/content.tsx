"use client";
import { Article } from "@/app/scraper/page";
import ScrapedArticlesTable from "../scraped-articles-table";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ScrapePageContentProps {
  articles: Article[];
}

const ScrapePageContent: React.FC<ScrapePageContentProps> = ({ articles }) => {
  type Step = "initial" | "scraping" | "done";
  const [step, setStep] = useState<Step>("initial");

  const onScrape = async (selectedArticles: Article[]) => {
    console.log("Selected articles:", selectedArticles);
    setStep("scraping");
  };

  return (
    <>
      {step === "initial" && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Artikelliste</h1>
            <p className="mb-8">
              Wähle die Artikel aus, die du scrapen möchtest und bestätige mit
              dem Button.
            </p>
          </div>
          <ScrapedArticlesTable items={articles} onConfirm={onScrape} />
        </>
      )}
      {step === "scraping" && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="animate-spin" />
            <p className="text-lg">Artikel werden gescraped</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrapePageContent;
