import CustomLayout from "@/components/custom-layout";
import EnvironmentVariableError from "@/components/scraper/environment-variable-error";
import { parseArticles } from "@/lib/scrapeUtils";
import { unstable_cache } from "next/cache";
import { scrapeArticlesDev } from "@/lib/devUtils";
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

const getHTML =
  process.env.NODE_ENV === "development"
    ? scrapeArticlesDev
    : unstable_cache(
        async (url: string) => {
          const res = await fetch(url, {
            method: "GET",
          });
          if (!res.ok) {
            throw new Error(`Error scraping: ${res.statusText}`);
          }
          const data = await res.text();
          return data;
        },
        [],
        {
          revalidate: 3600,
        }
      );

const Scraper = async () => {
  const url = process.env.NEXT_PUBLIC_SCRAPING_URL;
  if (!url) {
    return <EnvironmentVariableError />;
  }

  const data = await getHTML(url);
  const articles = parseArticles(data);
  return (
    <CustomLayout>
      <ScrapePageContent articles={articles} />
    </CustomLayout>
  );
};

export default Scraper;
