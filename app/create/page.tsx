"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInterpretation() {
  const [term, setTerm] = useState("");
  const [interpretations, setInterpretations] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null); // Clear previous errors

    if (!term.trim() || !interpretations.trim()) {
      setError("⚠️ Term and Interpretations are required");
      return;
    }

    try {
      const response = await fetch("/api/interpretations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, interpretations }), // ✅ Ensure correct data
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to create interpretation");
      }

      router.push("/"); // ✅ Redirect to home after successful creation
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Create Interpretation</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Enter Interpretation"
          value={interpretations}
          onChange={(e) => setInterpretations(e.target.value)}
          className="input"
        ></textarea>
        <button type="submit" className="button">Create</button>
      </form>
    </div>
  );
}
