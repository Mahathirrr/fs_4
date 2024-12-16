import { sql } from '@vercel/postgres';
import { Discussion, DiscussionReply } from '@/lib/db/schema/discussion';
import { withTransaction } from '@/lib/db/utils/transaction';
import { paginate, PaginationParams } from '@/lib/db/utils/pagination';

export class DiscussionService {
  static async createDiscussion(data: Partial<Discussion>) {
    return withTransaction(async (client) => {
      const discussion = await client.query(`
        INSERT INTO discussions (
          id, course_id, lesson_id, user_id, title,
          content, is_announcement, is_pinned,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING *
      `, [
        data.id,
        data.courseId,
        data.lessonId,
        data.userId,
        data.title,
        data.content,
        data.isAnnouncement,
        data.isPinned,
      ]);

      return discussion.rows[0];
    });
  }

  static async getDiscussions(courseId: string, params: PaginationParams & {
    lessonId?: string;
    searchQuery?: string;
  }) {
    let query = `
      SELECT 
        d.*,
        u.name as author_name,
        u.image as author_avatar,
        u.role as author_role,
        COUNT(dr.id) as reply_count,
        MAX(dr.created_at) as last_reply_at
      FROM discussions d
      JOIN users u ON d.user_id = u.id
      LEFT JOIN discussion_replies dr ON d.id = dr.discussion_id
      WHERE d.course_id = $1
    `;

    const queryParams: any[] = [courseId];

    if (params.lessonId) {
      queryParams.push(params.lessonId);
      query += ` AND d.lesson_id = $${queryParams.length}`;
    }

    if (params.searchQuery) {
      queryParams.push(`%${params.searchQuery}%`);
      query += ` AND (d.title ILIKE $${queryParams.length} OR d.content ILIKE $${queryParams.length})`;
    }

    query += ' GROUP BY d.id, u.name, u.image, u.role';

    return paginate(query, queryParams, params);
  }

  static async createReply(data: Partial<DiscussionReply>) {
    return withTransaction(async (client) => {
      const reply = await client.query(`
        INSERT INTO discussion_replies (
          id, discussion_id, user_id, content,
          is_instructor_reply, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *
      `, [
        data.id,
        data.discussionId,
        data.userId,
        data.content,
        data.isInstructorReply,
      ]);

      return reply.rows[0];
    });
  }

  static async getReplies(discussionId: string, params: PaginationParams) {
    const query = `
      SELECT 
        dr.*,
        u.name as author_name,
        u.image as author_avatar,
        u.role as author_role
      FROM discussion_replies dr
      JOIN users u ON dr.user_id = u.id
      WHERE dr.discussion_id = $1
    `;

    return paginate(query, [discussionId], params);
  }
}