import { db } from "@/db/client";
import { projects, usersTable } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Project id is required",
      });
    }
    const existedUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    if (existedUser.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not exists",
        },
        { status: 400 }
      );
    }

    const deleteProject = await db.delete(projects).where(eq(projects.id, id));

    return NextResponse.json(
      {
        success: true,
        message: "Project deleted successfully",
        data: deleteProject,
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = params;
    console.log("ID", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Project id is required",
        },
        { status: 400 }
      );
    }

    const existedUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    if (existedUser.length === 0) {
      return NextResponse.json(
        {
          sucess: false,
          message: "User is not exists",
        },
        { status: 400 }
      );
    }

    const project = await db
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
      .where(eq(projects.id, id))
      .leftJoin(usersTable, eq(projects.clientId, usersTable.id))
      .limit(1);

    return NextResponse.json(
      {
        success: true,
        message: "Project fetched successfully",
        data: project,
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
