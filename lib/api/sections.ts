import { sql } from '@vercel/postgres';
import { Section } from '../db/schema';

export async function getSectionsByCourseId(courseId: string) {
  const result = await sql`
    SELECT 
      s.*,
      json_agg(
        json_build_object(
          'id', l.id,
          'title', l.title,
          'duration', l.duration,
          'isPublished', l.is_published,
          'position', l.position
        ) ORDER BY l.position
      ) as lessons
    FROM sections s
    LEFT JOIN lessons l ON l.section_id = s.id
    WHERE s.course_id = ${courseId}
    GROUP BY s.id
    ORDER BY s.position
  `;
  return result.rows;
}

export async function updateSectionPosition(
  sectionId: string,
  newPosition: number
) {
  const result = await sql`
    UPDATE sections
    SET position = ${newPosition}
    WHERE id = ${sectionId}
    RETURNING *
  `;
  return result.rows[0];
}

export async function deleteSection(sectionId: string) {
  await sql`
    DELETE FROM lessons WHERE section_id = ${sectionId}
  `;
  
  const result = await sql`
    DELETE FROM sections WHERE id = ${sectionId}
    RETURNING *
  `;
  return result.rows[0];
}