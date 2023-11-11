import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/database';
import { isInstructor } from '@/lib/instructor';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    const isUserInstructor = isInstructor(userId);

    if (!userId || !isUserInstructor) {
      return new NextResponse('Unauthorized Access', { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
