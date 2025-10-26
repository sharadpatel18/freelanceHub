import { NextResponse } from "next/server";
import { signupSchema } from "@/validations/auth-validations";
import bcrypt from "bcrypt";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema/user";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = signupSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid data",
        status: 400,
      });
    }
    const validData = result.data;
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validData.email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(validData.password, 10);
    const user = {
      ...validData,
      password: hashedPassword,
    };

    const createUser = await db.insert(usersTable).values(user).returning();

    return NextResponse.json(
      {
        message: "User created successfully",
        data: createUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
