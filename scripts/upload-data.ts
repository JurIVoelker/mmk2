import { readFileSync } from "fs";

(async () => {
  const results = readFileSync("scripts/processed-results.json", "utf-8");
  const parsedResults = JSON.parse(results).slice(2);

  for (const result of parsedResults) {
    const dateParts = result.date.split(".");
    const date = new Date(
      parseInt(dateParts[2], 10) + 2000, // Convert year to full year
      parseInt(dateParts[1], 10) - 1, // Month is zero-based
      parseInt(dateParts[0], 10) // Day
    );

    const body = JSON.stringify({
      type: "text",
      data: {
        date: date.toISOString(),
        title: result.title,
        content: result.content,
        category: result.category,
        image: result.image,
        source: result.link,
        explaination: result.explanation,
        isFake: true,
      },
    });

    const response = await fetch("https://mmk2.jurivoelker.de/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      console.error("Failed to upload data:", response.statusText);
    } else {
      console.log("Data uploaded successfully");
    }
  }
})();
