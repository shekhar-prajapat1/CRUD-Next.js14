"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../globals.css";

interface Interpretation {
  $id: string;
  term: string;
  interpretations: string;
}

export default function InterpretationsPage() {
  const [interpretations, setInterpretations] = useState<Interpretation[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/interpretations");
        const data = await res.json();
        setInterpretations(data);
      } catch (error) {
        console.error("Error fetching interpretations:", error);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this interpretation?")) return;

    try {
      const res = await fetch(`/api/interpretations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInterpretations((prev) => prev.filter((item) => item.$id !== id));
      } else {
        console.error("Failed to delete interpretation");
      }
    } catch (error) {
      console.error("Error deleting interpretation:", error);
    }
  }

  return (
    <div className="container">
      <h1 className="title">All Interpretations</h1>
      <table className="interpretation-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Interpretation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interpretations.map((item) => (
            <tr key={item.$id}>
              <td>{item.term}</td>
              <td>{item.interpretations}</td>
              <td>
                <Link href={`/edit/${item.$id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(item.$id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
