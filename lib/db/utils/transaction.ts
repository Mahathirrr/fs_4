import { sql } from '@vercel/postgres';

export async function withTransaction<T>(
  callback: (client: typeof sql) => Promise<T>
): Promise<T> {
  const client = await sql.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}