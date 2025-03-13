import { NextRequest, NextResponse } from "next/server";
import { databases } from "../../../lib/appwrite"; // Adjust path if needed

// ✅ Ensure environment variables are properly defined
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("❌ Missing Appwrite database or collection ID. Check your .env file.");
}

// 🟢 GET: Fetch all interpretations
export async function GET() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return NextResponse.json(response.documents);
  } catch (error: any) {
    console.error("❌ Error fetching documents:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch documents" },
      { status: 500 }
    );
  }
}


// 🟢 POST: Create a new interpretation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔍 Received data:", body); // ✅ Log for debugging

    const term = body?.term?.trim();
    const interpretations = body?.interpretations?.trim();

    if (!term || !interpretations) {
      return NextResponse.json({ error: "⚠️ Term and Interpretations are required" }, { status: 400 });
    }

    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      { term, interpretations }
    );

    return NextResponse.json(document, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating document:", error);
    return NextResponse.json({ error: error.message || "Failed to create document" }, { status: 500 });
  }
}


// 🟢 DELETE: Delete all interpretations
export async function DELETE() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    const deletePromises = response.documents.map((doc) =>
      databases.deleteDocument(DATABASE_ID, COLLECTION_ID, doc.$id)
    );

    await Promise.all(deletePromises);

    return NextResponse.json(
      { message: "✅ All interpretations deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error deleting documents:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete documents" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-static"; // ✅ Forces static export
