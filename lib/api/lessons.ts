import { sql } from '@vercel/postgres';
import { Lesson } from '../db/schema';

export async function getLessonById(lessonId: string) {
  const result = await sql`
    SELECT 
      l.*,
      s.course_id,
      c.instructor_id
    FROM lessons l
    JOIN sections s ON l.section_id = s.id
    JOIN courses c ON s.course_id = c.id
    WHERE l.id = ${lessonId}
  `;
  return result.rows[0];
}

export async function updateLessonPosition(
  lessonId: string,
  newPosition: number
) {
  const result = await sql`
    UPDATE lessons
    SET position = ${newPosition}
    WHERE id = ${lessonId}
    RETURNING *
  `;
  return result.rows[0];
}

export async function toggleLessonPublished(
  lessonId: string,
  isPublished: boolean
) {
  const result = await sql`
    UPDATE lessons
    SET is_published = ${isPublished}
    WHERE id = ${lessonId}
    RETURNING *
  `;
  return result.rows[0];
}