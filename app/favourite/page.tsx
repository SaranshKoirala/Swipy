'use client';

import { useUIStore } from '@/store/useUIStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Favourite() {
  const router = useRouter();
  const { user } = useUIStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return <div>This seciton isn't designed yet :(</div>;
}
