import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { db } from "@/db/client";
import { usersTable as users } from "@/db/schema";
import { eq } from "drizzle-orm";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials ?? {};
        if (!email || !password)
          throw new Error("Email and password are required");

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));
        if (!existingUser.length) throw new Error("User not found");

        const user = existingUser[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) throw new Error("password is incorrect");

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existedUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email!));
        if (!existedUser.length) {
          await db.insert(users).values({
            name: user.name!,
            email: user.email!,
            password: "google_oauth",
          });
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account && user?.email) {
        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (dbUser.length) {
          token.id = dbUser[0].id;
          token.email = dbUser[0].email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = String(token.id);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
