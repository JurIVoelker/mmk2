import { parseArticle } from "@/lib/scrapeUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Scraping is only available in development", {
      status: 403,
    });
  }
  const { searchParams } = req.nextUrl;
  const url = searchParams.get("url");
  if (!url) {
    return new Response("No URL provided", { status: 400 });
  }

  const res = await fetch(url);
  if (!res.ok) {
    return new Response("Failed to fetch the URL", { status: 500 });
  }

  const html = await res.text();
  const data = parseArticle(html);

  return NextResponse.json(data, {
    status: 200,
  });
}
