import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PATCH /api/keys/[id] - Update an API key (e.g., toggle active status)
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { isActive, name } = body;

    const updates: { isActive?: boolean; name?: string } = {};
    if (typeof isActive === "boolean") updates.isActive = isActive;
    if (typeof name === "string") updates.name = name;

    const updatedKey = database.update(id, updates);

    if (!updatedKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
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

// DELETE /api/keys/[id] - Delete an API key
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const deleted = database.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
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
