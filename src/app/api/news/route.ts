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
    const textNewsRaw = await prisma.textNews.findMany({
      include: {
        provider: true,
      },
    });
    const textNews = getRandomItems(textNewsRaw).map((news) => ({
      type: "text",
      data: news,
    }));
    return NextResponse.json(textNews);
  } else if (newsType === "video") {
    const videoNewsRaw = await prisma.videoNews.findMany({
      include: {
        provider: true,
      },
    });
    const videoNews = getRandomItems(videoNewsRaw).map((news) => ({
      type: "video",
      data: news,
    }));
    return NextResponse.json(videoNews);
  } else if (newsType === "image") {
    const imageNewsRaw = await prisma.imageNews.findMany({
      include: {
        provider: true,
      },
    });
    const imageNews = getRandomItems(imageNewsRaw).map((news) => ({
      type: "image",
      data: news,
    }));
    return NextResponse.json(imageNews);
  } else {
    return NextResponse.json({ error: "Invalid news type" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, type, data } = body;
  try {
    if (type === "text") {
      const updatedNews = await prisma.textNews.update({
        where: { id },
        data,
      });
      return NextResponse.json({ type: "text", data: updatedNews });
    } else if (type === "video") {
      const updatedNews = await prisma.videoNews.update({
        where: { id },
        data,
      });
      return NextResponse.json({ type: "video", data: updatedNews });
    } else if (type === "image") {
      const updatedNews = await prisma.imageNews.update({
        where: { id },
        data,
      });
      return NextResponse.json({ type: "image", data: updatedNews });
    } else {
      return NextResponse.json({ error: "Invalid news type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, data } = body;

  try {
    if (type === "text") {
      const newNews = await prisma.textNews.create({ data });
      return NextResponse.json({ type: "text", data: newNews });
    } else if (type === "video") {
      const newNews = await prisma.videoNews.create({ data });
      return NextResponse.json({ type: "video", data: newNews });
    } else if (type === "image") {
      const newNews = await prisma.imageNews.create({ data });
      return NextResponse.json({ type: "image", data: newNews });
    } else {
      return NextResponse.json({ error: "Invalid news type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
