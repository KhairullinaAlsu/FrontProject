import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      course: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: number;
    name: string;
    email: string;
    course: string;
  }
}
