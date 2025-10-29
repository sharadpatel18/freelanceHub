import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string | null;
      email: string;
      role: string;
      image?: string | null;
      bio?: string | null;
      about?: string | null;
      location?: string | null;
      timezone?: string | null;
      skills?: string[] | null;
      languages?: string[] | null;
      hourlyRate?: number | null;
      isVerified?: boolean | null;
      isEmailVerified?: boolean | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    };
  }
}
