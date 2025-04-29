import path from "path";
import fs from "fs";

export const scrapeArticlesDev = async (url: string) => {
  const filePath = path.resolve(process.cwd(), "articles.json");
  if (fs.existsSync(filePath)) {
    console.log(
      "Cached version of scraping exists, reading from file:",
      filePath
    );
    const fileData = fs.readFileSync(filePath, "utf-8");
    return fileData;
  } else {
    console.log("No cached version of scraping found, scraping now:", url);
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Error scraping: ${res.statusText}`);
    }
    const data = await res.text();
    fs.writeFileSync(filePath, data, "utf-8");
    return data;
  }
};
