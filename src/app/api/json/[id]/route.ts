import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const json = await prisma.jsonData.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
