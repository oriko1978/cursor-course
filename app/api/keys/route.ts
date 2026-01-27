import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
const { database } = require("@/lib/db-wrapper");

// Helper function to get user ID from session
async function getUserIdFromSession() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await database.users.getByEmail(session.user.email);
  return user?.id || null;
}

// GET /api/keys - List all API keys for authenticated user
export async function GET() {
  try {
    // Check authentication and get user ID
    const userId = await getUserIdFromSession();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get only this user's API keys
    const keys = await database.getByUserId(userId);
    return NextResponse.json({ keys }, { status: 200 });
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return NextResponse.json(
      { error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

// POST /api/keys - Create a new API key for authenticated user
export async function POST(request: NextRequest) {
  try {
    // Check authentication and get user ID
    const userId = await getUserIdFromSession();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    // Create API key with user ID
    const apiKey = await database.create({
      name,
      type,
      monthlyLimit: monthlyLimit ? parseInt(monthlyLimit) : undefined,
      userId, // Associate with the authenticated user
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
