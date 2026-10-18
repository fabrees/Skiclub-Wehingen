"use client";
import { useEffect, useState } from "react";

// Lädt einen im Admin-Bereich pflegbaren Link (z.B. Beitrittserklärung als PDF)
export function useDocumentLink(id: number) {
  const [link, setLink] = useState("");

  useEffect(() => {
    async function fetchLink() {
      const response = await fetch(`/api/link/${id}`);

      if (!response.ok) {
        console.error("Fehler beim Abrufen des Links", response.status);
        return;
      }

      const data = await response.json();
      setLink(data.document);
    }

    fetchLink();
  }, [id]);

  return link;
}
