import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { db } from "@/db/client";
import { usersTable as users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
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
        const removedPassword = { ...user, password: undefined };
        return removedPassword;
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
          token.role = dbUser[0].role;
          token.name = dbUser[0].name;
        }
      }

      return token;
    },

    async session({ session, token }) {
      const existedUser = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email as string))
        .limit(1);
      if (existedUser.length) {
        session.user = {
          id: existedUser ? existedUser[0].id : (token.id as string),
          name: existedUser ? existedUser[0].name : (token.name as string),
          username: existedUser ? existedUser[0].username : null,
          email: existedUser ? existedUser[0].email : (token.email as string),
          role: existedUser ? existedUser[0].role : (token.role as string),
          image: existedUser ? existedUser[0].profileImage : null,
          bio: existedUser ? existedUser[0].bio : null,
          about: existedUser ? existedUser[0].about : null,
          location: existedUser ? existedUser[0].location : null,
          timezone: existedUser ? existedUser[0].timezone : null,
          skills: existedUser ? existedUser[0].skills : null,
          languages: existedUser ? existedUser[0].languages : null,
          hourlyRate: existedUser ? existedUser[0].hourlyRate : null,
          isVerified: existedUser ? existedUser[0].isVerified : null,
          isEmailVerified: existedUser ? existedUser[0].isEmailVerified : null,
          createdAt: existedUser ? existedUser[0].createdAt : null,
          updatedAt: existedUser ? existedUser[0].updatedAt : null,
        };
      }
      return session;
    },
  },
};
