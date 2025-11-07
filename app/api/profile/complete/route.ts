// app/api/profile/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path to your auth config
import { db } from "@/db/client"; // Your Drizzle db instance
import { usersTable } from "@/db/schema/index"; // Your Drizzle schema
import { eq, and, ne } from "drizzle-orm";
import { profileSchema } from "@/validations/auth-validations";

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    // Validate required fields
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      username,
      bio,
      about,
      location,
      timezone,
      hourlyRate,
      profileImage,
      skills,
      languages,
      website,
      socialLinks,
      certificates,
    } = result.data;

    // Get current user to check their ID
    const currentUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email))
      .limit(1);

    if (!currentUser || currentUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const userId = currentUser[0].id;

    // Check if username already exists (excluding current user)
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.username, username), ne(usersTable.id, userId)))
      .limit(1);

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    // Update user profile
    const updatedUser = await db
      .update(usersTable)
      .set({
        username: username,
        bio: bio,
        about: about,
        location: location,
        timezone: timezone,
        hourlyRate: hourlyRate,
        profileImage: profileImage || null,
        skills: skills, // Assuming JSON or array field
        languages: languages, // Assuming JSON or array field
        isVerified: true,
        website: website || null,
        socialLinks: socialLinks || null,
        certificates: certificates || null,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, userId))
      .returning();

    if (!updatedUser || updatedUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile completed successfully",
        data: updatedUser[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to fetch user profile
// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const user = await db
//       .select({
//         id: users.id,
//         email: users.email,
//         username: users.username,
//         bio: users.bio,
//         about: users.about,
//         location: users.location,
//         timezone: users.timezone,
//         hourlyRate: users.hourlyRate,
//         profileImage: users.profileImage,
//         skills: users.skills,
//         languages: users.languages,
//         isVerified: users.isVerified,
//         createdAt: users.createdAt,
//       })
//       .from(users)
//       .where(eq(users.email, session.user.email))
//       .limit(1);

//     if (!user || user.length === 0) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         data: user[0],
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }
