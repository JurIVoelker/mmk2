"use client";
import { Button } from "../ui/button";
import { ScrapedArticleWithDetails } from "./content";

interface ScrapeResultsProps {
  articles: ScrapedArticleWithDetails[];
}

const ScrapeResults: React.FC<ScrapeResultsProps> = ({ articles }) => {
  const jsonString = JSON.stringify(articles, null, 2);

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "articles.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button onClick={downloadJson} className="mb-6">
        Download JSON
      </Button>
      {articles.map((article) => (
        <div key={article.id} className="mb-4 p-4 border rounded-md space-y-4">
          <p>{article.assertion}</p>
          <p>Erklärung: {article.explanation}</p>
        </div>
      ))}
    </>
  );
};

export default ScrapeResults;
