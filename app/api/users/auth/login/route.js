import dbConnect from '../../../../../lib/dbConnect';
import { User } from '@/models/User.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        message: 'All fields are required!',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ status: 404 }, { message: 'User not found!' });
    }

    //compairing the password
    if (user.password !== password) {
      return NextResponse.json(
        { status: 401 },
        { message: 'Invalid password!' }
      );
    }
    return NextResponse.json({
      status: 200,
      message: 'Login Sucessful!',
      user,
    });
  } catch (err) {
    return NextResponse.json({ status: 500 }, { message: err.message });
  }
}
