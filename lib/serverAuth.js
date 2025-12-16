// lib/serverAuth.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from './dbConnect';
import { User } from '@/models/User';

export async function getServerUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    await dbConnect();

    const userDoc = await User.findById(decoded.sub)
      .select('_id name email')
      .lean();

    if (!userDoc) return null;

    // Map _id to string to make it safe for frontend
    return {
      _id: String(userDoc._id.toString()),
      name: String(userDoc.name),
      email: String(userDoc.email),
    };
  } catch (err) {
    console.error('getServerUser error:', err);
    return null;
  }
}
