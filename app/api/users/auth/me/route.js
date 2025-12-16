import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';

export async function GET(request) {
  // console.log('ALL COOKIES', request.cookies.getAll());
  try {
    await dbConnect();

    // read the SAME cookie you set during login
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // verify with the SAME secret used to sign access token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // fetch real user from DB
    const user = await User.findById(decoded.sub).select('_id name email');

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
