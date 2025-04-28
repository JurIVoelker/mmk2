import { prisma } from "@/prisma/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const score = parseInt(searchParams.get("score") || "0");
  const position = await prisma.ranking.count({
    where: {
      score: {
        gt: score,
      },
    },
  });
  const total = await prisma.ranking.count();
  return new Response(JSON.stringify({ position: position + 1, total }), {
    status: 200,
  });
}
