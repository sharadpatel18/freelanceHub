import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { projectSchema } from "@/validations/project-validations";
import { db } from "@/db/client";
import { usersTable, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const existedUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, session.user.email));

  if (existedUser.length === 0) {
    return NextResponse.json(
      { success: false, message: "User is not exists" },
      { status: 400 }
    );
  }

  const body = request.json();
  const parseBody = await projectSchema.safeParse(body);

  if (!parseBody.success) {
    return NextResponse.json(
      { success: false, message: parseBody.error },
      { status: 400 }
    );
  }

  const projectData = {
    ...parseBody.data,
    clientId: existedUser[0].id,
  };
  const saveProject = await db.insert(projects).values(projectData);

  return NextResponse.json(
    { success: true, message: "Project created successfully", saveProject },
    { status: 201 }
  );
}
