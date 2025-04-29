import { parse } from "node-html-parser";
import { v6 as getUUID } from "uuid";

export const parseArticleOverview = (html: string) => {
  const rawArticles = parse(html).querySelectorAll(
    "#faktenchecks .elementor-shortcode a"
  );
  const articles = rawArticles.map((article) => {
    const link = article.getAttribute("href")?.trim() || "";
    const image =
      article
        .querySelector(".teaser__image-container img")
        ?.getAttribute("src")
        ?.trim() || "";
    const title =
      article.querySelector(".teaser__headline")?.innerText?.trim() || "";
    const category =
      article.querySelector(".teaser__topline")?.innerText?.trim() || "";
    const description =
      article.querySelector(".teaser__lead")?.innerText?.trim() || "";
    const date =
      article.querySelector(".teaser__date")?.innerText?.trim() || "";
    const id = getUUID();
    return {
      id,
      link,
      image,
      title,
      category,
      description: description.substring(0, description.length - 8),
      date,
    };
  });
  return articles;
};

export const parseArticle = (html: string) => {
  const articleDetails = parse(html).querySelectorAll(
    "#main .detail__wrapper > div"
  );
  const assertion =
    articleDetails[0]
      .querySelector(".detail__box-content")
      ?.innerText?.trim() || "";
  const rating =
    articleDetails[1]
      .querySelector(".detail__rating-text strong")
      ?.innerText?.trim() || "";
  const explanationText =
    articleDetails[1].innerText?.trim()?.split("\n") || [];
  const explanation = explanationText[explanationText.length - 1].trim() || "";
  return {
    assertion,
    rating,
    explanation,
  };
};
