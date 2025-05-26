import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO Random choice of entries

  const textNews = (
    await prisma.textNews.findMany({
      orderBy: { id: "asc" },
      take: 2,
    })
  ).map((news) => ({
    type: "text",
    data: news,
  }));

  const videoNews = (
    await prisma.videoNews.findMany({
      orderBy: { id: "asc" },
      take: 2,
    })
  ).map((news) => ({
    type: "video",
    data: news,
  }));

  const imageNews = (
    await prisma.imageNews.findMany({
      orderBy: { id: "asc" },
      take: 2,
    })
  ).map((news) => ({
    type: "image",
    data: news,
  }));

  return NextResponse.json([...textNews, ...videoNews, ...imageNews]);
}
