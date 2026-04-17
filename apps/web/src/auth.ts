import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        if (!credentials?.email) return null;
        return {
          id: "demo-user",
          email: String(credentials.email),
          name: "Demo User"
        };
      }
    })
  ],
  pages: {
    signIn: "/login"
  }
});
