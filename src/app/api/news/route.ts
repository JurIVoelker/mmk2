import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

const NEWS_COUNT = 2;

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

export async function GET() {
  const textNewsRaw = await prisma.textNews.findMany();
  const videoNewsRaw = await prisma.videoNews.findMany();
  const imageNewsRaw = await prisma.imageNews.findMany();

  const textNews = getRandomItems(textNewsRaw).map((news) => ({
    type: "text",
    data: news,
  }));

  const videoNews = getRandomItems(videoNewsRaw).map((news) => ({
    type: "video",
    data: news,
  }));

  const imageNews = getRandomItems(imageNewsRaw).map((news) => ({
    type: "image",
    data: news,
  }));

  return NextResponse.json([...textNews, ...videoNews, ...imageNews]);
}
