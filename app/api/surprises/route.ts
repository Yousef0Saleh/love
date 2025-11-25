import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all surprises (Admin)
export async function GET() {
  try {
    const surprises = await prisma.surprise.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(surprises);
  } catch (error) {
    console.error('Get surprises error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new surprise (Admin)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { password, partnerName, startDate, flowerMessage, finalPoem, musicUrl, images } = data;

    if (!password || !partnerName || !startDate || !flowerMessage || !finalPoem) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const surprise = await prisma.surprise.create({
      data: {
        password,
        partnerName,
        startDate: new Date(startDate),
        flowerMessage,
        finalPoem,
        musicUrl: musicUrl || null,
        images: JSON.stringify(images || []),
      },
    });

    return NextResponse.json(surprise, { status: 201 });
  } catch (error: any) {
    console.error('Create surprise error:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Password already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE surprise (Admin)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.surprise.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete surprise error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
