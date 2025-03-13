"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./globals.css";
import Footer from './components/Footer';

interface Interpretation {
  $id: string;
  term: string;
  interpretations: string;
}

export default function HomePage() {
  const [data, setData] = useState<Interpretation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all interpretations
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/interpretations");
        if (!response.ok) throw new Error("Failed to load interpretations");
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  // Delete an interpretation
  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/interpretations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setData(data.filter((item) => item.$id !== id)); // Remove deleted item from UI
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1 className="title">CRUD Functionality </h1>
      <h2 className="subtitle">Full Stack Developer Assessment</h2>

      {/* CRUD Buttons */}
      <div className="buttons">
        <Link href="/create">
          <button className="button">Create</button>
        </Link>
      </div>

      {/* Error Handling */}
      {error && <p className="error">{error}</p>}

      {/* Interpretations List in Table Format */}
      <div className="table-container">
        {data.length === 0 ? (
          <p>No interpretations found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Term</th>
                <th>Interpretation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.$id}>
                  <td>{item.term}</td>
                  <td>{item.interpretations}</td>
                  <td className="actions">
                    <button className="edit" onClick={() => router.push(`/edit/${item.$id}`)}>
                      Update
                    </button>
                    <button className="delete" onClick={() => handleDelete(item.$id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
