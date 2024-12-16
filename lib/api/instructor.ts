import { sql } from '@vercel/postgres';
import { unstable_cache } from 'next/cache';
import { Course, Enrollment } from '../db/schema';

export async function getInstructorStats(instructorId: string) {
  const stats = await unstable_cache(
    async () => {
      const result = await sql`
        WITH revenue AS (
          SELECT 
            SUM(c.price) as monthly_revenue
          FROM courses c
          JOIN enrollments e ON c.id = e.course_id
          WHERE c.instructor_id = ${instructorId}
          AND e.created_at >= NOW() - INTERVAL '30 days'
          AND e.status = 'active'
        ),
        ratings AS (
          SELECT AVG(rating) as avg_rating
          FROM course_reviews cr
          JOIN courses c ON cr.course_id = c.id
          WHERE c.instructor_id = ${instructorId}
        )
        SELECT 
          COUNT(DISTINCT e.user_id) as total_students,
          COUNT(DISTINCT c.id) as total_courses,
          COALESCE(r.monthly_revenue, 0) as monthly_revenue,
          COALESCE(rt.avg_rating, 0) as average_rating
        FROM courses c
        LEFT JOIN enrollments e ON c.id = e.course_id
        CROSS JOIN revenue r
        CROSS JOIN ratings rt
        WHERE c.instructor_id = ${instructorId}
        GROUP BY r.monthly_revenue, rt.avg_rating;
      `;
      
      return result.rows[0];
    },
    ['instructor-stats', instructorId],
    { revalidate: 3600 } // Cache for 1 hour
  )();

  return stats;
}

export async function getInstructorCourses(instructorId: string) {
  const courses = await unstable_cache(
    async () => {
      const result = await sql`
        SELECT 
          c.*,
          COUNT(DISTINCT e.user_id) as student_count,
          COALESCE(AVG(cr.rating), 0) as average_rating,
          SUM(CASE WHEN e.status = 'active' THEN c.price ELSE 0 END) as total_revenue
        FROM courses c
        LEFT JOIN enrollments e ON c.id = e.course_id
        LEFT JOIN course_reviews cr ON c.id = cr.course_id
        WHERE c.instructor_id = ${instructorId}
        GROUP BY c.id
        ORDER BY c.created_at DESC;
      `;
      
      return result.rows;
    },
    ['instructor-courses', instructorId],
    { revalidate: 3600 }
  )();

  return courses;
}

export async function getRevenueData(instructorId: string) {
  const revenue = await unstable_cache(
    async () => {
      const result = await sql`
        SELECT 
          DATE_TRUNC('month', e.created_at) as month,
          SUM(c.price) as revenue
        FROM courses c
        JOIN enrollments e ON c.id = e.course_id
        WHERE c.instructor_id = ${instructorId}
        AND e.created_at >= NOW() - INTERVAL '6 months'
        AND e.status = 'active'
        GROUP BY DATE_TRUNC('month', e.created_at)
        ORDER BY month DESC;
      `;
      
      return result.rows;
    },
    ['instructor-revenue', instructorId],
    { revalidate: 3600 }
  )();

  return revenue;
}

export async function getStudentEngagement(instructorId: string) {
  const engagement = await unstable_cache(
    async () => {
      const result = await sql`
        SELECT 
          c.id as course_id,
          c.title as course_name,
          COUNT(DISTINCT e.user_id) as total_students,
          COUNT(DISTINCT CASE WHEN e.last_accessed_at >= NOW() - INTERVAL '7 days' 
            THEN e.user_id END) as active_students,
          AVG(e.progress) as completion_rate
        FROM courses c
        LEFT JOIN enrollments e ON c.id = e.course_id
        WHERE c.instructor_id = ${instructorId}
        GROUP BY c.id, c.title
        ORDER BY total_students DESC;
      `;
      
      return result.rows;
    },
    ['instructor-engagement', instructorId],
    { revalidate: 3600 }
  )();

  return engagement;
}