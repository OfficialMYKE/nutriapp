"use client";

import { useState, useEffect } from "react";
import { HeroWave } from "@/components/ui/ai-input-hero"; // Tu componente visual
import api from "@/lib/api";
import { X, Bot, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("invitado@nutriapp.com");

  // Verificar si hay sesión al cargar
  useEffect(() => {
    const email = localStorage.getItem("user_email");
    if (!email) {
      // Si no hay email guardado, mandamos al login
      router.push("/");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const handlePromptSubmit = async (prompt: string) => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await api.post("/preguntar", {
        texto: prompt,
        usuario_email: userEmail, // Usamos el email real del login
      });
      setResponse(res.data.respuesta);
    } catch (error) {
      console.error("Error API:", error);
      setResponse(
        "Error de conexión. Verifica que el servidor Python esté corriendo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black relative">
      <HeroWave onPromptSubmit={handlePromptSubmit} />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 p-6 rounded-2xl flex flex-col items-center gap-3 border border-emerald-500/20">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-zinc-300 animate-pulse">Analizando...</p>
          </div>
        </div>
      )}

      {/* Respuesta Modal */}
      {response && !loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-zinc-950 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
              <div className="flex gap-2 items-center text-emerald-400 font-semibold">
                <Bot className="w-5 h-5" /> Respuesta Nutricional
              </div>
              <button
                onClick={() => setResponse(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto whitespace-pre-wrap text-zinc-300 leading-relaxed text-lg">
              {response}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
