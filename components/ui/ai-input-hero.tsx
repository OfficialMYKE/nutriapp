"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import { ArrowUp, Bot, Loader2 } from "lucide-react"; // Sparkles eliminado
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  content: string;
};

export function HeroWave() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || loading) return;

    const userText = prompt.replace(/[\r\n]+/g, " ").trim();
    setPrompt("");
    setLoading(true);

    // 1. Mostrar mensaje del usuario
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    try {
      const userEmail =
        localStorage.getItem("user_email") || "invitado@nutriapp.com";

      const res = await api.post("/preguntar", {
        texto: userText,
        usuario_email: userEmail,
      });

      // --- CORRECCIÓN DEL ERROR ---
      // Si res.data.respuesta no existe, usamos un string vacío o un mensaje de error por defecto
      // para evitar el crash de 'undefined'
      const fullText =
        res.data.respuesta ||
        "Lo siento, no recibí una respuesta válida del servidor.";

      setLoading(false);
      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

      // Bucle de escritura suave
      for (let i = 0; i < fullText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 15)); // Velocidad de escritura

        setMessages((prev) => {
          const newMessages = [...prev];
          // Verificamos que existan mensajes antes de intentar actualizar
          if (newMessages.length > 0) {
            const lastMsg = newMessages[newMessages.length - 1];
            newMessages[newMessages.length - 1] = {
              ...lastMsg,
              content: fullText.slice(0, i + 1),
            };
          }
          return newMessages;
        });
      }
    } catch (error: any) {
      console.error("Error API:", error);
      setLoading(false);
      let errorMsg = "Tuve un problema de conexión.";

      if (error.response?.status === 422) {
        errorMsg = "Error de formato en el mensaje.";
      } else if (error.response?.status === 500) {
        errorMsg = "Error interno del servidor. Intenta más tarde.";
      }

      setMessages((prev) => [...prev, { role: "ai", content: errorMsg }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isChatActive = messages.length > 0;

  return (
    <section
      className="relative w-full h-screen flex flex-col font-sans overflow-hidden bg-zinc-950"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" />

      <Navbar />

      <div
        className={cn(
          "relative z-10 flex flex-col w-full max-w-5xl mx-auto px-6 h-full transition-all duration-700 ease-in-out",
          isChatActive
            ? "justify-between pt-24 pb-6"
            : "justify-center items-center",
        )}
      >
        {!isChatActive && (
          <div className="text-center mb-10 space-y-6 animate-in fade-in zoom-in duration-700">
            {/* SE ELIMINÓ EL DIV DE SPARKLES AQUÍ */}

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
              NutriApp <span className="text-emerald-500">IA</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              Tu experto personal en nutrición.
            </p>
          </div>
        )}

        {isChatActive && (
          <div
            className="flex-1 overflow-y-auto pr-4 space-y-5 mb-4 w-full
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-white/10
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-white/20
            transition-colors"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 items-start",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={cn(
                    "px-5 py-3.5 text-sm md:text-base leading-relaxed shadow-sm backdrop-blur-md border max-w-[85%]",
                    // ESTILO GEMINI REDONDEADO
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-3xl rounded-tr-sm border-emerald-500/50"
                      : "bg-zinc-900/95 text-zinc-200 rounded-3xl rounded-tl-sm border-white/10",
                  )}
                >
                  {msg.role === "ai" ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-4 w-full max-w-4xl mx-auto justify-start animate-pulse items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-zinc-900/80 p-3 px-5 rounded-3xl rounded-tl-sm border border-white/10 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 text-emerald-500 animate-spin" />
                  <span className="text-zinc-400 text-sm">Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div
          className={cn(
            "w-full transition-all duration-700 ease-in-out",
            isChatActive ? "max-w-4xl mx-auto" : "max-w-3xl",
          )}
        >
          <form
            onSubmit={handleSubmit}
            className={cn(
              "relative flex items-end bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden transition-all group",
              !isChatActive && "hover:bg-black/50",
            )}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta aquí..."
              className="w-full bg-transparent text-white text-base placeholder:text-zinc-500 py-5 pl-6 pr-14 resize-none outline-none min-h-[60px] max-h-[200px] leading-relaxed font-normal
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-white/10
              [&::-webkit-scrollbar-thumb]:rounded-full"
              style={{ height: isChatActive ? "60px" : "auto" }}
            />

            <button
              type="submit"
              disabled={!prompt.trim() || loading}
              className={cn(
                "absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-white/5",
                prompt.trim() && !loading
                  ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md"
                  : "bg-white/5 text-zinc-500 cursor-not-allowed",
              )}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>
          </form>

          <p className="text-center text-xs text-zinc-500/80 mt-3 flex items-center justify-center gap-1">
            NutriApp IA puede cometer errores.
          </p>
        </div>
      </div>
    </section>
  );
}
