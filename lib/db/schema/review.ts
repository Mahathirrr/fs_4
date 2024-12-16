import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Review = z.infer<typeof reviewSchema>;