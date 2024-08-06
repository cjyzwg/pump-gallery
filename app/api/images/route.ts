// app/api/images/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  console.log('Received GET request at /api/images'); // 确认请求到达
  try {
    console.log('Fetching images from database...'); // 打印调试信息
    const [rows] = await pool.query(`select id,name,logo  as url,address,concat(round((max_price-call_price)/call_price*100,2),'%') as profits from token_infos where logo !="" and call_count>=1 and DATE(bought_time) = CURDATE() order by id desc limit 200`);
    return NextResponse.json(rows);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
