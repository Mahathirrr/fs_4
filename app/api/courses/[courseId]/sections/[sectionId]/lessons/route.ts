import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { nanoid } from 'nanoid';
import { lessonSchema } from "@/lib/db/schema";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = lessonSchema.parse({
      ...body,
      id: nanoid(),
      sectionId: params.sectionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Verify course ownership
    const courseCheck = await sql`
      SELECT c.instructor_id 
      FROM courses c
      JOIN sections s ON s.course_id = c.id
      WHERE c.id = ${params.courseId} 
      AND s.id = ${params.sectionId}
      AND c.instructor_id = ${session.user.id}
    `;

    if (courseCheck.rowCount === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await sql`
      INSERT INTO lessons (
        id, section_id, title, description, video_url,
        duration, position, is_published, created_at, updated_at
      ) VALUES (
        ${validatedData.id},
        ${validatedData.sectionId},
        ${validatedData.title},
        ${validatedData.description},
        ${validatedData.videoUrl},
        ${validatedData.duration},
        ${validatedData.position},
        ${validatedData.isPublished},
        ${validatedData.createdAt},
        ${validatedData.updatedAt}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating lesson:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}