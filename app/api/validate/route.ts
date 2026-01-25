import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/db";

// POST /api/validate - Validate an API key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { valid: false, message: "API key is required" },
        { status: 400 }
      );
    }

    const result = database.validateKey(apiKey);

    if (!result.valid) {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(
      {
        valid: true,
        message: "API key is valid and active!",
        keyInfo: {
          name: result.keyInfo!.name,
          type: result.keyInfo!.type,
          monthlyLimit: result.keyInfo!.monthlyLimit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating API key:", error);
    return NextResponse.json(
      { valid: false, message: "Validation failed" },
      { status: 500 }
    );
  }
}
