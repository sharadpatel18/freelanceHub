// app/api/profile/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path to your auth config
import { db } from "@/db/client"; // Your Drizzle db instance
import { usersTable } from "@/db/schema/index"; // Your Drizzle schema
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
        bio: usersTable.bio,
        about: usersTable.about,
        location: usersTable.location,
        timezone: usersTable.timezone,
        hourlyRate: usersTable.hourlyRate,
        profileImage: usersTable.profileImage,
        skills: usersTable.skills,
        languages: usersTable.languages,
        isVerified: usersTable.isVerified,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email))
      .limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user[0].email !== session.user.email) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
