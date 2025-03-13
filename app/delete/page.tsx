"use client";

import { useState } from "react";

export default function DeletePage() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const response = await fetch(`/api/interpretations/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Interpretation deleted successfully!");
    } else {
      setMessage(data.error || "Failed to delete interpretation.");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Delete Interpretation</h1>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit" className="button">Delete</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
