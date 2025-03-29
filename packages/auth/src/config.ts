import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

export const authOptions: NextAuthConfig = {
  providers: [
    Github,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "이메일 주소를 입력하세요.",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "패스워드를 입력하세요.",
        },
      },
      authorize: async (credentials) => {
        const user = null;
        // logger.debug(`${credentials.email}`);
        return user;
      },
    }),
  ],
  /*
  session: {
    strategy: 'jwt',
  },
  */
  callbacks: {
    // https://authjs.dev/reference/nextjs#authorized
    authorized: async ({ auth }) => {
      //logger.debug(`callbacks > authorized`);
      return !!auth;
    },
  },
};
