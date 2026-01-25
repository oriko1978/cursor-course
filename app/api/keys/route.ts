import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/db";

// GET /api/keys - List all API keys
export async function GET() {
  try {
    const keys = database.getAll();
    return NextResponse.json({ keys }, { status: 200 });
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return NextResponse.json(
      { error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

// POST /api/keys - Create a new API key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, monthlyLimit } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    if (!type || (type !== "dev" && type !== "production")) {
      return NextResponse.json(
        { error: "Type must be either 'dev' or 'production'" },
        { status: 400 }
      );
    }

    const apiKey = database.create({
      name,
      type,
      monthlyLimit: monthlyLimit ? parseInt(monthlyLimit) : undefined,
    });
    return NextResponse.json({ key: apiKey }, { status: 201 });
  } catch (error) {
    console.error("Error creating API key:", error);
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }
}
