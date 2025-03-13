import { NextRequest, NextResponse } from "next/server";
import { databases } from "../../../../lib/appwrite"; // ✅ Correct Path

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "";

// Ensure environment variables exist before use
if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("❌ Missing Appwrite database or collection ID in environment variables.");
}

// 🟢 GET: Fetch a single interpretation by ID
export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "⚠️ ID is required" }, { status: 400 });
    }

    const document = await databases.getDocument(DATABASE_ID, COLLECTION_ID, params.id);
    return NextResponse.json(document, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error fetching document:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch document" }, { status: 500 });
  }
}

// 🟢 PATCH: Update a single interpretation
export async function PATCH(req: NextRequest, { params }: { params: { id?: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "⚠️ ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { term, interpretations } = body;

    if (!term && !interpretations) {
      return NextResponse.json({ error: "⚠️ At least one field (term or interpretations) is required" }, { status: 400 });
    }

    const updatedDocument = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, params.id, {
      term,
      interpretations,
    });

    return NextResponse.json(updatedDocument, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error updating document:", error);
    return NextResponse.json({ error: error.message || "Failed to update document" }, { status: 500 });
  }
}

// 🟢 DELETE: Delete a single interpretation
export async function DELETE(req: NextRequest, { params }: { params: { id?: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "⚠️ ID is required" }, { status: 400 });
    }

    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, params.id);
    return NextResponse.json({ message: "✅ Deleted successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error deleting document:", error);
    return NextResponse.json({ error: error.message || "Failed to delete document" }, { status: 500 });
  }
}
