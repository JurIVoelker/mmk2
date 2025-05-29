import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

const NEWS_COUNT = 30;

function getRandomItems<T>(arr: T[]): T[] {
  if (NEWS_COUNT >= arr.length) return arr;
  const result = [];
  const used = new Set<number>();
  while (result.length < NEWS_COUNT) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const newsType = searchParams.get("newsType") || "text";

  if (newsType === "text") {
    const textNewsRaw = await prisma.textNews.findMany();
    const textNews = getRandomItems(textNewsRaw).map((news) => ({
      type: "text",
      data: news,
    }));
    return NextResponse.json(textNews);
  } else if (newsType === "video") {
    const videoNewsRaw = await prisma.videoNews.findMany();
    const videoNews = getRandomItems(videoNewsRaw).map((news) => ({
      type: "video",
      data: news,
    }));
    return NextResponse.json(videoNews);
  } else if (newsType === "image") {
    const imageNewsRaw = await prisma.imageNews.findMany();
    const imageNews = getRandomItems(imageNewsRaw).map((news) => ({
      type: "image",
      data: news,
    }));
    return NextResponse.json(imageNews);
  } else {
    return NextResponse.json({ error: "Invalid news type" }, { status: 400 });
  }
}
