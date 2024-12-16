import { sql } from '@vercel/postgres';
import { z } from 'zod';

// Course schema with validation
export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(10, "Judul minimal 10 karakter"),
  description: z.string().min(100, "Deskripsi minimal 100 karakter"),
  category: z.string(),
  level: z.enum(["Pemula", "Menengah", "Lanjutan"]),
  price: z.number().min(0),
  instructorId: z.string(),
  thumbnail: z.string().optional(),
  requirements: z.array(z.string()),
  outcomes: z.array(z.string()),
  status: z.enum(["draft", "published", "archived"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Section schema for course curriculum
export const sectionSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  position: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Lesson schema
export const lessonSchema = z.object({
  id: z.string(),
  sectionId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.number().optional(),
  position: z.number(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Course = z.infer<typeof courseSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type Lesson = z.infer<typeof lessonSchema>;