import { sql } from '@vercel/postgres';

export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export async function paginate<T>(
  query: string,
  params: any[],
  { page = 1, limit = 10, orderBy = 'created_at', order = 'desc' }: PaginationParams
): Promise<{ data: T[]; total: number; pages: number }> {
  const offset = (page - 1) * limit;
  
  const countQuery = query.replace(/SELECT .* FROM/, 'SELECT COUNT(*) FROM').split('ORDER BY')[0];
  const countResult = await sql.query(countQuery, params);
  const total = parseInt(countResult.rows[0].count);
  
  const paginatedQuery = `${query} ORDER BY ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`;
  const result = await sql.query(paginatedQuery, params);
  
  return {
    data: result.rows,
    total,
    pages: Math.ceil(total / limit),
  };
}