import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
const { database } = require("@/lib/db-wrapper");

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Helper function to get user ID from session
async function getUserIdFromSession() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await database.users.getByEmail(session.user.email);
  return user?.id || null;
}

// Helper function to verify API key ownership
async function verifyKeyOwnership(keyId: string, userId: string): Promise<boolean> {
  const apiKey = await database.getById(keyId);
  return apiKey && apiKey.userId === userId;
}

// PATCH /api/keys/[id] - Update an API key (only if user owns it)
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Check authentication and get user ID
    const userId = await getUserIdFromSession();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    
    // Verify the API key belongs to this user
    const ownsKey = await verifyKeyOwnership(id, userId);
    
    if (!ownsKey) {
      return NextResponse.json(
        { error: "API key not found or access denied" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { isActive, name } = body;

    const updates: { isActive?: boolean; name?: string } = {};
    if (typeof isActive === "boolean") updates.isActive = isActive;
    if (typeof name === "string") updates.name = name;

    const updatedKey = await database.update(id, updates);

    if (!updatedKey) {
      return NextResponse.json({ error: "Failed to update API key" }, { status: 500 });
    }

    return NextResponse.json({ key: updatedKey }, { status: 200 });
  } catch (error) {
    console.error("Error updating API key:", error);
    return NextResponse.json(
      { error: "Failed to update API key" },
      { status: 500 }
    );
  }
}

// DELETE /api/keys/[id] - Delete an API key (only if user owns it)
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Check authentication and get user ID
    const userId = await getUserIdFromSession();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    
    // Verify the API key belongs to this user
    const ownsKey = await verifyKeyOwnership(id, userId);
    
    if (!ownsKey) {
      return NextResponse.json(
        { error: "API key not found or access denied" },
        { status: 404 }
      );
    }

    const deleted = await database.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete API key" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting API key:", error);
    return NextResponse.json(
      { error: "Failed to delete API key" },
      { status: 500 }
    );
  }
}

// GET /api/keys/[id] - Get a specific API key (only if user owns it)
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Check authentication and get user ID
    const userId = await getUserIdFromSession();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    
    // Verify the API key belongs to this user
    const ownsKey = await verifyKeyOwnership(id, userId);
    
    if (!ownsKey) {
      return NextResponse.json(
        { error: "API key not found or access denied" },
        { status: 404 }
      );
    }

    const apiKey = await database.getById(id);

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    return NextResponse.json({ key: apiKey }, { status: 200 });
  } catch (error) {
    console.error("Error fetching API key:", error);
    return NextResponse.json(
      { error: "Failed to fetch API key" },
      { status: 500 }
    );
  }
}
