import dbConnect from '../../../../../lib/dbConnect';
import { User } from '@/models/User.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { firstName, lastName, email, password, confirmPassword } =
      await request.json();
    if ((!firstName, !lastName, !email, !password, !confirmPassword)) {
      return NextResponse.json({
        status: 400,
        message: 'All fields are required',
      });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ status: 400, message: 'Invalid password!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ status: 409, message: 'User already exits!' });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    return NextResponse.json({
      status: 201,
      message: 'User created sucessfully',
    });
  } catch (err) {
    return NextResponse.json({ status: 500, message: err.message });
  }
}
