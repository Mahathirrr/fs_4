import { sql } from '@vercel/postgres';
import { unstable_cache } from 'next/cache';
import { Course, Section, Lesson } from '../db/schema';

export async function createCourse(data: Partial<Course>) {
  const result = await sql`
    INSERT INTO courses ${sql(data)}
    RETURNING *
  `;
  return result.rows[0];
}

export async function getCourseById(courseId: string) {
  const course = await unstable_cache(
    async () => {
      const result = await sql`
        SELECT c.*, 
          json_agg(DISTINCT jsonb_build_object(
            'id', s.id,
            'title', s.title,
            'description', s.description,
            'position', s.position,
            'lessons', (
              SELECT json_agg(jsonb_build_object(
                'id', l.id,
                'title', l.title,
                'description', l.description,
                'videoUrl', l.video_url,
                'duration', l.duration,
                'position', l.position,
                'isPublished', l.is_published
              ) ORDER BY l.position)
              FROM lessons l
              WHERE l.section_id = s.id
            )
          ) ORDER BY s.position) as sections
        FROM courses c
        LEFT JOIN sections s ON s.course_id = c.id
        WHERE c.id = ${courseId}
        GROUP BY c.id
      `;
      
      return result.rows[0];
    },
    ['course', courseId],
    { revalidate: 3600 }
  )();

  return course;
}

export async function updateCourse(courseId: string, data: Partial<Course>) {
  const result = await sql`
    UPDATE courses
    SET ${sql(data)}, updated_at = NOW()
    WHERE id = ${courseId}
    RETURNING *
  `;
  return result.rows[0];
}

export async function publishCourse(courseId: string, instructorId: string) {
  const result = await sql`
    UPDATE courses
    SET status = 'published', updated_at = NOW()
    WHERE id = ${courseId} AND instructor_id = ${instructorId}
    RETURNING *
  `;
  return result.rows[0];
}