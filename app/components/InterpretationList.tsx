"use client";

import { useEffect, useState } from "react";

interface Interpretation {
  $id: string;
  term: string;
  interpretations: string;
}

export default function InterpretationList() {
  const [interpretations, setInterpretations] = useState<Interpretation[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/interpretations");
      const data = await res.json();
      setInterpretations(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/interpretations/${id}`, { method: "DELETE" });
    setInterpretations((prev) => prev.filter((item) => item.$id !== id));
  };

  return (
    <div>
      <h2>Interpretations</h2>
      <ul>
        {interpretations.map((item) => (
          <li key={item.$id}>
            <strong>{item.term}:</strong> {item.interpretations}
            <button onClick={() => handleDelete(item.$id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
