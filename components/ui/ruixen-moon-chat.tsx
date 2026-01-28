"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
// Importamos el botón especial
import { Button as MovingButton } from "@/components/ui/moving-border";
import { Button } from "@/components/ui/button"; // Mantenemos el botón normal para otras cosas
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Paperclip,
  Leaf,
  Heart,
  ShieldCheck,
  FileText,
  Github,
  Twitter,
  Zap,
  Apple,
} from "lucide-react";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity),
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );
  useEffect(() => {
    if (textareaRef.current)
      textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);
  return { textareaRef, adjustHeight };
}

export default function RuixenMoonChat() {
  const [message, setMessage] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52, // Un poco más alto para elegancia
    maxHeight: 180,
  });

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-between font-sans overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay más oscuro y sofisticado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[3px]" />

      {/* ================= HEADER ================= */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-green-600/20 border border-green-500/30 p-2.5 rounded-xl backdrop-blur-md">
            <Leaf className="w-5 h-5 text-green-400" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            NutriApp<span className="text-green-500">.AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 pr-2">
          <div className="bg-green-600 w-2 h-2 rounded-full ml-3 animate-pulse"></div>
          <span className="text-xs font-medium text-zinc-300 ml-2">
            Sistema Operativo
          </span>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 py-12">
        <div className="text-center mb-12 space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 tracking-tighter drop-shadow-sm">
            Nutrición Inteligente
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Tu asistente personal potenciado por IA para crear dietas, analizar
            calorías y transformar tu estilo de vida.
          </p>
        </div>

        {/* --- CAJA DE INPUT PRO --- */}
        <div className="w-full max-w-2xl group">
          <div className="relative bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-green-900/10 hover:shadow-2xl">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustHeight();
              }}
              placeholder="Pregunta lo que sea..."
              className={cn(
                "w-full px-8 py-6 resize-none border-none",
                "bg-transparent text-white text-lg",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-zinc-600 min-h-[80px]",
              )}
              style={{ overflow: "hidden" }}
            />

            {/* Footer del Input */}
            <div className="flex items-center justify-between px-4 py-3 pb-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-500 hover:text-white hover:bg-white/5 rounded-full ml-2 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </Button>

              {/* BOTÓN CON BORDE EN MOVIMIENTO (VERDE) */}
              <MovingButton
                borderRadius="1.5rem"
                containerClassName="h-10 w-auto min-w-[120px]" // Tamaño controlado
                className="bg-black text-white text-sm font-semibold border-neutral-800 hover:bg-green-950/30 transition-colors"
                borderClassName="bg-[radial-gradient(var(--green-500)_40%,transparent_60%)]" // Refuerzo del verde
                onClick={() => console.log("Enviar:", message)} // Aquí iría tu función de envío
              >
                <span className="flex items-center gap-2 px-4">
                  Consultar <Sparkles className="w-4 h-4 text-green-400" />
                </span>
              </MovingButton>
            </div>
          </div>

          {/* SUGERENCIAS (Sin Emojis, solo Iconos) */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <SuggestionTag
              icon={<Leaf className="w-3.5 h-3.5" />}
              text="Recetas Veganas"
            />
            <SuggestionTag
              icon={<Zap className="w-3.5 h-3.5" />}
              text="Energía Rápida"
            />
            <SuggestionTag
              icon={<Apple className="w-3.5 h-3.5" />}
              text="Beneficios Frutas"
            />
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 NutriApp Inc. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
            <div className="h-3 w-px bg-white/10"></div>
            <div className="flex gap-4">
              <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Github className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente pequeño para las etiquetas de sugerencia
function SuggestionTag({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green-500/30 rounded-full text-xs text-zinc-400 hover:text-white transition-all duration-300 group">
      <span className="group-hover:text-green-400 transition-colors">
        {icon}
      </span>
      {text}
    </button>
  );
}
