import "dotenv/config";
import { readFileSync } from "node:fs";
import fs from "node:fs";
const { DEEPSEEK_API_KEY } = process.env;

async function deepseekRequest(prompt: string) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + DEEPSEEK_API_KEY, // Replace with your DeepSeek API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error during DeepSeek request:", error);
    throw error;
  }
}

const results = [];

(async () => {
  const articles = readFileSync("scripts/articles.json", "utf-8");
  const parsedArticles = JSON.parse(articles).slice(41);

  for (const article of parsedArticles) {
    try {
      const prompt = `
Gebe die Daten in folgendem Format aus: { title: string, content: string }
Dabei sollen keine Erklärungen oder Kommentare ausgegeben werden und auch keine Markdown-Formatierung verwendet werden.

Der Artikel ist eine Aufklärung über eine Falschnachricht. Schreibe den Artikel und den Titel so, als ob er die Falschnachricht verbreiten würde.
Der Artikel soll so aussehen, als ob er von einem Journalisten geschrieben wurde, der die Falschnachricht verbreitet.

Es gibt zwei Aufgaben: 

1. Schreibe den Titel um:
${article.title}


2. Schreibe einen Artikel mit maximal 400 Zeichen langen Text zu dem Thema. Hier ist die erklärende Version des Artikels:
${article.textContent}
`;
      let response = (await deepseekRequest(prompt)) as string;
      if (response.startsWith("```json")) {
        response = response.replace("```json", "").replace("```", "").trim();
      }
      console.log(response);
      const parsedResponse = JSON.parse(response);
      results.push({
        title: parsedResponse.title,
        content: parsedResponse.content,
        explanation: article.explanation,
        rating: "Falsch",
        link: article.link,
        image: article.image,
        category: article.category,
        date: article.date,
      });
      fs.writeFileSync(
        "scripts/results.json",
        JSON.stringify(results, null, 2),
        "utf-8"
      );
      console.log("Progress: ", results.length, "/", parsedArticles.length);
    } catch (error) {
      console.error(`Error processing article "${article.title}":`, error);
      continue;
    }
  }
})();
