import dbConnect from '../../../../../lib/dbConnect';
import { User } from '@/models/User.js';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: 'All fields are required!' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 });
    }

    //compairing the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid password!' },
        { status: 401 }
      );
    }

    //creating a token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1m' } // token valid for 7 days
    );

    const response = NextResponse.json(
      {
        message: 'Login successful!',
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60, // 7 days in seconds
      path: '/', // cookie available on all routes
    });

    return response;
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
