import { sql } from '@vercel/postgres';
import { Enrollment } from '@/lib/db/schema';
import { withTransaction } from '@/lib/db/utils/transaction';

export class EnrollmentService {
  static async enrollStudent(courseId: string, userId: string) {
    return withTransaction(async (client) => {
      // Check if student is already enrolled
      const existing = await client.query(
        'SELECT * FROM enrollments WHERE course_id = $1 AND user_id = $2',
        [courseId, userId]
      );

      if (existing.rows.length > 0) {
        throw new Error('Student is already enrolled in this course');
      }

      // Create enrollment
      const enrollment = await client.query(`
        INSERT INTO enrollments (
          user_id, course_id, status, progress,
          completed_lessons, last_accessed_at,
          created_at, updated_at
        ) VALUES ($1, $2, 'active', 0, '[]', NOW(), NOW(), NOW())
        RETURNING *
      `, [userId, courseId]);

      return enrollment.rows[0];
    });
  }

  static async updateProgress(
    courseId: string,
    userId: string,
    lessonId: string,
    progress: number
  ) {
    return withTransaction(async (client) => {
      const enrollment = await client.query(`
        UPDATE enrollments
        SET 
          progress = (
            SELECT AVG(
              CASE 
                WHEN l.id = $3 THEN $4
                ELSE COALESCE(lp.progress, 0)
              END
            )
            FROM lessons l
            LEFT JOIN lesson_progress lp ON 
              lp.lesson_id = l.id AND 
              lp.user_id = $2
            WHERE l.section_id IN (
              SELECT id FROM sections WHERE course_id = $1
            )
          ),
          last_accessed_at = NOW(),
          updated_at = NOW()
        WHERE course_id = $1 AND user_id = $2
        RETURNING *
      `, [courseId, userId, lessonId, progress]);

      return enrollment.rows[0];
    });
  }
}