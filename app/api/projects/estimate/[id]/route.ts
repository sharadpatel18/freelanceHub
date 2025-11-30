import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Invalid project ID",
        data: null,
      });
    }

    const result = await db.select().from(projects).where(eq(projects.id, id));

    return NextResponse.json({
      message: "data deleted successfully",
      sucess: true,
      data: result,
    });
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Invalid project ID",
        data: null,
      });
    }

    const result = await db
      .update(projects)
      .set(body)
      .where(eq(projects.id, id));

    return NextResponse.json({
      message: "data updated successfully",
      sucess: true,
      data: result,
    });
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Invalid project ID",
        data: null,
      });
    }

    const result = await db.delete(projects).where(eq(projects.id, id));

    return NextResponse.json({
      message: "data fetched successfully",
      sucess: true,
      data: result,
    });
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
