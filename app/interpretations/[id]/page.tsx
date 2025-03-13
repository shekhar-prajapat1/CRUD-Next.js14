"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { databases } from "../../../lib/appwrite";

const COLLECTION_ID = "your_collection_id"; // Replace with actual Collection ID

export default function ViewInterpretation(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [interpretation, setInterpretation] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          COLLECTION_ID,
          params.id
        );
        setInterpretation(response);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, [params.id]);

  async function handleDelete() {
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        COLLECTION_ID,
        params.id
      );
      router.push("/");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  return (
    <div>
      {interpretation ? (
        <>
          <h1>{interpretation.title}</h1>
          <p>{interpretation.content}</p>
          <button onClick={() => router.push(`/edit/${params.id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
