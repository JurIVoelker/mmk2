import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO Random entries
  const news = (
    await prisma.textNews.findMany({
      orderBy: { id: "asc" },
      take: 10,
    })
  ).map((news) => ({
    type: "text",
    data: news,
  }));

  return NextResponse.json(news);
}
