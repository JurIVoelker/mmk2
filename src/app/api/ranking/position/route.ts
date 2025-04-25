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
  return new Response(JSON.stringify({ position }), {
    status: 200,
  });
}
