"use client";

import { useState } from "react";

export default function EditPage() {
  const [id, setId] = useState("");
  const [term, setTerm] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [message, setMessage] = useState("");

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const response = await fetch(`/api/interpretations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term, interpretation }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Interpretation updated successfully!");
    } else {
      setMessage(data.error || "Failed to update interpretation.");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Update Interpretation</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Interpretation"
          value={interpretation}
          onChange={(e) => setInterpretation(e.target.value)}
        />
        <button type="submit" className="button">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
