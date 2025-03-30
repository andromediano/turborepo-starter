import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // 역할 추가
      //role?: string; // 역할 추가
    } & DefaultSession["user"];
  }
}

/*
declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
*/
