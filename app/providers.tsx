// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { useUIStore } from '@/store/useUIStore';

export function Providers({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: {
    _id: string;
    name: string;
    email: string;
  } | null;
}) {
  // React Query (unchanged, stable instance)
  const [queryClient] = useState(() => new QueryClient());

  // Zustand
  const setUser = useUIStore((state) => state.setUser);

  // Hydrate user ONCE from server
  useEffect(() => {
    if (initialUser) {
      setUser({
        id: initialUser._id,
        name: initialUser.name,
        email: initialUser.email,
      });
    }
  }, [initialUser, setUser]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
