import { z } from 'zod';

export const enrollmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  status: z.enum(["active", "completed", "refunded"]),
  progress: z.number().min(0).max(1),
  completedLessons: z.array(z.string()),
  lastAccessedAt: z.date(),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Enrollment = z.infer<typeof enrollmentSchema>;