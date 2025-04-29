import CustomLayout from "@/components/custom-layout";
import EnvironmentVariableError from "@/components/scraper/environment-variable-error";
import { parseArticleOverview } from "@/lib/scrapeUtils";
import { scrapeArticlesDev as getArticleOverviewHTML } from "@/lib/devUtils";
import ScrapePageContent from "@/components/scraper/content";

export type Article = {
  id: string;
  link: string;
  image: string;
  title: string;
  category: string;
  description: string;
  date: string;
};

const Scraper = async () => {
  if (process.env.NODE_ENV === "production") {
    return <div>Scraping is only available in development</div>;
  }

  const url = process.env.NEXT_PUBLIC_SCRAPING_URL;
  if (!url) {
    return <EnvironmentVariableError />;
  }

  const data = await getArticleOverviewHTML(url);
  const articles = parseArticleOverview(data);
  return (
    <CustomLayout>
      <ScrapePageContent articles={articles} />
    </CustomLayout>
  );
};

export default Scraper;
