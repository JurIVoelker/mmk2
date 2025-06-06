import { prisma } from "@/prisma/prisma";

export const PUT = async (request: Request) => {
  const body = await request.json();
  const { id, data } = body;
  try {
    await prisma.newsProvider.update({
      where: { id },
      data,
    });
    return new Response("Provider updated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update provider", { status: 500 });
  }
};
