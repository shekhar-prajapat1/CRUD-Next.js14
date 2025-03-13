"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditInterpretation() {
  const { id } = useParams();
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [interpretations, setInterpretations] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/interpretations/${id}`);
      const data = await res.json();
      setTerm(data.term);
      setInterpretations(data.interpretations);
    }
    fetchData();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/interpretations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term, interpretations }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Error updating interpretation");
    }
  };

  return (
    <div>
      <h2>Edit Interpretation</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <textarea
          value={interpretations}
          onChange={(e) => setInterpretations(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
