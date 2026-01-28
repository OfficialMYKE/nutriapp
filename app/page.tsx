"use client";

import { HeroWave } from "@/components/ui/ai-input-hero";
import api from "@/lib/api";
import { useState } from "react";

export default function Home() {
  const handlePromptSubmit = async (prompt: string) => {
    console.log("Prompt enviado:", prompt);

    alert(`Has enviado: "${prompt}". Aquí redirigiríamos al chat completo.`);
  };

  return (
    <main className="min-h-screen bg-black">
      <HeroWave onPromptSubmit={handlePromptSubmit} />
    </main>
  );
}
