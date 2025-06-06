import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, image } = body;

  try {
    const newProvider = await prisma.newsProvider.create({
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(newProvider);
  } catch (error) {
    console.error("Error creating news provider:", error);
    return NextResponse.json(
      { error: "Failed to create news provider" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, name, image } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing provider id" }, { status: 400 });
  }

  try {
    const updatedProvider = await prisma.newsProvider.update({
      where: { id },
      data: { name, image },
    });
    return NextResponse.json(updatedProvider);
  } catch (error) {
    console.error("Error updating news provider:", error);
    return NextResponse.json(
      { error: "Failed to update news provider" },
      { status: 500 }
    );
  }
}
