"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import { ArrowUp, Search, Heart } from "lucide-react"; // Importaciones limpias
import { cn } from "@/lib/utils";

export type HeroProps = {
  onPromptSubmit?: (value: string) => void;
};

export function HeroWave({ onPromptSubmit }: HeroProps) {
  const [prompt, setPrompt] = useState("");

  return (
    <section
      className="relative w-full h-screen flex flex-col justify-between font-sans overflow-hidden"
      style={{
        // FONDO DE COMIDA
        backgroundImage:
          "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <Navbar />

      {/* === CONTENIDO CENTRAL === */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center flex-1 mt-10">
        <div className="text-center mb-10 space-y-4 animate-in fade-in zoom-in duration-700">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
            NutriApp <span className="text-emerald-500">IA</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Tu asistente personal para una alimentación consciente y saludable.
          </p>
        </div>

        {/* === CAJA DE INPUT (Minimalista Glass) === */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPromptSubmit?.(prompt);
          }}
          className="w-full max-w-3xl group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
        >
          <div
            className={cn(
              "relative flex items-start transition-all duration-300",
              "bg-black/20 backdrop-blur-md border border-white/5",
              "rounded-[1.5rem] shadow-xl hover:bg-black/30",
            )}
          >
            <div className="p-5 pt-6 hidden sm:block">
              <Search className="w-5 h-5 text-zinc-400" />
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Pregunta sobre recetas, calorías, planes de dieta..."
              rows={1}
              className="w-full bg-transparent text-white text-lg placeholder:text-zinc-400 p-5 pl-2 sm:pl-0 resize-none outline-none min-h-[80px] leading-relaxed"
              style={{ overflow: "hidden" }}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
            />

            <button
              type="submit"
              className={cn(
                "absolute bottom-4 right-4 p-2.5 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 pr-4 pl-3",
                prompt.trim()
                  ? "bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 shadow-emerald-900/20"
                  : "bg-white/5 text-zinc-500 cursor-not-allowed",
              )}
              disabled={!prompt.trim()}
            >
              <ArrowUp className="w-5 h-5" />
              <span className="text-xs font-medium">Enviar</span>
            </button>
          </div>
        </form>
      </div>

      {/* === FOOTER MINIMALISTA === */}
      <footer className="relative z-10 w-full py-6 text-center">
        <p className="text-xs text-zinc-500/80 flex items-center justify-center gap-2">
          NutriApp © 2026
        </p>
      </footer>
    </section>
  );
}
