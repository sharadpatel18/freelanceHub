import { NextResponse } from "next/server";
import { signupSchema } from "@/validations/auth-validations";
import bcrypt from "bcrypt";
import { db } from "@/db/client";
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
    const hashedPassword = await bcrypt.hash(validData.password, 10);
    const user = {
      ...validData,
      password: hashedPassword,
    };

    const createUser = await db.insert(usersTable).values(user).returning();

    return NextResponse.json({
      message: "User created successfully",
      data: createUser,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
