import { sql } from '@vercel/postgres';

interface VideoMetadata {
  duration: number;
  quality: string;
  format: string;
}

export async function saveVideoMetadata(
  lessonId: string,
  videoUrl: string,
  metadata: VideoMetadata
) {
  const result = await sql`
    UPDATE lessons
    SET 
      video_url = ${videoUrl},
      duration = ${metadata.duration},
      video_metadata = ${JSON.stringify(metadata)}
    WHERE id = ${lessonId}
    RETURNING *
  `;
  return result.rows[0];
}

export async function getVideoMetadata(lessonId: string) {
  const result = await sql`
    SELECT video_url, duration, video_metadata
    FROM lessons
    WHERE id = ${lessonId}
  `;
  return result.rows[0];
}