// app/api/images/route.ts

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to validate the date parameter
function isValidDate(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  return regex.test(dateStr) && !isNaN(Date.parse(dateStr));
}

export async function GET(request: Request) {
  console.log('Received GET request at /api/images'); // Confirm request arrival

  try {
    // Extract date from query parameters
    const url = new URL(request.url);
    const queryDate = url.searchParams.get('date') || '';

    // Use today's date if no date parameter is provided or if the provided date is invalid
    const day = isValidDate(queryDate) ? queryDate : getFormattedDate(new Date());

    console.log('Using date for query:', day); // Debugging date being used

    // Parameterized SQL query
    const sql = `
      SELECT id, name, logo AS url, address,
        CONCAT(ROUND((max_price - call_price) / call_price * 100, 2), '%') AS profits
      FROM token_infos
      WHERE logo != "" AND call_count >= 1 AND DATE(bought_time) = ?
      ORDER BY id DESC
      LIMIT 200
    `;
    // const debugSql = sql.replace('?', `'${day}'`);
    // console.log('Debug SQL:', debugSql);
    // Use parameterized query to prevent SQL injection
    const [rows] = await pool.query(sql, [day]);

    return NextResponse.json(rows);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error:', errorMessage); // Log error for debugging
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
