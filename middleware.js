// middleware.js
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // ตรวจสอบเฉพาะหน้า /user/profile
  if (pathname === '/user/profile') {
    if (!token) {
      // ถ้าไม่มี token (ผู้ใช้ไม่ได้เข้าสู่ระบบ) รีไดเรกต์ไปหน้า login
      return NextResponse.redirect(new URL('/user/signIn', req.url))
    }
  }

  // อนุญาตให้ request ผ่านไปได้
  return NextResponse.next()
}

export const config = {
  matcher: ['/user/profile'],
};
