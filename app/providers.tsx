'use client';

import { ClientProvider } from '@micro-stacks/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider
      appName="Nextjs + Microstacks"
      appIconUrl="/vercel.png"
    >
      {children}
    </ClientProvider>
  );
} 