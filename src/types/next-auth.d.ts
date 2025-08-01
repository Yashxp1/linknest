// src/types/next-auth.d.ts
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      slug: string;
      isOauth?: boolean;
    } & DefaultSession['user']; // ✅ use it here
  }
}
