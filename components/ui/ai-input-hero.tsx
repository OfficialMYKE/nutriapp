"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import { ArrowUp, Heart } from "lucide-react"; // Lupa eliminada de aquí
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

        {/* === CAJA DE INPUT (Sin lupa y padding ajustado) === */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPromptSubmit?.(prompt);
          }}
          className="w-full max-w-3xl group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
        >
          <div
            className={cn(
              "relative flex items-end transition-all duration-300",
              "bg-black/20 backdrop-blur-md border border-white/5",
              "rounded-[1.5rem] shadow-xl hover:bg-black/30 overflow-hidden",
            )}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Pregunta sobre recetas, calorías, planes de dieta..."
              // CAMBIO: Eliminado sm:pl-14, ahora usamos pl-6 uniforme para alinear a la izquierda
              className="w-full bg-transparent text-white text-lg placeholder:text-zinc-400 py-5 pl-6 pr-36 resize-none outline-none min-h-[70px] max-h-[200px] leading-relaxed scrollbar-thin scrollbar-thumb-emerald-600/50 scrollbar-track-transparent"
              onInput={(e) => {
                const target = e.currentTarget;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
              }}
            />

            {/* Botón Enviar */}
            <button
              type="submit"
              className={cn(
                "absolute bottom-3 right-3 p-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2",
                prompt.trim()
                  ? "bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 shadow-emerald-900/20"
                  : "bg-white/5 text-zinc-500 cursor-not-allowed",
              )}
              disabled={!prompt.trim()}
            >
              <span className="text-xs font-medium">Enviar</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* === FOOTER MINIMALISTA === */}
      <footer className="relative z-10 w-full py-6 text-center">
        <p className="text-xs text-zinc-500/80 flex items-center justify-center gap-2">
          NutriApp © 2026
          <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
          <span className="flex items-center gap-1">
            Hecho con{" "}
            <Heart className="w-3 h-3 text-red-500/60 fill-red-500/60" /> para
            tu salud
          </span>
        </p>
      </footer>
    </section>
  );
}
