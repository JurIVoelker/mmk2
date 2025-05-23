import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, score } = (await req.json()) as { score: number; name: string };
  await prisma.ranking.create({
    data: {
      name,
      score,
    },
  });

  revalidatePath("/leaderboard");
  revalidatePath("/leaderboard-overview");

  return new Response("Ok", {
    status: 200,
  });
}
