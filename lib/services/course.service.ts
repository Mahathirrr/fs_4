import { sql } from '@vercel/postgres';
import { Course } from '@/lib/db/schema';
import { withTransaction } from '@/lib/db/utils/transaction';
import { paginate, PaginationParams } from '@/lib/db/utils/pagination';

export class CourseService {
  static async createCourse(data: Partial<Course>, instructorId: string) {
    return withTransaction(async (client) => {
      const course = await client.query(`
        INSERT INTO courses (
          id, title, description, category, level, price,
          instructor_id, requirements, outcomes, status,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        RETURNING *
      `, [
        data.id,
        data.title,
        data.description,
        data.category,
        data.level,
        data.price,
        instructorId,
        JSON.stringify(data.requirements),
        JSON.stringify(data.outcomes),
        'draft'
      ]);

      return course.rows[0];
    });
  }

  static async getCoursesByInstructor(instructorId: string, params: PaginationParams) {
    const query = `
      SELECT 
        c.*,
        COUNT(DISTINCT e.user_id) as student_count,
        COALESCE(AVG(r.rating), 0) as average_rating
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN reviews r ON c.id = r.course_id
      WHERE c.instructor_id = $1
      GROUP BY c.id
    `;

    return paginate(query, [instructorId], params);
  }

  static async getPublishedCourses(params: PaginationParams & {
    category?: string;
    level?: string;
    priceRange?: [number, number];
  }) {
    let query = `
      SELECT 
        c.*,
        u.name as instructor_name,
        u.image as instructor_avatar,
        COUNT(DISTINCT e.user_id) as student_count,
        COALESCE(AVG(r.rating), 0) as rating
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN reviews r ON c.id = r.course_id
      WHERE c.status = 'published'
    `;

    const queryParams: any[] = [];
    
    if (params.category) {
      queryParams.push(params.category);
      query += ` AND c.category = $${queryParams.length}`;
    }
    
    if (params.level) {
      queryParams.push(params.level);
      query += ` AND c.level = $${queryParams.length}`;
    }
    
    if (params.priceRange) {
      queryParams.push(params.priceRange[0], params.priceRange[1]);
      query += ` AND c.price BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
    }
    
    query += ' GROUP BY c.id, u.name, u.image';
    
    return paginate(query, queryParams, params);
  }
}