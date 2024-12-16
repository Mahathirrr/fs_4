import { z } from 'zod';

export const discussionSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  lessonId: z.string().optional(),
  userId: z.string(),
  title: z.string().min(5),
  content: z.string().min(10),
  isAnnouncement: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const discussionReplySchema = z.object({
  id: z.string(),
  discussionId: z.string(),
  userId: z.string(),
  content: z.string().min(1),
  isInstructorReply: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Discussion = z.infer<typeof discussionSchema>;
export type DiscussionReply = z.infer<typeof discussionReplySchema>;