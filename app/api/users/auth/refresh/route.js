import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const refreshToken = req.cookies.get('refreshToken')?.value;
  if (!refreshToken) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { sub: payload.sub },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '10m' }
    );

    const newRefreshToken = jwt.sign(
      { sub: payload.sub },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const res = NextResponse.json({ ok: true });

    res.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 10 * 60,
    });

    res.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch {
    return new NextResponse(null, { status: 403 });
  }
}
