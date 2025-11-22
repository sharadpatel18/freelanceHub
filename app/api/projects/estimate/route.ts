import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { estimateSchema } from "@/validations/estimate-validation";
import { db } from "@/db/client";
import { estimateTable } from "@/db/schema/estimate";
import { and, eq } from "drizzle-orm";
import { projects, usersTable } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          data: null,
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();
    const searchParams = new URL(request.url);
    const projectId = searchParams.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
          data: null,
        },
        {
          status: 400,
        }
      );
    }
    console.log(body);

    const parseData = await estimateSchema.safeParse(body);

    if (!parseData.success) {
      return NextResponse.json(
        {
          success: false,
          message: parseData.error,
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    const data = {
      projectId: projectId,
      freelancerId: session.user.id,
      ...parseData.data,
    };
    const saveEstimate = await db.insert(estimateTable).values(data);

    return NextResponse.json(
      {
        success: true,
        message: "Estimate created successfully",
        data: saveEstimate,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("error:", error);
    NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          data: null,
        },
        {
          status: 401,
        }
      );
    }

    const searchParams = new URL(request.url);
    const projectId = searchParams.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({
        success: false,
        message: "Invalid project ID",
        data: null,
      });
    }

    const result = await db
      .select({
        estimate: estimateTable,
        project: projects,
        user: usersTable,
      })
      .from(estimateTable)
      .leftJoin(projects, eq(projects.id, estimateTable.projectId))
      .leftJoin(usersTable, eq(usersTable.id, estimateTable.freelancerId))
      .where(
        and(
          eq(estimateTable.projectId, projectId),
          eq(estimateTable.freelancerId, session.user.id)
        )
      );

    const formatted = result.map((row) => ({
      ...row.estimate, // flatten estimate fields
      project: row.project,
      user: row.user,
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Estimate fetched successfully",
        data: formatted,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
