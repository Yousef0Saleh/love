import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);

    const surprise = await prisma.surprise.findUnique({
      where: { id },
    });

    if (!surprise) {
      return NextResponse.json(
        { error: 'Surprise not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(surprise);
  } catch (error) {
    console.error('Get surprise error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
