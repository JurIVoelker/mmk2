import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO Random entries
  const textNews = (
    await prisma.textNews.findMany({
      orderBy: { id: "asc" },
      take: 10,
    })
  ).map((news) => ({
    type: "text",
    data: news,
  }));

  const videoNews = (
    await prisma.videoNews.findMany({
      orderBy: { id: "asc" },
      take: 10,
    })
  ).map((news) => ({
    type: "video",
    data: news,
  }));

  return NextResponse.json([...textNews, ...videoNews]);
}
