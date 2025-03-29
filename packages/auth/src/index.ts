import NextAuth from "next-auth";
import { useSession, SessionProvider } from "next-auth/react";
import { authOptions } from "./config";
import { match } from "path-to-regexp";

export type { Session } from "next-auth";
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export { match, useSession, SessionProvider };
