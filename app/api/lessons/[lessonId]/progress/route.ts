import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function POST(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { progress } = await req.json();

    // Update or create progress record
    const result = await sql`
      INSERT INTO lesson_progress (
        user_id, lesson_id, progress, last_watched_at
      ) VALUES (
        ${session.user.id},
        ${params.lessonId},
        ${progress},
        NOW()
      )
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET
        progress = EXCLUDED.progress,
        last_watched_at = EXCLUDED.last_watched_at
      RETURNING *
    `;

    // Update course progress if lesson is completed
    if (progress >= 0.9) { // Consider 90% watched as completed
      await sql`
        WITH lesson_course AS (
          SELECT c.id as course_id
          FROM courses c
          JOIN sections s ON s.course_id = c.id
          JOIN lessons l ON l.section_id = s.id
          WHERE l.id = ${params.lessonId}
        ),
        course_stats AS (
          SELECT 
            COUNT(*) as total_lessons,
            COUNT(CASE WHEN lp.progress >= 0.9 THEN 1 END) as completed_lessons
          FROM lessons l
          JOIN sections s ON l.section_id = s.id
          JOIN lesson_course lc ON s.course_id = lc.course_id
          LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id 
            AND lp.user_id = ${session.user.id}
        )
        UPDATE course_progress cp
        SET 
          completed_lessons = cs.completed_lessons,
          total_lessons = cs.total_lessons,
          progress = CASE 
            WHEN cs.total_lessons > 0 
            THEN cs.completed_lessons::float / cs.total_lessons 
            ELSE 0 
          END,
          updated_at = NOW()
        FROM course_stats cs, lesson_course lc
        WHERE cp.course_id = lc.course_id
          AND cp.user_id = ${session.user.id}
      `;
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving progress:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}