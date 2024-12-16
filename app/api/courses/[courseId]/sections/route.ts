import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { nanoid } from 'nanoid';
import { sectionSchema } from "@/lib/db/schema";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = sectionSchema.parse({
      ...body,
      id: nanoid(),
      courseId: params.courseId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Verify course ownership
    const courseCheck = await sql`
      SELECT instructor_id FROM courses 
      WHERE id = ${params.courseId} AND instructor_id = ${session.user.id}
    `;

    if (courseCheck.rowCount === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await sql`
      INSERT INTO sections (
        id, course_id, title, description, position,
        created_at, updated_at
      ) VALUES (
        ${validatedData.id},
        ${validatedData.courseId},
        ${validatedData.title},
        ${validatedData.description},
        ${validatedData.position},
        ${validatedData.createdAt},
        ${validatedData.updatedAt}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating section:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}