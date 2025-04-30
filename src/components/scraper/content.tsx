"use client";
import { Article as ScrapedArticle } from "@/app/scraper/page";
import ScrapedArticlesTable from "./scraped-articles-table";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getRequest } from "@/lib/requestUtils";
import ScrapeResults from "./results";

interface ScrapePageContentProps {
  articles: ScrapedArticle[];
}

type ScrapedArticleDetails = {
  assertion: string;
  rating: string;
  explanation: string;
};

export type ScrapedArticleWithDetails = ScrapedArticle & ScrapedArticleDetails;

const ScrapePageContent: React.FC<ScrapePageContentProps> = ({ articles }) => {
  type Step = "initial" | "scraping" | "done";
  const [step, setStep] = useState<Step>("initial");
  const [progress, setProgress] = useState(0);
  const [scrapedData, setScrapedData] = useState<ScrapedArticleWithDetails[]>(
    []
  );

  const onScrape = async (selectedArticles: ScrapedArticle[]) => {
    setStep("scraping");
    const data: ScrapedArticleWithDetails[] = [];
    for (const article of selectedArticles) {
      const res = (await getRequest(
        `/api/scrape?url=${encodeURIComponent(article.link)}`
      )) as { data: ScrapedArticleDetails };
      const obj = { ...res.data, ...article } as ScrapedArticleWithDetails;
      data.push(obj);
      setProgress(Math.floor((data.length / selectedArticles.length) * 100));
    }
    setScrapedData(data);
    setStep("done");
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
            <p className="text-lg">Artikel werden gescraped ({progress} %)</p>
          </div>
        </div>
      )}
      {step === "done" && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Gescrapete Artikel</h1>
          <p className="mb-8">Hier sind die gescrapeten Artikel:</p>
          <ScrapeResults articles={scrapedData} />
        </div>
      )}
    </>
  );
};

export default ScrapePageContent;
