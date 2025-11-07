import { db } from "@/db/client";
import { projects, usersTable } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existedUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    if (existedUser.length <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not exists",
        },
        { status: 400 }
      );
    }

    const getAllProjects = await db
      .select({
        // Project fields
        id: projects.id,
        title: projects.title,
        description: projects.description,
        clientId: projects.clientId,
        category: projects.category,
        subCategory: projects.subCategory,
        budgetType: projects.budgetType,
        minBudget: projects.minBudget,
        maxBudget: projects.maxBudget,
        expectedDuration: projects.expectedDuration,
        skills: projects.skills,
        attachments: projects.attachments,
        locationPreference: projects.locationPreference,
        status: projects.status,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,

        user: {
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
          username: usersTable.username,
          role: usersTable.role,
          profileImage: usersTable.profileImage,
          bio: usersTable.bio,
          about: usersTable.about,
          location: usersTable.location,
          timezone: usersTable.timezone,
          skills: usersTable.skills,
          languages: usersTable.languages,
          hourlyRate: usersTable.hourlyRate,
          isVerified: usersTable.isVerified,
          isEmailVerified: usersTable.isEmailVerified,
          website: usersTable.website,
          socialLinks: usersTable.socialLinks,
          certificates: usersTable.certificates,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
        },
      })
      .from(projects)
      .leftJoin(usersTable, eq(projects.clientId, usersTable.id));

    return NextResponse.json(
      {
        success: true,
        message: "Projects fetched successfully",
        data: getAllProjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
