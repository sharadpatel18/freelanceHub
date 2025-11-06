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
