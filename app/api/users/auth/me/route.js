import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { status: 401, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ status: 200, user: decoded });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return NextResponse.json(
        { status: 401, message: 'Token expired' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { status: 401, message: 'Invalid token' },
      { status: 401 }
    );
  }
}
