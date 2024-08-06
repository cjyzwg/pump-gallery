// app/api/images/route.ts
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayDate() {
  const today = new Date();
  return getFormattedDate(today);
}
export async function GET() {
  console.log('Received GET request at /api/images'); // 确认请求到达
  try {
    console.log('Fetching images from database...'); // 打印调试信息
    
    const day = getTodayDate();
    const sql = `select id,name,logo  as url,address,concat(round((max_price-call_price)/call_price*100,2),'%') as profits from token_infos where logo !="" and call_count>=1 and DATE(bought_time) = '`+day+`'  order by id desc limit 200`
    console.log(sql)
    const [rows] = await pool.query(sql);
    return NextResponse.json(rows);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
